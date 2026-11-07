# DECISIONS

Every non-obvious choice made while building the BLOB site, with the reason. Newest sections are appended per phase.

## Phase 1: Scaffold

- **Location: `blob/` subfolder.** The repository already contained unrelated guides (`/guides`, root README). The site lives in `blob/` so nothing existing is touched. On Vercel, set **Root Directory = `blob`**.
- **Next.js 16.4 (latest stable) with Cache Components + Partial Prefetching**, the defaults `create-next-app` now ships. Every marketing page is a prerendered static shell; forms are client components that call server actions/route handlers.
- **Tailwind CSS v4** with CSS-variable design tokens in `app/globals.css`. Raw palette (`--night-900`, `--amber-400`, …) → semantic tokens (`--bg`, `--ink`, `--glow`, `--accent-ink`) that switch per theme.
- **Text-safe accent.** `--amber-400` is used for glows, buttons (with dark text) and focus rings. Body-size amber *text* uses `--amber-300` on night (contrast ≈ 13:1) and a deep ember `#7a4310` on dawn (≈ 7:1), because amber on off-white fails WCAG.
- **Fonts:** Fraunces (variable, `SOFT=100` for the rounded, soft display style) + Manrope (humanist sans for body), self-hosted through `next/font/google` (downloaded at build, served from our own origin; no Google requests at runtime).
- **Theme:** dark ("night") is the default and the no-JS fallback. Without a saved choice we follow `prefers-color-scheme` (light → "dawn"). The toggle saves the choice in `localStorage` (not a cookie). A tiny inline script applies the theme before first paint to avoid a flash.
- **Content as typed TS, not MDX.** Products, FAQ, story and legal copy live in `/content/*.ts`. Reason: no MDX toolchain to maintain, type-checked fields (prices, specs, placeholders), and editing is still just text in one file. Legal pages use a small structured format (headings + paragraphs + lists).
- **Placeholders are visible on the site** as dashed amber `<Placeholder>` marks (e.g. "contact email") with a `data-placeholder` key, so nothing unconfirmed can be mistaken for a real fact. All keys are listed in `PLACEHOLDERS.md`.
- **Logo:** a custom SVG wordmark (rounded B-L-O-B letterforms) with a glowing pebble mark; the favicon is the mark alone.

## Phase 2: Signature hero (`<BlobScene>`)

- **Canvas 2D, no WebGL/three.js.** Five blobs need only a few radial gradients and spline paths per frame. Canvas 2D adds 0 KB of dependencies and runs at 60 fps on desktop. On coarse-pointer devices the DPR is capped at 1.25 (1.5 on desktop) to keep mid-range Android phones smooth.
- **Static SSR layer first, canvas second.** The server renders the night backdrop and sleeping SVG blobs at the same positions. The canvas starts in `requestIdleCallback` after first paint, so the LCP element is always the headline text. When the canvas paints its first frame, the static blobs cross-fade out.
- **Timing mirrors the product:** 1.5 s ease-in wake, ~1.2 s linger (2.5 s after a touch), 6.5 s fade-out, ±5% breathing on a 5.5 s cycle while present. Cascade pre-glows direct neighbours to 30% after a 300–600 ms delay, scaled by distance.
- **Mobile:** tap or touch-hold wakes nearby blobs. Scrolling moves a virtual "walker" across the scene so blobs wake in turn as you scroll past. Device tilt is opt-in through a small "Tilt to walk" button (iOS permission is only asked on that tap). Nothing is needed to *see* the page.
- **Reduced motion:** the canvas never starts. The static layer shows the central blob glowing.
- **Pausing:** IntersectionObserver (off-screen) and `visibilitychange` (tab hidden) stop the RAF loop. While all blobs sleep, redraws drop to ~15 fps.
- **The hero is always "night"** (`.night-scope` re-scopes the tokens), even in the dawn theme. The product only makes sense in the dark.

## Phase 3: Pages & content

- **Copy rules applied:** every spec is labelled "(target)" with the "Pre-launch: specifications are design targets" note. Every price says "indicative". Unknown facts (contact email, WhatsApp, socials, legal entity, pilot count/terms, policy numbers, founder story) render as dashed placeholders. Things I removed because they weren't in the brief: when the orchard trial ran, why it was named "Varsha", and any longevity claim.
- **Competitors are never named.** The comparison says "Always-on solar pebbles", a generic category.
- **Testimonials:** `components/Testimonials.tsx` is ready but returns `null` while its list is empty. It isn't imported on any page.
- **Illustrations instead of photos:** tier heroes and cards use the SVG `<Blob>` in three tones (frosted, silicone, glass), each labelled "Illustration". Future media slots use `<PlaceholderMedia>`, which shows a visible "Placeholder film/photo" badge.
- **404:** a single sleeping blob inside a focusable button wakes over 1.6 s on hover *or keyboard focus* and fades over 6 s. Pure CSS.
- **Legal pages** are structured TS (`content/legal.ts`). `[[KEY]]` tokens render as placeholders, or as the value from `content/site.ts` once set. Each page shows a "Draft: review before launch" banner.

## Phase 4: Forms & data

- **Server actions** (`app/actions.ts`) for all four forms. Pipeline: honeypot (silent fake success) → optional Turnstile → zod validation → per-IP rate limit → insert with the service-role client → emails via `after()` so the response isn't delayed.
- **Same zod schemas on client and server** (`lib/validation.ts`). The client validates on submit, then marks fields `aria-invalid`, links errors with `aria-describedby`, moves focus to the first invalid field and announces a message in a polite live region. Without JS, forms still post to the server action.
- **Rate limiting in Postgres** (`rate_limit_hit()` function), because in-memory limits don't hold across serverless instances. The key is a SHA-256 hash of the IP, and rows are purged after a day. In-memory fallback when Supabase is absent.
- **RLS on, no policies, and privileges revoked from `anon`/`authenticated`**, so the only path in is the server's service-role key. The service key is read only in `server-only` modules.
- **Uploads:** the browser asks `/api/atelier/upload-urls` for signed upload URLs (≤5 files, image types, ≤10 MB, validated) and PUTs files straight to Supabase Storage. That avoids Vercel's ~4.5 MB function body limit. The bucket is private and enforces the 10 MB limit and MIME list server-side. The commission row stores only object paths, and the server only accepts paths matching the format it issued.
- **No Supabase configured:** in dev, submissions are logged to the console. In production the form shows a polite error rather than pretending to save.
- **Waitlist:** no separate consent checkbox. Submitting the form *is* the consent; the form says so and links the privacy notice, and `consent` defaults to `true`. A duplicate email returns a friendly "already on the list" message.
- **Emails (Resend):** owner notification for B2B quotes and Atelier commissions (`NOTIFY_EMAIL_TO`). A short warm auto-reply goes to every submitter. Skipped silently with no API key.
- **Razorpay (Phase 2) is built but off.** `ReserveButton` renders nothing unless `NEXT_PUBLIC_ENABLE_PREORDER=true`. The order/verify routes return 404 while disabled. The payment signature is verified with HMAC-SHA256 plus a timing-safe compare, and contact details are fetched from Razorpay rather than trusted from the client.
