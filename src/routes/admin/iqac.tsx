import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Upload, FileText, Edit, Plus } from "lucide-react";
import AdminLayout, { PageHeader, Modal, InputField } from "../../components/admin/AdminLayout";

export const Route = createFileRoute("/admin/iqac")({ component: AdminIQAC });

const COMMITTEE = [
  { id: 1, name: "Dr. Rajiv Kumar", role: "Chairperson", department: "CSE", email: "rajiv.kumar@rkgit.edu.in" },
  { id: 2, name: "Dr. Anita Sharma", role: "Coordinator", department: "ECE", email: "anita.sharma@rkgit.edu.in" },
  { id: 3, name: "Prof. Amit Singh", role: "Member", department: "CSE", email: "amit.singh@rkgit.edu.in" },
  { id: 4, name: "Dr. Sunita Yadav", role: "Member", department: "MBA", email: "sunita.yadav@rkgit.edu.in" },
  { id: 5, name: "Mr. Student Rep", role: "Student Representative", department: "CSE 4th Year", email: "" },
  { id: 6, name: "Mr. Industry Expert", role: "External Member", department: "Industry", email: "" },
];

const AQAR_LIST = [
  { year: "2024-25", status: "In Progress", submittedDate: "" },
  { year: "2023-24", status: "Submitted", submittedDate: "2024-12-15" },
  { year: "2022-23", status: "Submitted", submittedDate: "2023-11-30" },
];

const MEETINGS = [
  { id: 1, date: "2025-06-15", agenda: "Review of Academic Quality", status: "Completed", mom: true },
  { id: 2, date: "2025-03-10", agenda: "NAAC Preparation Review", status: "Completed", mom: true },
  { id: 3, date: "2024-12-05", agenda: "Annual Quality Report Discussion", status: "Completed", mom: true },
  { id: 4, date: "2025-09-01", agenda: "New Academic Year Planning", status: "Scheduled", mom: false },
];

const TABS = ["Committee", "AQAR", "Meetings", "Documents"] as const;

function AdminIQAC() {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>("Committee");
  const [showAddMeeting, setShowAddMeeting] = useState(false);

  return (
    <AdminLayout currentPage="iqac">
      <PageHeader title="IQAC Management" subtitle="Internal Quality Assurance Cell" action={activeTab === "Meetings" ? { label: "Add Meeting", onClick: () => setShowAddMeeting(true) } : undefined} />

      <div className="flex gap-1 mb-6 bg-slate-100 p-1 rounded-xl w-fit">
        {TABS.map((t) => <button key={t} onClick={() => setActiveTab(t)} className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === t ? "bg-white text-blue-600 shadow-sm" : "text-slate-600 hover:text-slate-800"}`}>{t}</button>)}
      </div>

      {activeTab === "Committee" && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200 bg-slate-50">{["Name", "Role", "Department", "Email", "Actions"].map((h) => <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>)}</tr></thead>
            <tbody>
              {COMMITTEE.map((m) => (
                <tr key={m.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-800">{m.name}</td>
                  <td className="px-4 py-3"><span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${m.role === "Chairperson" ? "bg-blue-100 text-blue-700" : m.role === "Coordinator" ? "bg-purple-100 text-purple-700" : "bg-slate-100 text-slate-600"}`}>{m.role}</span></td>
                  <td className="px-4 py-3 text-slate-600">{m.department}</td>
                  <td className="px-4 py-3 text-slate-500">{m.email}</td>
                  <td className="px-4 py-3"><button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"><Edit className="w-3.5 h-3.5" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "AQAR" && (
        <div className="space-y-4">
          {AQAR_LIST.map((a) => (
            <div key={a.year} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center"><FileText className="w-5 h-5" /></div>
                <div><div className="font-bold text-slate-800">AQAR {a.year}</div><div className="text-xs text-slate-500 mt-0.5">{a.submittedDate ? `Submitted: ${a.submittedDate}` : "In progress"}</div></div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${a.status === "Submitted" ? "bg-emerald-100 text-emerald-700" : "bg-yellow-100 text-yellow-700"}`}>{a.status}</span>
                <button className="py-1.5 px-3 text-xs font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-1"><Upload className="w-3 h-3" />Upload</button>
              </div>
            </div>
          ))}
          <button className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-sm font-medium text-slate-500 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"><Plus className="w-4 h-4" />Add New AQAR Year</button>
        </div>
      )}

      {activeTab === "Meetings" && (
        <div className="space-y-3">
          {MEETINGS.map((m) => (
            <div key={m.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex flex-col items-center justify-center text-[10px] font-bold leading-tight">
                  <span className="text-sm">{m.date.split("-")[2]}</span>
                  <span>{new Date(m.date).toLocaleString("en", { month: "short" })}</span>
                </div>
                <div><div className="font-semibold text-slate-800 text-sm">{m.agenda}</div><div className="text-xs text-slate-500 mt-0.5">{m.date}</div></div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${m.status === "Completed" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}>{m.status}</span>
                {m.mom && <button className="py-1.5 px-3 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">View MOM</button>}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Documents" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["IQAC Charter", "Action Taken Reports", "Best Practices", "ICT Integration Policy", "Green Audit Report", "Student Satisfaction Survey"].map((d) => (
            <div key={d} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3"><FileText className="w-5 h-5" /></div>
              <h3 className="font-bold text-slate-800 text-sm">{d}</h3>
              <button className="mt-4 w-full py-1.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-1"><Upload className="w-3 h-3" />Upload</button>
            </div>
          ))}
        </div>
      )}

      {showAddMeeting && (
        <Modal title="Schedule Meeting" onClose={() => setShowAddMeeting(false)}>
          <div className="space-y-4">
            <InputField label="Meeting Date" value="" onChange={() => {}} type="date" />
            <InputField label="Agenda" value="" onChange={() => {}} textarea rows={3} />
            <InputField label="Venue" value="" onChange={() => {}} />
          </div>
          <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-slate-200">
            <button onClick={() => setShowAddMeeting(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600">Cancel</button>
            <button onClick={() => setShowAddMeeting(false)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Schedule</button>
          </div>
        </Modal>
      )}
    </AdminLayout>
  );
}
