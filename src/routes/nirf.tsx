import { createFileRoute } from "@tanstack/react-router";
import { Header, NIRFSection, Footer, Chatbot } from "./index";

export const Route = createFileRoute("/nirf")({
  head: () => ({
    meta: [
      { title: "NIRF Data Repository — RKGIT Ghaziabad" },
      { name: "description", content: "Access National Institutional Ranking Framework reports by year and category for RKGIT Ghaziabad." },
      { property: "og:title", content: "NIRF Data Repository — RKGIT Ghaziabad" },
      { property: "og:description", content: "Access National Institutional Ranking Framework (NIRF) reports for Raj Kumar Goel Institute of Technology." },
    ],
  }),
  component: NIRFPage,
});

function NIRFPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-6">
        <NIRFSection />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
