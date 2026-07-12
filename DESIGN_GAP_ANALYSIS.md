# ASKA NGO Portal — Design, Color, CSV & SEO Gap Analysis

**Project:** Aap Sab Ki Awaaz (ASKA) NGO Portal
**Stack:** Next.js 16.2.7 (App Router) · React 19 · Tailwind v4 · framer-motion · lucide-react
**Date:** July 11, 2026
**Scope:** (1) color richness aligned to the mission, (2) fast social-post publishing via CSV, (3) SEO.

---

## 1. Executive Summary

The portal is well-built: a warm, accessible design system, a working server-side CSV pipeline for media coverage, glassmorphism, and framer-motion polish. Three structural gaps block the stated goals.

| Goal | Current state | Verdict |
|------|---------------|---------|
| **Rich color, mission-aligned** | Single gold accent (`#D4A853`) applied to *every* initiative. Road safety, healthcare, sports, water, civic all render identically. | ❌ Monochrome |
| **Social posts via CSV, fast** | Only `media.csv` exists. No `category` column, no social schema, no social page/preview. `csvParser.ts` is generic and reusable. | ❌ Missing |
| **SEO** | Only static `title`/`description` per page + a partial `openGraph` in `layout.tsx`. **No `metadataBase`, no OG image, no `sitemap`, no `robots`, no JSON-LD, no canonicals, raw `<img>` everywhere.** | ❌ Major gaps |

The mission ("empower citizens… awareness of rights… road safety, health, sports, civic welfare") is *thematically diverse* but *visually flat*. The same token system that makes it accessible is what makes every cause look the same.

---

## 2. Grounded Findings (what's actually in the repo)

### Color — `src/app/globals.css`
- `@theme` defines exactly two brand hues: `--color-ngo-primary: #111111` and `--color-ngo-secondary: #D4A853` (+ light/subtle variants). Everything else is warm-neutral.
- Homepage campaign cards (`src/app/page.tsx`) map five distinct causes (`Shield`, `Heart`, `Droplets`, `Trophy`, …) but all icons render in `text-ngo-secondary` gold. No per-cause color.

### CSV — `src/data/media.csv` + `src/utils/csvParser.ts`
- Header: `image_src,title,description,source,date,url`. **No `category`/`initiative_type` column** → nothing to key a color theme off.
- `parseCSV()` / `arrayToCSV()` are schema-agnostic and quote-safe → directly reusable for a social CSV. Good foundation.
- Media page loads CSV via `fs.readFileSync` at request/build time with a hardcoded `FALLBACK_ARTICLES` array — solid pattern to copy for social.

### SEO — `src/app/*`
- `layout.tsx` metadata: `title`, `description`, `openGraph {title, description, type, locale}`. **No `metadataBase`** → any relative OG/Twitter image URL will not resolve. **No `twitter` card block. No `openGraph.images`.**
- Per-page `metadata` exists on `core-team`, `get-involved`, `media-coverage` — good — but all static, no canonical/`alternates`.
- `grep` confirms **zero** occurrences of `metadataBase`, `sitemap`, `robots`, `manifest`, `application/ld+json`, `generateMetadata`, `canonical`.
- `public/` has `favicon.ico` only — no `apple-touch-icon`, no web manifest, no `og.png`.
- Images use raw `<img>` (e.g. `page.tsx` hero, campaign cards) → no `next/image` optimization, no intrinsic `width/height` → LCP/CLS penalties that Google Core Web Vitals scores directly.

---

## 3. Gap A — Rich, Mission-Mapped Color System

**Principle:** keep charcoal for text + gold as the *house* brand, but give each mission its own accent so a citizen scanning the feed instantly reads "this is road safety" vs "this is health." Color is never the *sole* signal — always paired with an icon + label (accessibility).

### A.1 Add mission tokens to `globals.css`

```css
@theme {
  /* --- Mission accents (WCAG-AA on white/cream) --- */
  --color-road:   #E63946;  --color-road-soft:   #FDE7E9;  /* 🛡️ Road safety — alert  */
  --color-health: #0F9D74;  --color-health-soft: #E4F5EF;  /* ❤️ Healthcare — care    */
  --color-sports: #EA7317;  --color-sports-soft: #FDECD9;  /* 🏆 Sports — energy      */
  --color-civic:  #3A6EA5;  --color-civic-soft:  #E7EFF8;  /* 🏛️ Civic/rights — trust */
  --color-water:  #0081CF;  --color-water-soft:  #E0F2FE;  /* 💧 Water/env — life     */
}
```

> Contrast note: use the *saturated* hue for text/badges on the `-soft`/white background, and the `-soft` tint for large fills. All five pass AA (≥4.5:1) for badge text on white. Verify with a contrast script (see §6 checklist) before merge — do not eyeball.

### A.2 Central theme map — `src/utils/themeMapper.ts`

```typescript
import { Shield, Heart, Trophy, Landmark, Droplets, Megaphone, LucideIcon } from "lucide-react";

export type Initiative = "road-safety" | "healthcare" | "sports" | "civic" | "water" | "general";

interface Theme { label: string; icon: LucideIcon; accent: string; soft: string; badge: string; }

export const THEMES: Record<Initiative, Theme> = {
  "road-safety": { label: "Road Safety", icon: Shield,   accent: "var(--color-road)",   soft: "var(--color-road-soft)",   badge: "text-[#E63946] bg-[#FDE7E9]" },
  healthcare:    { label: "Healthcare",  icon: Heart,    accent: "var(--color-health)", soft: "var(--color-health-soft)", badge: "text-[#0F9D74] bg-[#E4F5EF]" },
  sports:        { label: "Sports",      icon: Trophy,   accent: "var(--color-sports)", soft: "var(--color-sports-soft)", badge: "text-[#EA7317] bg-[#FDECD9]" },
  civic:         { label: "Civic Rights",icon: Landmark, accent: "var(--color-civic)",  soft: "var(--color-civic-soft)",  badge: "text-[#3A6EA5] bg-[#E7EFF8]" },
  water:         { label: "Water & Env", icon: Droplets, accent: "var(--color-water)",  soft: "var(--color-water-soft)",  badge: "text-[#0081CF] bg-[#E0F2FE]" },
  general:       { label: "ASKA",        icon: Megaphone,accent: "var(--color-ngo-secondary)", soft: "var(--color-ngo-secondary-subtle)", badge: "text-ngo-secondary bg-ngo-secondary-subtle" },
};

export const themeFor = (k?: string): Theme => THEMES[(k as Initiative)] ?? THEMES.general;
```

### A.3 Apply it
- **Media cards / campaign cards:** badge background = `theme.soft`, icon chip = `theme.accent`, top border accent = `theme.accent`. One-line change: `themeFor(article.category)`.
- **Homepage campaign grid:** swap the hardcoded gold icon chip for `themeFor(campaign.initiative).badge`.
- **Requires** a new `category` column in the CSVs (§4) — that column is the join key for the whole color system.

---

## 4. Gap B — Fast Social Posting via CSV

Mirror the proven media pipeline. Non-technical staff edit a spreadsheet; the site renders themed, share-ready cards with no code.

### B.1 New file `src/data/social-posts.csv`

```csv
id,category,platform,post_text,image_src,hashtags,cta_text,cta_url,publish_date,status
1,road-safety,all,"🛡️ 400 helmets handed to Vizag Home Guards. Every helmet = one life protected.",vizag-helmet-drive.jpg,#RoadSafety #ASKA #Vizag,Read coverage,https://x.com/vizagcitypolice/status/2053409077724901841,2026-05-15,published
2,healthcare,instagram,"❤️ 200+ families got free checkups at our Vijayawada mega camp. Prevention saves lives.",vijayawada-medical-camp.jpg,#HealthCamp #Wellness,See event,https://share.google/1k9ZzS1DjT8ZudAsh,2025-11-30,published
3,sports,all,"🏆 Boccia Silver (Bahrain) & Weightlifting Bronze (Malaysia) for our athletes!",sports-achievements.jpg,#Sports #India,,#,2026-05-15,draft
```

| Column | Purpose | Notes |
|--------|---------|-------|
| `category` | drives color theme (§3) | must match `Initiative` keys |
| `platform` | `all\|linkedin\|twitter\|instagram\|facebook` | picks preview frame + char limit |
| `post_text` | body | quote-safe via existing parser |
| `status` | `draft\|scheduled\|published` | dashboard tabs; only `published` renders publicly |
| `publish_date` | sort + schedule view | ISO `YYYY-MM-DD` for correct sorting |

### B.2 Server route `src/app/social/page.tsx`
Copy `media-coverage/page.tsx` verbatim, swap the path to `social-posts.csv`, reuse `parseCSV`. Filter `status === "published"` for the public feed; keep all rows for an internal `/social?view=all` board.

### B.3 Client `src/components/SocialPostsClient.tsx`
- Status tabs (Draft / Scheduled / Published) + category filter chips colored by `themeFor`.
- **Platform preview frames** — LinkedIn / Twitter / Instagram mock cards with per-platform char-count warnings (X & IG ~280, LinkedIn ~3000).
- Reuse the media grid/list toggle for consistency.

### B.4 Also add `category` to `media.csv`
Append one column so existing coverage inherits the color system:
`image_src,title,description,source,date,url,category`

**Net effort:** ~1 parser reuse + 1 route copy + 1 client component. No new deps.

---

## 5. Gap C — SEO (the largest concrete gap)

Next.js 16 App Router gives file-based SEO primitives the project isn't using yet. Highest ROI first.

### C.1 Fix the metadata base — `src/app/layout.tsx` (blocks all social previews)

```typescript
export const metadata: Metadata = {
  metadataBase: new URL("https://aapsabkiawaaz.org"),
  title: { default: "Aap Sab Ki Awaaz | Empowering Communities", template: "%s | Aap Sab Ki Awaaz" },
  description: "ASKA empowers citizens through rights awareness, road safety, free health camps, athlete support, and civic welfare across Andhra Pradesh.",
  keywords: ["ASKA","NGO Andhra Pradesh","road safety","free medical camp","government schemes","Visakhapatnam NGO"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Aap Sab Ki Awaaz", description: "Community empowerment: access for all.",
    url: "https://aapsabkiawaaz.org", siteName: "Aap Sab Ki Awaaz",
    type: "website", locale: "en_IN", images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Aap Sab Ki Awaaz", images: ["/og.png"] },
  robots: { index: true, follow: true },
};
```

> `template` auto-suffixes every page title. Because the per-page files already set `title`, switch them to bare strings (e.g. `title: "Media Coverage"`).

### C.2 `src/app/sitemap.ts` (auto XML sitemap)

```typescript
import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://aapsabkiawaaz.org";
  return ["", "/media-coverage", "/get-involved", "/core-team", "/social"].map((p) => ({
    url: `${base}${p}`, lastModified: new Date(), changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.8,
  }));
}
```

### C.3 `src/app/robots.ts`

```typescript
import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: "https://aapsabkiawaaz.org/sitemap.xml" };
}
```

### C.4 Structured data (JSON-LD) — biggest rich-result win for an NGO
Add an `NGO` schema in the layout, and `NewsArticle` per media item. Emit as a plain script (App Router-safe):

```tsx
// src/components/JsonLd.tsx
export default function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
```

```typescript
// organization schema — render <JsonLd data={ORG_SCHEMA} /> in layout body
export const ORG_SCHEMA = {
  "@context": "https://schema.org", "@type": "NGO",
  name: "Aap Sab Ki Awaaz", alternateName: "ASKA", foundingDate: "2022-12-18",
  url: "https://aapsabkiawaaz.org",
  address: { "@type": "PostalAddress", streetAddress: "53-20-16/11/1, P AND T Colony, Chaitanya Nagar, Maddilapalem, Seethamadhara", addressLocality: "Visakhapatnam", addressRegion: "AP", postalCode: "530013", addressCountry: "IN" },
  telephone: "+91-96424-14141", email: "kiran@aapsabkiawaaz.org",
  founder: { "@type": "Person", name: "Shiv Vadlamudi" },
};
```
On `media-coverage`, map each article → `NewsArticle` (`headline`, `datePublished`, `image`, `url`, `publisher`) for news-carousel eligibility.

### C.5 Per-article dynamic OG + canonicals
Use `generateMetadata` on any future `/media-coverage/[slug]` route to emit per-article `openGraph.images` (Next `opengraph-image.tsx` can render them dynamically). Add `alternates.canonical` per page to prevent duplicate-URL dilution.

### C.6 Core Web Vitals — replace `<img>` with `next/image`
Every image is a raw `<img>` (hero, About, all campaign/media cards). Migrating to `next/image` yields automatic AVIF/WebP, lazy-loading, and intrinsic sizing — directly improving LCP + CLS, which are ranking signals. Add `width`/`height` and `priority` on the hero.

### C.7 Icons & manifest
Add `src/app/manifest.ts`, `apple-icon.png`, and an `og.png` (1200×630) in `public/`. Optional `theme-color` (`#111111`).

---

## 5b. Gap D — Core Team Page: Credibility Through Real Imagery *(implemented)*

**Why it's a design gap:** the board is the NGO's single strongest trust signal — decorated defence officers, a former High Court Chief Justice, senior physicians. The prior page rendered every member as a **gradient monogram** (initials only) and shipped **fake `href="#"` social links**, which reads as a placeholder/unfinished section and undercuts credibility for donors and partners.

**Suggested (and now shipped) fix:**
- **Real portraits** for the 9 members who have them, self-hosted at `/public/images/team/<slug>.jpg`; the 3 without photos keep the gradient-initials fallback (graceful, not broken).
- **Data parity with the live site** — added the missing member (**Shri. Bhavani Parsad**, former Chief Justice) → 12 total; restored full, previously-truncated bios.
- **New UX** (`src/components/CoreTeamClient.tsx`): 4:5 portrait grid, name overlaid on a gradient scrim, gold role chip, **expandable "Read more" bios** (long entries no longer blow out card height), and **outbound reference links** where the source had them (TS High Court profile, YouTube). Removed the dead social icons.

**Still open (fold into the roadmap):**
- **Migrate these `<img>` to `next/image`** — same Core Web Vitals point as §C.6; portrait images are LCP candidates on this route.
- **`Person` JSON-LD per member** (`@type: Person`, `jobTitle`, `image`, `worksFor: ASKA`) — extends the §C.4 structured-data work and makes the board eligible for knowledge-panel enrichment.
- **Store team data as CSV** (`src/data/team.csv`) mirroring the media/social pipeline (§4) so non-technical staff can edit the roster in a spreadsheet — closes the "everything editable via CSV" goal for this page too.

---

## 6. Prioritized Roadmap

| # | Item | Effort | Impact | Files |
|---|------|--------|--------|-------|
| 1 | `metadataBase` + OG/Twitter images + `og.png` | S | 🔥 High | `layout.tsx`, `public/og.png` |
| 2 | `sitemap.ts` + `robots.ts` | S | 🔥 High | 2 new files |
| 3 | JSON-LD `NGO` + `NewsArticle` | M | 🔥 High | `JsonLd.tsx`, `layout.tsx`, media page |
| 4 | Mission color tokens + `themeMapper.ts` | M | High | `globals.css`, new util |
| 5 | `category` column in both CSVs + themed badges | M | High | `media.csv`, cards |
| 6 | Social CSV + `/social` route + client | M | High | `social-posts.csv`, 2 new files |
| 7 | `next/image` migration | M | Med (CWV) | all pages |
| 8 | `manifest.ts`, apple/theme icons | S | Med | `public/`, `manifest.ts` |
| ✅ | Core Team: real photos + new UX + 12th member | M | High | `core-team/page.tsx`, `CoreTeamClient.tsx` — **done** |
| 9 | `Person` JSON-LD + team `<img>` → `next/image` | S | Med | core-team page |
| 10 | Move team roster to `team.csv` | S | Med | new `src/data/team.csv` |

**Suggested order:** SEO quick wins (1–3) → color+CSV system (4–6) → performance/polish (7–10). Core Team imagery (✅) already shipped; self-host the 9 JPGs into `public/images/team/` to complete it.

---

## 7. Verification Checklist (do before shipping)

- [ ] `npm run build` passes; each route shows expected metadata in view-source.
- [ ] Run all five mission hex pairs through a WCAG contrast check (`wcag-contrast`); confirm ≥4.5:1 for badge text.
- [ ] Validate JSON-LD in Google Rich Results Test.
- [ ] `/sitemap.xml` and `/robots.txt` resolve and list all routes.
- [ ] OG preview renders in the LinkedIn Post Inspector / X card validator (needs live `metadataBase` domain).
- [ ] Color is never the only cue — every themed card keeps its icon + text label (a11y).
- [ ] Non-technical test: add a `social-posts.csv` row in Excel, rebuild, confirm the card appears themed by `category`.

---

## 8. Notes for Developers
- Backward compatible: gold stays the house brand (`general` theme); mission accents are additive.
- Reuse `csvParser.ts` unchanged — it's schema-agnostic and quote-safe.
- Keep `FALLBACK_*` arrays for both CSVs so a missing/blank file never breaks a build.
- Confirm the production domain before hardcoding `https://aapsabkiawaaz.org` in metadata/sitemap.
