import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Aap Sab Ki Awaaz collects, uses, and protects your information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-ngo-background">
      <section className="bg-gradient-to-br from-ngo-stone to-ngo-cream pt-28 pb-14">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold text-ngo-primary md:text-5xl">Privacy Policy</h1>
          <p className="mt-3 text-sm text-ngo-muted-light">Last updated: July 2026</p>
        </div>
      </section>
      <section className="py-14">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8 text-ngo-muted leading-relaxed">
          <p>
            Aap Sab Ki Awaaz (&ldquo;ASKA&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy. This
            policy explains what information we collect through this website and how we use it.
          </p>
          <div>
            <h2 className="font-serif text-2xl font-bold text-ngo-primary mb-3">Information we collect</h2>
            <p>
              We only receive personal details you choose to send us — for example, your name and
              email address when you use the Get Involved page to draft a message to our team. We do
              not sell or rent your information to anyone.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-ngo-primary mb-3">Cookies &amp; analytics</h2>
            <p>
              This site may use cookies to understand aggregate traffic and improve the experience.
              You can disable cookies in your browser settings; the site will continue to work.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-ngo-primary mb-3">How we use information</h2>
            <p>
              We use the details you share solely to respond to your enquiry, coordinate volunteering
              or sponsorship, and keep you updated about the initiatives you ask about.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-ngo-primary mb-3">Your rights</h2>
            <p>
              You may ask us to access, correct, or delete the personal information we hold about you
              at any time by writing to the contact below.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-ngo-primary mb-3">Contact</h2>
            <p>
              Aap Sab Ki Awaaz, 53-20-16/11/1, P AND T Colony, Chaitanya Nagar, Maddilapalem,
              Seethamadhara, Visakhapatnam, AP - 530 013. Email:{" "}
              <a href="mailto:kiran@aapsabkiawaaz.org" className="font-semibold text-ngo-secondary hover:text-ngo-secondary-light">kiran@aapsabkiawaaz.org</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
