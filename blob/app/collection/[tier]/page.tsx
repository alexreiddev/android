import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Blob } from "@/components/Blob";
import { PlaceholderMedia } from "@/components/PlaceholderMedia";
import { SpecsTable } from "@/components/SpecsTable";
import { TrackedLink } from "@/components/TrackedLink";
import { btn, Container, Eyebrow } from "@/components/ui";
import { getTier, tiers } from "@/content/products";
import { breadcrumbLd, JsonLd, pageMeta, productLd } from "@/lib/seo";
import { ReserveButton } from "@/components/ReserveButton";

export function generateStaticParams() {
  return tiers.map((t) => ({ tier: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/collection/[tier]">): Promise<Metadata> {
  const { tier: slug } = await params;
  const tier = getTier(slug);
  if (!tier) return {};
  return pageMeta({ title: tier.seo.title, description: tier.seo.description, path: `/collection/${tier.slug}` });
}

export default async function TierPage({ params }: PageProps<"/collection/[tier]">) {
  const { tier: slug } = await params;
  const tier = getTier(slug);
  if (!tier) notFound();
  const others = tiers.filter((t) => t.slug !== tier.slug);

  return (
    <>
      <JsonLd data={productLd(tier)} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Collection", path: "/collection" },
          { name: tier.name, path: `/collection/${tier.slug}` },
        ])}
      />

      <Container className="pt-10">
        <nav aria-label="Breadcrumb" className="text-sm text-ink-muted">
          <ol className="flex gap-2">
            <li>
              <Link href="/collection" className="hover:text-accent-ink">
                Collection
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-ink">
              {tier.name}
            </li>
          </ol>
        </nav>
      </Container>

      {/* Hero render */}
      <Container className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="night-scope organic-card blob-wake relative grid aspect-square place-items-center overflow-hidden border border-line" style={{ ["--blob-rest" as string]: "1" }}>
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_70%,rgba(255,181,71,0.14),transparent_70%)]" />
          <Blob seed={tier.seed} tone={tier.tone} state="breathe" className="relative w-3/5 text-[#d9d6cc]" title={`Illustration of ${tier.name}, glowing`} />
          <span className="absolute bottom-4 left-4 text-xs text-ink-muted">Illustration. Product photography coming soon.</span>
        </div>
        <div>
          <Eyebrow>{tier.tierLabel}</Eyebrow>
          <h1 className="text-4xl sm:text-6xl">{tier.name}</h1>
          <p className="mt-4 font-display text-2xl text-ink-strong">{tier.oneLiner}</p>
          <p className="mt-4 text-lg text-ink-muted">{tier.intro}</p>
          <p className="mt-6 text-sm text-ink-muted">
            Price (indicative): <span className="font-semibold text-ink-strong">{tier.price.display}</span>
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <TrackedLink href={tier.cta.href} event={tier.cta.event} className={btn.primary}>
              {tier.cta.label}
            </TrackedLink>
            {tier.slug === "soft" && <ReserveButton tier={tier.slug} />}
          </div>
        </div>
      </Container>

      {/* Material */}
      <section aria-labelledby="material" className="py-20">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Material</Eyebrow>
            <h2 id="material" className="text-3xl sm:text-4xl">
              {tier.material}
            </h2>
            <p className="mt-4 text-lg text-ink-muted">{tier.materialDetail}</p>
          </div>
          <PlaceholderMedia type="image" label={`Material close-up: ${tier.name}`} ratio="4/3" />
        </Container>
      </section>

      {/* Made for */}
      <section aria-labelledby="madefor" className="py-10">
        <Container>
          <Eyebrow>Made for</Eyebrow>
          <h2 id="madefor" className="text-3xl sm:text-4xl">
            {tier.madeFor.join(" · ")}
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tier.occasions.map((o) => (
              <li key={o.title} className="organic-card border border-line bg-bg-raised p-5">
                <h3 className="text-xl">{o.title}</h3>
                <p className="mt-1 text-ink-muted">{o.line}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Behaviour */}
      <section aria-labelledby="behaviour" className="py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>Behaviour</Eyebrow>
            <h2 id="behaviour" className="text-3xl sm:text-4xl">
              How it lives with you.
            </h2>
            <ul className="mt-6 space-y-4">
              {tier.behaviour.map((b) => (
                <li key={b} className="flex gap-3 text-lg text-ink">
                  <span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-glow" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-2xl">Specifications</h2>
            <SpecsTable specs={tier.specs} caption={`${tier.name} specifications`} />
          </div>
        </Container>
      </section>

      {/* Box + care */}
      <section aria-label="In the box, care and charging" className="py-10">
        <Container className="grid gap-6 md:grid-cols-2">
          <div className="organic-card border border-line bg-bg-raised p-6 sm:p-8">
            <h2 className="text-2xl">What&apos;s in the box</h2>
            <ul className="mt-4 space-y-2 text-ink">
              {tier.inTheBox.map((x) => (
                <li key={x}>· {x}</li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-ink-muted">Contents are planned and may change before launch.</p>
          </div>
          <div className="organic-card border border-line bg-bg-raised p-6 sm:p-8">
            <h2 className="text-2xl">Care &amp; charging</h2>
            <ul className="mt-4 space-y-2 text-ink">
              {tier.care.map((x) => (
                <li key={x}>· {x}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section aria-labelledby="next" className="py-20">
        <Container>
          <div className="night-scope organic-card border border-line px-6 py-12 text-center sm:px-12">
            <h2 id="next" className="text-3xl">
              {tier.slug === "field" ? "Light your property." : tier.slug === "atelier" ? "Begin with a conversation." : "Be first to bring one home."}
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-ink">Price (indicative): {tier.price.display}</p>
            <TrackedLink href={tier.cta.href} event={tier.cta.event} eventProps={{ location: "tier_footer" }} className={`${btn.primary} mt-8`}>
              {tier.cta.label}
            </TrackedLink>
          </div>
          <div className="mt-12">
            <h2 className="text-xl">Also in the collection</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/collection/${o.slug}`} className={btn.secondary}>
                    {o.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
