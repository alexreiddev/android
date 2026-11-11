"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/content/site";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { TrackedLink } from "./TrackedLink";
import { btn } from "./ui";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the menu on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-md supports-[backdrop-filter]:bg-bg/65">
      <a
        href="#main"
        className="sr-only-focusable absolute left-4 top-3 z-50 organic-pill bg-glow px-4 py-2 text-sm font-semibold text-on-glow"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="text-ink-strong" aria-label="BLOB home">
          <Logo className="h-8 w-auto" />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`organic-pill px-3.5 py-2 text-sm transition-colors duration-500 hover:text-accent-ink ${
                    isActive(item.href) ? "text-accent-ink" : "text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <TrackedLink
            href="/resorts#quote"
            event="cta_fleet_quote"
            eventProps={{ location: "header" }}
            className={`${btn.primary} !px-4 !py-2 text-sm whitespace-nowrap max-sm:!hidden`}
          >
            Get a quote
          </TrackedLink>
          <button
            ref={toggleRef}
            type="button"
            className="organic-pill grid h-10 w-10 place-items-center text-ink-strong lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 8.5c3-1 13-1 16 0M4 15.5c3 1 13 1 16 0" />}
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="border-t border-line bg-bg px-5 pb-8 pt-4 lg:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="block py-3 font-display text-2xl text-ink-strong"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <TrackedLink
            href="/resorts#quote"
            event="cta_fleet_quote"
            eventProps={{ location: "mobile_menu" }}
            className={`${btn.primary} mt-6 w-full`}
          >
            Get a quote
          </TrackedLink>
        </nav>
      </div>
    </header>
  );
}
