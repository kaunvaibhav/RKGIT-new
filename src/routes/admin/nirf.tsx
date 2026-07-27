import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Upload, Edit, BarChart3 } from "lucide-react";
import AdminLayout, { PageHeader, Modal, InputField } from "../../components/admin/AdminLayout";

export const Route = createFileRoute("/admin/nirf")({ component: AdminNIRF });

const NIRF_DATA = [
  { year: "2024", rank: "151-200", band: "Engineering", score: "45.23", teaching: "68.2", research: "35.8", graduation: "72.1", outreach: "58.4", perception: "42.1" },
  { year: "2023", rank: "151-200", band: "Engineering", score: "43.87", teaching: "66.5", research: "33.2", graduation: "70.8", outreach: "55.9", perception: "40.5" },
  { year: "2022", rank: "201-250", band: "Engineering", score: "41.12", teaching: "64.3", research: "30.1", graduation: "68.5", outreach: "52.3", perception: "38.7" },
];

const DOCS = [
  { title: "NIRF 2025 Submission", year: "2025", status: "Submitted" },
  { title: "NIRF 2024 Report", year: "2024", status: "Published" },
  { title: "NIRF 2023 Report", year: "2023", status: "Published" },
];

function AdminNIRF() {
  const [editDoc, setEditDoc] = useState(false);
  const [rankData, setRankData] = useState(NIRF_DATA[0]);

  return (
    <AdminLayout currentPage="nirf">
      <PageHeader title="NIRF Management" subtitle="National Institutional Ranking Framework data and reports" />

      {/* Current Ranking Card */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-700 rounded-2xl p-6 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-orange-200 font-medium">NIRF 2024 Ranking</div>
            <div className="text-4xl font-black mt-1">#151-200</div>
            <div className="text-orange-200 text-sm mt-1">Engineering Category · All India</div>
          </div>
          <BarChart3 className="w-16 h-16 text-orange-300/50" />
        </div>
      </div>

      {/* Historical Data Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <h2 className="font-bold text-slate-800">Historical NIRF Rankings</h2>
          <button onClick={() => setEditDoc(true)} className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1.5"><Edit className="w-3.5 h-3.5" />Update Data</button>
        </div>
        <table className="w-full text-sm">
          <thead><tr className="border-b border-slate-200 bg-slate-50">{["Year", "Rank", "Score", "Teaching", "Research", "Graduation", "Outreach", "Perception"].map((h) => <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>)}</tr></thead>
          <tbody>
            {NIRF_DATA.map((d) => (
              <tr key={d.year} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 font-bold text-slate-800">{d.year}</td>
                <td className="px-4 py-3"><span className="bg-orange-100 text-orange-700 font-bold px-2.5 py-1 rounded-lg text-xs">{d.rank}</span></td>
                <td className="px-4 py-3 font-semibold text-slate-700">{d.score}</td>
                {[d.teaching, d.research, d.graduation, d.outreach, d.perception].map((v, i) => (
                  <td key={i} className="px-4 py-3 text-slate-600">{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Documents */}
      <div>
        <h2 className="font-bold text-slate-800 mb-4">NIRF Reports & Documents</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DOCS.map((d) => (
            <div key={d.title} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-3"><BarChart3 className="w-5 h-5" /></div>
              <h3 className="font-bold text-slate-800 text-sm">{d.title}</h3>
              <div className="text-xs text-slate-500 mt-1">Year: {d.year}</div>
              <div className="flex gap-2 mt-4">
                <button className="flex-1 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-1"><Upload className="w-3 h-3" />Upload</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editDoc && (
        <Modal title="Update NIRF Data" onClose={() => setEditDoc(false)} wide>
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Year" value={rankData.year} onChange={(v) => setRankData((r) => ({ ...r, year: v }))} />
            <InputField label="Rank" value={rankData.rank} onChange={(v) => setRankData((r) => ({ ...r, rank: v }))} />
            <InputField label="Overall Score" value={rankData.score} onChange={(v) => setRankData((r) => ({ ...r, score: v }))} />
            <InputField label="Teaching & Learning" value={rankData.teaching} onChange={(v) => setRankData((r) => ({ ...r, teaching: v }))} />
            <InputField label="Research & Publication" value={rankData.research} onChange={(v) => setRankData((r) => ({ ...r, research: v }))} />
            <InputField label="Graduation Outcomes" value={rankData.graduation} onChange={(v) => setRankData((r) => ({ ...r, graduation: v }))} />
            <InputField label="Outreach & Inclusivity" value={rankData.outreach} onChange={(v) => setRankData((r) => ({ ...r, outreach: v }))} />
            <InputField label="Perception" value={rankData.perception} onChange={(v) => setRankData((r) => ({ ...r, perception: v }))} />
          </div>
          <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-slate-200">
            <button onClick={() => setEditDoc(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600">Cancel</button>
            <button onClick={() => setEditDoc(false)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Save Data</button>
          </div>
        </Modal>
      )}
    </AdminLayout>
  );
}
