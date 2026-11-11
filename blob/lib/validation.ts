import { z } from "zod";

// No eval-based JIT: keeps zod compatible with our CSP (no 'unsafe-eval').
z.config({ jitless: true });

/** Shared by client (instant feedback) and server (source of truth). */

const trimmed = (max: number) => z.string().trim().max(max, `Please keep this under ${max} characters.`);
const required = (label: string, max = 200) => trimmed(max).min(1, `Please add ${label}.`);
const optional = (max = 200) =>
  trimmed(max)
    .optional()
    .transform((v) => (v ? v : null));

export const email = z.string().trim().toLowerCase().max(254).email("Please enter a valid email address.");

export const phone = z
  .string()
  .trim()
  .transform((v) => v.replace(/[\s-]/g, ""))
  .refine((v) => /^\+?[0-9]{7,15}$/.test(v), "Please enter a valid phone number, e.g. +91 98765 43210.");

const consent = z
  .union([z.literal("on"), z.literal("true"), z.literal(true)], {
    error: "Please tick this box so we can reply to you.",
  })
  .transform(() => true);

/** Fields attached to every submission. */
export const meta = z.object({
  source_page: trimmed(200).optional().default("/"),
  utm_source: optional(200),
  utm_medium: optional(200),
  utm_campaign: optional(200),
  utm_term: optional(200),
  utm_content: optional(200),
});

export const INTERESTS = ["field", "soft", "atelier", "firefly_path", "undecided"] as const;
export const PROPERTY_TYPES = ["resort", "homestay", "plantation_stay", "campsite", "other"] as const;
export const B2B_INTERESTS = ["fleet_quote", "pilot", "night_demo"] as const;
export const AREAS = ["paths", "gardens", "steps", "pool", "other"] as const;
export const TIMELINES = ["within_3_months", "3_6_months", "6_12_months", "exploring"] as const;
export const B2B_BUDGETS = ["under_1l", "1l_3l", "3l_10l", "over_10l", "not_sure"] as const;
export const CLIENT_TYPES = ["homeowner", "architect", "interior_designer", "landscape_designer", "hospitality"] as const;
export const FINISHES = ["clear", "frosted", "undecided"] as const;
export const PLACEMENTS = ["indoor", "outdoor", "both"] as const;
export const ATELIER_BUDGETS = ["under_1l", "1l_3l", "3l_10l", "over_10l", "not_sure"] as const;

const optionalEnum = <T extends readonly [string, ...string[]]>(values: T) =>
  z
    .union([z.enum(values), z.literal("")])
    .optional()
    .transform((v) => (v ? (v as T[number]) : null));

export const waitlistSchema = meta.extend({
  email,
  name: optional(120),
  city: optional(120),
  interest: optionalEnum(INTERESTS),
});

export const b2bSchema = meta.extend({
  property_name: required("your property's name", 160),
  contact_name: required("your name", 120),
  role: optional(120),
  email,
  phone,
  property_type: z.enum(PROPERTY_TYPES, { error: "Please choose a property type." }),
  location: required("the location", 160),
  units_estimated: z.coerce
    .number({ error: "Please enter a number." })
    .int("Please enter a whole number.")
    .min(1, "At least 1 unit.")
    .max(100000, "That's more than we can quote online. Tell us in the message."),
  interests: z.array(z.enum(B2B_INTERESTS)).max(B2B_INTERESTS.length).default([]),
  areas: z.array(z.enum(AREAS)).max(AREAS.length).default([]),
  timeline: z.enum(TIMELINES, { error: "Please choose a timeline." }),
  budget_range: optionalEnum(B2B_BUDGETS),
  message: optional(3000),
  consent,
});

export const UPLOAD_PATH_RE = /^\d{4}-\d{2}-\d{2}\/[0-9a-f-]{36}\/[1-5]\.(jpg|jpeg|png|webp|avif|heic|heif)$/;
export const UPLOAD_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/heic", "image/heif"] as const;
export const UPLOAD_MAX_FILES = 5;
export const UPLOAD_MAX_BYTES = 10 * 1024 * 1024;

export const atelierSchema = meta.extend({
  name: required("your name", 120),
  email,
  phone,
  client_type: z.enum(CLIENT_TYPES, { error: "Please tell us who you are." }),
  project_location: required("the project location", 160),
  pieces: z.coerce
    .number({ error: "Please enter a number." })
    .int("Please enter a whole number.")
    .min(1, "At least 1 piece.")
    .max(1000, "Tell us about larger projects in the message."),
  glass_finish: z.enum(FINISHES, { error: "Please choose a finish." }),
  placement: z.enum(PLACEMENTS, { error: "Please choose indoor, outdoor or both." }),
  upload_paths: z.array(z.string().regex(UPLOAD_PATH_RE, "Invalid upload.")).max(UPLOAD_MAX_FILES).default([]),
  budget_range: optionalEnum(ATELIER_BUDGETS),
  desired_date: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v ? v : null))
    .refine((v) => v === null || /^\d{4}-\d{2}(-\d{2})?$/.test(v), "Please pick a date."),
  message: optional(3000),
  consent,
});

export const contactSchema = meta.extend({
  name: required("your name", 120),
  email,
  topic: optional(120),
  message: required("a message", 3000),
  consent,
});

export const uploadRequestSchema = z.object({
  files: z
    .array(
      z.object({
        name: z.string().max(200),
        type: z.enum(UPLOAD_TYPES, { error: "Images only: JPG, PNG, WebP, AVIF or HEIC." }),
        size: z.number().int().positive().max(UPLOAD_MAX_BYTES, "Each image must be 10 MB or smaller."),
      }),
    )
    .min(1)
    .max(UPLOAD_MAX_FILES, `Up to ${UPLOAD_MAX_FILES} images.`),
});

export type FieldErrors = Record<string, string>;

/** FormData → plain object; repeated keys (checkbox groups) become arrays. */
export function formToObject(fd: FormData, arrayKeys: string[] = []) {
  const out: Record<string, unknown> = {};
  for (const key of new Set(fd.keys())) {
    if (key.startsWith("$ACTION") || key === "cf-turnstile-response") continue;
    const all = fd.getAll(key).filter((v): v is string => typeof v === "string");
    out[key] = arrayKeys.includes(key) ? all : all[0];
  }
  for (const k of arrayKeys) if (!(k in out)) out[k] = [];
  return out;
}

export function flattenErrors(err: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of err.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: FieldErrors;
};
