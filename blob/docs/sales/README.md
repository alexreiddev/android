# BLOB go-to-market plan (resorts first)

**Decision:** lead with resorts and homestays (BLOB Field). BLOB Soft stays waitlist-only. Atelier stays "by commission".

**Why:** one property is 100+ units (about ₹1 lakh at the indicative ₹999), you can reach owners directly, and one pilot gives the photos, film and quote every other audience needs.

**Where we really are:** the prototype is designed but not built. So the first job is a **demo kit**, not a marketing push.

## Stages

| # | Stage | You do | Site / tools | Done when |
|---|---|---|---|---|
| 0 | Stop the leak | Give contact email + WhatsApp. Decide the database (see below) | Forms save, email alerts on | A test quote lands in your inbox |
| 1 | Demo kit | Build 5–8 working Field units + stakes + a way to charge them | — | Kit survives a week outdoors at home |
| 2 | Shortlist + outreach | Score 50 properties (`shortlist.csv`), send first messages (`outreach-messages.md`) | Resorts page, one-page brief, quote form | 10 real conversations |
| 3 | Night demos | Take the kit to interested properties (`demo-night-checklist.md`) | "Night demo" tick-box on the quote form | 5 demos done, photos from each |
| 4 | Pilot | Sign up to 3 properties (`pilot-terms-draft.md`), install, film | Night film + photos replace placeholders | 1 property on film, 1 quote with permission |
| 5 | First paid orders | Quote Fleet Packs to the warm list | Testimonials section switched on | 2–3 paid orders |
| 6 | Home launch | Open refundable reservations for BLOB Soft | `NEXT_PUBLIC_ENABLE_PREORDER=true` | Reservations cover the first batch |

The "done when" numbers are targets to steer by, not forecasts.

## What to track (weekly, one line each)

Properties contacted · replies · demos booked · demos done · pilots signed · quotes sent · orders. All quote requests land in the `b2b_enquiries` table; use its `status` column (`new → contacted → demo → pilot → quoted → won / lost`).

## What not to do yet

- No paid ads. There is nothing to buy and no proof to show.
- No AI-generated film on the site as if it were real. Use it on social, labelled as a render.
- No new audiences (apple farms, family safety) until one resort pilot is running. Park them in a list.

## Open items only you can close

1. Contact email and WhatsApp number (the brief and the site show placeholders until then).
2. Database: your Supabase account is at its free limit of 2 active projects. Pause one, upgrade, or name an existing project to share.
3. Pilot terms: discount, number of units, how long, who owns the units afterwards.
4. Final Field price and minimum order.
