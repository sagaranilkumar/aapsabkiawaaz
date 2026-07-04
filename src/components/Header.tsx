"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, HeartHandshake } from "lucide-react";
import clsx from "clsx";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Core Team", href: "/core-team" },
  { name: "Media Coverage", href: "/media-coverage" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={clsx(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "glass-warm shadow-md py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-ngo-secondary/50 rounded-lg"
          >
            <HeartHandshake className="text-ngo-secondary h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
            <span className="font-serif font-bold text-2xl tracking-tight text-ngo-primary">
              Aap Sab Ki Awaaz
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex gap-8 items-center"
            aria-label="Main Navigation"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={clsx(
                    "relative text-sm font-semibold transition-colors duration-200 hover:text-ngo-secondary focus:outline-none focus:ring-2 focus:ring-ngo-secondary/50 rounded-md px-2 py-1",
                    isActive ? "text-ngo-secondary" : "text-ngo-muted"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-ngo-secondary rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}

            <Link
              href="/get-involved"
              className="btn-gold rounded-full px-6 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-ngo-secondary/50 focus:ring-offset-2"
            >
              Get Involved
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-md text-ngo-muted hover:text-ngo-secondary focus:outline-none focus:ring-2 focus:ring-ngo-secondary/50 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation — Full Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 top-0 z-40 bg-ngo-cream"
            aria-label="Mobile Navigation"
          >
            {/* Close bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-5">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-ngo-secondary/50 rounded-lg"
              >
                <HeartHandshake className="text-ngo-secondary h-8 w-8" />
                <span className="font-serif font-bold text-2xl tracking-tight text-ngo-primary">
                  Aap Sab Ki Awaaz
                </span>
              </Link>
              <button
                className="p-2 rounded-md text-ngo-muted hover:text-ngo-secondary focus:outline-none focus:ring-2 focus:ring-ngo-secondary/50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close mobile menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Divider */}
            <div className="h-px bg-ngo-border mx-4 sm:mx-6" />

            {/* Links */}
            <ul className="flex flex-col py-8 px-4 sm:px-6 space-y-2">
              {NAV_LINKS.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.07, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={clsx(
                        "block px-4 py-3.5 rounded-xl text-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ngo-secondary/50",
                        isActive
                          ? "bg-ngo-secondary/10 text-ngo-secondary font-semibold"
                          : "text-ngo-muted hover:bg-ngo-stone hover:text-ngo-primary"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                );
              })}
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.1 + NAV_LINKS.length * 0.07,
                  duration: 0.3,
                }}
              >
                <Link
                  href="/get-involved"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block mt-4 text-center btn-gold rounded-full px-6 py-3.5 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-ngo-secondary/50 focus:ring-offset-2"
                >
                  Get Involved
                </Link>
              </motion.li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
