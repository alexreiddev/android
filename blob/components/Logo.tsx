/**
 * BLOB wordmark: a glowing pebble mark + rounded lowercase-feel letterforms
 * drawn as SVG so it stays crisp and themable (uses currentColor).
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 132 40" className={className} role="img" aria-label="BLOB">
      <defs>
        <radialGradient id="logo-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffb547" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffb547" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="logo-body" cx="42%" cy="38%" r="70%">
          <stop offset="0%" stopColor="#fff4dc" />
          <stop offset="55%" stopColor="#ffd08a" />
          <stop offset="100%" stopColor="#ffb547" />
        </radialGradient>
      </defs>
      <circle cx="18" cy="21" r="18" fill="url(#logo-glow)" />
      <path
        d="M8.2 22.6c-.6-5.6 3.4-10.4 9.2-10.6 5.3-.2 10 3.2 10.4 8.3.4 5-3.2 8.6-9.4 8.8-5.6.2-9.7-1.6-10.2-6.5Z"
        fill="url(#logo-body)"
      />
      <g fill="currentColor">
        {/* B */}
        <path d="M40 10.5h8.2c4.3 0 6.6 2 6.6 5 0 2-1.1 3.4-2.9 4 2.3.5 3.8 2.1 3.8 4.5 0 3.4-2.6 5.5-7.1 5.5H40a1.5 1.5 0 0 1-1.5-1.5V12a1.5 1.5 0 0 1 1.5-1.5Zm3 3.6v4.6h4.6c1.9 0 2.9-.8 2.9-2.3s-1-2.3-2.9-2.3H43Zm0 7.9v4.9h5.2c2.1 0 3.2-.9 3.2-2.5s-1.1-2.4-3.2-2.4H43Z" />
        {/* L */}
        <path d="M59.6 10.5h1.5a1.5 1.5 0 0 1 1.5 1.5v13.9h7.6a1.6 1.6 0 0 1 0 3.2h-10.6a1.5 1.5 0 0 1-1.5-1.5V12a1.5 1.5 0 0 1 1.5-1.5Z" />
        {/* O */}
        <path d="M81.4 10.2c5.5 0 9.4 4.1 9.4 9.5s-3.9 9.6-9.4 9.6-9.4-4.1-9.4-9.6 3.9-9.5 9.4-9.5Zm0 3.6c-3 0-5 2.4-5 5.9s2 5.9 5 5.9 5-2.4 5-5.9-2-5.9-5-5.9Z" />
        {/* B */}
        <path d="M96.2 10.5h8.2c4.3 0 6.6 2 6.6 5 0 2-1.1 3.4-2.9 4 2.3.5 3.8 2.1 3.8 4.5 0 3.4-2.6 5.5-7.1 5.5h-8.6a1.5 1.5 0 0 1-1.5-1.5V12a1.5 1.5 0 0 1 1.5-1.5Zm3 3.6v4.6h4.6c1.9 0 2.9-.8 2.9-2.3s-1-2.3-2.9-2.3h-4.6Zm0 7.9v4.9h5.2c2.1 0 3.2-.9 3.2-2.5s-1.1-2.4-3.2-2.4h-5.2Z" />
      </g>
    </svg>
  );
}
