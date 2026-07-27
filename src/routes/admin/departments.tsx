import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Edit, Trash2, Building2, Users, FlaskConical } from "lucide-react";
import AdminLayout, { PageHeader, SearchBar, StatusBadge, Modal, InputField, ConfirmDialog } from "../../components/admin/AdminLayout";
import { CustomDropdown } from "../../components/ui/CustomDropdown";
import { DEPARTMENTS } from "../../components/admin/adminData";

export const Route = createFileRoute("/admin/departments")({ component: AdminDepartments });
type Dept = (typeof DEPARTMENTS)[number];
const empty = { name: "", code: "", hod: "", faculty: 0, labs: 0, established: 2000, status: "Active", overview: "", vision: "", mission: "" };

function AdminDepartments() {
  const [items, setItems] = useState<Dept[]>(DEPARTMENTS);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ ...empty });
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()) || i.code.toLowerCase().includes(search.toLowerCase()));
  const openAdd = () => { setForm({ ...empty }); setEditId(null); setShowModal(true); };
  const openEdit = (item: Dept) => {
    setForm({ name: item.name, code: item.code, hod: item.hod, faculty: item.faculty, labs: item.labs, established: item.established, status: item.status, overview: "", vision: "", mission: "" });
    setEditId(item.id); setShowModal(true);
  };
  const handleSave = () => {
    if (editId) setItems((p) => p.map((i) => i.id === editId ? { ...i, ...form } : i));
    else setItems((p) => [...p, { ...form, id: Date.now() } as Dept]);
    setShowModal(false);
  };
  const setField = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <AdminLayout currentPage="departments">
      <PageHeader title="Departments" subtitle={`${items.length} departments · ${items.reduce((s, i) => s + i.faculty, 0)} total faculty`} action={{ label: "Add Department", onClick: openAdd }} />

      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-5 shadow-sm flex items-center gap-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search departments..." />
        <span className="text-xs text-slate-400 ml-auto">{filtered.length} departments</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm">{item.code}</div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">{item.name}</h3>
                  <div className="text-xs text-slate-500">Est. {item.established}</div>
                </div>
              </div>
              <StatusBadge status={item.status} />
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[{ icon: Users, label: "Faculty", value: item.faculty }, { icon: FlaskConical, label: "Labs", value: item.labs }].map(({ icon: Icon, label, value }) => (
                <div key={label} className="text-center p-3 bg-slate-50 rounded-xl">
                  <Icon className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                  <div className="font-bold text-slate-800 text-lg">{value}</div>
                  <div className="text-xs text-slate-500">{label}</div>
                </div>
              ))}
              <div className="text-center p-3 bg-slate-50 rounded-xl">
                <Building2 className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                <div className="font-bold text-slate-800 text-sm">{item.hod.split(" ").slice(0, 2).join(" ")}</div>
                <div className="text-xs text-slate-500">HOD</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(item)} className="flex-1 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-1"><Edit className="w-3 h-3" />Edit</button>
              <button onClick={() => setDeleteId(item.id)} className="py-1.5 px-3 text-xs font-medium text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <Modal title={editId ? "Edit Department" : "Add Department"} onClose={() => setShowModal(false)} wide>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2"><InputField label="Department Name" value={form.name} onChange={(v) => setField("name", v)} required /></div>
            <InputField label="Department Code" value={form.code} onChange={(v) => setField("code", v)} placeholder="CSE" required />
            <InputField label="Head of Department (HOD)" value={form.hod} onChange={(v) => setField("hod", v)} placeholder="Dr. Name" />
            <InputField label="Number of Faculty" value={String(form.faculty)} onChange={(v) => setField("faculty", parseInt(v) || 0)} type="number" />
            <InputField label="Number of Labs" value={String(form.labs)} onChange={(v) => setField("labs", parseInt(v) || 0)} type="number" />
            <InputField label="Established Year" value={String(form.established)} onChange={(v) => setField("established", parseInt(v) || 2000)} type="number" />
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Status</label>
              <CustomDropdown
                options={["Active", "Inactive"]}
                value={form.status}
                onChange={(v) => setField("status", v)}
                variant="admin"
              />
            </div>
            <div className="md:col-span-2"><InputField label="Overview" value={form.overview} onChange={(v) => setField("overview", v)} textarea rows={3} /></div>
            <InputField label="Vision" value={form.vision} onChange={(v) => setField("vision", v)} textarea rows={2} />
            <InputField label="Mission" value={form.mission} onChange={(v) => setField("mission", v)} textarea rows={2} />
          </div>
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-200">
            <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">{editId ? "Update" : "Add"}</button>
          </div>
        </Modal>
      )}
      {deleteId && <ConfirmDialog message="Delete this department? This will affect all associated data." onConfirm={() => { setItems((p) => p.filter((i) => i.id !== deleteId)); setDeleteId(null); }} onCancel={() => setDeleteId(null)} />}
    </AdminLayout>
  );
}
