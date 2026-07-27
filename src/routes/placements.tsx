import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer, Chatbot } from "./index";
import { RecruitersView } from "@/components/placement/RecruitersView";
import { PlacementStatsView } from "@/components/placement/PlacementStatsView";
import { ChevronRight, Home, Award } from "lucide-react";

export const Route = createFileRoute("/placements")({
  head: () => ({
    meta: [
      { title: "Placements & Esteemed Recruiters — RKGIT Ghaziabad" },
      {
        name: "description",
        content:
          "Explore RKGIT Ghaziabad placement statistics, highest & average packages, 300+ recruiters including Google, Amazon, Microsoft, TCS, Infosys, and placement percentage trends.",
      },
      { property: "og:title", content: "Placements & Recruiters — RKGIT Ghaziabad" },
      {
        property: "og:description",
        content:
          "35 LPA Highest Package, 94% placement rate, 300+ global recruiters. Explore modern placement statistics and recruiter showcase.",
      },
    ],
  }),
  component: PlacementsPage,
});

function PlacementsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Header />

      <main className="flex-1">
        {/* Minimal & Clean Hero Banner */}
        <div className="bg-gradient-to-br from-navy via-slate-900 to-navy text-navy-foreground pt-12 pb-16 sm:pt-16 sm:pb-20 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-72 h-72 bg-accent/15 rounded-full filter blur-3xl pointer-events-none" />

          <div className="container-page relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-300/80 mb-6 font-medium">
              <a href="/" className="hover:text-white flex items-center gap-1 transition-colors">
                <Home className="h-3.5 w-3.5" /> Home
              </a>
              <ChevronRight className="h-3.5 w-3.5 opacity-50" />
              <span className="text-accent font-semibold">Placement Portal</span>
            </nav>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md border border-white/10">
                <Award className="h-3.5 w-3.5 text-accent" /> RKGIT Career Excellence
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Placements & Corporate Relations
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
                Connecting talented engineering, technology, and management graduates with leading multinational corporations and innovative product firms.
              </p>
            </div>
          </div>
        </div>

        {/* Section 1: Placement Statistics */}
        <PlacementStatsView />

        {/* Section 2: Our Esteemed Recruiters */}
        <RecruitersView />
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}
