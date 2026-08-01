import React, { useMemo, useState } from "react";
import { CreditCard, Building2, Home as HomeIcon } from "lucide-react";
import { CustomDropdown } from "@/components/ui/CustomDropdown";
import { StudentFeeFormData } from "@/types/feePayment";

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

interface FeePaymentFormProps {
  initialValues?: StudentFeeFormData;
  onSubmit: (data: StudentFeeFormData) => void;
  onCancel: () => void;
}

export function FeePaymentForm({ initialValues, onSubmit, onCancel }: FeePaymentFormProps) {
  const [form, setForm] = useState<StudentFeeFormData>(
    initialValues || {
      roll: "",
      name: "",
      collegeId: "",
      course: "",
      branch: "",
      year: "",
      feeType: "college",
      amount: "",
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const branches = useMemo(
    () => (form.course ? BRANCHES[form.course] ?? [] : []),
    [form.course]
  );

  const update = <K extends keyof StudentFeeFormData>(k: K, v: StudentFeeFormData[K]) => {
    setForm((f) => {
      const next = { ...f, [k]: v };
      if (k === "course") next.branch = "";
      return next;
    });
    if (errors[k]) {
      setErrors((err) => {
        const next = { ...err };
        delete next[k];
        return next;
      });
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9.]/g, "");
    // Prevent multiple decimals
    const parts = val.split(".");
    const cleanVal = parts.length > 2 ? `${parts[0]}.${parts.slice(1).join("")}` : val;
    update("amount", cleanVal);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.roll.trim()) e.roll = "Roll Number is required";
    if (!form.name.trim()) e.name = "Student Name is required";
    if (!form.collegeId.trim()) e.collegeId = "College ID is required";
    if (!form.course) e.course = "Please select a course";
    if (!form.branch) e.branch = "Please select a branch";
    if (!form.year) e.year = "Please select academic year";

    const numericAmount = parseFloat(form.amount);
    if (!form.amount.trim()) {
      e.amount = "Amount to pay is required";
    } else if (isNaN(numericAmount) || numericAmount < 1) {
      e.amount = "Minimum amount must be at least ₹1";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  const inputCls =
    "w-full h-11 rounded-xl border border-border bg-white px-4 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all";

  return (
    <form
      onSubmit={handleSubmit}
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
            options={[...COURSES]}
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

        {/* Custom Amount to Pay Field with ₹ Prefix */}
        <Field label="Amount to Pay" required error={errors.amount}>
          <div className="relative">
            <span className="absolute left-4 top-2.5 text-base font-bold text-muted-foreground pointer-events-none">
              ₹
            </span>
            <input
              type="text"
              inputMode="decimal"
              className={`${inputCls} pl-9 font-semibold text-base`}
              placeholder="e.g. 60000"
              value={form.amount}
              onChange={handleAmountChange}
            />
          </div>
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
          onClick={onCancel}
          className="w-full sm:w-auto rounded-full border border-border bg-white text-foreground text-sm font-semibold px-6 py-3 hover:bg-muted transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold px-7 py-3 hover:bg-secondary transition-colors shadow-soft cursor-pointer"
        >
          Proceed to Payment <CreditCard className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-foreground">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-xs text-red-600 font-medium">{error}</p>}
    </div>
  );
}

function FeeTypeCard({
  active,
  onClick,
  icon,
  title,
  desc,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left rounded-2xl border-2 p-4 transition-all cursor-pointer ${
        active
          ? "border-primary bg-primary-soft/60 shadow-soft"
          : "border-border bg-white hover:border-primary/40 hover:-translate-y-0.5"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`h-10 w-10 grid place-items-center rounded-xl ${
            active ? "bg-primary text-primary-foreground" : "bg-primary-soft text-primary"
          }`}
        >
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-sm text-foreground">{title}</div>
            <div
              className={`h-4 w-4 rounded-full border-2 grid place-items-center ${
                active ? "border-primary" : "border-border"
              }`}
            >
              {active && <div className="h-2 w-2 rounded-full bg-primary" />}
            </div>
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
        </div>
      </div>
    </button>
  );
}
