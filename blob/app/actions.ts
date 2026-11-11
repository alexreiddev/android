"use server";

import { after } from "next/server";
import type { z } from "zod";
import { env } from "@/lib/env";
import { sendFormEmails, type FormKind } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import { clientIp } from "@/lib/request";
import { getSupabase } from "@/lib/supabase/server";
import { verifyTurnstile } from "@/lib/turnstile";
import {
  atelierSchema,
  b2bSchema,
  contactSchema,
  flattenErrors,
  formToObject,
  waitlistSchema,
  type FormState,
} from "@/lib/validation";

type Config = {
  kind: FormKind;
  schema: z.ZodType<Record<string, unknown>>;
  arrayKeys?: string[];
  notify: boolean;
  success: string;
};

const CONFIGS: Record<FormKind, Config> = {
  waitlist: {
    kind: "waitlist",
    schema: waitlistSchema as unknown as z.ZodType<Record<string, unknown>>,
    notify: false,
    success: "You're on the list. We'll write when the first lights wake.",
  },
  b2b: {
    kind: "b2b",
    schema: b2bSchema as unknown as z.ZodType<Record<string, unknown>>,
    arrayKeys: ["areas", "interests"],
    notify: true,
    success: "Thank you. We'll read about your property and reply with a first quote.",
  },
  atelier: {
    kind: "atelier",
    schema: atelierSchema as unknown as z.ZodType<Record<string, unknown>>,
    arrayKeys: ["upload_paths"],
    notify: true,
    success: "Thank you. We'll be in touch to arrange a design call.",
  },
  contact: {
    kind: "contact",
    schema: contactSchema as unknown as z.ZodType<Record<string, unknown>>,
    notify: false,
    success: "Thank you for writing. We'll reply soon.",
  },
};

async function handle(cfg: Config, formData: FormData): Promise<FormState> {
  // 1. Honeypot: bots fill hidden fields. Pretend all is well.
  if (String(formData.get("website") ?? "").trim() !== "") {
    return { status: "success", message: cfg.success };
  }

  const ip = await clientIp();

  // 2. Optional Turnstile
  const token = formData.get("cf-turnstile-response");
  if (!(await verifyTurnstile(typeof token === "string" ? token : null, ip))) {
    return { status: "error", message: "We couldn't confirm you're human. Please try again." };
  }

  // 3. Validate
  const raw = formToObject(formData, cfg.arrayKeys);
  delete raw.website;
  const parsed = cfg.schema.safeParse(raw);
  if (!parsed.success) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors: flattenErrors(parsed.error) };
  }

  // 4. Rate limit (per IP, per form)
  if (!(await rateLimit(cfg.kind, ip, cfg.kind === "waitlist" ? 8 : 5, 600))) {
    return { status: "error", message: "That's a lot of messages in a short time. Please wait a few minutes and try again." };
  }

  const record = { ...parsed.data, status: "new" };

  // 5. Store
  const sb = getSupabase();
  if (!sb) {
    if (!env.isProd) {
      console.info(`[forms] Supabase not configured. ${cfg.kind} submission (dev only):`, record);
    } else {
      console.error(`[forms] Supabase not configured: ${cfg.kind} submission NOT saved`);
      return { status: "error", message: "Our forms are resting right now. Please try again later." };
    }
  } else {
    const { data, error } = await sb.rpc("blob_submit", { p_secret: env.dbSecret, p_form: cfg.kind, p_row: record });
    if (error) {
      console.error(`[forms] ${cfg.kind} submission failed`, error.message);
      return { status: "error", message: "Something went wrong saving that. Please try again in a moment." };
    }
    // A repeat waitlist signup is fine: treat as success, send nothing.
    if (data === "duplicate") {
      return { status: "success", message: cfg.kind === "waitlist" ? "You're already on the list. We'll be in touch." : cfg.success };
    }
  }

  // 6. Emails after the response is sent
  after(() => sendFormEmails(cfg.kind, parsed.data, { notify: cfg.notify }));

  return { status: "success", message: cfg.success };
}

export async function submitWaitlist(_prev: FormState, formData: FormData) {
  return handle(CONFIGS.waitlist, formData);
}
export async function submitB2B(_prev: FormState, formData: FormData) {
  return handle(CONFIGS.b2b, formData);
}
export async function submitAtelier(_prev: FormState, formData: FormData) {
  return handle(CONFIGS.atelier, formData);
}
export async function submitContact(_prev: FormState, formData: FormData) {
  return handle(CONFIGS.contact, formData);
}
