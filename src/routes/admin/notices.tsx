import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Edit, Trash2, Archive, AlertTriangle } from "lucide-react";
import AdminLayout, { PageHeader, SearchBar, StatusBadge, Modal, InputField, SelectField, ConfirmDialog } from "../../components/admin/AdminLayout";
import { CustomDropdown } from "../../components/ui/CustomDropdown";
import { NOTICES } from "../../components/admin/adminData";

export const Route = createFileRoute("/admin/notices")({ component: AdminNotices });
type Notice = typeof NOTICES[number];
const CATEGORIES = ["Academic", "Exam", "Holiday", "Circular", "Office Order", "Placement", "Financial", "General"];
const PRIORITIES = ["High", "Medium", "Low"];
const STATUSES = ["Active", "Archived", "Draft"];
const empty = { title: "", category: "Academic", publishDate: new Date().toISOString().split("T")[0], priority: "Medium", status: "Active", content: "" };

function AdminNotices() {
  const [items, setItems] = useState<Notice[]>(NOTICES);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ ...empty });
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = items.filter((i) => {
    const ms = i.title.toLowerCase().includes(search.toLowerCase());
    const mc = filterCat === "All" || i.category === filterCat;
    return ms && mc;
  });

  const openAdd = () => { setForm({ ...empty }); setEditId(null); setShowModal(true); };
  const openEdit = (i: Notice) => { setForm({ title: i.title, category: i.category, publishDate: i.publishDate, priority: i.priority, status: i.status, content: "" }); setEditId(i.id); setShowModal(true); };
  const handleSave = () => {
    if (editId) setItems((p) => p.map((i) => i.id === editId ? { ...i, ...form } : i));
    else setItems((p) => [{ ...form, id: Date.now() } as Notice, ...p]);
    setShowModal(false);
  };
  const setField = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));
  const priorityColors: Record<string, string> = { High: "bg-red-100 text-red-700", Medium: "bg-yellow-100 text-yellow-700", Low: "bg-slate-100 text-slate-600" };

  return (
    <AdminLayout currentPage="notices">
      <PageHeader title="Notices & Circulars" subtitle={`${items.length} notices`} action={{ label: "Post Notice", onClick: openAdd }} />

      <div className="flex flex-wrap gap-3 mb-5">
        {[{ l: "Active", v: items.filter((i) => i.status === "Active").length, c: "bg-emerald-50 text-emerald-700" }, { l: "High Priority", v: items.filter((i) => i.priority === "High").length, c: "bg-red-50 text-red-700" }, { l: "Archived", v: items.filter((i) => i.status === "Archived").length, c: "bg-slate-100 text-slate-600" }].map((c) => (
          <div key={c.l} className={`px-4 py-2 rounded-xl text-sm font-semibold ${c.c}`}>{c.l}: {c.v}</div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-5 shadow-sm flex flex-wrap gap-3 items-center">
        <SearchBar value={search} onChange={setSearch} placeholder="Search notices..." />
        <div className="w-48">
          <CustomDropdown
            options={[{ value: "All", label: "All Categories" }, ...CATEGORIES.map((c) => ({ value: c, label: c }))]}
            value={filterCat}
            onChange={setFilterCat}
            variant="admin"
            size="sm"
          />
        </div>
        <span className="text-xs text-slate-400 ml-auto">{filtered.length} results</span>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-slate-200 bg-slate-50">{["Title", "Category", "Priority", "Publish Date", "Status", "Actions"].map((h) => <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>)}</tr></thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 max-w-xs">
                  <div className="flex items-center gap-2">
                    {item.priority === "High" && <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" />}
                    <span className="font-medium text-slate-800 truncate">{item.title}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{item.category}</td>
                <td className="px-4 py-3 whitespace-nowrap"><span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${priorityColors[item.priority]}`}>{item.priority}</span></td>
                <td className="px-4 py-3 text-slate-500 whitespace-nowrap text-xs">{item.publishDate}</td>
                <td className="px-4 py-3 whitespace-nowrap"><StatusBadge status={item.status} /></td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"><Edit className="w-3.5 h-3.5" /></button>
                    <button onClick={() => setItems((p) => p.map((i) => i.id === item.id ? { ...i, status: "Archived" } : i))} className="p-1.5 rounded-lg hover:bg-yellow-50 text-yellow-600 transition-colors"><Archive className="w-3.5 h-3.5" /></button>
                    <button onClick={() => setDeleteId(item.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="text-center py-12 text-slate-400">No notices found.</div>}
      </div>

      {showModal && (
        <Modal title={editId ? "Edit Notice" : "Post Notice"} onClose={() => setShowModal(false)} wide>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2"><InputField label="Notice Title" value={form.title} onChange={(v) => setField("title", v)} required /></div>
            <div className="md:col-span-2"><InputField label="Content" value={form.content} onChange={(v) => setField("content", v)} textarea rows={4} /></div>
            <SelectField label="Category" value={form.category} onChange={(v) => setField("category", v)} options={CATEGORIES} />
            <SelectField label="Priority" value={form.priority} onChange={(v) => setField("priority", v)} options={PRIORITIES} />
            <InputField label="Publish Date" value={form.publishDate} onChange={(v) => setField("publishDate", v)} type="date" />
            <SelectField label="Status" value={form.status} onChange={(v) => setField("status", v)} options={STATUSES} />
          </div>
          <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-slate-200">
            <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">{editId ? "Update" : "Publish"}</button>
          </div>
        </Modal>
      )}
      {deleteId && <ConfirmDialog message="Delete this notice?" onConfirm={() => { setItems((p) => p.filter((i) => i.id !== deleteId)); setDeleteId(null); }} onCancel={() => setDeleteId(null)} />}
    </AdminLayout>
  );
}
