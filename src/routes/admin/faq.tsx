import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Edit, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import AdminLayout, { PageHeader, SearchBar, StatusBadge, Modal, InputField, SelectField, ConfirmDialog } from "../../components/admin/AdminLayout";
import { FAQS } from "../../components/admin/adminData";

export const Route = createFileRoute("/admin/faq")({ component: AdminFAQ });
type FAQ = typeof FAQS[number];
const CATEGORIES = ["Admissions", "Fees", "Hostel", "Placements", "Academics", "Research", "General"];
const STATUSES = ["Published", "Draft"];
const empty = { question: "", answer: "", category: "General", status: "Published" };

function AdminFAQ() {
  const [items, setItems] = useState<FAQ[]>(FAQS);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ ...empty });
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = items.filter((i) => {
    const ms = i.question.toLowerCase().includes(search.toLowerCase());
    const mc = filterCat === "All" || i.category === filterCat;
    return ms && mc;
  });

  const openAdd = () => { setForm({ ...empty }); setEditId(null); setShowModal(true); };
  const openEdit = (i: FAQ) => { setForm({ question: i.question, answer: i.answer, category: i.category, status: i.status }); setEditId(i.id); setShowModal(true); };
  const handleSave = () => {
    if (editId) setItems((p) => p.map((i) => i.id === editId ? { ...i, ...form } : i));
    else setItems((p) => [...p, { ...form, id: Date.now() } as FAQ]);
    setShowModal(false);
  };
  const setField = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <AdminLayout currentPage="faq">
      <PageHeader title="FAQ Management" subtitle={`${items.length} frequently asked questions`} action={{ label: "Add FAQ", onClick: openAdd }} />

      <div className="flex flex-wrap gap-2 mb-5">
        {["All", ...CATEGORIES].map((c) => <button key={c} onClick={() => setFilterCat(c)} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${filterCat === c ? "bg-blue-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>{c}</button>)}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-5 shadow-sm flex items-center gap-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search FAQs..." />
        <span className="text-xs text-slate-400 ml-auto">{filtered.length} FAQs</span>
      </div>

      <div className="space-y-2">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="flex items-center gap-3 p-4 cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => setExpanded(expanded === item.id ? null : item.id)}>
              <button className="text-slate-400">{expanded === item.id ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}</button>
              <span className="flex-1 font-medium text-slate-800 text-sm">{item.question}</span>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{item.category}</span>
                <StatusBadge status={item.status} />
                <button onClick={(e) => { e.stopPropagation(); openEdit(item); }} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"><Edit className="w-3.5 h-3.5" /></button>
                <button onClick={(e) => { e.stopPropagation(); setDeleteId(item.id); }} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            {expanded === item.id && (
              <div className="px-4 pb-4 border-t border-slate-100 bg-slate-50">
                <p className="text-sm text-slate-600 pt-3 leading-relaxed">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && <div className="text-center py-12 text-slate-400 bg-white border border-slate-200 rounded-xl">No FAQs found.</div>}
      </div>

      {showModal && (
        <Modal title={editId ? "Edit FAQ" : "Add FAQ"} onClose={() => setShowModal(false)} wide>
          <div className="space-y-4">
            <InputField label="Question" value={form.question} onChange={(v) => setField("question", v)} required />
            <InputField label="Answer" value={form.answer} onChange={(v) => setField("answer", v)} textarea rows={5} required />
            <SelectField label="Category" value={form.category} onChange={(v) => setField("category", v)} options={CATEGORIES} />
            <SelectField label="Status" value={form.status} onChange={(v) => setField("status", v)} options={STATUSES} />
          </div>
          <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-slate-200">
            <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">{editId ? "Update" : "Add FAQ"}</button>
          </div>
        </Modal>
      )}
      {deleteId && <ConfirmDialog message="Delete this FAQ?" onConfirm={() => { setItems((p) => p.filter((i) => i.id !== deleteId)); setDeleteId(null); }} onCancel={() => setDeleteId(null)} />}
    </AdminLayout>
  );
}
