import type { ReactNode } from "react";

/** Shared button classes: amber glow primary, soft outline secondary. */
export const btn = {
  primary:
    "organic-pill inline-flex items-center justify-center gap-2 bg-glow px-6 py-3 text-[0.95rem] font-semibold text-on-glow shadow-[0_0_32px_-6px_rgb(255_181_71/0.7)] transition-[background-color,box-shadow] duration-700 ease-in-out hover:bg-glow-soft hover:shadow-[0_0_48px_-4px_rgb(255_181_71/0.85)] active:bg-ember",
  secondary:
    "organic-pill inline-flex items-center justify-center gap-2 border border-line-strong px-6 py-3 text-[0.95rem] font-semibold text-ink-strong transition-colors duration-700 ease-in-out hover:border-glow hover:text-accent-ink",
  link: "font-semibold text-accent-ink underline decoration-1 underline-offset-4 transition-colors duration-500 hover:decoration-2",
};

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent-ink">{children}</p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  id,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  id?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 id={id} className="text-3xl sm:text-4xl">
        {title}
      </h2>
      {lede && <p className="mt-4 text-lg text-ink-muted">{lede}</p>}
    </div>
  );
}

/** Visible marker for anything that must be confirmed before launch. */
export function Placeholder({ k, children }: { k: string; children: ReactNode }) {
  return (
    <em className="placeholder-mark" title={`Placeholder: ${k}. See PLACEHOLDERS.md`} data-placeholder={k}>
      {children}
    </em>
  );
}

export function PrelaunchNote({ children }: { children: ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 organic-pill border border-dashed border-line-strong px-4 py-1.5 text-sm text-ink-muted">
      <span aria-hidden className="h-2 w-2 rounded-full bg-glow shadow-[0_0_10px_rgb(255_181_71)]" />
      {children}
    </p>
  );
}

export function DraftBanner({ children }: { children: ReactNode }) {
  return (
    <div role="note" className="organic-card mb-10 border border-dashed border-glow/60 bg-[var(--placeholder-bg)] px-5 py-4 text-sm text-accent-ink">
      {children}
    </div>
  );
}
