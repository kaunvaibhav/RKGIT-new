import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CreditCard, Building2, Home as HomeIcon, ShieldCheck, Loader2, ChevronRight } from "lucide-react";
import { Header, Footer, Chatbot } from "./index";
import { CustomDropdown } from "@/components/ui/CustomDropdown";

export const Route = createFileRoute("/pay-fee")({
  head: () => ({
    meta: [
      { title: "Student Fee Payment Portal — RKGIT Ghaziabad" },
      { name: "description", content: "Secure online fee payment portal for RKGIT students. Pay college and hostel fees quickly and safely." },
      { property: "og:title", content: "Student Fee Payment Portal — RKGIT" },
      { property: "og:description", content: "Enter your student details to continue with secure online fee payment." },
    ],
  }),
  component: PayFeePage,
});

const COURSES = [
  "B.Tech",
  "M.Tech",
  "MBA",
  "MCA",
  "Diploma in Pharmacy (D.Pharm)",
  "Bachelor of Pharmacy (B.Pharm)",
  "Master of Pharmacy (M.Pharm)",
] as const;

const BRANCHES: Record<string, string[]> = {
  "B.Tech": [
    "Computer Science and Engineering (CSE)",
    "Computer Science (CS)",
    "Computer Science and Engineering (Artificial Intelligence & Machine Learning)",
    "Computer Science and Engineering (Data Science)",
    "Information Technology (IT)",
    "Electronics and Communication Engineering (ECE)",
    "Electrical and Electronics Engineering (EEE)",
    "Mechanical Engineering (ME)",
    "Civil Engineering (CE)",
  ],
  "M.Tech": [
    "Computer Science and Engineering (CSE)",
    "Electronics and Communication Engineering (ECE)",
  ],
  MBA: ["General"],
  MCA: ["General"],
  "Diploma in Pharmacy (D.Pharm)": ["General"],
  "Bachelor of Pharmacy (B.Pharm)": ["General"],
  "Master of Pharmacy (M.Pharm)": ["Pharmacology", "Pharmaceutics"],
};

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

function PayFeePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    roll: "",
    name: "",
    collegeId: "",
    course: "",
    branch: "",
    year: "",
    feeType: "college" as "college" | "hostel",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const branches = useMemo(() => (form.course ? BRANCHES[form.course] ?? [] : []), [form.course]);

  const update = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => {
    setForm((f) => {
      const next = { ...f, [k]: v };
      if (k === "course") next.branch = "";
      return next;
    });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.roll.trim()) e.roll = "Roll Number is required";
    if (!form.name.trim()) e.name = "Student Name is required";
    if (!form.collegeId.trim()) e.collegeId = "College ID is required";
    if (!form.course) e.course = "Please select a course";
    if (!form.branch) e.branch = "Please select a branch";
    if (!form.year) e.year = "Please select academic year";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // Placeholder for future gateway integration (Razorpay / ICICI / SBI ePay)
    setTimeout(() => {
      setSubmitting(false);
      alert("Redirecting to secure payment gateway…\n\n(Gateway integration pending: Razorpay / ICICI / SBI ePay)");
    }, 900);
  };

  const inputCls =
    "w-full h-11 rounded-xl border border-border bg-white px-4 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all";

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-b from-primary-soft/30 via-background to-background py-10 sm:py-16">
        <div className="container-page">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-6 max-w-3xl mx-auto">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span>Student Portal</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-semibold">Pay Fee</span>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-1.5 text-xs font-semibold mb-4 border border-primary/20">
                <CreditCard className="h-3.5 w-3.5" /> Secure Fee Payment Portal
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Student Online Fee Payment
              </h1>
              <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
                Enter your academic details below to continue with secure online tuition and hostel fee payment.
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-accent">
                <ShieldCheck className="h-4 w-4" /> 256-Bit SSL Encrypted HTTPS Gateway
              </div>
            </div>

            {/* Card */}
            <form
              onSubmit={onSubmit}
              className="bg-card rounded-3xl border border-border shadow-card p-6 sm:p-10"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Roll Number" required error={errors.roll}>
                  <input
                    className={inputCls}
                    placeholder="e.g. 2100290100001"
                    value={form.roll}
                    onChange={(e) => update("roll", e.target.value)}
                  />
                </Field>
                <Field label="Student Name" required error={errors.name}>
                  <input
                    className={inputCls}
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                  />
                </Field>
                <Field label="College ID" required error={errors.collegeId}>
                  <input
                    className={inputCls}
                    placeholder="e.g. RKGIT12345"
                    value={form.collegeId}
                    onChange={(e) => update("collegeId", e.target.value)}
                  />
                </Field>
                <Field label="Course" required error={errors.course}>
                  <CustomDropdown
                    options={COURSES}
                    value={form.course}
                    onChange={(v) => update("course", v)}
                    placeholder="Select Course"
                    error={Boolean(errors.course)}
                  />
                </Field>
                <Field label="Branch / Specialization" required error={errors.branch}>
                  <CustomDropdown
                    options={branches}
                    value={form.branch}
                    onChange={(v) => update("branch", v)}
                    placeholder={form.course ? "Select Branch" : "Select Course first"}
                    disabled={!form.course}
                    error={Boolean(errors.branch)}
                  />
                </Field>
                <Field label="Academic Year" required error={errors.year}>
                  <CustomDropdown
                    options={YEARS}
                    value={form.year}
                    onChange={(v) => update("year", v)}
                    placeholder="Select Year"
                    error={Boolean(errors.year)}
                  />
                </Field>
              </div>

              {/* Fee Type */}
              <div className="mt-8">
                <label className="text-sm font-semibold text-foreground">
                  Fee Type <span className="text-accent">*</span>
                </label>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <FeeTypeCard
                    active={form.feeType === "college"}
                    onClick={() => update("feeType", "college")}
                    icon={<Building2 className="h-5 w-5" />}
                    title="College Fee"
                    desc="Tuition, exam & academic fees"
                  />
                  <FeeTypeCard
                    active={form.feeType === "hostel"}
                    onClick={() => update("feeType", "hostel")}
                    icon={<HomeIcon className="h-5 w-5" />}
                    title="Hostel Fee"
                    desc="Accommodation & mess charges"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="mt-10 flex flex-col-reverse sm:flex-row items-center gap-3 sm:justify-end">
                <button
                  type="button"
                  onClick={() => navigate({ to: "/" })}
                  className="w-full sm:w-auto rounded-full border border-border bg-white text-foreground text-sm font-semibold px-6 py-3 hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold px-7 py-3 hover:bg-secondary transition-colors shadow-soft disabled:opacity-70"
                >
                  {submitting ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Processing…</>
                  ) : (
                    <>Proceed to Payment <CreditCard className="h-4 w-4" /></>
                  )}
                </button>
              </div>

              <p className="mt-6 text-[11px] text-center text-muted-foreground">
                Payments are processed through a secure gateway. Supported methods: Razorpay, ICICI Bank, SBI ePay, Net Banking, UPI & Cards.
              </p>
            </form>
          </div>
        </div>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}

function Field({
  label, required, error, children,
}: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm font-semibold text-foreground">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function FeeTypeCard({
  active, onClick, icon, title, desc,
}: { active: boolean; onClick: () => void; icon: React.ReactNode; title: string; desc: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left rounded-2xl border-2 p-4 transition-all ${
        active
          ? "border-primary bg-primary-soft/60 shadow-soft"
          : "border-border bg-white hover:border-primary/40 hover:-translate-y-0.5"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`h-10 w-10 grid place-items-center rounded-xl ${active ? "bg-primary text-primary-foreground" : "bg-primary-soft text-primary"}`}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-sm text-foreground">{title}</div>
            <div className={`h-4 w-4 rounded-full border-2 grid place-items-center ${active ? "border-primary" : "border-border"}`}>
              {active && <div className="h-2 w-2 rounded-full bg-primary" />}
            </div>
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
        </div>
      </div>
    </button>
  );
}
