export type SearchCategory =
  | "Courses & Programs"
  | "Departments"
  | "Faculty & Staff"
  | "Admissions"
  | "Placements"
  | "Training & Internship"
  | "Research"
  | "Campus Life"
  | "Events"
  | "News & Announcements"
  | "Notices"
  | "Gallery"
  | "Contact & Location"
  | "FAQs"
  | "Important Links"
  | "Policies & Ordinances"
  | "Student Services";

export interface SearchItem {
  id: string;
  title: string;
  category: SearchCategory;
  description: string;
  url: string;
  isExternal?: boolean;
  keywords?: string[];
  badge?: string;
  iconName?: string;
}

const SEARCH_INDEX_DATABASE: SearchItem[] = [
  // ─── 1. Courses & Programs ──────────────────────────────────────────────────
  {
    id: "course-btech-cse",
    title: "B.Tech Computer Science & Engineering (CSE)",
    category: "Courses & Programs",
    description: "4-Year NBA Accredited UG program covering AI, Cloud Computing, Data Science and Software Engineering.",
    url: "/program?branch=Computer%20Science%20and%20Engineering%20(NBA%20Accredited)",
    badge: "NBA Accredited",
    keywords: ["btech", "cse", "computer science", "engineering", "nba", "programming", "coding", "software"],
    iconName: "GraduationCap",
  },
  {
    id: "course-btech-aiml",
    title: "B.Tech AI & Machine Learning (CSE-AIML)",
    category: "Courses & Programs",
    description: "Specialized 4-year degree focusing on Neural Networks, Deep Learning, Computer Vision and Natural Language Processing.",
    url: "/program?branch=Computer%20Science%20and%20Engineering%20(Artificial%20Intelligence%20and%20Machine%20Learning)",
    badge: "Specialization",
    keywords: ["ai", "ml", "artificial intelligence", "machine learning", "python", "deep learning", "cse"],
    iconName: "GraduationCap",
  },
  {
    id: "course-btech-ds",
    title: "B.Tech Data Science (CSE-DS)",
    category: "Courses & Programs",
    description: "4-Year undergraduate program in Big Analytics, Machine Learning algorithms, and Data Visualization.",
    url: "/program?branch=Computer%20Science%20and%20Engineering%20(Data%20Science)",
    badge: "Specialization",
    keywords: ["data science", "big data", "analytics", "statistics", "cse", "python"],
    iconName: "GraduationCap",
  },
  {
    id: "course-btech-it",
    title: "B.Tech Information Technology (IT)",
    category: "Courses & Programs",
    description: "4-Year NBA Accredited degree in Network Security, Web Engineering, and Enterprise Software Systems.",
    url: "/program?branch=Information%20Technology%20(NBA%20Accredited)",
    badge: "NBA Accredited",
    keywords: ["it", "information technology", "networking", "web development", "cybersecurity"],
    iconName: "GraduationCap",
  },
  {
    id: "course-btech-ece",
    title: "B.Tech Electronics & Communication Engineering (ECE)",
    category: "Courses & Programs",
    description: "4-Year NBA Accredited course in VLSI design, Embedded Systems, Signal Processing and Robotics.",
    url: "/program?branch=Electronics%20and%20Communication%20Engineering%20(NBA%20Accredited)",
    badge: "NBA Accredited",
    keywords: ["ece", "electronics", "communication", "vlsi", "embedded", "iot", "robotics"],
    iconName: "GraduationCap",
  },
  {
    id: "course-btech-me",
    title: "B.Tech Mechanical Engineering (ME)",
    category: "Courses & Programs",
    description: "4-Year undergraduate program covering CAD/CAM, Thermal Engineering, Mechatronics and Automobile Engineering.",
    url: "/program?branch=Mechanical%20Engineering",
    keywords: ["mechanical", "me", "cad", "cam", "thermal", "automobile", "machinery"],
    iconName: "GraduationCap",
  },
  {
    id: "course-btech-ce",
    title: "B.Tech Civil Engineering (CE)",
    category: "Courses & Programs",
    description: "4-Year program in Structural Design, Geotechnical Engineering, GIS, and Sustainable Infrastructure Construction.",
    url: "/program?branch=Civil%20Engineering",
    keywords: ["civil", "ce", "structure", "construction", "gis", "surveying", "building"],
    iconName: "GraduationCap",
  },
  {
    id: "course-btech-eee",
    title: "B.Tech Electrical & Electronics Engineering (EEE)",
    category: "Courses & Programs",
    description: "4-Year degree in Power Systems, Renewable Energy Microgrids, Control Automation, and Electric Vehicles.",
    url: "/program?branch=Electrical%20and%20Electronics%20Engineering",
    keywords: ["eee", "electrical", "power systems", "renewable energy", "ev", "circuit"],
    iconName: "GraduationCap",
  },
  {
    id: "course-mba",
    title: "MBA — Master of Business Administration",
    category: "Courses & Programs",
    description: "2-Year AICTE approved PG program in Finance, Marketing, Human Resources, and International Business.",
    url: "/program?branch=MBA",
    badge: "PG Degree",
    keywords: ["mba", "management", "business", "finance", "marketing", "hr", "corporate"],
    iconName: "GraduationCap",
  },
  {
    id: "course-mca",
    title: "MCA — Master of Computer Applications",
    category: "Courses & Programs",
    description: "2-Year professional PG degree in Advanced Software Architecture, Full Stack Web & Mobile App Development.",
    url: "/program?branch=MCA",
    badge: "PG Degree",
    keywords: ["mca", "computer applications", "fullstack", "software engineering", "bca"],
    iconName: "GraduationCap",
  },
  {
    id: "course-bpharm",
    title: "B.Pharmacy — Bachelor of Pharmacy",
    category: "Courses & Programs",
    description: "4-Year PCI approved degree in Pharmaceutical Sciences, Drug Discovery, Pharmacology, and Quality Assurance.",
    url: "/program?branch=Pharmacy",
    badge: "PCI Approved",
    keywords: ["pharmacy", "bpharm", "drugs", "pharma", "medicine", "pci"],
    iconName: "GraduationCap",
  },
  {
    id: "course-dpharm",
    title: "D.Pharmacy — Diploma in Pharmacy",
    category: "Courses & Programs",
    description: "2-Year diploma preparing students for retail pharmacy, hospital dispensing, and pharmaceutical manufacturing.",
    url: "/program?branch=Pharmacy",
    badge: "Diploma",
    keywords: ["dpharm", "diploma", "pharmacy", "medical store", "chemist"],
    iconName: "GraduationCap",
  },

  // ─── 2. Departments ────────────────────────────────────────────────────────
  {
    id: "dept-cse",
    title: "Department of Computer Science & Engineering",
    category: "Departments",
    description: "State-of-the-art computer labs, high-speed Wi-Fi, AI research centers and 24 full-time faculty members.",
    url: "/program?branch=Computer%20Science%20and%20Engineering%20(NBA%20Accredited)",
    keywords: ["cse department", "computer science faculty", "hod rajiv kumar", "labs"],
    iconName: "Building2",
  },
  {
    id: "dept-ece",
    title: "Department of Electronics & Communication",
    category: "Departments",
    description: "Advanced VLSI design lab, Embedded Systems incubation center, and IoT research facilities.",
    url: "/program?branch=Electronics%20and%20Communication%20Engineering%20(NBA%20Accredited)",
    keywords: ["ece department", "electronics lab", "anita sharma", "iot lab"],
    iconName: "Building2",
  },
  {
    id: "dept-me",
    title: "Department of Mechanical Engineering",
    category: "Departments",
    description: "Heavy machinery workshops, CNC machining lab, 3D printing equipment, and Mechatronics research.",
    url: "/program?branch=Mechanical%20Engineering",
    keywords: ["me department", "workshop", "cnc lab", "suresh verma"],
    iconName: "Building2",
  },
  {
    id: "dept-mba",
    title: "Department of Management Studies (MBA)",
    category: "Departments",
    description: "Smart classrooms, Bloomberg simulation terminal, corporate mentorship, and executive seminars.",
    url: "/program?branch=MBA",
    keywords: ["mba department", "management faculty", "business school"],
    iconName: "Building2",
  },
  {
    id: "dept-pharmacy",
    title: "Department of Pharmacy",
    category: "Departments",
    description: "PCI accredited pharmacology labs, medicinal chemistry facility, and central instrumentation room.",
    url: "/program?branch=Pharmacy",
    keywords: ["pharmacy department", "pharma lab", "pci"],
    iconName: "Building2",
  },

  // ─── 3. Faculty & Staff ────────────────────────────────────────────────────
  {
    id: "faculty-rajiv-kumar",
    title: "Dr. Rajiv Kumar — Professor & HOD (CSE)",
    category: "Faculty & Staff",
    description: "Ph.D from IIT Delhi with 22+ years experience specializing in Artificial Intelligence, Machine Learning and Deep Networks.",
    url: "/program?branch=Computer%20Science%20and%20Engineering%20(NBA%20Accredited)",
    keywords: ["rajiv kumar", "hod cse", "iit delhi", "faculty", "professor"],
    iconName: "Users",
  },
  {
    id: "faculty-anita-sharma",
    title: "Dr. Anita Sharma — Professor & HOD (ECE)",
    category: "Faculty & Staff",
    description: "Ph.D from IIT Roorkee with 18+ years experience in VLSI Design, Microelectronics, and Digital Signal Processing.",
    url: "/program?branch=Electronics%20and%20Communication%20Engineering%20(NBA%20Accredited)",
    keywords: ["anita sharma", "hod ece", "iit roorkee", "vlsi", "faculty"],
    iconName: "Users",
  },
  {
    id: "faculty-suresh-verma",
    title: "Dr. Suresh Verma — Professor & HOD (ME)",
    category: "Faculty & Staff",
    description: "Ph.D from IIT BHU with 20+ years of research in Thermal Engineering, Energy Systems, and CAD/CAM.",
    url: "/program?branch=Mechanical%20Engineering",
    keywords: ["suresh verma", "hod me", "iit bhu", "mechanical faculty"],
    iconName: "Users",
  },
  {
    id: "faculty-priya-gupta",
    title: "Dr. Priya Gupta — Assistant Professor (Data Science)",
    category: "Faculty & Staff",
    description: "Ph.D in Computer Science specializing in Big Data Analytics, Python Programming and Data Mining.",
    url: "/program?branch=Computer%20Science%20and%20Engineering%20(Data%20Science)",
    keywords: ["priya gupta", "data science faculty", "python", "cse"],
    iconName: "Users",
  },

  // ─── 4. Admissions ─────────────────────────────────────────────────────────
  {
    id: "adm-apply",
    title: "Admission 2026-27 Registration Portal",
    category: "Admissions",
    description: "Direct link to register online for B.Tech, M.Tech, MBA, MCA and Pharmacy admissions for session 2026-27.",
    url: "https://admission.rkgit.edu.in",
    isExternal: true,
    badge: "Official Portal",
    keywords: ["admission 2026", "apply online", "registration", "uptac", "jee main", "direct admission"],
    iconName: "Sparkles",
  },
  {
    id: "adm-fees",
    title: "Fee Structure & Payment Schedule 2026-27",
    category: "Admissions",
    description: "Detailed tuition, hostel, transport, and examination fee breakdowns for all UG & PG programs.",
    url: "/pay-fee",
    keywords: ["fee structure", "tuition fees", "hostel fee", "bus fee", "installment", "pay fee online"],
    iconName: "CreditCard",
  },
  {
    id: "adm-scholarship",
    title: "Merit & Category Scholarships",
    category: "Admissions",
    description: "Up to 100% tuition fee waiver scholarships based on JEE Main percentiles, 12th board marks, and UP Government schemes.",
    url: "/pay-fee",
    badge: "Scholarships",
    keywords: ["scholarship", "fee waiver", "up scholarship", "jee merit scholarship", "financial aid"],
    iconName: "Trophy",
  },
  {
    id: "adm-eligibility",
    title: "Eligibility Criteria & Required Documents",
    category: "Admissions",
    description: "Check qualification prerequisites for UPTAC counselling, direct management quota, transfer candidates, and required original certificates.",
    url: "https://rkgit.edu.in/admission-procedure",
    isExternal: true,
    keywords: ["eligibility", "documents required", "12th percentage", "jee main cutoff", "migration certificate"],
    iconName: "FileText",
  },

  // ─── 5. Placements ──────────────────────────────────────────────────────────
  {
    id: "placement-stats",
    title: "Placement Statistics & Records 2025-26",
    category: "Placements",
    description: "8,500+ placement offers over 26 years. Highest package: 34 LPA. Average package: 6.8 LPA with 300+ recruiters.",
    url: "/placements",
    badge: "34 LPA Highest",
    keywords: ["placements", "highest package", "average package", "placement record", "salary package", "placement percentage"],
    iconName: "Trophy",
  },
  {
    id: "placement-recruiters",
    title: "Top Recruiters & Corporate Partners",
    category: "Placements",
    description: "View top hiring companies including Amazon, Autodesk, TCS, Infosys, Wipro, HCL, Cognizant, Capgemini, and Tech Mahindra.",
    url: "/placements/recruiters",
    keywords: ["recruiters", "companies", "amazon", "tcs", "infosys", "wipro", "hcl", "cognizant"],
    iconName: "Briefcase",
  },
  {
    id: "placement-team",
    title: "Training & Placement Cell (T&P)",
    category: "Placements",
    description: "Dedicated corporate relations team providing pre-placement training, mock interviews, resume writing, and soft skills workshops.",
    url: "/placements",
    keywords: ["placement cell", "tp officer", "corporate relations", "mock interview", "placement team"],
    iconName: "Briefcase",
  },

  // ─── 6. Training & Internship ──────────────────────────────────────────────
  {
    id: "train-coe",
    title: "Center of Excellence & Skill Labs",
    category: "Training & Internship",
    description: "Industry sponsored skill development centers in AWS Cloud, Cisco Networking, Cyber Security, and Robotics.",
    url: "/program?branch=Computer%20Science%20and%20Engineering%20(NBA%20Accredited)",
    keywords: ["center of excellence", "coe", "aws", "cisco", "skill development", "certifications"],
    iconName: "FlaskConical",
  },
  {
    id: "train-industrial-visit",
    title: "Industrial Visits & DRDO Excursions",
    category: "Training & Internship",
    description: "Hands-on industrial exposure tours to DRDO Ghaziabad, BHEL, NTPC, and leading IT software technology parks.",
    url: "/placements",
    keywords: ["industrial visit", "drdo", "bhel", "ntpc", "summer internship"],
    iconName: "Briefcase",
  },

  // ─── 7. Research ───────────────────────────────────────────────────────────
  {
    id: "res-cell",
    title: "RKGIT Research & Innovation Cell",
    category: "Research",
    description: "Promoting interdisciplinary research, funded projects from DST/AICTE, IEEE international conference publications, and patent filings.",
    url: "/nirf",
    keywords: ["research", "patents", "ieee conference", "publications", "funding", "dst", "aicte"],
    iconName: "FlaskConical",
  },
  {
    id: "res-incubation",
    title: "Incubation Center & E-Cell",
    category: "Research",
    description: "Seed funding, mentorship, prototype development support, and office space for student startups and technological ventures.",
    url: "/program",
    keywords: ["incubation", "ecell", "startup", "entrepreneurship", "seed funding"],
    iconName: "Sparkles",
  },

  // ─── 8. Campus Life ────────────────────────────────────────────────────────
  {
    id: "campus-hostel",
    title: "Hostel & Residential Facilities",
    category: "Campus Life",
    description: "Separate air-conditioned & non-AC hostels for boys and girls inside the main campus with 24x7 Wi-Fi, mess, gym, and security.",
    url: "/program",
    badge: "24x7 Security",
    keywords: ["hostel", "boys hostel", "girls hostel", "mess", "boarding", "room rent", "gym", "wifi"],
    iconName: "Building2",
  },
  {
    id: "campus-sports",
    title: "Sports Complex & Gymnasium",
    category: "Campus Life",
    description: "Basketball courts, cricket ground, badminton halls, indoor games complex, and modern fitness gym with trained coaches.",
    url: "/program",
    keywords: ["sports", "cricket", "basketball", "gym", "fitness", "games"],
    iconName: "Trophy",
  },
  {
    id: "campus-clubs",
    title: "Student Clubs & Cultural Societies",
    category: "Campus Life",
    description: "Technical societies (Coding Club, Robotics Club) and cultural clubs (Music, Dance, Drama, Literary, Photography).",
    url: "/program",
    keywords: ["clubs", "societies", "coding club", "robotics club", "dance club", "dramatics"],
    iconName: "Sparkles",
  },

  // ─── 9. Events ─────────────────────────────────────────────────────────────
  {
    id: "event-techfest",
    title: "Techfest 2025 — Annual Technical Festival",
    category: "Events",
    description: "Grand annual inter-college techfest featuring hackathons, bot wars, coding battles, project expos, and guest keynotes.",
    url: "/program",
    badge: "Annual Event",
    keywords: ["techfest", "hackathon", "bot war", "coding battle", "events"],
    iconName: "Calendar",
  },
  {
    id: "event-sih",
    title: "Smart India Hackathon (SIH) Internal Hackathon",
    category: "Events",
    description: "36-hour non-stop hackathon competition to select top innovation projects representing RKGIT at national SIH finals.",
    url: "/program",
    keywords: ["sih", "smart india hackathon", "internal round", "programming competition"],
    iconName: "Calendar",
  },

  // ─── 10. News & Announcements ─────────────────────────────────────────────
  {
    id: "news-nirf",
    title: "RKGIT Ranked in NIRF Engineering Category",
    category: "News & Announcements",
    description: "Official NIRF ranking report and institutional data disclosures showcasing growth in research output and placement packages.",
    url: "/nirf",
    keywords: ["nirf", "ranking", "achievement", "news"],
    iconName: "Megaphone",
  },
  {
    id: "news-microsoft-mou",
    title: "RKGIT Signs MoU with Microsoft Cloud",
    category: "News & Announcements",
    description: "Partnership bringing official Azure Cloud certifications, AI workshops, and enterprise dev resources to RKGIT students.",
    url: "/nirf",
    keywords: ["microsoft", "mou", "azure", "cloud", "news"],
    iconName: "Megaphone",
  },

  // ─── 11. Notices ───────────────────────────────────────────────────────────
  {
    id: "notice-exam",
    title: "AKTU Semester End Examination Schedule",
    category: "Notices",
    description: "Official examination timetable, admit card download dates, and exam center guidelines issued by the Controller of Exams.",
    url: "https://rkgit.edu.in/mandatory-disclosure",
    isExternal: true,
    keywords: ["notice", "aktu exam", "timetable", "admit card", "examination notice"],
    iconName: "Bell",
  },
  {
    id: "notice-fee-deadline",
    title: "Annual Fee Payment Last Date Notice",
    category: "Notices",
    description: "Important notification regarding late fee waiver grace period and online portal payment links.",
    url: "/pay-fee",
    keywords: ["fee notice", "last date", "deadline", "pay fee online"],
    iconName: "Bell",
  },

  // ─── 12. Gallery ───────────────────────────────────────────────────────────
  {
    id: "gallery-campus",
    title: "Campus Infrastructure & Architecture Gallery",
    category: "Gallery",
    description: "High-resolution photo tour of the 27+ acre green campus, academic blocks, central library, and auditoriums.",
    url: "https://rkgit.edu.in/",
    isExternal: true,
    keywords: ["gallery", "photos", "campus pictures", "infrastructure images"],
    iconName: "Image",
  },

  // ─── 13. Contact & Location ───────────────────────────────────────────────
  {
    id: "contact-office",
    title: "Admission Office & Toll-Free Helpline",
    category: "Contact & Location",
    description: "5 Km Stone, Delhi-Meerut Road, Ghaziabad, UP — 201003. Toll-Free: 1800-120-777755 / Phone: +91 96676 52196.",
    url: "https://rkgit.edu.in/admission-procedure",
    isExternal: true,
    keywords: ["contact", "phone number", "address", "ghaziabad", "email", "toll free", "location", "map"],
    iconName: "PhoneCall",
  },

  // ─── 14. FAQs ──────────────────────────────────────────────────────────────
  {
    id: "faq-admission",
    title: "Frequently Asked Questions (Admission & Fees)",
    category: "FAQs",
    description: "Answers to common queries regarding direct admission criteria, lateral entry eligibility, hostel mess fees, and bus facility.",
    url: "/pay-fee",
    keywords: ["faq", "questions", "queries", "admission faq", "how to apply"],
    iconName: "HelpCircle",
  },

  // ─── 15. Important Links ───────────────────────────────────────────────────
  {
    id: "link-erp",
    title: "RKGIT ERP Portal & Student Log-in",
    category: "Important Links",
    description: "Access attendance records, internal sessional marks, online fee receipts, course lecture notes, and faculty feedback.",
    url: "https://rkgit.edu.in/",
    isExternal: true,
    badge: "Student Portal",
    keywords: ["erp", "student portal", "attendance", "login", "marks", "sessional"],
    iconName: "ExternalLink",
  },
  {
    id: "link-library",
    title: "Central Digital Library & E-Journals",
    category: "Important Links",
    description: "DELNET subscription, IEEE Xplore digital library access, 100,000+ volumes, e-books, and quiet study zones.",
    url: "https://rkgit.edu.in/information-brochure",
    isExternal: true,
    keywords: ["library", "books", "ieee", "delnet", "journals", "e-library"],
    iconName: "ExternalLink",
  },
  {
    id: "link-grievance",
    title: "Online Grievance Redressal Cell",
    category: "Important Links",
    description: "Confidential portal for student, faculty, and parent grievance submissions and anti-ragging complaints.",
    url: "https://rkgit.edu.in/grievance-redressal",
    isExternal: true,
    keywords: ["grievance", "complaint", "anti-ragging", "redressal"],
    iconName: "ExternalLink",
  },
  {
    id: "link-mandatory",
    title: "Mandatory Disclosure & AICTE Approvals",
    category: "Important Links",
    description: "Public disclosure documents, AKTU affiliation letters, AICTE approval extensions, and NBA certificates.",
    url: "https://rkgit.edu.in/mandatory-disclosure",
    isExternal: true,
    keywords: ["mandatory disclosure", "aicte", "aktu", "nba", "approval"],
    iconName: "ExternalLink",
  },

  // ─── 16. Policies & Ordinances ─────────────────────────────────────────────
  {
    id: "policy-antiragging",
    title: "Anti-Ragging Policy & UGC Rules",
    category: "Policies & Ordinances",
    description: "Strict zero-tolerance policy against ragging with 24x7 squad helpline numbers and online affidavit registration.",
    url: "https://rkgit.edu.in/mandatory-disclosure",
    isExternal: true,
    keywords: ["anti ragging", "policy", "discipline", "rules", "affidavit"],
    iconName: "FileText",
  },

  // ─── 17. Student Services ──────────────────────────────────────────────────
  {
    id: "service-verification",
    title: "Ex-Student Degree & Document Verification",
    category: "Student Services",
    description: "Online service for employers, background check agencies, and alumni to verify degree certificates and transcripts.",
    url: "https://rkgit.edu.in/ex-student-verification",
    isExternal: true,
    keywords: ["verification", "ex student", "degree verification", "transcript", "alumni verification"],
    iconName: "FileText",
  },
];

let DYNAMIC_SEARCH_INDEX: SearchItem[] = [...SEARCH_INDEX_DATABASE];

/**
 * Registers new search items dynamically into the index registry.
 * This ensures any newly created page automatically becomes searchable.
 */
export function registerSearchItems(items: SearchItem[]) {
  const existingIds = new Set(DYNAMIC_SEARCH_INDEX.map((i) => i.id));
  for (const item of items) {
    if (!existingIds.has(item.id)) {
      DYNAMIC_SEARCH_INDEX.push(item);
      existingIds.add(item.id);
    }
  }
}

/**
 * Performs a fast, ranked search across all 17 categories in the search registry.
 */
export function searchIndex(rawQuery: string): SearchItem[] {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return [];

  const tokens = query.split(/\s+/).filter(Boolean);

  return DYNAMIC_SEARCH_INDEX.map((item) => {
    const titleLower = item.title.toLowerCase();
    const catLower = item.category.toLowerCase();
    const descLower = item.description.toLowerCase();
    const kwLower = (item.keywords || []).join(" ").toLowerCase();

    let score = 0;

    // Exact title match receives highest priority
    if (titleLower === query) score += 100;
    else if (titleLower.startsWith(query)) score += 60;
    else if (titleLower.includes(query)) score += 40;

    // Keyword match
    if (kwLower.includes(query)) score += 35;

    // Category match
    if (catLower.includes(query)) score += 25;

    // Description match
    if (descLower.includes(query)) score += 15;

    // Token-by-token scoring
    for (const token of tokens) {
      if (titleLower.includes(token)) score += 10;
      if (kwLower.includes(token)) score += 8;
      if (descLower.includes(token)) score += 4;
    }

    return { item, score };
  })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.item);
}
