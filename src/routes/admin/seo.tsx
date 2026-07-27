import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Save, Globe, FileText, Search as SearchIcon } from "lucide-react";
import AdminLayout, { PageHeader, InputField } from "../../components/admin/AdminLayout";
import { CustomDropdown } from "../../components/ui/CustomDropdown";

export const Route = createFileRoute("/admin/seo")({ component: AdminSEO });

const PAGES = [
  { id: 1, page: "Home", url: "/", title: "RKGIT Ghaziabad — Raj Kumar Goel Institute of Technology", metaDesc: "RKGIT Ghaziabad — NAAC 'A' accredited engineering institute celebrating 26 years of academic excellence.", keywords: "RKGIT, engineering college Ghaziabad, B.Tech admission 2025", slug: "/", robots: "index, follow" },
  { id: 2, page: "NIRF", url: "/nirf", title: "NIRF Ranking — RKGIT Ghaziabad", metaDesc: "RKGIT NIRF ranking data and reports.", keywords: "NIRF, RKGIT ranking, engineering college ranking", slug: "/nirf", robots: "index, follow" },
  { id: 3, page: "Admissions", url: "/admissions", title: "Admissions 2025-26 — RKGIT Ghaziabad", metaDesc: "Apply for B.Tech, M.Tech, MBA, MCA admissions at RKGIT 2025-26.", keywords: "RKGIT admission 2025, B.Tech admission Ghaziabad, engineering college UP", slug: "/admissions", robots: "index, follow" },
  { id: 4, page: "Placements", url: "/placements", title: "Placements — 34 LPA Highest Package | RKGIT Ghaziabad", metaDesc: "RKGIT placement record 2024-25: 34 LPA highest package, 8500+ offers, 87 companies.", keywords: "RKGIT placements, campus placement, engineering placements Ghaziabad", slug: "/placements", robots: "index, follow" },
  { id: 5, page: "Contact", url: "/contact", title: "Contact RKGIT — Address, Phone & Email", metaDesc: "Contact Raj Kumar Goel Institute of Technology. Address, phone numbers and email.", keywords: "RKGIT contact, address, phone number", slug: "/contact", robots: "index, follow" },
];

type PageSEO = typeof PAGES[number];

function AdminSEO() {
  const [pages, setPages] = useState<PageSEO[]>(PAGES);
  const [selected, setSelected] = useState<PageSEO>(PAGES[0]);
  const [analyticsId, setAnalyticsId] = useState("G-XXXXXXXXXX");
  const [saved, setSaved] = useState(false);

  const updateSelected = (key: string, val: string) => {
    setSelected((s) => ({ ...s, [key]: val }));
    setPages((p) => p.map((pg) => pg.id === selected.id ? { ...pg, [key]: val } : pg));
    setSaved(false);
  };
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 3000); };

  return (
    <AdminLayout currentPage="seo">
      <PageHeader title="SEO Management" subtitle="Manage meta tags, titles and keywords for every page" />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Page List */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden h-fit">
          <div className="p-4 border-b border-slate-200"><h2 className="font-bold text-slate-800 text-sm">Pages</h2></div>
          <div className="divide-y divide-slate-100">
            {pages.map((p) => (
              <button key={p.id} onClick={() => setSelected(p)} className={`w-full text-left p-3 hover:bg-slate-50 transition-colors ${selected.id === p.id ? "bg-blue-50 border-r-2 border-blue-600" : ""}`}>
                <div className="font-medium text-slate-800 text-sm">{p.page}</div>
                <div className="text-xs text-slate-400 truncate">{p.url}</div>
              </button>
            ))}
          </div>
        </div>

        {/* SEO Editor */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4"><Globe className="w-4 h-4 text-blue-600" /><h2 className="font-bold text-slate-800">SEO Settings — {selected.page}</h2></div>
            <div className="space-y-4">
              <InputField label="Page Title (60 chars max)" value={selected.title} onChange={(v) => updateSelected("title", v)} />
              <div className="text-xs text-slate-400">Characters: {selected.title.length}/60 {selected.title.length > 60 && <span className="text-red-500">Too long!</span>}</div>
              <InputField label="Meta Description (160 chars max)" value={selected.metaDesc} onChange={(v) => updateSelected("metaDesc", v)} textarea rows={2} />
              <div className="text-xs text-slate-400">Characters: {selected.metaDesc.length}/160 {selected.metaDesc.length > 160 && <span className="text-red-500">Too long!</span>}</div>
              <InputField label="Focus Keywords (comma-separated)" value={selected.keywords} onChange={(v) => updateSelected("keywords", v)} />
              <InputField label="URL Slug" value={selected.slug} onChange={(v) => updateSelected("slug", v)} />
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">Robots</label>
                <CustomDropdown
                  options={["index, follow", "noindex, nofollow", "index, nofollow", "noindex, follow"]}
                  value={selected.robots}
                  onChange={(v) => updateSelected("robots", v)}
                  variant="admin"
                />
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><SearchIcon className="w-4 h-4 text-blue-600" />Google Search Preview</h2>
            <div className="p-4 bg-slate-50 rounded-xl">
              <div className="text-xs text-slate-400 mb-1">https://rkgit.edu.in{selected.slug}</div>
              <div className="text-blue-700 font-medium text-lg hover:underline cursor-pointer">{selected.title || "Page Title"}</div>
              <div className="text-sm text-slate-600 mt-1 leading-relaxed">{selected.metaDesc || "Meta description will appear here..."}</div>
            </div>
          </div>

          {/* Analytics */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h2 className="font-bold text-slate-800 mb-4">Analytics & Tracking</h2>
            <InputField label="Google Analytics ID" value={analyticsId} onChange={setAnalyticsId} placeholder="G-XXXXXXXXXX" />
          </div>

          <div className="flex justify-end">
            <button onClick={handleSave} className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold shadow-lg transition-all ${saved ? "bg-emerald-500 text-white" : "bg-blue-600 text-white hover:bg-blue-700"}`}>
              <Save className="w-4 h-4" />{saved ? "Saved!" : "Save SEO Settings"}
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
