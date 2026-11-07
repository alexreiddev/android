/**
 * Static night scene: canopy, ferns and ground, as layered silhouettes.
 * Pure SVG, server-rendered, no animation. It sits behind the blob canvas.
 */
export function NightBackdrop({ ground = 0.72 }: { ground?: number }) {
  const gy = Math.round(900 * ground);
  return (
    <div aria-hidden className="absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 70% at 72% -12%, rgba(120,150,125,0.13), transparent 60%), radial-gradient(90% 60% at 10% 0%, rgba(60,80,62,0.18), transparent 70%), linear-gradient(180deg, #090d0a 0%, #0b0f0c 55%, #0d130e 100%)",
        }}
      />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice">
        {/* Far canopy */}
        <path
          fill="#0f1610"
          d={`M0 0h1440v120c-40 30-90 40-130 22-30 50-110 60-150 20-40 40-120 35-140-10-50 30-120 20-140-25-60 25-130 10-150-30-50 20-110 5-130-30-40 25-100 30-130-5-50 35-130 30-160-15-40 30-110 20-130-15C130 140 50 150 0 110Z`}
        />
        <path
          fill="#0c120d"
          d="M0 0h420c-10 40-60 70-110 60-20 40-80 55-120 30-30 30-90 35-120 10C50 120 20 125 0 118Z M1440 0h-380c20 45 70 65 120 55 25 40 90 50 130 25 30 25 80 30 130 5Z"
        />
        {/* Distant trunks */}
        <g fill="#0e150f" opacity="0.9">
          <path d={`M180 90c8 140 6 ${gy - 200} 14 ${gy - 60}h22c-6-${gy - 300}-4-${gy - 260}-12-${gy - 90}Z`} />
          <path d={`M1240 80c-6 160-4 ${gy - 220}-12 ${gy - 70}h20c4-${gy - 320} 6-${gy - 250} 10-${gy - 100}Z`} />
          <path d={`M760 60c4 120 2 ${gy - 210} 8 ${gy - 80}h14c-2-${gy - 300} 0-${gy - 260}-6-${gy - 120}Z`} opacity="0.6" />
        </g>
        {/* Ground */}
        <path
          fill="#0e150f"
          d={`M0 ${gy}c160-18 320-26 520-14s420 22 620 6 220-14 300-8V900H0Z`}
        />
        <path
          fill="#0a0f0b"
          d={`M0 ${gy + 90}c200-14 420-6 640 6s480 10 800-10V900H0Z`}
        />
        {/* Ferns and leaves, left */}
        <g fill="#111a12">
          <path d={`M-20 ${gy + 40}c40-120 120-200 230-250-70 70-120 150-140 250Z`} />
          <path d={`M30 ${gy + 50}c10-90 60-170 150-220-40 60-70 140-80 220Z`} opacity="0.8" />
          <path d={`M-40 ${gy - 40}c90-60 190-80 300-60-110 20-200 60-260 120Z`} opacity="0.7" />
        </g>
        {/* Banana leaf, right */}
        <g fill="#111a12">
          <path d={`M1460 ${gy - 260}c-120 40-230 140-280 300 70-110 170-190 290-230Z`} />
          <path d={`M1470 ${gy - 120}c-90 20-170 90-210 190 60-70 130-120 220-150Z`} opacity="0.8" />
          <path d={`M1300 ${gy + 60}c20-80 70-150 140-190-40 60-60 130-60 190Z`} opacity="0.9" />
        </g>
        {/* Grass tufts */}
        <g fill="#0c130d">
          <path d={`M380 ${gy + 30}c6-30 10-50 22-70-4 26-6 48-4 70Z M410 ${gy + 32}c-2-26 2-46 10-60 0 22 0 42 2 60Z`} />
          <path d={`M960 ${gy + 24}c6-30 12-46 24-64-6 24-8 44-6 64Z M990 ${gy + 26}c0-24 4-40 12-54-2 20-2 38 0 54Z`} />
          <path d={`M640 ${gy + 120}c6-36 14-56 28-80-6 30-8 54-6 80Z`} />
        </g>
      </svg>
    </div>
  );
}
