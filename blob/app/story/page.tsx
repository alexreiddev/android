import type { Metadata } from "next";
import { Blob } from "@/components/Blob";
import { PlaceholderMedia } from "@/components/PlaceholderMedia";
import { Container, DraftBanner, Eyebrow, SectionHeading } from "@/components/ui";
import { principles } from "@/content/site";
import { story, storyDraft } from "@/content/story";
import { breadcrumbLd, JsonLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Our story: born in a Kerala orchard",
  description:
    "BLOB is designed in Kerala. It began in a rambutan orchard with a simple idea: light that only wakes for you, then gives the night back.",
  path: "/story",
});

export default function StoryPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Story", path: "/story" }])} />
      <Container className="max-w-3xl pt-16 sm:pt-24">
        {storyDraft && <DraftBanner>Draft: the founder section is placeholder text for the founder to rewrite.</DraftBanner>}
        <Eyebrow>Our story</Eyebrow>
        <h1 className="text-4xl sm:text-6xl">Lights that only wake for you.</h1>
        <p className="mt-6 font-display text-2xl text-ink-strong">{story.lede}</p>
      </Container>

      <section aria-labelledby="orchard" className="py-16">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading id="orchard" eyebrow="Project Varsha" title="The orchard." />
            <div className="prose-blob mt-4 text-lg text-ink-muted">
              {story.orchard.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <PlaceholderMedia type="image" label="The rambutan orchard at night" ratio="4/3" />
        </Container>
      </section>

      <section aria-labelledby="founder" className="py-10">
        <Container className="max-w-3xl">
          <SectionHeading id="founder" eyebrow="Why we started" title="From the founder." />
          <div className="prose-blob mt-6 text-lg">
            {story.founder.map((p) => (
              <p key={p} className="placeholder-mark !whitespace-normal !block !p-4" data-placeholder="STORY_FOUNDER">
                {p}
              </p>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="kerala" className="py-16">
        <Container className="max-w-3xl">
          <SectionHeading id="kerala" eyebrow="Kerala" title="Designed where the nights are alive." />
          <div className="prose-blob mt-4 text-lg text-ink-muted">
            {story.kerala.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="principles" className="py-16">
        <Container>
          <SectionHeading id="principles" eyebrow="Design principles" title="What we hold ourselves to." />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <li key={p.a} className="blob-wake night-scope organic-card flex flex-col items-start border border-line p-6" tabIndex={0}>
                <Blob seed={i * 4 + 2} state="hover" className="w-16 text-[#d9d6cc]" pool={false} />
                <h3 className="mt-3 text-2xl">
                  {p.a} {p.b && <span className="text-ink-muted">{p.b}</span>}
                </h3>
                <p className="mt-2 text-ink-muted">{p.line}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
