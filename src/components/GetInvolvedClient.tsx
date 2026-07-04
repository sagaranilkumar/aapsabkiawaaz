"use client";

import React, { useState } from "react";
import { 
  Heart, 
  Users, 
  Award, 
  ArrowRight, 
  Mail, 
  CheckCircle, 
  Calendar, 
  Send,
  MessageSquare,
  Sparkles,
  ClipboardList
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface OpportunityCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
  color: string;
}

function OpportunityCard({ icon, title, description, benefits, color }: OpportunityCardProps) {
  return (
    <div className="bg-ngo-card p-6 md:p-8 rounded-2xl border border-ngo-border-light shadow-sm hover:shadow-xl transition-all duration-300 gold-glow group relative flex flex-col h-full">
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-ngo-primary mb-6 transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-ngo-primary mb-3 group-hover:text-ngo-secondary transition-colors">
        {title}
      </h3>
      <p className="text-ngo-muted text-sm leading-relaxed mb-6 flex-grow">
        {description}
      </p>
      <div className="border-t border-ngo-border-light pt-4 mt-auto">
        <h4 className="text-[11px] uppercase tracking-wider font-bold text-ngo-muted-light mb-3">Key Focus Areas</h4>
        <ul className="space-y-2">
          {benefits.map((benefit, i) => (
            <li key={i} className="flex items-center text-xs text-ngo-muted">
              <CheckCircle size={14} className="text-ngo-secondary mr-2 shrink-0" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function GetInvolvedClient() {
  const [selectedInterest, setSelectedInterest] = useState<string>("volunteer");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  
  const opportunities = [
    {
      icon: <Users size={22} />,
      title: "Community Volunteer",
      description: "Join us on the ground during our traffic safety awareness drives, helmet distributions, and health camps. Work directly with citizens, municipal coordinators, and police home guards to make local neighborhoods safer and cleaner.",
      benefits: ["Event management & coordination", "Direct civic engagement opportunities", "Certificate of social contribution"],
      color: "bg-amber-100",
      id: "volunteer"
    },
    {
      icon: <Award size={22} />,
      title: "Athlete Mentorship & Sports Advocacy",
      description: "Help support and advocate for physically challenged or underprivileged local sports stars. Aap Sab Ki Awaaz supports emerging champions in disabled Boccia, youth powerlifting, and athletics to represent India internationally.",
      benefits: ["Underprivileged talent scouting", "Sponsorship & corporate partnerships", "Athletic training logistics support"],
      color: "bg-yellow-100",
      id: "sports"
    },
    {
      icon: <Heart size={22} />,
      title: "Public Welfare & Health Campaigns",
      description: "Lend professional or operational support to our megamedical camps, clean drinking water dispensaries, and university drunk-driving parent counseling seminars. Ideal for medical students, doctors, and civic educators.",
      benefits: ["Healthcare camp administration", "Resource & water dispenser logistics", "Parent counseling & educational outreach"],
      color: "bg-red-50",
      id: "welfare"
    }
  ];

  // Helper to compile the mailto body dynamically for user convenience
  const getMailtoLink = () => {
    const subject = encodeURIComponent(`Aap Sab Ki Awaaz - Get Involved Request (${selectedInterest.toUpperCase()})`);
    const interestLabel = opportunities.find(o => o.id === selectedInterest)?.title || "General Participation";
    const body = encodeURIComponent(
      `Hello Aap Sab Ki Awaaz PR Team,\n\n` +
      `I want to get involved with the NGO!\n\n` +
      `My Name: ${name || "[Your Name]"}\n` +
      `Area of Interest: ${interestLabel}\n\n` +
      `About me & how I want to help:\n${message || "[Your brief background and skills]"}\n\n` +
      `Please let me know the next steps to get started.\n\n` +
      `Warm regards,\n` +
      `${name || "[Your Name]"}`
    );
    return `mailto:press@aapsabkiawaaz.org?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-ngo-background pb-20">
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-ngo-stone to-ngo-cream pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #D4A853 1px, transparent 0)`, backgroundSize: "32px 32px" }} />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-ngo-secondary-subtle border border-ngo-secondary/20 text-ngo-secondary text-xs font-bold uppercase tracking-wider mb-4 animate-fade-in-up">
            <Sparkles size={12} /> Make a Real Difference
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-ngo-primary animate-fade-in-up">
            Be the Voice of Change
          </h1>
          <div className="w-20 h-1 bg-ngo-secondary rounded-full mx-auto mt-4 mb-6" />
          <p className="text-lg text-ngo-muted max-w-2xl mx-auto leading-relaxed">
            Whether you wish to coordinate local safety campaigns, mentor underprivileged sports talents, or sponsor clean drinking water kiosks, your contribution creates a lasting ripple effect.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="pt-16 container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Step 1: Browse Areas of Engagement */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-ngo-primary mb-3">
              1. Choose Your Path
            </h2>
            <p className="text-ngo-muted text-sm max-w-md mx-auto">
              Select one of our active intervention sectors where you believe your skills and passion align best.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {opportunities.map((opp, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedInterest(opp.id)}
                className={`cursor-pointer transition-all ${selectedInterest === opp.id ? 'ring-2 ring-ngo-secondary ring-offset-4' : ''}`}
              >
                <OpportunityCard 
                  icon={opp.icon}
                  title={opp.title}
                  description={opp.description}
                  benefits={opp.benefits}
                  color={opp.color}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Step 2: Email Submission instructions & Masked Email CTA */}
        <div className="bg-white border border-ngo-border-light rounded-3xl p-8 md:p-12 shadow-md max-w-3xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-ngo-secondary-subtle rounded-bl-full opacity-50 flex items-center justify-center">
            <ClipboardList className="text-ngo-secondary/30 mt-[-10px] mr-[-10px]" size={28} />
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-ngo-primary mb-3">
              2. Email Your Details to PR Team
            </h2>
            <p className="text-ngo-muted text-sm max-w-md mx-auto">
              To guarantee your enquiry reaches the correct committee coordinators, please compile your details below and use the PR Email Link to send them.
            </p>
          </div>

          {/* User helper template form */}
          <div className="space-y-4 max-w-xl mx-auto mb-8 bg-ngo-stone/20 p-6 rounded-2xl border border-ngo-border-light">
            <h3 className="text-xs font-bold text-ngo-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MessageSquare size={14} className="text-ngo-secondary" />
              Volunteer Information Template
            </h3>

            <div>
              <label className="block text-xs font-bold text-ngo-muted-light mb-1.5 uppercase">
                Your Full Name
              </label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Kiran Kumar" 
                className="w-full bg-white border border-ngo-border rounded-xl px-4 py-2.5 text-sm text-ngo-primary focus:outline-none focus:ring-2 focus:ring-ngo-secondary/20 focus:border-ngo-secondary transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-ngo-muted-light mb-1.5 uppercase">
                Brief Introduction & Skills (Optional)
              </label>
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Share a little bit about yourself, your background, and why you are interested in this specific initiative." 
                className="w-full bg-white border border-ngo-border rounded-xl p-4 text-sm text-ngo-primary focus:outline-none focus:ring-2 focus:ring-ngo-secondary/20 focus:border-ngo-secondary transition-all font-sans"
              />
            </div>

            <div className="text-[11px] text-ngo-muted-light leading-relaxed">
              <strong>Tip:</strong> Clicking the gold button below will automatically launch your mail client (Outlook, Gmail, Mail, etc.) and pre-fill the subject and body with your chosen interest and introduction notes!
            </div>
          </div>

          {/* Call to Action - Masked email with Hover reveal */}
          <div className="text-center">
            <a
              href={getMailtoLink()}
              className="inline-flex items-center gap-3.5 btn-gold rounded-full px-8 py-4 font-bold focus:outline-none focus:ring-4 focus:ring-ngo-secondary/50 group/press shadow-lg cursor-pointer"
            >
              <Mail size={20} />
              <span className="group-hover/press:hidden font-sans">Email PR Coordinator</span>
              <span className="hidden group-hover/press:inline font-mono">press@aapsabkiawaaz.org</span>
              <ArrowRight size={18} className="group-hover/press:translate-x-1 transition-transform" />
            </a>
            
            <p className="text-xs text-ngo-muted-light mt-4 flex items-center justify-center gap-1">
              <span>PR Office Email: </span>
              <span className="font-semibold text-ngo-secondary cursor-help border-b border-dashed border-ngo-secondary/30 relative group/hint">
                xxx@xxxxxxxxxxxx.xxx
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-ngo-charcoal text-white text-[10px] rounded shadow-md opacity-0 group-hover/hint:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 font-mono">
                  press@aapsabkiawaaz.org
                </span>
              </span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
