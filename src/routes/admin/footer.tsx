import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Save, Image as ImageIcon, Link as LinkIcon, Upload } from "lucide-react";
import AdminLayout, { PageHeader, InputField } from "../../components/admin/AdminLayout";
import { VisitorCounter } from "../../components/VisitorCounter";

export const Route = createFileRoute("/admin/footer")({ component: AdminFooter });

function AdminFooter() {
  const [form, setForm] = useState({
    collegeName: "Raj Kumar Goel Institute of Technology",
    tagline: "Estd. 2000 · NAAC 'A' Accredited",
    description: "RKGIT is a premier engineering and technology institute in Ghaziabad, offering world-class education with state-of-the-art infrastructure.",
    copyright: "© 2025 Raj Kumar Goel Institute of Technology, Ghaziabad. All rights reserved.",
    privacyLink: "#", termsLink: "#", accessibilityLink: "#",
    tollFree: "1800-120-777755",
    adminLinkVisible: true, adminLinkText: "Admin Login",
  });
  const [saved, setSaved] = useState(false);
  const setField = (k: string, v: string | boolean) => { setForm((f) => ({ ...f, [k]: v })); setSaved(false); };
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 3000); };

  return (
    <AdminLayout currentPage="footer">
      <PageHeader title="Footer Management" subtitle="Customize all footer content and links" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Branding */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><ImageIcon className="w-4 h-4 text-blue-600" />Brand & Identity</h2>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center cursor-pointer hover:border-blue-400 transition-colors">
              <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
              <p className="text-xs text-slate-500">Upload Footer Logo</p>
            </div>
            <InputField label="College Name" value={form.collegeName} onChange={(v) => setField("collegeName", v)} />
            <InputField label="Tagline / Subtitle" value={form.tagline} onChange={(v) => setField("tagline", v)} />
            <InputField label="Description" value={form.description} onChange={(v) => setField("description", v)} textarea rows={3} />
          </div>
        </div>

        {/* Legal Links */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><LinkIcon className="w-4 h-4 text-blue-600" />Legal Links</h2>
          <div className="space-y-4">
            <InputField label="Copyright Text" value={form.copyright} onChange={(v) => setField("copyright", v)} textarea rows={2} />
            <InputField label="Privacy Policy URL" value={form.privacyLink} onChange={(v) => setField("privacyLink", v)} />
            <InputField label="Terms of Use URL" value={form.termsLink} onChange={(v) => setField("termsLink", v)} />
            <InputField label="Accessibility URL" value={form.accessibilityLink} onChange={(v) => setField("accessibilityLink", v)} />
          </div>
        </div>

        {/* Toll Free */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h2 className="font-bold text-slate-800 mb-4">Toll Free & Utility</h2>
          <div className="space-y-4">
            <InputField label="Toll Free Number" value={form.tollFree} onChange={(v) => setField("tollFree", v)} />
          </div>
        </div>

        {/* Admin Login Link */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h2 className="font-bold text-slate-800 mb-4">Admin Login Link (Footer)</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <input type="checkbox" id="adminLinkVisible" checked={form.adminLinkVisible} onChange={(e) => setField("adminLinkVisible", e.target.checked)} className="w-4 h-4 rounded text-blue-600" />
              <label htmlFor="adminLinkVisible" className="text-sm font-medium text-slate-700 cursor-pointer">Show Admin Login link in footer</label>
            </div>
            <InputField label="Link Text" value={form.adminLinkText} onChange={(v) => setField("adminLinkText", v)} placeholder="Admin Login" />
            <div className="p-3 bg-blue-50 rounded-lg text-xs text-blue-700">
              <p className="font-medium">Admin link will point to <code className="bg-blue-100 px-1 rounded">/admin/login</code></p>
              <p className="mt-1">This link is hidden from regular visitors and appears as small text beside Privacy Policy.</p>
            </div>
          </div>
        </div>

        {/* Quick Links Preview */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm lg:col-span-2">
          <h2 className="font-bold text-slate-800 mb-4">Footer Preview</h2>
          <div className="bg-[#1E3A5F] rounded-xl p-6 text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <div className="font-bold text-sm mb-1">{form.collegeName}</div>
                <div className="text-xs text-white/60">{form.tagline}</div>
                <p className="text-xs text-white/70 mt-2 leading-relaxed">{form.description}</p>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-blue-300 mb-3">Quick Links</div>
                <div className="space-y-1 text-xs text-white/70">{["Admissions", "Academics", "Placements", "Research", "NIRF", "Contact"].map((l) => <div key={l}>{l}</div>)}</div>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-blue-300 mb-3">Contact</div>
                <div className="space-y-1 text-xs text-white/70"><div>Ghaziabad, UP - 201003</div><div>Toll Free: {form.tollFree}</div></div>
              </div>
            </div>
            <div className="border-t border-white/10 pt-4 pb-2">
              <VisitorCounter />
            </div>
            <div className="pt-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 text-xs text-white/40">
              <span>{form.copyright}</span>
              <span className="flex gap-3">
                <span>Privacy Policy</span>
                <span>Terms</span>
                <span>Accessibility</span>
                {form.adminLinkVisible && <span className="text-white/20">{form.adminLinkText}</span>}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button onClick={handleSave} className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold shadow-lg transition-all ${saved ? "bg-emerald-500 text-white" : "bg-blue-600 text-white hover:bg-blue-700"}`}>
          <Save className="w-4 h-4" />{saved ? "Saved!" : "Save Footer"}
        </button>
      </div>
    </AdminLayout>
  );
}
