import { Metadata } from "next";
import fs from "fs";
import path from "path";
import SocialPostsClient from "@/components/SocialPostsClient";
import { parseCSV, sortByDateDesc } from "@/utils/csvParser";

export const metadata: Metadata = {
  title: "Social Posts",
  description:
    "Follow Aap Sab Ki Awaaz campaigns across road safety, healthcare, sports, and civic welfare — every update in one place.",
  alternates: { canonical: "/social" },
  openGraph: {
    title: "ASKA Campaigns — Follow the Movement",
    description:
      "Road safety, healthcare, sports and civic welfare — every Aap Sab Ki Awaaz campaign update in one place.",
    url: "/social",
    siteName: "Aap Sab Ki Awaaz",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/og-social.png", width: 1200, height: 630, alt: "Aap Sab Ki Awaaz campaigns across road safety, health, sports and civic welfare" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ASKA Campaigns — Follow the Movement",
    description: "Every Aap Sab Ki Awaaz campaign update in one place.",
    images: ["/og-social.png"],
  },
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

  // Newest post always leads the feed, whatever order the CSV rows sit in.
  return <SocialPostsClient initialPosts={sortByDateDesc(posts)} />;
}
