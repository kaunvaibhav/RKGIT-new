import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Edit, Trash2, Star } from "lucide-react";
import AdminLayout, { PageHeader, SearchBar, StatusBadge, Modal, InputField, SelectField, ConfirmDialog } from "../../components/admin/AdminLayout";
import { TESTIMONIALS } from "../../components/admin/adminData";

export const Route = createFileRoute("/admin/testimonials")({ component: AdminTestimonials });
type Testimonial = typeof TESTIMONIALS[number];
const TYPES = ["Alumni", "Student", "Recruiter", "Faculty"];
const STATUSES = ["Published", "Draft", "Archived"];
const empty = { name: "", type: "Alumni", batch: "", company: "", designation: "", rating: 5, content: "", status: "Draft", videoUrl: "" };

function AdminTestimonials() {
  const [items, setItems] = useState<Testimonial[]>(TESTIMONIALS);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<typeof empty>({ ...empty });
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = items.filter((i) => {
    const ms = i.name.toLowerCase().includes(search.toLowerCase()) || i.company.toLowerCase().includes(search.toLowerCase());
    const mt = filterType === "All" || i.type === filterType;
    return ms && mt;
  });

  const openAdd = () => { setForm({ ...empty }); setEditId(null); setShowModal(true); };
  const openEdit = (i: Testimonial) => { setForm({ name: i.name, type: i.type, batch: i.batch, company: i.company, designation: i.designation, rating: i.rating, content: i.content, status: i.status, videoUrl: "" }); setEditId(i.id); setShowModal(true); };
  const handleSave = () => {
    if (editId) setItems((p) => p.map((i) => i.id === editId ? { ...i, ...form } : i));
    else setItems((p) => [{ ...form, id: Date.now() } as Testimonial, ...p]);
    setShowModal(false);
  };
  const setField = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <AdminLayout currentPage="testimonials">
      <PageHeader title="Testimonials" subtitle="Student, alumni and recruiter testimonials" action={{ label: "Add Testimonial", onClick: openAdd }} />

      <div className="flex flex-wrap gap-3 mb-5">
        {["All", ...TYPES].map((t) => <button key={t} onClick={() => setFilterType(t)} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${filterType === t ? "bg-blue-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>{t} {t !== "All" ? `(${items.filter((i) => i.type === t).length})` : ""}</button>)}
        <div className="flex-1" />
        <SearchBar value={search} onChange={setSearch} placeholder="Search testimonials..." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-1">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`w-3.5 h-3.5 ${i < item.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-200"}`} />)}</div>
              <div className="flex items-center gap-1.5"><span className="text-xs bg-blue-50 text-blue-700 font-medium px-2 py-0.5 rounded-full">{item.type}</span><StatusBadge status={item.status} /></div>
            </div>
            <p className="text-sm text-slate-600 italic leading-relaxed line-clamp-3">"{item.content}"</p>
            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="font-semibold text-slate-800 text-sm">{item.name}</div>
              <div className="text-xs text-slate-500 mt-0.5">{item.designation}{item.company ? ` · ${item.company}` : ""}{item.batch ? ` · Batch ${item.batch}` : ""}</div>
            </div>
            <div className="flex gap-2 mt-3">
              <button onClick={() => openEdit(item)} className="flex-1 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-1"><Edit className="w-3 h-3" />Edit</button>
              <button onClick={() => setDeleteId(item.id)} className="py-1.5 px-3 text-xs font-medium text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="col-span-3 text-center py-12 text-slate-400 bg-white border border-slate-200 rounded-xl">No testimonials found.</div>}
      </div>

      {showModal && (
        <Modal title={editId ? "Edit Testimonial" : "Add Testimonial"} onClose={() => setShowModal(false)} wide>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2"><InputField label="Full Name" value={form.name} onChange={(v) => setField("name", v)} required /></div>
            <SelectField label="Type" value={form.type} onChange={(v) => setField("type", v)} options={TYPES} />
            <InputField label="Batch Year" value={form.batch} onChange={(v) => setField("batch", v)} placeholder="2020" />
            <InputField label="Company / Organization" value={form.company} onChange={(v) => setField("company", v)} />
            <InputField label="Designation" value={form.designation} onChange={(v) => setField("designation", v)} />
            <div className="space-y-1.5"><label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">Rating (1-5)</label><input type="range" min={1} max={5} value={form.rating} onChange={(e) => setField("rating", parseInt(e.target.value))} className="w-full" /><div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`w-4 h-4 ${i < form.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-200"}`} />)}</div></div>
            <SelectField label="Status" value={form.status} onChange={(v) => setField("status", v)} options={STATUSES} />
            <div className="md:col-span-2"><InputField label="Testimonial Content" value={form.content} onChange={(v) => setField("content", v)} textarea rows={4} required /></div>
            <div className="md:col-span-2"><InputField label="Video Testimonial URL" value={form.videoUrl} onChange={(v) => setField("videoUrl", v)} placeholder="YouTube link (optional)" /></div>
          </div>
          <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-slate-200">
            <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">{editId ? "Update" : "Add"}</button>
          </div>
        </Modal>
      )}
      {deleteId && <ConfirmDialog message="Delete this testimonial?" onConfirm={() => { setItems((p) => p.filter((i) => i.id !== deleteId)); setDeleteId(null); }} onCancel={() => setDeleteId(null)} />}
    </AdminLayout>
  );
}
