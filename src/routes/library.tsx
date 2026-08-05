import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer, Chatbot } from "./index";
import { useState } from "react";
import {
  BookOpen,
  Search,
  CheckCircle2,
  Clock,
  Globe,
  Download,
  Building2,
  FileText,
  Bookmark,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Central Library Portal & Book Catalogue — RKGIT Ghaziabad" },
      {
        name: "description",
        content:
          "Search 104,394+ physical and digital reference books, IEEE e-journals, and research publications in RKGIT Central Library.",
      },
    ],
  }),
  component: LibraryPage,
});

export const LIBRARY_BOOKS = [
  { id: 1, title: "Introduction to Algorithms (4th Edition)", author: "Thomas H. Cormen, Charles E. Leiserson", dept: "Computer Science", isbn: "978-0262046305", rack: "CS-Rack-04", status: "Available (8 Copies)", code: "005.1 COR" },
  { id: 2, title: "Artificial Intelligence: A Modern Approach", author: "Stuart Russell, Peter Norvig", dept: "AI & ML", isbn: "978-0134610993", rack: "AI-Rack-02", status: "Available (5 Copies)", code: "006.3 RUS" },
  { id: 3, title: "Deep Learning (Adaptive Computation)", author: "Ian Goodfellow, Yoshua Bengio", dept: "AI & ML", isbn: "978-0262035613", rack: "AI-Rack-03", status: "Available (4 Copies)", code: "006.32 GOO" },
  { id: 4, title: "Operating System Concepts (10th Ed)", author: "Abraham Silberschatz, Peter B. Galvin", dept: "Computer Science", isbn: "978-1118063330", rack: "CS-Rack-08", status: "Issued (0 Avail)", code: "005.43 SIL" },
  { id: 5, title: "Database System Concepts (7th Ed)", author: "Henry F. Korth, S. Sudarshan", dept: "Information Tech", isbn: "978-0078022159", rack: "IT-Rack-01", status: "Available (12 Copies)", code: "005.74 KOR" },
  { id: 6, title: "Computer Networks (5th Edition)", author: "Andrew S. Tanenbaum, David J. Wetherall", dept: "Information Tech", isbn: "978-0132126953", rack: "IT-Rack-05", status: "Available (6 Copies)", code: "004.6 TAN" },
  { id: 7, title: "Microelectronic Circuits (8th Ed)", author: "Adel S. Sedra, Kenneth C. Smith", dept: "Electronics & Comm", isbn: "978-0190853464", rack: "EC-Rack-02", status: "Available (9 Copies)", code: "621.381 SED" },
  { id: 8, title: "CMOS VLSI Design: A Circuits & Systems", author: "Neil Weste, David Harris", dept: "Electronics & Comm", isbn: "978-0321547743", rack: "EC-Rack-06", status: "Available (3 Copies)", code: "621.395 WES" },
  { id: 9, title: "Control Systems Engineering (7th Ed)", author: "Norman S. Nise", dept: "Electrical Engg", isbn: "978-1118170519", rack: "EE-Rack-01", status: "Available (7 Copies)", code: "629.8 NIS" },
  { id: 10, title: "Fundamentals of Electric Circuits", author: "Charles K. Alexander, Matthew Sadiku", dept: "Electrical Engg", isbn: "978-0078028229", rack: "EE-Rack-04", status: "Available (11 Copies)", code: "621.31 ALE" },
  { id: 11, title: "Shigley's Mechanical Engineering Design", author: "Richard G. Budynas, Keith J. Nisbett", dept: "Mechanical Engg", isbn: "978-0073398204", rack: "ME-Rack-03", status: "Available (10 Copies)", code: "621.815 BUD" },
  { id: 12, title: "Internal Combustion Engines (4th Ed)", author: "V. Ganesan", dept: "Mechanical Engg", isbn: "978-1259006197", rack: "ME-Rack-07", status: "Available (5 Copies)", code: "621.43 GAN" },
  { id: 13, title: "Design of Concrete Structures (15th Ed)", author: "Darwin, Dolan, Nilson", dept: "Civil Engineering", isbn: "978-0073397948", rack: "CE-Rack-02", status: "Available (6 Copies)", code: "624.183 DAR" },
  { id: 14, title: "Surveying Volume 1 & 2", author: "Dr. B. C. Punmia, Ashok Kumar Jain", dept: "Civil Engineering", isbn: "978-8170088530", rack: "CE-Rack-05", status: "Available (14 Copies)", code: "526.9 PUN" },
  { id: 15, title: "Remington: The Science and Practice of Pharmacy", author: "Adeboye Adejare", dept: "Pharmacy", isbn: "978-0128200070", rack: "PH-Rack-01", status: "Available (4 Copies)", code: "615.1 ADE" },
  { id: 16, title: "Pharmacotherapy: A Pathophysiologic Approach", author: "Joseph T. DiPiro, Robert L. Talbert", dept: "Pharmacy", isbn: "978-1260116816", rack: "PH-Rack-04", status: "Available (8 Copies)", code: "615.58 DIP" },
  { id: 17, title: "Financial Management: Theory and Practice", author: "Eugene F. Brigham, Michael C. Ehrhardt", dept: "Management (MBA)", isbn: "978-1337902601", rack: "MG-Rack-02", status: "Available (15 Copies)", code: "658.15 BRI" },
  { id: 18, title: "Marketing Management (16th Global Edition)", author: "Philip Kotler, Kevin Lane Keller", dept: "Management (MBA)", isbn: "978-1292404813", rack: "MG-Rack-05", status: "Available (10 Copies)", code: "658.8 KOT" },
  { id: 19, title: "Higher Engineering Mathematics (44th Ed)", author: "Dr. B. S. Grewal", dept: "Applied Sciences", isbn: "978-8193328491", rack: "AS-Rack-01", status: "Available (25 Copies)", code: "510 GRE" },
  { id: 20, title: "Engineering Physics (Revised Ed)", author: "H. K. Malik, A. Singh", dept: "Applied Sciences", isbn: "978-0070671539", rack: "AS-Rack-04", status: "Available (20 Copies)", code: "530 MAL" }
];

function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");

  const filteredBooks = LIBRARY_BOOKS.filter((b) => {
    const matchDept = selectedDept === "All" || b.dept === selectedDept;
    const matchQuery =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.isbn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchDept && matchQuery;
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Header />

      <main className="flex-1 pt-4 pb-16">
        {/* Hero Section */}
        <section className="relative bg-navy text-white overflow-hidden py-12 md:py-16">
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-primary/50" />
          <div className="container-page relative z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent text-accent-foreground px-3.5 py-1 text-xs font-bold uppercase tracking-wider mb-3">
              <BookOpen className="h-3.5 w-3.5" /> RKGIT Central Library
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Library Digital Catalogue & E-Journals
            </h1>
            <p className="mt-2 text-sm sm:text-base text-white/85 max-w-2xl">
              Search over 104,394+ volumes, IEEE Xplore, ScienceDirect, and digital archives available at RKGIT Central Library.
            </p>
          </div>
        </section>

        {/* E-Resources Bar */}
        <section className="py-6 bg-primary-soft/50 border-b border-border">
          <div className="container-page flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-primary">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-accent" /> Digital Subscriptions:
            </div>
            {["IEEE Xplore", "ScienceDirect", "Springer LNCS", "DELNET", "National Digital Library (NDLI)"].map((res) => (
              <a
                key={res}
                href="#"
                className="bg-white/80 hover:bg-white text-foreground/90 border border-primary/20 px-3 py-1.5 rounded-lg shadow-xs transition-colors"
              >
                {res} ↗
              </a>
            ))}
          </div>
        </section>

        <section className="py-12 bg-background">
          <div className="container-page space-y-6">
            {/* Search & Department Filters */}
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-card p-4 rounded-2xl border border-border shadow-xs">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by book title, author name, or ISBN..."
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div className="w-full sm:w-64">
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-border bg-background font-semibold"
                >
                  <option value="All">All Departments</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="AI & ML">AI & ML</option>
                  <option value="Information Tech">Information Tech</option>
                  <option value="Electronics & Comm">Electronics & Comm</option>
                  <option value="Electrical Engg">Electrical Engg</option>
                  <option value="Mechanical Engg">Mechanical Engg</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Pharmacy">Pharmacy</option>
                  <option value="Management (MBA)">Management (MBA)</option>
                  <option value="Applied Sciences">Applied Sciences</option>
                </select>
              </div>
            </div>

            {/* Book Catalogue Table */}
            <div className="rounded-2xl border border-border bg-card shadow-xs overflow-hidden">
              <div className="p-4 bg-navy text-white flex justify-between items-center text-xs font-bold">
                <span>Central Library Live Book Catalogue</span>
                <span>Found {filteredBooks.length} titles</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-muted/60 text-foreground/80 text-xs uppercase tracking-wider border-b border-border">
                    <tr>
                      <th className="px-4 py-3">Call Code</th>
                      <th className="px-4 py-3">Book Title</th>
                      <th className="px-4 py-3">Author(s)</th>
                      <th className="px-4 py-3">Department</th>
                      <th className="px-4 py-3">Rack Location</th>
                      <th className="px-4 py-3">Status / Copies</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {filteredBooks.length > 0 ? (
                      filteredBooks.map((b) => (
                        <tr key={b.id} className="hover:bg-primary-soft/30 transition-colors odd:bg-background even:bg-muted/20">
                          <td className="px-4 py-3 font-mono text-xs font-bold text-primary">{b.code}</td>
                          <td className="px-4 py-3 font-semibold text-foreground">{b.title}</td>
                          <td className="px-4 py-3 text-muted-foreground">{b.author}</td>
                          <td className="px-4 py-3 text-foreground/80">{b.dept}</td>
                          <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{b.rack}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                                b.status.includes("Issued")
                                  ? "bg-red-100 text-red-700"
                                  : "bg-emerald-100 text-emerald-800"
                              }`}
                            >
                              {b.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                          No books found matching search terms.
                        </td>
                      </tr>
                    )}
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
