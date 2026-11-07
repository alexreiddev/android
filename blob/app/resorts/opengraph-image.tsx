import { ogSize, renderOg } from "@/lib/og";

export const alt = "Light your paths without lighting up the night.: BLOB";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg("Light your paths without lighting up the night.", "For resorts & homestays", 9);
}
