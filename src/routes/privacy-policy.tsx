import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer, Chatbot } from "./index";
import { ShieldCheck, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — RKGIT Ghaziabad" },
      { name: "description", content: "Privacy Policy and Data Protection Guidelines for RKGIT Ghaziabad official website." },
    ],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Header />
      <main className="flex-1 pt-4 pb-16">
        <section className="bg-navy text-white py-12">
          <div className="container-page">
            <h1 className="text-3xl sm:text-4xl font-extrabold">Privacy Policy</h1>
            <p className="text-sm text-white/80 mt-2">Raj Kumar Goel Institute of Technology (RKGIT) Data Protection Statement</p>
          </div>
        </section>
        <section className="py-12 bg-background">
          <div className="container-page max-w-4xl space-y-6 text-sm text-muted-foreground leading-relaxed">
            <p>At RKGIT Ghaziabad, accessible from rkgit.edu.in, one of our main priorities is the privacy of our visitors and students. This Privacy Policy document contains types of information that is collected and recorded by RKGIT and how we use it.</p>
            <h2 className="text-lg font-bold text-foreground">1. Information We Collect</h2>
            <p>We collect personal information that you voluntarily provide when filling out admission application forms, fee payments, ERP login, or inquiry forms. This includes name, email, phone number, academic records, and postal address.</p>
            <h2 className="text-lg font-bold text-foreground">2. How We Use Your Information</h2>
            <p>We use collected data solely for admission processing, academic administration, sending examination schedules, placement updates, and official communications.</p>
          </div>
        </section>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
