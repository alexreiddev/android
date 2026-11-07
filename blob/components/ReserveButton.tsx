"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Phase 2: refundable reservation deposit via Razorpay for the numbered launch edition.
 * Hidden unless NEXT_PUBLIC_ENABLE_PREORDER === "true".
 */
const enabled = process.env.NEXT_PUBLIC_ENABLE_PREORDER === "true";
const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

type RazorpayCtor = new (opts: Record<string, unknown>) => { open: () => void };

function loadCheckout(): Promise<RazorpayCtor> {
  return new Promise((resolve, reject) => {
    const w = window as unknown as { Razorpay?: RazorpayCtor };
    if (w.Razorpay) return resolve(w.Razorpay);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => (w.Razorpay ? resolve(w.Razorpay) : reject(new Error("no Razorpay")));
    s.onerror = () => reject(new Error("load failed"));
    document.body.appendChild(s);
  });
}

export function ReserveButton({ tier }: { tier: string }) {
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  if (!enabled || !keyId) return null;

  const reserve = async () => {
    setBusy(true);
    setMsg(null);
    trackEvent("cta_reserve", { tier });
    try {
      const res = await fetch("/api/reservations/order", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ tier }),
      });
      const order = (await res.json()) as { id?: string; amount?: number; currency?: string; error?: string };
      if (!res.ok || !order.id) throw new Error(order.error || "Could not start the reservation.");
      const Razorpay = await loadCheckout();
      new Razorpay({
        key: keyId,
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        name: "BLOB",
        description: "Refundable reservation deposit: numbered launch edition",
        theme: { color: "#FFB547" },
        handler: async (r: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          const v = await fetch("/api/reservations/verify", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ ...r, tier }),
          });
          if (v.ok) {
            trackEvent("reservation_paid", { tier });
            setMsg("Reserved. Thank you. A confirmation is on its way.");
          } else setMsg("Payment received but we couldn't confirm it. We'll check and email you.");
        },
      }).open();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <button type="button" onClick={reserve} disabled={busy} className="organic-pill inline-flex items-center justify-center border border-line-strong px-6 py-3 font-semibold text-ink-strong hover:border-glow">
        {busy ? "Opening…" : "Reserve (refundable deposit)"}
      </button>
      <p role="status" className="mt-2 text-sm text-accent-ink">
        {msg}
      </p>
    </div>
  );
}
