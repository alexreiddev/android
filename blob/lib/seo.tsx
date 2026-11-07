import type { Metadata } from "next";
import { site } from "@/content/site";
import type { Tier } from "@/content/products";

/** Per-page metadata with canonical + OG/Twitter. OG image comes from the route's opengraph-image. */
export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: "website", siteName: "BLOB", locale: site.locale },
    twitter: { card: "summary_large_image", title, description },
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function organizationLd() {
  const sameAs = [site.social.instagram, site.social.youtube].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BLOB",
    url: site.url,
    logo: `${site.url}/icon.svg`,
    slogan: site.tagline,
    description: site.description,
    ...(sameAs.length ? { sameAs } : {}),
    ...(site.contact.email ? { email: site.contact.email } : {}),
    address: { "@type": "PostalAddress", addressRegion: "Kerala", addressCountry: "IN" },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path === "/" ? "" : it.path}`,
    })),
  };
}

export function productLd(tier: Tier) {
  const offers =
    tier.price.confirmed && tier.price.amountInr
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "INR",
            price: tier.price.amountInr,
            availability: "https://schema.org/PreOrder",
            url: `${site.url}/collection/${tier.slug}`,
          },
        }
      : {};
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: tier.name,
    description: tier.intro,
    brand: { "@type": "Brand", name: "BLOB" },
    category: "Outdoor ambient lighting",
    material: tier.material,
    url: `${site.url}/collection/${tier.slug}`,
    image: `${site.url}/collection/${tier.slug}/opengraph-image`,
    ...offers,
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
