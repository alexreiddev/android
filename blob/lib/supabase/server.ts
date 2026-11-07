import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env, supabaseConfigured } from "@/lib/env";

let client: SupabaseClient | null = null;

/** Service-role client. Server only: bypasses RLS, never import from client code. */
export function getSupabaseAdmin(): SupabaseClient | null {
  if (!supabaseConfigured()) return null;
  if (!client) {
    client = createClient(env.supabaseUrl, env.supabaseServiceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}

export const ATELIER_BUCKET = "atelier-uploads";
