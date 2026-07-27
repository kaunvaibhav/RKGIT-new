import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Upload, FileText, Check, Edit } from "lucide-react";
import AdminLayout, { PageHeader, Modal, InputField } from "../../components/admin/AdminLayout";

export const Route = createFileRoute("/admin/mandatory")({ component: AdminMandatory });

const SECTIONS = [
  { id: 1, title: "AICTE Approval Letters", description: "Upload AICTE approval documents", files: 3, lastUpdated: "2025-04-01", status: "Uploaded" },
  { id: 2, title: "AKTU Affiliation", description: "University affiliation certificates", files: 2, lastUpdated: "2025-03-15", status: "Uploaded" },
  { id: 3, title: "Anti-Ragging Committee", description: "Committee details and reports", files: 4, lastUpdated: "2025-06-01", status: "Uploaded" },
  { id: 4, title: "Internal Complaints Committee (ICC)", description: "ICC constitution and details", files: 2, lastUpdated: "2025-05-20", status: "Uploaded" },
  { id: 5, title: "Infrastructure Details", description: "Land, building, labs, equipment", files: 1, lastUpdated: "2025-02-10", status: "Uploaded" },
  { id: 6, title: "Audit Report 2023-24", description: "Annual financial audit report", files: 1, lastUpdated: "2025-01-15", status: "Uploaded" },
  { id: 7, title: "Annual Report 2023-24", description: "Institute annual report", files: 1, lastUpdated: "2025-02-01", status: "Uploaded" },
  { id: 8, title: "Grievance Redressal", description: "Grievance committee and mechanism", files: 2, lastUpdated: "2025-03-01", status: "Uploaded" },
  { id: 9, title: "Faculty Details", description: "Qualification and appointment details", files: 1, lastUpdated: "2025-07-01", status: "Uploaded" },
  { id: 10, title: "Fee Refund Policy", description: "Admission fee refund policy", files: 1, lastUpdated: "2025-05-01", status: "Needs Update" },
];

function AdminMandatory() {
  const [editSection, setEditSection] = useState<typeof SECTIONS[number] | null>(null);
  const [sections, setSections] = useState(SECTIONS);

  return (
    <AdminLayout currentPage="mandatory">
      <PageHeader title="Mandatory Disclosure" subtitle="AICTE mandated disclosures and documents" />

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0"><FileText className="w-4 h-4" /></div>
        <div>
          <p className="font-semibold text-blue-800 text-sm">AICTE Mandatory Disclosure</p>
          <p className="text-xs text-blue-600 mt-1">All documents must be updated annually as per AICTE regulations. Outdated documents can result in compliance issues.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((s) => (
          <div key={s.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><FileText className="w-5 h-5" /></div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.status === "Uploaded" ? "bg-emerald-100 text-emerald-700" : "bg-yellow-100 text-yellow-700"}`}>
                {s.status === "Uploaded" ? <span className="flex items-center gap-1"><Check className="w-3 h-3" />{s.status}</span> : s.status}
              </span>
            </div>
            <h3 className="font-bold text-slate-800 text-sm">{s.title}</h3>
            <p className="text-xs text-slate-500 mt-1">{s.description}</p>
            <div className="flex items-center gap-3 mt-3 text-xs text-slate-400">
              <span>{s.files} file{s.files > 1 ? "s" : ""}</span>
              <span>·</span>
              <span>Updated: {s.lastUpdated}</span>
            </div>
            <div className="flex gap-2 mt-4 pt-3 border-t border-slate-100">
              <button onClick={() => setEditSection(s)} className="flex-1 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-1"><Edit className="w-3 h-3" />Edit</button>
              <button className="flex-1 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-1"><Upload className="w-3 h-3" />Upload</button>
            </div>
          </div>
        ))}
      </div>

      {editSection && (
        <Modal title={`Edit: ${editSection.title}`} onClose={() => setEditSection(null)} wide>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 transition-colors">
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-600 font-medium">Upload PDF Document</p>
              <p className="text-xs text-slate-400 mt-1">PDF, DOC, DOCX · Max 100MB</p>
            </div>
            <InputField label="Section Title" value={editSection.title} onChange={() => {}} />
            <InputField label="Description" value={editSection.description} onChange={() => {}} textarea rows={2} />
          </div>
          <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-slate-200">
            <button onClick={() => setEditSection(null)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600">Cancel</button>
            <button onClick={() => { setSections((p) => p.map((s) => s.id === editSection.id ? { ...s, status: "Uploaded", lastUpdated: new Date().toISOString().split("T")[0] } : s)); setEditSection(null); }} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Save & Upload</button>
          </div>
        </Modal>
      )}
    </AdminLayout>
  );
}
