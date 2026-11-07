import { getTier, tiers } from "@/content/products";
import { ogSize, renderOg } from "@/lib/og";

export const alt = "BLOB light";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return tiers.map((t) => ({ tier: t.slug }));
}

export default async function Image({ params }: { params: Promise<{ tier: string }> }) {
  const { tier: slug } = await params;
  const tier = getTier(slug);
  return renderOg(tier ? tier.oneLiner : "Light That Feels Alive.", tier ? tier.name : "BLOB", tier?.seed ?? 7);
}
