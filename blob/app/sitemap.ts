import type { MetadataRoute } from "next";
import { tiers } from "@/content/products";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/collection", ...tiers.map((t) => `/collection/${t.slug}`), "/resorts", "/atelier", "/how-it-works", "/story", "/contact", "/privacy", "/terms", "/shipping-returns"];
  return paths.map((p) => ({
    url: `${site.url}${p === "/" ? "" : p}`,
    changeFrequency: "monthly",
    priority: p === "/" ? 1 : p.startsWith("/collection") || p === "/resorts" || p === "/atelier" ? 0.8 : 0.5,
  }));
}
