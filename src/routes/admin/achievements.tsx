import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Edit, Trash2, Trophy, Star } from "lucide-react";
import AdminLayout, { PageHeader, SearchBar, StatusBadge, Modal, InputField, SelectField, ConfirmDialog } from "../../components/admin/AdminLayout";

export const Route = createFileRoute("/admin/achievements")({ component: AdminAchievements });

const ACHIEVEMENTS = [
  { id: 1, title: "1st Prize — Smart India Hackathon 2025", category: "Student", type: "Hackathon", name: "Team Innovate (CSE)", date: "2025-03-15", status: "Published" },
  { id: 2, title: "Best Paper Award — IEEE ICTCS 2025", category: "Faculty", type: "Research", name: "Dr. Rajiv Kumar", date: "2025-02-10", status: "Published" },
  { id: 3, title: "NAAC 'A' Grade Reaccreditation", category: "Institute", type: "Accreditation", name: "RKGIT Ghaziabad", date: "2025-06-15", status: "Published" },
  { id: 4, title: "Gold Medal — State Badminton Championship", category: "Student", type: "Sports", name: "Rahul Sharma (CSE 3rd Year)", date: "2025-01-20", status: "Published" },
  { id: 5, title: "NIRF Ranking — Top 200 Engineering Colleges", category: "Institute", type: "Ranking", name: "RKGIT Ghaziabad", date: "2025-05-01", status: "Published" },
  { id: 6, title: "DST INSPIRE Fellowship", category: "Faculty", type: "Research", name: "Dr. Anita Sharma", date: "2025-04-01", status: "Published" },
];

type Achievement = typeof ACHIEVEMENTS[number];
const CATEGORIES = ["Student", "Faculty", "Institute"];
const TYPES = ["Hackathon", "Research", "Sports", "Competition", "Accreditation", "Ranking", "Award", "Others"];
const STATUSES = ["Published", "Draft"];
const empty = { title: "", category: "Student", type: "Competition", name: "", date: "", status: "Draft", description: "" };

function AdminAchievements() {
  const [items, setItems] = useState<Achievement[]>(ACHIEVEMENTS);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ ...empty });
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = items.filter((i) => {
    const ms = i.title.toLowerCase().includes(search.toLowerCase()) || i.name.toLowerCase().includes(search.toLowerCase());
    const mc = filterCat === "All" || i.category === filterCat;
    return ms && mc;
  });

  const openAdd = () => { setForm({ ...empty }); setEditId(null); setShowModal(true); };
  const openEdit = (i: Achievement) => { setForm({ title: i.title, category: i.category, type: i.type, name: i.name, date: i.date, status: i.status, description: "" }); setEditId(i.id); setShowModal(true); };
  const handleSave = () => {
    if (editId) setItems((p) => p.map((i) => i.id === editId ? { ...i, ...form } : i));
    else setItems((p) => [{ ...form, id: Date.now() } as Achievement, ...p]);
    setShowModal(false);
  };
  const setField = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));
  const catColors: Record<string, string> = { Student: "bg-blue-100 text-blue-700", Faculty: "bg-purple-100 text-purple-700", Institute: "bg-orange-100 text-orange-700" };

  return (
    <AdminLayout currentPage="achievements">
      <PageHeader title="Achievements" subtitle="Student, faculty and institute achievements" action={{ label: "Add Achievement", onClick: openAdd }} />

      <div className="flex flex-wrap gap-3 mb-5">
        {CATEGORIES.map((c) => <div key={c} className={`px-4 py-2 rounded-xl text-sm font-semibold ${catColors[c]}`}>{c}: {items.filter((i) => i.category === c).length}</div>)}
        <div className="ml-auto flex gap-2">
          {(["All", ...CATEGORIES] as string[]).map((c) => <button key={c} onClick={() => setFilterCat(c)} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${filterCat === c ? "bg-blue-600 text-white" : "bg-white border border-slate-200 text-slate-600"}`}>{c}</button>)}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-5 shadow-sm flex items-center gap-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search achievements..." />
        <span className="text-xs text-slate-400 ml-auto">{filtered.length} achievements</span>
      </div>

      <div className="space-y-3">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center shrink-0"><Trophy className="w-5 h-5" /></div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm">{item.title}</h3>
                <div className="flex flex-wrap gap-2 mt-1.5">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${catColors[item.category]}`}>{item.category}</span>
                  <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{item.type}</span>
                  <span className="text-xs text-slate-500">{item.name}</span>
                  <span className="text-xs text-slate-400">{item.date}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <StatusBadge status={item.status} />
              <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"><Edit className="w-3.5 h-3.5" /></button>
              <button onClick={() => setDeleteId(item.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="text-center py-12 text-slate-400 bg-white border border-slate-200 rounded-xl">No achievements found.</div>}
      </div>

      {showModal && (
        <Modal title={editId ? "Edit Achievement" : "Add Achievement"} onClose={() => setShowModal(false)} wide>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2"><InputField label="Achievement Title" value={form.title} onChange={(v) => setField("title", v)} required /></div>
            <SelectField label="Category" value={form.category} onChange={(v) => setField("category", v)} options={CATEGORIES} required />
            <SelectField label="Type" value={form.type} onChange={(v) => setField("type", v)} options={TYPES} />
            <InputField label="Student / Faculty / Team Name" value={form.name} onChange={(v) => setField("name", v)} required />
            <InputField label="Date" value={form.date} onChange={(v) => setField("date", v)} type="date" />
            <div className="md:col-span-2"><InputField label="Description" value={form.description} onChange={(v) => setField("description", v)} textarea rows={3} /></div>
            <SelectField label="Status" value={form.status} onChange={(v) => setField("status", v)} options={STATUSES} />
          </div>
          <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-slate-200">
            <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">{editId ? "Update" : "Add"}</button>
          </div>
        </Modal>
      )}
      {deleteId && <ConfirmDialog message="Delete this achievement?" onConfirm={() => { setItems((p) => p.filter((i) => i.id !== deleteId)); setDeleteId(null); }} onCancel={() => setDeleteId(null)} />}
    </AdminLayout>
  );
}
