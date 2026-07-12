import { Metadata } from "next";
import fs from "fs";
import path from "path";
import SocialPostsClient from "@/components/SocialPostsClient";
import { parseCSV } from "@/utils/csvParser";

export const metadata: Metadata = {
  title: "Social Posts",
  description:
    "Campaign-ready social posts for Aap Sab Ki Awaaz — themed by initiative and editable via a simple CSV.",
  alternates: { canonical: "/social" },
};

const FALLBACK_POSTS: Record<string, string>[] = [
  {
    id: "1",
    category: "road-safety",
    platform: "all",
    post_text:
      "400 helmets handed to Vizag Home Guards to protect our frontline heroes. Every helmet = one life protected.",
    image_src: "vizag-helmet-drive.jpg",
    hashtags: "#RoadSafety #ASKA #Vizag",
    cta_text: "Read coverage",
    cta_url: "https://x.com/vizagcitypolice/status/2053409077724901841",
    publish_date: "2026-05-15",
    status: "published",
  },
];

export default function SocialPage() {
  let posts: Record<string, string>[] = FALLBACK_POSTS;

  try {
    const csvPath = path.join(process.cwd(), "src", "data", "social-posts.csv");
    if (fs.existsSync(csvPath)) {
      const csvData = fs.readFileSync(csvPath, "utf-8");
      const parsed = parseCSV(csvData);
      if (parsed && parsed.length > 0 && parsed[0].post_text) {
        posts = parsed;
      }
    }
  } catch (error) {
    console.error("Error reading social-posts.csv server-side:", error);
  }

  return <SocialPostsClient initialPosts={posts} />;
}
