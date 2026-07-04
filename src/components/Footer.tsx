import Link from "next/link";
import { HeartHandshake, MapPin, Clock } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-ngo-dark to-ngo-charcoal text-slate-300">
      {/* Gold accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-ngo-secondary to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Mission tagline */}
        <p className="text-ngo-muted-light italic font-serif text-lg text-center mb-12 max-w-2xl mx-auto">
          Empowering citizens to build a stronger, more prosperous India
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-ngo-secondary/50 rounded-lg w-fit"
            >
              <HeartHandshake className="text-ngo-secondary h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
              <span className="font-serif font-bold text-2xl tracking-tight text-white">
                Aap Sab Ki Awaaz
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm text-slate-400">
              Empowering communities through rights awareness and government
              schemes for a prosperous future.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <a
                href="#"
                className="text-slate-400 hover:text-ngo-secondary hover:bg-white/10 rounded-full p-2 transition-all duration-200 font-medium text-sm"
                aria-label="Facebook"
              >
                FB
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-ngo-secondary hover:bg-white/10 rounded-full p-2 transition-all duration-200 font-medium text-sm"
                aria-label="Twitter"
              >
                TW
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-ngo-secondary hover:bg-white/10 rounded-full p-2 transition-all duration-200 font-medium text-sm"
                aria-label="Instagram"
              >
                IG
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-slate-400 hover:text-ngo-secondary transition-colors duration-200 focus:outline-none focus:underline hover:underline underline-offset-4"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/core-team"
                  className="text-slate-400 hover:text-ngo-secondary transition-colors duration-200 focus:outline-none focus:underline hover:underline underline-offset-4"
                >
                  Core Team
                </Link>
              </li>
              <li>
                <Link
                  href="/media-coverage"
                  className="text-slate-400 hover:text-ngo-secondary transition-colors duration-200 focus:outline-none focus:underline hover:underline underline-offset-4"
                >
                  Media Coverage
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-ngo-secondary transition-colors duration-200 focus:outline-none focus:underline hover:underline underline-offset-4"
                >
                  Government Schemes
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-ngo-secondary transition-colors duration-200 focus:outline-none focus:underline hover:underline underline-offset-4"
                >
                  Know Your Rights
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-ngo-secondary transition-colors duration-200 focus:outline-none focus:underline hover:underline underline-offset-4"
                >
                  Volunteer Guidelines
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin
                  className="text-ngo-secondary shrink-0 mt-0.5"
                  size={18}
                />
                <span className="text-sm leading-relaxed text-slate-400">
                  53-20-16/11/1, P AND T Colony, Chaitanya Nagar, Maddilapalem,
                  Seethamadhara, Visakhapatnam, AP - 530 013
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock
                  className="text-ngo-secondary shrink-0 mt-0.5"
                  size={18}
                />
                <div className="text-sm">
                  <span className="font-semibold block text-slate-200">
                    Business Hours:
                  </span>
                  <span className="text-slate-400">
                    Mon - Fri: 09:00 AM – 05:00 PM
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-ngo-secondary/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">
            &copy; {currentYear} Aap Sab Ki Awaaz. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link
              href="#"
              className="text-slate-400 hover:text-ngo-secondary transition-colors duration-200 focus:outline-none focus:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-slate-400 hover:text-ngo-secondary transition-colors duration-200 focus:outline-none focus:underline"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
