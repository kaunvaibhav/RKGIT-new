import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer, Chatbot } from "./index";
import { useState } from "react";
import {
  GraduationCap,
  User,
  BookOpen,
  MapPin,
  Upload,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Building2,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/apply-now")({
  head: () => ({
    meta: [
      { title: "Online Admission Application Form 2026–27 — RKGIT Ghaziabad" },
      {
        name: "description",
        content:
          "Apply online for B.Tech, M.Tech, MBA, MCA, and Pharmacy admissions at Raj Kumar Goel Institute of Technology (RKGIT) Ghaziabad.",
      },
    ],
  }),
  component: ApplyNowPage,
});

function ApplyNowPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    program: "B.Tech Computer Science & Engineering",
    academicYear: "2026-27",
    category: "General",
    fullName: "",
    email: "",
    mobile: "",
    dob: "",
    fatherName: "",
    gender: "Male",
    tenthBoard: "CBSE",
    tenthPercentage: "",
    twelfthBoard: "CBSE",
    twelfthPercentage: "",
    jeeRollNo: "",
    jeeRank: "",
    address: "",
    city: "Ghaziabad",
    state: "Uttar Pradesh",
    pincode: "201003",
    hostelRequired: "Yes",
    transportRequired: "No",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Header />

      <main className="flex-1 pt-4 pb-16">
        {/* Hero Banner */}
        <section className="relative bg-navy text-white overflow-hidden py-12 md:py-16">
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-primary/50" />
          <div className="container-page relative z-10">
            <nav className="flex items-center gap-2 text-xs text-white/70 mb-3">
              <Link to="/" className="hover:text-accent">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5 opacity-50" />
              <span className="text-white font-medium">Apply Online 2026</span>
            </nav>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent text-accent-foreground px-3.5 py-1 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="h-3.5 w-3.5" /> Direct Admission Portal 2026–27
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              RKGIT Online Application Form
            </h1>
            <p className="mt-2 text-sm sm:text-base text-white/85 max-w-2xl">
              Fill out the official application form for B.Tech, M.Tech, MBA, MCA, and B.Pharm programs. Fast-track admission processing with instant document verification.
            </p>
          </div>
        </section>

        <section className="py-12 bg-muted/20">
          <div className="container-page max-w-4xl">
            {submitted ? (
              <div className="rounded-3xl border border-emerald-500/30 bg-card p-8 sm:p-12 text-center shadow-lift animate-scale-up space-y-6">
                <div className="h-20 w-20 rounded-full bg-emerald-100 text-emerald-600 grid place-items-center mx-auto">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                  Application Submitted Successfully!
                </h2>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Thank you, <strong>{formData.fullName}</strong>. Your application for <strong>{formData.program}</strong> has been registered under Application ID: <strong className="text-primary">RKGIT-2026-{Math.floor(100000 + Math.random() * 900000)}</strong>.
                </p>
                <div className="p-4 rounded-2xl bg-muted/40 text-xs text-left max-w-md mx-auto space-y-2 border border-border">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Applicant Email:</span>
                    <span className="font-bold">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mobile Helpline:</span>
                    <span className="font-bold">{formData.mobile}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">AKTU College Code:</span>
                    <span className="font-bold">033 (RKGIT Ghaziabad)</span>
                  </div>
                </div>
                <div className="pt-4 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setStep(1);
                    }}
                    className="rounded-xl bg-primary text-primary-foreground px-6 py-2.5 text-xs font-bold shadow-soft"
                  >
                    Submit Another Application
                  </button>
                  <Link
                    to="/"
                    className="rounded-xl border border-border bg-card px-6 py-2.5 text-xs font-semibold hover:bg-muted"
                  >
                    Return to Homepage
                  </Link>
                </div>
              </div>
            ) : (
              <div className="rounded-3xl border border-border bg-card shadow-lift overflow-hidden">
                {/* Step Indicators */}
                <div className="bg-navy text-white p-4 sm:p-6 grid grid-cols-4 gap-2 text-center text-xs font-semibold">
                  {[
                    { num: 1, label: "Program" },
                    { num: 2, label: "Personal" },
                    { num: 3, label: "Academic" },
                    { num: 4, label: "Review & Submit" },
                  ].map((s) => (
                    <div
                      key={s.num}
                      className={`p-2 rounded-xl border transition-all ${
                        step === s.num
                          ? "bg-accent text-accent-foreground border-accent font-bold shadow-xs"
                          : step > s.num
                            ? "bg-white/10 text-white border-white/20"
                            : "bg-white/5 text-white/50 border-transparent"
                      }`}
                    >
                      <span className="block text-[10px] uppercase opacity-80">Step 0{s.num}</span>
                      <span className="truncate block">{s.label}</span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
                  {/* Step 1: Program Selection */}
                  {step === 1 && (
                    <div className="space-y-6 animate-fade-in">
                      <h3 className="text-lg font-bold text-foreground flex items-center gap-2 border-b border-border pb-3">
                        <GraduationCap className="h-5 w-5 text-primary" /> Step 1: Select Academic Program
                      </h3>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-foreground mb-2">Academic Session</label>
                          <select
                            name="academicYear"
                            value={formData.academicYear}
                            onChange={handleChange}
                            className="w-full p-3 text-xs sm:text-sm rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/40"
                          >
                            <option value="2026-27">2026–27 (Upcoming Session)</option>
                            <option value="2025-26">2025–26 (Late Reporting)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-foreground mb-2">Category</label>
                          <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full p-3 text-xs sm:text-sm rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/40"
                          >
                            <option value="General">General / Open</option>
                            <option value="OBC">OBC (Other Backward Classes)</option>
                            <option value="SC/ST">SC / ST</option>
                            <option value="EWS">EWS (Economically Weaker Section)</option>
                            <option value="TFW">TFW (Tuition Fee Waiver)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-foreground mb-2">Degree & Branch Preference</label>
                        <select
                          name="program"
                          value={formData.program}
                          onChange={handleChange}
                          className="w-full p-3 text-xs sm:text-sm rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/40 font-semibold"
                        >
                          <option value="B.Tech Computer Science & Engineering">B.Tech Computer Science & Engineering (NBA Accredited)</option>
                          <option value="B.Tech CS (AI & Machine Learning)">B.Tech CS (Artificial Intelligence & Machine Learning)</option>
                          <option value="B.Tech CS (Data Science)">B.Tech CS (Data Science)</option>
                          <option value="B.Tech Information Technology">B.Tech Information Technology (NBA Accredited)</option>
                          <option value="B.Tech Electronics & Communication">B.Tech Electronics & Communication (NBA Accredited)</option>
                          <option value="B.Tech Electrical & Electronics">B.Tech Electrical & Electronics Engineering</option>
                          <option value="B.Tech Mechanical Engineering">B.Tech Mechanical Engineering</option>
                          <option value="B.Tech Civil Engineering">B.Tech Civil Engineering</option>
                          <option value="Bachelor of Pharmacy (B.Pharm)">Bachelor of Pharmacy (B.Pharm)</option>
                          <option value="Diploma in Pharmacy (D.Pharm)">Diploma in Pharmacy (D.Pharm)</option>
                          <option value="Master of Business Administration (MBA)">Master of Business Administration (MBA)</option>
                          <option value="Master of Computer Applications (MCA)">Master of Computer Applications (MCA)</option>
                          <option value="M.Tech Computer Science">M.Tech Computer Science</option>
                        </select>
                      </div>

                      <div className="flex justify-end pt-4">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-6 py-3 text-xs font-bold shadow-soft hover:bg-secondary"
                        >
                          Next Step <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Personal Details */}
                  {step === 2 && (
                    <div className="space-y-6 animate-fade-in">
                      <h3 className="text-lg font-bold text-foreground flex items-center gap-2 border-b border-border pb-3">
                        <User className="h-5 w-5 text-primary" /> Step 2: Personal & Contact Information
                      </h3>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-foreground mb-1.5">Candidate Full Name *</label>
                          <input
                            type="text"
                            required
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="e.g. Rahul Sharma"
                            className="w-full p-3 text-xs sm:text-sm rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/40"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-foreground mb-1.5">Father's / Guardian's Name *</label>
                          <input
                            type="text"
                            required
                            name="fatherName"
                            value={formData.fatherName}
                            onChange={handleChange}
                            placeholder="e.g. Suresh Sharma"
                            className="w-full p-3 text-xs sm:text-sm rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/40"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-foreground mb-1.5">Email Address *</label>
                          <input
                            type="email"
                            required
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="rahul@example.com"
                            className="w-full p-3 text-xs sm:text-sm rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/40"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-foreground mb-1.5">Mobile Number *</label>
                          <input
                            type="tel"
                            required
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            placeholder="+91 98765 43210"
                            className="w-full p-3 text-xs sm:text-sm rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/40"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-foreground mb-1.5">Date of Birth *</label>
                          <input
                            type="date"
                            required
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className="w-full p-3 text-xs sm:text-sm rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/40"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-foreground mb-1.5">Gender</label>
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full p-3 text-xs sm:text-sm rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/40"
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex justify-between pt-4">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-xs font-bold hover:bg-muted"
                        >
                          <ArrowLeft className="h-4 w-4" /> Back
                        </button>
                        <button
                          type="button"
                          onClick={() => setStep(3)}
                          className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-6 py-3 text-xs font-bold shadow-soft hover:bg-secondary"
                        >
                          Next Step <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Academic Qualifications */}
                  {step === 3 && (
                    <div className="space-y-6 animate-fade-in">
                      <h3 className="text-lg font-bold text-foreground flex items-center gap-2 border-b border-border pb-3">
                        <BookOpen className="h-5 w-5 text-primary" /> Step 3: Academic Record & Entrance Scores
                      </h3>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-foreground mb-1.5">Class 10th Board</label>
                          <input
                            type="text"
                            name="tenthBoard"
                            value={formData.tenthBoard}
                            onChange={handleChange}
                            placeholder="CBSE / ICSE / UP Board"
                            className="w-full p-3 text-xs sm:text-sm rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/40"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-foreground mb-1.5">10th Percentage (%) *</label>
                          <input
                            type="number"
                            required
                            name="tenthPercentage"
                            value={formData.tenthPercentage}
                            onChange={handleChange}
                            placeholder="e.g. 88.5"
                            className="w-full p-3 text-xs sm:text-sm rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/40"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-foreground mb-1.5">Class 12th / Diploma Board</label>
                          <input
                            type="text"
                            name="twelfthBoard"
                            value={formData.twelfthBoard}
                            onChange={handleChange}
                            placeholder="CBSE / UP Board"
                            className="w-full p-3 text-xs sm:text-sm rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/40"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-foreground mb-1.5">12th PCM Percentage (%) *</label>
                          <input
                            type="number"
                            required
                            name="twelfthPercentage"
                            value={formData.twelfthPercentage}
                            onChange={handleChange}
                            placeholder="e.g. 84.0"
                            className="w-full p-3 text-xs sm:text-sm rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/40"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-foreground mb-1.5">JEE Main / CUET Roll No.</label>
                          <input
                            type="text"
                            name="jeeRollNo"
                            value={formData.jeeRollNo}
                            onChange={handleChange}
                            placeholder="26031000XXXX"
                            className="w-full p-3 text-xs sm:text-sm rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/40"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-foreground mb-1.5">JEE / Entrance Rank / Percentile</label>
                          <input
                            type="text"
                            name="jeeRank"
                            value={formData.jeeRank}
                            onChange={handleChange}
                            placeholder="e.g. 91.5 Percentile"
                            className="w-full p-3 text-xs sm:text-sm rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/40"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between pt-4">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-xs font-bold hover:bg-muted"
                        >
                          <ArrowLeft className="h-4 w-4" /> Back
                        </button>
                        <button
                          type="button"
                          onClick={() => setStep(4)}
                          className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-6 py-3 text-xs font-bold shadow-soft hover:bg-secondary"
                        >
                          Review & Submit <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Review & Submit */}
                  {step === 4 && (
                    <div className="space-y-6 animate-fade-in">
                      <h3 className="text-lg font-bold text-foreground flex items-center gap-2 border-b border-border pb-3">
                        <ShieldCheck className="h-5 w-5 text-primary" /> Step 4: Final Review & Confirmation
                      </h3>

                      <div className="rounded-2xl bg-muted/30 border border-border p-5 space-y-3 text-xs sm:text-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div><span className="text-muted-foreground">Program:</span> <strong className="block">{formData.program}</strong></div>
                          <div><span className="text-muted-foreground">Category:</span> <strong className="block">{formData.category}</strong></div>
                          <div><span className="text-muted-foreground">Applicant Name:</span> <strong className="block">{formData.fullName || "N/A"}</strong></div>
                          <div><span className="text-muted-foreground">Father's Name:</span> <strong className="block">{formData.fatherName || "N/A"}</strong></div>
                          <div><span className="text-muted-foreground">Email ID:</span> <strong className="block">{formData.email || "N/A"}</strong></div>
                          <div><span className="text-muted-foreground">Mobile:</span> <strong className="block">{formData.mobile || "N/A"}</strong></div>
                          <div><span className="text-muted-foreground">12th Marks:</span> <strong className="block">{formData.twelfthPercentage}%</strong></div>
                          <div><span className="text-muted-foreground">JEE Rank/Score:</span> <strong className="block">{formData.jeeRank || "N/A"}</strong></div>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-accent/15 border border-accent/30 text-xs text-foreground/90 space-y-1">
                        <p className="font-bold flex items-center gap-1.5 text-accent-foreground">
                          <CheckCircle2 className="h-4 w-4" /> Declaration:
                        </p>
                        <p>
                          I hereby declare that all information provided above is true and accurate to the best of my knowledge. I agree to abide by AKTU and RKGIT admission rules.
                        </p>
                      </div>

                      <div className="flex justify-between pt-4">
                        <button
                          type="button"
                          onClick={() => setStep(3)}
                          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-xs font-bold hover:bg-muted"
                        >
                          <ArrowLeft className="h-4 w-4" /> Edit Details
                        </button>
                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 rounded-xl bg-accent text-accent-foreground px-8 py-3 text.sm font-extrabold shadow-lift hover:brightness-105"
                        >
                          Submit Admission Application <CheckCircle2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </form>
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
