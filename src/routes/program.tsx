import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer, Chatbot } from "./index";
import {
  GraduationCap,
  Award,
  BookOpen,
  CheckCircle2,
  Building2,
  Users,
  Briefcase,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

type ProgramSearch = {
  branch?: string;
};

export const Route = createFileRoute("/program")({
  validateSearch: (search: Record<string, unknown>): ProgramSearch => {
    return {
      branch: (search.branch as string) || "Computer Science and Engineering (NBA Accredited)",
    };
  },
  head: ({ search }) => {
    const branchName = search.branch || "B.Tech Program";
    return {
      meta: [
        { title: `${branchName} — RKGIT Ghaziabad` },
        {
          name: "description",
          content: `Explore ${branchName} at Raj Kumar Goel Institute of Technology (RKGIT) Ghaziabad. Curriculum, labs, placements, and eligibility.`,
        },
        { property: "og:title", content: `${branchName} — RKGIT Ghaziabad` },
        {
          property: "og:description",
          content: `Learn more about the ${branchName} undergraduate program at RKGIT Ghaziabad.`,
        },
      ],
    };
  },
  component: ProgramPage,
});

const BRANCH_DETAILS: Record<
  string,
  {
    code: string;
    duration: string;
    intake: string;
    accredited: boolean;
    description: string;
    highlights: string[];
    labs: string[];
    careers: string[];
  }
> = {
  "Computer Science and Engineering (NBA Accredited)": {
    code: "CSE",
    duration: "4 Years (8 Semesters)",
    intake: "240 Seats",
    accredited: true,
    description:
      "The Department of Computer Science & Engineering at RKGIT is NBA Accredited and designed to impart strong conceptual foundations alongside hands-on software development, AI, Cloud Computing, and Algorithmic problem-solving skills.",
    highlights: [
      "NBA Accredited Program with Tier-1 Outcome Based Education (OBE) framework",
      "Centre of Excellence in Artificial Intelligence & Machine Learning",
      "Supercharged placement record with highest CTC up to 34 LPA",
      "Regular hackathons, coding contests, and industry guest lectures",
      "Active student chapters: IEEE, CSI, and ACM Student Branch",
    ],
    labs: [
      "AI & Deep Learning Research Lab",
      "Cloud Computing & IoT Lab",
      "Advanced Java & Full Stack Lab",
      "Database & Data Mining Lab",
      "Operating Systems & Linux Lab",
    ],
    careers: [
      "Software Development Engineer (SDE)",
      "Full Stack Developer",
      "Cloud Architect",
      "Data Scientist / AI Engineer",
      "Cybersecurity Analyst",
    ],
  },
  "Computer Science": {
    code: "CS",
    duration: "4 Years (8 Semesters)",
    intake: "180 Seats",
    accredited: false,
    description:
      "A comprehensive program focusing on foundational computer science principles, system architecture, programming paradigms, and emerging software technologies.",
    highlights: [
      "Strong foundation in core computer science, software engineering, and systems",
      "Industry certification embedded modules (AWS, RedHat, Oracle)",
      "High placement rate across top IT MNCs and product startups",
      "Hands-on project work starting from the second year",
    ],
    labs: [
      "Software Engineering Lab",
      "Object Oriented Programming Lab",
      "Web Technologies Lab",
      "Computer Networks Lab",
    ],
    careers: [
      "Software Engineer",
      "Systems Programmer",
      "Database Administrator",
      "Web & Mobile Application Developer",
    ],
  },
  "Computer Science and Engineering (Artificial Intelligence and Machine Learning)": {
    code: "CSE (AI & ML)",
    duration: "4 Years (8 Semesters)",
    intake: "120 Seats",
    accredited: false,
    description:
      "Specialized B.Tech program tailored for students aspiring to lead in Artificial Intelligence, Deep Learning, Natural Language Processing, Computer Vision, and Robotics.",
    highlights: [
      "Curriculum aligned with cutting-edge AI technologies and LLM architectures",
      "Hands-on training using NVIDIA GPU acceleration clusters",
      "Collaborative research projects with industry AI labs",
      "Mentorship from leading AI researchers and industry specialists",
    ],
    labs: [
      "NVIDIA GPU Acceleration Lab",
      "Natural Language Processing & Vision Lab",
      "Machine Learning Algorithms Lab",
      "Robotics & Autonomous Systems Lab",
    ],
    careers: [
      "AI & Machine Learning Engineer",
      "NLP Researcher",
      "Computer Vision Specialist",
      "Data Scientist & Analytics Lead",
    ],
  },
  "Computer Science and Engineering (Data Science)": {
    code: "CSE (DS)",
    duration: "4 Years (8 Semesters)",
    intake: "120 Seats",
    accredited: false,
    description:
      "Designed to meet the booming global demand for data engineering, big data analytics, predictive modeling, data visualization, and business intelligence.",
    highlights: [
      "Advanced coursework in Big Data frameworks (Hadoop, Spark, Kafka)",
      "Statistical modeling, Machine Learning, and Business Intelligence focus",
      "Real-world datasets for capstone projects and internships",
      "Dedicated career coaching for Data Science and Analytics roles",
    ],
    labs: [
      "Big Data Analytics Lab",
      "Statistical Modeling & R/Python Lab",
      "Data Visualization & BI Tools Lab",
      "Predictive Analytics Lab",
    ],
    careers: [
      "Data Engineer",
      "Data Analyst",
      "Business Intelligence Developer",
      "Quantitative Analyst",
    ],
  },
  "Information Technology (NBA Accredited)": {
    code: "IT",
    duration: "4 Years (8 Semesters)",
    intake: "120 Seats",
    accredited: true,
    description:
      "NBA Accredited program preparing students in enterprise network engineering, cybersecurity, web technology, database systems, and IT infrastructure management.",
    highlights: [
      "NBA Accredited department with state-of-the-art networking labs",
      "Cisco & Red Hat Certified training modules integrated into study",
      "Robust placement record in IT consulting and service leaders",
      "Focus on enterprise solutions, DevOps, and cloud infrastructure",
    ],
    labs: [
      "Cisco Networking & Security Lab",
      "DevOps & Cloud Systems Lab",
      "Cyber Security & Forensics Lab",
      "Enterprise Resource Planning Lab",
    ],
    careers: [
      "IT Infrastructure Engineer",
      "DevOps Specialist",
      "Network Security Administrator",
      "Cloud Solutions Architect",
    ],
  },
  "Electronics and Communication Engineering (NBA Accredited)": {
    code: "ECE",
    duration: "4 Years (8 Semesters)",
    intake: "120 Seats",
    accredited: true,
    description:
      "NBA Accredited branch providing expertise in VLSI design, Embedded Systems, Signal Processing, Telecommunication, and IoT hardware integration.",
    highlights: [
      "NBA Accredited with advanced Cadence & Cadence VLSI EDA tools",
      "Embedded Systems and IoT incubation cell",
      "Strong core electronics & semiconductor placement opportunities",
      "Participation in national hardware hackathons and robotics contests",
    ],
    labs: [
      "VLSI & EDA Tools Lab",
      "Embedded Systems & Microcontrollers Lab",
      "Digital Signal & Image Processing Lab",
      "Wireless Communication & Antenna Lab",
    ],
    careers: [
      "VLSI Design Engineer",
      "Embedded Systems Engineer",
      "IoT Hardware Specialist",
      "Telecom Systems Engineer",
    ],
  },
  "Electrical and Electronics Engineering": {
    code: "EEE",
    duration: "4 Years (8 Semesters)",
    intake: "60 Seats",
    accredited: false,
    description:
      "Covers power systems, renewable energy, electric vehicle (EV) technology, power electronics, and industrial automation control systems.",
    highlights: [
      "Special emphasis on Electric Vehicles (EV) and Smart Grid technology",
      "MATLAB & Power System simulation lab setups",
      "Industrial visits to power stations and manufacturing hubs",
      "Preparation for GATE, PSU, and Core Power Sector careers",
    ],
    labs: [
      "Electric Vehicle (EV) Simulation Lab",
      "Power Electronics & Drives Lab",
      "Control Systems & PLC Lab",
      "Electrical Machines & Transformers Lab",
    ],
    careers: [
      "Power Systems Engineer",
      "Electric Vehicle (EV) Systems Engineer",
      "Automation & Control Engineer",
      "PSU & Renewable Energy Officer",
    ],
  },
  "Mechanical Engineering": {
    code: "ME",
    duration: "4 Years (8 Semesters)",
    intake: "60 Seats",
    accredited: false,
    description:
      "Delivers rigorous training in CAD/CAM, Thermal Engineering, Mechatronics, Automotive Engineering, Additive Manufacturing, and Robotics.",
    highlights: [
      "3D Printing and Rapid Prototyping Centre",
      "AutoCAD, SolidWorks, and ANSYS professional software suites",
      "Active SAE India Formula Student and BAJA Racing team",
      "Hands-on workshop training with modern CNC machinery",
    ],
    labs: [
      "CAD/CAM & 3D Printing Lab",
      "Robotics & Mechatronics Lab",
      "Thermal & Internal Combustion Engine Lab",
      "Fluid Mechanics & Hydraulics Lab",
    ],
    careers: [
      "CAD/CAM Design Engineer",
      "Automotive Engineer",
      "Robotics & Automation Specialist",
      "Manufacturing & Quality Manager",
    ],
  },
  "Civil Engineering": {
    code: "CE",
    duration: "4 Years (8 Semesters)",
    intake: "60 Seats",
    accredited: false,
    description:
      "Focuses on Structural Engineering, Environmental Engineering, Transportation, Geotechnical Engineering, BIM (Building Information Modeling), and Smart Infrastructure.",
    highlights: [
      "STAAD Pro, Revit Architecture, and Surveying with Total Station",
      "Field visits to major infrastructure construction sites",
      "Material Testing and Environmental Engineering certification",
      "Career preparation for GATE, IES, and Infrastructure Consultancies",
    ],
    labs: [
      "Structural Analysis & STAAD Lab",
      "Geotechnical & Soil Mechanics Lab",
      "Surveying & Total Station Lab",
      "Concrete Technology & Testing Lab",
    ],
    careers: [
      "Structural Engineer",
      "Site Operations Manager",
      "BIM Specialist",
      "Transportation & Urban Planner",
    ],
  },
};

function ProgramPage() {
  const { branch } = Route.useSearch();
  const selectedBranch = branch || "Computer Science and Engineering (NBA Accredited)";
  const details = BRANCH_DETAILS[selectedBranch] || BRANCH_DETAILS["Computer Science and Engineering (NBA Accredited)"];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-12 sm:py-20 bg-gradient-to-br from-primary-soft/50 via-background to-background border-b border-border overflow-hidden">
          <div className="container-page relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-6">
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span>Academics</span>
              <ChevronRight className="h-3.5 w-3.5" />
              <span>UG Programs</span>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-foreground font-semibold truncate">{selectedBranch}</span>
            </div>

            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
                  <GraduationCap className="h-4 w-4" /> B.Tech Degree
                </span>
                {details.accredited && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 text-accent-foreground px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider border border-accent/40">
                    <ShieldCheck className="h-4 w-4 text-accent" /> NBA Accredited
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 rounded-full bg-surface border border-border text-foreground px-3.5 py-1 text-xs font-semibold">
                  Branch Code: {details.code}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
                {selectedBranch}
              </h1>

              <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
                {details.description}
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="https://admission.rkgit.edu.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground text-sm font-bold px-7 py-3.5 hover:bg-secondary transition-all shadow-lift"
                >
                  Apply For Admission <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  to="/pay-fee"
                  className="inline-flex items-center gap-2 rounded-full bg-white border border-border text-foreground text-sm font-semibold px-6 py-3.5 hover:bg-accent/10 hover:border-accent transition-all shadow-soft"
                >
                  Pay Academic Fee
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Key Info Strip */}
        <section className="bg-surface border-b border-border py-6">
          <div className="container-page grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3.5">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase font-semibold">Duration</div>
                <div className="text-sm font-bold text-foreground">{details.duration}</div>
              </div>
            </div>
            <div className="flex items-center gap-3.5">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase font-semibold">Annual Intake</div>
                <div className="text-sm font-bold text-foreground">{details.intake}</div>
              </div>
            </div>
            <div className="flex items-center gap-3.5">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase font-semibold">Affiliation</div>
                <div className="text-sm font-bold text-foreground">AKTU Lucknow & AICTE</div>
              </div>
            </div>
            <div className="flex items-center gap-3.5">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase font-semibold">College Code</div>
                <div className="text-sm font-bold text-foreground">AKTU Code: 033</div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Body */}
        <section className="py-12 sm:py-20">
          <div className="container-page grid lg:grid-cols-3 gap-10">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-12">
              {/* Highlights */}
              <div className="bg-card rounded-3xl border border-border p-6 sm:p-8 shadow-card">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                  <Award className="h-6 w-6 text-primary" /> Key Program Highlights
                </h2>
                <ul className="mt-6 space-y-4">
                  {details.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground/90 font-medium">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Laboratories */}
              <div className="bg-card rounded-3xl border border-border p-6 sm:p-8 shadow-card">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                  <Building2 className="h-6 w-6 text-primary" /> Specialized Laboratories
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Equipped with modern software tools, high-speed networking, and hardware testbeds.
                </p>
                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  {details.labs.map((lab, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-2xl bg-surface border border-border p-4"
                    >
                      <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary font-bold text-sm shrink-0">
                        {i + 1}
                      </div>
                      <span className="text-sm font-semibold text-foreground">{lab}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Career Opportunities */}
              <div className="bg-card rounded-3xl border border-border p-6 sm:p-8 shadow-card">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                  <Briefcase className="h-6 w-6 text-primary" /> Career Opportunities & Pathways
                </h2>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {details.careers.map((c, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-2 rounded-2xl bg-primary-soft/80 border border-primary/20 text-primary px-4 py-2 text-sm font-bold"
                    >
                      • {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-8">
              {/* Admissions Box */}
              <div className="rounded-3xl bg-navy text-navy-foreground p-6 sm:p-8 shadow-lift relative overflow-hidden">
                <div className="absolute top-0 right-0 h-32 w-32 bg-accent/10 rounded-full blur-2xl" />
                <h3 className="text-xl font-bold text-white mb-3">Admissions 2026 Open</h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-6">
                  Secure your seat in {selectedBranch} at RKGIT Ghaziabad. Counseling through AKTU / JEE Main and Direct Admission quota.
                </p>

                <a
                  href="https://admission.rkgit.edu.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-accent text-accent-foreground font-bold px-6 py-3.5 text-sm hover:brightness-105 transition-all shadow-soft"
                >
                  Apply Online Portal <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              {/* Quick Navigation Box */}
              <div className="rounded-3xl bg-card border border-border p-6 shadow-card">
                <h3 className="text-base font-bold text-foreground mb-4">Other B.Tech Branches</h3>
                <ul className="space-y-2 text-sm">
                  {Object.keys(BRANCH_DETAILS).map((b) => {
                    const isSelected = b === selectedBranch;
                    return (
                      <li key={b}>
                        <Link
                          to="/program"
                          search={{ branch: b }}
                          className={`block px-3.5 py-2.5 rounded-xl transition-all font-medium text-xs sm:text-sm ${
                            isSelected
                              ? "bg-primary text-primary-foreground font-bold"
                              : "text-foreground/80 hover:bg-primary-soft hover:text-primary"
                          }`}
                        >
                          {b}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
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
