import { ogSize, renderOg } from "@/lib/og";

export const alt = "One gentle core. Three bodies.: BLOB";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg("One gentle core. Three bodies.", "The collection", 11);
}
