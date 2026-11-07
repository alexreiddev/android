/**
 * Organic blob geometry shared by the SVG <Blob> and the canvas <BlobScene>.
 * A blob is a ring of points whose radius wobbles with a few layered sine
 * "noise" terms. Deterministic for a given seed, animatable via `t`.
 */

export type Pt = { x: number; y: number };

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type BlobGenome = {
  harmonics: { k: number; amp: number; phase: number; speed: number }[];
  /** Pebble-like squash: wider than tall. */
  squash: number;
};

export function makeGenome(seed: number, wobble = 0.1): BlobGenome {
  const rnd = mulberry32(seed * 9973 + 17);
  const harmonics = [2, 3, 4, 5].map((k, i) => ({
    k,
    amp: (wobble * (0.9 - i * 0.18)) * (0.6 + rnd() * 0.8),
    phase: rnd() * Math.PI * 2,
    speed: (0.08 + rnd() * 0.12) * (rnd() > 0.5 ? 1 : -1),
  }));
  return { harmonics, squash: 0.78 + rnd() * 0.12 };
}

/** Points of a blob centred at (cx, cy) with base radius r at time t (seconds). */
export function blobPoints(
  g: BlobGenome,
  cx: number,
  cy: number,
  r: number,
  t = 0,
  n = 28,
): Pt[] {
  const pts: Pt[] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    let m = 1;
    for (const h of g.harmonics) {
      m += h.amp * Math.sin(h.k * a + h.phase + t * h.speed);
    }
    // Flatter base: pebbles sit on the ground.
    const base = Math.sin(a) > 0 ? 1 - 0.08 * Math.sin(a) : 1;
    pts.push({
      x: cx + Math.cos(a) * r * m,
      y: cy + Math.sin(a) * r * m * g.squash * base,
    });
  }
  return pts;
}

/** Closed Catmull-Rom spline through the points, as an SVG path string. */
export function pointsToPath(pts: Pt[], precision = 2): string {
  const n = pts.length;
  const f = (v: number) => v.toFixed(precision);
  let d = `M${f(pts[0].x)} ${f(pts[0].y)}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += `C${f(c1x)} ${f(c1y)} ${f(c2x)} ${f(c2y)} ${f(p2.x)} ${f(p2.y)}`;
  }
  return d + "Z";
}

/** Trace the same spline onto a canvas path. */
export function tracePath(ctx: CanvasRenderingContext2D, pts: Pt[]) {
  const n = pts.length;
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    ctx.bezierCurveTo(
      p1.x + (p2.x - p0.x) / 6,
      p1.y + (p2.y - p0.y) / 6,
      p2.x - (p3.x - p1.x) / 6,
      p2.y - (p3.y - p1.y) / 6,
      p2.x,
      p2.y,
    );
  }
  ctx.closePath();
}

export function blobPath(seed: number, size = 100, wobble = 0.1): string {
  const g = makeGenome(seed, wobble);
  return pointsToPath(blobPoints(g, size / 2, size / 2, size * 0.4, 0));
}
