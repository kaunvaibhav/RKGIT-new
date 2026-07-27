import { ReactNode, useState, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { CustomDropdown } from "../ui/CustomDropdown";
import {
  LayoutDashboard, Home, Megaphone, Newspaper, Calendar, Briefcase,
  BookOpen, Building2, Users, TrendingUp, GraduationCap, Download,
  Image, FlaskConical, Trophy, Star, HelpCircle, Bell, FileText,
  Award, BarChart3, CheckSquare, Phone, Navigation2, Library,
  Settings, Search, Shield, Activity, HardDrive, LogOut, Menu, X,
  ChevronDown, ChevronRight, User, Globe, School, Layers, ClipboardList,
  UserCheck, Landmark, Microscope, Music, MessageSquare,
} from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
  currentPage: string;
  title?: string;
}

type NavItem = { key: string; label: string; icon: React.ElementType; path: string };
type NavSection = { label: string; items: NavItem[] };

const NAV: NavSection[] = [
  {
    label: "Main",
    items: [{ key: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" }],
  },
  {
    label: "Content",
    items: [
      { key: "homepage", label: "Homepage", icon: Home, path: "/admin/homepage" },
      { key: "announcements", label: "Announcements", icon: Megaphone, path: "/admin/announcements" },
      { key: "news", label: "News", icon: Newspaper, path: "/admin/news" },
      { key: "events", label: "Events", icon: Calendar, path: "/admin/events" },
    ],
  },
  {
    label: "Career & Admissions",
    items: [
      { key: "careers", label: "Career Portal", icon: Briefcase, path: "/admin/careers" },
      { key: "admissions", label: "Admissions", icon: GraduationCap, path: "/admin/admissions" },
    ],
  },
  {
    label: "Academic",
    items: [
      { key: "courses", label: "Courses", icon: BookOpen, path: "/admin/courses" },
      { key: "departments", label: "Departments", icon: Building2, path: "/admin/departments" },
      { key: "faculty", label: "Faculty", icon: UserCheck, path: "/admin/faculty" },
    ],
  },
  {
    label: "Campus Life",
    items: [
      { key: "placements", label: "Placements", icon: TrendingUp, path: "/admin/placements" },
      { key: "downloads", label: "Downloads", icon: Download, path: "/admin/downloads" },
      { key: "gallery", label: "Gallery", icon: Image, path: "/admin/gallery" },
      { key: "clubs", label: "Student Clubs", icon: Music, path: "/admin/clubs" },
    ],
  },
  {
    label: "Research & Excellence",
    items: [
      { key: "research", label: "Research", icon: Microscope, path: "/admin/research" },
      { key: "achievements", label: "Achievements", icon: Trophy, path: "/admin/achievements" },
    ],
  },
  {
    label: "Information",
    items: [
      { key: "testimonials", label: "Testimonials", icon: Star, path: "/admin/testimonials" },
      { key: "faq", label: "FAQ", icon: HelpCircle, path: "/admin/faq" },
      { key: "notices", label: "Notices", icon: Bell, path: "/admin/notices" },
    ],
  },
  {
    label: "Compliance",
    items: [
      { key: "mandatory", label: "Mandatory Disclosure", icon: Landmark, path: "/admin/mandatory" },
      { key: "naac", label: "NAAC", icon: Award, path: "/admin/naac" },
      { key: "nirf", label: "NIRF", icon: BarChart3, path: "/admin/nirf" },
      { key: "iqac", label: "IQAC", icon: CheckSquare, path: "/admin/iqac" },
    ],
  },
  {
    label: "Operations",
    items: [
      { key: "contact", label: "Contact Info", icon: Phone, path: "/admin/contact" },
      { key: "navigation", label: "Navigation Menu", icon: Navigation2, path: "/admin/navigation" },
      { key: "footer", label: "Footer", icon: Layers, path: "/admin/footer" },
      { key: "media", label: "Media Library", icon: Library, path: "/admin/media" },
    ],
  },
  {
    label: "System",
    items: [
      { key: "settings", label: "Website Settings", icon: Settings, path: "/admin/settings" },
      { key: "seo", label: "SEO", icon: Globe, path: "/admin/seo" },
      { key: "users", label: "Users", icon: Users, path: "/admin/users" },
      { key: "logs", label: "Activity Logs", icon: Activity, path: "/admin/logs" },
      { key: "backup", label: "Backup", icon: HardDrive, path: "/admin/backup" },
    ],
  },
];

export default function AdminLayout({ children, currentPage, title }: AdminLayoutProps) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const loggedIn = localStorage.getItem("rkgit_admin_auth");
    if (!loggedIn) {
      navigate({ to: "/admin/login" });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("rkgit_admin_auth");
    navigate({ to: "/admin/login" });
  };

  const toggleSection = (label: string) => {
    setCollapsedSections((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
        <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center shrink-0">
          <School className="w-5 h-5 text-white" />
        </div>
        {sidebarOpen && (
          <div>
            <div className="text-white font-bold text-sm leading-tight">RKGIT Admin</div>
            <div className="text-blue-300 text-[10px]">Content Management</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 scrollbar-thin">
        {NAV.map((section) => (
          <div key={section.label} className="mb-1">
            {sidebarOpen && (
              <button
                onClick={() => toggleSection(section.label)}
                className="w-full flex items-center justify-between px-5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-blue-300/70 hover:text-blue-200 transition-colors"
              >
                {section.label}
                {collapsedSections[section.label] ? (
                  <ChevronRight className="w-3 h-3" />
                ) : (
                  <ChevronDown className="w-3 h-3" />
                )}
              </button>
            )}
            {!collapsedSections[section.label] && (
              <div>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.key;
                  return (
                    <Link
                      key={item.key}
                      to={item.path}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center gap-3 mx-2 px-3 py-2 rounded-lg mb-0.5 transition-all group ${
                        isActive
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                          : "text-slate-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <Icon className={`shrink-0 ${sidebarOpen ? "w-4 h-4" : "w-5 h-5"}`} />
                      {sidebarOpen && (
                        <span className="text-sm font-medium truncate">{item.label}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-all"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-[#1E3A5F] transition-all duration-300 shrink-0 ${
          sidebarOpen ? "w-60" : "w-16"
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <aside className="relative w-60 bg-[#1E3A5F] flex flex-col z-10">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-4 md:px-6 py-3 flex items-center gap-4 shrink-0 shadow-sm">
          <button
            onClick={() => {
              setSidebarOpen((o) => !o);
              setMobileSidebarOpen((o) => !o);
            }}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search */}
          <div className="flex-1 max-w-md relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
            />
          </div>

          <div className="flex-1 md:flex-none" />

          {/* Right side */}
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              View Site
            </a>
            <button className="relative p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                A
              </div>
              <div className="hidden md:block">
                <div className="text-xs font-semibold text-slate-700">Super Admin</div>
                <div className="text-[10px] text-slate-400">rkgit@rkgit.edu.in</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

// ─── Reusable Components ──────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color?: string;
  change?: string;
}

export function StatCard({ label, value, icon: Icon, color = "blue", change }: StatCardProps) {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-emerald-50 text-emerald-600",
    orange: "bg-orange-50 text-orange-600",
    purple: "bg-purple-50 text-purple-600",
    red: "bg-red-50 text-red-600",
    indigo: "bg-indigo-50 text-indigo-600",
    teal: "bg-teal-50 text-teal-600",
    pink: "bg-pink-50 text-pink-600",
  };
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        {change && (
          <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
            {change}
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-slate-800">{value.toLocaleString()}</div>
      <div className="text-xs text-slate-500 mt-1 font-medium">{label}</div>
    </div>
  );
}

interface StatusBadgeProps { status: string }
export function StatusBadge({ status }: StatusBadgeProps) {
  const cfg: Record<string, string> = {
    Published: "bg-emerald-100 text-emerald-700",
    Active: "bg-emerald-100 text-emerald-700",
    Open: "bg-emerald-100 text-emerald-700",
    Upcoming: "bg-blue-100 text-blue-700",
    Draft: "bg-slate-100 text-slate-600",
    Scheduled: "bg-yellow-100 text-yellow-700",
    Archived: "bg-slate-100 text-slate-500",
    Closed: "bg-red-100 text-red-600",
    Completed: "bg-purple-100 text-purple-700",
    Cancelled: "bg-red-100 text-red-600",
    Ongoing: "bg-blue-100 text-blue-700",
    "On Leave": "bg-yellow-100 text-yellow-700",
    Success: "bg-emerald-100 text-emerald-700",
    Failed: "bg-red-100 text-red-600",
    Warning: "bg-yellow-100 text-yellow-700",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${cfg[status] ?? "bg-slate-100 text-slate-600"}`}>
      {status}
    </span>
  );
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: { label: string; onClick: () => void };
}
export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-xl font-bold text-slate-800">{title}</h1>
        {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <span>+</span>
          {action.label}
        </button>
      )}
    </div>
  );
}

interface ModalProps { title: string; onClose: () => void; children: ReactNode; wide?: boolean }
export function Modal({ title, onClose, children, wide }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative bg-white rounded-2xl shadow-2xl w-full ${wide ? "max-w-3xl" : "max-w-xl"} max-h-[90vh] overflow-y-auto`}>
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <h2 className="text-base font-bold text-slate-800">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

interface InputFieldProps { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; required?: boolean; textarea?: boolean; rows?: number }
export function InputField({ label, value, onChange, type = "text", placeholder, required, textarea, rows = 3 }: InputFieldProps) {
  const cls = "w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all bg-white";
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {textarea ? (
        <textarea className={cls} rows={rows} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      ) : (
        <input className={cls} type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      )}
    </div>
  );
}

interface SelectFieldProps { label: string; value: string; onChange: (v: string) => void; options: string[]; required?: boolean; placeholder?: string }
export function SelectField({ label, value, onChange, options, required, placeholder = "Select..." }: SelectFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <CustomDropdown
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        variant="admin"
        size="md"
        required={required}
      />
    </div>
  );
}

interface ConfirmDialogProps { message: string; onConfirm: () => void; onCancel: () => void }
export function ConfirmDialog({ message, onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
          <X className="w-6 h-6 text-red-600" />
        </div>
        <h3 className="text-base font-bold text-slate-800 text-center">Confirm Delete</h3>
        <p className="text-sm text-slate-500 text-center mt-2">{message}</p>
        <div className="flex gap-3 mt-5">
          <button onClick={onCancel} className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
          <button onClick={onConfirm} className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors">Delete</button>
        </div>
      </div>
    </div>
  );
}

interface SearchBarProps { value: string; onChange: (v: string) => void; placeholder?: string }
export function SearchBar({ value, onChange, placeholder = "Search..." }: SearchBarProps) {
  return (
    <div className="relative flex-1 max-w-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
      />
    </div>
  );
}
