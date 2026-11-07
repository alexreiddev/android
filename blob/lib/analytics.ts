"use client";

import { track } from "@vercel/analytics";

type Props = Record<string, string | number | boolean | null>;

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Props }) => void;
  }
}

/** Cookieless event tracking: Vercel Analytics, plus Plausible if configured. */
export function trackEvent(name: string, props?: Props) {
  try {
    track(name, props);
  } catch {
    /* analytics must never break the page */
  }
  try {
    window.plausible?.(name, props ? { props } : undefined);
  } catch {
    /* ignore */
  }
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
export type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>>;

/** Remember first-touch UTM params for this session (no cookies). */
export function captureUtm() {
  try {
    const params = new URLSearchParams(window.location.search);
    const found: Utm = {};
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v) found[k] = v.slice(0, 200);
    }
    if (Object.keys(found).length && !sessionStorage.getItem("blob_utm")) {
      sessionStorage.setItem("blob_utm", JSON.stringify(found));
    }
  } catch {
    /* ignore */
  }
}

export function readUtm(): Utm {
  try {
    return JSON.parse(sessionStorage.getItem("blob_utm") || "{}") as Utm;
  } catch {
    return {};
  }
}
