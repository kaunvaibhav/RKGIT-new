import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { Header, Footer, Chatbot } from "./index";
import { DETAILED_ANNOUNCEMENTS, DetailedAnnouncement } from "@/data/announcementsData";
import {
  Bell,
  Search,
  Calendar,
  Tag,
  Download,
  ExternalLink,
  Mail,
  Phone,
  ChevronDown,
  ChevronRight,
  Filter,
  Sparkles,
  ArrowRight,
  Clock,
  Building2,
} from "lucide-react";
import { useState, useEffect } from "react";

type AnnouncementSearch = {
  id?: string;
  category?: string;
  query?: string;
};

export const Route = createFileRoute("/announcements")({
  validateSearch: (search: Record<string, unknown>): AnnouncementSearch => {
    return {
      id: (search.id as string) || undefined,
      category: (search.category as string) || undefined,
      query: (search.query as string) || undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Official Announcements & Notices — RKGIT Ghaziabad" },
      {
        name: "description",
        content:
          "Stay updated with latest official announcements, admission notifications, campus placement drives, exam schedules, and events at RKGIT Ghaziabad.",
      },
      { property: "og:title", content: "Official Announcements — RKGIT Ghaziabad" },
    ],
  }),
  component: AnnouncementsPage,
});

const CATEGORIES = [
  "All",
  "Admissions",
  "Placements",
  "Examinations",
  "Workshops",
  "Conferences",
  "FDPs",
  "Scholarships",
  "Research",
  "Student Activities",
  "Cultural Events",
  "Sports",
  "Hostel",
  "Library",
];

function AnnouncementsPage() {
  const searchParams = useSearch({ from: "/announcements" });
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.category || "All");
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.query || "");
  const [expandedId, setExpandedId] = useState<number | null>(
    searchParams.id ? parseInt(searchParams.id, 10) : 1
  );

  useEffect(() => {
    if (searchParams.id) {
      const parsedId = parseInt(searchParams.id, 10);
      if (!isNaN(parsedId)) {
        setExpandedId(parsedId);
        // Scroll to element if exists
        const el = document.getElementById(`announcement-${parsedId}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    }
  }, [searchParams.id]);

  const filteredAnnouncements = DETAILED_ANNOUNCEMENTS.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Header />

      <main className="flex-1 pt-4 pb-16">
        {/* Hero Section */}
        <section className="relative bg-navy text-white overflow-hidden py-14 md:py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-primary/50" />
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl pointer-events-none" />

          <div className="container-page relative z-10">
            <nav className="flex items-center gap-2 text-xs md:text-sm text-white/70 mb-4">
              <Link to="/" className="hover:text-accent transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5 opacity-50" />
              <span className="text-white font-medium">Announcements</span>
            </nav>

            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent text-accent-foreground px-3.5 py-1 text-xs font-bold uppercase tracking-wider mb-4">
                <Bell className="h-3.5 w-3.5" /> Official Bulletins & Circulars
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                RKGIT Announcements Board
              </h1>
              <p className="mt-4 text-base sm:text-lg text-white/85 leading-relaxed">
                Browse 25+ latest official notices across admissions, campus placements, mid-sem exams, workshops, scholarships, and student activities.
              </p>
            </div>
          </div>
        </section>

        {/* Search & Filter Bar */}
        <section className="py-8 bg-muted/40 border-b border-border sticky top-16 z-30 backdrop-blur-md bg-background/90">
          <div className="container-page space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Search Bar */}
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search announcements by title, department, or keyword..."
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="text-xs text-muted-foreground whitespace-nowrap shrink-0 font-medium">
                Showing {filteredAnnouncements.length} of {DETAILED_ANNOUNCEMENTS.length} notices
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-xs font-bold text-muted-foreground uppercase shrink-0 mr-1 flex items-center gap-1">
                <Filter className="h-3 w-3" /> Categories:
              </span>
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? "bg-primary text-primary-foreground shadow-soft"
                        : "bg-card text-foreground/80 hover:bg-primary-soft hover:text-primary border border-border/70"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Accordion Announcements List */}
        <section className="py-12 bg-background">
          <div className="container-page max-w-4xl space-y-4">
            {filteredAnnouncements.length > 0 ? (
              filteredAnnouncements.map((item) => {
                const isExpanded = expandedId === item.id;

                return (
                  <div
                    key={item.id}
                    id={`announcement-${item.id}`}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden shadow-xs ${
                      isExpanded
                        ? "border-primary/50 bg-card ring-2 ring-primary/20"
                        : "border-border/80 bg-card hover:border-primary/30"
                    }`}
                  >
                    {/* Accordion Header */}
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                      className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer"
                    >
                      <div className="space-y-2 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span
                            className={`px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                              item.priority === "High"
                                ? "bg-red-100 text-red-700"
                                : item.priority === "Medium"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {item.category}
                          </span>
                          <span className="text-muted-foreground flex items-center gap-1 font-medium">
                            <Calendar className="h-3.5 w-3.5" /> {item.date}
                          </span>
                          <span className="text-muted-foreground flex items-center gap-1 font-medium">
                            <Building2 className="h-3.5 w-3.5" /> {item.department}
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                          {item.shortDescription}
                        </p>
                      </div>

                      <div className="shrink-0 pt-1">
                        <div
                          className={`h-8 w-8 rounded-full border border-border grid place-items-center transition-transform duration-300 ${
                            isExpanded ? "rotate-180 bg-primary text-primary-foreground border-primary" : "bg-muted/40"
                          }`}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </div>
                      </div>
                    </button>

                    {/* Accordion Body Details */}
                    {isExpanded && (
                      <div className="px-5 pb-6 pt-2 border-t border-border/50 bg-muted/10 space-y-6 animate-fade-down">
                        {/* Detailed Description */}
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
                            Detailed Information
                          </h4>
                          <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                            {item.detailedInfo}
                          </p>
                        </div>

                        {/* Important Dates Timeline */}
                        {item.importantDates && item.importantDates.length > 0 && (
                          <div className="p-4 rounded-xl bg-card border border-border">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3 flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5 text-accent" /> Important Dates & Timelines
                            </h4>
                            <div className="grid sm:grid-cols-3 gap-3 text-xs">
                              {item.importantDates.map((d, dIdx) => (
                                <div key={dIdx} className="p-2.5 rounded-lg bg-muted/40 border border-border/60">
                                  <div className="text-muted-foreground font-medium">{d.label}</div>
                                  <div className="font-bold text-foreground mt-0.5">{d.date}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Actions & Buttons */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                          <div className="flex flex-wrap items-center gap-2">
                            {item.pdfUrl && (
                              <a
                                href={item.pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-4 py-2 text-xs font-bold shadow-soft hover:bg-secondary transition-colors"
                              >
                                <Download className="h-3.5 w-3.5" /> Download Notice PDF
                              </a>
                            )}
                            {item.externalUrl && (
                              <a
                                href={item.externalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-xl bg-accent text-accent-foreground px-4 py-2 text-xs font-bold shadow-soft hover:brightness-105 transition-colors"
                              >
                                Visit Portal / Link <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            )}
                          </div>

                          <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium">
                            <span className="flex items-center gap-1">
                              <Mail className="h-3.5 w-3.5 text-primary" /> {item.contactEmail}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="h-3.5 w-3.5 text-primary" /> {item.contactPhone}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center py-16 bg-card border border-border rounded-2xl p-8">
                <Bell className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-40" />
                <h3 className="text-lg font-bold text-foreground">No announcements found</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Try clearing your search query or switching to another category.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2 text-xs font-bold"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}
