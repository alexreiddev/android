/**
 * BLOB product content. Edit copy here; components read from this file.
 *
 * IMPORTANT: every spec is a DESIGN TARGET until confirmed by testing.
 * Prices are indicative placeholders (see PLACEHOLDERS.md). Set
 * `price.confirmed = true` and `price.amountInr` once final; only then does
 * the Product structured data include an offer.
 */

export type TierSlug = "field" | "soft" | "atelier";

export type Price = {
  key: string; // placeholder key in PLACEHOLDERS.md
  display: string; // what visitors see
  amountInr: number | null; // lowest price, for schema.org offers
  confirmed: boolean;
};

export type Tier = {
  slug: TierSlug;
  name: string;
  tierLabel: string;
  tone: "frosted" | "silicone" | "glass";
  seed: number;
  oneLiner: string;
  intro: string;
  material: string;
  materialDetail: string;
  madeFor: string[];
  madeForShort: string;
  occasions: { title: string; line: string }[];
  behaviour: string[];
  specs: { label: string; value: string }[];
  inTheBox: string[];
  care: string[];
  price: Price;
  cta: { label: string; href: string; event: string };
  secondaryCta?: { label: string; href: string; event: string };
  seo: { title: string; description: string };
};

/** Shared by all tiers. */
export const sharedCore = [
  "2200K warm amber light",
  "Wakes on motion, fades gently",
  "Senses darkness: sleeps through the day",
  "Battery powered: no wiring, no solar panel",
  "No Wi-Fi or app needed for normal use",
  "Replaceable cell",
];

export const tiers: Tier[] = [
  {
    slug: "field",
    name: "BLOB Field",
    tierLabel: "Commercial",
    tone: "frosted",
    seed: 7,
    oneLiner: "For paths that guests walk every night.",
    intro:
      "A milky, matte pebble on a twist-lock stake. Built for resorts, homestays and campsites that need dozens of lights to behave quietly, night after night.",
    material: "Moulded milky outdoor plastic",
    materialDetail:
      "A matte, softly textured shell that diffuses the light into a glow rather than a point. A twist-lock ground stake keeps it planted, and makes it hard to lift away.",
    madeFor: ["Resorts", "Homestays", "Campsites", "Pathways"],
    madeForShort: "Resorts, homestays, campsites, pathways",
    occasions: [
      { title: "Cottage paths", line: "Guests find their way back without a torch." },
      { title: "Steps and edges", line: "A low glow where the ground changes." },
      { title: "Campsites", line: "Light by the tents only when someone is moving." },
      { title: "Plantation walks", line: "Works under thick canopy, through the monsoon." },
    ],
    behaviour: [
      "Asleep and dark when no one is near.",
      "Wakes over a second or two when someone walks within range: 360° all around it.",
      "Stays with them while they are close, then fades slowly after they pass.",
      "When the cell runs low, it breathes slowly to tell your staff, not your guests.",
      "Set its mode with a tap of a magnet. No app, no pairing.",
    ],
    specs: [
      { label: "Light", value: "2200K warm amber" },
      { label: "Motion sensing", value: "360°" },
      { label: "Runtime", value: "~30 nights per charge (at ~2 h of light per night)" },
      { label: "Power", value: "Swap-and-go 18650 cell" },
      { label: "Charging", value: "Fleet charging rack" },
      { label: "Low battery", value: "Slow 'breathing' cue" },
      { label: "Mode setting", value: "Magnet tap" },
      { label: "Mounting", value: "Twist-lock ground stake" },
      { label: "Connectivity", value: "None needed" },
    ],
    inTheBox: [
      "BLOB Field light",
      "Twist-lock ground stake",
      "18650 cell (fitted)",
      "Mode magnet (one per order)",
      "Quick-start card",
    ],
    care: [
      "Wipe the shell with a damp cloth. No solvents.",
      "Swap cells at the rack when a light breathes slowly at night.",
      "Keep a few charged spare cells on the rack so swaps take seconds.",
      "Lift by the body, not the stake, when moving a light.",
    ],
    price: {
      key: "PRICE_FIELD",
      display: "From ₹999 per unit for 100+ units",
      amountInr: null,
      confirmed: false,
    },
    cta: { label: "Request a fleet quote", href: "/resorts#quote", event: "cta_fleet_quote" },
    seo: {
      title: "BLOB Field: resort pathway lighting, motion-responsive",
      description:
        "Warm 2200K motion sensor path lights for resorts, homestays and campsites in Kerala and across India. No wiring, no solar, swap-and-go cells.",
    },
  },
  {
    slug: "soft",
    name: "BLOB Soft",
    tierLabel: "Premium",
    tone: "silicone",
    seed: 11,
    oneLiner: "A soft glowing creature for your garden.",
    intro:
      "Platinum silicone over a frosted core. Soft to touch, warm to look at. A light for homes, gardens and balconies, and a gift that feels alive.",
    material: "Platinum silicone skin over a frosted core",
    materialDetail:
      "The silicone skin gives slightly under your hand, like something living. Beneath it, a frosted core spreads the light evenly so the whole body glows.",
    madeFor: ["Homes", "Gardens", "Balconies", "Gifting"],
    madeForShort: "Homes, gardens, balconies, gifting",
    occasions: [
      { title: "Garden beds", line: "A few glowing forms among the plants." },
      { title: "Balconies", line: "Wakes when you step out for air." },
      { title: "Doorsteps", line: "A warm hello when you come home late." },
      { title: "Gifting", line: "For someone who loves their garden at night." },
    ],
    behaviour: [
      "Sleeps through the day: a darkness sensor keeps it off in daylight.",
      "Wakes slowly when you approach, and glows while you're near.",
      "Fades over several seconds after you leave. Never snaps off.",
      "Charges over USB-C. No app, no Wi-Fi.",
    ],
    specs: [
      { label: "Light", value: "2200K warm amber" },
      { label: "Motion sensing", value: "Wake on approach, gentle fade" },
      { label: "Runtime", value: "~30 nights per charge (at ~2 h of light per night)" },
      { label: "Charging", value: "USB-C" },
      { label: "Power", value: "Replaceable cell" },
      { label: "Finish", value: "Soft-touch platinum silicone" },
      { label: "Colours", value: "Colour options to be announced" },
      { label: "Connectivity", value: "None needed" },
    ],
    inTheBox: ["BLOB Soft light", "USB-C cable", "Care card"],
    care: [
      "Rinse or wipe the silicone with mild soap and water.",
      "Charge with any USB-C cable. A full charge is designed to last about a month of evenings.",
      "Keep it on soil, grass, stone or decking. It doesn't need sun.",
    ],
    price: {
      key: "PRICE_SOFT",
      display: "₹1,999–₹2,999",
      amountInr: null,
      confirmed: false,
    },
    cta: { label: "Join the waitlist", href: "/#waitlist", event: "cta_waitlist_soft" },
    seo: {
      title: "BLOB Soft: warm motion sensor garden light",
      description:
        "A soft silicone motion sensor garden light for homes and balconies in India. Warm 2200K ambient glow, USB-C charging, no app.",
    },
  },
  {
    slug: "atelier",
    name: "BLOB Atelier",
    tierLabel: "Luxury",
    tone: "glass",
    seed: 19,
    oneLiner: "Hand-blown glass. Light that walks ahead of you.",
    intro:
      "Hand-blown borosilicate glass, clear or frosted, made to commission. Each piece is unique. In a cluster, the light walks ahead of you along the path.",
    material: "Hand-blown borosilicate glass, clear or frosted",
    materialDetail:
      "Every piece is blown by hand, so no two are the same: small variations in wall and curve are part of the piece. Clear glass shows the glowing core; frosted glass turns the whole form into light.",
    madeFor: ["Luxury villas", "Boutique resorts", "Architects", "Landscape designers"],
    madeForShort: "Luxury villas, boutique resorts, architects, landscape designers",
    occasions: [
      { title: "Arrival paths", line: "Light that walks ahead of each guest." },
      { title: "Courtyards", line: "A constellation that wakes as you cross it." },
      { title: "Water edges", line: "Glass and glow reflected in still water." },
      { title: "Private gardens", line: "Pieces sized and tinted for one place." },
    ],
    behaviour: [
      "Cluster mode: lights ahead of you wake in a gentle cascade, so the path reveals itself as you walk.",
      "Tunable colour temperature, from candle-warm to soft white.",
      "Stillness hold: stays lit while you sit quietly nearby.",
      "Charges on a wireless dock.",
      "Optional advanced setup for installations. Day-to-day, no app is needed.",
    ],
    specs: [
      { label: "Light", value: "Tunable 1900–2700K" },
      { label: "Cluster mode", value: "Cascading 'light walks ahead of you'" },
      { label: "Stillness hold", value: "Stays lit while you're still nearby" },
      { label: "Charging", value: "Wireless charging dock" },
      { label: "Glass", value: "Hand-blown borosilicate, clear or frosted" },
      { label: "Customisation", value: "Size, shape, tint, engraving" },
      { label: "Power", value: "Replaceable cell" },
    ],
    inTheBox: [
      "Your commissioned BLOB Atelier piece(s)",
      "Wireless charging dock",
      "Care and handling guide",
      "Installation plan (for cluster commissions)",
    ],
    care: [
      "Clean the glass with a soft cloth and a little water.",
      "Return pieces to the dock to charge.",
      "Handle glass with two hands; the core lifts out for servicing.",
    ],
    price: {
      key: "PRICE_ATELIER",
      display: "From ₹12,000 per piece · installations by quote",
      amountInr: null,
      confirmed: false,
    },
    cta: { label: "Start a commission", href: "/atelier#commission", event: "cta_atelier_commission" },
    seo: {
      title: "BLOB Atelier: handblown glass lamp, made to commission",
      description:
        "Handblown glass lamps made to commission in India. Borosilicate glass, tunable warm light, cascading cluster mode for villas and boutique resorts.",
    },
  },
];

export function getTier(slug: string): Tier | undefined {
  return tiers.find((t) => t.slug === slug);
}

export const packages = [
  {
    name: "Firefly Path",
    line: "An installation package for resorts: 15–20 Atelier or Field units, designed and installed for your paths.",
    price: { key: "PRICE_FIREFLY_PATH", display: "By quote" },
  },
  {
    name: "BLOB Field Fleet Pack",
    line: "Units, a charging rack, spare cells and a 2-year warranty, ready for your staff to run.",
    price: { key: "PRICE_FLEET_PACK", display: "By quote" },
  },
] as const;

export const specsNote = "Pre-launch: specifications are design targets, not tested results.";
