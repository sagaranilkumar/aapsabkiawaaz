/** Canonical production origin — update if the deploy domain changes. */
export const SITE_URL = "https://aapsabkiawaaz.org";

export const SITE_NAME = "Aap Sab Ki Awaaz";

/** Organization / NGO structured data (rendered once in the root layout). */
export const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: SITE_NAME,
  alternateName: "ASKA",
  url: SITE_URL,
  logo: `${SITE_URL}/og.png`,
  foundingDate: "2022-12-18",
  description:
    "ASKA empowers citizens through rights awareness, road safety drives, free health camps, athlete support, and civic welfare across Andhra Pradesh, India.",
  founder: { "@type": "Person", name: "Shiv Vadlamudi" },
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "53-20-16/11/1, P AND T Colony, Chaitanya Nagar, Maddilapalem, Seethamadhara",
    addressLocality: "Visakhapatnam",
    addressRegion: "AP",
    postalCode: "530013",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-96424-14141",
    email: "kiran@aapsabkiawaaz.org",
    contactType: "customer support",
  },
} as const;

interface ArticleInput {
  title?: string;
  description?: string;
  date?: string;
  url?: string;
  source?: string;
  image_src?: string;
  image?: string;
}

/** Build a NewsArticle graph for the media-coverage page. */
export function newsArticleSchema(articles: ArticleInput[]) {
  return articles
    .filter((a) => a.title)
    .map((a) => {
      const img = (a.image_src || a.image || "").trim();
      const imageUrl = img
        ? img.startsWith("http")
          ? img
          : `${SITE_URL}/images/${img.replace(/^\.?\//, "")}`
        : `${SITE_URL}/og.png`;
      return {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: a.title,
        description: a.description || "",
        image: [imageUrl],
        datePublished: a.date || undefined,
        url: a.url && a.url !== "#" ? a.url : `${SITE_URL}/media-coverage`,
        publisher: { "@type": "NGO", name: SITE_NAME },
        author: { "@type": "Organization", name: a.source || SITE_NAME },
      };
    });
}
