import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container, Eyebrow, Placeholder } from "@/components/ui";
import { site } from "@/content/site";
import { breadcrumbLd, JsonLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description: "Write to BLOB. Questions, press, partnerships. For resort quotes and Atelier commissions, use the dedicated forms.",
  path: "/contact",
});

export default function ContactPage() {
  const wa = site.contact.whatsapp;
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Contact", path: "/contact" }])} />
      <Container className="grid gap-12 pt-16 sm:pt-24 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <Eyebrow>Contact</Eyebrow>
          <h1 className="text-4xl sm:text-6xl">Say hello.</h1>
          <p className="mt-6 text-lg text-ink-muted">We read every message.</p>
          <dl className="mt-10 space-y-6">
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-ink-muted">Email</dt>
              <dd className="mt-1 text-lg">
                {site.contact.email ? <a href={`mailto:${site.contact.email}`} className="text-accent-ink underline underline-offset-4">{site.contact.email}</a> : <Placeholder k="CONTACT_EMAIL">contact email</Placeholder>}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-ink-muted">WhatsApp</dt>
              <dd className="mt-1 text-lg">
                {wa ? <a href={`https://wa.me/${wa.replace(/\D/g, "")}`} className="text-accent-ink underline underline-offset-4">{wa}</a> : <Placeholder k="WHATSAPP_NUMBER">WhatsApp number</Placeholder>}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-ink-muted">Resorts &amp; Atelier</dt>
              <dd className="mt-1">
                <a href="/resorts#quote" className="text-accent-ink underline underline-offset-4">Request a fleet quote</a>
                {" · "}
                <a href="/atelier#commission" className="text-accent-ink underline underline-offset-4">Start a commission</a>
              </dd>
            </div>
          </dl>
        </div>
        <div className="organic-card border border-line bg-bg-raised p-6 sm:p-8">
          <ContactForm />
        </div>
      </Container>
    </>
  );
}
