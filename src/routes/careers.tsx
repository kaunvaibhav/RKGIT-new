import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer, Chatbot } from "./index";
import { useState } from "react";
import {
  Briefcase,
  Search,
  CheckCircle2,
  Calendar,
  Building2,
  FileText,
  UserCheck,
  Upload,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Career Opportunities & Faculty Recruitment — RKGIT Ghaziabad" },
      {
        name: "description",
        content:
          "Explore academic and non-teaching job openings at Raj Kumar Goel Institute of Technology (RKGIT) Ghaziabad. Apply online for Assistant Professor, Lab Technician, and Admin roles.",
      },
    ],
  }),
  component: CareersPage,
});

export const CAREER_OPENINGS = [
  { id: 1, title: "Assistant Professor — AI & Machine Learning", dept: "Computer Science & AI", qual: "M.Tech / Ph.D in CSE/AI", exp: "0–3 Years", salary: "As per AICTE / 7th Pay Scale", vacancies: 4, deadline: "August 31, 2026", status: "Open" },
  { id: 2, title: "Associate Professor — Computer Science", dept: "Computer Science", qual: "Ph.D. with 6 SCI papers", exp: "8+ Years", salary: "7th Pay Scale + HRA", vacancies: 2, deadline: "August 31, 2026", status: "Open" },
  { id: 3, title: "Professor & Head of Department (HOD)", dept: "Electrical Engineering", qual: "Ph.D. with 10+ yrs Exp", exp: "10+ Years", salary: "Negotiable / Premium Scale", vacancies: 1, deadline: "August 25, 2026", status: "Open" },
  { id: 4, title: "Assistant Professor — VLSI & Embedded Systems", dept: "Electronics & Comm", qual: "M.Tech / Ph.D in ECE", exp: "1–4 Years", salary: "As per AICTE Norms", vacancies: 3, deadline: "August 31, 2026", status: "Open" },
  { id: 5, title: "Assistant Professor — Robotics & CAD/CAM", dept: "Mechanical Engg", qual: "M.Tech in ME/Robotics", exp: "0–3 Years", salary: "As per AICTE Norms", vacancies: 2, deadline: "September 05, 2026", status: "Open" },
  { id: 6, title: "Assistant Professor — Pharmaceutics", dept: "Pharmacy (RKGITPS)", qual: "M.Pharm / Ph.D", exp: "0–3 Years", salary: "As per PCI Norms", vacancies: 3, deadline: "August 31, 2026", status: "Open" },
  { id: 7, title: "Assistant Professor — Financial Management", dept: "Management (MBA)", qual: "MBA / Ph.D in Finance", exp: "2–5 Years", salary: "As per AICTE Norms", vacancies: 2, deadline: "September 10, 2026", status: "Open" },
  { id: 8, title: "Assistant Professor — Applied Physics / Maths", dept: "Applied Sciences", qual: "Ph.D with NET qualified", exp: "1–4 Years", salary: "As per AICTE Norms", vacancies: 2, deadline: "August 31, 2026", status: "Open" },
  { id: 9, title: "Senior Lab Technician — AI & Cloud Computing", dept: "Computer Science", qual: "BCA / B.Sc / Diploma CS", exp: "2–5 Years", salary: "₹20,000 - ₹30,000 / month", vacancies: 2, deadline: "August 20, 2026", status: "Open" },
  { id: 10, title: "Hardware & Network Engineer", dept: "IT Infrastructure", qual: "B.Tech / Diploma (Networking)", exp: "3+ Years", salary: "₹25,000 - ₹35,000 / month", vacancies: 2, deadline: "August 20, 2026", status: "Open" },
  { id: 11, title: "Training & Placement Officer (TPO)", dept: "Placement Cell", qual: "MBA / B.Tech", exp: "4+ Years Corporate Exp", salary: "Competitive + Incentives", vacancies: 1, deadline: "August 25, 2026", status: "Open" },
  { id: 12, title: "Hostel Warden (Male & Female)", dept: "Hostel Administration", qual: "Graduate Any Stream", exp: "3+ Years Hostel Exp", salary: "₹22,000 + Accomodation", vacancies: 2, deadline: "August 15, 2026", status: "Open" },
  { id: 13, title: "Assistant Registrar", dept: "Administration", qual: "Master's Degree", exp: "5+ Years College Admin", salary: "As per State Rules", vacancies: 1, deadline: "August 30, 2026", status: "Open" },
  { id: 14, title: "Chief Medical Officer (Campus Clinic)", dept: "Medical Cell", qual: "MBBS Degree", exp: "3+ Years Medical Exp", salary: "₹50,000 - ₹70,000 / month", vacancies: 1, deadline: "August 30, 2026", status: "Open" },
  { id: 15, title: "Physical Education Director / Sports Coach", dept: "Sports Department", qual: "M.P.Ed / National Player", exp: "3+ Years Coaching", salary: "₹30,000 - ₹45,000 / month", vacancies: 1, deadline: "September 01, 2026", status: "Open" }
];

function CareersPage() {
  const [selectedDept, setSelectedDept] = useState("All");
  const [appliedJob, setAppliedJob] = useState<string | null>(null);

  const filteredJobs = CAREER_OPENINGS.filter((j) => {
    return selectedDept === "All" || j.dept.includes(selectedDept);
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Header />

      <main className="flex-1 pt-4 pb-16">
        {/* Hero Section */}
        <section className="relative bg-navy text-white overflow-hidden py-12 md:py-16">
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-primary/50" />
          <div className="container-page relative z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent text-accent-foreground px-3.5 py-1 text-xs font-bold uppercase tracking-wider mb-3">
              <Briefcase className="h-3.5 w-3.5" /> Join Our Team
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Careers & Faculty Recruitment
            </h1>
            <p className="mt-2 text-sm sm:text-base text-white/85 max-w-2xl">
              Build your academic and research career at RKGIT Ghaziabad. We offer competitive 7th Pay Scales, seed research grants, and vibrant campus culture.
            </p>
          </div>
        </section>

        {/* Job Table Section */}
        <section className="py-12 bg-background">
          <div className="container-page space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground">Current Openings 2026</h2>
                <p className="text-xs text-muted-foreground">Select a job post below to apply online</p>
              </div>

              <div className="w-full sm:w-64">
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-border bg-card font-semibold"
                >
                  <option value="All">All Departments</option>
                  <option value="Computer Science">Computer Science & AI</option>
                  <option value="Electronics">Electronics & Comm</option>
                  <option value="Mechanical">Mechanical Engg</option>
                  <option value="Pharmacy">Pharmacy</option>
                  <option value="Management">Management (MBA)</option>
                  <option value="Administration">Administration & Staff</option>
                </select>
              </div>
            </div>

            {/* Careers Table */}
            <div className="rounded-2xl border border-border bg-card shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-navy text-white text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-3.5">Job Designation</th>
                      <th className="px-4 py-3.5">Department</th>
                      <th className="px-4 py-3.5">Min Qualification</th>
                      <th className="px-4 py-3.5">Experience</th>
                      <th className="px-4 py-3.5">Vacancies</th>
                      <th className="px-4 py-3.5">Last Date</th>
                      <th className="px-4 py-3.5">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {filteredJobs.map((j) => (
                      <tr key={j.id} className="hover:bg-primary-soft/30 transition-colors odd:bg-background even:bg-muted/20">
                        <td className="px-4 py-3.5 font-bold text-foreground">{j.title}</td>
                        <td className="px-4 py-3.5 text-muted-foreground">{j.dept}</td>
                        <td className="px-4 py-3.5 text-foreground/80 font-medium">{j.qual}</td>
                        <td className="px-4 py-3.5 text-muted-foreground">{j.exp}</td>
                        <td className="px-4 py-3.5 font-bold text-primary">{j.vacancies} Posts</td>
                        <td className="px-4 py-3.5 text-xs text-muted-foreground">{j.deadline}</td>
                        <td className="px-4 py-3.5">
                          <button
                            onClick={() => setAppliedJob(j.title)}
                            className="inline-flex items-center gap-1 rounded-xl bg-accent text-accent-foreground px-3.5 py-1.5 text-xs font-bold shadow-soft hover:brightness-105"
                          >
                            Apply Now <ArrowRight className="h-3 w-3" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Application Modal Trigger Response */}
            {appliedJob && (
              <div className="p-6 rounded-2xl bg-card border border-primary/40 shadow-lift space-y-4 animate-fade-in">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <h3 className="text-base font-bold text-foreground">
                    Online Job Application for: <span className="text-primary">{appliedJob}</span>
                  </h3>
                  <button onClick={() => setAppliedJob(null)} className="text-xs text-muted-foreground hover:text-foreground">✕ Close</button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 text-xs">
                  <input type="text" placeholder="Full Applicant Name *" className="p-3 rounded-xl border border-border bg-background" />
                  <input type="email" placeholder="Email Address *" className="p-3 rounded-xl border border-border bg-background" />
                  <input type="tel" placeholder="Mobile Number *" className="p-3 rounded-xl border border-border bg-background" />
                  <input type="text" placeholder="Highest Qualification (Ph.D / M.Tech)" className="p-3 rounded-xl border border-border bg-background" />
                </div>
                <button
                  onClick={() => {
                    alert(`Application submitted successfully for ${appliedJob}. Our HR team will contact you.`);
                    setAppliedJob(null);
                  }}
                  className="rounded-xl bg-primary text-primary-foreground px-6 py-2.5 text-xs font-bold shadow-soft"
                >
                  Submit Curriculum Vitae (CV)
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
