import Link from "next/link";
import type { Tier } from "@/content/products";
import { Blob } from "./Blob";

export function TierCard({ tier, headingLevel = 3 }: { tier: Tier; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="blob-wake group organic-card relative flex flex-col border border-line bg-bg-raised p-6 transition-colors duration-700 hover:border-line-strong focus-within:border-line-strong">
      <div className="night-scope organic-card relative mb-6 grid aspect-[4/3] place-items-center overflow-hidden" style={{ ["--blob-rest" as string]: "0.55" }}>
        <Blob seed={tier.seed} tone={tier.tone} state="hover" className="w-40 text-[#d9d6cc]" />
        <span className="absolute left-4 top-4 organic-pill border border-line-strong px-3 py-1 text-xs text-ink">{tier.tierLabel}</span>
      </div>
      <H className="text-2xl">
        <Link href={`/collection/${tier.slug}`} className="after:absolute after:inset-0 after:content-['']">
          {tier.name}
        </Link>
      </H>
      <p className="mt-2 text-ink-muted">{tier.oneLiner}</p>
      <dl className="mt-5 space-y-3 text-sm">
        <div>
          <dt className="text-xs uppercase tracking-[0.16em] text-ink-muted">Material</dt>
          <dd className="mt-0.5 text-ink">{tier.material}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.16em] text-ink-muted">Made for</dt>
          <dd className="mt-0.5 text-ink">{tier.madeForShort}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.16em] text-ink-muted">Price (indicative)</dt>
          <dd className="mt-0.5 font-semibold text-ink-strong">{tier.price.display}</dd>
        </div>
      </dl>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent-ink" aria-hidden>
        Discover {tier.name.replace("BLOB ", "")}
        <span className="transition-transform duration-700 group-hover:translate-x-1">→</span>
      </span>
    </article>
  );
}
