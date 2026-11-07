/**
 * Site-wide copy and configuration.
 * Anything marked `null` or listed in PLACEHOLDERS.md must be confirmed
 * before launch. Unconfirmed values render as visibly dashed placeholders.
 */

function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProd) return `https://${vercelProd}`;
  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const site = {
  name: "BLOB",
  tagline: "Light That Feels Alive.",
  description:
    "Small glowing forms that wake when you walk by — and fade when you leave. Warm 2200K motion-responsive ambient lights, designed in Kerala.",
  philosophy:
    "Make natural environments gently responsive to human presence without overwhelming their darkness.",
  url: resolveSiteUrl(),
  locale: "en_IN",

  /** Public contact details: placeholders until confirmed. */
  contact: {
    email: null as string | null, // {{CONTACT_EMAIL}}
    whatsapp: null as string | null, // {{WHATSAPP_NUMBER}}, e.g. "+91 90000 00000"
    grievanceOfficer: null as string | null, // {{GRIEVANCE_OFFICER_NAME}}
    grievanceEmail: null as string | null, // {{GRIEVANCE_EMAIL}}
    legalEntity: null as string | null, // {{LEGAL_ENTITY_NAME}}
    address: null as string | null, // {{REGISTERED_ADDRESS}}
  },

  social: {
    instagram: null as string | null, // {{INSTAGRAM_URL}}
    youtube: null as string | null, // {{YOUTUBE_URL}}
  },

  launch: {
    /** {{LAUNCH_DATE}}: wording from the brief, confirm before launch. */
    shipping: "Launching 2027 — join the waitlist for first access.",
    confirmed: false,
  },
} as const;

export const nav = [
  { href: "/collection", label: "Collection" },
  { href: "/resorts", label: "Resorts" },
  { href: "/atelier", label: "Atelier" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/story", label: "Story" },
] as const;

export const legalNav = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/shipping-returns", label: "Shipping & returns" },
  { href: "/contact", label: "Contact" },
] as const;

export const principles = [
  { a: "Organic", b: "not geometric", line: "Forms found, not drawn with a ruler." },
  { a: "Soft", b: "not industrial", line: "Rounded, tactile, kind to the hand." },
  { a: "Warm", b: "not bright", line: "2200K amber. Firelight, not floodlight." },
  { a: "Responsive", b: "not always-on", line: "Awake only while someone is near." },
  { a: "Modular", b: "not disposable", line: "A shared core across every tier." },
  { a: "Repairable", b: "", line: "A standard cell you can swap yourself." },
  { a: "Kind to nature", b: "", line: "Dark most of the night, for the creatures who live there." },
] as const;
