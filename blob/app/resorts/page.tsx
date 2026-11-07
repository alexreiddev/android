import type { Metadata } from "next";
import { Blob } from "@/components/Blob";
import { HeroScene } from "@/components/HeroScene";
import { PlaceholderMedia } from "@/components/PlaceholderMedia";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { TrackedLink } from "@/components/TrackedLink";
import { btn, Container, Eyebrow, Placeholder, PrelaunchNote, SectionHeading } from "@/components/ui";
import { packages, specsNote } from "@/content/products";
import { breadcrumbLd, JsonLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "For resorts & homestays: pathway lighting without wiring",
  description:
    "Resort pathway lighting for Kerala and India: warm motion-responsive lights with no trenching, no wiring and no solar. Fleet packs, charging racks, pilot programme.",
  path: "/resorts",
});

const benefits = [
  { title: "No wiring. No trenching.", line: "Twist a stake into the ground and the path is lit. Move lights when the garden changes." },
  { title: "No solar dependency.", line: "Works under thick canopy and through the monsoon. No panels to clean or angle." },
  { title: "Guided, not floodlit.", line: "Guests see the next few steps of their path, and still see the stars." },
  { title: "Low power.", line: "Dark most of the night. Light only where someone is walking, only while they're there." },
  { title: "Staff-friendly swaps.", line: "When a light breathes slowly, swap its cell for a charged one from the rack. Seconds, no tools." },
  { title: "Warranty and spares.", line: "Fleet Packs include spare cells and a 2-year warranty." },
];

export default function ResortsPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Resorts", path: "/resorts" }])} />
      <HeroScene count={4} className="min-h-[560px] sm:min-h-[640px]" description="A night path lined with lights that wake in turn as a guest walks by.">
        <div className="mx-auto max-w-3xl px-5 pt-20 text-center sm:pt-28">
          <Eyebrow>For resorts, homestays &amp; campsites</Eyebrow>
          <h1 className="glow-text text-4xl sm:text-6xl">Light your paths without lighting up the night.</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-ink">
            Warm lights that wake for each guest and fade behind them. No wiring, no solar, no app.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <TrackedLink href="#quote" event="cta_fleet_quote" eventProps={{ location: "resorts_hero" }} className={btn.primary}>
              Request a fleet quote
            </TrackedLink>
            <TrackedLink href="#pilot" event="cta_pilot" className={btn.secondary}>
              Join the pilot
            </TrackedLink>
          </div>
        </div>
      </HeroScene>

      <section aria-labelledby="benefits" className="py-20">
        <Container>
          <SectionHeading id="benefits" eyebrow="For operators" title="Built for the people who run the place." />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <li key={b.title} className="organic-card border border-line bg-bg-raised p-6">
                <h3 className="text-xl">{b.title}</h3>
                <p className="mt-2 text-ink-muted">{b.line}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="fleet" className="py-16">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading id="fleet" eyebrow="BLOB Field Fleet Pack" title="Everything your team needs, in one pack." />
            <p className="mt-4 text-ink-muted">{packages[1].line}</p>
            <dl className="mt-8 space-y-6">
              <div>
                <dt className="font-display text-xl text-ink-strong">The charging rack</dt>
                <dd className="mt-1 text-ink-muted">
                  One place for your staff to charge cells. Keep a row of charged spares ready; a swap takes seconds and the light
                  goes straight back on its stake.
                </dd>
              </div>
              <div>
                <dt className="font-display text-xl text-ink-strong">The low-battery cue</dt>
                <dd className="mt-1 text-ink-muted">
                  A light that is running low breathes slowly at night, a signal your team learns to spot on their rounds. Guests
                  just see a gentle glow.
                </dd>
              </div>
              <div>
                <dt className="font-display text-xl text-ink-strong">The anti-theft stake</dt>
                <dd className="mt-1 text-ink-muted">A twist-lock ground stake keeps lights planted and makes them hard to lift away casually.</dd>
              </div>
              <div>
                <dt className="font-display text-xl text-ink-strong">Modes without an app</dt>
                <dd className="mt-1 text-ink-muted">Staff set a light&apos;s mode with a tap of a magnet. No phones, passwords or pairing.</dd>
              </div>
            </dl>
            <div className="mt-8">
              <PrelaunchNote>{specsNote}</PrelaunchNote>
            </div>
          </div>
          <div className="space-y-6">
            <PlaceholderMedia type="image" label="Fleet charging rack" ratio="4/3" />
            <article className="night-scope organic-card relative overflow-hidden border border-line p-6">
              <div aria-hidden className="absolute -right-6 -top-4 w-36">
                <Blob seed={19} tone="glass" state="breathe" className="text-[#d9d6cc]" />
              </div>
              <h3 className="text-2xl">{packages[0].name}</h3>
              <p className="mt-2 max-w-sm text-ink">{packages[0].line}</p>
              <p className="mt-4 text-sm text-ink-muted">Price: {packages[0].price.display}</p>
            </article>
          </div>
        </Container>
      </section>

      <section id="pilot" aria-labelledby="pilot-title" className="py-16">
        <Container>
          <div className="organic-card border border-dashed border-glow/50 bg-bg-raised px-6 py-10 sm:px-10">
            <Eyebrow>Pilot programme</Eyebrow>
            <h2 id="pilot-title" className="text-3xl sm:text-4xl">
              A limited pilot for <Placeholder k="PILOT_COUNT">3</Placeholder> Kerala properties.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-ink">
              Discounted units in exchange for honest feedback and night photography.
            </p>
            <p className="mt-2 text-sm text-ink-muted">
              Terms: <Placeholder k="PILOT_TERMS">pilot terms to be confirmed</Placeholder>. Mention &ldquo;pilot&rdquo; in your quote request.
            </p>
          </div>
        </Container>
      </section>

      <section id="quote" aria-labelledby="quote-title" className="scroll-mt-24 py-16">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading
              id="quote-title"
              eyebrow="Request a quote"
              title="Tell us about your nights."
              lede="A few details about your property and paths. We'll reply with questions and a first quote."
            />
            <p className="mt-6 text-sm text-ink-muted">Field units are indicatively priced from ₹999 per unit for 100+ units. Fleet Packs and installations are quoted individually.</p>
          </div>
          <div className="organic-card border border-line bg-bg-raised p-6 sm:p-8">
            <QuoteForm />
          </div>
        </Container>
      </section>
    </>
  );
}
