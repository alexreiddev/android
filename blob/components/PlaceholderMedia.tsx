import { Blob } from "./Blob";

type Props = {
  type: "video" | "image";
  label: string;
  /** Aspect ratio, e.g. "16/9". */
  ratio?: string;
  className?: string;
};

/**
 * Clearly labelled slot for future real media (night film, photography).
 * Replace with <video> / next/image once assets exist; see PLACEHOLDERS.md.
 */
export function PlaceholderMedia({ type, label, ratio = "16/9", className = "" }: Props) {
  return (
    <figure
      className={`night-scope organic-card relative grid place-items-center overflow-hidden border border-dashed border-line-strong ${className}`}
      style={{ aspectRatio: ratio }}
      data-placeholder-media={type}
    >
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_75%,rgba(255,181,71,0.12),transparent_70%)]" />
      <Blob seed={label.length + 2} state="breathe" className="relative w-24 text-[#d9d6cc] sm:w-32" />
      <figcaption className="absolute inset-x-0 bottom-0 flex bg-gradient-to-t from-[#0b0f0c] to-transparent flex-wrap items-center justify-between gap-2 px-5 py-4 text-sm">
        <span className="text-ink">{label}</span>
        <span className="organic-pill border border-dashed border-glow/60 px-3 py-1 text-xs text-accent-ink">
          Placeholder {type === "video" ? "film" : "photo"}
        </span>
      </figcaption>
    </figure>
  );
}
