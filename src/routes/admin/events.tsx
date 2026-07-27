import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Edit, Trash2, MapPin, Clock, User } from "lucide-react";
import AdminLayout, { PageHeader, SearchBar, StatusBadge, Modal, InputField, SelectField, ConfirmDialog } from "../../components/admin/AdminLayout";
import { CustomDropdown } from "../../components/ui/CustomDropdown";
import { EVENTS } from "../../components/admin/adminData";

export const Route = createFileRoute("/admin/events")({ component: AdminEvents });
type EventItem = (typeof EVENTS)[number];
const STATUSES = ["Upcoming", "Completed", "Cancelled"];
const CATEGORIES = ["Technical", "Competition", "Placement", "Cultural", "Alumni", "Academic", "Conference", "Sports", "Startup"];
const empty = { name: "", description: "", date: "", time: "", venue: "", category: "", status: "Upcoming", featured: false, homepageVisible: false, registrationLink: "", coordinator: "", chiefGuest: "", registrationDeadline: "" };

function AdminEvents() {
  const [items, setItems] = useState<EventItem[]>(EVENTS);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ ...empty });
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [view, setView] = useState<"table" | "cards">("table");

  const filtered = items.filter((i) => {
    const ms = i.name.toLowerCase().includes(search.toLowerCase()) || i.category.toLowerCase().includes(search.toLowerCase());
    const mst = filterStatus === "All" || i.status === filterStatus;
    return ms && mst;
  });

  const openAdd = () => { setForm({ ...empty }); setEditId(null); setShowModal(true); };
  const openEdit = (item: EventItem) => {
    setForm({ name: item.name, description: "", date: item.date, time: item.time, venue: item.venue, category: item.category, status: item.status, featured: item.featured, homepageVisible: item.homepageVisible, registrationLink: item.registrationLink, coordinator: item.coordinator, chiefGuest: "", registrationDeadline: "" });
    setEditId(item.id); setShowModal(true);
  };
  const handleSave = () => {
    if (editId) setItems((p) => p.map((i) => i.id === editId ? { ...i, ...form } : i));
    else setItems((p) => [{ ...form, id: Date.now() } as EventItem, ...p]);
    setShowModal(false);
  };
  const setField = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  const upcoming = items.filter((i) => i.status === "Upcoming").length;
  const completed = items.filter((i) => i.status === "Completed").length;
  const featured = items.filter((i) => i.featured).length;

  return (
    <AdminLayout currentPage="events">
      <PageHeader title="Events Management" subtitle={`${items.length} total events`} action={{ label: "Create Event", onClick: openAdd }} />

      <div className="flex flex-wrap gap-3 mb-5">
        {[{ l: "Total", v: items.length, c: "bg-blue-50 text-blue-700" }, { l: "Upcoming", v: upcoming, c: "bg-blue-100 text-blue-700" }, { l: "Completed", v: completed, c: "bg-purple-50 text-purple-700" }, { l: "Featured", v: featured, c: "bg-orange-50 text-orange-700" }].map((c) => (
          <div key={c.l} className={`px-4 py-2 rounded-xl text-sm font-semibold ${c.c}`}>{c.l}: {c.v}</div>
        ))}
        <div className="ml-auto flex gap-2">
          {(["table", "cards"] as const).map((v) => (
            <button key={v} onClick={() => setView(v)} className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors ${view === v ? "bg-blue-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
              {v === "table" ? "Table" : "Cards"}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-5 shadow-sm flex flex-wrap gap-3 items-center">
        <SearchBar value={search} onChange={setSearch} placeholder="Search events..." />
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

      {view === "table" ? (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  {["Event Name", "Category", "Date & Time", "Venue", "Coordinator", "Status", "Visibility", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 max-w-xs"><div className="font-medium text-slate-800 truncate">{item.name}</div></td>
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{item.category}</td>
                    <td className="px-4 py-3 whitespace-nowrap"><div className="text-xs font-medium text-slate-700">{item.date}</div><div className="text-xs text-slate-400">{item.time}</div></td>
                    <td className="px-4 py-3 max-w-[160px]"><div className="text-xs text-slate-600 truncate">{item.venue}</div></td>
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap text-xs">{item.coordinator}</td>
                    <td className="px-4 py-3 whitespace-nowrap"><StatusBadge status={item.status} /></td>
                    <td className="px-4 py-3 whitespace-nowrap"><div className="flex gap-1 text-xs">{item.featured && <span className="bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded font-medium">Featured</span>}{item.homepageVisible && <span className="bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded font-medium">Homepage</span>}</div></td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex gap-1">
                        <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"><Edit className="w-3.5 h-3.5" /></button>
                        <button onClick={() => setDeleteId(item.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="text-center py-12 text-slate-400">No events found.</div>}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex flex-col items-center justify-center text-[11px] font-bold leading-tight shrink-0">
                  <span className="text-lg">{item.date.split("-")[2]}</span>
                  <span>{new Date(item.date).toLocaleString("en", { month: "short" })}</span>
                </div>
                <StatusBadge status={item.status} />
              </div>
              <h3 className="font-semibold text-slate-800 text-sm leading-snug mb-2">{item.name}</h3>
              <div className="space-y-1.5 text-xs text-slate-500">
                <div className="flex items-center gap-1.5"><MapPin className="w-3 h-3" />{item.venue}</div>
                <div className="flex items-center gap-1.5"><Clock className="w-3 h-3" />{item.time}</div>
                <div className="flex items-center gap-1.5"><User className="w-3 h-3" />{item.coordinator}</div>
              </div>
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
                <button onClick={() => openEdit(item)} className="flex-1 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">Edit</button>
                <button onClick={() => setDeleteId(item.id)} className="flex-1 py-1.5 text-xs font-medium text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <Modal title={editId ? "Edit Event" : "Create Event"} onClose={() => setShowModal(false)} wide>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2"><InputField label="Event Name" value={form.name} onChange={(v) => setField("name", v)} required /></div>
            <div className="md:col-span-2"><InputField label="Description" value={form.description} onChange={(v) => setField("description", v)} textarea rows={3} /></div>
            <InputField label="Date" value={form.date} onChange={(v) => setField("date", v)} type="date" required />
            <InputField label="Time" value={form.time} onChange={(v) => setField("time", v)} placeholder="09:00 AM" />
            <div className="md:col-span-2"><InputField label="Venue" value={form.venue} onChange={(v) => setField("venue", v)} placeholder="Event venue / location" /></div>
            <SelectField label="Category" value={form.category} onChange={(v) => setField("category", v)} options={CATEGORIES} />
            <SelectField label="Status" value={form.status} onChange={(v) => setField("status", v)} options={STATUSES} />
            <InputField label="Coordinator" value={form.coordinator} onChange={(v) => setField("coordinator", v)} />
            <InputField label="Chief Guest" value={form.chiefGuest} onChange={(v) => setField("chiefGuest", v)} />
            <InputField label="Registration Link" value={form.registrationLink} onChange={(v) => setField("registrationLink", v)} placeholder="https://..." />
            <InputField label="Registration Deadline" value={form.registrationDeadline} onChange={(v) => setField("registrationDeadline", v)} type="date" />
            <div className="md:col-span-2 flex flex-wrap gap-4">
              {[["featured", "⭐ Featured"], ["homepageVisible", "🏠 Show on Homepage"]].map(([k, l]) => (
                <label key={k} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={!!(form as Record<string, unknown>)[k]} onChange={(e) => setField(k, e.target.checked)} className="w-4 h-4 rounded" />
                  <span className="text-sm font-medium text-slate-700">{l}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-200">
            <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">{editId ? "Update" : "Create Event"}</button>
          </div>
        </Modal>
      )}
      {deleteId && <ConfirmDialog message="Delete this event?" onConfirm={() => { setItems((p) => p.filter((i) => i.id !== deleteId)); setDeleteId(null); }} onCancel={() => setDeleteId(null)} />}
    </AdminLayout>
  );
}
