import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Save, GripVertical, Eye, EyeOff, Plus } from "lucide-react";
import AdminLayout, { PageHeader } from "../../components/admin/AdminLayout";

export const Route = createFileRoute("/admin/navigation")({ component: AdminNavigation });

type MenuItem = { id: number; label: string; href: string; enabled: boolean; external: boolean; children: SubItem[] };
type SubItem = { id: number; label: string; href: string; enabled: boolean };

const INIT_MENU: MenuItem[] = [
  { id: 1, label: "Home", href: "/", enabled: true, external: false, children: [] },
  { id: 2, label: "About", href: "#about", enabled: true, external: false, children: [{ id: 21, label: "Overview", href: "#overview", enabled: true }, { id: 22, label: "Vision & Mission", href: "#vision", enabled: true }] },
  { id: 3, label: "Academics", href: "#academics", enabled: true, external: false, children: [{ id: 31, label: "Programs", href: "#programs", enabled: true }, { id: 32, label: "Departments", href: "#departments", enabled: true }, { id: 33, label: "Faculty", href: "#faculty", enabled: true }] },
  { id: 4, label: "Admissions", href: "#admissions", enabled: true, external: false, children: [{ id: 41, label: "UG Admissions", href: "#ug", enabled: true }, { id: 42, label: "PG Admissions", href: "#pg", enabled: true }, { id: 43, label: "Fee Structure", href: "#fee", enabled: true }] },
  { id: 5, label: "Research", href: "#research", enabled: true, external: false, children: [] },
  { id: 6, label: "Placements", href: "#placements", enabled: true, external: false, children: [] },
  { id: 7, label: "Campus Life", href: "#campus", enabled: true, external: false, children: [] },
  { id: 8, label: "NIRF", href: "/nirf", enabled: true, external: false, children: [] },
  { id: 9, label: "Contact", href: "#contact", enabled: true, external: false, children: [] },
  { id: 10, label: "ERP Portal", href: "https://erp.rkgit.edu.in", enabled: true, external: true, children: [] },
];

function AdminNavigation() {
  const [menu, setMenu] = useState<MenuItem[]>(INIT_MENU);
  const [activeMenu, setActiveMenu] = useState<"header" | "footer">("header");
  const [saved, setSaved] = useState(false);

  const toggleItem = (id: number) => setMenu((m) => m.map((i) => i.id === id ? { ...i, enabled: !i.enabled } : i));
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 3000); };

  return (
    <AdminLayout currentPage="navigation">
      <PageHeader title="Navigation Menu" subtitle="Manage header and footer navigation" />

      <div className="flex gap-1 mb-6 bg-slate-100 p-1 rounded-xl w-fit">
        {(["header", "footer"] as const).map((t) => <button key={t} onClick={() => setActiveMenu(t)} className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all capitalize ${activeMenu === t ? "bg-white text-blue-600 shadow-sm" : "text-slate-600 hover:text-slate-800"}`}>{t} Menu</button>)}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-bold text-slate-800 capitalize">{activeMenu} Navigation</h2>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"><Plus className="w-3.5 h-3.5" />Add Item</button>
        </div>

        <div className="divide-y divide-slate-100">
          {menu.map((item) => (
            <div key={item.id} className={`p-4 ${!item.enabled ? "opacity-50" : ""}`}>
              <div className="flex items-center gap-3">
                <GripVertical className="w-4 h-4 text-slate-300 cursor-grab" />
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-slate-800 text-sm">{item.label}</span>
                    {item.external && <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-medium">External</span>}
                    {item.children.length > 0 && <span className="text-[10px] bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded font-medium">{item.children.length} children</span>}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{item.href}</div>
                </div>
                <button onClick={() => toggleItem(item.id)} className={`p-1.5 rounded-lg transition-colors ${item.enabled ? "text-emerald-600 hover:bg-emerald-50" : "text-slate-400 hover:bg-slate-100"}`}>
                  {item.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>
              </div>
              {item.children.length > 0 && (
                <div className="ml-7 mt-2 space-y-1.5">
                  {item.children.map((child) => (
                    <div key={child.id} className="flex items-center gap-3 py-1.5 px-3 bg-slate-50 rounded-lg">
                      <span className="flex-1 text-xs text-slate-600">{child.label}</span>
                      <span className="text-xs text-slate-400">{child.href}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold shadow-lg transition-all ${saved ? "bg-emerald-500 text-white" : "bg-blue-600 text-white hover:bg-blue-700"}`}>
          <Save className="w-4 h-4" />{saved ? "Saved!" : "Save Navigation"}
        </button>
      </div>
    </AdminLayout>
  );
}
