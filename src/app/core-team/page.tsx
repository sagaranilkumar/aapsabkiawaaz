import { Metadata } from "next";
import CoreTeamClient, { Member } from "@/components/CoreTeamClient";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, SITE_URL } from "@/utils/seo";

export const metadata: Metadata = {
  title: "Core Team",
  description:
    "Meet the leadership and advisory board of Aap Sab Ki Awaaz — decorated defence officers, jurists, physicians, and civic leaders driving community change.",
  alternates: { canonical: "/core-team" },
  openGraph: {
    title: "The Head Honchos — ASKA Leadership & Advisory Board",
    description:
      "Decorated defence officers, a former High Court Chief Justice, senior physicians and civic leaders — the people behind Aap Sab Ki Awaaz.",
    url: "/core-team",
    siteName: "Aap Sab Ki Awaaz",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/og-core-team.jpg", width: 1200, height: 630, alt: "The Aap Sab Ki Awaaz leadership and advisory board" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Head Honchos — ASKA Leadership & Advisory Board",
    description: "The decorated officers, jurists and physicians behind Aap Sab Ki Awaaz.",
    images: ["/og-core-team.jpg"],
  },
};

const TEAM_MEMBERS: Member[] = [
  {
    name: "Lt Gen K S Rao",
    credentials: "PVSM, SC, SM · Arjuna Awardee",
    role: "Former DG, Border Roads Organisation",
    bio: "Former Director General of the Border Roads Organisation (DGBR). A decorated Army veteran honoured with the PVSM, SC and SM, and an Arjuna Awardee for sporting distinction.",
    photo: "/images/team/ks-rao.jpg",
    initials: "KR",
  },
  {
    name: "Rear Admiral Sreenivas Ratnam",
    credentials: "VSM (Retd)",
    role: "Former Addl DG Acquisition Tech, MoD",
    bio: "Retired from the Indian Navy in September 2022 after a distinguished innings of over 35 years. His notable appointments include Additional Director General Acquisition Tech (Maritime & Systems) in the Ministry of Defence, General Manager (Refits) of Naval Dockyard Visakhapatnam, and Commodore Superintendent of Naval Ship Repair Yard, Port Blair.",
    photo: "/images/team/sreenivas-ratnam.jpg",
    initials: "SR",
  },
  {
    name: "Shri. Bhavani Parsad",
    role: "Former Chief Justice, High Court of AP",
    bio: "Former Chief Justice of the High Court of the combined state of Andhra Pradesh. Grandson of Grandhi Venkata Reddy Naidu — Former Minister for Law, Courts, Prisons and Endowments in the first cabinet of Andhra Pradesh — and son of Grandhi Kesava Rama Murthy, a leading advocate for 54 years at Narasapur, West Godavari. Born 09-04-1951; educated at Narasapur, Andhra Loyola College (Vijayawada) and Andhra University, Waltair.",
    photo: "/images/team/bhavani-parsad.jpg",
    initials: "BP",
    link: { label: "Profile", url: "https://tshc.gov.in/retjudges/gbpj.html" },
  },
  {
    name: "Shri. M. V. Krishna Rao",
    credentials: "IPS",
    role: "Former Commissioner of Police, Hyderabad",
    bio: "A highly respected police officer who joined the Indian Police Service in 1974 and held various notable positions, including Commissioner of Police in Hyderabad and Director of the AP Police Academy.",
    photo: "/images/team/mv-krishna-rao.jpg",
    initials: "KR",
  },
  {
    name: "Dr. Sankayyala Uday Shankar",
    credentials: "MBBS, MD",
    role: "Internal Medicine Specialist",
    bio: "A central member of the medical team with significant responsibilities and contributions at Ahalya Nursing Home, Guntur, Andhra Pradesh.",
    photo: "/images/team/uday-shankar.jpg",
    initials: "US",
  },
  {
    name: "Shri. Thota Venkata Rao",
    role: "DIG of Police & Joint Director (Retd)",
    bio: "Former Deputy Inspector General of Police and Joint Director at the AP Police Academy (now TSPA), Hyderabad, India.",
    photo: "/images/team/thota-venkata-rao.jpg",
    initials: "TV",
    link: { label: "Watch", url: "https://www.youtube.com/watch?v=Ht6893AIcR4" },
  },
  {
    name: "Shri. Peddiraju Chennu",
    role: "Chief Editor",
    bio: "Executive Editor (News Head) at Tulasi Television. Previously served over two decades at Ushodaya Enterprises (Eenadu Television), where his last role was Chief Editor.",
    photo: "/images/team/peddiraju-chennu.jpg",
    initials: "PC",
  },
  {
    name: "Dr. G Mahesh",
    role: "Consultant Cardiologist",
    bio: "Consultant Cardiologist at Queen's NRI Hospital, Visakhapatnam, Andhra Pradesh, where he has been practising since 2017.",
    photo: "/images/team/g-mahesh.jpg",
    initials: "GM",
  },
  {
    name: "Dr. B Vara Prasad",
    role: "MD & Consultant Pathologist, PMC",
    bio: "Managing Director and Consultant Pathologist at Prasad Medical Center (PMC), Collector Office Junction. Formerly Head of Department & Consultant Pathologist, Department of Pathology, CARE Hospitals, Visakhapatnam (2017–2018); Aga Khan Hospital, Kisumu, Kenya (2009–2017); and Nizam's Institute of Medical Sciences, Hyderabad (2003–2005). MBBS from Andhra Medical College, Visakhapatnam (1993–2000).",
    photo: "/images/team/b-vara-prasad.jpg",
    initials: "VP",
  },
  {
    name: "Dr. V Radha Madhavi",
    credentials: "MBBS, MD (Paediatrics)",
    role: "Pediatrician & Neonatologist",
    bio: "Member of the Pediatric Infectious Diseases Academy (erstwhile IAP Infectious Diseases Chapter, reconstituted as the Pediatric Infectious Diseases Academy from 2022 — iapidc.org).",
    photo: "/images/team/v-radha-madhavi.png",
    initials: "RM",
  },
  {
    name: "Robin Rodriguez",
    role: "Retired Project Manager",
    bio: "Retired Project Manager with over 40 years in the financial services industry, and a small business owner specialising in interior and exterior retail products, outdoor landscape and interior design services. Personal interests include hiking, reading, gardening, and volunteer work for organisations serving the underprivileged.",
    photo: "/images/team/robin-rodriguez.png",
    initials: "RR",
  },
  {
    name: "Capt Vineela Medikonda",
    role: "Commercial Airline Captain",
    bio: "A captain with a leading Indian commercial airline for the last 14 years and an engineering graduate from Hyderabad. A national champion in equestrian sports (2005) with the National Cadet Corps, an avid adventurer and traveller, and a vocal advocate for women's empowerment and gender equality.",
    photo: "/images/team/capt-vineela-medikonda.png",
    initials: "VM",
  },
];

const PEOPLE_SCHEMA = TEAM_MEMBERS.map((m) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: m.name,
  jobTitle: m.role,
  ...(m.photo ? { image: `${SITE_URL}${m.photo}` } : {}),
  worksFor: { "@type": "NGO", name: SITE_NAME },
}));

export default function CoreTeam() {
  return (
    <>
      <JsonLd data={PEOPLE_SCHEMA} />
      <CoreTeamClient members={TEAM_MEMBERS} />
    </>
  );
}
