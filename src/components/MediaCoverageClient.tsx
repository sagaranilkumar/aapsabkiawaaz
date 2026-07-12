"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Grid,
  List,
  Calendar,
  ArrowRight,
  ExternalLink,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { themeFor } from "@/utils/themeMapper";

interface MediaCoverageClientProps {
  initialArticles: Record<string, string>[];
}

export default function MediaCoverageClient({ initialArticles }: MediaCoverageClientProps) {
  const [articles] = useState<Record<string, string>[]>(initialArticles);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Helper to resolve images relative to /images/ folder
  const resolveImgSrc = (imageSrc: string | undefined): string => {
    if (!imageSrc) return "/images/vizag-helmet-drive.jpg"; // Default fallback

    const src = imageSrc.trim();

    // If it's an external url or absolute path from root, leave it as is
    if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/")) {
      return src;
    }

    // Remove starting './' if present
    const cleanSrc = src.startsWith("./") ? src.substring(2) : src;

    // Build absolute path pointing to public/images/ folder
    return `/images/${cleanSrc}`;
  };

  // Instant filtering based on title and description/excerpt
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const title = (article.title || "").toLowerCase();
      const desc = (article.description || article.excerpt || "").toLowerCase();
      const query = searchQuery.toLowerCase();
      return title.includes(query) || desc.includes(query);
    });
  }, [articles, searchQuery]);

  return (
    <div className="min-h-screen bg-ngo-background">
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-ngo-stone to-ngo-cream pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-ngo-primary animate-fade-in-up">
            In The Media
          </h1>
          <div className="w-20 h-1 bg-ngo-secondary rounded-full mx-auto mt-4 mb-6" />
          <p className="text-lg text-ngo-muted max-w-2xl mx-auto leading-relaxed">
            Discover how our community empowerment, road safety drives, and sports advocacy initiatives are making headlines nationwide.
          </p>
        </div>
      </section>

      {/* Control Panel / Filter & Toggle */}
      <section className="py-6 border-b border-ngo-border-light sticky top-[72px] glass-warm z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:w-96 group">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ngo-muted-light group-focus-within:text-ngo-secondary transition-colors">
                <Search size={18} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search headlines or descriptions..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-ngo-border bg-white text-ngo-primary placeholder-ngo-muted-light focus:outline-none focus:ring-2 focus:ring-ngo-secondary/30 focus:border-ngo-secondary transition-all text-sm shadow-sm"
              />
            </div>

            {/* View Mode Toggle Switches */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <div className="bg-ngo-stone p-1 rounded-full flex gap-1 shadow-inner border border-ngo-border-light">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-full transition-all cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-white text-ngo-secondary shadow-sm"
                      : "text-ngo-muted-light hover:text-ngo-muted"
                  }`}
                  aria-label="Grid view"
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-full transition-all cursor-pointer ${
                    viewMode === "list"
                      ? "bg-white text-ngo-secondary shadow-sm"
                      : "text-ngo-muted-light hover:text-ngo-muted"
                  }`}
                  aria-label="List view"
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Grid / List Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-20 bg-white border border-ngo-border-light rounded-2xl shadow-sm">
              <AlertCircle size={40} className="mx-auto text-ngo-secondary mb-4" />
              <h3 className="text-xl font-serif font-bold text-ngo-primary mb-2">No Articles Found</h3>
              <p className="text-ngo-muted max-w-md mx-auto text-sm">
                We couldn&apos;t find any articles matching &quot;{searchQuery}&quot;. Try adjusting your search query.
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-4 px-4 py-2 rounded-full border border-ngo-border hover:border-ngo-secondary hover:text-ngo-secondary text-xs transition-colors font-semibold font-sans cursor-pointer"
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <motion.div
              layout
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "space-y-8"
              }
            >
              <AnimatePresence mode="popLayout">
                {filteredArticles.map((article, index) => {
                  const title = article.title || "Untitled Article";
                  const description = article.description || article.excerpt || "";
                  const source = article.source || "Press Release";
                  const date = article.date || "Recent";
                  const url = article.url || "#";
                  const imageUrl = resolveImgSrc(article.image_src || article.image);
                  const theme = themeFor(article.category);
                  const ThemeIcon = theme.icon;

                  return (
                    <motion.div
                      layout
                      key={index}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      {viewMode === "grid" ? (
                        // Card Grid View Item
                        <article className="bg-ngo-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-ngo-border-light gold-glow flex flex-col h-full group relative focus-within:ring-2 focus-within:ring-ngo-secondary/50">
                          {/* Image Box */}
                          <div className="h-52 w-full relative overflow-hidden shrink-0 border-b border-ngo-border-light bg-ngo-stone/30">
                            <img
                              src={imageUrl}
                              alt={`Photo for ${title}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                            {/* Themed category badge */}
                            <span className={`absolute top-3 left-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ring-1 ring-inset backdrop-blur-sm ${theme.badge}`}>
                              <ThemeIcon size={11} />
                              {theme.label}
                            </span>
                            {/* Accent Line */}
                            <div className={`absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity ${theme.accentBg}`} />
                          </div>

                          {/* Content Box */}
                          <div className="p-6 flex-grow flex flex-col">
                            {/* Badges / Meta */}
                            <div className="flex items-center justify-between text-[11px] text-ngo-muted-light font-semibold mb-3">
                              <span className="text-ngo-secondary uppercase tracking-wider">
                                {source}
                              </span>
                              <div className="flex items-center gap-1 font-normal">
                                <Calendar size={12} />
                                <span>{date}</span>
                              </div>
                            </div>

                            {/* Title */}
                            <h2 className="text-base font-bold text-ngo-primary group-hover:text-ngo-secondary transition-colors mb-2 leading-snug line-clamp-2">
                              <a href={url} className="focus:outline-none" target={url.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                                <span className="absolute inset-0" aria-hidden="true" />
                                {title}
                              </a>
                            </h2>

                            {/* Description */}
                            <p className="text-ngo-muted text-xs leading-relaxed mb-5 line-clamp-3">
                              {description}
                            </p>

                            {/* Action Row */}
                            <div className="flex items-center justify-between text-ngo-secondary font-bold text-xs mt-auto pt-2 border-t border-ngo-stone">
                              <span className="flex items-center gap-1">
                                Read Full Coverage
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                              </span>
                              {url.startsWith("http") && <ExternalLink size={12} className="text-ngo-muted-light" />}
                            </div>
                          </div>
                        </article>
                      ) : (
                        // Editorial List View Item
                        <article className="bg-ngo-card p-6 md:p-8 rounded-2xl border border-ngo-border-light shadow-sm hover:shadow-xl transition-all duration-300 gold-glow group relative flex flex-col md:flex-row gap-6 items-start before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-ngo-secondary before:rounded-l-2xl before:opacity-0 group-hover:before:opacity-100 before:transition-opacity focus-within:ring-2 focus-within:ring-ngo-secondary/50">
                          {/* Image Box */}
                          <div className="w-full md:w-64 h-44 rounded-xl overflow-hidden shrink-0 border border-ngo-border shadow-md relative bg-ngo-stone/30">
                            <img
                              src={imageUrl}
                              alt={`Photo for ${title}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          </div>

                          {/* Content Column */}
                          <div className="flex-grow flex flex-col h-full w-full">
                            <div className="flex-grow">
                              <div className="flex items-center gap-2 mb-2">
                                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ring-1 ring-inset ${theme.badge}`}>
                                  <ThemeIcon size={11} />
                                  {theme.label}
                                </span>
                                <span className="inline-block text-ngo-secondary uppercase tracking-wider font-bold text-xs">
                                  {source}
                                </span>
                              </div>

                              <h2 className="text-lg md:text-xl font-bold text-ngo-primary group-hover:text-ngo-secondary transition-colors mb-3 leading-snug">
                                <a href={url} className="focus:outline-none" target={url.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                                  <span className="absolute inset-0" aria-hidden="true" />
                                  {title}
                                </a>
                              </h2>

                              <p className="text-ngo-muted text-sm leading-relaxed mb-4">
                                {description}
                              </p>
                            </div>

                            {/* Footer Information */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto pt-4 border-t border-ngo-border-light">
                              <div className="flex items-center text-ngo-muted-light text-xs font-semibold">
                                <Calendar size={14} className="mr-1.5 text-ngo-secondary" />
                                <span>Published: </span>
                                <time className="ml-1 font-normal" dateTime={date}>{date}</time>
                              </div>

                              <div className="flex items-center text-ngo-secondary font-bold text-xs gap-1">
                                Read Full Coverage
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                {url.startsWith("http") && <ExternalLink size={12} className="text-ngo-muted-light ml-1" />}
                              </div>
                            </div>
                          </div>
                        </article>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Press Contact CTA */}
          <div className="mt-16 bg-ngo-secondary-subtle border border-ngo-secondary/20 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-serif font-bold text-ngo-primary mb-2">Press Inquiries</h3>
              <p className="text-ngo-muted text-sm leading-relaxed">For media requests, interviews, or additional resources, please contact our PR team.</p>
            </div>
            <a
              href="mailto:press@aapsabkiawaaz.org"
              className="shrink-0 btn-gold rounded-full px-6 py-3 font-bold flex items-center gap-2 focus:outline-none focus:ring-4 focus:ring-ngo-secondary/50 group/press text-sm font-sans cursor-pointer"
            >
              <span className="group-hover/press:hidden">Contact PR Team</span>
              <span className="hidden group-hover/press:inline">press@aapsabkiawaaz.org</span>
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
