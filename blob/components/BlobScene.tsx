"use client";

import { useEffect, useRef, useState } from "react";
import { blobPoints, makeGenome, tracePath, type BlobGenome } from "@/lib/blob-shape";
import { baseRadius, layoutFor } from "@/lib/scene-layout";

export type BlobSceneProps = {
  /** Number of blobs, 1–5. */
  count?: number;
  /** Wake on pointer / touch / scroll / tilt. */
  interactive?: boolean;
  /** Neighbours pre-glow at 30% (hints at Atelier cluster mode). */
  cascade?: boolean;
  /** Overall light multiplier, 0–1.5. */
  intensity?: number;
  /** Force the static, non-animated version. Auto-detected from the OS if omitted. */
  reducedMotion?: boolean;
  /** Called once the canvas has painted its first frame. */
  onReady?: () => void;
  className?: string;
};

// Timing mirrors the product's real behaviour.
const FADE_IN_S = 1.5; // awakening: 1–2 s ease-in
const FADE_OUT_S = 6.5; // fading: 5–10 s ease-out
const LINGER_MOUSE_S = 1.2;
const LINGER_TOUCH_S = 2.5;
const BREATH_PERIOD_S = 5.5;
const CASCADE_LEVEL = 0.3;
const WAKE_RADIUS_FRAC = 0.25; // of viewport width

type SceneBlob = {
  x: number; // px
  y: number; // px
  r: number; // px
  genome: BlobGenome;
  level: number; // 0..1 linear progress
  lastNear: number; // seconds
  awakeSince: number | null; // seconds
};

const smooth = (t: number) => t * t * (3 - 2 * t);

export function BlobScene({
  count = 5,
  interactive = true,
  cascade = true,
  intensity = 1,
  reducedMotion,
  onReady,
  className = "",
}: BlobSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tiltAvailable, setTiltAvailable] = useState(false);
  const [tiltOn, setTiltOn] = useState(false);
  const tiltRef = useRef<number | null>(null);
  const onReadyRef = useRef(onReady);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const host = wrap?.parentElement;
    if (!canvas || !wrap || !host) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion ?? mq.matches) return; // static SSR layer stays visible

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse && interactive && "DeviceOrientationEvent" in window) {
      queueMicrotask(() => setTiltAvailable(true));
    }

    let w = 0;
    let h = 0;
    let dpr = 1;
    let blobs: SceneBlob[] = [];
    const placements = layoutFor(count);
    const genomes = placements.map((p) => makeGenome(p.seed));

    const resize = () => {
      const rect = host.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.25 : 1.5);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const r0 = baseRadius(w, h);
      blobs = placements.map((p, i) => ({
        x: p.x * w,
        y: p.y * h,
        r: r0 * p.s,
        genome: genomes[i],
        level: blobs[i]?.level ?? 0,
        lastNear: blobs[i]?.lastNear ?? -1e9,
        awakeSince: blobs[i]?.awakeSince ?? null,
      }));
      dirty = true;
    };

    // ---- Input -------------------------------------------------------------
    let pointer: { x: number; y: number } | null = null;
    let touchActive = false;
    let releaseAt: number | null = null; // keep a tap "present" for a moment
    let linger = LINGER_MOUSE_S;
    const local = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch" && !touchActive) return;
      linger = e.pointerType === "touch" ? LINGER_TOUCH_S : LINGER_MOUSE_S;
      pointer = local(e);
      wake();
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "touch" || e.pointerType === "pen") touchActive = true;
      linger = e.pointerType === "mouse" ? LINGER_MOUSE_S : LINGER_TOUCH_S;
      pointer = local(e);
      releaseAt = null;
      wake();
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") {
        touchActive = false;
        releaseAt = performance.now() / 1000 + 0.35;
        wake();
      }
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType === "mouse") pointer = null;
    };
    // Scroll proximity (touch devices): a virtual walker crosses the scene as you scroll.
    let scrollWalker: { x: number; y: number } | null = null;
    const onScroll = () => {
      if (!coarse) return;
      const rect = host.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / (rect.height * 0.55)));
      scrollWalker = progress > 0.03 && progress < 1 ? { x: (0.06 + 0.88 * progress) * w, y: 0.85 * h } : null;
      wake();
    };

    if (interactive) {
      host.addEventListener("pointermove", onMove, { passive: true });
      host.addEventListener("pointerdown", onDown, { passive: true });
      host.addEventListener("pointerup", onUp, { passive: true });
      host.addEventListener("pointercancel", onUp, { passive: true });
      host.addEventListener("pointerleave", onLeave, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    // ---- Simulation --------------------------------------------------------
    let dirty = true;
    const step = (now: number, dt: number) => {
      const wakeR = Math.max(90, w * WAKE_RADIUS_FRAC);
      if (releaseAt !== null && now > releaseAt) {
        pointer = null;
        releaseAt = null;
      }
      const tilt = tiltRef.current;
      const presences: { x: number; y: number }[] = [];
      if (pointer) presences.push(pointer);
      if (scrollWalker && !touchActive) presences.push(scrollWalker);
      if (tilt !== null) presences.push({ x: tilt * w, y: 0.85 * h });

      // Direct presence → target 1
      const targets = blobs.map((b) => {
        let near = false;
        for (const p of presences) {
          const dx = p.x - b.x;
          const dy = (p.y - b.y) * 0.6; // the ground plane is foreshortened
          if (dx * dx + dy * dy < wakeR * wakeR) near = true;
        }
        if (near) b.lastNear = now;
        return now - b.lastNear < (near ? 0 : linger) || near ? 1 : 0;
      });

      // Wake bookkeeping
      blobs.forEach((b, i) => {
        if (targets[i] === 1 && b.awakeSince === null) b.awakeSince = now;
        if (targets[i] === 0 && b.level < 0.05) b.awakeSince = null;
      });

      // Cascade: neighbours of an awake blob pre-glow at 30% after 300–600 ms.
      const finalTargets = targets.map((t, i) => {
        if (t === 1 || !cascade) return t;
        let pre = 0;
        blobs.forEach((src, j) => {
          if (j === i || targets[j] !== 1 || src.awakeSince === null) return;
          const hops = Math.abs(i - j);
          if (hops > 1) return;
          const dist = Math.hypot(src.x - blobs[i].x, src.y - blobs[i].y);
          const delay = 0.3 + Math.min(0.3, (dist / Math.max(w, 1)) * 0.9);
          if (now - src.awakeSince > delay) pre = CASCADE_LEVEL;
        });
        return pre;
      });

      let anyLit = false;
      blobs.forEach((b, i) => {
        const target = finalTargets[i];
        if (b.level < target) b.level = Math.min(target, b.level + dt / FADE_IN_S);
        else if (b.level > target) b.level = Math.max(target, b.level - dt / FADE_OUT_S);
        if (b.level > 0.001) anyLit = true;
      });
      return anyLit;
    };

    // ---- Drawing -----------------------------------------------------------
    const draw = (now: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const k = Math.max(0, Math.min(1.5, intensity));

      for (const b of blobs) {
        const lit = smooth(b.level);
        const breath = lit > 0.5 ? 1 + 0.05 * Math.sin((now / BREATH_PERIOD_S) * Math.PI * 2) * smooth((lit - 0.5) * 2) : 1;
        const L = Math.min(1, lit * breath) * k;
        const pts = blobPoints(b.genome, b.x, b.y, b.r, now, 26);

        if (L > 0.003) {
          ctx.globalCompositeOperation = "lighter";
          // Light pool spilling onto the ground
          const poolR = b.r * (4.2 + 1.6 * L);
          ctx.save();
          ctx.translate(b.x, b.y + b.r * 0.7);
          ctx.scale(1, 0.24);
          const pool = ctx.createRadialGradient(0, 0, 0, 0, 0, poolR);
          pool.addColorStop(0, `rgba(255,190,100,${0.42 * L})`);
          pool.addColorStop(0.45, `rgba(255,170,70,${0.14 * L})`);
          pool.addColorStop(1, "rgba(255,160,60,0)");
          ctx.fillStyle = pool;
          ctx.beginPath();
          ctx.arc(0, 0, poolR, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          // Bloom
          const bloomR = b.r * 4.8;
          const bloom = ctx.createRadialGradient(b.x, b.y, b.r * 0.3, b.x, b.y, bloomR);
          bloom.addColorStop(0, `rgba(255,181,71,${0.34 * L})`);
          bloom.addColorStop(0.35, `rgba(255,170,60,${0.1 * L})`);
          bloom.addColorStop(1, "rgba(255,160,50,0)");
          ctx.fillStyle = bloom;
          ctx.beginPath();
          ctx.arc(b.x, b.y, bloomR, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.globalCompositeOperation = "source-over";
        // Sleeping body: faint frosted outline, always there.
        tracePath(ctx, pts);
        ctx.fillStyle = `rgba(217,214,204,${0.05 * (1 - L)})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(217,214,204,${0.16 * (1 - L) + 0.04})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        if (L > 0.003) {
          // Lit, milky body
          const body = ctx.createRadialGradient(b.x - b.r * 0.25, b.y - b.r * 0.3, b.r * 0.1, b.x, b.y, b.r * 1.15);
          body.addColorStop(0, `rgba(255,246,226,${L})`);
          body.addColorStop(0.4, `rgba(255,208,138,${L})`);
          body.addColorStop(0.85, `rgba(255,181,71,${0.92 * L})`);
          body.addColorStop(1, `rgba(201,115,30,${0.8 * L})`);
          tracePath(ctx, pts);
          ctx.fillStyle = body;
          ctx.fill();
          // Soft highlight
          ctx.fillStyle = `rgba(255,252,240,${0.22 * L})`;
          ctx.beginPath();
          ctx.ellipse(b.x - b.r * 0.28, b.y - b.r * 0.32, b.r * 0.32, b.r * 0.14, -0.35, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    // ---- Loop with pausing -------------------------------------------------
    let raf = 0;
    let running = false;
    let visible = true;
    let last = performance.now() / 1000;
    let lastDraw = 0;
    let first = true;

    const frame = (ms: number) => {
      raf = 0;
      if (!running) return;
      const now = ms / 1000;
      const dt = Math.min(0.1, now - last);
      last = now;
      const anyLit = step(now, dt);
      // Asleep: the shapes still morph, but slowly. ~15 fps is plenty.
      if (anyLit || dirty || now - lastDraw > 1 / 15) {
        draw(now);
        lastDraw = now;
        dirty = false;
        if (first) {
          first = false;
          onReadyRef.current?.();
        }
      }
      raf = requestAnimationFrame(frame);
    };
    const wake = () => {
      if (running && !raf) raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (running || !visible || document.hidden) return;
      running = true;
      last = performance.now() / 1000;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { threshold: 0 },
    );
    const onVis = () => (document.hidden ? stop() : start());
    const ro = new ResizeObserver(resize);

    // Lazy init after first paint so the hero never blocks LCP.
    let idleId = 0;
    const init = () => {
      resize();
      ro.observe(host);
      io.observe(host);
      document.addEventListener("visibilitychange", onVis);
      start();
    };
    const ric = window.requestIdleCallback as typeof window.requestIdleCallback | undefined;
    if (ric) idleId = ric(init, { timeout: 1200 });
    else idleId = window.setTimeout(init, 250);

    const onMotionPref = () => {
      if (mq.matches) {
        stop();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    mq.addEventListener("change", onMotionPref);

    return () => {
      stop();
      if (ric) window.cancelIdleCallback?.(idleId);
      else clearTimeout(idleId);
      io.disconnect();
      ro.disconnect();
      mq.removeEventListener("change", onMotionPref);
      document.removeEventListener("visibilitychange", onVis);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerdown", onDown);
      host.removeEventListener("pointerup", onUp);
      host.removeEventListener("pointercancel", onUp);
      host.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, [count, interactive, cascade, intensity, reducedMotion]);

  // Optional device tilt. Never required, only asked for on tap.
  useEffect(() => {
    if (!tiltOn) return;
    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.gamma === null) return;
      tiltRef.current = Math.min(0.97, Math.max(0.03, 0.5 + e.gamma / 70));
    };
    window.addEventListener("deviceorientation", onOrient);
    return () => {
      window.removeEventListener("deviceorientation", onOrient);
      tiltRef.current = null;
    };
  }, [tiltOn]);

  const toggleTilt = async () => {
    if (tiltOn) return setTiltOn(false);
    const DOE = window.DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> };
    try {
      if (typeof DOE.requestPermission === "function") {
        const res = await DOE.requestPermission();
        if (res !== "granted") return;
      }
      setTiltOn(true);
    } catch {
      /* permission refused: the scene still works by touch */
    }
  };

  return (
    <>
      <div ref={wrapRef} className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      </div>
      {tiltAvailable && (
        <button
          type="button"
          onClick={toggleTilt}
          aria-pressed={tiltOn}
          className="absolute bottom-4 right-4 z-20 organic-pill border border-line-strong bg-bg/60 px-3.5 py-1.5 text-xs text-ink backdrop-blur"
        >
          {tiltOn ? "Tilt on" : "Tilt to walk"}
        </button>
      )}
    </>
  );
}
