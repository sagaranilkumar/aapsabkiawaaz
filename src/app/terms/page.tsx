import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of the Aap Sab Ki Awaaz website.",
  alternates: { canonical: "/terms" },
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-ngo-background">
      <section className="bg-gradient-to-br from-ngo-stone to-ngo-cream pt-28 pb-14">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold text-ngo-primary md:text-5xl">Terms of Service</h1>
          <p className="mt-3 text-sm text-ngo-muted-light">Last updated: July 2026</p>
        </div>
      </section>
      <section className="py-14">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8 text-ngo-muted leading-relaxed">
          <p>
            By using the Aap Sab Ki Awaaz website you agree to these terms. Please read them carefully.
          </p>
          <div>
            <h2 className="font-serif text-2xl font-bold text-ngo-primary mb-3">Use of the site</h2>
            <p>
              This website provides information about our initiatives, media coverage, and ways to get
              involved. You agree to use it lawfully and not to disrupt or misuse its services.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-ngo-primary mb-3">Content &amp; intellectual property</h2>
            <p>
              Text, images, and branding on this site belong to Aap Sab Ki Awaaz or its partners and may
              not be reproduced for commercial use without permission. News coverage links to the
              respective publishers, who retain their own rights.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-ngo-primary mb-3">External links</h2>
            <p>
              We link to third-party resources (such as government portals and news outlets) for
              convenience. We are not responsible for the content or practices of those sites.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-ngo-primary mb-3">Disclaimer</h2>
            <p>
              Information here is provided in good faith for general awareness and does not constitute
              legal, medical, or financial advice.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-ngo-primary mb-3">Contact</h2>
            <p>
              Questions about these terms? Email{" "}
              <a href="mailto:kiran@aapsabkiawaaz.org" className="font-semibold text-ngo-secondary hover:text-ngo-secondary-light">kiran@aapsabkiawaaz.org</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
