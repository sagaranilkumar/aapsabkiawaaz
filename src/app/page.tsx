"use client";

import { motion, useMotionValue, useTransform, animate, Variants } from "framer-motion";
import {
  ArrowRight,
  Heart,
  Users,
  MapPin,
  Shield,
  Award,
  Calendar,
  Trophy,
  Droplets,
  Phone,
  Mail,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { themeFor } from "@/utils/themeMapper";

/* ── Animation Variants ── */
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

/* ── Animated Counter Component ── */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animate(count, target, { duration: 2, ease: "easeOut" });
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [count, target]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

/* ── Stats Data ── */
const IMPACT_STATS = [
  { number: 400, suffix: "+", label: "Helmets Donated", icon: Shield },
  { number: 1000, suffix: "+", label: "Lives Impacted", icon: Heart },
  { number: 15, suffix: "+", label: "Campaigns Run", icon: Award },
  { number: 5, suffix: "+", label: "Cities Reached", icon: MapPin },
];

/* ── Campaign Cards Data ── */
const CAMPAIGNS = [
  {
    icon: Shield,
    initiative: "road-safety",
    title: "Road Safety & Helmets",
    description:
      "Donated 400 helmets to home guards in Visakhapatnam and Guntur under the leadership of regional police commissioners and directors of prosecutions.",
    date: "May 15, 2026",
    image: "/images/vizag-helmet-drive.jpg",
  },
  {
    icon: Heart,
    initiative: "healthcare",
    title: "Free Medical Camps",
    description:
      "Organized free health camp at AR Grounds, Vijayawada, offering specialized medical consultations and free medication to home guards and families.",
    date: "Nov 30, 2025",
    image: "/images/vijayawada-medical-camp.jpg",
  },
  {
    icon: Droplets,
    initiative: "water",
    title: "Clean Drinking Water",
    description:
      "Donated clean water dispensers to MVP Police Station, Visakhapatnam MRO Office, and multiple local Primary Health Centers to benefit visiting citizens.",
    date: "May 14, 2026",
    image: "/images/drinking-water-donations.jpg",
  },
  {
    icon: Trophy,
    initiative: "sports",
    title: "Empowering Athletes",
    description:
      "Celebrating our sponsored local talents: Bahrain Boccia Silver medal and Malaysia Weightlifting Bronze medal (Sai Shakthi) representing India.",
    date: "May 15, 2026",
    image: "/images/sports-achievements.jpg",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* ═══════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-br from-ngo-cream via-ngo-background to-ngo-stone">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #D4A853 1px, transparent 0)`,
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        {/* Decorative floating circles */}
        <div className="absolute top-32 right-16 w-72 h-72 bg-ngo-secondary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-32 left-16 w-96 h-96 bg-ngo-secondary/3 rounded-full blur-3xl" style={{ animationDelay: "2s" }} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Badge */}
            <motion.div
              variants={fadeIn}
              className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full bg-ngo-secondary-subtle text-ngo-secondary border border-ngo-secondary/20 font-medium text-sm shadow-sm"
            >
              <Award size={16} />
              Community Empowerment Since 2022
            </motion.div>

            {/* Main heading */}
            <motion.h1
              variants={fadeIn}
              className="text-5xl md:text-7xl lg:text-8xl font-serif font-extrabold text-ngo-primary mb-8 leading-[1.05] tracking-tight"
            >
              Access for All through{" "}
              <span className="text-ngo-secondary relative inline-block">
                Government Schemes
                <svg
                  className="absolute w-full h-3 -bottom-2 left-0 text-ngo-secondary/30"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 25 0 50 5 Q 75 10 100 5"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                  />
                </svg>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeIn}
              className="text-lg md:text-xl text-ngo-muted mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Fostering community engagement and raising rights awareness to
              empower citizens towards a stronger, more prosperous India.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/media-coverage"
                className="btn-gold px-10 py-4 rounded-full text-lg flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-ngo-secondary/30"
              >
                Our Impact <ArrowRight size={20} />
              </Link>
              <Link
                href="/core-team"
                className="bg-ngo-primary hover:bg-ngo-primary-light text-white px-10 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-ngo-primary/30 shadow-lg"
              >
                Meet Our Team <ChevronRight size={20} />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            className="relative block w-full h-[60px] md:h-[100px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.06,155.15,123.63,222.18,109.11Z"
              className="fill-white"
            />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          IMPACT STATS BAR
          ═══════════════════════════════════════════════════════ */}
      <section className="bg-white relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="bg-ngo-primary rounded-3xl p-8 md:p-12 -mt-8 shadow-2xl relative overflow-hidden"
          >
            {/* Gold accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ngo-secondary via-ngo-secondary-light to-ngo-secondary" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {IMPACT_STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={scaleIn}
                  className="text-center relative"
                >
                  {i > 0 && (
                    <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-white/10" />
                  )}
                  <stat.icon className="mx-auto mb-3 text-ngo-secondary" size={28} />
                  <div className="text-3xl md:text-4xl font-serif font-bold text-white mb-1">
                    <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-white/60 font-medium tracking-wide uppercase">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ABOUT US / OUR MISSION
          ═══════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-36 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
            {/* Image side */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInLeft}
              className="w-full lg:w-1/2"
            >
              <div className="relative">
                {/* Background decorative element */}
                <div className="absolute -top-4 -left-4 w-full h-full bg-ngo-secondary/10 rounded-3xl" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[450px] md:h-[520px] border border-ngo-border">
                  <img
                    src="/images/vizag-helmet-drive.jpg"
                    alt="ASKA community campaign — helmet distribution in Visakhapatnam"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ngo-primary/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-white text-2xl md:text-3xl font-serif font-bold">
                      Our Mission
                    </h3>
                    <p className="text-white/75 text-sm mt-2">Making a difference, one community at a time</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Text side */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInRight}
              className="w-full lg:w-1/2"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ngo-secondary-subtle text-ngo-secondary font-semibold text-sm mb-6 border border-ngo-secondary/15">
                <Heart size={16} /> About Us
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-ngo-primary mb-6 leading-tight">
                Empowering Citizens for a Prosperous Future
              </h2>
              <p className="text-ngo-muted text-lg mb-5 leading-relaxed">
                Our mission is to empower citizens by promoting awareness and
                understanding of their rights and responsibilities as members of
                our nation.
              </p>
              <p className="text-ngo-muted text-lg mb-10 leading-relaxed">
                We strive to create a more engaged and proactive citizenry,
                working towards a stronger and more prosperous future for all.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-ngo-cream/60 border border-ngo-border-light">
                  <div className="bg-ngo-secondary-subtle p-3 rounded-xl text-ngo-secondary shrink-0">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-ngo-primary mb-1">
                      Rights Awareness
                    </h4>
                    <p className="text-sm text-ngo-muted">
                      Understanding fundamental rights and responsibilities.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-ngo-cream/60 border border-ngo-border-light">
                  <div className="bg-ngo-secondary-subtle p-3 rounded-xl text-ngo-secondary shrink-0">
                    <Users size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-ngo-primary mb-1">
                      Proactive Citizenry
                    </h4>
                    <p className="text-sm text-ngo-muted">
                      Fostering active engagement in community development.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          PRO-BONO TEAM & LEGACY
          ═══════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-36 bg-ngo-stone">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Pro-Bono Team Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInLeft}
              className="bg-ngo-card p-8 md:p-12 rounded-3xl shadow-xl border border-ngo-border-light gold-glow relative overflow-hidden"
            >
              {/* Gold left accent */}
              <div className="absolute left-0 top-8 bottom-8 w-1 bg-gradient-to-b from-ngo-secondary via-ngo-secondary-light to-ngo-secondary rounded-r-full" />

              <div className="pl-4">
                <div className="w-16 h-16 bg-ngo-secondary-subtle text-ngo-secondary rounded-2xl flex items-center justify-center mb-8">
                  <Users size={32} />
                </div>
                <h2 className="text-3xl font-serif font-bold text-ngo-primary mb-6">
                  Our Pro-Bono Team
                </h2>
                <p className="text-ngo-muted leading-relaxed mb-6">
                  Our Pro-Bono Team is a group of dedicated and skilled
                  individuals who have chosen to volunteer their time and
                  expertise to support our organization. These team members come
                  from various backgrounds and professions, but they all share a
                  common goal of making a positive impact in the community.
                </p>
                <p className="text-ngo-muted leading-relaxed mb-8">
                  They bring a diverse range of skills and experience to the
                  table, and are an invaluable asset to our organization. They
                  work tirelessly behind the scenes to support our programs and
                  initiatives, and help to make our mission a reality.
                </p>
                <Link
                  href="/core-team"
                  className="inline-flex items-center font-bold text-ngo-secondary hover:text-ngo-secondary-light transition-colors group"
                >
                  Meet our core team{" "}
                  <ArrowRight
                    size={18}
                    className="ml-2 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </motion.div>

            {/* Legacy Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInRight}
              className="bg-gradient-to-br from-ngo-primary to-ngo-charcoal text-white p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden"
            >
              {/* Gold accent line top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ngo-secondary via-ngo-secondary-light to-ngo-secondary" />

              {/* Background watermark */}
              <div className="absolute top-0 right-0 p-8 opacity-[0.05]">
                <Award size={160} />
              </div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/10 text-ngo-secondary rounded-2xl flex items-center justify-center mb-8">
                  <Award size={32} />
                </div>
                <h2 className="text-3xl font-serif font-bold mb-6">
                  Our Legacy
                </h2>

                {/* Gold quote marks */}
                <div className="text-ngo-secondary/40 text-6xl font-serif leading-none mb-2">&ldquo;</div>

                <p className="leading-relaxed mb-6 opacity-90 text-lg italic pl-2 border-l-2 border-ngo-secondary/30">
                  As Shiv Vadlamudi, President of Aap Sab ki Awaaz (aka ASKA), I
                  was raised under the guiding light of a father who dedicated 28
                  years to serving in the Indian Army, instilling in me an
                  unwavering commitment to our country&apos;s service.
                </p>
                <p className="leading-relaxed mb-6 opacity-90">
                  After 22 years in America, I returned to India, equipped with a
                  wealth of knowledge and experiences to impart to future
                  generations. During a recent journey, I had the privilege of
                  meeting Kiran Kumar Bavisetti, whose tireless efforts to uplift
                  our community ignited a shared mission within us.
                </p>
                <p className="leading-relaxed opacity-90 font-semibold text-ngo-secondary">
                  United in purpose, on December 18th, 2022, we established an
                  NGO with a singular aim: to rejuvenate and invigorate India.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          RECENT CAMPAIGNS
          ═══════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-36 bg-ngo-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ngo-secondary-subtle text-ngo-secondary font-semibold text-sm mb-4 border border-ngo-secondary/15">
              <Award size={16} /> Our Footprint
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-ngo-primary mb-6">
              Recent Campaigns & Impact
            </h2>
            <p className="text-lg text-ngo-muted">
              Transforming communities, advocating safety, and empowering lives
              across Andhra Pradesh.
            </p>
          </motion.div>

          {/* Campaign cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {CAMPAIGNS.map((campaign) => (
              <motion.div
                key={campaign.title}
                variants={fadeIn}
                className="bg-ngo-card rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-ngo-border-light gold-glow group"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ngo-primary/40 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className={`bg-white/90 backdrop-blur-sm p-2.5 rounded-xl shadow-sm ${themeFor(campaign.initiative).accentText}`}>
                      <campaign.icon size={22} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-7">
                  <h3 className="text-xl font-bold text-ngo-primary mb-3 group-hover:text-ngo-secondary transition-colors">
                    {campaign.title}
                  </h3>
                  <p className="text-ngo-muted text-sm leading-relaxed mb-5">
                    {campaign.description}
                  </p>
                  <div className="flex items-center text-xs font-semibold text-ngo-muted-light">
                    <Calendar size={14} className="mr-1.5 text-ngo-secondary" />
                    {campaign.date}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mt-14"
          >
            <Link
              href="/media-coverage"
              className="btn-gold inline-flex items-center px-10 py-4 rounded-full text-lg focus:outline-none focus:ring-4 focus:ring-ngo-secondary/30"
            >
              View All Press & Media Coverage{" "}
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CONTACT SECTION
          ═══════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-36 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-5xl mx-auto bg-ngo-card rounded-3xl overflow-hidden shadow-2xl border border-ngo-border-light flex flex-col md:flex-row"
          >
            {/* Left: Contact info */}
            <div className="md:w-1/2 p-10 md:p-14 flex flex-col justify-center bg-ngo-cream/40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-ngo-primary mb-6">
                Contact Us
              </h2>
              <p className="text-ngo-muted mb-8 leading-relaxed">
                Better yet, see us in person! We love our community and are committed
                to engagement, so feel free to visit during normal business hours to
                learn more about government schemes and your rights awareness.
              </p>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="bg-ngo-secondary-subtle p-3 rounded-full text-ngo-secondary shrink-0 mt-0.5">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-ngo-primary text-sm">Address</h4>
                    <p className="text-ngo-muted text-sm mt-1">
                      53-20-16/11/1, P AND T Colony, Chaitanya Nagar,
                      Maddilapalem, Seethamadhara, Visakhapatnam, AP - 530 013
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-ngo-secondary-subtle p-3 rounded-full text-ngo-secondary shrink-0 mt-0.5">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-ngo-primary text-sm">Phone</h4>
                    <a href="tel:+919642414141" className="text-ngo-muted text-sm mt-1 hover:text-ngo-secondary transition-colors group/phone">
                      <span className="group-hover/phone:hidden">xxx-xxx-xxxxx</span>
                      <span className="hidden group-hover/phone:inline">+91 96424 14141</span>
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-ngo-secondary-subtle p-3 rounded-full text-ngo-secondary shrink-0 mt-0.5">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-ngo-primary text-sm">Email</h4>
                    <a href="mailto:kiran@aapsabkiawaaz.org" className="text-ngo-muted text-sm mt-1 hover:text-ngo-secondary transition-colors group/email">
                      <span className="group-hover/email:hidden">xxxxxx@xxxxxxxxxxx.xxx</span>
                      <span className="hidden group-hover/email:inline">kiran@aapsabkiawaaz.org</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Hours */}
            <div className="md:w-1/2 bg-gradient-to-br from-ngo-primary to-ngo-charcoal text-white p-10 md:p-14 flex flex-col justify-center relative overflow-hidden">
              {/* Gold top accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ngo-secondary via-ngo-secondary-light to-ngo-secondary" />

              {/* Subtle pattern */}
              <div className="absolute inset-0 opacity-[0.03]">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, #D4A853 1px, transparent 0)`,
                    backgroundSize: "32px 32px",
                  }}
                />
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-serif font-bold mb-8 text-ngo-secondary">
                  Business Hours
                </h3>
                <div className="space-y-5">
                  <div className="flex justify-between items-center border-b border-white/10 pb-5">
                    <span className="font-medium">Monday – Friday</span>
                    <span className="text-ngo-secondary font-semibold">
                      09:00 am – 05:00 pm
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-5 opacity-60">
                    <span className="font-medium">Saturday</span>
                    <span>Closed</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 opacity-60">
                    <span className="font-medium">Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
