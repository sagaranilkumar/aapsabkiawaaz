"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ExternalLink, Hash, Globe, AlertCircle } from "lucide-react";
import { themeFor, THEMES, Initiative } from "@/utils/themeMapper";

type Post = Record<string, string>;

interface Props {
  initialPosts: Post[];
}

const PLATFORM_LIMIT: Record<string, number> = {
  twitter: 280,
  x: 280,
  instagram: 2200,
  linkedin: 3000,
  facebook: 63206,
  all: 280,
};

const STATUS_STYLE: Record<string, string> = {
  published: "text-health bg-health-soft ring-health/25",
  scheduled: "text-civic bg-civic-soft ring-civic/25",
  draft: "text-ngo-muted bg-ngo-stone ring-ngo-border",
};

const STATUS_TABS = ["all", "published", "scheduled", "draft"] as const;

function resolveImg(src?: string): string | null {
  if (!src) return null;
  const s = src.trim();
  if (!s) return null;
  if (s.startsWith("http") || s.startsWith("/")) return s;
  return `/images/${s.replace(/^\.?\//, "")}`;
}

export default function SocialPostsClient({ initialPosts }: Props) {
  const [status, setStatus] = useState<(typeof STATUS_TABS)[number]>("all");
  const [category, setCategory] = useState<Initiative | "all">("all");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: initialPosts.length };
    for (const p of initialPosts) {
      const s = (p.status || "draft").toLowerCase();
      c[s] = (c[s] || 0) + 1;
    }
    return c;
  }, [initialPosts]);

  const filtered = useMemo(() => {
    return initialPosts.filter((p) => {
      const s = (p.status || "draft").toLowerCase();
      const cat = themeFor(p.category).key;
      return (status === "all" || s === status) && (category === "all" || cat === category);
    });
  }, [initialPosts, status, category]);

  const categoriesPresent = useMemo(() => {
    const set = new Set<Initiative>();
    initialPosts.forEach((p) => set.add(themeFor(p.category).key));
    return Array.from(set);
  }, [initialPosts]);

  return (
    <div className="min-h-screen bg-ngo-background">
      <section className="relative overflow-hidden bg-gradient-to-br from-ngo-stone to-ngo-cream pt-28 pb-16">
        <div className="container mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <span className="mb-4 inline-flex items-center rounded-full border border-ngo-secondary/20 bg-ngo-secondary-subtle px-4 py-1.5 text-sm font-semibold text-ngo-secondary">
            Campaign Studio
          </span>
          <h1 className="font-serif text-4xl font-bold text-ngo-primary md:text-5xl">Social Posts</h1>
          <div className="mx-auto mt-4 mb-6 h-1 w-20 rounded-full bg-ngo-secondary" />
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-ngo-muted">
            Follow our campaigns across road safety, healthcare, sports, and civic
            welfare — every update from the movement, in one place.
          </p>
        </div>
      </section>

      <section className="sticky top-[72px] z-10 border-b border-ngo-border-light glass-warm py-4">
        <div className="container mx-auto flex max-w-5xl flex-col gap-3 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            {STATUS_TABS.map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-semibold capitalize transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ngo-secondary/50 ${
                  status === s
                    ? "bg-ngo-primary text-white shadow-sm"
                    : "bg-white text-ngo-muted ring-1 ring-ngo-border hover:text-ngo-primary"
                }`}
              >
                {s} <span className="opacity-60">({counts[s] || 0})</span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setCategory("all")}
              className={`cursor-pointer rounded-full px-3 py-1 text-xs font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ngo-secondary/50 ${
                category === "all"
                  ? "bg-ngo-primary text-white"
                  : "bg-white text-ngo-muted ring-1 ring-ngo-border hover:text-ngo-primary"
              }`}
            >
              All causes
            </button>
            {categoriesPresent.map((key) => {
              const t = THEMES[key];
              const Icon = t.icon;
              const active = category === key;
              return (
                <button
                  key={key}
                  onClick={() => setCategory(key)}
                  className={`inline-flex cursor-pointer items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ngo-secondary/50 ${
                    active ? t.badge : "bg-white text-ngo-muted ring-ngo-border hover:text-ngo-primary"
                  }`}
                >
                  <Icon size={12} />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-ngo-border-light bg-white py-20 text-center shadow-sm">
              <AlertCircle size={40} className="mx-auto mb-4 text-ngo-secondary" />
              <h3 className="mb-2 font-serif text-xl font-bold text-ngo-primary">No posts match</h3>
              <p className="mx-auto max-w-md text-sm text-ngo-muted">
                Try a different status or cause filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {filtered.map((p) => {
                  const theme = themeFor(p.category);
                  const Icon = theme.icon;
                  const img = resolveImg(p.image_src);
                  const platform = (p.platform || "all").toLowerCase();
                  const limit = PLATFORM_LIMIT[platform] ?? 280;
                  const len = (p.post_text || "").length;
                  const over = len > limit;
                  const st = (p.status || "draft").toLowerCase();
                  const tags = (p.hashtags || "").split(/\s+/).filter(Boolean);

                  return (
                    <motion.article
                      layout
                      key={p.id || p.post_text}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col overflow-hidden rounded-2xl border border-ngo-border-light bg-ngo-card shadow-sm transition-shadow hover:shadow-xl gold-glow"
                    >
                      <div className="flex items-center justify-between border-b border-ngo-border-light px-4 py-2.5">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ring-1 ring-inset ${theme.badge}`}>
                          <Icon size={11} />
                          {theme.label}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-ngo-muted-light">
                          <Globe size={12} />
                          {platform}
                        </span>
                      </div>

                      {img && (
                        <div className="h-52 w-full overflow-hidden bg-ngo-stone/30">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img} alt="" loading="lazy" className="h-full w-full object-cover" />
                        </div>
                      )}

                      <div className="flex flex-1 flex-col p-5">
                        <p className="whitespace-pre-line text-sm leading-relaxed text-ngo-primary">
                          {p.post_text}
                        </p>

                        {tags.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {tags.map((t) => (
                              <span key={t} className={`inline-flex items-center gap-0.5 text-xs font-semibold ${theme.accentText}`}>
                                <Hash size={10} />
                                {t.replace(/^#/, "")}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="mt-4 flex items-center justify-between border-t border-ngo-stone pt-3">
                          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ring-1 ring-inset ${STATUS_STYLE[st] || STATUS_STYLE.draft}`}>
                            {st}
                          </span>
                          <span className={`text-[11px] font-semibold ${over ? "text-road" : "text-ngo-muted-light"}`}>
                            {len}/{limit}
                          </span>
                        </div>

                        <div className="mt-3 flex items-center justify-between text-[11px] text-ngo-muted-light">
                          <span className="inline-flex items-center gap-1">
                            <Calendar size={12} />
                            {p.publish_date || "—"}
                          </span>
                          {p.cta_text && p.cta_url && p.cta_url !== "#" && (
                            <a
                              href={p.cta_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center gap-1 font-bold ${theme.accentText}`}
                            >
                              {p.cta_text}
                              <ExternalLink size={11} />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
