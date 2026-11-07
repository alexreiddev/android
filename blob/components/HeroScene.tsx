import type { ReactNode } from "react";
import { Blob } from "./Blob";
import { HeroCanvas } from "./HeroCanvas";
import { NightBackdrop } from "./NightBackdrop";
import { featuredIndex, layoutFor } from "@/lib/scene-layout";

type Props = {
  count?: number;
  cascade?: boolean;
  intensity?: number;
  children?: ReactNode;
  className?: string;
  /** Description for screen readers of what the scene does. */
  description?: string;
};

/**
 * Night scene with sleeping blobs. Static SVG blobs render on the server (fast LCP,
 * reduced-motion fallback); the canvas takes over after first paint.
 */
export function HeroScene({
  count = 5,
  cascade = true,
  intensity = 1,
  children,
  className = "",
  description = "A dark garden with small glowing forms that wake as you approach and fade after you leave.",
}: Props) {
  const placements = layoutFor(count);
  const featured = featuredIndex(count);
  return (
    <section data-scene className={`night-scope relative isolate overflow-hidden ${className}`}>
      <NightBackdrop />
      <p className="sr-only">{description}</p>
      <div className="hero-static pointer-events-none absolute inset-0" aria-hidden>
        {placements.map((p, i) => (
          <div
            key={i}
            className={`blob-wake absolute text-[#d9d6cc] ${i === featured ? "rm-glow" : ""}`}
            style={{
              left: `${p.x * 100}%`,
              top: `${p.y * 100}%`,
              width: `calc(2.5 * ${p.s} * clamp(16px, min(4vw, 6vh), 46px))`,
              transform: "translate(-50%, -53%)",
            }}
          >
            <Blob seed={p.seed} state="hover" pool />
          </div>
        ))}
      </div>
      <HeroCanvas count={count} cascade={cascade} intensity={intensity} />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
