import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env, supabaseAdminConfigured, supabaseConfigured } from "@/lib/env";

const opts = { auth: { persistSession: false, autoRefreshToken: false } };
let client: SupabaseClient | null = null;
let admin: SupabaseClient | null = null;

/**
 * Client for form submissions. Works with the publishable key, because every
 * write goes through a database function that checks BLOB_DB_SECRET.
 */
export function getSupabase(): SupabaseClient | null {
  if (!supabaseConfigured()) return null;
  if (!client) client = createClient(env.supabaseUrl, env.supabaseServiceKey || env.supabasePublishableKey, opts);
  return client;
}

/** Service-role client (bypasses RLS). Only for signed uploads. Server only. */
export function getSupabaseAdmin(): SupabaseClient | null {
  if (!supabaseAdminConfigured()) return null;
  if (!admin) admin = createClient(env.supabaseUrl, env.supabaseServiceKey, opts);
  return admin;
}

export const ATELIER_BUCKET = "blob-atelier-uploads";
