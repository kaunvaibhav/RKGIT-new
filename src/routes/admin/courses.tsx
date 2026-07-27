import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Edit, Trash2, BookOpen } from "lucide-react";
import AdminLayout, { PageHeader, SearchBar, StatusBadge, Modal, InputField, SelectField, ConfirmDialog } from "../../components/admin/AdminLayout";
import { COURSES } from "../../components/admin/adminData";

export const Route = createFileRoute("/admin/courses")({ component: AdminCourses });
type Course = (typeof COURSES)[number];
const LEVELS = ["UG", "PG", "Diploma", "PhD"];
const CATS = ["Engineering", "Management", "Computer Applications", "Pharmacy", "Research"];
const STATUSES = ["Active", "Inactive"];
const empty = { name: "", level: "UG", duration: "", seats: 60, fees: "", eligibility: "", overview: "", category: "Engineering", status: "Active" };
const TABS = ["UG", "PG", "Diploma", "PhD"] as const;

function AdminCourses() {
  const [items, setItems] = useState<Course[]>(COURSES);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>("UG");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ ...empty });
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = items.filter((i) => i.level === activeTab && i.name.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setForm({ ...empty, level: activeTab }); setEditId(null); setShowModal(true); };
  const openEdit = (item: Course) => {
    setForm({ name: item.name, level: item.level, duration: item.duration, seats: item.seats, fees: item.fees, eligibility: item.eligibility, overview: "", category: item.category, status: item.status });
    setEditId(item.id); setShowModal(true);
  };
  const handleSave = () => {
    if (editId) setItems((p) => p.map((i) => i.id === editId ? { ...i, ...form } : i));
    else setItems((p) => [...p, { ...form, id: Date.now() } as Course]);
    setShowModal(false);
  };
  const setField = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <AdminLayout currentPage="courses">
      <PageHeader title="Courses Management" subtitle="Manage UG, PG, Diploma and PhD programmes" action={{ label: "Add Course", onClick: openAdd }} />

      {/* Stats */}
      <div className="flex flex-wrap gap-3 mb-5">
        {TABS.map((t) => (
          <div key={t} className="px-4 py-2 rounded-xl text-sm font-semibold bg-blue-50 text-blue-700">
            {t}: {items.filter((i) => i.level === t).length}
          </div>
        ))}
        <div className="px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-50 text-emerald-700">
          Total Seats: {items.reduce((s, i) => s + i.seats, 0)}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 bg-slate-100 p-1 rounded-xl w-fit">
        {TABS.map((t) => (
          <button key={t} onClick={() => setActiveTab(t)} className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === t ? "bg-white text-blue-600 shadow-sm" : "text-slate-600 hover:text-slate-800"}`}>
            {t} ({items.filter((i) => i.level === t).length})
          </button>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-5 shadow-sm flex flex-wrap gap-3 items-center">
        <SearchBar value={search} onChange={setSearch} placeholder="Search courses..." />
        <span className="text-xs text-slate-400 ml-auto">{filtered.length} courses</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <StatusBadge status={item.status} />
            </div>
            <h3 className="font-bold text-slate-800 text-sm leading-snug mb-3">{item.name}</h3>
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between"><span className="font-medium">Duration:</span><span>{item.duration}</span></div>
              <div className="flex justify-between"><span className="font-medium">Seats:</span><span>{item.seats}</span></div>
              <div className="flex justify-between"><span className="font-medium">Fees:</span><span>{item.fees}</span></div>
              <div className="flex justify-between"><span className="font-medium">Category:</span><span>{item.category}</span></div>
            </div>
            <div className="mt-3 p-2 bg-slate-50 rounded-lg text-xs text-slate-500 truncate">{item.eligibility}</div>
            <div className="flex gap-2 mt-4 pt-3 border-t border-slate-100">
              <button onClick={() => openEdit(item)} className="flex-1 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-1"><Edit className="w-3 h-3" />Edit</button>
              <button onClick={() => setDeleteId(item.id)} className="py-1.5 px-3 text-xs font-medium text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-3 text-center py-12 text-slate-400">No {activeTab} courses found.</div>
        )}
      </div>

      {showModal && (
        <Modal title={editId ? "Edit Course" : "Add Course"} onClose={() => setShowModal(false)} wide>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2"><InputField label="Course Name" value={form.name} onChange={(v) => setField("name", v)} required /></div>
            <SelectField label="Level" value={form.level} onChange={(v) => setField("level", v)} options={LEVELS} />
            <SelectField label="Category" value={form.category} onChange={(v) => setField("category", v)} options={CATS} />
            <InputField label="Duration" value={form.duration} onChange={(v) => setField("duration", v)} placeholder="4 Years" />
            <InputField label="Total Seats" value={String(form.seats)} onChange={(v) => setField("seats", parseInt(v) || 0)} type="number" />
            <InputField label="Annual Fees" value={form.fees} onChange={(v) => setField("fees", v)} placeholder="₹1,10,000/year" />
            <SelectField label="Status" value={form.status} onChange={(v) => setField("status", v)} options={STATUSES} />
            <div className="md:col-span-2"><InputField label="Eligibility" value={form.eligibility} onChange={(v) => setField("eligibility", v)} textarea rows={2} /></div>
            <div className="md:col-span-2"><InputField label="Course Overview" value={form.overview} onChange={(v) => setField("overview", v)} textarea rows={4} /></div>
          </div>
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-200">
            <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">{editId ? "Update" : "Add Course"}</button>
          </div>
        </Modal>
      )}
      {deleteId && <ConfirmDialog message="Delete this course?" onConfirm={() => { setItems((p) => p.filter((i) => i.id !== deleteId)); setDeleteId(null); }} onCancel={() => setDeleteId(null)} />}
    </AdminLayout>
  );
}
