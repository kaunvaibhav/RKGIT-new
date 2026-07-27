import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Edit, Trash2, Copy, Archive, Pin, Star, Eye } from "lucide-react";
import AdminLayout, {
  PageHeader, SearchBar, StatusBadge, Modal, InputField, SelectField, ConfirmDialog,
} from "../../components/admin/AdminLayout";
import { CustomDropdown } from "../../components/ui/CustomDropdown";
import { ANNOUNCEMENTS } from "../../components/admin/adminData";

export const Route = createFileRoute("/admin/announcements")({
  component: AdminAnnouncements,
});

type Announcement = (typeof ANNOUNCEMENTS)[number] & Record<string, unknown>;

const CATEGORIES = ["Admissions", "Achievement", "Event", "Academic", "Placement", "Infrastructure", "Exam", "Finance", "Research", "Sports"];
const PRIORITIES = ["High", "Medium", "Low"];
const STATUSES = ["Published", "Draft", "Scheduled", "Archived"];
const DEPARTMENTS = ["All", "CSE", "ECE", "ME", "CE", "EE", "MBA", "MCA", "PHARM"];

const emptyForm = {
  title: "", description: "", category: "", priority: "Medium", status: "Draft",
  pinned: false, featured: false, department: "All", publishDate: "", expiryDate: "",
  buttonText: "", buttonLink: "", tags: "",
};

function AdminAnnouncements() {
  const [items, setItems] = useState<Announcement[]>(ANNOUNCEMENTS as Announcement[]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = items.filter((i) => {
    const matchSearch = i.title.toLowerCase().includes(search.toLowerCase()) || i.category.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || i.status === filterStatus;
    const matchPriority = filterPriority === "All" || i.priority === filterPriority;
    return matchSearch && matchStatus && matchPriority;
  });

  const openAdd = () => { setForm({ ...emptyForm }); setEditId(null); setShowModal(true); };
  const openEdit = (item: Announcement) => {
    setForm({ title: item.title, description: "", category: item.category, priority: item.priority, status: item.status, pinned: item.pinned, featured: item.featured, department: item.department, publishDate: item.publishDate, expiryDate: item.expiryDate, buttonText: "", buttonLink: "", tags: item.tags.join(", ") });
    setEditId(item.id);
    setShowModal(true);
  };
  const handleSave = () => {
    if (editId) {
      setItems((prev) => prev.map((i) => i.id === editId ? { ...i, ...form, tags: form.tags.split(",").map((t) => t.trim()) } : i));
    } else {
      const newItem = { ...emptyForm, ...form, id: Date.now(), tags: form.tags.split(",").map((t) => t.trim()) };
      setItems((prev) => [newItem as Announcement, ...prev]);
    }
    setShowModal(false);
  };
  const handleDelete = (id: number) => { setItems((prev) => prev.filter((i) => i.id !== id)); setDeleteId(null); };
  const handleDuplicate = (item: Announcement) => {
    setItems((prev) => [{ ...item, id: Date.now(), title: item.title + " (Copy)", status: "Draft" }, ...prev]);
  };
  const handleArchive = (id: number) => { setItems((prev) => prev.map((i) => i.id === id ? { ...i, status: "Archived" } : i)); };
  const handlePublish = (id: number) => { setItems((prev) => prev.map((i) => i.id === id ? { ...i, status: "Published" } : i)); };
  const setField = (key: string, val: unknown) => setForm((f) => ({ ...f, [key]: val }));

  const published = items.filter((i) => i.status === "Published").length;
  const drafts = items.filter((i) => i.status === "Draft").length;
  const pinned = items.filter((i) => i.pinned).length;

  return (
    <AdminLayout currentPage="announcements">
      <PageHeader title="Announcements" subtitle={`${items.length} total announcements`} action={{ label: "Add Announcement", onClick: openAdd }} />

      {/* Summary Chips */}
      <div className="flex flex-wrap gap-3 mb-5">
        {[{ label: "Total", count: items.length, color: "bg-blue-50 text-blue-700" }, { label: "Published", count: published, color: "bg-emerald-50 text-emerald-700" }, { label: "Drafts", count: drafts, color: "bg-slate-100 text-slate-600" }, { label: "Pinned", count: pinned, color: "bg-yellow-50 text-yellow-700" }].map((c) => (
          <div key={c.label} className={`px-4 py-2 rounded-xl text-sm font-semibold ${c.color}`}>
            {c.label}: {c.count}
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-5 shadow-sm flex flex-wrap gap-3 items-center">
        <SearchBar value={search} onChange={setSearch} placeholder="Search announcements..." />
        <div className="w-44">
          <CustomDropdown
            options={[{ value: "All", label: "All Status" }, ...STATUSES.map((s) => ({ value: s, label: s }))]}
            value={filterStatus}
            onChange={setFilterStatus}
            variant="admin"
            size="sm"
          />
        </div>
        <div className="w-44">
          <CustomDropdown
            options={[{ value: "All", label: "All Priority" }, ...PRIORITIES.map((p) => ({ value: p, label: p }))]}
            value={filterPriority}
            onChange={setFilterPriority}
            variant="admin"
            size="sm"
          />
        </div>
        <span className="text-xs text-slate-400 ml-auto">{filtered.length} results</span>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                {["Title", "Category", "Priority", "Status", "Dept", "Publish Date", "Flags", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, idx) => (
                <tr key={item.id} className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${idx % 2 === 0 ? "" : "bg-slate-50/50"}`}>
                  <td className="px-4 py-3 max-w-xs">
                    <div className="font-medium text-slate-800 truncate">{item.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{item.tags.slice(0, 2).join(", ")}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{item.category}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${item.priority === "High" ? "bg-red-100 text-red-700" : item.priority === "Medium" ? "bg-yellow-100 text-yellow-700" : "bg-slate-100 text-slate-600"}`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap"><StatusBadge status={item.status} /></td>
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{item.department}</td>
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap text-xs">{item.publishDate}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex gap-1">
                      {item.pinned && <Pin className="w-3.5 h-3.5 text-yellow-500" />}
                      {item.featured && <Star className="w-3.5 h-3.5 text-orange-400" />}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {item.status !== "Published" && (
                        <button onClick={() => handlePublish(item.id)} title="Publish" className="p-1.5 rounded-lg hover:bg-emerald-50 text-emerald-600 transition-colors">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button onClick={() => openEdit(item)} title="Edit" className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDuplicate(item)} title="Duplicate" className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleArchive(item.id)} title="Archive" className="p-1.5 rounded-lg hover:bg-yellow-50 text-yellow-600 transition-colors">
                        <Archive className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => setDeleteId(item.id)} title="Delete" className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="text-center py-12 text-slate-400">No announcements found.</div>}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <Modal title={editId ? "Edit Announcement" : "Add Announcement"} onClose={() => setShowModal(false)} wide>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2"><InputField label="Title" value={form.title} onChange={(v) => setField("title", v)} placeholder="Announcement title..." required /></div>
            <div className="md:col-span-2"><InputField label="Description / Content" value={form.description} onChange={(v) => setField("description", v)} textarea rows={4} placeholder="Write announcement details..." /></div>
            <SelectField label="Category" value={form.category} onChange={(v) => setField("category", v)} options={CATEGORIES} required />
            <SelectField label="Priority" value={form.priority} onChange={(v) => setField("priority", v)} options={PRIORITIES} />
            <SelectField label="Status" value={form.status} onChange={(v) => setField("status", v)} options={STATUSES} />
            <SelectField label="Department" value={form.department} onChange={(v) => setField("department", v)} options={DEPARTMENTS} />
            <InputField label="Publish Date" value={form.publishDate} onChange={(v) => setField("publishDate", v)} type="date" />
            <InputField label="Expiry Date" value={form.expiryDate} onChange={(v) => setField("expiryDate", v)} type="date" />
            <InputField label="Button Text" value={form.buttonText} onChange={(v) => setField("buttonText", v)} placeholder="e.g. Apply Now" />
            <InputField label="Button Link" value={form.buttonLink} onChange={(v) => setField("buttonLink", v)} placeholder="https://..." />
            <div className="md:col-span-2"><InputField label="Tags (comma-separated)" value={form.tags} onChange={(v) => setField("tags", v)} placeholder="admission, 2025, important" /></div>
            <div className="md:col-span-2 flex flex-wrap gap-4">
              {[["pinned", "📌 Pinned"], ["featured", "⭐ Featured"]].map(([key, lbl]) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={!!(form as Record<string, unknown>)[key]} onChange={(e) => setField(key, e.target.checked)} className="w-4 h-4 rounded text-blue-600" />
                  <span className="text-sm font-medium text-slate-700">{lbl}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-200">
            <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
            <button onClick={() => { setField("status", "Draft"); handleSave(); }} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors">Save Draft</button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              {editId ? "Update" : "Publish"}
            </button>
          </div>
        </Modal>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <ConfirmDialog
          message="Are you sure you want to delete this announcement? This action cannot be undone."
          onConfirm={() => handleDelete(deleteId)}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </AdminLayout>
  );
}
