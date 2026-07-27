// ─── RKGIT Admin CMS — Central Dummy Data Store ───────────────────────────

export const ADMIN_CREDENTIALS = {
  email: "rkgit@rkgit.edu.in",
  password: "admin123",
};

// ─── Dashboard Stats ───────────────────────────────────────────────────────
export const DASHBOARD_STATS = {
  announcements: 24,
  news: 18,
  events: 12,
  courses: 22,
  departments: 8,
  faculty: 156,
  placementCompanies: 87,
  jobs: 5,
  downloads: 43,
  galleryImages: 312,
  visitors: 48290,
  admissionEnquiries: 1342,
};

export const RECENT_ACTIVITIES = [
  { id: 1, action: "Announcement Published", user: "Admin", time: "2 mins ago", type: "success" },
  { id: 2, action: "Homepage Hero Updated", user: "Admin", time: "15 mins ago", type: "info" },
  { id: 3, action: "Course B.Tech CSE Edited", user: "Admin", time: "1 hour ago", type: "info" },
  { id: 4, action: "Faculty Dr. Sharma Added", user: "Admin", time: "2 hours ago", type: "success" },
  { id: 5, action: "Placement Stats Updated", user: "Admin", time: "3 hours ago", type: "info" },
  { id: 6, action: "Gallery Album Created", user: "Admin", time: "5 hours ago", type: "success" },
  { id: 7, action: "News Article Deleted", user: "Admin", time: "Yesterday", type: "danger" },
  { id: 8, action: "NIRF Data Uploaded", user: "Admin", time: "Yesterday", type: "success" },
  { id: 9, action: "Banner Image Changed", user: "Admin", time: "2 days ago", type: "info" },
  { id: 10, action: "Job Posting Closed", user: "Admin", time: "2 days ago", type: "warning" },
];

// ─── Announcements ─────────────────────────────────────────────────────────
export const ANNOUNCEMENTS = [
  { id: 1, title: "Admission Open 2025-26 — B.Tech, M.Tech, MBA, MCA", category: "Admissions", priority: "High", status: "Published", pinned: true, featured: true, department: "All", publishDate: "2025-06-01", expiryDate: "2025-09-30", tags: ["admission", "2025"] },
  { id: 2, title: "RKGIT Ranked in NIRF 2025 — Top 200 Engineering Colleges", category: "Achievement", priority: "High", status: "Published", pinned: true, featured: true, department: "All", publishDate: "2025-05-15", expiryDate: "2025-12-31", tags: ["nirf", "ranking"] },
  { id: 3, title: "Hackathon 2025 — Register Now for Smart India Hackathon", category: "Event", priority: "Medium", status: "Published", pinned: false, featured: true, department: "CSE", publishDate: "2025-07-01", expiryDate: "2025-08-15", tags: ["hackathon", "SIH"] },
  { id: 4, title: "NAAC Peer Team Visit — Schedule Announced", category: "Academic", priority: "High", status: "Published", pinned: true, featured: false, department: "All", publishDate: "2025-06-20", expiryDate: "2025-08-01", tags: ["NAAC", "accreditation"] },
  { id: 5, title: "Campus Recruitment Drive — TCS, Infosys, Wipro", category: "Placement", priority: "High", status: "Published", pinned: false, featured: true, department: "All", publishDate: "2025-07-10", expiryDate: "2025-07-30", tags: ["placement", "campus"] },
  { id: 6, title: "New Lab Equipment Installed in ECE Department", category: "Infrastructure", priority: "Low", status: "Published", pinned: false, featured: false, department: "ECE", publishDate: "2025-06-25", expiryDate: "2025-12-31", tags: ["lab", "ECE"] },
  { id: 7, title: "Semester End Examination Schedule — June 2025", category: "Exam", priority: "High", status: "Published", pinned: true, featured: false, department: "All", publishDate: "2025-05-20", expiryDate: "2025-06-30", tags: ["exam", "schedule"] },
  { id: 8, title: "Fee Submission Deadline — Last Date July 31", category: "Finance", priority: "High", status: "Published", pinned: true, featured: false, department: "All", publishDate: "2025-07-01", expiryDate: "2025-07-31", tags: ["fee", "deadline"] },
  { id: 9, title: "Research Paper Submission Open — IEEE Conference", category: "Research", priority: "Medium", status: "Draft", pinned: false, featured: false, department: "All", publishDate: "2025-08-01", expiryDate: "2025-09-30", tags: ["research", "IEEE"] },
  { id: 10, title: "Sports Week 2025 — Registration Open", category: "Sports", priority: "Medium", status: "Scheduled", pinned: false, featured: false, department: "All", publishDate: "2025-08-10", expiryDate: "2025-08-25", tags: ["sports", "annual"] },
  { id: 11, title: "Industry Visit — DRDO Ghaziabad for Final Year Students", category: "Academic", priority: "Medium", status: "Published", pinned: false, featured: false, department: "ME", publishDate: "2025-06-15", expiryDate: "2025-07-15", tags: ["industry", "visit"] },
  { id: 12, title: "Online Guest Lecture on AI/ML — Prof. IIT Delhi", category: "Academic", priority: "Medium", status: "Archived", pinned: false, featured: false, department: "CSE", publishDate: "2025-05-01", expiryDate: "2025-05-30", tags: ["lecture", "AI"] },
];

// ─── News ──────────────────────────────────────────────────────────────────
export const NEWS = [
  { id: 1, headline: "RKGIT Students Win 1st Prize at Smart India Hackathon 2025", category: "Achievement", author: "Admin", publishDate: "2025-07-15", status: "Published", featured: true, trending: true, readTime: "4 min", slug: "rkgit-wins-sih-2025" },
  { id: 2, headline: "RKGIT Signs MoU with Microsoft for Cloud Computing Lab", category: "Partnership", author: "Admin", publishDate: "2025-07-10", status: "Published", featured: true, trending: false, readTime: "3 min", slug: "rkgit-microsoft-mou" },
  { id: 3, headline: "Placement Season 2024-25: 34 LPA Highest Package, 8500+ Offers", category: "Placement", author: "Admin", publishDate: "2025-06-28", status: "Published", featured: true, trending: true, readTime: "5 min", slug: "placement-2024-25-results" },
  { id: 4, headline: "RKGIT Gets NAAC 'A' Grade Reaccreditation", category: "Accreditation", author: "Admin", publishDate: "2025-06-15", status: "Published", featured: true, trending: false, readTime: "6 min", slug: "naac-a-grade-reaccreditation" },
  { id: 5, headline: "New Research Center for Robotics Inaugurated by CM", category: "Research", author: "Admin", publishDate: "2025-06-01", status: "Published", featured: false, trending: false, readTime: "3 min", slug: "robotics-research-center" },
  { id: 6, headline: "RKGIT Alumni Launches Rs 5 Crore EdTech Startup", category: "Alumni", author: "Admin", publishDate: "2025-05-20", status: "Published", featured: false, trending: false, readTime: "4 min", slug: "alumni-edtech-startup" },
  { id: 7, headline: "Faculty Research Paper Published in Nature Journal", category: "Research", author: "Admin", publishDate: "2025-05-10", status: "Draft", featured: false, trending: false, readTime: "5 min", slug: "nature-journal-publication" },
  { id: 8, headline: "RKGIT Organizes International Conference on Emerging Technologies", category: "Event", author: "Admin", publishDate: "2025-04-25", status: "Archived", featured: false, trending: false, readTime: "4 min", slug: "icet-2025-conference" },
];

// ─── Events ────────────────────────────────────────────────────────────────
export const EVENTS = [
  { id: 1, name: "Techfest 2025 — Annual Technical Festival", date: "2025-09-15", time: "09:00 AM", venue: "Main Auditorium, RKGIT", status: "Upcoming", featured: true, homepageVisible: true, category: "Technical", registrationLink: "#", coordinator: "Dr. R.K. Sharma" },
  { id: 2, name: "Smart India Hackathon 2025 — Internal Round", date: "2025-08-20", time: "10:00 AM", venue: "Computer Center", status: "Upcoming", featured: true, homepageVisible: true, category: "Competition", registrationLink: "#", coordinator: "Prof. A. Gupta" },
  { id: 3, name: "Campus Placement Drive — TCS NQT", date: "2025-08-05", time: "08:30 AM", venue: "Placement Cell", status: "Upcoming", featured: true, homepageVisible: false, category: "Placement", registrationLink: "#", coordinator: "Mr. V. Singh" },
  { id: 4, name: "International Yoga Day Celebration", date: "2025-06-21", time: "07:00 AM", venue: "Sports Ground", status: "Completed", featured: false, homepageVisible: false, category: "Cultural", registrationLink: "", coordinator: "NSS Unit" },
  { id: 5, name: "Alumni Meet 2025", date: "2025-07-04", time: "11:00 AM", venue: "Seminar Hall", status: "Completed", featured: false, homepageVisible: false, category: "Alumni", registrationLink: "", coordinator: "Alumni Association" },
  { id: 6, name: "Freshers Welcome Party 2025", date: "2025-08-28", time: "04:00 PM", venue: "Open Air Theatre", status: "Upcoming", featured: false, homepageVisible: false, category: "Cultural", registrationLink: "#", coordinator: "Student Council" },
  { id: 7, name: "DRDO Industry Visit — B.Tech 3rd Year", date: "2025-07-18", time: "09:00 AM", venue: "DRDO, Ghaziabad", status: "Completed", featured: false, homepageVisible: false, category: "Academic", registrationLink: "", coordinator: "Dr. P. Verma" },
  { id: 8, name: "National Conference on AI & Data Science (NCAIDS-2025)", date: "2025-10-10", time: "09:00 AM", venue: "Convention Center", status: "Upcoming", featured: true, homepageVisible: true, category: "Conference", registrationLink: "#", coordinator: "Dr. S. Mehta" },
  { id: 9, name: "Annual Sports Meet 2025", date: "2025-08-18", time: "08:00 AM", venue: "Sports Complex", status: "Upcoming", featured: false, homepageVisible: false, category: "Sports", registrationLink: "#", coordinator: "Physical Education Dept." },
  { id: 10, name: "Entrepreneurship Bootcamp — RKGIT E-Cell", date: "2025-09-05", time: "10:00 AM", venue: "Innovation Hub", status: "Upcoming", featured: false, homepageVisible: false, category: "Startup", registrationLink: "#", coordinator: "E-Cell Team" },
];

// ─── Careers / Jobs ────────────────────────────────────────────────────────
export const JOBS = [
  { id: 1, title: "Assistant Professor — Computer Science & Engineering", department: "CSE", type: "Full-Time", qualification: "M.Tech/Ph.D in CSE", experience: "0-3 Years", salary: "₹30,000 - ₹50,000/month", vacancies: 3, lastDate: "2025-08-31", status: "Open", featured: true },
  { id: 2, title: "Assistant Professor — Electronics & Communication", department: "ECE", type: "Full-Time", qualification: "M.Tech/Ph.D in ECE", experience: "0-3 Years", salary: "₹30,000 - ₹50,000/month", vacancies: 2, lastDate: "2025-08-31", status: "Open", featured: true },
  { id: 3, title: "Lab Technician — Computer Labs", department: "CSE", type: "Full-Time", qualification: "B.Sc. / BCA / Diploma", experience: "1-2 Years", salary: "₹15,000 - ₹20,000/month", vacancies: 2, lastDate: "2025-07-31", status: "Open", featured: false },
  { id: 4, title: "Administrative Officer", department: "Admin", type: "Full-Time", qualification: "MBA / Any Graduate", experience: "2-5 Years", salary: "₹25,000 - ₹35,000/month", vacancies: 1, lastDate: "2025-07-15", status: "Closed", featured: false },
  { id: 5, title: "Assistant Professor — Mechanical Engineering", department: "ME", type: "Full-Time", qualification: "M.Tech/Ph.D in ME", experience: "0-3 Years", salary: "₹30,000 - ₹50,000/month", vacancies: 2, lastDate: "2025-09-15", status: "Draft", featured: false },
];

// ─── Courses ────────────────────────────────────────────────────────────────
export const COURSES = [
  { id: 1, name: "B.Tech Computer Science & Engineering", level: "UG", duration: "4 Years", seats: 120, fees: "₹1,10,000/year", eligibility: "10+2 PCM, JEE/UPSEE", status: "Active", category: "Engineering" },
  { id: 2, name: "B.Tech Electronics & Communication", level: "UG", duration: "4 Years", seats: 60, fees: "₹1,10,000/year", eligibility: "10+2 PCM, JEE/UPSEE", status: "Active", category: "Engineering" },
  { id: 3, name: "B.Tech Mechanical Engineering", level: "UG", duration: "4 Years", seats: 60, fees: "₹1,10,000/year", eligibility: "10+2 PCM, JEE/UPSEE", status: "Active", category: "Engineering" },
  { id: 4, name: "B.Tech Civil Engineering", level: "UG", duration: "4 Years", seats: 60, fees: "₹1,10,000/year", eligibility: "10+2 PCM, JEE/UPSEE", status: "Active", category: "Engineering" },
  { id: 5, name: "B.Tech AI & Machine Learning", level: "UG", duration: "4 Years", seats: 60, fees: "₹1,20,000/year", eligibility: "10+2 PCM, JEE/UPSEE", status: "Active", category: "Engineering" },
  { id: 6, name: "B.Tech Information Technology", level: "UG", duration: "4 Years", seats: 60, fees: "₹1,10,000/year", eligibility: "10+2 PCM, JEE/UPSEE", status: "Active", category: "Engineering" },
  { id: 7, name: "M.Tech Computer Science", level: "PG", duration: "2 Years", seats: 18, fees: "₹90,000/year", eligibility: "B.Tech CSE/IT, GATE preferred", status: "Active", category: "Engineering" },
  { id: 8, name: "MBA", level: "PG", duration: "2 Years", seats: 60, fees: "₹85,000/year", eligibility: "Any Graduate, CAT/MAT/CMAT", status: "Active", category: "Management" },
  { id: 9, name: "MCA", level: "PG", duration: "2 Years", seats: 30, fees: "₹80,000/year", eligibility: "BCA/B.Sc (CS/IT)/Any Graduate", status: "Active", category: "Computer Applications" },
  { id: 10, name: "B.Pharmacy", level: "UG", duration: "4 Years", seats: 60, fees: "₹1,00,000/year", eligibility: "10+2 PCB", status: "Active", category: "Pharmacy" },
  { id: 11, name: "D.Pharmacy", level: "Diploma", duration: "2 Years", seats: 60, fees: "₹70,000/year", eligibility: "10+2 PCB", status: "Active", category: "Pharmacy" },
  { id: 12, name: "Ph.D (Engineering)", level: "PhD", duration: "3-5 Years", seats: 10, fees: "₹50,000/year", eligibility: "M.Tech / ME", status: "Active", category: "Research" },
];

// ─── Departments ────────────────────────────────────────────────────────────
export const DEPARTMENTS = [
  { id: 1, name: "Computer Science & Engineering", code: "CSE", hod: "Dr. Rajiv Kumar", faculty: 24, labs: 8, established: 2000, status: "Active" },
  { id: 2, name: "Electronics & Communication Engineering", code: "ECE", hod: "Dr. Anita Sharma", faculty: 18, labs: 6, established: 2000, status: "Active" },
  { id: 3, name: "Mechanical Engineering", code: "ME", hod: "Dr. Suresh Verma", faculty: 16, labs: 7, established: 2000, status: "Active" },
  { id: 4, name: "Civil Engineering", code: "CE", hod: "Dr. Priya Singh", faculty: 12, labs: 5, established: 2002, status: "Active" },
  { id: 5, name: "Electrical Engineering", code: "EE", hod: "Dr. Mohit Gupta", faculty: 14, labs: 5, established: 2003, status: "Active" },
  { id: 6, name: "Master of Business Administration", code: "MBA", hod: "Dr. Neha Agarwal", faculty: 15, labs: 2, established: 2005, status: "Active" },
  { id: 7, name: "Master of Computer Applications", code: "MCA", hod: "Dr. Vikram Yadav", faculty: 10, labs: 3, established: 2006, status: "Active" },
  { id: 8, name: "Pharmacy", code: "PHARM", hod: "Dr. Ritu Saxena", faculty: 20, labs: 6, established: 2008, status: "Active" },
];

// ─── Faculty ────────────────────────────────────────────────────────────────
export const FACULTY = [
  { id: 1, name: "Dr. Rajiv Kumar", department: "CSE", designation: "Professor & HOD", qualification: "Ph.D (IIT Delhi)", experience: "22 Years", email: "rajiv.kumar@rkgit.edu.in", phone: "+91 9876543210", specialization: "Machine Learning, AI", status: "Active" },
  { id: 2, name: "Dr. Anita Sharma", department: "ECE", designation: "Professor & HOD", qualification: "Ph.D (IIT Roorkee)", experience: "18 Years", email: "anita.sharma@rkgit.edu.in", phone: "+91 9876543211", specialization: "VLSI Design, Signal Processing", status: "Active" },
  { id: 3, name: "Dr. Suresh Verma", department: "ME", designation: "Professor & HOD", qualification: "Ph.D (IIT BHU)", experience: "20 Years", email: "suresh.verma@rkgit.edu.in", phone: "+91 9876543212", specialization: "Thermal Engineering, CAD/CAM", status: "Active" },
  { id: 4, name: "Prof. Amit Singh", department: "CSE", designation: "Associate Professor", qualification: "M.Tech (GGSIPU)", experience: "10 Years", email: "amit.singh@rkgit.edu.in", phone: "+91 9876543213", specialization: "Cloud Computing, DevOps", status: "Active" },
  { id: 5, name: "Dr. Priya Gupta", department: "CSE", designation: "Assistant Professor", qualification: "Ph.D (MDU Rohtak)", experience: "8 Years", email: "priya.gupta@rkgit.edu.in", phone: "+91 9876543214", specialization: "Data Science, Python", status: "Active" },
  { id: 6, name: "Prof. Ravi Mishra", department: "ECE", designation: "Associate Professor", qualification: "M.Tech (UPTU)", experience: "12 Years", email: "ravi.mishra@rkgit.edu.in", phone: "+91 9876543215", specialization: "Embedded Systems, IoT", status: "Active" },
  { id: 7, name: "Dr. Sunita Yadav", department: "MBA", designation: "Professor & HOD", qualification: "Ph.D (Delhi University)", experience: "15 Years", email: "sunita.yadav@rkgit.edu.in", phone: "+91 9876543216", specialization: "Finance, HRM", status: "Active" },
  { id: 8, name: "Prof. Deepak Patel", department: "ME", designation: "Assistant Professor", qualification: "M.Tech (NIT Allahabad)", experience: "6 Years", email: "deepak.patel@rkgit.edu.in", phone: "+91 9876543217", specialization: "Fluid Mechanics, Production", status: "Active" },
  { id: 9, name: "Dr. Kavita Sharma", department: "PHARM", designation: "Professor", qualification: "Ph.D Pharmacology", experience: "14 Years", email: "kavita.sharma@rkgit.edu.in", phone: "+91 9876543218", specialization: "Clinical Pharmacy, Drug Design", status: "Active" },
  { id: 10, name: "Prof. Manish Agarwal", department: "CSE", designation: "Assistant Professor", qualification: "M.Tech (IIIT Allahabad)", experience: "5 Years", email: "manish.agarwal@rkgit.edu.in", phone: "+91 9876543219", specialization: "Cybersecurity, Networks", status: "Active" },
  { id: 11, name: "Dr. Pooja Dixit", department: "CE", designation: "Associate Professor", qualification: "Ph.D (MNIT Jaipur)", experience: "11 Years", email: "pooja.dixit@rkgit.edu.in", phone: "+91 9876543220", specialization: "Structural Engineering, GIS", status: "Active" },
  { id: 12, name: "Prof. Rohit Saxena", department: "EE", designation: "Assistant Professor", qualification: "M.Tech (AMU)", experience: "7 Years", email: "rohit.saxena@rkgit.edu.in", phone: "+91 9876543221", specialization: "Power Systems, Renewable Energy", status: "Active" },
  { id: 13, name: "Dr. Neha Singh", department: "MCA", designation: "Associate Professor", qualification: "Ph.D (AKTU)", experience: "9 Years", email: "neha.singh@rkgit.edu.in", phone: "+91 9876543222", specialization: "Web Technologies, .NET", status: "On Leave" },
  { id: 14, name: "Prof. Vikas Kumar", department: "CSE", designation: "Assistant Professor", qualification: "M.Tech (DTU)", experience: "4 Years", email: "vikas.kumar@rkgit.edu.in", phone: "+91 9876543223", specialization: "Mobile Computing, Android", status: "Active" },
  { id: 15, name: "Dr. Alka Rawat", department: "MBA", designation: "Associate Professor", qualification: "Ph.D (Meerut University)", experience: "13 Years", email: "alka.rawat@rkgit.edu.in", phone: "+91 9876543224", specialization: "Marketing, Consumer Behavior", status: "Active" },
];

// ─── Placements ─────────────────────────────────────────────────────────────
export const PLACEMENT_STATS = {
  highestPackage: "34 LPA",
  averagePackage: "6.8 LPA",
  medianPackage: "5.2 LPA",
  placementPercentage: "92%",
  offersCount: 8500,
  companiesVisited: 87,
  year: "2024-25",
};

export const RECRUITERS = [
  { id: 1, name: "TCS", sector: "IT", package: "3.36 LPA", logo: "", studentsPlaced: 120, status: "Active" },
  { id: 2, name: "Infosys", sector: "IT", package: "4.5 LPA", logo: "", studentsPlaced: 98, status: "Active" },
  { id: 3, name: "Wipro", sector: "IT", package: "3.5 LPA", logo: "", studentsPlaced: 85, status: "Active" },
  { id: 4, name: "HCL Technologies", sector: "IT", package: "4.25 LPA", logo: "", studentsPlaced: 76, status: "Active" },
  { id: 5, name: "Accenture", sector: "IT/Consulting", package: "4.5 LPA", logo: "", studentsPlaced: 65, status: "Active" },
  { id: 6, name: "Amazon", sector: "E-Commerce/Tech", package: "18 LPA", logo: "", studentsPlaced: 12, status: "Active" },
  { id: 7, name: "Microsoft", sector: "Technology", package: "34 LPA", logo: "", studentsPlaced: 4, status: "Active" },
  { id: 8, name: "Deloitte", sector: "Consulting", package: "7.5 LPA", logo: "", studentsPlaced: 45, status: "Active" },
  { id: 9, name: "Capgemini", sector: "IT", package: "4.8 LPA", logo: "", studentsPlaced: 68, status: "Active" },
  { id: 10, name: "Tech Mahindra", sector: "IT", package: "3.75 LPA", logo: "", studentsPlaced: 72, status: "Active" },
];

// ─── Downloads ──────────────────────────────────────────────────────────────
export const DOWNLOADS = [
  { id: 1, name: "RKGIT Prospectus 2025-26", category: "Prospectus", fileType: "PDF", size: "8.5 MB", uploadDate: "2025-05-01", downloads: 2341, status: "Active" },
  { id: 2, name: "Academic Calendar 2025-26", category: "Academic Calendar", fileType: "PDF", size: "1.2 MB", uploadDate: "2025-06-01", downloads: 1892, status: "Active" },
  { id: 3, name: "Fee Structure 2025-26", category: "Fee Structure", fileType: "PDF", size: "0.5 MB", uploadDate: "2025-06-01", downloads: 3241, status: "Active" },
  { id: 4, name: "B.Tech CSE Syllabus 2025", category: "Academic Calendar", fileType: "PDF", size: "3.2 MB", uploadDate: "2025-05-15", downloads: 1456, status: "Active" },
  { id: 5, name: "NAAC SSR Report", category: "NAAC", fileType: "PDF", size: "15.8 MB", uploadDate: "2025-04-20", downloads: 876, status: "Active" },
  { id: 6, name: "NIRF 2025 Data", category: "NIRF", fileType: "PDF", size: "2.1 MB", uploadDate: "2025-03-01", downloads: 654, status: "Active" },
  { id: 7, name: "Exam Time Table — Odd Semester", category: "Timetable", fileType: "PDF", size: "0.8 MB", uploadDate: "2025-07-01", downloads: 4321, status: "Active" },
  { id: 8, name: "Anti Ragging Committee", category: "Circulars", fileType: "PDF", size: "0.3 MB", uploadDate: "2025-06-15", downloads: 321, status: "Active" },
  { id: 9, name: "Lab Manual — Digital Electronics", category: "Others", fileType: "PDF", size: "4.5 MB", uploadDate: "2025-07-10", downloads: 782, status: "Active" },
  { id: 10, name: "Tender Notice — Civil Works Campus", category: "Tender", fileType: "PDF", size: "0.6 MB", uploadDate: "2025-07-12", downloads: 45, status: "Active" },
];

// ─── Gallery Albums ──────────────────────────────────────────────────────────
export const GALLERY_ALBUMS = [
  { id: 1, title: "Techfest 2024", category: "Events", images: 48, date: "2024-09-20", status: "Published" },
  { id: 2, title: "Campus Life 2024-25", category: "Campus", images: 120, date: "2024-10-01", status: "Published" },
  { id: 3, title: "Convocation 2024", category: "Convocation", images: 85, date: "2024-11-15", status: "Published" },
  { id: 4, title: "Sports Meet 2024", category: "Sports", images: 62, date: "2024-12-10", status: "Published" },
  { id: 5, title: "Industrial Lab Tours", category: "Labs", images: 34, date: "2025-01-20", status: "Published" },
  { id: 6, title: "Placement Drives 2024-25", category: "Events", images: 41, date: "2025-02-15", status: "Published" },
  { id: 7, title: "Hostel & Amenities", category: "Hostel", images: 28, date: "2025-03-01", status: "Published" },
  { id: 8, title: "Hackathon 2025", category: "Hackathons", images: 56, date: "2025-04-10", status: "Published" },
  { id: 9, title: "NAAC Peer Team Visit", category: "Events", images: 22, date: "2025-05-01", status: "Published" },
  { id: 10, title: "Research Expo 2025", category: "Events", images: 38, date: "2025-06-15", status: "Published" },
  { id: 11, title: "Freshers 2025", category: "Events", images: 0, date: "2025-08-28", status: "Draft" },
  { id: 12, title: "Alumni Meet 2025", category: "Events", images: 15, date: "2025-07-04", status: "Published" },
];

// ─── Research ────────────────────────────────────────────────────────────────
export const RESEARCH_PROJECTS = [
  { id: 1, title: "AI-Based Early Detection of Cancer Using Deep Learning", pi: "Dr. Rajiv Kumar", department: "CSE", funding: "DST", amount: "₹45 Lakhs", status: "Ongoing", year: 2024 },
  { id: 2, title: "Smart Grid Technology for Rural Electrification", pi: "Dr. Rohit Saxena", department: "EE", funding: "MNRE", amount: "₹32 Lakhs", status: "Ongoing", year: 2023 },
  { id: 3, title: "Development of IoT-based Precision Agriculture System", pi: "Dr. Anita Sharma", department: "ECE", funding: "ICAR", amount: "₹28 Lakhs", status: "Completed", year: 2022 },
  { id: 4, title: "Nanotechnology Applications in Drug Delivery", pi: "Dr. Kavita Sharma", department: "PHARM", funding: "DBT", amount: "₹56 Lakhs", status: "Ongoing", year: 2024 },
  { id: 5, title: "Sustainable Construction Materials from Industrial Waste", pi: "Dr. Pooja Dixit", department: "CE", funding: "CSIR", amount: "₹22 Lakhs", status: "Ongoing", year: 2023 },
];

// ─── Testimonials ────────────────────────────────────────────────────────────
export const TESTIMONIALS = [
  { id: 1, name: "Rahul Sharma", type: "Alumni", batch: "2019", company: "Google India", designation: "Senior SDE", rating: 5, content: "RKGIT gave me the foundation and values that helped me crack Google. The faculty are exceptional and always approachable.", status: "Published" },
  { id: 2, name: "Priya Singh", type: "Alumni", batch: "2020", company: "Microsoft", designation: "Software Engineer", rating: 5, content: "The placement cell at RKGIT works tirelessly for students. I got placed at Microsoft with a 34 LPA package. Forever grateful!", status: "Published" },
  { id: 3, name: "Amit Kumar", type: "Student", batch: "2025", company: "", designation: "B.Tech CSE 4th Year", rating: 5, content: "State-of-the-art labs, excellent faculty, and a vibrant campus life. Best decision of my life choosing RKGIT.", status: "Published" },
  { id: 4, name: "HR Manager, TCS", type: "Recruiter", batch: "", company: "TCS", designation: "HR Manager", rating: 4, content: "RKGIT students are well-trained, technically sound, and professionally mature. We hire in large numbers every year.", status: "Published" },
  { id: 5, name: "Sneha Agarwal", type: "Alumni", batch: "2021", company: "Amazon", designation: "Product Manager", rating: 5, content: "The entrepreneurship cell and research opportunities at RKGIT prepared me well for the corporate world.", status: "Published" },
];

// ─── FAQs ────────────────────────────────────────────────────────────────────
export const FAQS = [
  { id: 1, question: "What is the last date for admission 2025-26?", answer: "The last date for direct admission is September 30, 2025. UPSEE counselling dates are as per AKTU schedule.", category: "Admissions", status: "Published" },
  { id: 2, question: "What is the fee structure for B.Tech?", answer: "B.Tech fees range from ₹1,10,000 to ₹1,20,000 per year depending on the branch. SC/ST students get government subsidies.", category: "Fees", status: "Published" },
  { id: 3, question: "Is hostel facility available?", answer: "Yes, RKGIT has separate hostels for boys and girls with 24x7 security, Wi-Fi, mess, and medical facilities.", category: "Hostel", status: "Published" },
  { id: 4, question: "What is the average placement package?", answer: "The average package for 2024-25 was 6.8 LPA with the highest being 34 LPA from Microsoft. Over 8500 offers were made.", category: "Placements", status: "Published" },
  { id: 5, question: "What are the eligibility criteria for B.Tech admission?", answer: "Minimum 45% marks in 10+2 with Physics, Chemistry & Mathematics. JEE Main / UPSEE qualified students get priority.", category: "Admissions", status: "Published" },
  { id: 6, question: "Does RKGIT offer PhD programmes?", answer: "Yes, RKGIT offers PhD in Engineering under AKTU affiliation. Candidates need M.Tech/ME and must qualify GATE.", category: "Academics", status: "Published" },
];

// ─── Notices ──────────────────────────────────────────────────────────────────
export const NOTICES = [
  { id: 1, title: "B.Tech 7th Semester Examination Form Submission", category: "Exam", publishDate: "2025-07-10", priority: "High", status: "Active" },
  { id: 2, title: "Academic Calendar 2025-26 Released", category: "Academic", publishDate: "2025-06-30", priority: "High", status: "Active" },
  { id: 3, title: "Holiday List — August 2025", category: "Holiday", publishDate: "2025-07-28", priority: "Medium", status: "Active" },
  { id: 4, title: "Anti-Ragging Committee Meeting — Minutes", category: "Circular", publishDate: "2025-07-05", priority: "Medium", status: "Active" },
  { id: 5, title: "Office Order — New Deputy Registrar Appointment", category: "Office Order", publishDate: "2025-07-01", priority: "Low", status: "Active" },
  { id: 6, title: "Fee Submission Reminder — Last Date July 31", category: "Academic", publishDate: "2025-07-15", priority: "High", status: "Active" },
  { id: 7, title: "B.Tech 5th Semester Class Timetable", category: "Academic", publishDate: "2025-07-20", priority: "Medium", status: "Active" },
  { id: 8, title: "Examination Schedule Postponed — Revised Date Sheet", category: "Exam", publishDate: "2025-06-15", priority: "High", status: "Archived" },
];

// ─── Users ─────────────────────────────────────────────────────────────────
export const USERS = [
  { id: 1, name: "Super Admin", email: "rkgit@rkgit.edu.in", role: "Super Admin", lastLogin: "Just now", status: "Active" },
  { id: 2, name: "Dr. Rajiv Kumar", email: "rajiv.kumar@rkgit.edu.in", role: "Admin", lastLogin: "2025-07-24", status: "Active" },
  { id: 3, name: "Priya Verma", email: "priya.verma@rkgit.edu.in", role: "Editor", lastLogin: "2025-07-23", status: "Active" },
  { id: 4, name: "Rahul Mehta", email: "rahul.mehta@rkgit.edu.in", role: "Content Manager", lastLogin: "2025-07-22", status: "Active" },
  { id: 5, name: "Prof. Anita Singh", email: "anita.singh@rkgit.edu.in", role: "Faculty", lastLogin: "2025-07-20", status: "Active" },
];

// ─── Activity Logs ────────────────────────────────────────────────────────
export const ACTIVITY_LOGS = [
  { id: 1, user: "Super Admin", action: "User Logged In", module: "Auth", timestamp: "2025-07-25 09:03 AM", ip: "192.168.1.1", status: "Success" },
  { id: 2, user: "Super Admin", action: "Announcement Published", module: "Announcements", timestamp: "2025-07-24 04:15 PM", ip: "192.168.1.1", status: "Success" },
  { id: 3, user: "Priya Verma", action: "News Article Updated", module: "News", timestamp: "2025-07-24 02:30 PM", ip: "192.168.1.45", status: "Success" },
  { id: 4, user: "Rahul Mehta", action: "Gallery Image Uploaded", module: "Gallery", timestamp: "2025-07-24 01:00 PM", ip: "192.168.1.67", status: "Success" },
  { id: 5, user: "Super Admin", action: "Homepage Hero Updated", module: "Homepage", timestamp: "2025-07-23 11:00 AM", ip: "192.168.1.1", status: "Success" },
  { id: 6, user: "Dr. Rajiv Kumar", action: "Faculty Profile Edited", module: "Faculty", timestamp: "2025-07-23 09:30 AM", ip: "192.168.1.12", status: "Success" },
  { id: 7, user: "Priya Verma", action: "Login Failed", module: "Auth", timestamp: "2025-07-22 08:00 PM", ip: "192.168.1.45", status: "Failed" },
  { id: 8, user: "Super Admin", action: "User Deleted", module: "Users", timestamp: "2025-07-22 03:00 PM", ip: "192.168.1.1", status: "Success" },
  { id: 9, user: "Rahul Mehta", action: "Download Uploaded", module: "Downloads", timestamp: "2025-07-22 11:30 AM", ip: "192.168.1.67", status: "Success" },
  { id: 10, user: "Super Admin", action: "Backup Created", module: "Backup", timestamp: "2025-07-21 10:00 PM", ip: "192.168.1.1", status: "Success" },
];
