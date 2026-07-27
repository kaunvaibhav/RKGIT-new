import { useState } from "react";
import { Search, X, Sparkles, Building2, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { ALL_RECRUITERS, Recruiter } from "@/data/placementData";

function RecruiterCard({ recruiter }: { recruiter: Recruiter }) {
  const [imgError, setImgError] = useState(false);

  // Generate initial fallback color palette
  const initials = recruiter.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const gradients = [
    "from-blue-600 to-indigo-800",
    "from-slate-700 to-slate-900",
    "from-emerald-600 to-teal-800",
    "from-amber-600 to-orange-700",
    "from-purple-600 to-pink-800",
  ];
  // Deterministic gradient choice based on id length
  const bgGradient = gradients[recruiter.id.length % gradients.length];

  return (
    <div className="group relative flex flex-col items-center justify-between rounded-2xl bg-white border border-border/80 p-5 sm:p-6 shadow-sm hover:shadow-lift hover:border-primary/40 hover:-translate-y-1.5 transition-all duration-300 h-full cursor-pointer overflow-hidden">
      {/* Subtle top accent bar on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Featured Badge if applicable */}
      {recruiter.featured && (
        <span className="absolute top-2 right-2 text-[9px] font-extrabold uppercase tracking-wider bg-accent/15 text-accent-foreground border border-accent/25 px-2 py-0.5 rounded-full flex items-center gap-1">
          <Sparkles className="h-2.5 w-2.5 text-accent" /> Top Tier
        </span>
      )}

      {/* Logo container */}
      <div className="my-auto w-full h-16 sm:h-20 flex items-center justify-center relative p-2">
        {!imgError && recruiter.logo ? (
          <img
            src={recruiter.logo}
            alt={`${recruiter.name} Logo`}
            loading="lazy"
            onError={() => setImgError(true)}
            className="max-h-full max-w-[85%] object-contain group-hover:scale-108 transition-transform duration-300 filter drop-shadow-sm"
          />
        ) : (
          /* Premium Fallback Card */
          <div className="w-full h-full rounded-xl bg-gradient-to-br from-slate-50 to-primary-soft/40 border border-primary/15 flex items-center justify-center p-2 group-hover:border-primary/30 transition-colors">
            <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-tr ${bgGradient} text-white font-extrabold text-sm sm:text-base flex items-center justify-center shadow-md tracking-wider`}>
              {initials}
            </div>
          </div>
        )}
      </div>

      {/* Company Info */}
      <div className="w-full text-center mt-3 pt-3 border-t border-border/40">
        <h3 className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors truncate">
          {recruiter.name}
        </h3>
        <span className="inline-block mt-1 text-[10px] sm:text-xs font-semibold text-muted-foreground/80 bg-muted/60 px-2.5 py-0.5 rounded-full truncate max-w-full">
          {recruiter.sector}
        </span>
      </div>
    </div>
  );
}

export function RecruitersView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState<string>("All");

  const sectors = [
    "All",
    "Technology & AI",
    "Product & E-Commerce",
    "Finance & Fintech",
    "Consulting & IT Services",
    "Core & Telecom",
  ];

  const filteredRecruiters = ALL_RECRUITERS.filter((recruiter) => {
    const matchesSearch =
      recruiter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recruiter.sector.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector =
      selectedSector === "All" || recruiter.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  return (
    <section className="py-12 sm:py-16 bg-surface/50 min-h-screen">
      <div className="container-page">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-soft text-primary text-xs font-bold uppercase tracking-widest mb-4 border border-primary/10">
            <Building2 className="h-3.5 w-3.5" /> Corporate Partners
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
            Our Esteemed Recruiters
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed italic">
            &ldquo;Our students are placed across leading global organizations in technology, finance, consulting, product engineering, AI, and core sectors.&rdquo;
          </p>

          {/* Centered Search Bar */}
          <div className="mt-8 relative max-w-xl mx-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-4.5 h-5 w-5 text-muted-foreground/70 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recruiters by name or sector..."
                className="w-full pl-12 pr-11 py-3.5 sm:py-4 rounded-2xl bg-white border border-border/80 shadow-soft focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary text-sm sm:text-base font-medium placeholder:text-muted-foreground/60 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 p-1 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Sector Category Filters */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            {sectors.map((sector) => (
              <button
                key={sector}
                onClick={() => setSelectedSector(sector)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  selectedSector === sector
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-white text-foreground/80 hover:bg-primary-soft hover:text-primary border border-border/60"
                }`}
              >
                {sector}
              </button>
            ))}
          </div>
        </div>

        {/* Counter & Status */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-4 border-b border-border/60 text-xs sm:text-sm text-muted-foreground font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Showing <strong className="text-foreground">{filteredRecruiters.length}</strong> of {ALL_RECRUITERS.length} Industry Leaders</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500"></span> Active Hiring Drives</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary"></span> 100% Verified Partners</span>
          </div>
        </div>

        {/* Recruiter Display Grid (5 cols desktop -> 2 cols mobile) */}
        {filteredRecruiters.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
            {filteredRecruiters.map((recruiter) => (
              <RecruiterCard key={recruiter.id} recruiter={recruiter} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-border/70 p-8 shadow-sm">
            <Building2 className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-foreground">No recruiters found</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
              We couldn&apos;t find any recruiters matching &ldquo;{searchQuery}&rdquo;. Try clearing your search or filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedSector("All");
              }}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground text-xs font-bold rounded-xl shadow-sm hover:bg-primary/90 transition-colors"
            >
              Reset Search & Filters
            </button>
          </div>
        )}

        {/* Corporate Partnership Banner */}
        <div className="mt-14 sm:mt-16 rounded-3xl bg-gradient-to-r from-navy via-slate-900 to-navy text-navy-foreground p-8 sm:p-10 shadow-lift relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold mb-3 backdrop-blur-md">
              <ShieldCheck className="h-3.5 w-3.5 text-accent" /> Placement & Training Cell
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Are you a corporate recruiter looking for top talent?
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
              Partner with RKGIT to recruit industry-ready graduates trained in modern technology, engineering, pharmacy, and leadership domains.
            </p>
          </div>
          <div className="relative z-10 shrink-0">
            <a
              href="mailto:placement@rkgit.edu.in"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-accent text-accent-foreground font-bold text-sm hover:bg-accent/90 hover:scale-105 transition-all shadow-md"
            >
              Invite For Campus Drives <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
