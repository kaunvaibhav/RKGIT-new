import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Edit, Trash2, Briefcase, Users, Calendar, DollarSign } from "lucide-react";
import AdminLayout, { PageHeader, SearchBar, StatusBadge, Modal, InputField, SelectField, ConfirmDialog, StatCard } from "../../components/admin/AdminLayout";
import { CustomDropdown } from "../../components/ui/CustomDropdown";
import { JOBS } from "../../components/admin/adminData";

export const Route = createFileRoute("/admin/careers")({ component: AdminCareers });
type Job = (typeof JOBS)[number];
const DEPARTMENTS_LIST = ["CSE", "ECE", "ME", "CE", "EE", "MBA", "MCA", "PHARM", "Admin", "Library", "All"];
const TYPES = ["Full-Time", "Part-Time", "Contract", "Visiting", "Adjunct"];
const STATUSES = ["Open", "Closed", "Draft"];
const empty = { title: "", department: "", type: "Full-Time", qualification: "", experience: "", salary: "", vacancies: 1, eligibility: "", responsibilities: "", applyLink: "", applicationEmail: "", phone: "", lastDate: "", status: "Draft", featured: false };

function AdminCareers() {
  const [items, setItems] = useState<Job[]>(JOBS);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<typeof empty & { vacancies: number }>({ ...empty });
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = items.filter((i) => {
    const ms = i.title.toLowerCase().includes(search.toLowerCase()) || i.department.toLowerCase().includes(search.toLowerCase());
    const mst = filterStatus === "All" || i.status === filterStatus;
    return ms && mst;
  });

  const openAdd = () => { setForm({ ...empty }); setEditId(null); setShowModal(true); };
  const openEdit = (item: Job) => {
    setForm({ title: item.title, department: item.department, type: item.type, qualification: item.qualification, experience: item.experience, salary: item.salary, vacancies: item.vacancies, eligibility: item.eligibility, responsibilities: "", applyLink: item.applyLink ?? "", applicationEmail: item.applicationEmail ?? "", phone: item.phone ?? "", lastDate: item.lastDate, status: item.status, featured: item.featured });
    setEditId(item.id); setShowModal(true);
  };
  const handleSave = () => {
    if (editId) setItems((p) => p.map((i) => i.id === editId ? { ...i, ...form } : i));
    else setItems((p) => [{ ...form, id: Date.now() } as Job, ...p]);
    setShowModal(false);
  };
  const setField = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  const open = items.filter((i) => i.status === "Open").length;
  const totalVacancies = items.filter((i) => i.status === "Open").reduce((s, i) => s + i.vacancies, 0);

  return (
    <AdminLayout currentPage="careers">
      <PageHeader title="Career Portal" subtitle="Manage job postings and recruitment" action={{ label: "Post Job", onClick: openAdd }} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Postings" value={items.length} icon={Briefcase} color="blue" />
        <StatCard label="Open Positions" value={open} icon={Users} color="green" />
        <StatCard label="Total Vacancies" value={totalVacancies} icon={DollarSign} color="orange" />
        <StatCard label="Closing Soon" value={items.filter((i) => i.status === "Open" && new Date(i.lastDate) > new Date()).length} icon={Calendar} color="red" />
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-5 shadow-sm flex flex-wrap gap-3 items-center">
        <SearchBar value={search} onChange={setSearch} placeholder="Search jobs..." />
        <div className="w-44">
          <CustomDropdown
            options={[{ value: "All", label: "All Status" }, ...STATUSES.map((s) => ({ value: s, label: s }))]}
            value={filterStatus}
            onChange={setFilterStatus}
            variant="admin"
            size="sm"
          />
        </div>
        <span className="text-xs text-slate-400 ml-auto">{filtered.length} results</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-slate-800 text-sm leading-snug">{item.title}</h3>
                <div className="text-xs text-slate-500 mt-1">{item.department} · {item.type}</div>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <StatusBadge status={item.status} />
                {item.featured && <span className="text-[10px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-medium">Featured</span>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mb-3">
              <div><span className="font-medium">Qualification:</span> {item.qualification}</div>
              <div><span className="font-medium">Experience:</span> {item.experience}</div>
              <div><span className="font-medium">Salary:</span> {item.salary}</div>
              <div><span className="font-medium">Vacancies:</span> {item.vacancies}</div>
              <div className="col-span-2"><span className="font-medium">Last Date:</span> {item.lastDate}</div>
            </div>
            <div className="flex gap-2 pt-3 border-t border-slate-100">
              <button onClick={() => openEdit(item)} className="flex-1 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-1"><Edit className="w-3 h-3" />Edit</button>
              <button onClick={() => setItems((p) => p.map((i) => i.id === item.id ? { ...i, status: item.status === "Open" ? "Closed" : "Open" } : i))} className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${item.status === "Open" ? "text-red-600 bg-red-50 hover:bg-red-100" : "text-emerald-600 bg-emerald-50 hover:bg-emerald-100"}`}>
                {item.status === "Open" ? "Close" : "Reopen"}
              </button>
              <button onClick={() => setDeleteId(item.id)} className="py-1.5 px-3 text-xs font-medium text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <Modal title={editId ? "Edit Job Posting" : "Post New Job"} onClose={() => setShowModal(false)} wide>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2"><InputField label="Job Title" value={form.title} onChange={(v) => setField("title", v)} required /></div>
            <SelectField label="Department" value={form.department} onChange={(v) => setField("department", v)} options={DEPARTMENTS_LIST} required />
            <SelectField label="Employment Type" value={form.type} onChange={(v) => setField("type", v)} options={TYPES} />
            <div className="md:col-span-2"><InputField label="Qualification" value={form.qualification} onChange={(v) => setField("qualification", v)} /></div>
            <InputField label="Experience" value={form.experience} onChange={(v) => setField("experience", v)} placeholder="0-3 Years" />
            <InputField label="Salary Range" value={form.salary} onChange={(v) => setField("salary", v)} placeholder="₹30,000 - ₹50,000/month" />
            <InputField label="No. of Vacancies" value={String(form.vacancies)} onChange={(v) => setField("vacancies", parseInt(v) || 1)} type="number" />
            <InputField label="Last Date to Apply" value={form.lastDate} onChange={(v) => setField("lastDate", v)} type="date" />
            <div className="md:col-span-2"><InputField label="Eligibility Criteria" value={form.eligibility} onChange={(v) => setField("eligibility", v)} textarea rows={2} /></div>
            <div className="md:col-span-2"><InputField label="Job Responsibilities" value={form.responsibilities} onChange={(v) => setField("responsibilities", v)} textarea rows={3} /></div>
            <InputField label="Apply Link" value={form.applyLink} onChange={(v) => setField("applyLink", v)} placeholder="https://..." />
            <InputField label="Application Email" value={form.applicationEmail} onChange={(v) => setField("applicationEmail", v)} type="email" />
            <InputField label="Contact Phone" value={form.phone} onChange={(v) => setField("phone", v)} />
            <SelectField label="Status" value={form.status} onChange={(v) => setField("status", v)} options={STATUSES} />
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={(e) => setField("featured", e.target.checked)} className="w-4 h-4 rounded" />
                <span className="text-sm font-medium text-slate-700">⭐ Featured Job Posting</span>
              </label>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-200">
            <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">{editId ? "Update" : "Post Job"}</button>
          </div>
        </Modal>
      )}
      {deleteId && <ConfirmDialog message="Delete this job posting?" onConfirm={() => { setItems((p) => p.filter((i) => i.id !== deleteId)); setDeleteId(null); }} onCancel={() => setDeleteId(null)} />}
    </AdminLayout>
  );
}
