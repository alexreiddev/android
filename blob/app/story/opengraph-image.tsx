import { ogSize, renderOg } from "@/lib/og";

export const alt = "Lights that only wake for you.: BLOB";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg("Lights that only wake for you.", "Our story", 13);
}
