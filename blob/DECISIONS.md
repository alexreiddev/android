# DECISIONS

Every non-obvious choice made while building the BLOB site, with the reason. Newest sections are appended per phase.

## Phase 1: Scaffold

- **Location: `blob/` subfolder.** The repository already contained unrelated guides (`/guides`, root README). The site lives in `blob/` so nothing existing is touched. On Vercel, set **Root Directory = `blob`**.
- **Next.js 16.4 (latest stable) with Cache Components + Partial Prefetching**, the defaults `create-next-app` now ships. Every marketing page is a prerendered static shell; forms are client components that call server actions/route handlers.
- **Tailwind CSS v4** with CSS-variable design tokens in `app/globals.css`. Raw palette (`--night-900`, `--amber-400`, …) → semantic tokens (`--bg`, `--ink`, `--glow`, `--accent-ink`) that switch per theme.
- **Text-safe accent.** `--amber-400` is used for glows, buttons (with dark text) and focus rings. Body-size amber *text* uses `--amber-300` on night (contrast ≈ 13:1) and a deep ember `#7a4310` on dawn (≈ 7:1), because amber on off-white fails WCAG.
- **Fonts:** Fraunces (variable, `SOFT=100` for the rounded, soft display style) + Manrope (humanist sans for body), self-hosted through `next/font/google` (downloaded at build, served from our own origin; no Google requests at runtime).
- **Theme:** dark ("night") is the default and the no-JS fallback. Without a saved choice we follow `prefers-color-scheme` (light → "dawn"). The toggle saves the choice in `localStorage` (not a cookie). A tiny inline script applies the theme before first paint to avoid a flash.
- **Content as typed TS, not MDX.** Products, FAQ, story and legal copy live in `/content/*.ts`. Reason: no MDX toolchain to maintain, type-checked fields (prices, specs, placeholders), and editing is still just text in one file. Legal pages use a small structured format (headings + paragraphs + lists).
- **Placeholders are visible on the site** as dashed amber `<Placeholder>` marks (e.g. "contact email") with a `data-placeholder` key, so nothing unconfirmed can be mistaken for a real fact. All keys are listed in `PLACEHOLDERS.md`.
- **Logo:** a custom SVG wordmark (rounded B-L-O-B letterforms) with a glowing pebble mark; the favicon is the mark alone.

## Phase 2: Signature hero (`<BlobScene>`)

- **Canvas 2D, no WebGL/three.js.** Five blobs need only a few radial gradients and spline paths per frame. Canvas 2D adds 0 KB of dependencies and runs at 60 fps on desktop. On coarse-pointer devices the DPR is capped at 1.25 (1.5 on desktop) to keep mid-range Android phones smooth.
- **Static SSR layer first, canvas second.** The server renders the night backdrop and sleeping SVG blobs at the same positions. The canvas starts in `requestIdleCallback` after first paint, so the LCP element is always the headline text. When the canvas paints its first frame, the static blobs cross-fade out.
- **Timing mirrors the product:** 1.5 s ease-in wake, ~1.2 s linger (2.5 s after a touch), 6.5 s fade-out, ±5% breathing on a 5.5 s cycle while present. Cascade pre-glows direct neighbours to 30% after a 300–600 ms delay, scaled by distance.
- **Mobile:** tap or touch-hold wakes nearby blobs. Scrolling moves a virtual "walker" across the scene so blobs wake in turn as you scroll past. Device tilt is opt-in through a small "Tilt to walk" button (iOS permission is only asked on that tap). Nothing is needed to *see* the page.
- **Reduced motion:** the canvas never starts. The static layer shows the central blob glowing.
- **Pausing:** IntersectionObserver (off-screen) and `visibilitychange` (tab hidden) stop the RAF loop. While all blobs sleep, redraws drop to ~15 fps.
- **The hero is always "night"** (`.night-scope` re-scopes the tokens), even in the dawn theme. The product only makes sense in the dark.
