import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Edit, Trash2, Mail, Phone, Linkedin } from "lucide-react";
import AdminLayout, { PageHeader, SearchBar, StatusBadge, Modal, InputField, SelectField, ConfirmDialog } from "../../components/admin/AdminLayout";
import { CustomDropdown } from "../../components/ui/CustomDropdown";
import { FACULTY } from "../../components/admin/adminData";

export const Route = createFileRoute("/admin/faculty")({ component: AdminFaculty });
type FacultyMember = (typeof FACULTY)[number];
const DEPARTMENTS = ["CSE", "ECE", "ME", "CE", "EE", "MBA", "MCA", "PHARM"];
const DESIGNATIONS = ["Professor & HOD", "Professor", "Associate Professor", "Assistant Professor", "Lecturer", "Visiting Faculty"];
const STATUSES = ["Active", "On Leave", "Inactive"];
const empty = { name: "", department: "", designation: "Assistant Professor", qualification: "", experience: "", email: "", phone: "", specialization: "", status: "Active", linkedin: "", googleScholar: "", researchGate: "", achievements: "" };

function AdminFaculty() {
  const [items, setItems] = useState<FacultyMember[]>(FACULTY);
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("All");
  const [filterDesig, setFilterDesig] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ ...empty });
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [view, setView] = useState<"table" | "cards">("cards");

  const filtered = items.filter((i) => {
    const ms = i.name.toLowerCase().includes(search.toLowerCase()) || i.specialization.toLowerCase().includes(search.toLowerCase());
    const md = filterDept === "All" || i.department === filterDept;
    const mds = filterDesig === "All" || i.designation === filterDesig;
    return ms && md && mds;
  });

  const openAdd = () => { setForm({ ...empty }); setEditId(null); setShowModal(true); };
  const openEdit = (item: FacultyMember) => {
    setForm({ name: item.name, department: item.department, designation: item.designation, qualification: item.qualification, experience: item.experience, email: item.email, phone: item.phone, specialization: item.specialization, status: item.status, linkedin: "", googleScholar: "", researchGate: "", achievements: "" });
    setEditId(item.id); setShowModal(true);
  };
  const handleSave = () => {
    if (editId) setItems((p) => p.map((i) => i.id === editId ? { ...i, ...form } : i));
    else setItems((p) => [{ ...form, id: Date.now() } as FacultyMember, ...p]);
    setShowModal(false);
  };
  const setField = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  const initials = (name: string) => name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
  const colors = ["bg-blue-600", "bg-purple-600", "bg-emerald-600", "bg-orange-500", "bg-pink-600", "bg-indigo-600", "bg-teal-600", "bg-red-500"];

  return (
    <AdminLayout currentPage="faculty">
      <PageHeader title="Faculty Management" subtitle={`${items.length} faculty members`} action={{ label: "Add Faculty", onClick: openAdd }} />

      <div className="flex flex-wrap gap-3 mb-5">
        {DEPARTMENTS.map((d) => (
          <div key={d} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700">{d}: {items.filter((i) => i.department === d).length}</div>
        ))}
        <div className="ml-auto flex gap-2">
          {(["cards", "table"] as const).map((v) => (
            <button key={v} onClick={() => setView(v)} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${view === v ? "bg-blue-600 text-white" : "bg-white border border-slate-200 text-slate-600"}`}>{v === "cards" ? "Cards" : "Table"}</button>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-5 shadow-sm flex flex-wrap gap-3 items-center">
        <SearchBar value={search} onChange={setSearch} placeholder="Search faculty..." />
        <div className="w-48">
          <CustomDropdown
            options={[{ value: "All", label: "All Departments" }, ...DEPARTMENTS.map((d) => ({ value: d, label: d }))]}
            value={filterDept}
            onChange={setFilterDept}
            variant="admin"
            size="sm"
          />
        </div>
        <div className="w-52">
          <CustomDropdown
            options={[{ value: "All", label: "All Designations" }, ...DESIGNATIONS.map((d) => ({ value: d, label: d }))]}
            value={filterDesig}
            onChange={setFilterDesig}
            variant="admin"
            size="sm"
          />
        </div>
        <span className="text-xs text-slate-400 ml-auto">{filtered.length} members</span>
      </div>

      {view === "cards" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((item, idx) => (
            <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-14 h-14 rounded-2xl ${colors[idx % colors.length]} text-white flex items-center justify-center font-bold text-lg`}>
                  {initials(item.name)}
                </div>
                <StatusBadge status={item.status} />
              </div>
              <h3 className="font-bold text-slate-800 text-sm">{item.name}</h3>
              <div className="text-xs text-blue-600 font-medium mt-0.5">{item.designation}</div>
              <div className="text-xs text-slate-500 mt-0.5">{item.department}</div>
              <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                <div className="truncate"><span className="font-medium">Qual:</span> {item.qualification}</div>
                <div><span className="font-medium">Exp:</span> {item.experience}</div>
                <div className="truncate text-slate-500">{item.specialization}</div>
              </div>
              <div className="flex gap-1.5 mt-3 pt-3 border-t border-slate-100">
                <a href={`mailto:${item.email}`} className="p-1.5 rounded-lg bg-slate-50 text-slate-500 hover:text-blue-600 transition-colors"><Mail className="w-3.5 h-3.5" /></a>
                <a href={`tel:${item.phone}`} className="p-1.5 rounded-lg bg-slate-50 text-slate-500 hover:text-emerald-600 transition-colors"><Phone className="w-3.5 h-3.5" /></a>
                <a href="#" className="p-1.5 rounded-lg bg-slate-50 text-slate-500 hover:text-blue-700 transition-colors"><Linkedin className="w-3.5 h-3.5" /></a>
                <div className="flex-1" />
                <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"><Edit className="w-3.5 h-3.5" /></button>
                <button onClick={() => setDeleteId(item.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div className="col-span-4 text-center py-12 text-slate-400">No faculty members found.</div>}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                {["Name", "Department", "Designation", "Qualification", "Experience", "Specialization", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3"><div className="font-medium text-slate-800">{item.name}</div><div className="text-xs text-slate-400">{item.email}</div></td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{item.department}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap text-xs">{item.designation}</td>
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap text-xs">{item.qualification}</td>
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap text-xs">{item.experience}</td>
                  <td className="px-4 py-3 max-w-[160px]"><div className="text-xs text-slate-600 truncate">{item.specialization}</div></td>
                  <td className="px-4 py-3 whitespace-nowrap"><StatusBadge status={item.status} /></td>
                  <td className="px-4 py-3 whitespace-nowrap"><div className="flex gap-1"><button onClick={() => openEdit(item)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"><Edit className="w-3.5 h-3.5" /></button><button onClick={() => setDeleteId(item.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <Modal title={editId ? "Edit Faculty" : "Add Faculty"} onClose={() => setShowModal(false)} wide>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2"><InputField label="Full Name" value={form.name} onChange={(v) => setField("name", v)} required /></div>
            <SelectField label="Department" value={form.department} onChange={(v) => setField("department", v)} options={DEPARTMENTS} required />
            <SelectField label="Designation" value={form.designation} onChange={(v) => setField("designation", v)} options={DESIGNATIONS} />
            <InputField label="Qualification" value={form.qualification} onChange={(v) => setField("qualification", v)} placeholder="Ph.D (IIT Delhi)" />
            <InputField label="Experience" value={form.experience} onChange={(v) => setField("experience", v)} placeholder="10 Years" />
            <InputField label="Email" value={form.email} onChange={(v) => setField("email", v)} type="email" />
            <InputField label="Phone" value={form.phone} onChange={(v) => setField("phone", v)} />
            <div className="md:col-span-2"><InputField label="Specialization / Research Areas" value={form.specialization} onChange={(v) => setField("specialization", v)} /></div>
            <InputField label="LinkedIn Profile" value={form.linkedin} onChange={(v) => setField("linkedin", v)} placeholder="https://linkedin.com/in/..." />
            <InputField label="Google Scholar" value={form.googleScholar} onChange={(v) => setField("googleScholar", v)} placeholder="Scholar profile URL" />
            <InputField label="ResearchGate" value={form.researchGate} onChange={(v) => setField("researchGate", v)} placeholder="ResearchGate URL" />
            <SelectField label="Status" value={form.status} onChange={(v) => setField("status", v)} options={STATUSES} />
            <div className="md:col-span-2"><InputField label="Achievements / Publications" value={form.achievements} onChange={(v) => setField("achievements", v)} textarea rows={3} /></div>
          </div>
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-200">
            <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">{editId ? "Update" : "Add Faculty"}</button>
          </div>
        </Modal>
      )}
      {deleteId && <ConfirmDialog message="Delete this faculty member?" onConfirm={() => { setItems((p) => p.filter((i) => i.id !== deleteId)); setDeleteId(null); }} onCancel={() => setDeleteId(null)} />}
    </AdminLayout>
  );
}
