import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { clientIp } from "@/lib/request";
import { ATELIER_BUCKET, getSupabaseAdmin } from "@/lib/supabase/server";
import { flattenErrors, uploadRequestSchema } from "@/lib/validation";

const EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/heic": "heic",
  "image/heif": "heif",
};

/**
 * Issues short-lived signed upload URLs for Atelier inspiration images.
 * The bucket is private and enforces 10 MB + image MIME types server-side.
 */
export async function POST(req: Request) {
  const ip = await clientIp();
  if (!(await rateLimit("atelier-upload", ip, 6, 600))) {
    return NextResponse.json({ error: "Too many uploads. Please wait a few minutes." }, { status: 429 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const parsed = uploadRequestSchema.safeParse(body);
  if (!parsed.success) {
    const errs = flattenErrors(parsed.error);
    return NextResponse.json({ error: Object.values(errs)[0] ?? "Invalid files." }, { status: 400 });
  }
  const sb = getSupabaseAdmin();
  if (!sb) {
    return NextResponse.json({ error: "Uploads aren't available right now. You can send images by email after we reply." }, { status: 503 });
  }

  const day = new Date().toISOString().slice(0, 10);
  const folder = `${day}/${randomUUID()}`;
  const uploads = [];
  for (const [i, f] of parsed.data.files.entries()) {
    const path = `${folder}/${i + 1}.${EXT[f.type]}`;
    const { data, error } = await sb.storage.from(ATELIER_BUCKET).createSignedUploadUrl(path);
    if (error || !data) {
      console.error("[upload] sign failed", error?.message);
      return NextResponse.json({ error: "Couldn't prepare the upload. Please try again." }, { status: 500 });
    }
    uploads.push({ path, signedUrl: data.signedUrl });
  }
  return NextResponse.json({ uploads }, { headers: { "Cache-Control": "no-store" } });
}
