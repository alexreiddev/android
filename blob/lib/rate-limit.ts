import "server-only";
import { createHash } from "node:crypto";
import { env } from "@/lib/env";
import { getSupabase } from "@/lib/supabase/server";

const memory = new Map<string, { count: number; reset: number }>();

/**
 * Per-IP rate limit. Uses a Postgres function (durable across serverless
 * instances) when Supabase is configured; falls back to in-memory.
 * IPs are hashed before storage.
 */
export async function rateLimit(bucket: string, ip: string, max = 5, windowSeconds = 600): Promise<boolean> {
  const key = `${bucket}:${createHash("sha256").update(ip).digest("hex").slice(0, 32)}`;
  const sb = getSupabase();
  if (sb) {
    const { data, error } = await sb.rpc("blob_rate_limit_hit", { p_secret: env.dbSecret, p_key: key, p_window_seconds: windowSeconds, p_max: max });
    if (!error && typeof data === "boolean") return data;
    console.error("[rate-limit] rpc failed, using memory fallback", error?.message);
  }
  const now = Date.now();
  const entry = memory.get(key);
  if (!entry || entry.reset < now) {
    memory.set(key, { count: 1, reset: now + windowSeconds * 1000 });
    return true;
  }
  entry.count += 1;
  return entry.count <= max;
}
