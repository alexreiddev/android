# PLACEHOLDERS

Everything to fill in or confirm before launch. On the site, unconfirmed values show as **dashed amber marks** (search the code for `data-placeholder` or `[[`).

## Prices: `content/products.ts`
Shown as "indicative". Set `price.confirmed = true` and `price.amountInr` to add schema.org offers.

| Key | Current text (from brief) | Where |
|---|---|---|
| `PRICE_FIELD` | From ₹999 per unit for 100+ units | Field tier, cards, resorts page |
| `PRICE_SOFT` | ₹1,999–₹2,999 | Soft tier, cards |
| `PRICE_ATELIER` | From ₹12,000 per piece · installations by quote | Atelier tier/page |
| `PRICE_FIREFLY_PATH` | By quote | Packages |
| `PRICE_FLEET_PACK` | By quote | Packages |
| `DEPOSIT_AMOUNT` | (env `RESERVATION_DEPOSIT_INR`) | Phase-2 reservations |

## Dates
| Key | Current | Where |
|---|---|---|
| `LAUNCH_DATE` | "Launching 2027 — join the waitlist for first access." | `content/site.ts` → `launch`, FAQ |
| `POLICY_EFFECTIVE_DATE` | placeholder | legal pages |

## Specifications: `content/products.ts`
All specs are **design targets**: runtime (~30 nights @ 2 h/night), 360° sensing, 1900–2700K tuning, contents of the box, colour options for Soft ("to be announced"). Confirm after testing. Do **not** add IP ratings or certifications until tested; the FAQ says ratings will follow testing.

## Contact & company: `content/site.ts`
| Key | Where |
|---|---|
| `CONTACT_EMAIL` | footer, contact page, terms, shipping |
| `WHATSAPP_NUMBER` | contact page |
| `INSTAGRAM_URL`, `YOUTUBE_URL` | footer (also added to Organization schema `sameAs`) |
| `LEGAL_ENTITY_NAME` | footer, privacy, terms |
| `REGISTERED_ADDRESS` | privacy (grievance) |
| `GRIEVANCE_OFFICER_NAME`, `GRIEVANCE_EMAIL` | privacy (DPDP Act) |

## Legal: `content/legal.ts` (all three pages are DRAFTS; lawyer review needed)
`GRIEVANCE_RESPONSE_DAYS`, `DATA_STORAGE_REGION` (your Supabase region), `RETENTION_WAITLIST`, `RETENTION_ENQUIRIES`, `RETENTION_UPLOADS`, `JURISDICTION_CITY`, `SHIPPING_TIMELINES`, `SHIPPING_CHARGES`, `RETURN_WINDOW_DAYS`, `REFUND_DAYS`, `WARRANTY_TERMS` (Fleet Pack 2-year warranty is from the brief).

## Resorts pilot: `app/resorts/page.tsx`
| Key | Current |
|---|---|
| `PILOT_COUNT` | 3 (from brief, marked placeholder) |
| `PILOT_TERMS` | "pilot terms to be confirmed" |

## Copy marked DRAFT
- `STORY_FOUNDER`: founder section on `/story` (`content/story.ts`). Write in your own voice.
- FAQ (`content/faq.ts`): set `faqReviewed = true` once checked. This removes the draft banner.
- Story page: set `storyDraft = false` when final.

## Media (`<PlaceholderMedia>` slots)
| Slot | Page |
|---|---|
| Night film: orchard path waking up | Home |
| Material close-up ×3 (Field, Soft, Atelier) | Tier pages |
| Fleet charging rack | Resorts |
| Glass blowing: an Atelier piece being made | Atelier |
| The rambutan orchard at night | Story |
Tier hero "illustrations" can be replaced with real product photography (`next/image`, AVIF/WebP automatic).

## Testimonials
`components/Testimonials.tsx`: empty on purpose. Add only real, attributed quotes with permission, then render `<Testimonials />` where wanted.

## Operational
- Domain (`NEXT_PUBLIC_SITE_URL`), Resend sender domain (`EMAIL_FROM`) and `NOTIFY_EMAIL_TO`.
- Turnstile keys (optional).
