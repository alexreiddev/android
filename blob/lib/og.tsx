import { ImageResponse } from "next/og";
import { blobPath } from "@/lib/blob-shape";

export const ogSize = { width: 1200, height: 630 };

/** Dark night scene + glowing blob + page title. */
export function renderOg(title: string, eyebrow = "BLOB", seed = 7) {
  const d = blobPath(seed, 200, 0.1);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "linear-gradient(180deg, #090d0a 0%, #0b0f0c 60%, #0f1610 100%)",
          color: "#f1eee6",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 40,
            bottom: -80,
            width: 620,
            height: 620,
            display: "flex",
            background: "radial-gradient(circle at 50% 50%, rgba(255,181,71,0.45) 0%, rgba(255,181,71,0.12) 35%, rgba(255,181,71,0) 68%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 30,
            bottom: 70,
            width: 640,
            height: 90,
            display: "flex",
            background: "radial-gradient(ellipse at 50% 50%, rgba(255,208,138,0.35) 0%, rgba(255,181,71,0) 70%)",
          }}
        />
        <svg width="360" height="360" viewBox="0 0 200 200" style={{ position: "absolute", right: 170, bottom: 60 }}>
          <defs>
            <radialGradient id="b" cx="45%" cy="38%" r="70%">
              <stop offset="0%" stopColor="#fff4dc" />
              <stop offset="40%" stopColor="#ffd08a" />
              <stop offset="80%" stopColor="#ffb547" />
              <stop offset="100%" stopColor="#c9731e" />
            </radialGradient>
          </defs>
          <path d={d} fill="url(#b)" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", padding: "72px 80px", width: 720 }}>
          <div style={{ fontSize: 26, letterSpacing: 6, color: "#ffd08a", textTransform: "uppercase", fontFamily: "sans-serif" }}>{eyebrow}</div>
          <div style={{ fontSize: 68, lineHeight: 1.1, marginTop: 28, display: "flex" }}>{title}</div>
          <div style={{ fontSize: 26, marginTop: 28, color: "#b9b6aa", fontFamily: "sans-serif" }}>Light That Feels Alive. · Designed in Kerala</div>
        </div>
      </div>
    ),
    ogSize,
  );
}
