import type { Metadata } from "next";
import { BehaviourStory } from "@/components/BehaviourStory";
import { Blob } from "@/components/Blob";
import { ComparisonTable } from "@/components/ComparisonTable";
import { HeroScene } from "@/components/HeroScene";
import { PlaceholderMedia } from "@/components/PlaceholderMedia";
import { TierCard } from "@/components/TierCard";
import { TrackedLink } from "@/components/TrackedLink";
import { WaitlistForm } from "@/components/forms/WaitlistForm";
import { btn, Container, SectionHeading } from "@/components/ui";
import { sharedCore, tiers } from "@/content/products";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMeta({
    title: `BLOB: ${site.tagline}`,
    description:
      "Warm ambient outdoor lights that wake when you walk by and fade when you leave. Motion sensor garden lights and resort pathway lighting, designed in Kerala.",
    path: "/",
  }),
  title: { absolute: `BLOB: ${site.tagline}` },
};

export default function Home() {
  return (
    <>
      <HeroScene count={5} className="min-h-[max(100svh,640px)]">
        <div className="mx-auto max-w-3xl px-5 pt-24 text-center sm:pt-36">
          <h1 className="glow-text text-5xl sm:text-7xl">Light That Feels Alive.</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-ink sm:text-xl">
            Small glowing forms that wake when you walk by — and fade when you leave.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <TrackedLink href="/collection" event="cta_explore_collection" className={btn.primary}>
              Explore the collection
            </TrackedLink>
            <TrackedLink href="/resorts" event="cta_resorts" eventProps={{ location: "hero" }} className={btn.secondary}>
              For resorts &amp; homestays
            </TrackedLink>
          </div>
          <p className="mt-10 hidden text-sm text-ink-muted sm:block">Move closer to the lights below.</p>
          <p className="mt-10 text-sm text-ink-muted sm:hidden">Tap the lights below, or scroll past them.</p>
        </div>
      </HeroScene>

      {/* How it behaves */}
      <section aria-labelledby="behaves" className="py-24">
        <Container>
          <SectionHeading
            id="behaves"
            eyebrow="How it behaves"
            title="It sleeps until you arrive."
            lede="No switch, no timer, no app. A BLOB notices you, keeps you company, then gives the night back."
          />
          <div className="mt-12">
            <BehaviourStory />
          </div>
        </Container>
      </section>

      {/* Tiers */}
      <section aria-labelledby="tiers" className="py-20">
        <Container>
          <SectionHeading
            id="tiers"
            eyebrow="The collection"
            title="One gentle core. Three bodies."
            lede="Every BLOB shares the same warm 2200K light and the same quiet behaviour. Choose the body that fits your place."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {tiers.map((t) => (
              <TierCard key={t.slug} tier={t} />
            ))}
          </div>
          <ul className="mt-10 flex flex-wrap gap-2 text-sm text-ink-muted" aria-label="Shared by every BLOB">
            {sharedCore.map((c) => (
              <li key={c} className="organic-pill border border-line px-3.5 py-1.5">
                {c}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Why not solar */}
      <section aria-labelledby="why" className="py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <div>
            <SectionHeading
              id="why"
              eyebrow="Why not solar pebbles?"
              title="Warm as a firefly. Gentle on the dark."
              lede="No wires. No app. No solar panel straining under the trees."
            />
            <p className="mt-4 text-ink-muted">
              Most garden lights glow all night for no one, in cold white or shifting colours. Under a canopy or through a Kerala
              monsoon, solar ones barely charge. BLOB works the other way round.
            </p>
          </div>
          <ComparisonTable />
        </Container>
      </section>

      {/* Born in an orchard */}
      <section aria-labelledby="orchard" className="py-20">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <PlaceholderMedia type="video" label="Night film: orchard path waking up" />
          <div>
            <SectionHeading
              id="orchard"
              eyebrow="Born in an orchard"
              title="Lights that only wake for you."
            />
            <p className="mt-4 text-lg text-ink-muted">
              BLOB was designed in Kerala. Our first field trial, Project Varsha, ran along the paths of a rambutan orchard.
            </p>
            <p className="mt-4 text-ink-muted">The aim was simple: light the way for a person, then let the orchard return to the dark.</p>
            <TrackedLink href="/story" event="cta_read_story" className={`${btn.link} mt-6 inline-block`}>
              Read our story
            </TrackedLink>
          </div>
        </Container>
      </section>

      {/* Resorts teaser */}
      <section aria-labelledby="resorts-teaser" className="py-20">
        <Container>
          <div className="night-scope organic-card relative overflow-hidden border border-line px-6 py-14 sm:px-12">
            <div aria-hidden className="absolute -right-10 bottom-0 w-64 opacity-90 sm:w-80">
              <Blob seed={7} state="breathe" className="text-[#d9d6cc]" />
            </div>
            <div className="relative max-w-xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent-ink">For resorts &amp; homestays</p>
              <h2 id="resorts-teaser" className="text-3xl sm:text-4xl">
                Light your paths without lighting up the night.
              </h2>
              <p className="mt-4 text-lg text-ink">
                No trenching, no wiring, no solar panels. Guests feel guided, not floodlit, and your staff swap cells in seconds.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <TrackedLink href="/resorts" event="cta_resorts" eventProps={{ location: "home_teaser" }} className={btn.primary}>
                  See BLOB for resorts
                </TrackedLink>
                <TrackedLink href="/resorts#quote" event="cta_fleet_quote" eventProps={{ location: "home_teaser" }} className={btn.secondary}>
                  Request a fleet quote
                </TrackedLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Waitlist */}
      <section id="waitlist" aria-labelledby="waitlist-title" className="py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeading
              id="waitlist-title"
              eyebrow="Waitlist"
              title="Be first when they wake."
              lede={site.launch.shipping}
            />
          </div>
          <div className="organic-card border border-line bg-bg-raised p-6 sm:p-8">
            <WaitlistForm />
          </div>
        </Container>
      </section>
    </>
  );
}
