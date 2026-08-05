import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer, Chatbot } from "./index";
import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Building2,
  CheckCircle2,
  MessageSquare,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/contact-us")({
  head: () => ({
    meta: [
      { title: "Contact Us & Campus Directory — RKGIT Ghaziabad" },
      {
        name: "description",
        content:
          "Contact Raj Kumar Goel Institute of Technology (RKGIT) Ghaziabad. Phone numbers, departmental email directory, admission helplines, and campus address.",
      },
    ],
  }),
  component: ContactUsPage,
});

export const CONTACT_DIRECTORY = [
  { dept: "Central Admissions Cell", person: "Mr. Rajeev Verma", phone: "+91-120-2788273", email: "admissions@rkgit.edu.in", location: "Ground Floor Block A" },
  { dept: "Director's Office", person: "Executive Assistant", phone: "+91-120-2788270", email: "director@rkgit.edu.in", office: "Room 101 Block A" },
  { dept: "Dean Academics Office", person: "Dr. D. K. Sharma", phone: "+91-120-2788272", email: "dean.academic@rkgit.edu.in", location: "Room 105 Block A" },
  { dept: "Training & Placement Cell", person: "Prof. H. G. Garg", phone: "+91-120-2788274", email: "head.tnp@rkgit.edu.in", location: "T&P Building Room 101" },
  { dept: "Registrar Office", person: "Registrar RKGIT", phone: "+91-120-2788271", email: "registrar@rkgit.edu.in", location: "Room 102 Block A" },
  { dept: "Accounts & Fee Counter", person: "Finance Officer", phone: "+91-120-2788275", email: "accounts@rkgit.edu.in", location: "Admin Block Ground Floor" },
  { dept: "Examination Cell", person: "Controller of Exams", phone: "+91-120-2788277", email: "coe@rkgit.edu.in", location: "Block C Room 201" },
  { dept: "Computer Science Dept", person: "Dr. Meenakshi Sharma", phone: "+91-120-2788276", email: "hod.cse@rkgit.edu.in", location: "Block B 2nd Floor" },
  { dept: "Information Tech Dept", person: "Dr. Amit Agarwal", phone: "+91-120-2788278", email: "hod.it@rkgit.edu.in", location: "Block B 1st Floor" },
  { dept: "Electronics & Comm Dept", person: "Dr. P. K. Singh", phone: "+91-120-2788279", email: "hod.ece@rkgit.edu.in", location: "Block C 1st Floor" },
  { dept: "Mechanical Engg Dept", person: "Dr. Sanjeev Kumar", phone: "+91-120-2788281", email: "hod.me@rkgit.edu.in", location: "Block D Ground Floor" },
  { dept: "Pharmacy College", person: "Dr. Anuj Sharma", phone: "+91-120-2788283", email: "director.pharmacy@rkgit.edu.in", location: "Pharmacy Block" },
  { dept: "Management Dept (MBA)", person: "Dr. Monica Sharma", phone: "+91-120-2788285", email: "hod.mba@rkgit.edu.in", location: "MBA Block" },
  { dept: "Chief Warden (Boys Hostel)", person: "Hostel Warden", phone: "+91-120-2788295", email: "boys.hostel@rkgit.edu.in", location: "Boys Hostel Block 1" },
  { dept: "Chief Warden (Girls Hostel)", person: "Lady Warden", phone: "+91-120-2788296", email: "girls.hostel@rkgit.edu.in", location: "Girls Hostel Block A" }
];

function ContactUsPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Header />

      <main className="flex-1 pt-4 pb-16">
        {/* Hero Section */}
        <section className="relative bg-navy text-white overflow-hidden py-12 md:py-16">
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-primary/50" />
          <div className="container-page relative z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent text-accent-foreground px-3.5 py-1 text-xs font-bold uppercase tracking-wider mb-3">
              <Phone className="h-3.5 w-3.5" /> Reach Out To Us
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Contact RKGIT Ghaziabad
            </h1>
            <p className="mt-2 text-sm sm:text-base text-white/85 max-w-2xl">
              We are here to help! Connect with our admissions counselors, department HODs, or visit our campus on Delhi-Meerut Road.
            </p>
          </div>
        </section>

        <section className="py-12 bg-background">
          <div className="container-page space-y-12">
            {/* Contact Form & Info Cards */}
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Inquiry Form */}
              <div className="lg:col-span-7 rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-lift">
                <h2 className="text-xl font-bold text-foreground mb-1">Send Us an Inquiry</h2>
                <p className="text-xs text-muted-foreground mb-6">Fill out the form below and our counseling desk will contact you within 24 hours.</p>

                {submitted ? (
                  <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-center space-y-3">
                    <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto" />
                    <h3 className="text-base font-bold">Message Sent Successfully!</h3>
                    <p className="text-xs text-emerald-700">Thank you for reaching out. An admission counselor has received your inquiry.</p>
                    <button onClick={() => setSubmitted(false)} className="text-xs font-bold text-emerald-800 underline">Send Another Message</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-foreground mb-1">Your Full Name *</label>
                        <input type="text" required placeholder="John Doe" className="w-full p-3 rounded-xl border border-border bg-background" />
                      </div>
                      <div>
                        <label className="block font-bold text-foreground mb-1">Mobile Number *</label>
                        <input type="tel" required placeholder="+91 98765 43210" className="w-full p-3 rounded-xl border border-border bg-background" />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-foreground mb-1">Email Address *</label>
                        <input type="email" required placeholder="john@example.com" className="w-full p-3 rounded-xl border border-border bg-background" />
                      </div>
                      <div>
                        <label className="block font-bold text-foreground mb-1">Inquiry Topic</label>
                        <select className="w-full p-3 rounded-xl border border-border bg-background font-semibold">
                          <option value="Admissions">Admissions & Eligibility 2026</option>
                          <option value="Fee Payment">Fee Structure & Online Payment</option>
                          <option value="Hostel">Hostel & Transport Inquiry</option>
                          <option value="Placements">Placements & Corporate Tie-ups</option>
                          <option value="General">General Campus Query</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-foreground mb-1">Message / Question *</label>
                      <textarea required rows={4} placeholder="Type your detailed query here..." className="w-full p-3 rounded-xl border border-border bg-background" />
                    </div>

                    <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-6 py-3 text-xs font-bold shadow-soft hover:bg-secondary">
                      Send Inquiry Message <Send className="h-3.5 w-3.5" />
                    </button>
                  </form>
                )}
              </div>

              {/* Campus Address Cards */}
              <div className="lg:col-span-5 space-y-4">
                <div className="rounded-3xl bg-navy text-white p-6 sm:p-8 shadow-lift space-y-4 border border-white/10">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-accent" /> Main Campus Address
                  </h3>
                  <div className="text-xs text-white/80 space-y-2">
                    <p className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      5 Km. Stone, Delhi-Meerut Road, Near Raj Nagar Extension Crossing, Ghaziabad, Uttar Pradesh 201003
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-accent shrink-0" />
                      +91-120-2788270, 2788273
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-accent shrink-0" />
                      rkgit@rkgit.edu.in / admissions@rkgit.edu.in
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-accent shrink-0" />
                      Office Hours: Monday – Saturday (09:00 AM – 05:00 PM)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Department Directory Table */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Departmental Contact Directory</h2>
              <div className="rounded-2xl border border-border bg-card shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-navy text-white text-xs uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-3.5">Department / Cell</th>
                        <th className="px-4 py-3.5">Contact Officer</th>
                        <th className="px-4 py-3.5">Phone Number</th>
                        <th className="px-4 py-3.5">Email Address</th>
                        <th className="px-4 py-3.5">Campus Location</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {CONTACT_DIRECTORY.map((c, i) => (
                        <tr key={i} className="hover:bg-primary-soft/30 transition-colors odd:bg-background even:bg-muted/20">
                          <td className="px-4 py-3 font-bold text-foreground">{c.dept}</td>
                          <td className="px-4 py-3 text-muted-foreground">{c.person}</td>
                          <td className="px-4 py-3 font-mono text-primary font-semibold">{c.phone}</td>
                          <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{c.email}</td>
                          <td className="px-4 py-3 text-xs text-foreground/80">{c.location || c.office}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}
