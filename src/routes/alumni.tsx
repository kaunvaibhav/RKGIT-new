import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer, Chatbot } from "./index";
import { useState } from "react";
import {
  Users,
  Award,
  Globe,
  CheckCircle2,
  Building2,
  GraduationCap,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/alumni")({
  head: () => ({
    meta: [
      { title: "RKGIT Alumni Association & Global Network" },
      {
        name: "description",
        content:
          "Connect with 12,000+ RKGIT alumni across Google, Microsoft, Amazon, and global startup ecosystems. Alumni registration, mentorship, and reunions.",
      },
    ],
  }),
  component: AlumniPage,
});

export const ALUMNI_DIRECTORY = [
  { name: "Ankit Sharma", batch: "2004", branch: "B.Tech CSE", company: "Google LLC (Mountain View)", designation: "Staff Software Engineer", location: "California, USA" },
  { name: "Priyanka Saxena", batch: "2006", branch: "B.Tech IT", company: "Microsoft India", designation: "Principal Program Manager", location: "Bengaluru, India" },
  { name: "Rohan Gupta", batch: "2008", branch: "B.Tech ECE", company: "Amazon Web Services (AWS)", designation: "Senior Cloud Architect", location: "Seattle, USA" },
  { name: "Varun Malhotra", batch: "2010", branch: "B.Tech CSE", company: "EdTech Unicorn Founder", designation: "CEO & Co-Founder", location: "Delhi-NCR, India" },
  { name: "Neha Verma", batch: "2011", branch: "B.Tech ME", company: "Tesla Motors", designation: "Senior EV Systems Engineer", location: "Fremont, USA" },
  { name: "Aditya Srivastava", batch: "2012", branch: "B.Tech EEE", company: "Siemens Energy", designation: "Lead Power Systems Engineer", location: "Munich, Germany" },
  { name: "Siddharth Jain", batch: "2014", branch: "B.Tech CSE", company: "Adobe Systems", designation: "Engineering Manager", location: "Noida, India" },
  { name: "Kriti Sharma", batch: "2015", branch: "B.Tech IT", company: "Salesforce", designation: "Senior Technical Architect", location: "London, UK" },
  { name: "Deepak Choudhary", batch: "2016", branch: "B.Tech CE", company: "L&T Construction", designation: "Project Manager", location: "Dubai, UAE" },
  { name: "Megha Rastogi", batch: "2017", branch: "B.Pharm", company: "Pfizer India", designation: "Senior Research Scientist", location: "Mumbai, India" },
  { name: "Ayush Saxena", batch: "2018", branch: "B.Tech CSE", company: "Meta (Facebook)", designation: "Machine Learning Engineer", location: "Singapore" },
  { name: "Shweta Tyagi", batch: "2019", branch: "MBA", company: "Deloitte Consulting", designation: "Senior Financial Consultant", location: "Gurugram, India" },
  { name: "Harsh Vardhan", batch: "2020", branch: "B.Tech CSE", company: "Uber Technologies", designation: "Senior Backend Engineer", location: "Bengaluru, India" },
  { name: "Divya Agarwal", batch: "2021", branch: "B.Tech ECE", company: "Qualcomm India", designation: "SOC Design Engineer", location: "Hyderabad, India" },
  { name: "Kartik Pandey", batch: "2022", branch: "B.Tech CSE", company: "Zomato", designation: "SDE-2 Frontend", location: "Gurugram, India" }
];

function AlumniPage() {
  const [registered, setRegistered] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Header />

      <main className="flex-1 pt-4 pb-16">
        {/* Hero Section */}
        <section className="relative bg-navy text-white overflow-hidden py-12 md:py-16">
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-primary/50" />
          <div className="container-page relative z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent text-accent-foreground px-3.5 py-1 text-xs font-bold uppercase tracking-wider mb-3">
              <Users className="h-3.5 w-3.5" /> 12,000+ Global Graduates
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              RKGIT Alumni Network & Association
            </h1>
            <p className="mt-2 text-sm sm:text-base text-white/85 max-w-2xl">
              Connecting thousands of proud RKGITians leading tech companies, research labs, and enterprises across the globe.
            </p>
          </div>
        </section>

        {/* Directory Table Section */}
        <section className="py-12 bg-background">
          <div className="container-page space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground">Distinguished Alumni Directory</h2>
                <p className="text-xs text-muted-foreground">Sample directory of RKGIT graduates leading global organizations</p>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-navy text-white text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-3.5">Alumni Name</th>
                      <th className="px-4 py-3.5">Grad Year</th>
                      <th className="px-4 py-3.5">Degree / Branch</th>
                      <th className="px-4 py-3.5">Current Company</th>
                      <th className="px-4 py-3.5">Designation</th>
                      <th className="px-4 py-3.5">Global Location</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {ALUMNI_DIRECTORY.map((a, i) => (
                      <tr key={i} className="hover:bg-primary-soft/30 transition-colors odd:bg-background even:bg-muted/20">
                        <td className="px-4 py-3.5 font-bold text-foreground">{a.name}</td>
                        <td className="px-4 py-3.5 font-mono text-primary font-bold">{a.batch}</td>
                        <td className="px-4 py-3.5 text-muted-foreground">{a.branch}</td>
                        <td className="px-4 py-3.5 font-semibold text-foreground">{a.company}</td>
                        <td className="px-4 py-3.5 text-muted-foreground">{a.designation}</td>
                        <td className="px-4 py-3.5 text-xs font-medium text-foreground/80">{a.location}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
