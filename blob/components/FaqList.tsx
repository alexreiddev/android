export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((f) => (
        <details key={f.q} className="group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-xl py-4 font-display text-lg text-ink-strong [&::-webkit-details-marker]:hidden">
            {f.q}
            <span aria-hidden className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line-strong text-accent-ink transition-transform duration-700 group-open:rotate-45">+</span>
          </summary>
          <p className="pb-5 pr-12 text-ink-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
