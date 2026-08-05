import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer, Chatbot } from "./index";
import { SUBMENUS_DATA, SubmenuPageData } from "@/data/submenusData";
import {
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Building2,
  Phone,
  Mail,
  MapPin,
  HelpCircle,
  FileText,
  Search,
  ArrowRight,
  Download,
  Calendar,
  Award,
  Users,
  BookOpen,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/$category/$slug")({
  head: ({ params }) => {
    const slugKey = params.slug;
    const pageData = SUBMENUS_DATA[slugKey];
    const title = pageData ? `${pageData.title} — RKGIT Ghaziabad` : `${params.slug} — RKGIT Ghaziabad`;
    const description = pageData
      ? pageData.overview[0]
      : "Explore programs, research, placements, infrastructure and campus life at Raj Kumar Goel Institute of Technology (RKGIT) Ghaziabad.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: SubmenuPage,
});

// Fallback generator for any submenu slug not explicitly detailed in submenusData.ts
function generateFallbackData(category: string, slug: string): SubmenuPageData {
  const formattedTitle = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  return {
    slug,
    category: categoryName,
    title: formattedTitle,
    subtitle: `Explore comprehensive information, policies, metrics, and resources regarding ${formattedTitle} at RKGIT Ghaziabad.`,
    overview: [
      `Raj Kumar Goel Institute of Technology (RKGIT), Ghaziabad offers robust academic frameworks, state-of-the-art facilities, and industry-oriented programs in ${formattedTitle}.`,
      `With NAAC 'A' Grade accreditation and NBA accredited engineering streams, RKGIT ensures world-class education, Outcome Based Education (OBE), and holistic career growth.`,
      `Explore detailed guidelines, departmental statistics, faculty rosters, and upcoming events related to ${formattedTitle} below.`
    ],
    keyHighlights: [
      { title: "Academic Rigor", description: "Structured Outcome Based Education aligned with AKTU guidelines and global industry requirements." },
      { title: "State-of-the-Art Labs", description: "60+ advanced laboratories, high-speed Wi-Fi campus, and modern computing facilities." },
      { title: "Strong Industry Ties", description: "Collaborations with 300+ leading MNCs, tech incubators, and research organizations." },
      { title: "Holistic Development", description: "Over 25+ student-driven technical, cultural, sports, and social welfare societies." }
    ],
    stats: [
      { label: "Established Legacy", value: "26 Years", subtext: "Est. 2000 in Ghaziabad" },
      { label: "Graduate Placement", value: "94%", subtext: "Consistent Record" },
      { label: "Highest CTC", value: "34 LPA", subtext: "International MNCs" },
      { label: "Campus Area", value: "109K+ m²", subtext: "Green Built-up Campus" }
    ],
    table: {
      headers: ["S.No.", "Title / Record Name", "Category / Branch", "Details / Specifications", "Status / Year", "Action / Link"],
      rows: Array.from({ length: 12 }, (_, i) => [
        `0${i + 1}`,
        `${formattedTitle} Specification Record #${i + 1}`,
        categoryName,
        `Official parameter & operational guidelines for ${formattedTitle}`,
        `${2024 + (i % 3)}–${2025 + (i % 3)}`,
        "Download Document"
      ])
    },
    gallery: [
      { url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80", caption: `${formattedTitle} Facilities at RKGIT Ghaziabad` },
      { url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80", caption: "Interactive Learning & Research Hub" }
    ],
    faqs: [
      { question: `What is the scope of ${formattedTitle} at RKGIT?`, answer: `RKGIT provides full institutional support, updated curriculum, laboratory resources, and dedicated mentorship for ${formattedTitle}.` },
      { question: `How can I get more information or visit the department?`, answer: `You can reach out directly to the department office or visit the Admissions Cell at RKGIT campus, Ghaziabad.` }
    ],
    contact: {
      title: `${formattedTitle} Office`,
      name: "Department Representative",
      phone: "+91-120-2788270",
      email: "info@rkgit.edu.in",
      office: "Academic Block A, RKGIT Ghaziabad"
    }
  };
}

function SubmenuPage() {
  const { category, slug } = Route.useParams();
  const pageData: SubmenuPageData = SUBMENUS_DATA[slug] || generateFallbackData(category, slug);

  const [tableSearch, setTableSearch] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const filteredRows = pageData.table
    ? pageData.table.rows.filter((row) =>
        row.some((cell) => String(cell).toLowerCase().includes(tableSearch.toLowerCase()))
      )
    : [];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Header />

      <main className="flex-1 pt-4 pb-16">
        {/* Hero Section */}
        <section className="relative bg-navy text-white overflow-hidden py-14 md:py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-primary/40" />
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl pointer-events-none" />

          <div className="container-page relative z-10">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-xs md:text-sm text-white/70 mb-4 overflow-x-auto whitespace-nowrap">
              <Link to="/" className="hover:text-accent transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5 opacity-50 shrink-0" />
              <span className="capitalize">{pageData.category}</span>
              <ChevronRight className="h-3.5 w-3.5 opacity-50 shrink-0" />
              <span className="text-white font-medium">{pageData.title}</span>
            </nav>

            <div className="max-w-3xl">
              {pageData.badge && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent text-accent-foreground px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4">
                  <Sparkles className="h-3.5 w-3.5" />
                  {pageData.badge}
                </span>
              )}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {pageData.title}
              </h1>
              <p className="mt-4 text-base sm:text-lg text-white/85 leading-relaxed">{pageData.subtitle}</p>

              {/* Dynamic Contextual Hero CTAs */}
              <div className="mt-8 flex flex-wrap gap-3">
                {pageData.category.toLowerCase() === "admissions" || slug === "admission-process" ? (
                  <Link
                    to="/apply-now"
                    className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-6 py-3 text-sm font-bold shadow-soft hover:brightness-105 transition-all"
                  >
                    Apply Online 2026 <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : pageData.category.toLowerCase() === "academics" ? (
                  <a
                    href="#table"
                    className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-6 py-3 text-sm font-bold shadow-soft hover:brightness-105 transition-all"
                  >
                    Explore Programs <BookOpen className="h-4 w-4" />
                  </a>
                ) : pageData.category.toLowerCase() === "placements" ? (
                  <a
                    href="#table"
                    className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-6 py-3 text-sm font-bold shadow-soft hover:brightness-105 transition-all"
                  >
                    View Placement Records <Award className="h-4 w-4" />
                  </a>
                ) : pageData.category.toLowerCase() === "research" ? (
                  <a
                    href="#table"
                    className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-6 py-3 text-sm font-bold shadow-soft hover:brightness-105 transition-all"
                  >
                    Explore Research <FileText className="h-4 w-4" />
                  </a>
                ) : (
                  <a
                    href="#overview"
                    className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-6 py-3 text-sm font-bold shadow-soft hover:brightness-105 transition-all"
                  >
                    Explore Details <ArrowRight className="h-4 w-4" />
                  </a>
                )}

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 text-sm font-semibold transition-all backdrop-blur-sm"
                >
                  Contact Desk <Phone className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Overview & Key Highlights */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container-page">
            <div className="grid lg:grid-cols-12 gap-10 items-start">
              {/* Left Column - Overview Text */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-soft text-primary text-xs font-bold uppercase tracking-wider">
                  <BookOpen className="h-3.5 w-3.5" /> About {pageData.title}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  Overview & Key Information
                </h2>
                <div className="space-y-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {pageData.overview.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                {/* Highlights Grid */}
                <div className="mt-8 pt-6 border-t border-border grid sm:grid-cols-2 gap-4">
                  {pageData.keyHighlights.map((hl, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-card border border-border/70 shadow-xs hover:shadow-soft hover:border-primary/40 transition-all"
                    >
                      <div className="flex items-center gap-2 text-primary font-bold text-sm mb-1.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        {hl.title}
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground">{hl.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Stats & Quick Cards */}
              <div className="lg:col-span-5 space-y-6">
                <div className="rounded-3xl bg-navy text-white p-6 sm:p-8 shadow-lift border border-white/10 relative overflow-hidden">
                  <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-accent/20 blur-2xl" />
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-accent">
                    <Award className="h-5 w-5" /> Key Statistics & Metrics
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    {pageData.stats.map((st, idx) => (
                      <div key={idx} className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                        <div className="text-2xl sm:text-3xl font-extrabold text-white">{st.value}</div>
                        <div className="text-xs font-semibold text-white/90 mt-1">{st.label}</div>
                        {st.subtext && <div className="text-[11px] text-white/60 mt-0.5">{st.subtext}</div>}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/15 flex flex-col gap-3">
                    <a
                      href="https://rkgit.edu.in/downloads/RKGIT_Brochure_2026.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-accent text-accent-foreground py-3 px-4 text-xs font-bold transition-all hover:brightness-105"
                    >
                      <Download className="h-4 w-4" /> Download Official Brochure (PDF)
                    </a>
                  </div>
                </div>

                {/* Quick Info Box */}
                <div className="rounded-3xl bg-primary-soft/50 border border-primary/20 p-6 space-y-3">
                  <h4 className="text-sm font-bold text-primary flex items-center gap-2">
                    <Building2 className="h-4 w-4" /> Raj Kumar Goel Institute of Technology
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    5 Km. Stone, Delhi-Meerut Road, Near Raj Nagar Extension Crossing, Ghaziabad, Uttar Pradesh 201003
                  </p>
                  <div className="pt-2 flex items-center justify-between text-xs text-foreground font-medium border-t border-primary/10">
                    <span>AKTU College Code: <strong>033</strong></span>
                    <span>NAAC Grade: <strong>A</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fee Structure Custom Section for /admissions/fee-structure */}
        {slug === "fee-structure" ? (
          <section className="py-12 bg-muted/40 border-y border-border">
            <div className="container-page">
              <FeeStructureTables />
            </div>
          </section>
        ) : pageData.table && (
          <section className="py-12 bg-muted/40 border-y border-border">
            <div className="container-page">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent-foreground text-xs font-bold uppercase tracking-wider mb-2">
                    <FileText className="h-3.5 w-3.5" /> Detailed Information Table
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-foreground">
                    {pageData.title} Data Directory
                  </h2>
                </div>

                {/* Search Bar */}
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={tableSearch}
                    onChange={(e) => setTableSearch(e.target.value)}
                    placeholder="Search table rows..."
                    className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
              </div>

              {/* Table Container */}
              <div className="rounded-2xl border border-border bg-card shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-navy text-white text-xs uppercase tracking-wider">
                      <tr>
                        {pageData.table.headers.map((h, i) => (
                          <th key={i} className="px-4 py-3.5 font-semibold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {filteredRows.length > 0 ? (
                        filteredRows.map((row, rIdx) => (
                          <tr
                            key={rIdx}
                            className="hover:bg-primary-soft/40 transition-colors odd:bg-background even:bg-muted/20"
                          >
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="px-4 py-3 font-medium text-foreground/90">
                                {typeof cell === "string" && (cell.startsWith("Download") || cell.startsWith("http")) ? (
                                  <a
                                    href="#"
                                    className="inline-flex items-center gap-1 text-primary hover:underline font-semibold"
                                  >
                                    <Download className="h-3.5 w-3.5" /> {cell}
                                  </a>
                                ) : (
                                  cell
                                )}
                              </td>
                            ))}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={pageData.table.headers.length}
                            className="px-4 py-8 text-center text-muted-foreground"
                          >
                            No matching records found for "{tableSearch}".
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="px-4 py-3 bg-muted/30 text-xs text-muted-foreground flex justify-between items-center border-t border-border">
                  <span>Showing {filteredRows.length} of {pageData.table.rows.length} records</span>
                  <span>Populated with production sample data</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Photo Gallery Section */}
        {pageData.gallery && pageData.gallery.length > 0 && (
          <section className="py-12 md:py-16 bg-background">
            <div className="container-page">
              <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">
                Campus & Departmental Gallery
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pageData.gallery.map((g, idx) => (
                  <div key={idx} className="group rounded-2xl overflow-hidden border border-border bg-card shadow-xs">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={g.url}
                        alt={g.caption}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 text-xs font-semibold text-foreground">{g.caption}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {pageData.faqs && pageData.faqs.length > 0 && (
          <section className="py-12 bg-muted/30">
            <div className="container-page max-w-4xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-soft text-primary text-xs font-bold uppercase tracking-wider mb-2">
                  <HelpCircle className="h-3.5 w-3.5" /> Frequently Asked Questions
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                  Common Questions About {pageData.title}
                </h2>
              </div>

              <div className="space-y-3">
                {pageData.faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-semibold text-foreground hover:text-primary transition-colors cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        <ChevronRight
                          className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
                            isOpen ? "rotate-90 text-primary" : "text-muted-foreground"
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-5 pt-1 text-xs sm:text-sm text-muted-foreground border-t border-border/40 bg-muted/10 leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Contact Section */}
        <section id="contact" className="py-12 md:py-16 bg-background border-t border-border">
          <div className="container-page">
            <div className="rounded-3xl bg-gradient-to-r from-navy via-navy to-primary p-8 sm:p-12 text-white shadow-lift relative overflow-hidden">
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-accent text-xs font-bold uppercase tracking-wider">
                    <Phone className="h-3.5 w-3.5" /> Get In Touch
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Have Questions Regarding {pageData.title}?
                  </h2>
                  <p className="text-sm sm:text-base text-white/85">
                    Contact the official department coordinator or visit our campus admissions office in Ghaziabad for 1-on-1 counseling.
                  </p>

                  <div className="grid sm:grid-cols-3 gap-4 pt-4 text-xs">
                    <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                      <Users className="h-4 w-4 text-accent shrink-0" />
                      <div>
                        <div className="text-white/60">Contact Person</div>
                        <div className="font-bold text-white truncate">{pageData.contact.name}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                      <Phone className="h-4 w-4 text-accent shrink-0" />
                      <div>
                        <div className="text-white/60">Phone Helpline</div>
                        <div className="font-bold text-white">{pageData.contact.phone}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                      <Mail className="h-4 w-4 text-accent shrink-0" />
                      <div>
                        <div className="text-white/60">Official Email</div>
                        <div className="font-bold text-white truncate">{pageData.contact.email}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-3">
                  {pageData.category.toLowerCase() === "admissions" || slug === "admission-process" ? (
                    <>
                      <Link
                        to="/apply-now"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-accent text-accent-foreground py-3.5 px-6 text-sm font-bold shadow-soft hover:brightness-105 transition-all text-center"
                      >
                        Apply Online 2026 <ArrowRight className="h-4 w-4" />
                      </Link>
                      <a
                        href="tel:+911202788273"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 py-3.5 px-6 text-sm font-semibold text-white transition-all text-center"
                      >
                        Call Admissions Desk
                      </a>
                    </>
                  ) : pageData.category.toLowerCase() === "academics" ? (
                    <>
                      <Link
                        to="/admissions/admission-process"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-accent text-accent-foreground py-3.5 px-6 text-sm font-bold shadow-soft hover:brightness-105 transition-all text-center"
                      >
                        Admission Eligibility & Process <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        to="/contact-us"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 py-3.5 px-6 text-sm font-semibold text-white transition-all text-center"
                      >
                        Enquire Department
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/contact-us"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-accent text-accent-foreground py-3.5 px-6 text-sm font-bold shadow-soft hover:brightness-105 transition-all text-center"
                      >
                        Enquire Now <Mail className="h-4 w-4" />
                      </Link>
                      <a
                        href="tel:+911202788270"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 py-3.5 px-6 text-sm font-semibold text-white transition-all text-center"
                      >
                        Call Office
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}

function FeeStructureTables() {
  return (
    <div className="space-y-10 py-4">
      <div className="rounded-2xl bg-primary-soft/80 border border-primary/30 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider mb-2">
            Academic Session 2026–27
          </span>
          <h3 className="text-lg sm:text-xl font-extrabold text-foreground">
            Raj Kumar Goel Institute of Technology (RKGIT), Ghaziabad
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Approved by AICTE, PCI & Affiliated to Dr. APJ Abdul Kalam Technical University (AKTU), Lucknow
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <span className="px-3.5 py-1.5 rounded-xl bg-navy text-white text-xs font-bold shadow-xs">
            College Code: 033
          </span>
        </div>
      </div>

      {/* 1. B.Tech (Bachelor of Technology) */}
      <div className="rounded-3xl border border-border bg-card shadow-card p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-foreground flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary text-primary-foreground text-sm font-extrabold">1</span>
            1. B.Tech (Bachelor of Technology)
          </h2>
          <span className="text-xs font-bold px-3 py-1 bg-primary-soft text-primary rounded-full">
            4 Years (Session 26-27 to 29-30)
          </span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border/80 shadow-xs">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-navy text-white uppercase text-xs tracking-wider">
              <tr>
                <th className="px-4 py-3.5 w-14">S.No</th>
                <th className="px-4 py-3.5">Particulars</th>
                <th className="px-4 py-3.5 font-bold">1st Year (26-27)</th>
                <th className="px-4 py-3.5 font-bold">2nd Year (27-28)</th>
                <th className="px-4 py-3.5 font-bold">3rd Year (28-29)</th>
                <th className="px-4 py-3.5 font-bold">4th Year (29-30)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-semibold text-muted-foreground">1</td>
                <td className="px-4 py-3 font-medium text-foreground">Admission Registration & Documentation</td>
                <td className="px-4 py-3">3000</td>
                <td className="px-4 py-3">3000</td>
                <td className="px-4 py-3">3000</td>
                <td className="px-4 py-3">3000</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-semibold text-muted-foreground">2</td>
                <td className="px-4 py-3 font-medium text-foreground">Tuition Fee*</td>
                <td className="px-4 py-3">104250*</td>
                <td className="px-4 py-3">104250*</td>
                <td className="px-4 py-3">104250*</td>
                <td className="px-4 py-3">104250*</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-semibold text-muted-foreground">3</td>
                <td className="px-4 py-3 font-medium text-foreground">Career Planning & Development Fee</td>
                <td className="px-4 py-3">22000</td>
                <td className="px-4 py-3">22000</td>
                <td className="px-4 py-3">22000</td>
                <td className="px-4 py-3">22000</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-semibold text-muted-foreground">4</td>
                <td className="px-4 py-3 font-medium text-foreground">Industry Engagement & Innovation Support</td>
                <td className="px-4 py-3">5000</td>
                <td className="px-4 py-3">5000</td>
                <td className="px-4 py-3">5000</td>
                <td className="px-4 py-3">5000</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-semibold text-muted-foreground">5</td>
                <td className="px-4 py-3 font-medium text-foreground">Technology and Digital Learning Support</td>
                <td className="px-4 py-3">3500</td>
                <td className="px-4 py-3">3500</td>
                <td className="px-4 py-3">3500</td>
                <td className="px-4 py-3">3500</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-semibold text-muted-foreground">6</td>
                <td className="px-4 py-3 font-medium text-foreground">Learning Resource Access & Book Bank Charges</td>
                <td className="px-4 py-3">3500</td>
                <td className="px-4 py-3">3500</td>
                <td className="px-4 py-3">3500</td>
                <td className="px-4 py-3">3500</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-semibold text-muted-foreground">7</td>
                <td className="px-4 py-3 font-medium text-foreground">Student Welfare & Group Insurance</td>
                <td className="px-4 py-3">1250</td>
                <td className="px-4 py-3">1250</td>
                <td className="px-4 py-3">1250</td>
                <td className="px-4 py-3">1250</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-semibold text-muted-foreground">8</td>
                <td className="px-4 py-3 font-medium text-foreground">Academic Security (Refundable)</td>
                <td className="px-4 py-3">5000</td>
                <td className="px-4 py-3">—</td>
                <td className="px-4 py-3">—</td>
                <td className="px-4 py-3">—</td>
              </tr>
              <tr className="bg-primary/10 font-extrabold text-foreground text-sm border-t-2 border-primary/30">
                <td className="px-4 py-3.5">—</td>
                <td className="px-4 py-3.5 font-black uppercase text-xs tracking-wider text-primary">Gross Total</td>
                <td className="px-4 py-3.5 text-primary text-base font-black">147500</td>
                <td className="px-4 py-3.5 text-primary text-base font-black">142500</td>
                <td className="px-4 py-3.5 text-primary text-base font-black">142500</td>
                <td className="px-4 py-3.5 text-primary text-base font-black">142500</td>
              </tr>
              <tr className="bg-muted/40 font-semibold text-xs sm:text-sm text-foreground/90">
                <td className="px-4 py-3.5">—</td>
                <td className="px-4 py-3.5">Online University Examination Fee (to AKTU)**</td>
                <td className="px-4 py-3.5 font-bold">7500</td>
                <td className="px-4 py-3.5 font-bold">7500</td>
                <td className="px-4 py-3.5 font-bold">7500</td>
                <td className="px-4 py-3.5 font-bold">7500</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs text-muted-foreground italic pt-1">
          *Fee structure is subject to change by the state/fee fixation committee, if any.
        </p>

        {/* B.Tech Hostel Fee */}
        <div className="mt-6 pt-6 border-t border-border space-y-3">
          <h3 className="text-base font-bold text-foreground">Hostel Fee (2026-27):</h3>
          <div className="overflow-x-auto rounded-2xl border border-border/80 max-w-2xl shadow-xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-muted text-foreground uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-4 py-3.5 font-bold">Details</th>
                  <th className="px-4 py-3.5 font-bold">Triple Seater (Boys)</th>
                  <th className="px-4 py-3.5 font-bold">Double Seater (Girls)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                <tr className="hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium text-foreground">Rent & Mess</td>
                  <td className="px-4 py-3 font-semibold">87,500</td>
                  <td className="px-4 py-3 font-semibold">90,000</td>
                </tr>
                <tr className="hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium text-foreground">Security (One Time Refundable)</td>
                  <td className="px-4 py-3 font-semibold">5,000</td>
                  <td className="px-4 py-3 font-semibold">5,000</td>
                </tr>
                <tr className="bg-accent/15 font-extrabold text-foreground border-t-2 border-accent/40">
                  <td className="px-4 py-3.5 uppercase text-xs tracking-wider font-black">Total</td>
                  <td className="px-4 py-3.5 text-primary font-black">92,500</td>
                  <td className="px-4 py-3.5 text-primary font-black">95,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 2. B.Pharm (Bachelor of Pharmacy) */}
      <div className="rounded-3xl border border-border bg-card shadow-card p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-foreground flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary text-primary-foreground text-sm font-extrabold">2</span>
            2. B.Pharm (Bachelor of Pharmacy)
          </h2>
          <span className="text-xs font-bold px-3 py-1 bg-primary-soft text-primary rounded-full">
            4 Years (PCI Approved)
          </span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border/80 shadow-xs">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-navy text-white uppercase text-xs tracking-wider">
              <tr>
                <th className="px-4 py-3.5 w-14">S.No</th>
                <th className="px-4 py-3.5">Particulars</th>
                <th className="px-4 py-3.5 font-bold">1st Year</th>
                <th className="px-4 py-3.5 font-bold">2nd Year</th>
                <th className="px-4 py-3.5 font-bold">3rd Year</th>
                <th className="px-4 py-3.5 font-bold">4th Year</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-semibold text-muted-foreground">1</td>
                <td className="px-4 py-3 font-medium text-foreground">Admission Registration & Documentation</td>
                <td className="px-4 py-3">3000</td>
                <td className="px-4 py-3">3000</td>
                <td className="px-4 py-3">3000</td>
                <td className="px-4 py-3">3000</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-semibold text-muted-foreground">2</td>
                <td className="px-4 py-3 font-medium text-foreground">Tuition Fee*</td>
                <td className="px-4 py-3">104250*</td>
                <td className="px-4 py-3">104250*</td>
                <td className="px-4 py-3">104250*</td>
                <td className="px-4 py-3">104250*</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-semibold text-muted-foreground">3</td>
                <td className="px-4 py-3 font-medium text-foreground">Career Planning & Development Fee</td>
                <td className="px-4 py-3">22000</td>
                <td className="px-4 py-3">22000</td>
                <td className="px-4 py-3">22000</td>
                <td className="px-4 py-3">22000</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-semibold text-muted-foreground">4</td>
                <td className="px-4 py-3 font-medium text-foreground">Industry Engagement & Innovation Support</td>
                <td className="px-4 py-3">5000</td>
                <td className="px-4 py-3">5000</td>
                <td className="px-4 py-3">5000</td>
                <td className="px-4 py-3">5000</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-semibold text-muted-foreground">5</td>
                <td className="px-4 py-3 font-medium text-foreground">Technology and Digital Learning Support</td>
                <td className="px-4 py-3">3500</td>
                <td className="px-4 py-3">3500</td>
                <td className="px-4 py-3">3500</td>
                <td className="px-4 py-3">3500</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-semibold text-muted-foreground">6</td>
                <td className="px-4 py-3 font-medium text-foreground">Learning Resource Access & Book Bank Charges</td>
                <td className="px-4 py-3">3500</td>
                <td className="px-4 py-3">3500</td>
                <td className="px-4 py-3">3500</td>
                <td className="px-4 py-3">3500</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-semibold text-muted-foreground">7</td>
                <td className="px-4 py-3 font-medium text-foreground">Student Welfare & Group Insurance</td>
                <td className="px-4 py-3">1250</td>
                <td className="px-4 py-3">1250</td>
                <td className="px-4 py-3">1250</td>
                <td className="px-4 py-3">1250</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-semibold text-muted-foreground">8</td>
                <td className="px-4 py-3 font-medium text-foreground">Academic Security (Refundable)</td>
                <td className="px-4 py-3">5000</td>
                <td className="px-4 py-3">—</td>
                <td className="px-4 py-3">—</td>
                <td className="px-4 py-3">—</td>
              </tr>
              <tr className="bg-primary/10 font-extrabold text-foreground text-sm border-t-2 border-primary/30">
                <td className="px-4 py-3.5">—</td>
                <td className="px-4 py-3.5 font-black uppercase text-xs tracking-wider text-primary">Gross Total</td>
                <td className="px-4 py-3.5 text-primary text-base font-black">147500</td>
                <td className="px-4 py-3.5 text-primary text-base font-black">142500</td>
                <td className="px-4 py-3.5 text-primary text-base font-black">142500</td>
                <td className="px-4 py-3.5 text-primary text-base font-black">142500</td>
              </tr>
              <tr className="bg-muted/40 font-semibold text-xs sm:text-sm text-foreground/90">
                <td className="px-4 py-3.5">—</td>
                <td className="px-4 py-3.5">Online Registration Fee (to AKTU)**</td>
                <td className="px-4 py-3.5 font-bold">2300</td>
                <td className="px-4 py-3.5">—</td>
                <td className="px-4 py-3.5">—</td>
                <td className="px-4 py-3.5">—</td>
              </tr>
              <tr className="bg-muted/40 font-semibold text-xs sm:text-sm text-foreground/90">
                <td className="px-4 py-3.5">—</td>
                <td className="px-4 py-3.5">Online Exam Fee & Digital Library Fee (to AKTU)**</td>
                <td className="px-4 py-3.5 font-bold">8200</td>
                <td className="px-4 py-3.5 font-bold">8200</td>
                <td className="px-4 py-3.5 font-bold">8200</td>
                <td className="px-4 py-3.5 font-bold">8200</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs text-muted-foreground italic pt-1">
          *Fee structure is subject to change by the state/fee fixation committee, if any.
        </p>
      </div>

      {/* 3. MBA */}
      <div className="rounded-3xl border border-border bg-card shadow-card p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-foreground flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary text-primary-foreground text-sm font-extrabold">3</span>
            3. MBA
          </h2>
          <span className="text-xs font-bold px-3 py-1 bg-primary-soft text-primary rounded-full">
            2-Year Post Graduate Program
          </span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border/80 shadow-xs">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-navy text-white uppercase text-xs tracking-wider">
              <tr>
                <th className="px-4 py-3.5 w-14">S.No</th>
                <th className="px-4 py-3.5">Particulars</th>
                <th className="px-4 py-3.5 font-bold">MBA 1st Year</th>
                <th className="px-4 py-3.5 font-bold">MBA 2nd Year</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-semibold text-muted-foreground">1</td>
                <td className="px-4 py-3 font-medium text-foreground">Registration Charges</td>
                <td className="px-4 py-3 font-semibold">2000</td>
                <td className="px-4 py-3 font-semibold">2000</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-semibold text-muted-foreground">2</td>
                <td className="px-4 py-3 font-medium text-foreground">Tuition and other Fees*</td>
                <td className="px-4 py-3 font-semibold">104250</td>
                <td className="px-4 py-3 font-semibold">104250</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-semibold text-muted-foreground">3</td>
                <td className="px-4 py-3 font-medium text-foreground">Personality Development and Placement Assistance**</td>
                <td className="px-4 py-3 font-semibold">9500</td>
                <td className="px-4 py-3 font-semibold">9500</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-semibold text-muted-foreground">4</td>
                <td className="px-4 py-3 font-medium text-foreground">Value added Courses & Skill Development</td>
                <td className="px-4 py-3 font-semibold">10,000</td>
                <td className="px-4 py-3 font-semibold">10,000</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-semibold text-muted-foreground">5</td>
                <td className="px-4 py-3 font-medium text-foreground">Digital Learning Support & ERP Charges</td>
                <td className="px-4 py-3 font-semibold">4000</td>
                <td className="px-4 py-3 font-semibold">4000</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-semibold text-muted-foreground">6</td>
                <td className="px-4 py-3 font-medium text-foreground">Industry Interface Charges</td>
                <td className="px-4 py-3 font-semibold">10,000</td>
                <td className="px-4 py-3 font-semibold">10,000</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-semibold text-muted-foreground">7</td>
                <td className="px-4 py-3 font-medium text-foreground">Academic Caution Money (Refundable)</td>
                <td className="px-4 py-3 font-semibold">5000</td>
                <td className="px-4 py-3 font-semibold">—</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-semibold text-muted-foreground">8</td>
                <td className="px-4 py-3 font-medium text-foreground">Book Bank Charges</td>
                <td className="px-4 py-3 font-semibold">5000</td>
                <td className="px-4 py-3 font-semibold">—</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-semibold text-muted-foreground">9</td>
                <td className="px-4 py-3 font-medium text-foreground">Group Insurance (Accidental)</td>
                <td className="px-4 py-3 font-semibold">250</td>
                <td className="px-4 py-3 font-semibold">250</td>
              </tr>
              <tr className="bg-primary/10 font-extrabold text-foreground text-sm border-t-2 border-primary/30">
                <td className="px-4 py-3.5">—</td>
                <td className="px-4 py-3.5 font-black uppercase text-xs tracking-wider text-primary">Total (Rs)</td>
                <td className="px-4 py-3.5 text-primary text-base font-black">1,50,000</td>
                <td className="px-4 py-3.5 text-primary text-base font-black">1,40,000</td>
              </tr>
              <tr className="bg-muted/40 font-semibold text-xs sm:text-sm text-foreground/90">
                <td className="px-4 py-3.5">—</td>
                <td className="px-4 py-3.5">Online Registration Fee (to AKTU)</td>
                <td className="px-4 py-3.5 font-bold">2300</td>
                <td className="px-4 py-3.5">—</td>
              </tr>
              <tr className="bg-muted/40 font-semibold text-xs sm:text-sm text-foreground/90">
                <td className="px-4 py-3.5">—</td>
                <td className="px-4 py-3.5">Online University Examination Fee (to AKTU)</td>
                <td className="px-4 py-3.5 font-bold">8200</td>
                <td className="px-4 py-3.5 font-bold">8200</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs text-muted-foreground italic pt-1">
          *Fee structure is subject to change by the state/fee fixation committee, if any.
        </p>
      </div>

      {/* 4. M.Tech (ECE/CSE) */}
      <div className="rounded-3xl border border-border bg-card shadow-card p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-foreground flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary text-primary-foreground text-sm font-extrabold">4</span>
            4. M.Tech (ECE/CSE)
          </h2>
          <span className="text-xs font-bold px-3 py-1 bg-primary-soft text-primary rounded-full">
            2-Year Post Graduate Degree
          </span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border/80 shadow-xs">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-navy text-white uppercase text-xs tracking-wider">
              <tr>
                <th className="px-4 py-3.5 w-14">S.No</th>
                <th className="px-4 py-3.5">Particulars</th>
                <th className="px-4 py-3.5 font-bold">1st Year</th>
                <th className="px-4 py-3.5 font-bold">2nd Year</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-semibold text-muted-foreground">1</td>
                <td className="px-4 py-3 font-medium text-foreground">Tuition Fee*</td>
                <td className="px-4 py-3 font-semibold">100000</td>
                <td className="px-4 py-3 font-semibold">100000</td>
              </tr>
              <tr className="bg-primary/10 font-extrabold text-foreground text-sm border-t-2 border-primary/30">
                <td className="px-4 py-3.5">—</td>
                <td className="px-4 py-3.5 font-black uppercase text-xs tracking-wider text-primary">Gross Total</td>
                <td className="px-4 py-3.5 text-primary text-base font-black" colSpan={2}>
                  200000 (₹1,00,000 per year)
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs text-muted-foreground italic pt-1">
          *Fee structure is subject to change by the state/fee fixation committee, if any.
        </p>
      </div>
    </div>
  );
}
