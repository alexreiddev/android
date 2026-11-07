/**
 * Ready for REAL testimonials only. Not rendered anywhere until `testimonials`
 * has genuine, attributable entries (with permission). Never invent quotes.
 */
export type Testimonial = { quote: string; name: string; role?: string; place?: string };

export const testimonials: Testimonial[] = [];

export function Testimonials({ items = testimonials }: { items?: Testimonial[] }) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="testimonials-title" className="py-20">
      <h2 id="testimonials-title" className="text-3xl">In their words</h2>
      <ul className="mt-8 grid gap-6 md:grid-cols-2">
        {items.map((t) => (
          <li key={t.name} className="organic-card border border-line bg-bg-raised p-6">
            <blockquote className="font-display text-xl text-ink-strong">“{t.quote}”</blockquote>
            <p className="mt-4 text-sm text-ink-muted">
              {t.name}
              {t.role ? `, ${t.role}` : ""}
              {t.place ? ` · ${t.place}` : ""}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
