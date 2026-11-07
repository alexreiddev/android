/** Blob placements shared by the static SSR layer and the canvas scene. */
export type Placement = { x: number; y: number; s: number; seed: number };

const LAYOUTS: Record<number, Placement[]> = {
  1: [{ x: 0.5, y: 0.8, s: 1.25, seed: 3 }],
  2: [
    { x: 0.36, y: 0.82, s: 1.1, seed: 5 },
    { x: 0.64, y: 0.86, s: 0.95, seed: 8 },
  ],
  3: [
    { x: 0.2, y: 0.83, s: 0.95, seed: 4 },
    { x: 0.5, y: 0.88, s: 1.15, seed: 9 },
    { x: 0.8, y: 0.82, s: 0.9, seed: 13 },
  ],
  4: [
    { x: 0.15, y: 0.82, s: 0.9, seed: 4 },
    { x: 0.39, y: 0.88, s: 1.1, seed: 9 },
    { x: 0.62, y: 0.81, s: 0.85, seed: 13 },
    { x: 0.85, y: 0.87, s: 1.05, seed: 21 },
  ],
  5: [
    { x: 0.11, y: 0.83, s: 0.9, seed: 4 },
    { x: 0.3, y: 0.89, s: 1.1, seed: 9 },
    { x: 0.5, y: 0.81, s: 0.8, seed: 13 },
    { x: 0.69, y: 0.88, s: 1.12, seed: 21 },
    { x: 0.88, y: 0.82, s: 0.95, seed: 27 },
  ],
};

export function layoutFor(count: number): Placement[] {
  const c = Math.max(1, Math.min(5, Math.round(count)));
  return LAYOUTS[c];
}

/** Base blob radius in px for a given scene width/height. */
export function baseRadius(w: number, h: number) {
  return Math.max(16, Math.min(46, Math.min(w * 0.04, h * 0.06)));
}

/** Index of the blob shown glowing in reduced-motion mode. */
export function featuredIndex(count: number) {
  return Math.floor((Math.max(1, Math.min(5, count)) - 1) / 2);
}
