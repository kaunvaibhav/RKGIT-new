import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Edit, Trash2, TrendingUp, Building2, Users, Award } from "lucide-react";
import AdminLayout, { PageHeader, SearchBar, StatusBadge, Modal, InputField, SelectField, ConfirmDialog, StatCard } from "../../components/admin/AdminLayout";
import { PLACEMENT_STATS, RECRUITERS } from "../../components/admin/adminData";

export const Route = createFileRoute("/admin/placements")({ component: AdminPlacements });
type Recruiter = (typeof RECRUITERS)[number];
const SECTORS = ["IT", "IT/Consulting", "E-Commerce/Tech", "Technology", "Consulting", "Banking", "Manufacturing", "Research", "Others"];
const STATUSES = ["Active", "Inactive"];
const TABS = ["Statistics", "Recruiters", "Drives", "Gallery"] as const;
const emptyRecruiter = { name: "", sector: "", package: "", logo: "", studentsPlaced: 0, status: "Active" };

function AdminPlacements() {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>("Statistics");
  const [recruiters, setRecruiters] = useState<Recruiter[]>(RECRUITERS);
  const [stats, setStats] = useState({ ...PLACEMENT_STATS });
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ ...emptyRecruiter });
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editingStats, setEditingStats] = useState(false);
  const [statsForm, setStatsForm] = useState({ ...PLACEMENT_STATS });

  const filtered = recruiters.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()) || r.sector.toLowerCase().includes(search.toLowerCase()));
  const openAdd = () => { setForm({ ...emptyRecruiter }); setEditId(null); setShowModal(true); };
  const openEdit = (item: Recruiter) => { setForm({ name: item.name, sector: item.sector, package: item.package, logo: item.logo, studentsPlaced: item.studentsPlaced, status: item.status }); setEditId(item.id); setShowModal(true); };
  const handleSave = () => {
    if (editId) setRecruiters((p) => p.map((r) => r.id === editId ? { ...r, ...form } : r));
    else setRecruiters((p) => [{ ...form, id: Date.now() } as Recruiter, ...p]);
    setShowModal(false);
  };
  const setField = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <AdminLayout currentPage="placements">
      <PageHeader title="Placements Management" subtitle="Placement statistics, recruiters & drives" action={activeTab === "Recruiters" ? { label: "Add Recruiter", onClick: openAdd } : undefined} />

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-slate-100 p-1 rounded-xl w-fit">
        {TABS.map((t) => (
          <button key={t} onClick={() => setActiveTab(t)} className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === t ? "bg-white text-blue-600 shadow-sm" : "text-slate-600 hover:text-slate-800"}`}>{t}</button>
        ))}
      </div>

      {activeTab === "Statistics" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Highest Package" value={stats.highestPackage} icon={Award} color="orange" />
            <StatCard label="Average Package" value={stats.averagePackage} icon={TrendingUp} color="blue" />
            <StatCard label="Placement %" value={stats.placementPercentage} icon={Users} color="green" />
            <StatCard label="Total Offers" value={stats.offersCount.toLocaleString()} icon={Building2} color="purple" />
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-slate-800">Placement Statistics {stats.year}</h2>
              <button onClick={() => { setStatsForm({ ...stats }); setEditingStats(true); }} className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <Edit className="w-3.5 h-3.5 inline mr-1.5" />Edit Stats
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: "Highest Package", value: stats.highestPackage, color: "border-orange-200 bg-orange-50" },
                { label: "Average Package", value: stats.averagePackage, color: "border-blue-200 bg-blue-50" },
                { label: "Median Package", value: stats.medianPackage, color: "border-purple-200 bg-purple-50" },
                { label: "Placement %", value: stats.placementPercentage, color: "border-emerald-200 bg-emerald-50" },
                { label: "Total Offers", value: stats.offersCount.toLocaleString() + "+", color: "border-slate-200 bg-slate-50" },
                { label: "Companies Visited", value: stats.companiesVisited, color: "border-indigo-200 bg-indigo-50" },
              ].map((s) => (
                <div key={s.label} className={`p-4 rounded-xl border ${s.color}`}>
                  <div className="text-2xl font-black text-slate-800">{s.value}</div>
                  <div className="text-xs text-slate-500 mt-1 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {editingStats && (
            <Modal title="Edit Placement Statistics" onClose={() => setEditingStats(false)}>
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Academic Year" value={statsForm.year} onChange={(v) => setStatsForm((s) => ({ ...s, year: v }))} />
                <InputField label="Highest Package" value={statsForm.highestPackage} onChange={(v) => setStatsForm((s) => ({ ...s, highestPackage: v }))} />
                <InputField label="Average Package" value={statsForm.averagePackage} onChange={(v) => setStatsForm((s) => ({ ...s, averagePackage: v }))} />
                <InputField label="Median Package" value={statsForm.medianPackage} onChange={(v) => setStatsForm((s) => ({ ...s, medianPackage: v }))} />
                <InputField label="Placement %" value={statsForm.placementPercentage} onChange={(v) => setStatsForm((s) => ({ ...s, placementPercentage: v }))} />
                <InputField label="Total Offers" value={String(statsForm.offersCount)} onChange={(v) => setStatsForm((s) => ({ ...s, offersCount: parseInt(v) || 0 }))} type="number" />
              </div>
              <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-slate-200">
                <button onClick={() => setEditingStats(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600">Cancel</button>
                <button onClick={() => { setStats({ ...statsForm }); setEditingStats(false); }} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Save Statistics</button>
              </div>
            </Modal>
          )}
        </div>
      )}

      {activeTab === "Recruiters" && (
        <>
          <div className="bg-white border border-slate-200 rounded-xl p-4 mb-5 shadow-sm flex items-center gap-3">
            <SearchBar value={search} onChange={setSearch} placeholder="Search recruiters..." />
            <span className="text-xs text-slate-400 ml-auto">{filtered.length} companies</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-slate-200 bg-slate-50">{["Company", "Sector", "Avg Package", "Students Placed", "Status", "Actions"].map((h) => <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>)}</tr></thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">{item.name.charAt(0)}</div>
                        <span className="font-medium text-slate-800">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{item.sector}</td>
                    <td className="px-4 py-3 font-semibold text-emerald-700 whitespace-nowrap">{item.package}</td>
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{item.studentsPlaced}</td>
                    <td className="px-4 py-3 whitespace-nowrap"><StatusBadge status={item.status} /></td>
                    <td className="px-4 py-3 whitespace-nowrap"><div className="flex gap-1"><button onClick={() => openEdit(item)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"><Edit className="w-3.5 h-3.5" /></button><button onClick={() => setDeleteId(item.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showModal && (
            <Modal title={editId ? "Edit Recruiter" : "Add Recruiter"} onClose={() => setShowModal(false)}>
              <div className="space-y-4">
                <InputField label="Company Name" value={form.name} onChange={(v) => setField("name", v)} required />
                <SelectField label="Sector" value={form.sector} onChange={(v) => setField("sector", v)} options={SECTORS} />
                <InputField label="Average Package" value={form.package} onChange={(v) => setField("package", v)} placeholder="6.5 LPA" />
                <InputField label="Students Placed" value={String(form.studentsPlaced)} onChange={(v) => setField("studentsPlaced", parseInt(v) || 0)} type="number" />
                <SelectField label="Status" value={form.status} onChange={(v) => setField("status", v)} options={STATUSES} />
              </div>
              <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-slate-200">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600">Cancel</button>
                <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">{editId ? "Update" : "Add"}</button>
              </div>
            </Modal>
          )}
          {deleteId && <ConfirmDialog message="Remove this recruiter?" onConfirm={() => { setRecruiters((p) => p.filter((r) => r.id !== deleteId)); setDeleteId(null); }} onCancel={() => setDeleteId(null)} />}
        </>
      )}

      {activeTab === "Drives" && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm text-center py-16">
          <TrendingUp className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="font-bold text-slate-700">Placement Drives</h3>
          <p className="text-sm text-slate-500 mt-1">Schedule and manage campus recruitment drives</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">+ Schedule Drive</button>
        </div>
      )}

      {activeTab === "Gallery" && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm text-center py-16">
          <Award className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="font-bold text-slate-700">Placement Gallery</h3>
          <p className="text-sm text-slate-500 mt-1">Upload photos from placement drives and events</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">+ Upload Photos</button>
        </div>
      )}
    </AdminLayout>
  );
}
