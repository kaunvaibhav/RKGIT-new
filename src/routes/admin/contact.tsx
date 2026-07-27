import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Save } from "lucide-react";
import AdminLayout, { PageHeader, InputField } from "../../components/admin/AdminLayout";

export const Route = createFileRoute("/admin/contact")({ component: AdminContact });

function AdminContact() {
  const [form, setForm] = useState({
    address: "5th KM Stone, Delhi-Meerut Road, Ghaziabad, Uttar Pradesh - 201003",
    phone1: "0120-2788273",
    phone2: "0120-2788409",
    email1: "registrar@rkgit.edu.in",
    email2: "admission@rkgit.edu.in",
    emergency: "+91 9667652192",
    tollFree: "1800-120-777755",
    workHours: "Mon–Sat: 9:00 AM – 5:00 PM",
    mapsLink: "https://www.google.com/maps?q=Raj+Kumar+Goel+Institute+of+Technology+Ghaziabad",
    facebook: "https://facebook.com/rkgit",
    instagram: "https://instagram.com/rkgit",
    linkedin: "https://linkedin.com/school/rkgit",
    twitter: "https://twitter.com/rkgit",
    youtube: "https://youtube.com/rkgit",
    admissionPhone: "+91 9582945610",
    admissionEmail: "admission@rkgit.edu.in",
    registrarPhone: "0120-2788273",
    registrarEmail: "registrar@rkgit.edu.in",
  });
  const [saved, setSaved] = useState(false);
  const setField = (k: string, v: string) => { setForm((f) => ({ ...f, [k]: v })); setSaved(false); };

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 3000); };

  return (
    <AdminLayout currentPage="contact">
      <PageHeader title="Contact Information" subtitle="Manage all contact details displayed on the website" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Address & Location */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4"><MapPin className="w-4 h-4 text-blue-600" /><h2 className="font-bold text-slate-800">Address & Location</h2></div>
          <div className="space-y-4">
            <InputField label="Full Address" value={form.address} onChange={(v) => setField("address", v)} textarea rows={3} />
            <InputField label="Google Maps Link" value={form.mapsLink} onChange={(v) => setField("mapsLink", v)} />
          </div>
        </div>

        {/* Phone Numbers */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4"><Phone className="w-4 h-4 text-blue-600" /><h2 className="font-bold text-slate-800">Phone Numbers</h2></div>
          <div className="space-y-4">
            <InputField label="Primary Phone" value={form.phone1} onChange={(v) => setField("phone1", v)} />
            <InputField label="Secondary Phone" value={form.phone2} onChange={(v) => setField("phone2", v)} />
            <InputField label="Toll Free Number" value={form.tollFree} onChange={(v) => setField("tollFree", v)} />
            <InputField label="Emergency Contact" value={form.emergency} onChange={(v) => setField("emergency", v)} />
          </div>
        </div>

        {/* Email */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4"><Mail className="w-4 h-4 text-blue-600" /><h2 className="font-bold text-slate-800">Email Addresses</h2></div>
          <div className="space-y-4">
            <InputField label="General / Registrar Email" value={form.email1} onChange={(v) => setField("email1", v)} type="email" />
            <InputField label="Admission Email" value={form.email2} onChange={(v) => setField("email2", v)} type="email" />
          </div>
        </div>

        {/* Working Hours */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4"><Clock className="w-4 h-4 text-blue-600" /><h2 className="font-bold text-slate-800">Working Hours</h2></div>
          <InputField label="Office Hours" value={form.workHours} onChange={(v) => setField("workHours", v)} />
        </div>

        {/* Admission Contacts */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h2 className="font-bold text-slate-800 mb-4">Admission Contacts</h2>
          <div className="space-y-4">
            <InputField label="Admission Phone" value={form.admissionPhone} onChange={(v) => setField("admissionPhone", v)} />
            <InputField label="Admission Email" value={form.admissionEmail} onChange={(v) => setField("admissionEmail", v)} type="email" />
          </div>
        </div>

        {/* Registrar Contacts */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h2 className="font-bold text-slate-800 mb-4">Registrar Contacts</h2>
          <div className="space-y-4">
            <InputField label="Registrar Phone" value={form.registrarPhone} onChange={(v) => setField("registrarPhone", v)} />
            <InputField label="Registrar Email" value={form.registrarEmail} onChange={(v) => setField("registrarEmail", v)} type="email" />
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm lg:col-span-2">
          <h2 className="font-bold text-slate-800 mb-4">Social Media Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField label="Facebook" value={form.facebook} onChange={(v) => setField("facebook", v)} />
            <InputField label="Instagram" value={form.instagram} onChange={(v) => setField("instagram", v)} />
            <InputField label="LinkedIn" value={form.linkedin} onChange={(v) => setField("linkedin", v)} />
            <InputField label="Twitter / X" value={form.twitter} onChange={(v) => setField("twitter", v)} />
            <InputField label="YouTube" value={form.youtube} onChange={(v) => setField("youtube", v)} />
          </div>
        </div>
      </div>

      <div className="sticky bottom-6 flex justify-end mt-6">
        <button onClick={handleSave} className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold shadow-lg transition-all ${saved ? "bg-emerald-500 text-white" : "bg-blue-600 text-white hover:bg-blue-700"}`}>
          <Save className="w-4 h-4" />{saved ? "Saved!" : "Save Contact Info"}
        </button>
      </div>
    </AdminLayout>
  );
}
