import { ogSize, renderOg } from "@/lib/og";

export const alt = "Light That Feels Alive.: BLOB";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg("Light That Feels Alive.", "BLOB", 7);
}
