/**
 * Legal copy. ALL DRAFTS: have a qualified Indian lawyer review before launch.
 * Text in [[DOUBLE_BRACKETS]] is a placeholder key rendered as a visible mark
 * (see PLACEHOLDERS.md).
 */

export type LegalBlock = { h?: string; p?: string[]; ul?: string[] };
export type LegalDoc = { title: string; description: string; updated: string; blocks: LegalBlock[] };

export const privacy: LegalDoc = {
  title: "Privacy notice",
  description:
    "How BLOB collects, uses and protects your personal data under India's Digital Personal Data Protection Act, 2023.",
  updated: "[[POLICY_EFFECTIVE_DATE]]",
  blocks: [
    {
      p: [
        "This notice explains what personal data BLOB ([[LEGAL_ENTITY_NAME]], \"we\") collects through this website, why, how long we keep it and the rights you have under the Digital Personal Data Protection Act, 2023 (DPDP Act). We are the Data Fiduciary for this data.",
      ],
    },
    {
      h: "What we collect",
      ul: [
        "Waitlist: your email address and, if you choose, your name, city and the product you're interested in.",
        "Resort / fleet quote requests: property name, your name, role, email, phone number, property type, location, estimated number of units, areas to light, timeline, budget range and your message.",
        "Atelier commissions: your name, email, phone number, client type, project location, number of pieces, glass and placement preferences, budget range, desired date, your message and any inspiration images you upload.",
        "Contact messages: your name, email, topic and message.",
        "With every form: the page you submitted it from, campaign tags in the link you followed (UTM parameters), and a record of your consent.",
        "Security: a one-way hashed form of your IP address, kept briefly to stop spam and abuse (rate limiting).",
      ],
    },
    {
      h: "Why we use it (purpose)",
      ul: [
        "To reply to your enquiry, prepare quotes and design proposals, and arrange calls.",
        "To tell waitlist members when BLOB is available.",
        "To keep our forms safe from spam and abuse.",
        "To understand, in aggregate, how people use the site (see Analytics below).",
      ],
      p: ["We rely on your consent, given when you tick the box on a form. We do not sell your data or use it for unrelated marketing."],
    },
    {
      h: "Analytics and cookies",
      p: [
        "We use privacy-friendly, cookieless analytics that count page views and events (such as a form being submitted) without identifying you or tracking you across sites. We do not set advertising or tracking cookies. Your theme preference (night or dawn) is stored only in your own browser.",
      ],
    },
    {
      h: "Who processes it for us",
      ul: [
        "Supabase: secure database and private file storage for form submissions and uploads.",
        "Vercel: website hosting and cookieless analytics.",
        "Resend: sending confirmation and notification emails.",
        "Cloudflare Turnstile (if enabled): checking that form submissions come from people, not bots.",
      ],
      p: [
        "These providers act as Data Processors on our instructions. Some may process data outside India; we only use providers with appropriate safeguards and in line with any restrictions notified under the DPDP Act. Storage region: [[DATA_STORAGE_REGION]].",
      ],
    },
    {
      h: "How long we keep it (retention)",
      ul: [
        "Waitlist: until launch communications end, or until you ask us to remove you. At most [[RETENTION_WAITLIST]].",
        "Enquiries, quotes and commissions: for as long as needed to respond and, if you become a customer, for the period required by law for business records. Otherwise at most [[RETENTION_ENQUIRIES]].",
        "Inspiration images: deleted at most [[RETENTION_UPLOADS]] after your enquiry closes.",
        "Hashed IP records for rate limiting: deleted within a day.",
      ],
    },
    {
      h: "Your rights",
      p: ["Under the DPDP Act you can:"],
      ul: [
        "Ask for a summary of the personal data we hold about you and how we use it.",
        "Ask us to correct, complete, update or erase it.",
        "Withdraw your consent at any time. This doesn't affect anything we did before you withdrew it.",
        "Nominate another person to exercise your rights if you die or become incapable.",
        "Raise a grievance with us, and if you're not satisfied with our response, complain to the Data Protection Board of India.",
      ],
    },
    {
      h: "Grievance officer",
      p: [
        "Name: [[GRIEVANCE_OFFICER_NAME]]. Email: [[GRIEVANCE_EMAIL]]. Address: [[REGISTERED_ADDRESS]].",
        "We aim to respond within [[GRIEVANCE_RESPONSE_DAYS]] days.",
      ],
    },
    {
      h: "Children",
      p: ["This site is not meant for children. If you are under 18, please don't submit personal data without a parent or guardian."],
    },
    {
      h: "Security",
      p: [
        "Form data is sent over HTTPS and stored in a database that is not publicly readable. Uploaded images are kept in a private bucket. Only authorised people at BLOB can access them.",
      ],
    },
    {
      h: "Changes",
      p: ["We'll update this notice if our practices change, and show the new effective date at the top."],
    },
  ],
};

export const terms: LegalDoc = {
  title: "Terms of use",
  description: "Terms for using the BLOB website. Draft for review.",
  updated: "[[POLICY_EFFECTIVE_DATE]]",
  blocks: [
    {
      p: [
        "These terms govern your use of this website, operated by [[LEGAL_ENTITY_NAME]] (\"BLOB\"). By using the site you agree to them.",
      ],
    },
    {
      h: "Pre-launch information",
      p: [
        "BLOB products are not yet on sale. Specifications shown are design targets, not tested results, and may change. Prices are indicative and are not an offer. Joining the waitlist or requesting a quote does not create an order or obligation for either side.",
      ],
    },
    {
      h: "Quotes and commissions",
      p: ["Any quote, commission or installation is governed by a separate written agreement that will set out price, delivery, warranty and other terms."],
    },
    {
      h: "Your content",
      p: [
        "If you upload images or send us material, you confirm you have the right to share it and allow us to use it only to respond to your enquiry.",
      ],
    },
    {
      h: "Intellectual property",
      p: ["The BLOB name, logo, designs, text and illustrations on this site belong to BLOB. Please don't reuse them without permission."],
    },
    {
      h: "Liability",
      p: [
        "We work hard to keep the site accurate, but it is provided as-is. To the extent permitted by law, we're not liable for losses arising from use of the site.",
      ],
    },
    {
      h: "Law and jurisdiction",
      p: ["These terms are governed by the laws of India. Courts at [[JURISDICTION_CITY]], Kerala, have jurisdiction."],
    },
    { h: "Contact", p: ["Questions about these terms: [[CONTACT_EMAIL]]."] },
  ],
};

export const shippingReturns: LegalDoc = {
  title: "Shipping & returns",
  description: "BLOB shipping, returns, refunds and warranty: draft policy for review.",
  updated: "[[POLICY_EFFECTIVE_DATE]]",
  blocks: [
    {
      p: [
        "BLOB is not shipping yet. This draft describes how we intend to handle orders at launch and will be finalised before any sale.",
      ],
    },
    {
      h: "Shipping",
      ul: [
        "We plan to ship across India. Delivery areas and timelines: [[SHIPPING_TIMELINES]].",
        "Shipping charges: [[SHIPPING_CHARGES]].",
        "Field Fleet Packs and Atelier installations are delivered and installed as agreed in your quote.",
      ],
    },
    {
      h: "Returns",
      ul: [
        "BLOB Soft: return window of [[RETURN_WINDOW_DAYS]] days from delivery, unused and in original packaging.",
        "BLOB Atelier pieces are made to commission and can't be returned unless faulty.",
        "BLOB Field orders follow the terms in your quote.",
      ],
    },
    {
      h: "Refunds",
      p: ["Approved refunds are made to the original payment method within [[REFUND_DAYS]] days. Reservation deposits, if offered, are fully refundable until your order is confirmed."],
    },
    {
      h: "Warranty",
      p: [
        "Fleet Packs include a 2-year warranty. Warranty for other products: [[WARRANTY_TERMS]]. Cells are replaceable and available as spares.",
      ],
    },
    { h: "Contact", p: ["For anything about an order: [[CONTACT_EMAIL]]."] },
  ],
};
