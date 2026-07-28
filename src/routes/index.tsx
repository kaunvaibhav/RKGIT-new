import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Search, Menu, X, ChevronDown, ChevronRight, ArrowRight, ArrowLeft, ArrowUpRight, MapPin, Phone, Mail,
  MessageCircle, Facebook, Twitter, Linkedin, Instagram, Youtube, Globe,
  Sparkles, GraduationCap, Beaker, BookOpen, Trophy, Briefcase, Building2,
  Clock, FlaskConical, Send, Play, CreditCard,
} from "lucide-react";

import heroAsset from "@/assets/rkgit-hero.png.asset.json";
import alumniAsset from "@/assets/rkgit-alumni.png.asset.json";
import campusImg from "@/assets/rkgit-campus.jpg";
import labImg from "@/assets/rkgit-lab.jpg";
import gradImg from "@/assets/rkgit-graduation.jpg";
import rkgit26YearsLogo from "@/assets/rkgit-26years.png";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useSearch } from "@/components/SearchContext";
import { ALL_RECRUITERS } from "@/data/placementData";

export const Route = createFileRoute("/")({
  component: Home,
});

const RKGIT_LOGO = "https://www.bbarkgit.co.in/img/RKGIT%20Logo%20Blue-1.png";


/* ------------------------------- Hooks ---------------------------------- */

function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current || seen) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setSeen(true),
      { threshold },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [seen, threshold]);
  return { ref, seen };
}

function CountUp({ end, suffix = "", duration = 1600 }: { end: number; suffix?: string; duration?: number }) {
  const { ref, seen } = useInView<HTMLSpanElement>(0.4);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setVal(Math.floor(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, end, duration]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

export function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, seen } = useInView<HTMLDivElement>(0.15);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? "translateY(0)" : "translateY(24px)",
        transition: `opacity .8s ease ${delay}ms, transform .8s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* -------------------------------- Header -------------------------------- */

type NavSubChild = {
  label: string;
  href?: string;
  badge?: string;
};

type NavChild = {
  label: string;
  href?: string;
  children?: (string | { label: string; href?: string; children?: (string | NavSubChild)[] })[];
};

type NavItem = { label: string; items: NavChild[] };

const NAV: NavItem[] = [
  {
    label: "About", items: [
      { label: "Vision & Mission" }, { label: "Leadership" }, { label: "History" },
      { label: "Approvals" }, { label: "Rankings" }, { label: "Infrastructure" },
    ]
  },
  {
    label: "Academics", items: [
      { label: "Departments", children: ["Computer Science", "Information Technology", "Electronics", "Mechanical", "Civil", "Electrical"] },
      {
        label: "Academic Programs",
        children: [
          {
            label: "UG Programs",
            children: [
              { label: "Computer Science and Engineering (NBA Accredited)", badge: "NBA" },
              { label: "Computer Science" },
              { label: "Computer Science and Engineering (Artificial Intelligence and Machine Learning)" },
              { label: "Computer Science and Engineering (Data Science)" },
              { label: "Information Technology (NBA Accredited)", badge: "NBA" },
              { label: "Electronics and Communication Engineering (NBA Accredited)", badge: "NBA" },
              { label: "Electrical and Electronics Engineering" },
              { label: "Mechanical Engineering" },
              { label: "Civil Engineering" },
            ]
          },
          { label: "PG Programs" },
          { label: "Diploma" },
        ]
      },
      { label: "UG & PG Schemes" }, { label: "Academic Calendar" }, { label: "Examination Section" },
      { label: "Fees" }, { label: "Time Table" }, { label: "Library" }, { label: "Ordinance" },
    ]
  },
  {
    label: "Departments", items: [
      { label: "Computer Science" }, { label: "Information Technology" }, { label: "Artificial Intelligence" },
      { label: "Electronics" }, { label: "Mechanical" }, { label: "Civil" }, { label: "Electrical" },
      { label: "MBA" }, { label: "MCA" },
    ]
  },
  {
    label: "Admissions", items: [
      { label: "Apply Now", href: "https://admission.rkgit.edu.in" }, { label: "Eligibility" }, { label: "Admission Process" },
      { label: "Scholarships" }, { label: "Fee Structure" }, { label: "FAQs" }, { label: "Download Brochure" },
    ]
  },
  {
    label: "Research", items: [
      { label: "Research Centers" }, { label: "Publications" }, { label: "Patents" },
      { label: "Innovation Cell" }, { label: "Consultancy" }, { label: "Incubation" },
    ]
  },
  {
    label: "Placements", items: [
      { label: "Placement Statistics", href: "/placements" },
      { label: "Recruiters", href: "/placements" },
      { label: "Placement Team", href: "/placements" },
      { label: "Internship Cell", href: "/placements" },
      { label: "Success Stories", href: "/placements" },
      { label: "Career Development", href: "/placements" },
    ]
  },
  {
    label: "Campus Life", items: [
      { label: "Hostel" }, { label: "Sports" }, { label: "Clubs" }, { label: "Events" },
      { label: "Student Chapters" }, { label: "Cafeteria" }, { label: "Medical Facilities" },
    ]
  },
  {
    label: "People", items: [
      { label: "Faculty" }, { label: "Staff" }, { label: "Alumni" }, { label: "Students" }, { label: "Governing Body" },
    ]
  },
];
const SUB_NAV = ["Apply Now", "Announcements", "ERP", "NIRF", "Pay Fee", "Alumni", "Library", "Careers", "Contact Us"];


function NavDropdown({ item }: { item: NavItem }) {
  return (
    <div className="relative group">
      <button className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
        {item.label}
        <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180 group-hover:text-primary" />
      </button>
      <div
        className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 absolute left-0 top-full pt-3 z-50"
      >
        <ul className="min-w-[240px] rounded-2xl bg-white border border-border/70 shadow-lift py-2 overflow-visible">
          {item.items.map((c) => {
            const isApply = c.label === "Apply Now";
            const targetHref = isApply ? "https://admission.rkgit.edu.in" : c.href || "#";
            const extraProps = isApply ? { target: "_blank", rel: "noopener noreferrer" } : {};

            return (
              <li key={c.label} className="relative group/child">
                <a
                  href={targetHref}
                  {...extraProps}
                  className="flex items-center justify-between gap-4 px-4 py-2.5 text-sm text-foreground/80 hover:bg-primary-soft hover:text-primary transition-colors rounded-lg mx-1"
                >
                  <span className="font-medium">{c.label}</span>
                  {c.children && <ChevronRight className="h-3.5 w-3.5 opacity-60" />}
                </a>
                {c.children && (
                  <div className="invisible opacity-0 translate-x-1 group-hover/child:visible group-hover/child:opacity-100 group-hover/child:translate-x-0 transition-all duration-200 absolute left-full top-0 pl-2 z-50">
                    <ul className="min-w-[240px] max-w-[320px] rounded-2xl bg-white border border-border/70 shadow-lift py-2">
                      {c.children.map((sc) => {
                        const scObj = typeof sc === "string" ? { label: sc } : sc;
                        const hasSubChildren = Array.isArray(scObj.children) && scObj.children.length > 0;

                        return (
                          <li key={scObj.label} className="relative group/subchild">
                            <div className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm text-foreground/80 hover:bg-primary-soft hover:text-primary transition-colors rounded-lg mx-1 font-medium cursor-pointer">
                              <span>{scObj.label}</span>
                              {hasSubChildren && <ChevronRight className="h-3.5 w-3.5 opacity-60 shrink-0" />}
                            </div>
                            {hasSubChildren && (
                              <div className="invisible opacity-0 translate-x-1 group-hover/subchild:visible group-hover/subchild:opacity-100 group-hover/subchild:translate-x-0 transition-all duration-200 absolute left-full top-0 pl-2 z-50">
                                <ul className="min-w-[320px] max-w-[380px] rounded-2xl bg-white border border-border/70 shadow-lift py-2">
                                  {scObj.children!.map((leaf) => {
                                    const leafObj = typeof leaf === "string" ? { label: leaf } : leaf;

                                    return (
                                      <li key={leafObj.label}>
                                        <Link
                                          to="/program"
                                          search={{ branch: leafObj.label }}
                                          className="flex items-center justify-between gap-2 px-4 py-2.5 text-xs sm:text-sm text-foreground/80 hover:bg-primary-soft hover:text-primary transition-colors rounded-lg mx-1 font-medium"
                                        >
                                          <span className="truncate">{leafObj.label}</span>
                                          {leafObj.badge && (
                                            <span className="shrink-0 rounded-full bg-accent/20 text-accent-foreground px-2 py-0.5 text-[10px] font-bold uppercase">
                                              {leafObj.badge}
                                            </span>
                                          )}
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function MobileNavAccordion({ onClose }: { onClose: () => void }) {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [openSubSection, setOpenSubSection] = useState<string | null>(null);
  const [openSubSubSection, setOpenSubSubSection] = useState<string | null>(null);

  const toggleSection = (label: string) => {
    if (openSection === label) {
      setOpenSection(null);
    } else {
      setOpenSection(label);
      setOpenSubSection(null);
      setOpenSubSubSection(null);
    }
  };

  const toggleSubSection = (label: string) => {
    setOpenSubSection(openSubSection === label ? null : label);
    setOpenSubSubSection(null);
  };

  const toggleSubSubSection = (label: string) => {
    setOpenSubSubSection(openSubSubSection === label ? null : label);
  };

  return (
    <div className="flex flex-col border-t border-border/60">
      {NAV.map((n) => {
        const isExpanded = openSection === n.label;

        return (
          <div key={n.label} className="border-b border-border/60">
            <button
              type="button"
              onClick={() => toggleSection(n.label)}
              className="w-full flex items-center justify-between py-3 px-2 text-sm font-semibold text-foreground hover:text-primary transition-colors min-h-[44px] cursor-pointer"
            >
              <span>{n.label}</span>
              <ChevronDown
                className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${
                  isExpanded ? "rotate-180 text-primary" : ""
                }`}
              />
            </button>

            {/* Level 1 Submenu Accordion Container */}
            <div className={`mobile-accordion-grid ${isExpanded ? "open" : ""}`}>
              <div className="mobile-accordion-inner">
                <div className="bg-[#F8FAFC] border-l-2 border-primary rounded-r-xl py-1 my-1.5 pl-4 pr-2 flex flex-col gap-0.5">
                  {n.items.map((c) => {
                    const hasChildren = Array.isArray(c.children) && c.children.length > 0;
                    const isSubOpen = openSubSection === c.label;
                    const isApply = c.label === "Apply Now";

                    if (hasChildren) {
                      return (
                        <div key={c.label} className="flex flex-col">
                          <button
                            type="button"
                            onClick={() => toggleSubSection(c.label)}
                            className="w-full flex items-center justify-between py-2.5 px-3 text-xs sm:text-sm font-medium text-foreground/90 hover:text-primary hover:bg-primary-soft/50 rounded-lg transition-colors min-h-[44px] cursor-pointer"
                          >
                            <span>{c.label}</span>
                            <ChevronDown
                              className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-300 ${
                                isSubOpen ? "rotate-180 text-primary" : ""
                              }`}
                            />
                          </button>

                          {/* Level 2 Submenu Accordion */}
                          <div className={`mobile-accordion-grid ${isSubOpen ? "open" : ""}`}>
                            <div className="mobile-accordion-inner">
                              <div className="border-l-2 border-primary/40 ml-3 pl-3 py-1 flex flex-col gap-0.5">
                                {c.children!.map((sc) => {
                                  const scObj = typeof sc === "string" ? { label: sc } : sc;
                                  const hasSubChildren = Array.isArray(scObj.children) && scObj.children.length > 0;
                                  const isSubSubOpen = openSubSubSection === scObj.label;

                                  if (hasSubChildren) {
                                    return (
                                      <div key={scObj.label} className="flex flex-col">
                                        <button
                                          type="button"
                                          onClick={() => toggleSubSubSection(scObj.label)}
                                          className="w-full flex items-center justify-between py-2 px-2 text-xs font-medium text-foreground/80 hover:text-primary min-h-[44px] cursor-pointer"
                                        >
                                          <span>{scObj.label}</span>
                                          <ChevronDown
                                            className={`h-3 w-3 text-muted-foreground transition-transform duration-300 ${
                                              isSubSubOpen ? "rotate-180 text-primary" : ""
                                            }`}
                                          />
                                        </button>

                                        {/* Level 3 Submenu Accordion */}
                                        <div className={`mobile-accordion-grid ${isSubSubOpen ? "open" : ""}`}>
                                          <div className="mobile-accordion-inner">
                                            <div className="border-l border-primary/30 ml-2 pl-2 py-1 flex flex-col gap-0.5">
                                              {scObj.children!.map((leaf) => {
                                                const leafObj = typeof leaf === "string" ? { label: leaf } : leaf;

                                                return (
                                                  <Link
                                                    key={leafObj.label}
                                                    to="/program"
                                                    search={{ branch: leafObj.label }}
                                                    onClick={onClose}
                                                    className="flex items-center justify-between py-2 px-2 text-xs font-normal text-foreground/80 hover:text-primary hover:bg-primary-soft/50 rounded transition-colors min-h-[44px]"
                                                  >
                                                    <span className="truncate">{leafObj.label}</span>
                                                    {leafObj.badge && (
                                                      <span className="shrink-0 rounded-full bg-accent/20 text-accent-foreground px-2 py-0.5 text-[9px] font-bold uppercase">
                                                        {leafObj.badge}
                                                      </span>
                                                    )}
                                                  </Link>
                                                );
                                              })}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }

                                  return (
                                    <Link
                                      key={scObj.label}
                                      to="/program"
                                      search={{ branch: scObj.label }}
                                      onClick={onClose}
                                      className="flex items-center justify-between py-2 px-3 text-xs font-medium text-foreground/80 hover:text-primary hover:bg-primary-soft/50 rounded-lg transition-colors min-h-[44px]"
                                    >
                                      <span>{scObj.label}</span>
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }

                    if (isApply) {
                      return (
                        <a
                          key={c.label}
                          href="https://admission.rkgit.edu.in"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={onClose}
                          className="flex items-center justify-between py-2.5 px-3 text-xs sm:text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary-soft/50 rounded-lg transition-colors min-h-[44px]"
                        >
                          <span>{c.label}</span>
                        </a>
                      );
                    }

                    if (c.href) {
                      return (
                        <Link
                          key={c.label}
                          to={c.href}
                          onClick={onClose}
                          className="flex items-center justify-between py-2.5 px-3 text-xs sm:text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary-soft/50 rounded-lg transition-colors min-h-[44px]"
                        >
                          <span>{c.label}</span>
                        </Link>
                      );
                    }

                    return (
                      <Link
                        key={c.label}
                        to="/program"
                        search={{ branch: c.label }}
                        onClick={onClose}
                        className="flex items-center justify-between py-2.5 px-3 text-xs sm:text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary-soft/50 rounded-lg transition-colors min-h-[44px]"
                      >
                        <span>{c.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openSearch } = useSearch();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Top strip */}
      <div className="bg-navy text-navy-foreground/90 text-xs">
        <div className="container-page flex h-9 items-center justify-between">
          <LanguageSelector variant="dark" />
          <div className="flex items-center gap-4">
            {[Facebook, Twitter, Linkedin, Instagram, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="text-white/80 hover:text-accent transition-colors">
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className={`bg-background border-b border-border transition-shadow ${scrolled ? "shadow-soft" : ""}`}>
        <div className="container-page grid grid-cols-[minmax(0,1fr)_auto] lg:grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-6 h-16 sm:h-20">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink min-w-0">
            <img
              src={rkgit26YearsLogo}
              alt="RKGIT 26 Ghaziabad — 26 Years of Academic Excellence"
              className="h-9 sm:h-12 lg:h-14 w-auto object-contain shrink-0"
            />
            <div className="h-8 sm:h-10 w-px bg-border/70 hidden sm:block shrink-0" />
            <img src={RKGIT_LOGO} alt="RKGIT Logo" className="h-9 sm:h-12 lg:h-14 w-auto shrink-0" />
            <div className="hidden xl:block leading-tight min-w-0">
              <div className="text-primary font-bold text-sm">RKGIT</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Ghaziabad · Est. 2000</div>
            </div>
          </Link>


          <nav className="hidden lg:flex items-center justify-center gap-0.5 min-w-0">
            {NAV.map((n) => (
              <NavDropdown key={n.label} item={n} />
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              aria-label="Search website"
              onClick={() => openSearch()}
              className="hidden sm:grid h-10 w-10 place-items-center rounded-full border border-border hover:border-primary hover:text-primary transition-colors cursor-pointer shrink-0"
            >
              <Search className="h-4 w-4" />
            </button>
            <a
              href="https://admission.rkgit.edu.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 hover:bg-secondary transition-colors shadow-soft"
            >
              Apply Now <ArrowRight className="h-4 w-4" />
            </a>
            <button aria-label="Menu" onClick={() => setOpen(!open)} className="lg:hidden grid h-10 w-10 place-items-center rounded-full border border-border shrink-0">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Secondary strip */}
        <div className="hidden md:block bg-primary-soft/60 border-t border-border">
          <div className="container-page flex flex-wrap items-center gap-2 py-2 overflow-x-auto">
            {SUB_NAV.map((s, i) => {
              const base = `rounded-full text-xs font-semibold px-4 py-1.5 transition-all hover:-translate-y-0.5 inline-flex items-center gap-1.5 ${
                i === 0
                  ? "bg-accent text-accent-foreground shadow-soft"
                  : s === "Pay Fee"
                    ? "bg-primary text-primary-foreground shadow-soft hover:bg-secondary"
                    : s === "NIRF"
                      ? "bg-white/90 text-primary border border-primary/20 hover:bg-white shadow-xs"
                      : "bg-white/80 text-primary hover:bg-white"
              }`;

              if (s === "Apply Now") {
                return (
                  <a
                    key={s}
                    href="https://admission.rkgit.edu.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={base}
                  >
                    {s}
                  </a>
                );
              }
              if (s === "NIRF") {
                return (
                  <Link key={s} to="/nirf" className={base}>
                    {s}
                  </Link>
                );
              }
              if (s === "Pay Fee") {
                return (
                  <Link key={s} to="/pay-fee" className={base}>
                    <CreditCard className="h-3.5 w-3.5" /> {s}
                  </Link>
                );
              }
              return (
                <a key={s} href="#" className={base}>
                  {s}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-background border-b border-border animate-fade-up max-h-[75vh] overflow-y-auto">
          <div className="container-page py-4 flex flex-col">
            <button
              onClick={() => {
                setOpen(false);
                openSearch();
              }}
              className="w-full flex items-center justify-between gap-2 px-4 py-3 mb-3 rounded-2xl bg-primary-soft text-primary font-semibold text-sm border border-primary/20 cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4" /> Search RKGIT Website...
              </span>
              <kbd className="px-2 py-0.5 text-[10px] bg-white rounded border border-primary/30 font-mono">
                Ctrl K
              </kbd>
            </button>
            <div className="pb-3 mb-2 border-b border-border/60 flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Select Language</span>
              <LanguageSelector variant="light" />
            </div>

            <MobileNavAccordion onClose={() => setOpen(false)} />

            <Link to="/nirf" activeProps={{ className: "text-primary font-bold" }} onClick={() => setOpen(false)} className="py-3 px-2 text-sm font-semibold border-b border-border/60 min-h-[44px] flex items-center">NIRF</Link>
            <Link to="/pay-fee" onClick={() => setOpen(false)} className="py-3 px-2 text-sm font-semibold border-b border-border/60 min-h-[44px] flex items-center">Pay Fee</Link>
            <a
              href="https://admission.rkgit.edu.in"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5"
            >
              Apply Now <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* --------------------------------- Hero --------------------------------- */

const SLIDES = [
  { img: heroAsset.url, title: "Raj Kumar Goel Institute of Technology", sub: "Engineering the future through learning, research and innovation." },
  { img: campusImg, title: "A Modern Campus Built for Discovery", sub: "109,000+ sq. m. of studios, labs and shared spaces." },
  { img: labImg, title: "Labs Where Ideas Become Products", sub: "60+ specialised laboratories and 12 R&D centres." },
  { img: gradImg, title: "26 Years of Graduates Leading Industry", sub: "8,500+ placement offers and a 34 LPA highest package." },
];

function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = SLIDES.length;
  const go = (n: number) => setI((n + total) % total);
  const next = () => go(i + 1);
  const prev = () => go(i - 1);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((n) => (n + 1) % total), 5000);
    return () => clearInterval(t);
  }, [paused, total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setI((n) => (n + 1) % total);
      if (e.key === "ArrowLeft") setI((n) => (n - 1 + total) % total);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  // Swipe support
  const touchX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
    touchX.current = null;
  };

  return (
    <section
      className="group relative h-[80vh] min-h-[520px] md:h-[92vh] md:min-h-[600px] w-full overflow-hidden bg-navy"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {SLIDES.map((s, idx) => (
        <div
          key={idx}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: idx === i ? 1 : 0 }}
          aria-hidden={idx !== i}
        >
          <img
            src={s.img}
            alt=""
            className={`h-full w-full object-cover ${idx === i ? "animate-ken-burns" : ""}`}
            {...(idx === 0 ? { loading: "eager" as const } : { loading: "lazy" as const })}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/55 via-navy/25 to-navy/80" />
        </div>
      ))}

      <div className="relative z-10 h-full container-page grid lg:grid-cols-12 gap-8 lg:gap-12 items-center justify-center py-10 md:py-16">
        {/* Left side: RKGIT 26 Ghaziabad Logo */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <img
            src={rkgit26YearsLogo}
            alt="RKGIT 26 Ghaziabad — 26 Years of Academic Excellence"
            className="w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[460px] h-auto object-contain shrink-0 [transform:none]"
            style={{ transform: "none" }}
          />
        </div>

        {/* Right side: Hero text & CTAs */}
        <div key={i} className="lg:col-span-7 animate-fade-up pb-16 md:pb-0">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1]">
            {SLIDES[i].title}
          </h1>
          <p className="mt-4 sm:mt-6 max-w-xl text-base sm:text-lg text-white/85">{SLIDES[i].sub}</p>
          <div className="mt-6 sm:mt-10 flex flex-wrap gap-3 sm:gap-4">
            <a href="#campus" className="inline-flex items-center gap-2 rounded-full bg-white text-primary px-5 sm:px-7 py-3 sm:py-3.5 text-sm font-bold hover:bg-accent hover:text-accent-foreground transition-colors shadow-lift">
              Explore Campus <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="https://admission.rkgit.edu.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-5 sm:px-7 py-3 sm:py-3.5 text-sm font-bold hover:brightness-105 transition-all shadow-lift"
            >
              Admissions Open 2026 <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Prev / Next arrows */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 h-10 w-10 md:h-12 md:w-12 grid place-items-center rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white opacity-70 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-primary"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 h-10 w-10 md:h-12 md:w-12 grid place-items-center rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white opacity-70 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-primary"
        >
          <ArrowRight className="h-5 w-5" />
        </button>

        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-16 flex gap-2">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`h-1.5 rounded-full transition-all ${idx === i ? "w-10 bg-accent" : "w-4 bg-white/40"}`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


/* ---------------------------- Announcement Bar -------------------------- */

const ANNOUNCEMENTS = [
  "Admissions Open 2026 — Apply Now",
  "Placement Drive: 300+ Recruiters On Campus",
  "Smart India Hackathon 2026 Finalists Announced",
  "Workshop: Generative AI & LLM Systems — 22 Aug",
  "Semester Exam Schedule Released",
  "NBA Re-Accreditation Awarded to CSE, ECE, ME",
];

function Announcements() {
  return (
    <div className="bg-[oklch(0.97_0.03_80)] border-y border-accent/30 overflow-hidden">
      <div className="flex items-center gap-6 h-11">
        <span className="shrink-0 ml-4 md:ml-8 inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-3 py-1 text-[11px] font-bold uppercase tracking-widest">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-foreground animate-pulse" /> Live
        </span>
        <div className="relative flex-1 overflow-hidden">
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {[...ANNOUNCEMENTS, ...ANNOUNCEMENTS].map((a, i) => (
              <span key={i} className="text-sm font-medium text-foreground/80">
                <span className="text-accent mr-3">◆</span>{a}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- 26 Years --------------------------------- */

const STATS = [
  { icon: Clock, label: "Years of Legacy", value: 26, suffix: "+" },
  { icon: Building2, label: "Campus Area (Sq. Mt)", value: 109265, suffix: "+" },
  { icon: Trophy, label: "Awards & Recognition", value: 5, suffix: "+" },
  { icon: BookOpen, label: "Library Books", value: 104394, suffix: "+" },
  { icon: FlaskConical, label: "Laboratories", value: 60, suffix: "+" },
  { icon: Beaker, label: "R&D Centres", value: 12, suffix: "+" },
  { icon: GraduationCap, label: "Graduates", value: 12000, suffix: "+" },
  { icon: Briefcase, label: "Placement Offers", value: 8500, suffix: "+" },
];

function LegacySection() {
  return (
    <section className="relative py-16 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-soft/40 via-background to-background" />
      <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

      <div className="container-page relative grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10 rounded-3xl blur-2xl" />
          <img
            src={rkgit26YearsLogo}
            alt="RKGIT 26 Ghaziabad — 26 Years of Academic Excellence"
            className="relative w-full max-w-[460px] sm:max-w-[480px] mx-auto h-auto object-contain shrink-0 [transform:none]"
            style={{ transform: "none" }}
            loading="lazy"
          />
        </div>

        <Reveal delay={150}>
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="h-3.5 w-3.5" /> Est. 2000 — 2026
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground">
            Celebrating <span className="text-primary">26 Years</span> of Academic Excellence
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            From a single building in 2000 to one of Uttar Pradesh's most respected engineering
            institutions, RKGIT has spent 26 years shaping engineers, pharmacists and managers
            who lead across industry, research and entrepreneurship.
          </p>
          <ul className="mt-8 grid sm:grid-cols-2 gap-3">
            {[
              "NAAC 'A' Accredited",
              "Industry-aligned curriculum",
              "Modern research infrastructure",
              "300+ recruiting partners",
              "Highly qualified faculty",
              "Vibrant student culture",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3 text-sm text-foreground/80">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-primary text-xs">✓</span>
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------ In a Nutshell --------------------------- */

const PROGRAMS = ["B.Tech", "M.Tech", "D.Pharma", "B.Pharm", "M.Pharm", "BBA", "MBA", "BCA", "MCA"];

function Nutshell() {
  return (
    <section className="py-16 md:py-32 bg-gradient-to-b from-surface to-background">
      <div className="container-page">
        <Reveal className="text-center max-w-3xl mx-auto">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-primary">The Institute</span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold">RKGIT in a Nutshell</h2>
          <div className="mx-auto mt-4 h-0.5 w-24 bg-primary/60" />
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            We at RKGIT are committed to excellence in education, innovation, research and holistic
            student development. Over 26 years we have built an academic ecosystem that prepares
            students for successful careers.
          </p>
        </Reveal>

        {/* Programs */}
        <Reveal delay={100}>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {PROGRAMS.map((p) => (
              <a
                key={p}
                href="#"
                className="group relative rounded-2xl bg-card border border-border px-6 py-3.5 shadow-soft hover:-translate-y-1 hover:shadow-lift hover:border-primary/40 transition-all"
              >
                <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{p}</span>
                <span className="absolute inset-x-6 -bottom-px h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </a>
            ))}
          </div>
        </Reveal>

        {/* Stats grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 60}>
              <div className="group relative h-full rounded-2xl bg-card border border-border p-5 sm:p-6 shadow-soft hover:shadow-lift hover:-translate-y-1 transition-all overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
                <div className="grid h-11 w-11 sm:h-12 sm:w-12 place-items-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <s.icon className="h-5 w-5" />
                </div>
                <div className="mt-4 sm:mt-5 text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight break-words">
                  <CountUp end={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ About Tabs ------------------------------ */

const ABOUT_TABS = {
  Overview: "Founded in 2000, RKGIT Ghaziabad is a NAAC 'A' accredited institute delivering AICTE-approved programs in engineering, pharmacy and management. Our campus brings together modern laboratories, an active research culture and one of the region's most respected placement records.",
  Vision: "To be a globally recognized centre of academic excellence, empowering learners to become ethical, innovative and socially responsible leaders who transform industry and society.",
  Mission: "To provide quality technical education through modern pedagogy, industry collaboration and research; to nurture innovation, entrepreneurship and holistic development; and to build a culture of lifelong learning and integrity.",
};

function About() {
  const [tab, setTab] = useState<keyof typeof ABOUT_TABS>("Overview");
  const cards = [
    { k: "Students", v: 12000, s: "+" },
    { k: "Highest Package", v: 34, s: " LPA" },
    { k: "Recruiters", v: 300, s: "+" },
    { k: "Placement Offers", v: 8500, s: "+" },
  ];
  return (
    <section className="py-16 md:py-32">
      <div className="container-page grid lg:grid-cols-2 gap-10 md:gap-16 items-start">
        <Reveal>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">About RKGIT</span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold">An institution built on ideas, not walls.</h2>
          <div className="mt-8 flex flex-wrap gap-1 sm:gap-2 border-b border-border">
            {(Object.keys(ABOUT_TABS) as (keyof typeof ABOUT_TABS)[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative px-4 py-3 text-sm font-semibold transition-colors ${tab === t ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {t}
                {tab === t && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-primary" />}
              </button>
            ))}
          </div>
          <p key={tab} className="mt-6 text-muted-foreground text-lg leading-relaxed animate-fade-up">
            {ABOUT_TABS[tab]}
          </p>
          <a href="#" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary link-underline">
            Read the full profile <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>

        <Reveal delay={150}>
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            {cards.map((c, i) => {
              const bgs = ["bg-primary-soft", "bg-[oklch(0.97_0.03_80)]", "bg-[oklch(0.96_0.02_170)]", "bg-[oklch(0.95_0.03_320)]"];
              return (
                <div key={c.k} className={`rounded-3xl p-5 sm:p-7 ${bgs[i]} border border-border/60 shadow-soft`}>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary tracking-tight break-words">
                    <CountUp end={c.v} suffix={c.s} />
                  </div>
                  <div className="mt-2 text-sm font-semibold text-foreground/80">{c.k}</div>
                </div>
              );
            })}
            <div className="col-span-2 rounded-3xl p-5 sm:p-7 bg-navy text-navy-foreground shadow-lift flex items-center justify-between gap-4 sm:gap-6">
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-widest text-accent">Accreditation</div>
                <div className="mt-1 text-base sm:text-xl font-bold">NAAC 'A' · AICTE Approved · AKTU Affiliated</div>
              </div>
              <div className="hidden sm:grid h-14 w-14 place-items-center rounded-2xl bg-accent text-accent-foreground shrink-0">
                <Trophy className="h-6 w-6" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------- Accreditation Slider ----------------------- */

const ACCRED = [
  { name: "AICTE", url: "https://www.ndimdelhi.org/wp-content/uploads/2023/10/All_India_Council_for_Technical_Education_logo.png" },
  { name: "NBA", url: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/National_Board_of_Accreditation.svg/1280px-National_Board_of_Accreditation.svg.png" },
  { name: "AKTU", url: "https://upload.wikimedia.org/wikipedia/en/9/98/Dr._A.P.J._Abdul_Kalam_Technical_University_logo.png" },
  { name: "UGC", url: "https://upload.wikimedia.org/wikipedia/en/4/4e/UGC_India_Logo.png" },
  { name: "NIRF", url: "https://saec.ac.in/assets/images/nirf-logo.png" },
  { name: "DST", url: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Ministry_of_Science_and_Technology_India.svg" },
  { name: "ISTE", url: "https://accet-site-media-trial.s3.ap-northeast-1.amazonaws.com/cocurricular/iste/istelogo.webp" },
  { name: "NAAC", url: "https://upload.wikimedia.org/wikipedia/en/1/1d/NAAC_LOGO.png" },
];

function AccreditationStrip() {
  return (
    <section className="py-14 bg-surface border-y border-border overflow-hidden">
      <div className="container-page mb-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Recognized By</div>
          <div className="text-xl font-bold text-foreground">Accreditations & Approvals</div>
        </div>
        <div className="h-px flex-1 mx-6 bg-border hidden sm:block" />
      </div>
      <div className="relative marquee-pause">
        <div className="flex gap-6 animate-marquee whitespace-nowrap">
          {[...ACCRED, ...ACCRED, ...ACCRED].map((a, i) => (
            <div
              key={i}
              className="shrink-0 grid place-items-center h-40 w-40 sm:h-44 sm:w-44 rounded-[20px] bg-white p-7 transition-all duration-[250ms] hover:-translate-y-1.5"
              style={{
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 14px 40px rgba(0,0,0,0.10)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.06)")}
            >
              <img
                src={a.url}
                alt={a.name}
                loading="lazy"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

/* ------------------------------ NIRF Accordion -------------------------- */

const NIRF_PDF = "https://rkgit.edu.in/upload/NIRF%20Engineering-2026.pdf";

const NIRF_YEARS = [
  { year: "2026", categories: ["NIRF (Engineering)", "NIRF (Pharmacy)", "NIRF (Management)", "NIRF (Overall)", "SDG"] },
  { year: "2025", categories: ["NIRF (Engineering)", "NIRF (Pharmacy)", "NIRF (Management)", "NIRF (Overall)", "SDG"] },
  { year: "2024", categories: ["NIRF (Engineering)", "NIRF (Pharmacy)", "NIRF (Management)", "NIRF (Overall)", "SDG"] },
];

export function NIRFSection() {
  const [openYear, setOpenYear] = useState<string | null>("2026");
  return (
    <section id="nirf" className="py-16 md:py-24 bg-surface border-y border-border">
      <div className="container-page">
        <Reveal>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Rankings</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold">NIRF Data Repository</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">Access National Institutional Ranking Framework reports by year and category.</p>
        </Reveal>
        <div className="mt-10 md:mt-12 grid gap-4">
          {NIRF_YEARS.map((y) => {
            const isOpen = openYear === y.year;
            return (
              <div key={y.year} className="rounded-2xl bg-card border border-border shadow-soft overflow-hidden">
                <button
                  onClick={() => setOpenYear(isOpen ? null : y.year)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-primary-soft/40 transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground font-bold text-sm">
                      {y.year.slice(-2)}
                    </div>
                    <span className="text-lg font-bold">NIRF Data {y.year}</span>
                  </div>
                  <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <div
                  className="grid transition-all duration-300 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-2">
                      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                        {y.categories.map((cat) => (
                          <a
                            key={cat}
                            href={NIRF_PDF}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between rounded-xl bg-white border border-border p-4 shadow-soft hover:shadow-lift hover:-translate-y-1 transition-all"
                          >
                            <span className="text-sm font-semibold text-foreground/80 group-hover:text-primary">{cat}</span>
                            <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


/* ------------------------------ Programs -------------------------------- */

const PROGRAM_CARDS = {
  Undergraduate: [
    { name: "B.Tech", desc: "Four-year engineering programs across CSE, AI/ML, ECE, ME, Civil.", img: labImg },
    { name: "BCA", desc: "Computer applications with modern software engineering foundations.", img: campusImg },
    { name: "B.Pharm", desc: "Pharmaceutical sciences with industry-integrated laboratories.", img: gradImg },
  ],
  Postgraduate: [
    { name: "M.Tech", desc: "Advanced specializations in CSE, ECE and Mechanical Engineering.", img: labImg },
    { name: "MBA", desc: "AICTE-approved management program with dual specialization.", img: campusImg },
    { name: "MCA", desc: "Two-year computer applications with focus on modern stacks.", img: gradImg },
  ],
};

function Programs() {
  const [tab, setTab] = useState<keyof typeof PROGRAM_CARDS>("Undergraduate");
  return (
    <section className="py-16 md:py-32 bg-surface">
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Academics</span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold">Academic Programs</h2>
          </Reveal>
          <div className="flex gap-2 p-1 rounded-full bg-card border border-border shadow-soft w-fit">
            {(Object.keys(PROGRAM_CARDS) as (keyof typeof PROGRAM_CARDS)[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 sm:px-5 py-2 text-sm font-semibold rounded-full transition-all ${tab === t ? "bg-primary text-primary-foreground shadow-soft" : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 md:mt-12 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {PROGRAM_CARDS[tab].map((p, i) => (
            <Reveal key={p.name} delay={i * 80}>
              <article className="group rounded-3xl bg-card border border-border overflow-hidden shadow-soft hover:shadow-lift hover:-translate-y-1 transition-all">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={p.img} alt={p.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  <a href="#" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary link-underline">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- Why Choose RKGIT -------------------------- */

function WhyRKGIT() {
  const left = [
    "Industry-oriented curriculum",
    "Modern AI & ML laboratories",
    "Competitive coding culture",
    "Year-round hackathons",
    "Structured internships",
    "Innovation & maker labs",
    "Live industry projects",
    "Highest package 34 LPA",
    "Dedicated placement cell",
    "Vibrant student clubs",
  ];
  const right = [
    "Active research laboratories",
    "Innovation & incubation cell",
    "Industry collaborations",
    "Faculty development programs",
    "Patent & IPR support",
    "Entrepreneurship mentorship",
    "Sponsored research projects",
    "Skill development centres",
    "Publications in top venues",
    "Interdisciplinary academics",
  ];
  const Card = ({ title, badge, items, dark }: { title: string; badge: string; items: string[]; dark?: boolean }) => (
    <div className={`rounded-3xl p-6 sm:p-8 md:p-10 shadow-lift border ${dark ? "bg-navy text-navy-foreground border-white/10" : "bg-card border-border"}`}>
      <span className={`inline-block text-[11px] font-bold uppercase tracking-[0.25em] ${dark ? "text-accent" : "text-primary"}`}>{badge}</span>
      <h3 className="mt-3 text-xl sm:text-2xl md:text-3xl font-extrabold">{title}</h3>
      <ul className="mt-8 grid sm:grid-cols-2 gap-x-6 gap-y-3.5">
        {items.map((t) => (
          <li key={t} className="flex items-start gap-3 text-sm">
            <span className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${dark ? "bg-accent" : "bg-primary"}`} />
            <span className={dark ? "text-white/85" : "text-foreground/80"}>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <section className="py-16 md:py-32">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Why RKGIT</span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold">Two pillars. One institution.</h2>
          <p className="mt-4 text-muted-foreground text-lg">Everything at RKGIT is built to strengthen either a student's career or the frontier of research. Often both.</p>
        </Reveal>
        <div className="mt-12 grid lg:grid-cols-2 gap-6">
          <Reveal><Card title="For Students" badge="Careers & Learning" items={left} /></Reveal>
          <Reveal delay={120}><Card title="Research & Innovation" badge="Discovery" items={right} dark /></Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Recruiters ----------------------------- */

function Recruiters() {
  const displayRecruiters = ALL_RECRUITERS.slice(0, 16);

  return (
    <section className="py-16 md:py-32 bg-gradient-to-br from-primary-soft/60 via-surface to-primary-soft/40">
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Our Esteemed Recruiters</span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold">Our students placed at top global organizations</h2>
          </Reveal>
          <Link to="/placements" className="text-sm font-bold text-primary link-underline inline-flex items-center gap-2">
            View All 40+ Recruiters <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="mt-10 md:mt-14 overflow-hidden marquee-pause">
        <div className="flex gap-4 sm:gap-5 animate-marquee-fast whitespace-nowrap">
          {[...displayRecruiters, ...displayRecruiters, ...displayRecruiters].map((r, i) => (
            <div key={i} className="shrink-0 flex items-center justify-center gap-3 w-44 h-24 sm:w-56 sm:h-28 rounded-2xl bg-white border border-border shadow-soft hover:-translate-y-1 hover:shadow-lift transition-all p-5 sm:p-6">
              {r.logo ? (
                <img src={r.logo} alt={r.name} loading="lazy" className="max-h-12 max-w-[80%] object-contain" />
              ) : (
                <span className="font-extrabold text-slate-800 text-sm">{r.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Campus Life ---------------------------- */

const CAMPUS = [
  { title: "Hostel Living", img: campusImg, span: "md:col-span-2 md:row-span-2" },
  { title: "Sports", img: gradImg },
  { title: "Events", img: alumniAsset.url },
  { title: "Library", img: labImg },
  { title: "Innovation Lab", img: labImg },
  { title: "Student Clubs", img: gradImg },
];

function CampusLife() {
  return (
    <section id="campus" className="py-16 md:py-32">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Campus Life</span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold">More than lectures. It's where you grow up.</h2>
        </Reveal>

        <div className="mt-10 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 auto-rows-[140px] sm:auto-rows-[180px] md:auto-rows-[220px]">
          {CAMPUS.map((c, i) => (
            <Reveal key={c.title} delay={i * 60} className={c.span}>
              <a href="#" className="group relative block h-full rounded-3xl overflow-hidden shadow-soft">
                <img src={c.img} alt={c.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent" />
                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between text-white">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-accent">Explore</div>
                    <div className="text-lg font-bold">{c.title}</div>
                  </div>
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15 backdrop-blur border border-white/20 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- News --------------------------------- */

const NEWS = [
  { date: "12 Jul 2026", title: "RKGIT signs MoU with Autodesk for design & simulation labs", tag: "Partnership", img: labImg },
  { date: "08 Jul 2026", title: "26th Convocation — 1,842 graduates receive degrees", tag: "Milestone", img: gradImg },
  { date: "02 Jul 2026", title: "CSE team wins Smart India Hackathon 2026 grand prize", tag: "Achievement", img: campusImg },
];

function News() {
  return (
    <section className="py-16 md:py-32 bg-surface">
      <div className="container-page">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Newsroom</span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold">Latest news & events</h2>
          </Reveal>
          <a href="#" className="text-sm font-bold text-primary link-underline inline-flex items-center gap-2">
            All stories <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-10 md:mt-12 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {NEWS.map((n, i) => (
            <Reveal key={n.title} delay={i * 100}>
              <article className="group rounded-3xl bg-card border border-border overflow-hidden shadow-soft hover:shadow-lift hover:-translate-y-1 transition-all h-full">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={n.img} alt="" loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">{n.tag}</span>
                </div>
                <div className="p-6">
                  <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{n.date}</div>
                  <h3 className="mt-3 text-lg font-bold leading-snug group-hover:text-primary transition-colors">{n.title}</h3>
                  <a href="#" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary">
                    Read more <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Testimonials ----------------------------- */

const TESTIMONIALS = [
  { quote: "RKGIT gave me more than a degree — the coding culture and internships put me two years ahead when I joined Amazon.", name: "Aarav Sharma", role: "SDE II, Amazon · CSE '23" },
  { quote: "The pharmacy labs and mentorship prepared me exceptionally well for research at a global CRO.", name: "Priya Verma", role: "Research Associate · B.Pharm '22" },
  { quote: "From the first year, faculty pushed us into real projects. That is why I got a 34 LPA offer.", name: "Rohan Gupta", role: "SDE, Trilogy · CSE '24" },
];

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);
  const t = TESTIMONIALS[i];
  return (
    <section className="py-16 md:py-32">
      <div className="container-page">
        <div className="relative mx-auto max-w-4xl rounded-3xl bg-navy text-navy-foreground p-6 sm:p-10 md:p-16 shadow-lift overflow-hidden">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary/40 blur-3xl" />
          <div className="relative">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">Voices from RKGIT</span>
            <blockquote key={i} className="mt-6 text-lg sm:text-2xl md:text-3xl font-semibold leading-snug animate-fade-up">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <div className="mt-6 sm:mt-8 flex items-center justify-between gap-4 flex-wrap">
              <div className="min-w-0">
                <div className="font-bold truncate">{t.name}</div>
                <div className="text-sm text-white/70">{t.role}</div>
              </div>
              <div className="flex gap-2 shrink-0">
                {TESTIMONIALS.map((_, idx) => (
                  <button key={idx} onClick={() => setI(idx)} className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-accent" : "w-3 bg-white/30"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- CTA --------------------------------- */

function CTA() {
  return (
    <section id="apply" className="py-16 md:py-32">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl md:rounded-[2.5rem] bg-gradient-to-br from-primary via-secondary to-primary p-6 sm:p-10 md:p-20 shadow-lift">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent/30 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-8 md:gap-10 items-center text-white">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur border border-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
                <Sparkles className="h-3.5 w-3.5 text-accent" /> Admissions Open 2026
              </span>
              <h2 className="mt-6 text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight">Your future begins at RKGIT.</h2>
              <p className="mt-5 text-white/80 text-base sm:text-lg max-w-xl">Apply through counselling or direct admission. Priority round scholarships available until 30 September 2026.</p>
              <div className="mt-8 md:mt-10 flex flex-wrap gap-3 sm:gap-4">
                <a
                  href="https://admission.rkgit.edu.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-5 sm:px-7 py-3 sm:py-3.5 text-sm font-bold hover:brightness-105 shadow-lift"
                >
                  Apply Now <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#" className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/25 px-5 sm:px-7 py-3 sm:py-3.5 text-sm font-bold hover:bg-white/20">
                  <Play className="h-4 w-4" /> Visit Campus
                </a>
              </div>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {[
                { k: "12000+", v: "Alumni" },
                { k: "34 LPA", v: "Highest package" },
                { k: "300+", v: "Recruiters" },
                { k: "60+", v: "Labs" },
              ].map((s) => (
                <div key={s.v} className="rounded-2xl bg-white/10 backdrop-blur border border-white/15 p-6">
                  <div className="text-3xl font-extrabold">{s.k}</div>
                  <div className="text-sm text-white/80">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Footer ------------------------------- */

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="container-page py-14 md:py-20 grid md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
        {/* Quick Links */}
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-white">
              <img src={RKGIT_LOGO} alt="RKGIT" className="h-8 w-auto" />
            </div>
            <div>
              <div className="font-extrabold text-lg">RKGIT Ghaziabad</div>
              <div className="text-xs text-white/60">Est. 2000 · NAAC 'A'</div>
            </div>
          </div>
          <h4 className="mt-10 text-sm font-bold uppercase tracking-[0.2em] text-accent">Quick Links</h4>
          <ul className="mt-5 grid grid-cols-2 gap-y-3">
            {[
              { label: "Admissions", href: "#" },
              { label: "Academics", href: "#" },
              { label: "Departments", href: "#" },
              { label: "Placements", href: "#" },
              { label: "Research", href: "#" },
              { label: "Library", href: "#" },
              { label: "ERP", href: "#" },
              { label: "NIRF", href: "/nirf" },
              { label: "Careers", href: "#" },
              { label: "Contact Us", href: "#" },
            ].map((l) => (
              <li key={l.label}>
                {l.href.startsWith("/") ? (
                  <Link to={l.href} className="group inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-accent transition-colors">
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {l.label}
                  </Link>
                ) : (
                  <a href={l.href} className="group inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-accent transition-colors">
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {l.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Contact Information</h4>
          <div className="mt-6 space-y-4">
            {[
              { label: "General Enquiry", phone: "0120-2788273, 2788409", mail: "registrar@rkgit.edu.in" },
              { label: "Admission (Counselling)", phone: "+91 9582945610 / 25", mail: "registrar@rkgit.edu.in" },
              { label: "Direct Admission", phone: "+91 9667652192", mail: "admission@rkgit.edu.in", wa: "+91 9667652196" },
            ].map((c) => (
              <div key={c.label} className="rounded-2xl bg-white/5 border border-white/10 p-5">
                <div className="text-[11px] font-bold uppercase tracking-widest text-accent">{c.label}</div>
                <div className="mt-3 flex items-center gap-2 text-sm text-white/85"><Phone className="h-3.5 w-3.5 text-accent" /> {c.phone}</div>
                <div className="mt-2 flex items-center gap-2 text-sm text-white/85"><Mail className="h-3.5 w-3.5 text-accent" /> {c.mail}</div>
                {c.wa && <div className="mt-2 flex items-center gap-2 text-sm text-white/85"><MessageCircle className="h-3.5 w-3.5 text-accent" /> WhatsApp {c.wa}</div>}
              </div>
            ))}
            <div className="rounded-2xl bg-accent text-accent-foreground p-4 text-sm font-bold flex items-center gap-2">
              <Phone className="h-4 w-4" /> Toll Free · 1800-120-777755
            </div>
          </div>
        </div>

        {/* Locate */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Locate Us</h4>
          <div className="mt-6 rounded-2xl overflow-hidden border border-white/10 aspect-[4/3]">
            <iframe
              title="RKGIT Map"
              src="https://www.google.com/maps?q=Raj+Kumar+Goel+Institute+of+Technology+Ghaziabad&output=embed"
              className="w-full h-full grayscale-[30%]"
              loading="lazy"
            />
          </div>
          <div className="mt-5 space-y-2 text-sm text-white/85">
            <div className="font-bold text-white">Raj Kumar Goel Institute of Technology</div>
            <div className="flex items-start gap-2"><MapPin className="h-4 w-4 text-accent mt-0.5" /> 5th KM Stone, Delhi-Meerut Road, Ghaziabad, UP, India</div>
          </div>
          <div className="mt-6 flex gap-3">
            {[Facebook, Instagram, Linkedin, Twitter, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="group grid h-10 w-10 place-items-center rounded-full bg-white/5 border border-white/10 hover:bg-accent hover:border-accent transition-all">
                <Icon className="h-4 w-4 text-white/80 group-hover:text-accent-foreground" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <div>© 2026 Raj Kumar Goel Institute of Technology, Ghaziabad. All rights reserved.</div>
          <div>Designed as a modern UI/UX prototype.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-accent">Privacy Policy</a>
            <a href="#" className="hover:text-accent">Terms</a>
            <a href="#" className="hover:text-accent">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------- Chatbot ------------------------------- */

const QUICK = ["B.Tech Admission", "Fee Structure", "Hostel Facilities", "Placement Record", "Documents Required"];
const BOT_REPLIES: Record<string, string> = {
  "B.Tech Admission": "B.Tech admissions are open via UPTAC counselling (JEE Main score) and direct admission. Priority round closes 30 Sep 2026.",
  "Fee Structure": "B.Tech tuition starts at ₹1.25L / year. Scholarships up to 100% available on merit and JEE percentile.",
  "Hostel Facilities": "Separate boys' & girls' hostels with Wi-Fi, mess, gym and 24×7 security inside the main campus.",
  "Placement Record": "8500+ offers over the last 26 years. 2025-26 highest package: 34 LPA. 300+ recruiters including Amazon, Autodesk, TCS.",
  "Documents Required": "10th & 12th mark sheets, JEE scorecard, transfer & migration certificates, category certificate (if applicable), ID proof.",
};

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<{ role: "bot" | "user"; text: string }[]>([
    { role: "bot", text: "Hi! I'm the RKGIT Admission Assistant. Ask me anything about admissions, courses, fees, hostel or placements." },
  ]);
  const [input, setInput] = useState("");
  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    const reply = BOT_REPLIES[text] || "Thanks for your question! Our admission team will reach out shortly. For urgent queries call our toll-free 1800-120-777755.";
    setTimeout(() => setMsgs((m) => [...m, { role: "bot", text: reply }]), 500);
    setInput("");
  };
  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-4 md:right-8 z-50 w-[92vw] max-w-sm rounded-3xl overflow-hidden shadow-lift border border-white/20 bg-white/70 backdrop-blur-2xl animate-fade-up">
          <div className="bg-gradient-to-br from-primary to-secondary text-white p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-white/15 border border-white/20">
                <Sparkles className="h-5 w-5 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold">RKGIT Admission Assistant</div>
                <div className="text-[11px] text-white/70">Online · replies in seconds</div>
              </div>
              <button onClick={() => setOpen(false)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/10">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="h-72 overflow-y-auto p-4 space-y-3 bg-white/60">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${m.role === "user" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-white shadow-soft rounded-bl-sm text-foreground"}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-white/40 bg-white/70">
            <div className="flex gap-1.5 overflow-x-auto pb-2">
              {QUICK.map((q) => (
                <button key={q} onClick={() => send(q)} className="shrink-0 text-[11px] font-semibold rounded-full bg-primary-soft text-primary px-3 py-1 hover:bg-primary hover:text-primary-foreground transition-colors">
                  {q}
                </button>
              ))}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-center gap-2 rounded-full bg-white border border-border px-4 py-2 shadow-soft">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about admissions…"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <button type="submit" className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground hover:bg-secondary transition-colors">
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-4 md:right-8 z-50 group inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground pl-3 pr-5 py-3 shadow-lift hover:bg-secondary transition-all"
        aria-label="Open admission chat"
      >
        <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-primary">
          <MessageCircle className="h-5 w-5" />
        </span>
        <span className="text-sm font-bold hidden sm:inline">Ask Admissions</span>
        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-accent animate-pulse border-2 border-primary" />
      </button>
    </>
  );
}

/* --------------------------------- Page --------------------------------- */

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Announcements />
        <LegacySection />
        <Nutshell />
        <About />
        <AccreditationStrip />
        {/* NIRFSection has been moved to its own dedicated /nirf page */}
        <Programs />
        <WhyRKGIT />
        <Recruiters />
        <CampusLife />
        <News />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
