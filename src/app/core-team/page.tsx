import { Metadata } from "next";
import { Mail } from "lucide-react";

// Inline custom SVGs since the brand icons were removed from standard lucide-react in newer versions
const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-linkedin"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-twitter"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export const metadata: Metadata = {
  title: "Core Team | Aap Sab Ki Awaaz",
  description: "Meet the dedicated individuals driving change at Aap Sab Ki Awaaz.",
};

// Warm gradient palettes for avatar placeholders
const AVATAR_GRADIENTS = [
  "linear-gradient(135deg, #D4A853 0%, #C4922E 50%, #B8860B 100%)",       // gold → deep gold
  "linear-gradient(135deg, #2D2A26 0%, #3D3832 50%, #5A5347 100%)",       // charcoal → warm gray
  "linear-gradient(135deg, #B8860B 0%, #D4A853 50%, #E8B931 100%)",       // amber → gold
  "linear-gradient(135deg, #5A5347 0%, #3D3832 50%, #2D2A26 100%)",       // warm gray → charcoal
  "linear-gradient(135deg, #D4A853 0%, #E8B931 50%, #D4A853 100%)",       // gold shimmer
];

const TEAM_MEMBERS = [
  {
    name: "Lt Gen K S Rao",
    initials: "KR",
    role: "PVSM, SC, SM, Arjuna Awardee",
    bio: "Former DG Border Roads Organisation (DGBR)",
  },
  {
    name: "Rear Admiral Sreenivas Ratnam",
    initials: "SR",
    role: "Vsm (Retd)",
    bio: "Retired from the Indian Navy in September 2022 after a distinguished innings of over 35 years. Notable appointments include Addl Director General Acquisition Tech.",
  },
  {
    name: "Shri. M. V. Krishna Rao",
    initials: "KR",
    role: "IPS",
    bio: "A highly respected police officer joined the Indian Police Service in 1974. Held positions including Commissioner of Police in Hyderabad and Director of the AP Police Academy.",
  },
  {
    name: "Dr. Sankayyala Uday Shankar",
    initials: "US",
    role: "Internal Medicine Specialist, MBBS, MD",
    bio: "Central member of a team with significant responsibilities and contributions at Ahalya Nursing Home - Guntur, AP.",
  },
  {
    name: "Shri. Thota Venkata Rao",
    initials: "VR",
    role: "DIG of Police & Joint Director",
    bio: "AP Police Academy (now TSPA), Hyderabad, India.",
  },
  {
    name: "Shri. Peddiraju Chennu",
    initials: "PC",
    role: "Chief Editor",
    bio: "Executive Editor (News Head) at Tulasi Television, also served 2+ decades at Ushodaya Enterprises.",
  },
  {
    name: "Dr. G Mahesh",
    initials: "GM",
    role: "Consultant Cardiologist",
    bio: "Consultant Cardiologist at Queen's NRI hospital, Visakhapatnam, Andhra Pradesh, working since 2017.",
  },
  {
    name: "Dr. B Vara Prasad",
    initials: "VP",
    role: "Managing Director, Consultant Pathologist",
    bio: "Head of Department & Consultant Pathologist, Department of Pathology, CARE hospitals, Visakhapatnam.",
  },
  {
    name: "Dr. V Radha Madhavi",
    initials: "RM",
    role: "Pediatrician & Neonatologist",
    bio: "MBBS, MD (Paediatrics). Member Of PEDIATRIC INFECTIOUS DISEASES ACADEMY.",
  },
  {
    name: "Robin Rodriguez",
    initials: "RR",
    role: "Retired Project Manager",
    bio: "Served 40 plus years in the financial services industry. Small business owner specializing in interior design.",
  },
  {
    name: "Capt Vineela Medikonda",
    initials: "VM",
    role: "Captain",
    bio: "Flying as a captain with a leading commercial airline in India for the last 14 years. National champion in equestrian sports.",
  },
];

export default function CoreTeam() {
  return (
    <div className="min-h-screen bg-ngo-background">
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-ngo-stone to-ngo-cream pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-ngo-primary">
              The Head Honchos
            </h1>
            <div className="w-20 h-1 bg-ngo-secondary rounded-full mx-auto mt-4 mb-6" />
            <p className="text-lg text-ngo-muted leading-relaxed">
              A diverse group of passionate individuals united by a single
              mission: empowering communities and amplifying voices.
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {TEAM_MEMBERS.map((member, index) => (
              <div
                key={index}
                className="bg-ngo-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-ngo-border-light gold-glow focus-within:ring-2 focus-within:ring-ngo-secondary/50 flex flex-col"
              >
                {/* Avatar Placeholder with Gradient & Initials */}
                <div
                  className="h-56 w-full flex items-center justify-center relative"
                  style={{
                    background: AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length],
                  }}
                  aria-hidden="true"
                >
                  {/* Subtle pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />
                  <span className="text-4xl font-serif font-bold text-white/90 relative z-10 select-none">
                    {member.initials}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-6 text-center flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-ngo-primary mb-1">
                    {member.name}
                  </h3>
                  <p className="text-ngo-secondary font-medium text-sm mb-4">
                    {member.role}
                  </p>
                  <p className="text-ngo-muted text-sm leading-relaxed flex-grow mb-6">
                    {member.bio}
                  </p>

                  {/* Social Links */}
                  <div className="flex justify-center gap-4 mt-auto">
                    <a
                      href="#"
                      className="text-ngo-muted-light hover:text-ngo-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-ngo-secondary/50 rounded-sm"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail size={18} />
                    </a>
                    <a
                      href="#"
                      className="text-ngo-muted-light hover:text-ngo-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-ngo-secondary/50 rounded-sm"
                      aria-label={`${member.name}'s LinkedIn profile`}
                    >
                      <LinkedinIcon size={18} />
                    </a>
                    <a
                      href="#"
                      className="text-ngo-muted-light hover:text-ngo-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-ngo-secondary/50 rounded-sm"
                      aria-label={`${member.name}'s Twitter profile`}
                    >
                      <TwitterIcon size={18} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
