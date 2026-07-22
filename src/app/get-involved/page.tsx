import { Metadata } from "next";
import GetInvolvedClient from "@/components/GetInvolvedClient";

export const metadata: Metadata = {
  title: "Get Involved",
  description: "Join hands with Aap Sab Ki Awaaz NGO. Volunteer for traffic awareness, mentor athletes, sponsor medical camps, or support community developments.",
  alternates: { canonical: "/get-involved" },
  openGraph: {
    title: "Get Involved with ASKA",
    description: "Volunteer, mentor, or sponsor a cause.",
    url: "/get-involved",
    siteName: "Aap Sab Ki Awaaz",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/og-get-involved.png", width: 1200, height: 630, alt: "Get involved with Aap Sab Ki Awaaz — volunteer, mentor, sponsor" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Involved with ASKA",
    description: "Volunteer, mentor, or sponsor a cause.",
    images: ["/og-get-involved.png"],
  },
};

export default function GetInvolved() {
  return <GetInvolvedClient />;
}
