import "server-only";
import { Resend } from "resend";
import { env, resendConfigured } from "@/lib/env";

export type FormKind = "waitlist" | "b2b" | "atelier" | "contact";

const LABEL: Record<FormKind, string> = {
  waitlist: "Waitlist signup",
  b2b: "Resort / fleet quote request",
  atelier: "Atelier commission enquiry",
  contact: "Contact message",
};

/** Auto-replies: warm, short, in the brand voice. No promises we can't keep. */
const REPLY: Record<FormKind, { subject: string; body: string }> = {
  waitlist: {
    subject: "You're on the BLOB waitlist",
    body: "Thank you for joining. We'll write when the first BLOBs are ready to leave the workshop. Until then, they're sleeping.",
  },
  b2b: {
    subject: "We've received your BLOB quote request",
    body: "Thank you. We'll read about your property and reply with questions and a first quote. If it helps, reply to this email with a few photos of the paths you'd like to light.",
  },
  atelier: {
    subject: "Your BLOB Atelier enquiry",
    body: "Thank you for thinking of us for your space. We'll be in touch to arrange a design call. Every Atelier piece starts with a conversation.",
  },
  contact: {
    subject: "We've received your message",
    body: "Thank you for writing. We'll reply as soon as we can.",
  },
};

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function wrap(inner: string) {
  return `<div style="background:#0b0f0c;padding:32px;font-family:Helvetica,Arial,sans-serif;color:#d9d6cc;line-height:1.6">
  <div style="max-width:520px;margin:0 auto">
    <p style="font-size:22px;color:#ffd08a;margin:0 0 16px">BLOB</p>
    ${inner}
    <p style="margin-top:32px;color:#b9b6aa;font-size:13px">Light That Feels Alive. · Designed in Kerala</p>
  </div></div>`;
}

/**
 * Sends the owner notification (b2b + atelier; others optional) and the submitter auto-reply.
 * Silently skips when Resend isn't configured. Never throws.
 */
export async function sendFormEmails(kind: FormKind, data: Record<string, unknown>, opts: { notify: boolean }) {
  if (!resendConfigured()) {
    console.info(`[email] Resend not configured: skipped ${kind} emails`);
    return;
  }
  const resend = new Resend(env.resendKey);
  const to = typeof data.email === "string" ? data.email : null;
  const name = typeof data.name === "string" ? data.name : typeof data.contact_name === "string" ? data.contact_name : null;

  const jobs: Promise<unknown>[] = [];
  if (opts.notify && env.notifyTo) {
    const rows = Object.entries(data)
      .filter(([, v]) => v !== null && v !== "" && !(Array.isArray(v) && v.length === 0))
      .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#b9b6aa;vertical-align:top">${esc(k)}</td><td style="padding:4px 0">${esc(Array.isArray(v) ? v.join(", ") : String(v))}</td></tr>`)
      .join("");
    jobs.push(
      resend.emails.send({
        from: env.emailFrom,
        to: env.notifyTo.split(",").map((s) => s.trim()),
        replyTo: to ?? undefined,
        subject: `New ${LABEL[kind]}${name ? ` from ${name}` : ""}`,
        html: wrap(`<p>New ${esc(LABEL[kind].toLowerCase())}:</p><table style="font-size:14px;border-collapse:collapse">${rows}</table>`),
      }),
    );
  }
  if (to) {
    const r = REPLY[kind];
    jobs.push(
      resend.emails.send({
        from: env.emailFrom,
        to,
        replyTo: env.notifyTo ? env.notifyTo.split(",")[0].trim() : undefined,
        subject: r.subject,
        html: wrap(`<p>${name ? `Hello ${esc(name.split(" ")[0])},` : "Hello,"}</p><p>${esc(r.body)}</p><p>Warmly,<br/>BLOB</p>`),
        text: `${name ? `Hello ${name.split(" ")[0]},` : "Hello,"}\n\n${r.body}\n\nWarmly,\nBLOB`,
      }),
    );
  }
  const results = await Promise.allSettled(jobs);
  for (const r of results) {
    if (r.status === "rejected") console.error("[email] send failed", r.reason);
    else if (r.value && typeof r.value === "object" && "error" in r.value && r.value.error) console.error("[email] send error", r.value.error);
  }
}
