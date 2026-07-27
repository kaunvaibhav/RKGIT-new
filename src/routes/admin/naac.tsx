import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Upload, FileText, Award, Edit } from "lucide-react";
import AdminLayout, { PageHeader, Modal, InputField } from "../../components/admin/AdminLayout";

export const Route = createFileRoute("/admin/naac")({ component: AdminNAAC });

const NAAC_DOCS = [
  { id: 1, title: "Self Study Report (SSR)", description: "Comprehensive SSR for NAAC peer team visit", files: 1, year: "2025", status: "Submitted" },
  { id: 2, title: "Annual Quality Assurance Report (AQAR) 2024-25", description: "Annual IQAC quality report", files: 1, year: "2024-25", status: "Published" },
  { id: 3, title: "DVV Clarifications", description: "Data verification and validation documents", files: 5, year: "2025", status: "Submitted" },
  { id: 4, title: "Peer Team Visit Report", description: "NAAC peer team inspection report", files: 1, year: "2023", status: "Published" },
  { id: 5, title: "Criteria 1 — Curricular Aspects", description: "Curriculum design and development", files: 8, year: "2025", status: "Submitted" },
  { id: 6, title: "Criteria 2 — Teaching & Learning", description: "Student enrollment and teaching process", files: 12, year: "2025", status: "Submitted" },
  { id: 7, title: "Criteria 3 — Research & Extension", description: "Research, consultancy and extension activities", files: 15, year: "2025", status: "Submitted" },
  { id: 8, title: "Criteria 4 — Infrastructure", description: "Physical and academic support", files: 6, year: "2025", status: "Submitted" },
  { id: 9, title: "Criteria 5 — Student Support", description: "Student progression and support", files: 10, year: "2025", status: "Submitted" },
  { id: 10, title: "Criteria 6 — Governance", description: "Institutional values and best practices", files: 7, year: "2025", status: "In Progress" },
];

function AdminNAAC() {
  const [editDoc, setEditDoc] = useState<typeof NAAC_DOCS[number] | null>(null);

  return (
    <AdminLayout currentPage="naac">
      <PageHeader title="NAAC Management" subtitle="Self Study Report, AQAR, DVV and criteria documents" />

      {/* Grade Card */}
      <div className="bg-gradient-to-r from-[#1E3A5F] to-blue-700 rounded-2xl p-6 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-blue-200 font-medium">Current Accreditation Status</div>
            <div className="text-4xl font-black mt-1">NAAC 'A'</div>
            <div className="text-blue-200 text-sm mt-1">Grade Accreditation · Valid until 2028</div>
          </div>
          <Award className="w-16 h-16 text-blue-300/50" />
        </div>
        <div className="mt-4 flex gap-4 text-sm">
          <div><span className="text-blue-300">CGPA:</span> <span className="font-bold">3.12</span></div>
          <div><span className="text-blue-300">Cycle:</span> <span className="font-bold">3rd Cycle</span></div>
          <div><span className="text-blue-300">Year:</span> <span className="font-bold">2023</span></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {NAAC_DOCS.map((doc) => (
          <div key={doc.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><FileText className="w-5 h-5" /></div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${doc.status === "Published" ? "bg-emerald-100 text-emerald-700" : doc.status === "Submitted" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"}`}>{doc.status}</span>
            </div>
            <h3 className="font-bold text-slate-800 text-sm">{doc.title}</h3>
            <p className="text-xs text-slate-500 mt-1">{doc.description}</p>
            <div className="flex items-center gap-3 mt-3 text-xs text-slate-400">
              <span>{doc.files} file{doc.files > 1 ? "s" : ""}</span>
              <span>·</span>
              <span>Year: {doc.year}</span>
            </div>
            <div className="flex gap-2 mt-4 pt-3 border-t border-slate-100">
              <button onClick={() => setEditDoc(doc)} className="flex-1 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-1"><Edit className="w-3 h-3" />Edit</button>
              <button className="flex-1 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-1"><Upload className="w-3 h-3" />Upload</button>
            </div>
          </div>
        ))}
      </div>

      {editDoc && (
        <Modal title={`Edit: ${editDoc.title}`} onClose={() => setEditDoc(null)} wide>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 transition-colors">
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-600 font-medium">Upload NAAC Document (PDF)</p>
            </div>
            <InputField label="Document Title" value={editDoc.title} onChange={() => {}} />
            <InputField label="Description" value={editDoc.description} onChange={() => {}} textarea rows={2} />
            <InputField label="Year" value={editDoc.year} onChange={() => {}} />
          </div>
          <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-slate-200">
            <button onClick={() => setEditDoc(null)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600">Cancel</button>
            <button onClick={() => setEditDoc(null)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Save</button>
          </div>
        </Modal>
      )}
    </AdminLayout>
  );
}
