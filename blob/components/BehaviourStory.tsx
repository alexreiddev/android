import { Blob, type BlobState } from "./Blob";
import { InView } from "./InView";

const steps: { n: string; title: string; line: string; state: BlobState }[] = [
  { n: "01", title: "Sleeping", line: "Dark and still. It waits without wasting a drop of light.", state: "sleep" },
  { n: "02", title: "Awakening", line: "You come near. Over a second or two, a warm glow rises.", state: "awaken" },
  { n: "03", title: "With you", line: "It stays lit while you're close, breathing softly.", state: "breathe" },
  { n: "04", title: "Fading", line: "You walk on. It lingers, then lets the dark back in, slowly.", state: "fade" },
];

export function BehaviourStory() {
  return (
    <InView as="ol" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s) => (
        <li key={s.n} className="night-scope organic-card relative flex flex-col overflow-hidden border border-line p-6">
          <div className="grid aspect-square place-items-center">
            <Blob seed={Number(s.n) * 5 + 1} state={s.state} className="w-3/4 text-[#d9d6cc]" />
          </div>
          <p className="text-xs font-semibold tracking-[0.2em] text-accent-ink">{s.n}</p>
          <h3 className="mt-1 text-2xl">{s.title}</h3>
          <p className="mt-2 text-ink-muted">{s.line}</p>
        </li>
      ))}
    </InView>
  );
}
