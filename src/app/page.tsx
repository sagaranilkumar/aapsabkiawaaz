import fs from "fs";
import path from "path";
import HomeClient, { type CampaignItem, type FeedItem } from "@/components/HomeClient";
import { parseCSV, parseRowDate, sortByDateDesc } from "@/utils/csvParser";

const FALLBACK_IMAGE = "/images/vizag-helmet-drive.jpg";

/** Fixed locale + timezone so the server and client render identical strings. */
const DATE_FORMAT = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** Read a dataset newest-first; an unreadable or empty file yields no rows. */
function readRows(file: string, requiredField: string): Record<string, string>[] {
  try {
    const csvPath = path.join(process.cwd(), "src", "data", file);
    if (fs.existsSync(csvPath)) {
      const parsed = parseCSV(fs.readFileSync(csvPath, "utf-8"));
      if (parsed.length > 0 && parsed[0][requiredField]) {
        return sortByDateDesc(parsed);
      }
    }
  } catch (error) {
    console.error(`Error reading ${file} for the home page:`, error);
  }
  return [];
}

function resolveImg(src?: string): string {
  const s = (src || "").trim();
  if (!s) return FALLBACK_IMAGE;
  if (s.startsWith("http") || s.startsWith("/")) return s;
  return `/images/${s.replace(/^\.?\//, "")}`;
}

function displayDate(raw?: string): string {
  const parsed = parseRowDate(raw);
  return Number.isNaN(parsed) ? (raw || "").trim() : DATE_FORMAT.format(parsed);
}

function timestamp(raw?: string): number {
  const parsed = parseRowDate(raw);
  return Number.isNaN(parsed) ? Number.NEGATIVE_INFINITY : parsed;
}

/** Social posts carry no title, so lead with their first sentence. */
function headline(text: string): string {
  const firstSentence = text.split(/(?<=[.!?])\s/)[0] || text;
  return firstSentence.length > 120 ? `${firstSentence.slice(0, 117).trimEnd()}…` : firstSentence;
}

export default function Home() {
  const articles = readRows("media.csv", "title");
  const posts = readRows("social-posts.csv", "post_text");

  // Hero banner: whichever of the two newest entries is more recent.
  const newestArticle = articles[0];
  const newestPost = posts[0];
  let latest: FeedItem | null = null;

  if (newestArticle && timestamp(newestArticle.date) >= timestamp(newestPost?.publish_date)) {
    latest = {
      kind: "media",
      title: newestArticle.title,
      date: displayDate(newestArticle.date),
      image: resolveImg(newestArticle.image_src),
      href: "/media-coverage",
      category: newestArticle.category,
    };
  } else if (newestPost) {
    latest = {
      kind: "social",
      title: headline(newestPost.post_text),
      date: displayDate(newestPost.publish_date),
      image: resolveImg(newestPost.image_src),
      href: "/social",
      category: newestPost.category,
    };
  }

  // Recent campaigns: the four most recent pieces of coverage.
  const campaigns: CampaignItem[] = articles.slice(0, 4).map((a) => ({
    title: a.title,
    description: a.description || a.excerpt || "",
    date: displayDate(a.date),
    image: resolveImg(a.image_src),
    category: a.category,
  }));

  return <HomeClient latest={latest} campaigns={campaigns} />;
}
