import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Edit, Trash2, Music, Users, Calendar } from "lucide-react";
import AdminLayout, { PageHeader, SearchBar, Modal, InputField, SelectField, ConfirmDialog } from "../../components/admin/AdminLayout";

export const Route = createFileRoute("/admin/clubs")({ component: AdminClubs });

const CLUBS = [
  { id: 1, name: "Coding Club", type: "Technical", members: 120, lead: "Priya Gupta", email: "codingclub@rkgit.edu.in", events: 8, status: "Active" },
  { id: 2, name: "Robotics Club", type: "Technical", members: 75, lead: "Amit Singh", email: "robotics@rkgit.edu.in", events: 5, status: "Active" },
  { id: 3, name: "Cultural Club — Tarang", type: "Cultural", members: 200, lead: "Neha Verma", email: "tarang@rkgit.edu.in", events: 12, status: "Active" },
  { id: 4, name: "Photography Club — PixelArt", type: "Arts", members: 60, lead: "Rahul Mehta", email: "photo@rkgit.edu.in", events: 6, status: "Active" },
  { id: 5, name: "NSS Unit", type: "Social Service", members: 300, lead: "Dr. Suresh Verma", email: "nss@rkgit.edu.in", events: 15, status: "Active" },
  { id: 6, name: "NCC Unit", type: "Defense", members: 150, lead: "Lt. Cdr. Sharma", email: "ncc@rkgit.edu.in", events: 10, status: "Active" },
  { id: 7, name: "Sports Club", type: "Sports", members: 250, lead: "Mr. R.K. Yadav", email: "sports@rkgit.edu.in", events: 20, status: "Active" },
  { id: 8, name: "E-Cell (Entrepreneurship)", type: "Startup", members: 80, lead: "Vikas Kumar", email: "ecell@rkgit.edu.in", events: 7, status: "Active" },
];

type Club = typeof CLUBS[number];
const TYPES = ["Technical", "Cultural", "Arts", "Social Service", "Defense", "Sports", "Startup", "Academic"];
const empty = { name: "", type: "Technical", members: 0, lead: "", email: "", events: 0, status: "Active", description: "" };

function AdminClubs() {
  const [items, setItems] = useState<Club[]>(CLUBS);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ ...empty });
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));
  const openAdd = () => { setForm({ ...empty }); setEditId(null); setShowModal(true); };
  const openEdit = (i: Club) => { setForm({ name: i.name, type: i.type, members: i.members, lead: i.lead, email: i.email, events: i.events, status: i.status, description: "" }); setEditId(i.id); setShowModal(true); };
  const handleSave = () => {
    if (editId) setItems((p) => p.map((i) => i.id === editId ? { ...i, ...form } : i));
    else setItems((p) => [...p, { ...form, id: Date.now() } as Club]);
    setShowModal(false);
  };
  const setField = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));
  const typeColors: Record<string, string> = { Technical: "bg-blue-100 text-blue-700", Cultural: "bg-purple-100 text-purple-700", Arts: "bg-pink-100 text-pink-700", "Social Service": "bg-emerald-100 text-emerald-700", Defense: "bg-red-100 text-red-700", Sports: "bg-orange-100 text-orange-700", Startup: "bg-yellow-100 text-yellow-700", Academic: "bg-indigo-100 text-indigo-700" };

  return (
    <AdminLayout currentPage="clubs">
      <PageHeader title="Student Clubs" subtitle={`${items.length} clubs · ${items.reduce((s, i) => s + i.members, 0)} total members`} action={{ label: "Add Club", onClick: openAdd }} />

      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-5 shadow-sm flex items-center gap-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search clubs..." />
        <span className="text-xs text-slate-400 ml-auto">{filtered.length} clubs</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center"><Music className="w-5 h-5" /></div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${typeColors[item.type] ?? "bg-slate-100 text-slate-600"}`}>{item.type}</span>
            </div>
            <h3 className="font-bold text-slate-800 text-sm">{item.name}</h3>
            <div className="text-xs text-slate-500 mt-1">{item.lead}</div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {[{ icon: Users, label: "Members", value: item.members }, { icon: Calendar, label: "Events", value: item.events }].map(({ icon: Icon, label, value }) => (
                <div key={label} className="text-center p-2 bg-slate-50 rounded-lg">
                  <Icon className="w-3.5 h-3.5 text-blue-600 mx-auto mb-1" />
                  <div className="font-bold text-slate-800 text-sm">{value}</div>
                  <div className="text-[10px] text-slate-500">{label}</div>
                </div>
              ))}
              <div className="text-center p-2 bg-emerald-50 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mx-auto mb-1 mt-1" />
                <div className="text-[10px] font-bold text-emerald-700">{item.status}</div>
                <div className="text-[10px] text-slate-500">Status</div>
              </div>
            </div>
            <div className="flex gap-2 mt-4 pt-3 border-t border-slate-100">
              <button onClick={() => openEdit(item)} className="flex-1 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-1"><Edit className="w-3 h-3" />Edit</button>
              <button onClick={() => setDeleteId(item.id)} className="py-1.5 px-3 text-xs font-medium text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <Modal title={editId ? "Edit Club" : "Add Club"} onClose={() => setShowModal(false)}>
          <div className="space-y-4">
            <InputField label="Club Name" value={form.name} onChange={(v) => setField("name", v)} required />
            <SelectField label="Type" value={form.type} onChange={(v) => setField("type", v)} options={TYPES} />
            <InputField label="Faculty Lead / Coordinator" value={form.lead} onChange={(v) => setField("lead", v)} />
            <InputField label="Club Email" value={form.email} onChange={(v) => setField("email", v)} type="email" />
            <InputField label="Number of Members" value={String(form.members)} onChange={(v) => setField("members", parseInt(v) || 0)} type="number" />
            <InputField label="Description" value={form.description} onChange={(v) => setField("description", v)} textarea rows={3} />
          </div>
          <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-slate-200">
            <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">{editId ? "Update" : "Add Club"}</button>
          </div>
        </Modal>
      )}
      {deleteId && <ConfirmDialog message="Delete this club?" onConfirm={() => { setItems((p) => p.filter((i) => i.id !== deleteId)); setDeleteId(null); }} onCancel={() => setDeleteId(null)} />}
    </AdminLayout>
  );
}
