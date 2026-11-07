import type { Metadata } from "next";
import { TierCard } from "@/components/TierCard";
import { Container, PrelaunchNote, SectionHeading } from "@/components/ui";
import { packages, sharedCore, specsNote, tiers } from "@/content/products";
import { breadcrumbLd, JsonLd, pageMeta } from "@/lib/seo";
import { TrackedLink } from "@/components/TrackedLink";
import { btn } from "@/components/ui";

export const metadata: Metadata = pageMeta({
  title: "The collection: Field, Soft and Atelier",
  description:
    "Three BLOB lights on one warm, motion-responsive core: Field for resorts and paths, Soft for home gardens, Atelier in hand-blown glass. Designed in Kerala.",
  path: "/collection",
});

export default function CollectionPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Collection", path: "/collection" }])} />
      <Container className="pt-16 sm:pt-24">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent-ink">The collection</p>
        <h1 className="max-w-3xl text-4xl sm:text-6xl">One gentle core. Three bodies.</h1>
        <p className="mt-6 max-w-2xl text-lg text-ink-muted">
          Every BLOB wakes when you come near and fades when you leave, in the same warm 2200K amber. What changes is the body:
          tough and milky for resort paths, soft silicone for your garden, hand-blown glass for one special place.
        </p>
        <div className="mt-6">
          <PrelaunchNote>{specsNote}</PrelaunchNote>
        </div>
      </Container>

      <Container className="mt-14">
        <h2 className="sr-only">Tiers</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((t) => (
            <TierCard key={t.slug} tier={t} />
          ))}
        </div>
      </Container>

      <section aria-labelledby="shared" className="py-20">
        <Container>
          <SectionHeading id="shared" eyebrow="In every BLOB" title="The same quiet behaviour, whatever the body." />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sharedCore.map((c) => (
              <li key={c} className="organic-card flex items-center gap-3 border border-line bg-bg-raised px-5 py-4">
                <span aria-hidden className="h-2.5 w-2.5 shrink-0 rounded-full bg-glow shadow-[0_0_10px_rgb(255_181_71)]" />
                {c}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="packages" className="pb-10">
        <Container>
          <SectionHeading id="packages" eyebrow="For properties" title="Packages" />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {packages.map((p) => (
              <article key={p.name} className="organic-card border border-line bg-bg-raised p-6">
                <h3 className="text-2xl">{p.name}</h3>
                <p className="mt-2 text-ink-muted">{p.line}</p>
                <p className="mt-4 font-semibold text-ink-strong">Price: {p.price.display}</p>
              </article>
            ))}
          </div>
          <TrackedLink href="/resorts#quote" event="cta_fleet_quote" eventProps={{ location: "collection" }} className={`${btn.primary} mt-8`}>
            Request a quote
          </TrackedLink>
        </Container>
      </section>
    </>
  );
}
