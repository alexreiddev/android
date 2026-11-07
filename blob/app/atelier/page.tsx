import type { Metadata } from "next";
import { Blob } from "@/components/Blob";
import { PlaceholderMedia } from "@/components/PlaceholderMedia";
import { Timeline } from "@/components/Timeline";
import { CommissionForm } from "@/components/forms/CommissionForm";
import { TrackedLink } from "@/components/TrackedLink";
import { btn, Container, Eyebrow, PrelaunchNote, SectionHeading } from "@/components/ui";
import { getTier, specsNote } from "@/content/products";
import { breadcrumbLd, JsonLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "BLOB Atelier: handblown glass lamps, made to commission",
  description:
    "Handblown glass lamps made to commission in India. Borosilicate glass, clear or frosted, with warm tunable light and cascading cluster mode for villas, resorts and architects.",
  path: "/atelier",
});

const options = [
  { title: "Size", line: "From a palm-sized pebble to a form you could sit beside." },
  { title: "Form", line: "Rounder, longer, flatter, a family of shapes made to live together." },
  { title: "Clear or frosted", line: "Clear shows the glowing core. Frosted turns the whole body to light." },
  { title: "Tint", line: "A breath of colour in the glass, chosen with you." },
  { title: "Engraving", line: "A name, a date, a line, set into the glass." },
  { title: "Cluster layout", line: "Placed so the light walks ahead of you along the path." },
  { title: "Colour temperature", line: "Tunable from 1900K candle-warm to 2700K soft white." },
];

const steps = [
  { title: "Enquiry", line: "Tell us about the place and the people who will walk through it." },
  { title: "Design call", line: "We talk through the space, the paths, the mood and how many pieces it needs." },
  { title: "Sketch + mock-up", line: "Forms, sizes and a layout plan, so you can see the night before it exists." },
  { title: "Glass blowing", line: "Each piece is blown by hand. No two are the same." },
  { title: "Electronics + tuning", line: "We fit the core and tune the light, timing and cluster behaviour for your site." },
  { title: "Installation", line: "Placed, tested at night, and handed over with care instructions." },
];

export default function AtelierPage() {
  const atelier = getTier("atelier")!;
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Atelier", path: "/atelier" }])} />
      <Container className="grid gap-10 pt-16 sm:pt-24 lg:grid-cols-2 lg:items-center">
        <div>
          <Eyebrow>BLOB Atelier</Eyebrow>
          <h1 className="text-4xl sm:text-6xl">Hand-blown glass, made for one place.</h1>
          <p className="mt-6 text-lg text-ink-muted">
            Borosilicate glass, clear or frosted, blown by hand and made to commission. Every piece is unique. Together, they light
            the way a step ahead of you.
          </p>
          <p className="mt-4 text-sm text-ink-muted">
            Price (indicative): <span className="font-semibold text-ink-strong">{atelier.price.display}</span>
          </p>
          <TrackedLink href="#commission" event="cta_atelier_commission" eventProps={{ location: "atelier_hero" }} className={`${btn.primary} mt-8`}>
            Start a commission
          </TrackedLink>
        </div>
        <div className="night-scope organic-card relative grid aspect-square place-items-center overflow-hidden border border-line">
          <div className="grid grid-cols-3 items-end gap-2 px-8">
            <Blob seed={19} tone="glass" state="breathe" className="w-full text-[#d9d6cc]" />
            <Blob seed={23} tone="glass" state="awake" className="w-full text-[#d9d6cc]" />
            <Blob seed={29} tone="glass" state="awaken" className="w-full text-[#d9d6cc]" />
          </div>
          <span className="absolute bottom-4 left-4 text-xs text-ink-muted">Illustration of a cluster</span>
        </div>
      </Container>

      <section aria-labelledby="craft" className="py-20">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <PlaceholderMedia type="video" label="Glass blowing: an Atelier piece being made" />
          <div>
            <SectionHeading id="craft" eyebrow="The craft" title="Every piece is a little different." />
            <p className="mt-4 text-lg text-ink-muted">{atelier.materialDetail}</p>
            <p className="mt-4 text-ink-muted">
              Inside, the most advanced BLOB core: a cascading cluster mode where lights ahead of you wake first, a stillness hold
              that keeps the glow while you sit quietly, tunable warmth, and a wireless charging dock.
            </p>
            <div className="mt-6">
              <PrelaunchNote>{specsNote}</PrelaunchNote>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="options" className="py-16">
        <Container>
          <SectionHeading id="options" eyebrow="Made to commission" title="Choose with us." />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {options.map((o) => (
              <li key={o.title} className="organic-card border border-line bg-bg-raised p-5">
                <h3 className="text-xl">{o.title}</h3>
                <p className="mt-1 text-ink-muted">{o.line}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="process" className="py-16">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading id="process" eyebrow="The process" title="From a conversation to a glowing path." lede="Timelines depend on the size of the commission; we'll share one after the design call." />
          <Timeline steps={steps} />
        </Container>
      </section>

      <section id="commission" aria-labelledby="commission-title" className="scroll-mt-24 py-16">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading
            id="commission-title"
            eyebrow="Start a commission"
            title="Tell us about the space."
            lede="Homeowners, architects, interior and landscape designers, hotels: every commission begins here."
          />
          <div className="organic-card border border-line bg-bg-raised p-6 sm:p-8">
            <CommissionForm />
          </div>
        </Container>
      </section>
    </>
  );
}
