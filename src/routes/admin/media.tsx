import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Image as ImageIcon, FileText, Trash2, Copy, FolderOpen, Upload, Eye } from "lucide-react";
import AdminLayout, { PageHeader } from "../../components/admin/AdminLayout";
import { CustomDropdown } from "../../components/ui/CustomDropdown";

export const Route = createFileRoute("/admin/media")({ component: AdminMedia });

const MEDIA_ITEMS = [
  { id: 1, name: "rkgit-hero.jpg", type: "image", size: "1.2 MB", folder: "Homepage", date: "2025-07-01", url: "/images/hero.jpg" },
  { id: 2, name: "campus-aerial.jpg", type: "image", size: "2.4 MB", folder: "Campus", date: "2025-06-15", url: "" },
  { id: 3, name: "lab-cse.jpg", type: "image", size: "0.8 MB", folder: "Labs", date: "2025-06-10", url: "" },
  { id: 4, name: "naac-report.pdf", type: "pdf", size: "15.8 MB", folder: "Documents", date: "2025-04-20", url: "" },
  { id: 5, name: "prospectus-2025.pdf", type: "pdf", size: "8.5 MB", folder: "Documents", date: "2025-05-01", url: "" },
  { id: 6, name: "hackathon-team.jpg", type: "image", size: "0.5 MB", folder: "Events", date: "2025-03-15", url: "" },
  { id: 7, name: "placement-2025.jpg", type: "image", size: "1.1 MB", folder: "Placements", date: "2025-06-28", url: "" },
  { id: 8, name: "faculty-group.jpg", type: "image", size: "1.8 MB", folder: "Faculty", date: "2025-04-01", url: "" },
  { id: 9, name: "fee-structure.pdf", type: "pdf", size: "0.5 MB", folder: "Documents", date: "2025-06-01", url: "" },
  { id: 10, name: "convocation-2024.jpg", type: "image", size: "3.2 MB", folder: "Gallery", date: "2024-11-15", url: "" },
  { id: 11, name: "logo-rkgit.png", type: "image", size: "0.2 MB", folder: "Branding", date: "2025-01-01", url: "" },
  { id: 12, name: "sports-meet.jpg", type: "image", size: "1.5 MB", folder: "Sports", date: "2024-12-10", url: "" },
];

type MediaItem = typeof MEDIA_ITEMS[number];
const FOLDERS = ["All", "Homepage", "Campus", "Labs", "Documents", "Events", "Placements", "Faculty", "Gallery", "Branding", "Sports"];

function AdminMedia() {
  const [items, setItems] = useState<MediaItem[]>(MEDIA_ITEMS);
  const [search, setSearch] = useState("");
  const [filterFolder, setFilterFolder] = useState("All");
  const [filterType, setFilterType] = useState("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selected, setSelected] = useState<number[]>([]);

  const filtered = items.filter((i) => {
    const ms = i.name.toLowerCase().includes(search.toLowerCase());
    const mf = filterFolder === "All" || i.folder === filterFolder;
    const mt = filterType === "all" || i.type === filterType;
    return ms && mf && mt;
  });

  const toggleSelect = (id: number) => setSelected((s) => s.includes(id) ? s.filter((i) => i !== id) : [...s, id]);
  const deleteSelected = () => { setItems((p) => p.filter((i) => !selected.includes(i.id))); setSelected([]); };

  return (
    <AdminLayout currentPage="media">
      <PageHeader title="Media Library" subtitle={`${items.length} files · ${items.filter((i) => i.type === "image").length} images · ${items.filter((i) => i.type === "pdf").length} PDFs`} />

      {/* Upload Zone */}
      <div className="bg-white border-2 border-dashed border-slate-300 rounded-xl p-8 mb-5 text-center hover:border-blue-400 transition-colors cursor-pointer">
        <Upload className="w-8 h-8 text-slate-400 mx-auto mb-3" />
        <h3 className="font-semibold text-slate-700">Drag & Drop Files to Upload</h3>
        <p className="text-xs text-slate-400 mt-1">JPG, PNG, WEBP, SVG, PDF, DOC, DOCX, XLSX, PPT, ZIP · Max 100MB</p>
        <button className="mt-4 px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">Browse & Upload</button>
      </div>

      {/* Controls */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-5 shadow-sm flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search files..." className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30" />
        </div>
        <div className="w-40">
          <CustomDropdown
            options={FOLDERS.map((f) => ({ value: f, label: f }))}
            value={filterFolder}
            onChange={setFilterFolder}
            variant="admin"
            size="sm"
          />
        </div>
        <div className="w-36">
          <CustomDropdown
            options={[
              { value: "all", label: "All Types" },
              { value: "image", label: "Images" },
              { value: "pdf", label: "PDFs" },
            ]}
            value={filterType}
            onChange={setFilterType}
            variant="admin"
            size="sm"
          />
        </div>
        <div className="flex gap-1 ml-auto">
          {(["grid", "list"] as const).map((v) => (
            <button key={v} onClick={() => setView(v)} className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors ${view === v ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"}`}>{v === "grid" ? "⊞ Grid" : "☰ List"}</button>
          ))}
        </div>
        {selected.length > 0 && <button onClick={deleteSelected} className="px-3 py-2 bg-red-500 text-white text-xs font-medium rounded-lg hover:bg-red-600 transition-colors"><Trash2 className="w-3.5 h-3.5 inline mr-1" />Delete ({selected.length})</button>}
        <span className="text-xs text-slate-400">{filtered.length} files</span>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filtered.map((item) => (
            <div key={item.id} onClick={() => toggleSelect(item.id)} className={`group bg-white border rounded-xl overflow-hidden cursor-pointer transition-all ${selected.includes(item.id) ? "border-blue-500 ring-2 ring-blue-500/30" : "border-slate-200 hover:border-slate-300 hover:shadow-md"}`}>
              <div className="aspect-square bg-slate-100 flex items-center justify-center relative">
                {item.type === "image" ? <ImageIcon className="w-10 h-10 text-slate-300" /> : <FileText className="w-10 h-10 text-red-300" />}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-1.5">
                    <button className="p-1.5 bg-white rounded-lg shadow text-slate-600 hover:text-blue-600 transition-colors"><Eye className="w-3 h-3" /></button>
                    <button className="p-1.5 bg-white rounded-lg shadow text-slate-600 hover:text-blue-600 transition-colors"><Copy className="w-3 h-3" /></button>
                  </div>
                </div>
              </div>
              <div className="p-2">
                <p className="text-[10px] font-medium text-slate-700 truncate">{item.name}</p>
                <p className="text-[10px] text-slate-400">{item.size}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200 bg-slate-50">{["", "Name", "Type", "Folder", "Size", "Date", "Actions"].map((h) => <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>)}</tr></thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3"><input type="checkbox" checked={selected.includes(item.id)} onChange={() => toggleSelect(item.id)} className="w-4 h-4 rounded" /></td>
                  <td className="px-4 py-3"><div className="flex items-center gap-2">{item.type === "image" ? <ImageIcon className="w-4 h-4 text-blue-500" /> : <FileText className="w-4 h-4 text-red-500" />}<span className="font-medium text-slate-800">{item.name}</span></div></td>
                  <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${item.type === "image" ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"}`}>{item.type}</span></td>
                  <td className="px-4 py-3 text-slate-500">{item.folder}</td>
                  <td className="px-4 py-3 text-slate-500">{item.size}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{item.date}</td>
                  <td className="px-4 py-3"><div className="flex gap-1"><button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"><Eye className="w-3.5 h-3.5" /></button><button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"><Copy className="w-3.5 h-3.5" /></button><button onClick={() => setItems((p) => p.filter((i) => i.id !== item.id))} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="text-center py-12 text-slate-400">No files found.</div>}
        </div>
      )}
    </AdminLayout>
  );
}
