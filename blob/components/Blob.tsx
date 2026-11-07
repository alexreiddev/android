import { useId } from "react";
import { blobPath } from "@/lib/blob-shape";

export type BlobState =
  | "sleep" // barely visible, faint outline
  | "awake" // fully lit, still
  | "breathe" // lit, gentle ±5% breathing
  | "awaken" // loops sleeping → lit
  | "fade" // loops lit → sleeping
  | "hover"; // wakes on hover/focus of the nearest .blob-wake ancestor

type Props = {
  seed?: number;
  state?: BlobState;
  tone?: "frosted" | "silicone" | "glass";
  /** Show the warm pool of light on the ground. */
  pool?: boolean;
  className?: string;
  /** Accessible label. Omit for decorative use. */
  title?: string;
};

const stateClass: Record<BlobState, string> = {
  sleep: "anim-sleep",
  awake: "",
  breathe: "anim-breathe",
  awaken: "anim-awaken",
  fade: "anim-fade",
  hover: "",
};

/**
 * Static, server-rendered blob: SVG body, bloom and ground pool.
 * Used for cards, the logo mark, the 404 page and illustrations.
 */
export function Blob({
  seed = 3,
  state = "awake",
  tone = "frosted",
  pool = true,
  className,
  title,
}: Props) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const d = blobPath(seed, 200, tone === "glass" ? 0.07 : 0.1);
  const lightOpacity = state === "sleep" || state === "hover" ? undefined : 1;

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <defs>
        <radialGradient id={`b${id}`} cx="45%" cy="38%" r="70%">
          <stop offset="0%" stopColor="#fff4dc" />
          <stop offset="38%" stopColor="#ffd08a" />
          <stop offset="78%" stopColor="#ffb547" stopOpacity={tone === "glass" ? 0.7 : 0.95} />
          <stop offset="100%" stopColor="#c9731e" stopOpacity={tone === "glass" ? 0.45 : 0.85} />
        </radialGradient>
        <radialGradient id={`g${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffb547" stopOpacity="0.55" />
          <stop offset="45%" stopColor="#ffb547" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#ffb547" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`p${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd08a" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ffb547" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sleeping body: always present, barely visible */}
      <g transform="translate(0 6)">
        <path d={d} fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1.2" />
      </g>

      {/* Light layers */}
      <g className={`blob-light ${stateClass[state]}`} opacity={lightOpacity}>
        {pool && <ellipse cx="100" cy="168" rx="92" ry="16" fill={`url(#p${id})`} />}
        <circle cx="100" cy="102" r="98" fill={`url(#g${id})`} />
        <g transform="translate(0 6)">
          <path d={d} fill={`url(#b${id})`} />
          {tone === "silicone" && (
            <path d={d} fill="none" stroke="#fff4dc" strokeOpacity="0.35" strokeWidth="3" transform="translate(100 100) scale(0.92) translate(-100 -100)" />
          )}
          {tone === "glass" && (
            <>
              <path d={d} fill="none" stroke="#fffaf0" strokeOpacity="0.55" strokeWidth="1.5" />
              <ellipse cx="78" cy="78" rx="16" ry="8" fill="#ffffff" fillOpacity="0.35" transform="rotate(-25 78 78)" />
            </>
          )}
          {tone !== "glass" && <ellipse cx="82" cy="80" rx="20" ry="10" fill="#fffaf0" fillOpacity="0.28" transform="rotate(-20 82 80)" />}
        </g>
      </g>
    </svg>
  );
}
