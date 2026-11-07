import type { Metadata } from "next";
import { FaqList } from "@/components/FaqList";
import { SensingDiagram } from "@/components/SensingDiagram";
import { BehaviourStory } from "@/components/BehaviourStory";
import { Container, DraftBanner, Eyebrow, PrelaunchNote, SectionHeading } from "@/components/ui";
import { faq, faqReviewed } from "@/content/faq";
import { specsNote } from "@/content/products";
import { breadcrumbLd, faqLd, JsonLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "How it works: motion sensing, warm light, gentle fades",
  description:
    "How a BLOB motion sensor garden light works: a 360° sensing ring, a darkness sensor, a warm 2200K LED, gentle fades and about a month per charge. No app or Wi-Fi.",
  path: "/how-it-works",
});

const parts = [
  { title: "A ring that senses movement", line: "Around its body, a BLOB senses motion in every direction: 360°. Come close from any side and it notices." },
  { title: "A sensor for the dark", line: "In daylight, it stays asleep. As evening falls, it starts listening for footsteps." },
  { title: "A warm LED", line: "2200K amber, the colour of firelight. Enough to see your way. Never a glare." },
  { title: "Gentle fades", line: "It wakes over a second or two, breathes softly while you're near, and fades over several seconds after you leave. It never snaps on or off." },
  { title: "About a month per charge", line: "Designed for around 30 nights at about 2 hours of light per night. Fewer visitors, longer life. Real results vary with how often it wakes." },
];

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "How it works", path: "/how-it-works" }])} />
      <JsonLd data={faqLd(faq)} />
      <Container className="grid gap-12 pt-16 sm:pt-24 lg:grid-cols-2 lg:items-center">
        <div>
          <Eyebrow>How it works</Eyebrow>
          <h1 className="text-4xl sm:text-6xl">Simple inside. Alive outside.</h1>
          <p className="mt-6 text-lg text-ink-muted">
            A few small parts, carefully tuned, so a light can notice you, keep you company and let the night back in.
          </p>
          <div className="mt-6">
            <PrelaunchNote>{specsNote}</PrelaunchNote>
          </div>
        </div>
        <SensingDiagram />
      </Container>

      <section aria-labelledby="parts" className="py-20">
        <Container>
          <SectionHeading id="parts" eyebrow="Inside every BLOB" title="What each part does." />
          <ol className="mt-10 grid gap-5 md:grid-cols-2">
            {parts.map((p, i) => (
              <li key={p.title} className="organic-card border border-line bg-bg-raised p-6">
                <p className="text-xs font-semibold tracking-[0.2em] text-accent-ink">0{i + 1}</p>
                <h3 className="mt-1 text-2xl">{p.title}</h3>
                <p className="mt-2 text-ink-muted">{p.line}</p>
              </li>
            ))}
            <li className="organic-card border border-line bg-bg-raised p-6">
              <p className="text-xs font-semibold tracking-[0.2em] text-accent-ink">06</p>
              <h3 className="mt-1 text-2xl">Why no app or Wi-Fi?</h3>
              <p className="mt-2 text-ink-muted">
                Because a garden light shouldn&apos;t need a password. Everything a BLOB does happens inside it, so it just works,
                with nothing to update. BLOB Atelier offers an optional advanced setup for installations that want to tune
                cluster behaviour.
              </p>
            </li>
          </ol>
        </Container>
      </section>

      <section aria-labelledby="cycle" className="py-10">
        <Container>
          <SectionHeading id="cycle" eyebrow="One night, four moments" title="Sleeping, awakening, with you, fading." />
          <div className="mt-10">
            <BehaviourStory />
          </div>
        </Container>
      </section>

      <section id="faq" aria-labelledby="faq-title" className="py-20">
        <Container className="max-w-3xl">
          {!faqReviewed && <DraftBanner>Draft FAQ: answers to be reviewed before launch.</DraftBanner>}
          <h2 id="faq-title" className="mb-8 text-3xl sm:text-4xl">
            Questions
          </h2>
          <FaqList items={faq} />
        </Container>
      </section>
    </>
  );
}
