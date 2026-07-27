import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Megaphone, Newspaper, Calendar, Briefcase, BookOpen,
  Building2, TrendingUp, Download, Image, Users,
  Eye, Activity, HelpCircle, CheckCircle, Clock, AlertTriangle,
} from "lucide-react";
import AdminLayout, { StatCard } from "../../components/admin/AdminLayout";
import {
  DASHBOARD_STATS, RECENT_ACTIVITIES, ANNOUNCEMENTS, NEWS, EVENTS, FACULTY,
} from "../../components/admin/adminData";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboard,
});

const VISITOR_DATA = [
  { month: "Jan", visitors: 28400 },
  { month: "Feb", visitors: 31200 },
  { month: "Mar", visitors: 35800 },
  { month: "Apr", visitors: 42100 },
  { month: "May", visitors: 45600 },
  { month: "Jun", visitors: 48290 },
  { month: "Jul", visitors: 52100 },
];

const ENQUIRY_DATA = [
  { month: "Jan", enquiries: 320 },
  { month: "Feb", enquiries: 480 },
  { month: "Mar", enquiries: 620 },
  { month: "Apr", enquiries: 890 },
  { month: "May", enquiries: 1100 },
  { month: "Jun", enquiries: 1342 },
  { month: "Jul", enquiries: 1580 },
];

function ActivityIcon({ type }: { type: string }) {
  const cfg: Record<string, { icon: React.ElementType; color: string }> = {
    success: { icon: CheckCircle, color: "text-emerald-500 bg-emerald-50" },
    info: { icon: Activity, color: "text-blue-500 bg-blue-50" },
    danger: { icon: AlertTriangle, color: "text-red-500 bg-red-50" },
    warning: { icon: Clock, color: "text-yellow-500 bg-yellow-50" },
  };
  const { icon: Icon, color } = cfg[type] ?? cfg.info;
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${color}`}>
      <Icon className="w-4 h-4" />
    </div>
  );
}

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"visitors" | "enquiries">("visitors");

  const stats = [
    { label: "Announcements", value: DASHBOARD_STATS.announcements, icon: Megaphone, color: "blue" as const },
    { label: "News Articles", value: DASHBOARD_STATS.news, icon: Newspaper, color: "indigo" as const },
    { label: "Events", value: DASHBOARD_STATS.events, icon: Calendar, color: "purple" as const },
    { label: "Courses", value: DASHBOARD_STATS.courses, icon: BookOpen, color: "teal" as const },
    { label: "Departments", value: DASHBOARD_STATS.departments, icon: Building2, color: "orange" as const },
    { label: "Faculty Members", value: DASHBOARD_STATS.faculty, icon: Users, color: "green" as const },
    { label: "Recruiter Companies", value: DASHBOARD_STATS.placementCompanies, icon: TrendingUp, color: "blue" as const },
    { label: "Job Openings", value: DASHBOARD_STATS.jobs, icon: Briefcase, color: "indigo" as const },
    { label: "Downloads", value: DASHBOARD_STATS.downloads, icon: Download, color: "teal" as const },
    { label: "Gallery Images", value: DASHBOARD_STATS.galleryImages, icon: Image, color: "purple" as const },
    { label: "Website Visitors", value: DASHBOARD_STATS.visitors.toLocaleString(), icon: Eye, color: "green" as const, change: "+8.2%" },
    { label: "Admission Enquiries", value: DASHBOARD_STATS.admissionEnquiries.toLocaleString(), icon: HelpCircle, color: "orange" as const, change: "+18.4%" },
  ];

  const publishedAnnouncements = ANNOUNCEMENTS.filter((a) => a.status === "Published").slice(0, 5);
  const upcomingEvents = EVENTS.filter((e) => e.status === "Upcoming").slice(0, 4);

  return (
    <AdminLayout currentPage="dashboard" title="Dashboard">
      {/* Greeting */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Good Morning, Admin! 👋</h1>
        <p className="text-sm text-slate-500 mt-1">
          Here's what's happening at RKGIT today · {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-6">
        {stats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} icon={s.icon} color={s.color} change={(s as any).change} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Traffic Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-bold text-slate-800">Website Analytics</h2>
              <p className="text-xs text-slate-500">Jan – Jul 2025</p>
            </div>
            <div className="flex gap-2">
              {(["visitors", "enquiries"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    activeTab === t ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {t === "visitors" ? "Visitors" : "Enquiries"}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={activeTab === "visitors" ? VISITOR_DATA : ENQUIRY_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: 12 }} />
              <Area
                type="monotone"
                dataKey={activeTab === "visitors" ? "visitors" : "enquiries"}
                stroke="#2563EB"
                strokeWidth={2.5}
                fill="url(#colorVal)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h2 className="font-bold text-slate-800 mb-4">Content Status</h2>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart
              data={[
                { name: "Pub", value: ANNOUNCEMENTS.filter((a) => a.status === "Published").length },
                { name: "Draft", value: ANNOUNCEMENTS.filter((a) => a.status === "Draft").length },
                { name: "Events", value: EVENTS.filter((e) => e.status === "Upcoming").length },
                { name: "News", value: NEWS.filter((n) => n.status === "Published").length },
                { name: "Jobs", value: 3 },
              ]}
              margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: 12 }} />
              <Bar dataKey="value" fill="#2563EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-600" /> Recent Activity
          </h2>
          <div className="space-y-3">
            {RECENT_ACTIVITIES.slice(0, 8).map((a) => (
              <div key={a.id} className="flex items-start gap-3">
                <ActivityIcon type={a.type} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">{a.action}</p>
                  <p className="text-xs text-slate-400">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Announcements */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-800 flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-blue-600" /> Latest Announcements
            </h2>
            <a href="/admin/announcements" className="text-xs text-blue-600 font-medium hover:underline">View all</a>
          </div>
          <div className="space-y-3">
            {publishedAnnouncements.map((ann) => (
              <div key={ann.id} className="p-3 bg-slate-50 rounded-lg">
                <p className="text-sm font-medium text-slate-700 leading-tight line-clamp-2">{ann.title}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] text-slate-400">{ann.publishDate}</span>
                  {ann.pinned && <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded font-medium">Pinned</span>}
                  {ann.priority === "High" && <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-medium">High</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-800 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" /> Upcoming Events
            </h2>
            <a href="/admin/events" className="text-xs text-blue-600 font-medium hover:underline">View all</a>
          </div>
          <div className="space-y-3">
            {upcomingEvents.map((ev) => (
              <div key={ev.id} className="flex gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-blue-600 text-white flex flex-col items-center justify-center text-[10px] font-bold leading-tight">
                  <span className="text-sm">{ev.date.split("-")[2]}</span>
                  <span>{new Date(ev.date).toLocaleString("en", { month: "short" })}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">{ev.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{ev.venue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
