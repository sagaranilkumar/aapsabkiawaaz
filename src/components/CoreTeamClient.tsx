"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { ExternalLink, ChevronDown } from "lucide-react";

export interface Member {
  name: string;
  credentials?: string;
  role: string;
  bio: string;
  photo: string | null;
  initials: string;
  link?: { label: string; url: string };
}

const AVATAR_GRADIENTS = [
  "linear-gradient(135deg, #D4A853 0%, #C4922E 50%, #B8860B 100%)",
  "linear-gradient(135deg, #2D2A26 0%, #3D3832 50%, #5A5347 100%)",
  "linear-gradient(135deg, #B8860B 0%, #D4A853 50%, #E8B931 100%)",
  "linear-gradient(135deg, #5A5347 0%, #3D3832 50%, #2D2A26 100%)",
];

const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const BIO_CLAMP = 180;

function MemberCard({ member, index }: { member: Member; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = member.bio.length > BIO_CLAMP;
  const shown = expanded || !isLong ? member.bio : member.bio.slice(0, BIO_CLAMP).trimEnd() + "…";

  return (
    <motion.article
      variants={item}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-ngo-border-light bg-ngo-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl gold-glow"
    >
      {/* Portrait */}
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        {member.photo ? (
          <img
            src={member.photo}
            alt={`Portrait of ${member.name}`}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{ background: AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length] }}
            aria-hidden="true"
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.25) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
            <span className="relative z-10 select-none font-serif text-5xl font-bold text-white/90">
              {member.initials}
            </span>
          </div>
        )}
        {/* Gradient scrim + name overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ngo-primary/85 via-ngo-primary/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="font-serif text-xl font-bold leading-tight text-white">{member.name}</h3>
          {member.credentials && (
            <p className="mt-1 text-xs font-medium tracking-wide text-ngo-secondary-light">
              {member.credentials}
            </p>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <span className="mb-3 inline-flex w-fit items-center rounded-full bg-ngo-secondary-subtle px-3 py-1 text-xs font-semibold text-ngo-secondary ring-1 ring-inset ring-ngo-secondary/20">
          {member.role}
        </span>

        <p className="flex-1 text-sm leading-relaxed text-ngo-muted">{shown}</p>

        <div className="mt-4 flex items-center justify-between">
          {isLong ? (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="inline-flex items-center gap-1 text-sm font-semibold text-ngo-secondary transition-colors hover:text-ngo-secondary-light focus:outline-none focus-visible:ring-2 focus-visible:ring-ngo-secondary/50 rounded-sm"
              aria-expanded={expanded}
            >
              {expanded ? "Show less" : "Read more"}
              <ChevronDown
                size={15}
                className={`transition-transform ${expanded ? "rotate-180" : ""}`}
              />
            </button>
          ) : (
            <span />
          )}

          {member.link && (
            <a
              href={member.link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-semibold text-ngo-muted-light transition-colors hover:text-ngo-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-ngo-secondary/50 rounded-sm"
            >
              {member.link.label}
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function CoreTeamClient({ members }: { members: Member[] }) {
  return (
    <div className="min-h-screen bg-ngo-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ngo-stone to-ngo-cream pt-28 pb-20">
        <div className="absolute inset-0 opacity-[0.04]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, #D4A853 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-flex items-center rounded-full border border-ngo-secondary/20 bg-ngo-secondary-subtle px-4 py-1.5 text-sm font-semibold text-ngo-secondary">
              Leadership & Advisory Board
            </span>
            <h1 className="font-serif text-4xl font-bold text-ngo-primary md:text-6xl">
              The Head Honchos
            </h1>
            <div className="mx-auto mt-5 mb-6 h-1 w-20 rounded-full bg-ngo-secondary" />
            <p className="text-lg leading-relaxed text-ngo-muted">
              Decorated defence officers, jurists, physicians, and civic leaders — a pro-bono
              board united by one mission: empowering communities and amplifying voices.
            </p>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={container}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {members.map((m, i) => (
              <MemberCard key={m.name} member={m} index={i} />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
