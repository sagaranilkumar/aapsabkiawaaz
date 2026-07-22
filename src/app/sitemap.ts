import type { MetadataRoute } from "next";
import { SITE_URL } from "@/utils/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/media-coverage", "/core-team", "/social", "/get-involved", "/privacy", "/terms"];
  const now = new Date();
  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
