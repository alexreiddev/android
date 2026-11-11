import "server-only";

/** Server-side feature flags derived from env. Secrets never leave the server. */
export const env = {
  supabaseUrl: process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  /** Publishable (anon) key: enough for forms, because writes go through secret-checked functions. */
  supabasePublishableKey: process.env.SUPABASE_PUBLISHABLE_KEY || "",
  /** The website's own database secret; only its hash is stored in the database. */
  dbSecret: process.env.BLOB_DB_SECRET || "",
  resendKey: process.env.RESEND_API_KEY || "",
  notifyTo: process.env.NOTIFY_EMAIL_TO || "",
  emailFrom: process.env.EMAIL_FROM || "BLOB <onboarding@resend.dev>",
  turnstileSecret: process.env.TURNSTILE_SECRET_KEY || "",
  turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "",
  razorpayKeyId: process.env.RAZORPAY_KEY_ID || "",
  razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET || "",
  preorderEnabled: process.env.NEXT_PUBLIC_ENABLE_PREORDER === "true",
  isProd: process.env.NODE_ENV === "production",
};

export const supabaseConfigured = () =>
  Boolean(env.supabaseUrl && (env.supabaseServiceKey || env.supabasePublishableKey) && env.dbSecret);
/** Uploads and reservations need full storage/table access. */
export const supabaseAdminConfigured = () => Boolean(env.supabaseUrl && env.supabaseServiceKey);
export const resendConfigured = () => Boolean(env.resendKey);
export const turnstileEnabled = () => Boolean(env.turnstileSecret && env.turnstileSiteKey);
