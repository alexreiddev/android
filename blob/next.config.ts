import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";
const isPreview = process.env.VERCEL_ENV === "preview";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
const turnstile = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
const plausible = Boolean(process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN);
const razorpay = process.env.NEXT_PUBLIC_ENABLE_PREORDER === "true";

const list = (...xs: (string | false)[]) => xs.filter(Boolean).join(" ");

/**
 * CSP without nonces (keeps every page statically prerendered).
 * Third-party origins are added only when their feature is configured.
 */
const csp = [
  "default-src 'self'",
  `script-src ${list("'self'", "'unsafe-inline'", isDev && "'unsafe-eval'", plausible && "https://plausible.io", turnstile && "https://challenges.cloudflare.com", razorpay && "https://checkout.razorpay.com", isPreview && "https://vercel.live")}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src ${list("'self'", supabaseUrl && new URL(supabaseUrl).origin, plausible && "https://plausible.io", razorpay && "https://api.razorpay.com https://lumberjack.razorpay.com", isPreview && "https://vercel.live wss://ws-us3.pusher.com")}`,
  `frame-src ${list(turnstile && "https://challenges.cloudflare.com", razorpay && "https://api.razorpay.com https://checkout.razorpay.com", isPreview && "https://vercel.live") || "'none'"}`,
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  !isDev && "upgrade-insecure-requests",
]
  .filter(Boolean)
  .join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(self \"https://checkout.razorpay.com\"), accelerometer=(self), gyroscope=(self), magnetometer=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
