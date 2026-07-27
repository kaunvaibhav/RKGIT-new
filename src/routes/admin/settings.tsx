import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Save, Upload, Palette, Globe, Bell, AlertTriangle, Eye, EyeOff } from "lucide-react";
import AdminLayout, { PageHeader, InputField } from "../../components/admin/AdminLayout";

export const Route = createFileRoute("/admin/settings")({ component: AdminSettings });

const TABS = ["General", "Appearance", "Email", "Maintenance", "Notifications"] as const;

function AdminSettings() {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>("General");
  const [saved, setSaved] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [noticeBar, setNoticeBar] = useState(true);
  const [popupEnabled, setPopupEnabled] = useState(false);

  const [form, setForm] = useState({
    collegeName: "Raj Kumar Goel Institute of Technology",
    shortName: "RKGIT",
    website: "https://www.rkgit.edu.in",
    phone: "0120-2788273",
    email: "registrar@rkgit.edu.in",
    primaryColor: "#1E3A5F",
    secondaryColor: "#2563EB",
    accentColor: "#F59E0B",
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUser: "noreply@rkgit.edu.in",
    smtpPass: "",
    noticeBarText: "🎓 Admissions Open 2025-26 — Apply Now!",
    popupTitle: "Admission Open 2025-26",
    popupContent: "B.Tech, M.Tech, MBA, MCA admissions are open. Last date: September 30, 2025.",
    maintenanceMessage: "Website is under maintenance. Please check back soon.",
  });

  const setField = (k: string, v: string) => { setForm((f) => ({ ...f, [k]: v })); setSaved(false); };
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 3000); };

  return (
    <AdminLayout currentPage="settings">
      <PageHeader title="Website Settings" subtitle="Global settings for the RKGIT website" />

      <div className="flex gap-1 mb-6 bg-slate-100 p-1 rounded-xl w-fit">
        {TABS.map((t) => <button key={t} onClick={() => setActiveTab(t)} className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === t ? "bg-white text-blue-600 shadow-sm" : "text-slate-600 hover:text-slate-800"}`}>{t}</button>)}
      </div>

      {activeTab === "General" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm lg:col-span-2">
            <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Globe className="w-4 h-4 text-blue-600" />General Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="College Full Name" value={form.collegeName} onChange={(v) => setField("collegeName", v)} />
              <InputField label="Short Name / Abbreviation" value={form.shortName} onChange={(v) => setField("shortName", v)} />
              <InputField label="Website URL" value={form.website} onChange={(v) => setField("website", v)} />
              <InputField label="Phone Number" value={form.phone} onChange={(v) => setField("phone", v)} />
              <InputField label="Primary Email" value={form.email} onChange={(v) => setField("email", v)} type="email" />
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h2 className="font-bold text-slate-800 mb-4">Logo & Favicon</h2>
            <div className="space-y-3">
              {[["Header Logo", "PNG, SVG, 400x100px recommended"], ["Favicon", "ICO, PNG, 32x32px"], ["Footer Logo", "Dark background version"]].map(([l, hint]) => (
                <div key={l} className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 text-xs font-medium shrink-0">{l.charAt(0)}</div>
                  <div className="flex-1"><div className="text-sm font-medium text-slate-700">{l}</div><div className="text-xs text-slate-400">{hint}</div></div>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"><Upload className="w-3 h-3" />Upload</button>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h2 className="font-bold text-slate-800 mb-4">Sitemap & Robots</h2>
            <div className="space-y-3 text-sm">
              {[{ label: "sitemap.xml", action: "Generate" }, { label: "robots.txt", action: "Edit" }].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-700">{item.label}</span>
                  <button className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">{item.action}</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "Appearance" && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h2 className="font-bold text-slate-800 mb-5 flex items-center gap-2"><Palette className="w-4 h-4 text-blue-600" />Brand Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[["primaryColor", "Primary Color", "Main brand color"], ["secondaryColor", "Secondary Color", "Accent / CTA color"], ["accentColor", "Accent Color", "Highlights, badges"]].map(([key, label, hint]) => (
              <div key={key} className="space-y-2">
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">{label}</label>
                <div className="flex gap-2 items-center">
                  <input type="color" value={(form as Record<string, string>)[key]} onChange={(e) => setField(key, e.target.value)} className="w-12 h-10 rounded-lg border border-slate-200 cursor-pointer p-0.5" />
                  <input type="text" value={(form as Record<string, string>)[key]} onChange={(e) => setField(key, e.target.value)} className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30" />
                </div>
                <p className="text-xs text-slate-400">{hint}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 p-4 rounded-xl border border-slate-200" style={{ background: form.primaryColor }}>
            <div className="text-white text-sm font-medium">Preview: Primary Color</div>
            <button className="mt-2 px-4 py-1.5 rounded-lg text-sm font-medium" style={{ background: form.secondaryColor, color: "white" }}>CTA Button</button>
          </div>
        </div>
      )}

      {activeTab === "Email" && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h2 className="font-bold text-slate-800 mb-5">SMTP Email Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="SMTP Host" value={form.smtpHost} onChange={(v) => setField("smtpHost", v)} />
            <InputField label="SMTP Port" value={form.smtpPort} onChange={(v) => setField("smtpPort", v)} />
            <InputField label="Username" value={form.smtpUser} onChange={(v) => setField("smtpUser", v)} />
            <InputField label="Password" value={form.smtpPass} onChange={(v) => setField("smtpPass", v)} type="password" />
          </div>
          <button className="mt-4 px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors">Test SMTP Connection</button>
        </div>
      )}

      {activeTab === "Maintenance" && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-orange-500" /><h2 className="font-bold text-slate-800">Maintenance Mode</h2></div>
              <button onClick={() => setMaintenanceMode((m) => !m)} className={`relative w-12 h-6 rounded-full transition-colors ${maintenanceMode ? "bg-orange-500" : "bg-slate-300"}`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${maintenanceMode ? "translate-x-7" : "translate-x-1"}`} />
              </button>
            </div>
            {maintenanceMode && <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-xs text-orange-700 font-medium">⚠️ Website is in Maintenance Mode. Visitors will see the maintenance page.</div>}
            <InputField label="Maintenance Message" value={form.maintenanceMessage} onChange={(v) => setField("maintenanceMessage", v)} textarea rows={2} />
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2"><Bell className="w-4 h-4 text-blue-600" /><h2 className="font-bold text-slate-800">Notice Bar</h2></div>
              <button onClick={() => setNoticeBar((n) => !n)} className={`relative w-12 h-6 rounded-full transition-colors ${noticeBar ? "bg-blue-500" : "bg-slate-300"}`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${noticeBar ? "translate-x-7" : "translate-x-1"}`} />
              </button>
            </div>
            <InputField label="Notice Bar Text" value={form.noticeBarText} onChange={(v) => setField("noticeBarText", v)} />
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-800">Popup Announcement</h2>
              <button onClick={() => setPopupEnabled((p) => !p)} className={`relative w-12 h-6 rounded-full transition-colors ${popupEnabled ? "bg-blue-500" : "bg-slate-300"}`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${popupEnabled ? "translate-x-7" : "translate-x-1"}`} />
              </button>
            </div>
            <div className="space-y-3">
              <InputField label="Popup Title" value={form.popupTitle} onChange={(v) => setField("popupTitle", v)} />
              <InputField label="Popup Content" value={form.popupContent} onChange={(v) => setField("popupContent", v)} textarea rows={3} />
            </div>
          </div>
        </div>
      )}

      {activeTab === "Notifications" && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h2 className="font-bold text-slate-800 mb-5">Notification Settings</h2>
          <div className="space-y-4">
            {[{ label: "New Admission Enquiry", desc: "Email admin when a new enquiry is submitted" }, { label: "Contact Form Submission", desc: "Email admin for contact form messages" }, { label: "Job Application Received", desc: "Notify HR for new job applications" }, { label: "System Backup Completed", desc: "Email admin after successful backup" }].map((n) => (
              <div key={n.label} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                <div><div className="font-medium text-slate-800 text-sm">{n.label}</div><div className="text-xs text-slate-500 mt-0.5">{n.desc}</div></div>
                <button className="relative w-12 h-6 rounded-full bg-blue-500">
                  <div className="absolute top-1 w-4 h-4 rounded-full bg-white shadow translate-x-7 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end mt-6">
        <button onClick={handleSave} className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold shadow-lg transition-all ${saved ? "bg-emerald-500 text-white" : "bg-blue-600 text-white hover:bg-blue-700"}`}>
          <Save className="w-4 h-4" />{saved ? "Saved!" : "Save Settings"}
        </button>
      </div>
    </AdminLayout>
  );
}
