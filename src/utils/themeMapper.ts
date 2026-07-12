import { Shield, Heart, Trophy, Landmark, Droplets, Megaphone, LucideIcon } from "lucide-react";

/**
 * Mission-mapped visual identity. Every initiative gets a distinct accent so a
 * citizen scanning the feed can read the cause at a glance. Color is NEVER the
 * sole signal — each theme also carries an icon + label (accessibility).
 *
 * Tailwind v4 generates `text-<name>` / `bg-<name>` utilities from the
 * `--color-<name>` tokens declared in globals.css. Class strings here are
 * written as complete literals so the Tailwind content scanner detects them.
 */
export type Initiative =
  | "road-safety"
  | "healthcare"
  | "sports"
  | "civic"
  | "water"
  | "general";

export interface Theme {
  key: Initiative;
  label: string;
  icon: LucideIcon;
  /** pill: text + bg + ring color (pair with `ring-1 ring-inset`) */
  badge: string;
  accentText: string;
  accentBg: string;
}

export const THEMES: Record<Initiative, Theme> = {
  "road-safety": { key: "road-safety", label: "Road Safety", icon: Shield, badge: "text-road bg-road-soft ring-road/20", accentText: "text-road", accentBg: "bg-road" },
  healthcare: { key: "healthcare", label: "Healthcare", icon: Heart, badge: "text-health bg-health-soft ring-health/25", accentText: "text-health", accentBg: "bg-health" },
  sports: { key: "sports", label: "Sports", icon: Trophy, badge: "text-sports bg-sports-soft ring-sports/25", accentText: "text-sports", accentBg: "bg-sports" },
  civic: { key: "civic", label: "Civic Rights", icon: Landmark, badge: "text-civic bg-civic-soft ring-civic/25", accentText: "text-civic", accentBg: "bg-civic" },
  water: { key: "water", label: "Water & Env", icon: Droplets, badge: "text-water bg-water-soft ring-water/25", accentText: "text-water", accentBg: "bg-water" },
  general: { key: "general", label: "ASKA", icon: Megaphone, badge: "text-ngo-secondary bg-ngo-secondary-subtle ring-ngo-secondary/25", accentText: "text-ngo-secondary", accentBg: "bg-ngo-secondary" },
};

/** Normalize a raw CSV value (e.g. "Road Safety", "road_safety") to a theme. */
export function themeFor(key?: string): Theme {
  if (!key) return THEMES.general;
  const k = key.trim().toLowerCase().replace(/[\s_]+/g, "-") as Initiative;
  return THEMES[k] ?? THEMES.general;
}

export const INITIATIVE_OPTIONS: Initiative[] = [
  "road-safety",
  "healthcare",
  "sports",
  "civic",
  "water",
  "general",
];
