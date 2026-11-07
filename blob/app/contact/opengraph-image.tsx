import { ogSize, renderOg } from "@/lib/og";

export const alt = "Say hello.: BLOB";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg("Say hello.", "Contact", 3);
}
