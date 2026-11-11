import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { getSupabase } from "@/lib/supabase/server";

/** Verifies the Razorpay payment signature and records the reservation. */
export async function POST(req: Request) {
  if (!env.preorderEnabled || !env.razorpayKeySecret) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const body = (await req.json().catch(() => ({}))) as Record<string, string>;
  const { razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature, tier } = body;
  if (!orderId || !paymentId || !signature) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const expected = createHmac("sha256", env.razorpayKeySecret).update(`${orderId}|${paymentId}`).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return NextResponse.json({ error: "Invalid signature" }, { status: 400 });

  // Pull contact details from Razorpay rather than trusting the client.
  let email: string | null = null;
  let phone: string | null = null;
  let amount: number | null = null;
  try {
    const p = await fetch(`https://api.razorpay.com/v1/payments/${encodeURIComponent(paymentId)}`, {
      headers: { authorization: `Basic ${Buffer.from(`${env.razorpayKeyId}:${env.razorpayKeySecret}`).toString("base64")}` },
    });
    if (p.ok) {
      const d = (await p.json()) as { email?: string; contact?: string; amount?: number };
      email = d.email ?? null;
      phone = d.contact ?? null;
      amount = typeof d.amount === "number" ? d.amount / 100 : null;
    }
  } catch {
    /* stored without contact details; can be looked up in Razorpay */
  }

  const sb = getSupabase();
  if (sb) {
    const { error } = await sb.rpc("blob_submit", {
      p_secret: env.dbSecret,
      p_form: "reservation",
      p_row: {
        tier: ["field", "soft", "atelier"].includes(tier) ? tier : null,
        razorpay_order_id: orderId,
        razorpay_payment_id: paymentId,
        amount_inr: amount,
        email,
        phone,
        status: "paid",
      },
    });
    if (error) console.error("[reservations] insert failed", error.message);
  }
  return NextResponse.json({ ok: true });
}
