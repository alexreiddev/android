import { InView } from "./InView";

export type Step = { title: string; line: string };

/** Organic vertical timeline: glowing beads on a soft, wandering thread. */
export function Timeline({ steps }: { steps: Step[] }) {
  return (
    <InView as="ol" className="relative ml-3 sm:ml-6">
      <svg aria-hidden className="absolute -left-3 top-2 h-[calc(100%-1rem)] w-6" viewBox="0 0 24 600" preserveAspectRatio="none">
        <path d="M12 0C4 60 20 120 12 180S4 300 12 360s8 120 0 180 0 60 0 60" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
      {steps.map((s, i) => (
        <li key={s.title} className="relative pb-10 pl-10 last:pb-0">
          <span
            aria-hidden
            className="anim-breathe absolute -left-[13px] top-1 h-[26px] w-[26px] rounded-[48%_52%_45%_55%/55%_45%_55%_45%] bg-glow shadow-[0_0_24px_4px_rgb(255_181_71/0.45)]"
            style={{ animationDelay: `${i * 0.9}s` }}
          />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-ink">Step {i + 1}</p>
          <h3 className="mt-1 text-2xl">{s.title}</h3>
          <p className="mt-2 max-w-xl text-ink-muted">{s.line}</p>
        </li>
      ))}
    </InView>
  );
}
