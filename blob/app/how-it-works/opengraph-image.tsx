import { ogSize, renderOg } from "@/lib/og";

export const alt = "It sleeps until you arrive.: BLOB";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg("It sleeps until you arrive.", "How it works", 5);
}
