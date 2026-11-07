# BLOB: website

The launch site for **BLOB**, motion-responsive ambient lights designed in Kerala. *Light That Feels Alive.*

Next.js 16 (App Router, Cache Components) · TypeScript (strict) · Tailwind CSS 4 · Supabase · Resend · Vercel.

## Local development

```bash
cd blob
cp .env.example .env.local   # fill in what you have; everything is optional locally
npm install
npm run dev                  # http://localhost:3000
```

Checks (run before every commit):

```bash
npm run lint && npm run typecheck && npm run build   # or: npm run check
```

Without Supabase configured, form submissions are **logged to the terminal in dev** and politely refused in production.

## Environment variables

See `.env.example` for the full list with comments.

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | prod | Canonical URL (falls back to the Vercel URL) |
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | prod | Form storage (server only) |
| `NEXT_PUBLIC_SUPABASE_URL` | for uploads | Lets the browser PUT Atelier images (CSP) |
| `RESEND_API_KEY`, `NOTIFY_EMAIL_TO`, `EMAIL_FROM` | optional | Notifications + auto-replies |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | optional | Bot check on forms |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | optional | Plausible in addition to Vercel Analytics |
| `NEXT_PUBLIC_ENABLE_PREORDER` + Razorpay keys + `RESERVATION_DEPOSIT_INR` | phase 2 | Refundable reservations (off by default) |

## Database

SQL migrations live in `supabase/migrations/`. Apply with the Supabase CLI (`supabase db push`) or paste into the SQL editor. They create:

- `waitlist`, `b2b_enquiries`, `atelier_commissions`, `contact_messages`, `reservations` (RLS on, **no** policies, no anon access)
- `rate_limits` + `rate_limit_hit()` for per-IP rate limiting
- private storage bucket `atelier-uploads` (images only, 10 MB max)

Read submissions in the Supabase dashboard (Table editor). Use the `status` column (`new` → `contacted` → …) to track follow-up.

## Deploy (Vercel)

1. Import the GitHub repo in Vercel and set **Root Directory = `blob`**.
2. Add the env vars above for Production (and Preview if you want forms working there).
3. Push: every branch gets a preview URL; the default branch deploys to production.
4. Enable **Web Analytics** in the Vercel project (Analytics tab).

## Editing content

You don't need to touch components to change copy:

| What | File |
|---|---|
| Products, specs, prices, CTAs | `content/products.ts` |
| FAQ | `content/faq.ts` |
| Story page | `content/story.ts` |
| Contact details, socials, launch line, design principles, nav | `content/site.ts` |
| Privacy / terms / shipping | `content/legal.ts` (`[[KEY]]` = placeholder) |
| Email auto-replies | `lib/email.ts` |

Placeholders still to fill are listed in **PLACEHOLDERS.md**; design/engineering choices in **DECISIONS.md**.

## Structure

```
app/            routes, server actions (actions.ts), API routes (uploads, reservations), OG images, sitemap, robots
components/     Blob, BlobScene (hero canvas), HeroScene, TierCard, ComparisonTable, Timeline, SensingDiagram, forms/…
content/        editable copy (TS)
lib/            validation (zod), supabase server client, rate limit, email, analytics, SEO helpers, blob geometry
supabase/       migrations
```
