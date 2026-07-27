import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Edit, Trash2, Upload, Image as ImageIcon, Plus } from "lucide-react";
import AdminLayout, { PageHeader, SearchBar, StatusBadge, Modal, InputField, SelectField, ConfirmDialog } from "../../components/admin/AdminLayout";
import { CustomDropdown } from "../../components/ui/CustomDropdown";
import { GALLERY_ALBUMS } from "../../components/admin/adminData";

export const Route = createFileRoute("/admin/gallery")({ component: AdminGallery });
type Album = (typeof GALLERY_ALBUMS)[number];
const CATEGORIES = ["Events", "Campus", "Convocation", "Sports", "Labs", "Hostel", "Hackathons", "Placements", "Cultural", "Others"];
const STATUSES = ["Published", "Draft"];
const empty = { title: "", category: "", images: 0, date: new Date().toISOString().split("T")[0], status: "Draft", description: "" };

function AdminGallery() {
  const [albums, setAlbums] = useState<Album[]>(GALLERY_ALBUMS);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ ...empty });
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = albums.filter((a) => {
    const ms = a.title.toLowerCase().includes(search.toLowerCase());
    const mc = filterCat === "All" || a.category === filterCat;
    return ms && mc;
  });

  const openAdd = () => { setForm({ ...empty }); setEditId(null); setShowModal(true); };
  const openEdit = (a: Album) => { setForm({ title: a.title, category: a.category, images: a.images, date: a.date, status: a.status, description: "" }); setEditId(a.id); setShowModal(true); };
  const handleSave = () => {
    if (editId) setAlbums((p) => p.map((a) => a.id === editId ? { ...a, ...form } : a));
    else setAlbums((p) => [{ ...form, id: Date.now() } as Album, ...p]);
    setShowModal(false);
  };
  const setField = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  const catColors: Record<string, string> = {
    Events: "from-blue-500 to-blue-700", Campus: "from-emerald-500 to-emerald-700",
    Convocation: "from-purple-500 to-purple-700", Sports: "from-orange-500 to-orange-700",
    Labs: "from-teal-500 to-teal-700", Hostel: "from-indigo-500 to-indigo-700",
    Hackathons: "from-pink-500 to-pink-700", Placements: "from-green-500 to-green-700",
  };

  return (
    <AdminLayout currentPage="gallery">
      <PageHeader title="Gallery Management" subtitle={`${albums.length} albums · ${albums.reduce((s, a) => s + a.images, 0)} images`} action={{ label: "Create Album", onClick: openAdd }} />

      <div className="flex flex-wrap gap-3 mb-5">
        {[{ l: "Total Albums", v: albums.length, c: "bg-blue-50 text-blue-700" }, { l: "Published", v: albums.filter((a) => a.status === "Published").length, c: "bg-emerald-50 text-emerald-700" }, { l: "Draft", v: albums.filter((a) => a.status === "Draft").length, c: "bg-slate-100 text-slate-600" }, { l: "Total Images", v: albums.reduce((s, a) => s + a.images, 0), c: "bg-purple-50 text-purple-700" }].map((c) => (
          <div key={c.l} className={`px-4 py-2 rounded-xl text-sm font-semibold ${c.c}`}>{c.l}: {c.v}</div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-5 shadow-sm flex flex-wrap gap-3 items-center">
        <SearchBar value={search} onChange={setSearch} placeholder="Search albums..." />
        <div className="w-48">
          <CustomDropdown
            options={[{ value: "All", label: "All Categories" }, ...CATEGORIES.map((c) => ({ value: c, label: c }))]}
            value={filterCat}
            onChange={setFilterCat}
            variant="admin"
            size="sm"
          />
        </div>
        <span className="text-xs text-slate-400 ml-auto">{filtered.length} albums</span>
      </div>

      {/* Upload Zone */}
      <div className="bg-white border-2 border-dashed border-slate-300 rounded-xl p-6 mb-5 text-center hover:border-blue-400 transition-colors cursor-pointer">
        <Upload className="w-7 h-7 text-slate-400 mx-auto mb-2" />
        <p className="text-sm font-medium text-slate-600">Drag & Drop Images Here for Quick Upload</p>
        <p className="text-xs text-slate-400 mt-1">Supports JPG, PNG, WEBP, SVG · Multiple files allowed</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((album) => (
          <div key={album.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className={`h-32 bg-gradient-to-br ${catColors[album.category] ?? "from-slate-500 to-slate-700"} flex items-center justify-center relative`}>
              <ImageIcon className="w-10 h-10 text-white/50" />
              <div className="absolute top-3 right-3"><StatusBadge status={album.status} /></div>
              <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-lg">{album.images} photos</div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-slate-800 text-sm truncate">{album.title}</h3>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-xs text-slate-400">{album.category}</span>
                <span className="text-slate-200">·</span>
                <span className="text-xs text-slate-400">{album.date}</span>
              </div>
              <div className="flex gap-2 mt-3">
                <button className="flex-1 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-1">
                  <Plus className="w-3 h-3" />Add Photos
                </button>
                <button onClick={() => openEdit(album)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"><Edit className="w-3.5 h-3.5" /></button>
                <button onClick={() => setDeleteId(album.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="col-span-4 text-center py-12 text-slate-400">No albums found.</div>}
      </div>

      {showModal && (
        <Modal title={editId ? "Edit Album" : "Create Album"} onClose={() => setShowModal(false)}>
          <div className="space-y-4">
            <InputField label="Album Title" value={form.title} onChange={(v) => setField("title", v)} required />
            <SelectField label="Category" value={form.category} onChange={(v) => setField("category", v)} options={CATEGORIES} required />
            <InputField label="Date" value={form.date} onChange={(v) => setField("date", v)} type="date" />
            <InputField label="Description" value={form.description} onChange={(v) => setField("description", v)} textarea rows={2} />
            <SelectField label="Status" value={form.status} onChange={(v) => setField("status", v)} options={STATUSES} />
          </div>
          <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-slate-200">
            <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">{editId ? "Update" : "Create Album"}</button>
          </div>
        </Modal>
      )}
      {deleteId && <ConfirmDialog message="Delete this album and all its images?" onConfirm={() => { setAlbums((p) => p.filter((a) => a.id !== deleteId)); setDeleteId(null); }} onCancel={() => setDeleteId(null)} />}
    </AdminLayout>
  );
}
