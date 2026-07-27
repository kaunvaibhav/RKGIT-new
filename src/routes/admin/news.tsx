import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Edit, Trash2, Eye, TrendingUp, Star } from "lucide-react";
import AdminLayout, { PageHeader, SearchBar, StatusBadge, Modal, InputField, SelectField, ConfirmDialog } from "../../components/admin/AdminLayout";
import { CustomDropdown } from "../../components/ui/CustomDropdown";
import { NEWS } from "../../components/admin/adminData";

export const Route = createFileRoute("/admin/news")({ component: AdminNews });

type NewsItem = (typeof NEWS)[number];
const CATEGORIES = ["Achievement", "Partnership", "Placement", "Accreditation", "Research", "Alumni", "Event", "General"];
const STATUSES = ["Published", "Draft", "Archived"];
const empty = { headline: "", shortDesc: "", content: "", category: "", author: "Admin", publishDate: "", readTime: "3 min", status: "Draft", featured: false, trending: false, pinned: false, slug: "", metaDesc: "", videoLink: "", externalLink: "" };

function AdminNews() {
  const [items, setItems] = useState<NewsItem[]>(NEWS);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ ...empty });
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = items.filter((i) => {
    const matchSearch = i.headline.toLowerCase().includes(search.toLowerCase()) || i.category.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || i.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const openAdd = () => { setForm({ ...empty }); setEditId(null); setShowModal(true); };
  const openEdit = (item: NewsItem) => {
    setForm({ headline: item.headline, shortDesc: "", content: "", category: item.category, author: item.author, publishDate: item.publishDate, readTime: item.readTime, status: item.status, featured: item.featured, trending: item.trending, pinned: item.pinned ?? false, slug: item.slug, metaDesc: "", videoLink: "", externalLink: "" });
    setEditId(item.id); setShowModal(true);
  };
  const handleSave = () => {
    if (editId) { setItems((p) => p.map((i) => i.id === editId ? { ...i, ...form } : i)); }
    else { setItems((p) => [{ ...form, id: Date.now() } as NewsItem, ...p]); }
    setShowModal(false);
  };
  const setField = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <AdminLayout currentPage="news">
      <PageHeader title="News Management" subtitle={`${items.length} articles`} action={{ label: "Add News", onClick: openAdd }} />

      {/* Chips */}
      <div className="flex flex-wrap gap-3 mb-5">
        {[{ l: "Total", v: items.length, c: "bg-blue-50 text-blue-700" }, { l: "Published", v: items.filter((i) => i.status === "Published").length, c: "bg-emerald-50 text-emerald-700" }, { l: "Featured", v: items.filter((i) => i.featured).length, c: "bg-orange-50 text-orange-700" }, { l: "Trending", v: items.filter((i) => i.trending).length, c: "bg-purple-50 text-purple-700" }].map((c) => (
          <div key={c.l} className={`px-4 py-2 rounded-xl text-sm font-semibold ${c.c}`}>{c.l}: {c.v}</div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-5 shadow-sm flex flex-wrap gap-3 items-center">
        <SearchBar value={search} onChange={setSearch} placeholder="Search news..." />
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

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                {["Headline", "Category", "Author", "Published", "Read Time", "Status", "Flags", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 max-w-xs"><div className="font-medium text-slate-800 truncate">{item.headline}</div><div className="text-xs text-slate-400 mt-0.5">{item.slug}</div></td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{item.category}</td>
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{item.author}</td>
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap text-xs">{item.publishDate}</td>
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{item.readTime}</td>
                  <td className="px-4 py-3 whitespace-nowrap"><StatusBadge status={item.status} /></td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex gap-1">{item.featured && <Star className="w-3.5 h-3.5 text-orange-400" />}{item.trending && <TrendingUp className="w-3.5 h-3.5 text-purple-500" />}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"><Edit className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"><Eye className="w-3.5 h-3.5" /></button>
                      <button onClick={() => setDeleteId(item.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="text-center py-12 text-slate-400">No news articles found.</div>}
        </div>
      </div>

      {showModal && (
        <Modal title={editId ? "Edit News Article" : "Add News Article"} onClose={() => setShowModal(false)} wide>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2"><InputField label="Headline" value={form.headline} onChange={(v) => setField("headline", v)} required placeholder="News headline..." /></div>
            <div className="md:col-span-2"><InputField label="Short Description" value={form.shortDesc} onChange={(v) => setField("shortDesc", v)} textarea rows={2} placeholder="Brief description..." /></div>
            <div className="md:col-span-2"><InputField label="Full Content" value={form.content} onChange={(v) => setField("content", v)} textarea rows={5} placeholder="Full article content..." /></div>
            <SelectField label="Category" value={form.category} onChange={(v) => setField("category", v)} options={CATEGORIES} required />
            <InputField label="Author" value={form.author} onChange={(v) => setField("author", v)} placeholder="Author name" />
            <InputField label="Publish Date" value={form.publishDate} onChange={(v) => setField("publishDate", v)} type="date" />
            <InputField label="Read Time" value={form.readTime} onChange={(v) => setField("readTime", v)} placeholder="3 min" />
            <SelectField label="Status" value={form.status} onChange={(v) => setField("status", v)} options={STATUSES} />
            <InputField label="SEO Slug" value={form.slug} onChange={(v) => setField("slug", v)} placeholder="news-article-slug" />
            <div className="md:col-span-2"><InputField label="Meta Description" value={form.metaDesc} onChange={(v) => setField("metaDesc", v)} textarea rows={2} placeholder="SEO meta description..." /></div>
            <InputField label="Video Link" value={form.videoLink} onChange={(v) => setField("videoLink", v)} placeholder="YouTube embed URL" />
            <InputField label="External Link" value={form.externalLink} onChange={(v) => setField("externalLink", v)} placeholder="https://..." />
            <div className="md:col-span-2 flex flex-wrap gap-4">
              {[["featured", "⭐ Featured"], ["trending", "🔥 Trending"], ["pinned", "📌 Pinned"]].map(([key, lbl]) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={!!(form as Record<string, unknown>)[key]} onChange={(e) => setField(key, e.target.checked)} className="w-4 h-4 rounded" />
                  <span className="text-sm font-medium text-slate-700">{lbl}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-200">
            <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">{editId ? "Update" : "Publish"}</button>
          </div>
        </Modal>
      )}
      {deleteId && <ConfirmDialog message="Delete this news article permanently?" onConfirm={() => { setItems((p) => p.filter((i) => i.id !== deleteId)); setDeleteId(null); }} onCancel={() => setDeleteId(null)} />}
    </AdminLayout>
  );
}
