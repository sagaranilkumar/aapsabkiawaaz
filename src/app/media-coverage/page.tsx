import { Metadata } from "next";
import fs from "fs";
import path from "path";
import MediaCoverageClient from "@/components/MediaCoverageClient";
import { parseCSV } from "@/utils/csvParser";
import JsonLd from "@/components/JsonLd";
import { newsArticleSchema } from "@/utils/seo";

export const metadata: Metadata = {
  title: "Media Coverage",
  description: "Read about our latest initiatives, road safety drives, free medical camps, and social impact in the news.",
  alternates: { canonical: "/media-coverage" },
  openGraph: {
    title: "ASKA in the Media — Road Safety, Health Camps & Impact",
    description:
      "400 helmets to Vizag Home Guards, free medical camps, clean-water drives and athlete wins — Aap Sab Ki Awaaz in the news.",
    url: "/media-coverage",
    siteName: "Aap Sab Ki Awaaz",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/images/vizag-helmet-drive.jpg", width: 1200, height: 630, alt: "ASKA road-safety helmet drive in Visakhapatnam" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ASKA in the Media — Road Safety, Health Camps & Impact",
    description: "Aap Sab Ki Awaaz in the news: helmets, health camps, clean water and athlete wins.",
    images: ["/images/vizag-helmet-drive.jpg"],
  },
};

const FALLBACK_ARTICLES = [
  {
    title: "NGO Donates 400 Helmets to Vizag Home Guards; City Commissioner Flags Accident Risks",
    source: "The Hindu / Vizag Police",
    date: "May 15, 2026",
    description: "Visakhapatnam Police Commissioner flagged off a road safety drive by Aap Sab Ki Awaaz, which distributed 400 helmets to home guards to protect frontline personnel and raise public safety awareness.",
    url: "https://x.com/vizagcitypolice/status/2053409077724901841?s=20",
    image_src: "vizag-helmet-drive.jpg",
    category: "road-safety"
  },
  {
    title: "Free Medical Camp Held for Home Guards and Families in Vijayawada AR Grounds",
    source: "Sakshi / NTR District Police",
    date: "November 30, 2025",
    description: "Ahead of Rising Day, NTR District Police Commissioner SV Rajashekar Babu inaugurated a free mega health camp organized by Aap Sab Ki Awaaz for police personnel and their families.",
    url: "https://share.google/1k9ZzS1DjT8ZudAsh",
    image_src: "vijayawada-medical-camp.jpg",
    category: "healthcare"
  },
  {
    title: "Road Safety Counseling & Helmet Distribution Held at Guntur and Vijayawada HOD Buildings",
    source: "Director of Prosecutions Release",
    date: "May 13, 2026",
    description: "Led by Director of Prosecutions Baira Rama Koteswara Rao, a free helmet distribution drive and traffic safety awareness seminars were conducted for regional home guards and staff.",
    url: "https://youtu.be/PtXLwjquVxo",
    image_src: "guntur-helmet-distribution.jpg",
    category: "road-safety"
  },
  {
    title: "Global Sports Triumphs: Bahrain Boccia Silver and Malaysia Weightlifting Bronze",
    source: "ASKA Sports Impact",
    date: "May 15, 2026",
    description: "Aap Sab Ki Awaaz celebrates its supported athletes: a physically challenged Boccia player won a Silver Medal in Bahrain, and weightlifting prodigy Sai Shakthi (daughter of a local tailor) won a Bronze Medal in Malaysia.",
    url: "#",
    image_src: "sports-achievements.jpg",
    category: "sports"
  },
  {
    title: "Clean Drinking Water Initiative: Water Dispensers Donated to MVP Police Station and MRO Office",
    source: "Visakhapatnam City PR",
    date: "May 14, 2026",
    description: "In a dedicated public utility initiative, Aap Sab Ki Awaaz donated clean drinking water dispensers to MVP Police Station, Visakhapatnam MRO Office, and multiple Primary Health Centers.",
    url: "#",
    image_src: "drinking-water-donations.jpg",
    category: "water"
  },
  {
    title: "Dr. Sanakayyala Radha Madhavi Appointed Guntur District Mahila Morcha President",
    source: "Guntur District News",
    date: "December 11, 2025",
    description: "Advisory board physician Dr. Sanakayyala Radha Madhavi, daughter-in-law of Former Health Minister Sanakayyala Aruna, has been appointed Mahila Morcha President for Guntur District.",
    url: "#",
    image_src: "radha-madhavi-mahila-morcha.jpg",
    category: "civic"
  },
  {
    title: "Student Drunk & Drive Outreach Seminars & Road Safety Clubs Set Up in Universities",
    source: "Andhra University Times",
    date: "May 15, 2026",
    description: "Aap Sab Ki Awaaz launched interactive seminars and parent counseling programs regarding student drunk & drive cases, establishing Road Safety Clubs in regional colleges.",
    url: "https://youtube.com/shorts/2WhwCvrKUUk",
    image_src: "student-drunk-drive-counseling.jpg",
    category: "road-safety"
  },
  {
    title: "Bharatiyam - Kargil Vijay Diwas Poster Unveiled by District Principal Judge",
    source: "Sakshi (Visakhapatnam East, Page 11)",
    date: "July 24, 2026",
    description: "District Principal Judge Chinnamsetty Raju unveiled the poster for Bharatiyam, the national integration cultural program marking Kargil Vijay Diwas at VMRDA Childrens Arena, Siripuram. Aap Sab Ki Awaaz General Secretary Bavisetti Kiran Kumar and Patron Dr. P. Subramanyam joined the launch, announcing felicitation and financial support for the families of martyred soldiers.",
    url: "https://epaper.sakshi.com/",
    image_src: "bharatiyam-sakshi-coverage.jpg",
    category: "civic"
  },
  {
    title: "Bharatiyam: National Integration Cultural Program Marks Kargil Vijay Diwas in Visakhapatnam",
    source: "ACME / Aap Sab Ki Awaaz",
    date: "July 25, 2026",
    description: "Held on 25 July 2026 at the VMRDA Childrens Arena with VMRDA Chairperson Shri M V Pranav Gopal as Chief Guest, Bharatiyam featured a live performance by the Eastern Naval Command Naval Symphony and cultural showcases by schools and academies across the city. ACME and Aap Sab Ki Awaaz honoured Dr. Chandra Shekhar, President of Veterans (AP & Telangana), and the wives of late CPO Ashok Kumar Singh and late L Naik Kolli Purna Ramachandra Reddy.",
    url: "#",
    image_src: "bharatiyam-invitation.jpg",
    category: "civic"
  }
];

export default function MediaCoverage() {
  let initialArticles: Record<string, string>[] = FALLBACK_ARTICLES;

  try {
    const csvPath = path.join(process.cwd(), "src", "data", "media.csv");
    if (fs.existsSync(csvPath)) {
      const csvData = fs.readFileSync(csvPath, "utf-8");
      const parsed = parseCSV(csvData);
      if (parsed && parsed.length > 0 && parsed[0].title) {
        initialArticles = parsed;
      }
    }
  } catch (error) {
    console.error("Error reading or parsing media.csv server-side:", error);
  }

  return (
    <>
      <JsonLd data={newsArticleSchema(initialArticles)} />
      <MediaCoverageClient initialArticles={initialArticles} />
    </>
  );
}
