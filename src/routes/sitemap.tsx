import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer, Chatbot } from "./index";
import { Sitemap, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/sitemap")({
  head: () => ({
    meta: [
      { title: "Website Sitemap — RKGIT Ghaziabad" },
      { name: "description", content: "Complete sitemap and navigation directory of Raj Kumar Goel Institute of Technology (RKGIT) Ghaziabad." },
    ],
  }),
  component: SitemapPage,
});

const SITEMAP_TREE = [
  {
    category: "Main Pages & Quick Actions",
    links: [
      { label: "Homepage", href: "/" },
      { label: "Announcements Board", href: "/announcements" },
      { label: "Apply Online 2026", href: "/apply-now" },
      { label: "ERP Student Portal", href: "/erp" },
      { label: "NIRF Reports", href: "/nirf" },
      { label: "Pay Fee Online", href: "/pay-fee" },
      { label: "Alumni Network", href: "/alumni" },
      { label: "Central Library", href: "/library" },
      { label: "Careers & Recruitment", href: "/careers" },
      { label: "Contact Us", href: "/contact-us" },
    ],
  },
  {
    category: "About RKGIT",
    links: [
      { label: "Vision & Mission", href: "/about/vision-mission" },
      { label: "Leadership & Management", href: "/about/leadership" },
      { label: "History & Heritage", href: "/about/history" },
      { label: "Approvals & Accreditations", href: "/about/approvals-accreditations" },
      { label: "Rankings & Recognitions", href: "/about/rankings" },
      { label: "Campus Infrastructure", href: "/about/infrastructure" },
      { label: "Virtual Campus Tour", href: "/about/campus-tour" },
      { label: "Annual Reports", href: "/about/annual-reports" },
    ],
  },
  {
    category: "Academics",
    links: [
      { label: "Undergraduate Programs (B.Tech)", href: "/academics/undergraduate-programs" },
      { label: "Postgraduate Programs (M.Tech/MBA)", href: "/academics/postgraduate-programs" },
      { label: "Diploma Programs (D.Pharm)", href: "/academics/diploma-programs" },
      { label: "Academic Calendar 2026-27", href: "/academics/academic-calendar" },
      { label: "Examination Cell", href: "/academics/examination-cell" },
      { label: "Academic Regulations", href: "/academics/academic-regulations" },
      { label: "Curriculum & Schemes", href: "/academics/curriculum" },
      { label: "Syllabus Downloads", href: "/academics/syllabus" },
      { label: "Learning Resources", href: "/academics/learning-resources" },
    ],
  },
  {
    category: "Departments",
    links: [
      { label: "Computer Science & Engg", href: "/departments/computer-science" },
      { label: "Information Technology", href: "/departments/information-technology" },
      { label: "AI & Machine Learning", href: "/departments/ai-ml" },
      { label: "Electronics & Communication", href: "/departments/electronics-communication" },
      { label: "Electrical Engineering", href: "/departments/electrical-engineering" },
      { label: "Mechanical Engineering", href: "/departments/mechanical-engineering" },
      { label: "Civil Engineering", href: "/departments/civil-engineering" },
      { label: "Pharmacy College (RKGITPS)", href: "/departments/pharmacy" },
      { label: "Management Studies (MBA)", href: "/departments/management" },
      { label: "Applied Sciences & Humanities", href: "/departments/applied-sciences" },
    ],
  },
  {
    category: "Admissions",
    links: [
      { label: "Admission Process", href: "/admissions/admission-process" },
      { label: "Eligibility Criteria", href: "/admissions/eligibility" },
      { label: "Fee Structure", href: "/admissions/fee-structure" },
      { label: "Scholarships", href: "/admissions/scholarships" },
      { label: "Documents Required", href: "/admissions/documents-required" },
      { label: "Apply Online", href: "/admissions/apply-online" },
      { label: "Admission FAQs", href: "/admissions/faqs" },
    ],
  },
  {
    category: "Research & Innovation",
    links: [
      { label: "Research Centres", href: "/research/research-centres" },
      { label: "Publications & Journals", href: "/research/publications" },
      { label: "Patents Filed & Granted", href: "/research/patents" },
      { label: "Sponsored Projects", href: "/research/projects" },
      { label: "Consultancy Services", href: "/research/consultancy" },
      { label: "Innovation Cell (IIC)", href: "/research/innovation-cell" },
      { label: "Research Seed Grants", href: "/research/funding" },
      { label: "MoU Collaborations", href: "/research/collaborations" },
    ],
  },
  {
    category: "Placements",
    links: [
      { label: "Placement Overview", href: "/placements/placement-overview" },
      { label: "Top Recruiters", href: "/placements/recruiters" },
      { label: "Placement Statistics", href: "/placements/placement-statistics" },
      { label: "Internship Cell", href: "/placements/internship-cell" },
      { label: "Training Programs", href: "/placements/training-programs" },
      { label: "Placement Brochure", href: "/placements/placement-brochure" },
      { label: "Success Stories", href: "/placements/success-stories" },
    ],
  },
  {
    category: "Campus Life & People",
    links: [
      { label: "Clubs & Societies", href: "/campus-life/clubs" },
      { label: "Cultural & Tech Events", href: "/campus-life/events" },
      { label: "Sports Infrastructure", href: "/campus-life/sports" },
      { label: "Hostel Facilities", href: "/campus-life/hostel" },
      { label: "Faculty Directory", href: "/people/faculty-directory" },
      { label: "Staff Directory", href: "/people/staff-directory" },
      { label: "Student Council", href: "/people/student-council" },
      { label: "Administration", href: "/people/administration" },
    ],
  },
];

function SitemapPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Header />
      <main className="flex-1 pt-4 pb-16">
        <section className="bg-navy text-white py-12">
          <div className="container-page">
            <h1 className="text-3xl sm:text-4xl font-extrabold">Website Sitemap</h1>
            <p className="text-sm text-white/80 mt-2">Complete structure and navigation directory for RKGIT Ghaziabad.</p>
          </div>
        </section>
        <section className="py-12 bg-background">
          <div className="container-page grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SITEMAP_TREE.map((sec, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-border bg-card shadow-xs">
                <h2 className="text-base font-bold text-primary mb-3 pb-2 border-b border-border">{sec.category}</h2>
                <ul className="space-y-2 text-xs font-semibold">
                  {sec.links.map((lnk) => (
                    <li key={lnk.label}>
                      <Link to={lnk.href} className="text-foreground/80 hover:text-primary transition-colors flex items-center gap-1.5">
                        <ChevronRight className="h-3 w-3 opacity-60 text-primary" /> {lnk.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
