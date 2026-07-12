import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/utils/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "ASKA",
    description:
      "Empowering citizens through rights awareness, road safety, health, and civic welfare across Andhra Pradesh.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFBF5",
    theme_color: "#111111",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
