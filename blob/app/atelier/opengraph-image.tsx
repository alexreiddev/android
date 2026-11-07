import { ogSize, renderOg } from "@/lib/og";

export const alt = "Hand-blown glass, made for one place.: BLOB";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg("Hand-blown glass, made for one place.", "BLOB Atelier", 19);
}
