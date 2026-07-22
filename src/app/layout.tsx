import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import JsonLd from "@/components/JsonLd";
import { ORG_SCHEMA, SITE_URL, SITE_NAME } from "@/utils/seo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Aap Sab Ki Awaaz | Empowering Communities",
    template: "%s | Aap Sab Ki Awaaz",
  },
  description:
    "ASKA empowers citizens through rights awareness, road safety drives, free medical camps, athlete support, and civic welfare across Andhra Pradesh, India.",
  applicationName: SITE_NAME,
  keywords: [
    "ASKA",
    "Aap Sab Ki Awaaz",
    "NGO Andhra Pradesh",
    "NGO Visakhapatnam",
    "road safety",
    "free medical camp",
    "government schemes",
    "civic welfare",
  ],
  authors: [{ name: SITE_NAME }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Aap Sab Ki Awaaz",
    description: "Empowering communities across Andhra Pradesh.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_IN",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aap Sab Ki Awaaz",
    description: "Empowering communities across Andhra Pradesh.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <JsonLd data={ORG_SCHEMA} />
        <AccessibilityWidget />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
