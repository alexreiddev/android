"use client";

import { trackEvent } from "@/lib/analytics";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => {
        trackEvent("brief_print");
        window.print();
      }}
      className="organic-pill bg-[#ffb547] px-5 py-2 text-sm font-semibold text-[#0b0f0c]"
    >
      Print or save as PDF
    </button>
  );
}
