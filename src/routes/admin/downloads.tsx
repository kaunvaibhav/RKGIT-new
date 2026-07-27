import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Edit, Trash2, Download, Upload, Eye } from "lucide-react";
import AdminLayout, { PageHeader, SearchBar, StatusBadge, Modal, InputField, SelectField, ConfirmDialog } from "../../components/admin/AdminLayout";
import { CustomDropdown } from "../../components/ui/CustomDropdown";
import { DOWNLOADS } from "../../components/admin/adminData";

export const Route = createFileRoute("/admin/downloads")({ component: AdminDownloads });
type DownloadItem = (typeof DOWNLOADS)[number];
const CATEGORIES = ["Prospectus", "Academic Calendar", "Fee Structure", "Timetable", "NAAC", "NIRF", "Circulars", "Tender", "Others"];
const FILE_TYPES = ["PDF", "DOC", "DOCX", "XLSX", "PPT", "ZIP", "Image"];
const STATUSES = ["Active", "Inactive"];
const empty = { name: "", category: "", fileType: "PDF", size: "", uploadDate: new Date().toISOString().split("T")[0], downloads: 0, status: "Active", description: "" };

function AdminDownloads() {
  const [items, setItems] = useState<DownloadItem[]>(DOWNLOADS);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ ...empty });
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = items.filter((i) => {
    const ms = i.name.toLowerCase().includes(search.toLowerCase());
    const mc = filterCat === "All" || i.category === filterCat;
    return ms && mc;
  });

  const openAdd = () => { setForm({ ...empty }); setEditId(null); setShowModal(true); };
  const openEdit = (item: DownloadItem) => { setForm({ name: item.name, category: item.category, fileType: item.fileType, size: item.size, uploadDate: item.uploadDate, downloads: item.downloads, status: item.status, description: "" }); setEditId(item.id); setShowModal(true); };
  const handleSave = () => {
    if (editId) setItems((p) => p.map((i) => i.id === editId ? { ...i, ...form } : i));
    else setItems((p) => [{ ...form, id: Date.now() } as DownloadItem, ...p]);
    setShowModal(false);
  };
  const setField = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <AdminLayout currentPage="downloads">
      <PageHeader title="Downloads" subtitle="Manage downloadable files and documents" action={{ label: "Upload File", onClick: openAdd }} />

      <div className="flex flex-wrap gap-3 mb-5">
        {CATEGORIES.slice(0, 5).map((c) => (
          <div key={c} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700">{c}: {items.filter((i) => i.category === c).length}</div>
        ))}
      </div>

      {/* Upload Zone */}
      <div className="bg-white border-2 border-dashed border-slate-300 rounded-xl p-8 mb-5 text-center hover:border-blue-400 transition-colors cursor-pointer">
        <Upload className="w-8 h-8 text-slate-400 mx-auto mb-3" />
        <h3 className="font-semibold text-slate-700">Drag & Drop Files Here</h3>
        <p className="text-xs text-slate-400 mt-1">Supports PDF, DOC, DOCX, XLSX, PPT, ZIP, Images · Max 100MB</p>
        <button onClick={openAdd} className="mt-4 px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">Browse Files</button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-5 shadow-sm flex flex-wrap gap-3 items-center">
        <SearchBar value={search} onChange={setSearch} placeholder="Search files..." />
        <div className="w-48">
          <CustomDropdown
            options={[{ value: "All", label: "All Categories" }, ...CATEGORIES.map((c) => ({ value: c, label: c }))]}
            value={filterCat}
            onChange={setFilterCat}
            variant="admin"
            size="sm"
          />
        </div>
        <span className="text-xs text-slate-400 ml-auto">{filtered.length} files</span>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-slate-200 bg-slate-50">{["File Name", "Category", "Type", "Size", "Uploaded", "Downloads", "Status", "Actions"].map((h) => <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>)}</tr></thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center text-xs font-bold">{item.fileType}</div><span className="font-medium text-slate-800 max-w-[200px] truncate">{item.name}</span></div></td>
                <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{item.category}</td>
                <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{item.fileType}</td>
                <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{item.size}</td>
                <td className="px-4 py-3 text-slate-500 whitespace-nowrap text-xs">{item.uploadDate}</td>
                <td className="px-4 py-3 text-slate-700 whitespace-nowrap font-medium">{item.downloads.toLocaleString()}</td>
                <td className="px-4 py-3 whitespace-nowrap"><StatusBadge status={item.status} /></td>
                <td className="px-4 py-3 whitespace-nowrap"><div className="flex gap-1">
                  <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"><Eye className="w-3.5 h-3.5" /></button>
                  <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"><Download className="w-3.5 h-3.5" /></button>
                  <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"><Edit className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setDeleteId(item.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="text-center py-12 text-slate-400">No files found.</div>}
      </div>

      {showModal && (
        <Modal title={editId ? "Edit File" : "Upload File"} onClose={() => setShowModal(false)}>
          <div className="space-y-4">
            {!editId && <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center"><Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" /><p className="text-sm text-slate-500">Click or drag file to upload</p><input type="file" className="hidden" /></div>}
            <InputField label="File Name / Title" value={form.name} onChange={(v) => setField("name", v)} required />
            <SelectField label="Category" value={form.category} onChange={(v) => setField("category", v)} options={CATEGORIES} required />
            <SelectField label="File Type" value={form.fileType} onChange={(v) => setField("fileType", v)} options={FILE_TYPES} />
            <InputField label="Description" value={form.description} onChange={(v) => setField("description", v)} textarea rows={2} />
            <SelectField label="Status" value={form.status} onChange={(v) => setField("status", v)} options={STATUSES} />
          </div>
          <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-slate-200">
            <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">{editId ? "Update" : "Upload"}</button>
          </div>
        </Modal>
      )}
      {deleteId && <ConfirmDialog message="Delete this file?" onConfirm={() => { setItems((p) => p.filter((i) => i.id !== deleteId)); setDeleteId(null); }} onCancel={() => setDeleteId(null)} />}
    </AdminLayout>
  );
}
