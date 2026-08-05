import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer, Chatbot } from "./index";

export const Route = createFileRoute("/terms-conditions")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — RKGIT Ghaziabad" },
      { name: "description", content: "Terms of Use and Institutional Regulations for RKGIT Ghaziabad." },
    ],
  }),
  component: TermsConditionsPage,
});

function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Header />
      <main className="flex-1 pt-4 pb-16">
        <section className="bg-navy text-white py-12">
          <div className="container-page">
            <h1 className="text-3xl sm:text-4xl font-extrabold">Terms & Conditions</h1>
            <p className="text-sm text-white/80 mt-2">Institutional Terms of Service for RKGIT Ghaziabad</p>
          </div>
        </section>
        <section className="py-12 bg-background">
          <div className="container-page max-w-4xl space-y-6 text-sm text-muted-foreground leading-relaxed">
            <p>Welcome to RKGIT Ghaziabad! By accessing this website and using our online portals, you agree to comply with and be bound by the following terms and conditions of use.</p>
            <h2 className="text-lg font-bold text-foreground">1. Academic & Disciplinary Compliance</h2>
            <p>All enrolled students must adhere to AKTU guidelines, AICTE anti-ragging codes, and RKGIT internal rules regarding attendance (minimum 75% requirement) and code of conduct.</p>
            <h2 className="text-lg font-bold text-foreground">2. Online Fee Payment Terms</h2>
            <p>Fees paid online through the portal are processed via secure banking gateways. Refund and cancellation policies are governed by AICTE and university norms.</p>
          </div>
        </section>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
