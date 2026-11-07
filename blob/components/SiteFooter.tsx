import Link from "next/link";
import { legalNav, nav, site } from "@/content/site";
import { Logo } from "./Logo";
import { Placeholder } from "./ui";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line bg-bg-sunken">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo className="h-8 w-auto text-ink-strong" />
          <p className="mt-4 font-display text-xl text-ink-strong">{site.tagline}</p>
          <p className="mt-2 max-w-sm text-sm text-ink-muted">{site.philosophy}</p>
          <p className="mt-6 text-sm text-ink-muted">Designed in Kerala.</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">Explore</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="transition-colors duration-500 hover:text-accent-ink">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/#waitlist" className="transition-colors duration-500 hover:text-accent-ink">
                Join the waitlist
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">Say hello</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              {site.contact.email ? (
                <a href={`mailto:${site.contact.email}`} className="hover:text-accent-ink">
                  {site.contact.email}
                </a>
              ) : (
                <Placeholder k="CONTACT_EMAIL">contact email</Placeholder>
              )}
            </li>
            <li>
              {site.social.instagram ? (
                <a href={site.social.instagram} rel="me noopener" className="hover:text-accent-ink">
                  Instagram
                </a>
              ) : (
                <span>
                  Instagram <Placeholder k="INSTAGRAM_URL">link</Placeholder>
                </span>
              )}
            </li>
            <li>
              {site.social.youtube ? (
                <a href={site.social.youtube} rel="me noopener" className="hover:text-accent-ink">
                  YouTube
                </a>
              ) : (
                <span>
                  YouTube <Placeholder k="YOUTUBE_URL">link</Placeholder>
                </span>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© BLOB. {site.contact.legalEntity ?? <Placeholder k="LEGAL_ENTITY_NAME">legal entity</Placeholder>}</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalNav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-accent-ink">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
