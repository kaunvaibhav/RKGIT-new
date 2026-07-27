import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Edit, Trash2, Microscope, FileText, Award } from "lucide-react";
import AdminLayout, { PageHeader, SearchBar, StatusBadge, Modal, InputField, SelectField, ConfirmDialog } from "../../components/admin/AdminLayout";
import { RESEARCH_PROJECTS } from "../../components/admin/adminData";

export const Route = createFileRoute("/admin/research")({ component: AdminResearch });
type Project = (typeof RESEARCH_PROJECTS)[number];
const FUNDERS = ["DST", "CSIR", "DBT", "ICAR", "MNRE", "DRDO", "UGC", "AICTE", "Industry", "Self-Funded"];
const DEPTS = ["CSE", "ECE", "ME", "CE", "EE", "MBA", "MCA", "PHARM"];
const STATUSES = ["Ongoing", "Completed", "Submitted", "Approved"];
const TABS = ["Projects", "Patents", "Publications", "MoUs"] as const;
const empty = { title: "", pi: "", department: "", funding: "", amount: "", status: "Ongoing", year: new Date().getFullYear(), abstract: "" };

function AdminResearch() {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>("Projects");
  const [items, setItems] = useState<Project[]>(RESEARCH_PROJECTS);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ ...empty });
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = items.filter((i) => i.title.toLowerCase().includes(search.toLowerCase()) || i.pi.toLowerCase().includes(search.toLowerCase()));
  const openAdd = () => { setForm({ ...empty }); setEditId(null); setShowModal(true); };
  const openEdit = (i: Project) => { setForm({ title: i.title, pi: i.pi, department: i.department, funding: i.funding, amount: i.amount, status: i.status, year: i.year, abstract: "" }); setEditId(i.id); setShowModal(true); };
  const handleSave = () => {
    if (editId) setItems((p) => p.map((i) => i.id === editId ? { ...i, ...form } : i));
    else setItems((p) => [{ ...form, id: Date.now() } as Project, ...p]);
    setShowModal(false);
  };
  const setField = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  const StaticTab = ({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string }) => (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm text-center py-14">
      <Icon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
      <h3 className="font-bold text-slate-700">{title}</h3>
      <p className="text-sm text-slate-500 mt-1">{desc}</p>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">+ Add {title.split(" ")[0]}</button>
    </div>
  );

  return (
    <AdminLayout currentPage="research">
      <PageHeader title="Research Management" subtitle="Projects, patents, publications & collaborations" action={activeTab === "Projects" ? { label: "Add Project", onClick: openAdd } : undefined} />

      <div className="flex gap-1 mb-6 bg-slate-100 p-1 rounded-xl w-fit">
        {TABS.map((t) => <button key={t} onClick={() => setActiveTab(t)} className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === t ? "bg-white text-blue-600 shadow-sm" : "text-slate-600 hover:text-slate-800"}`}>{t}</button>)}
      </div>

      {activeTab === "Projects" && (
        <>
          <div className="flex flex-wrap gap-3 mb-5">
            {[{ l: "Total", v: items.length, c: "bg-blue-50 text-blue-700" }, { l: "Ongoing", v: items.filter((i) => i.status === "Ongoing").length, c: "bg-emerald-50 text-emerald-700" }, { l: "Completed", v: items.filter((i) => i.status === "Completed").length, c: "bg-purple-50 text-purple-700" }].map((c) => (
              <div key={c.l} className={`px-4 py-2 rounded-xl text-sm font-semibold ${c.c}`}>{c.l}: {c.v}</div>
            ))}
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4 mb-5 shadow-sm flex items-center gap-3">
            <SearchBar value={search} onChange={setSearch} placeholder="Search projects..." />
          </div>
          <div className="space-y-3">
            {filtered.map((item) => (
              <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <Microscope className="w-5 h-5 text-blue-600 shrink-0" />
                      <h3 className="font-bold text-slate-800 text-sm">{item.title}</h3>
                    </div>
                    <div className="ml-8 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-slate-600 mt-2">
                      <span><span className="font-medium">PI:</span> {item.pi}</span>
                      <span><span className="font-medium">Dept:</span> {item.department}</span>
                      <span><span className="font-medium">Funder:</span> {item.funding}</span>
                      <span className="font-semibold text-emerald-700">{item.amount}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <StatusBadge status={item.status} />
                    <span className="text-xs text-slate-400">{item.year}</span>
                    <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"><Edit className="w-3.5 h-3.5" /></button>
                    <button onClick={() => setDeleteId(item.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {activeTab === "Patents" && <StaticTab icon={Award} title="Patents Management" desc="Record and manage filed and granted patents" />}
      {activeTab === "Publications" && <StaticTab icon={FileText} title="Publications Management" desc="Track research publications and journal papers" />}
      {activeTab === "MoUs" && <StaticTab icon={Microscope} title="MoUs & Collaborations" desc="Manage industry and institutional MoUs" />}

      {showModal && (
        <Modal title={editId ? "Edit Research Project" : "Add Research Project"} onClose={() => setShowModal(false)} wide>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2"><InputField label="Project Title" value={form.title} onChange={(v) => setField("title", v)} required /></div>
            <InputField label="Principal Investigator" value={form.pi} onChange={(v) => setField("pi", v)} required />
            <SelectField label="Department" value={form.department} onChange={(v) => setField("department", v)} options={DEPTS} />
            <SelectField label="Funding Agency" value={form.funding} onChange={(v) => setField("funding", v)} options={FUNDERS} />
            <InputField label="Funding Amount" value={form.amount} onChange={(v) => setField("amount", v)} placeholder="₹45 Lakhs" />
            <InputField label="Year" value={String(form.year)} onChange={(v) => setField("year", parseInt(v) || 2024)} type="number" />
            <SelectField label="Status" value={form.status} onChange={(v) => setField("status", v)} options={STATUSES} />
            <div className="md:col-span-2"><InputField label="Abstract / Description" value={form.abstract} onChange={(v) => setField("abstract", v)} textarea rows={4} /></div>
          </div>
          <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-slate-200">
            <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">{editId ? "Update" : "Add Project"}</button>
          </div>
        </Modal>
      )}
      {deleteId && <ConfirmDialog message="Delete this research project?" onConfirm={() => { setItems((p) => p.filter((i) => i.id !== deleteId)); setDeleteId(null); }} onCancel={() => setDeleteId(null)} />}
    </AdminLayout>
  );
}
