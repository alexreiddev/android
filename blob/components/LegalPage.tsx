import { Fragment, type ReactNode } from "react";
import type { LegalDoc } from "@/content/legal";
import { site } from "@/content/site";
import { Container, DraftBanner, Placeholder } from "./ui";

/** Values filled from site config when set; otherwise shown as placeholders. */
const filled: Record<string, string | null> = {
  LEGAL_ENTITY_NAME: site.contact.legalEntity,
  GRIEVANCE_OFFICER_NAME: site.contact.grievanceOfficer,
  GRIEVANCE_EMAIL: site.contact.grievanceEmail,
  REGISTERED_ADDRESS: site.contact.address,
  CONTACT_EMAIL: site.contact.email,
};

function renderText(text: string): ReactNode {
  const parts = text.split(/\[\[([A-Z0-9_]+)\]\]/g);
  return parts.map((part, i) => {
    if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>;
    const value = filled[part];
    if (value) return <Fragment key={i}>{value}</Fragment>;
    return (
      <Placeholder key={i} k={part}>
        {part.toLowerCase().replace(/_/g, " ")}
      </Placeholder>
    );
  });
}

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <Container className="max-w-3xl pt-16 sm:pt-24">
      <DraftBanner>Draft: review before launch. This text has not yet been reviewed by a lawyer.</DraftBanner>
      <h1 className="text-4xl sm:text-5xl">{doc.title}</h1>
      <p className="mt-3 text-sm text-ink-muted">Effective: {renderText(doc.updated)}</p>
      <div className="prose-blob mt-8 text-ink">
        {doc.blocks.map((b, i) => (
          <section key={i}>
            {b.h && <h2>{b.h}</h2>}
            {b.p?.map((p, j) => (
              <p key={j}>{renderText(p)}</p>
            ))}
            {b.ul && (
              <ul>
                {b.ul.map((li, j) => (
                  <li key={j}>{renderText(li)}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </Container>
  );
}
