import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { rateLimit } from "@/lib/rate-limit";
import { clientIp } from "@/lib/request";

/** Creates a Razorpay order for a refundable deposit. Disabled unless NEXT_PUBLIC_ENABLE_PREORDER=true. */
export async function POST(req: Request) {
  if (!env.preorderEnabled || !env.razorpayKeyId || !env.razorpayKeySecret) {
    return NextResponse.json({ error: "Reservations are not open yet." }, { status: 404 });
  }
  const depositInr = Number(process.env.RESERVATION_DEPOSIT_INR || 0);
  if (!Number.isInteger(depositInr) || depositInr <= 0) {
    return NextResponse.json({ error: "Reservations are not configured." }, { status: 503 });
  }
  const ip = await clientIp();
  if (!(await rateLimit("reserve", ip, 5, 600))) return NextResponse.json({ error: "Please wait a moment." }, { status: 429 });

  const { tier } = (await req.json().catch(() => ({}))) as { tier?: string };
  if (!tier || !["field", "soft", "atelier"].includes(tier)) return NextResponse.json({ error: "Unknown product." }, { status: 400 });

  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Basic ${Buffer.from(`${env.razorpayKeyId}:${env.razorpayKeySecret}`).toString("base64")}`,
    },
    body: JSON.stringify({ amount: depositInr * 100, currency: "INR", notes: { tier, kind: "launch_edition_deposit" } }),
  });
  if (!res.ok) {
    console.error("[razorpay] order failed", res.status, await res.text());
    return NextResponse.json({ error: "Could not start the reservation." }, { status: 502 });
  }
  const order = (await res.json()) as { id: string; amount: number; currency: string };
  return NextResponse.json({ id: order.id, amount: order.amount, currency: order.currency });
}
