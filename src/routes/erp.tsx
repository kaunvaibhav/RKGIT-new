import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer, Chatbot } from "./index";
import { useState } from "react";
import {
  Lock,
  UserCheck,
  Key,
  ShieldAlert,
  Calendar,
  FileSpreadsheet,
  BookOpen,
  Clock,
  CreditCard,
  Building2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  LogOut,
} from "lucide-react";

export const Route = createFileRoute("/erp")({
  head: () => ({
    meta: [
      { title: "RKGIT ERP Portal — Student & Staff Login" },
      {
        name: "description",
        content:
          "Official RKGIT Enterprise Resource Planning (ERP) portal for students, faculty, and administrative staff. Access attendance, marks, timetable, and fees.",
      },
    ],
  }),
  component: ERPPage,
});

function ERPPage() {
  const [role, setRole] = useState<"student" | "faculty" | "parent">("student");
  const [username, setUsername] = useState("200033010001");
  const [password, setPassword] = useState("rkgit@123");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Header />

      <main className="flex-1 pt-4 pb-16">
        {/* Hero Section */}
        <section className="relative bg-navy text-white overflow-hidden py-12 md:py-16">
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-primary/50" />
          <div className="container-page relative z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent text-accent-foreground px-3.5 py-1 text-xs font-bold uppercase tracking-wider mb-3">
              <Lock className="h-3.5 w-3.5" /> Secure Enterprise Portal
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              RKGIT Unified ERP System
            </h1>
            <p className="mt-2 text-sm sm:text-base text-white/85 max-w-2xl">
              Access real-time attendance analytics, internal examination scores, LMS course material, online fee receipts, and academic schedules.
            </p>
          </div>
        </section>

        <section className="py-12 bg-muted/30">
          <div className="container-page max-w-4xl">
            {isLoggedIn ? (
              /* Demo Logged In Dashboard View */
              <div className="space-y-6 animate-fade-in">
                <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-lift flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-primary/10 text-primary grid place-items-center font-bold text-xl border border-primary/20 shrink-0">
                      RS
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mb-1">
                        ● Active Student Session
                      </div>
                      <h2 className="text-xl font-extrabold text-foreground">Rahul Sharma</h2>
                      <div className="text-xs text-muted-foreground">
                        Roll No: <strong>200033010001</strong> | B.Tech CSE (7th Sem) | Section A
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsLoggedIn(false)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-muted/40 hover:bg-muted px-4 py-2 text-xs font-bold text-foreground"
                  >
                    <LogOut className="h-3.5 w-3.5" /> Sign Out ERP
                  </button>
                </div>

                {/* Dashboard Metrics Grid */}
                <div className="grid sm:grid-cols-4 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-card border border-border shadow-xs">
                    <div className="text-muted-foreground font-medium">Overall Attendance</div>
                    <div className="text-2xl font-extrabold text-emerald-600 mt-1">87.4%</div>
                    <div className="text-[10px] text-emerald-700 mt-0.5">Eligible for Exams</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-card border border-border shadow-xs">
                    <div className="text-muted-foreground font-medium">Current CGPA</div>
                    <div className="text-2xl font-extrabold text-primary mt-1">8.65</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">AKTU Grade: Outstanding</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-card border border-border shadow-xs">
                    <div className="text-muted-foreground font-medium">Pending Dues</div>
                    <div className="text-2xl font-extrabold text-muted-foreground mt-1">₹0.00</div>
                    <div className="text-[10px] text-emerald-600 mt-0.5">All Dues Cleared</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-card border border-border shadow-xs">
                    <div className="text-muted-foreground font-medium">LMS Downloads</div>
                    <div className="text-2xl font-extrabold text-accent-foreground mt-1">42</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">Notes & Assignments</div>
                  </div>
                </div>

                {/* ERP Modules List */}
                <div className="rounded-3xl border border-border bg-card p-6 shadow-xs space-y-4">
                  <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" /> Quick Access Services
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-4 text-xs">
                    {[
                      { title: "Daily Attendance Sheet", desc: "Subject-wise lectures attended & percentage", icon: Calendar },
                      { title: "Internal Marks & Sessional", desc: "Mid-sem exam marks & assignment scores", icon: FileSpreadsheet },
                      { title: "Class Timetable & Schedule", desc: "Daily lab and lecture time table", icon: Clock },
                      { title: "Admit Card & Hall Ticket", desc: "Download AKTU end-sem exam admit card", icon: BookOpen },
                      { title: "Fee Receipts & Dues", desc: "Generate online PDF tuition fee receipt", icon: CreditCard },
                      { title: "Library E-Pass & Books", desc: "View issued books & due dates", icon: Building2 },
                    ].map((mod, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-muted/20 border border-border/60 hover:border-primary/40 transition-all cursor-pointer">
                        <mod.icon className="h-5 w-5 text-primary mb-2" />
                        <div className="font-bold text-foreground">{mod.title}</div>
                        <div className="text-[11px] text-muted-foreground mt-1">{mod.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* ERP Login Card */
              <div className="grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7 space-y-6">
                  <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-lift space-y-6">
                    {/* Role Select Tabs */}
                    <div className="flex rounded-2xl bg-muted/60 p-1 border border-border">
                      {(["student", "faculty", "parent"] as const).map((r) => (
                        <button
                          key={r}
                          onClick={() => setRole(r)}
                          className={`flex-1 py-2 text-xs font-bold rounded-xl capitalize transition-all cursor-pointer ${
                            role === r ? "bg-primary text-primary-foreground shadow-soft" : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {r} Login
                        </button>
                      ))}
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4 text-xs sm:text-sm">
                      <div>
                        <label className="block font-bold text-foreground mb-1">
                          {role === "student" ? "AKTU Roll No. / Student ID" : role === "faculty" ? "Employee Code" : "Registered Mobile / ID"}
                        </label>
                        <div className="relative">
                          <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <input
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter Roll No / ID"
                            className="w-full pl-9 pr-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/40 font-semibold"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-foreground mb-1">Password</label>
                        <div className="relative">
                          <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-9 pr-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/40"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input type="checkbox" defaultChecked className="rounded border-border" /> Remember me
                        </label>
                        <a href="#" className="text-primary hover:underline font-semibold">Forgot Password?</a>
                      </div>

                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground py-3.5 px-6 text-sm font-bold shadow-soft hover:bg-secondary transition-all cursor-pointer"
                      >
                        Sign In to ERP Portal <ArrowRight className="h-4 w-4" />
                      </button>
                    </form>
                  </div>
                </div>

                {/* Side Demo Box */}
                <div className="md:col-span-5 space-y-4">
                  <div className="p-6 rounded-3xl bg-navy text-white shadow-lift space-y-4 border border-white/10">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent text-accent-foreground px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                      Demo Credentials Notice
                    </span>
                    <h3 className="text-lg font-extrabold text-white">Interactive Demo</h3>
                    <p className="text-xs text-white/80 leading-relaxed">
                      You can click <strong>"Sign In"</strong> directly to test the student ERP dashboard.
                    </p>
                    <div className="p-3 rounded-xl bg-white/10 text-xs font-mono space-y-1 text-white/90">
                      <div>User ID: <strong>200033010001</strong></div>
                      <div>Password: <strong>rkgit@123</strong></div>
                    </div>
                  </div>
                </div>
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
