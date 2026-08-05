export interface SubmenuTable {
  headers: string[];
  rows: (string | number)[][];
}

export interface SubmenuHighlight {
  title: string;
  description: string;
  icon?: string;
}

export interface SubmenuStat {
  label: string;
  value: string;
  subtext?: string;
}

export interface SubmenuGalleryItem {
  url: string;
  caption: string;
}

export interface SubmenuFAQ {
  question: string;
  answer: string;
}

export interface SubmenuContact {
  title: string;
  name: string;
  phone: string;
  email: string;
  office: string;
}

export interface SubmenuPageData {
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  heroBg?: string;
  badge?: string;
  overview: string[];
  keyHighlights: SubmenuHighlight[];
  stats: SubmenuStat[];
  table?: SubmenuTable;
  gallery: SubmenuGalleryItem[];
  faqs: SubmenuFAQ[];
  contact: SubmenuContact;
}

export const SUBMENUS_DATA: Record<string, SubmenuPageData> = {
  // ─── ABOUT ─────────────────────────────────────────────────────────────
  "vision-mission": {
    slug: "vision-mission",
    category: "About",
    title: "Vision & Mission",
    subtitle: "Pioneering quality technical education, human values, and transformative research since 2000.",
    badge: "Core Philosophy",
    overview: [
      "Raj Kumar Goel Institute of Technology (RKGIT) was established under the aegis of Raj Kumar Goel Educational Foundations to impart value-based technical and professional education.",
      "Our institutional core vision is to build a premier technology ecosystem that fosters innovative thinking, ethical leadership, and global engineering competence.",
      "Through continuously updated Outcome Based Education (OBE), state-of-the-art laboratories, and strong industry linkages, RKGIT empowers students to address global challenges."
    ],
    keyHighlights: [
      { title: "Academic Excellence", description: "Tier-1 Outcome Based Education (OBE) curriculum aligned with global engineering standards." },
      { title: "Ethical Leadership", description: "Integrating professional ethics, human values, and social responsibility into technical training." },
      { title: "Research & Innovation", description: "Fostering interdisciplinary R&D through 12 specialized research centres and seed grants." },
      { title: "Global Employability", description: "Comprehensive personality development, soft skills, and tech bootcamps ensuring top placements." }
    ],
    stats: [
      { label: "Established Year", value: "2000", subtext: "26 Years of Legacy" },
      { label: "Graduated Alumni", value: "12,000+", subtext: "Across 25+ Countries" },
      { label: "NBA Accredited", value: "Multiple", subtext: "CSE, ECE, ME Branches" },
      { label: "NAAC Rating", value: "Grade A", subtext: "Accredited Institute" }
    ],
    table: {
      headers: ["Pillar", "Strategic Focus", "Target Outcome 2026–30", "Responsible Body"],
      rows: [
        ["Academic Quality", "Outcome Based Learning & Active Pedagogy", "100% NBA accreditation across all programs", "Academic Council"],
        ["Research & IP", "Patent Filing & High-Impact Publications", "50+ Patents Granted & ₹2 Cr Research Grants", "R&D Cell"],
        ["Industry Integration", "Co-designed Industry Certification Courses", "100% Industry Exposure via Internships", "T&P Cell"],
        ["Infrastructure", "Smart Labs, AI Hub & Green Campus", "Net Zero Energy & 100 Gbps Campus Network", "Estate Dept"],
        ["Student Welfare", "Holistic Growth, Sports & Mental Health", "30+ Active Clubs & National Awards", "Dean Student Welfare"],
        ["Global Links", "International Dual Degree Programs", "10+ Active Foreign University MoUs", "International Cell"],
        ["Entrepreneurship", "Incubation Support & Seed Capital", "25+ Registered Student Startups", "Innovation Cell"],
        ["Social Responsibility", "NSS Rural Adoption & Skill Workshops", "10 Adopted Villages & Literacy Drives", "NSS RKGIT Unit"],
        ["Alumni Mentorship", "Global Alumni Network & Endowment", "1000+ Alumni Mentorship Hours/Yr", "Alumni Association"],
        ["Faculty Development", "Ph.D. Support & International FDPs", "90%+ Ph.D. Qualified Faculty Staff", "IQAC Cell"]
      ]
    },
    gallery: [
      { url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80", caption: "RKGIT Academic Block & Green Campus" },
      { url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80", caption: "Student Collaboration in Advanced Innovation Lab" }
    ],
    faqs: [
      { question: "What is the core vision of RKGIT?", answer: "To emerge as a leading institute of technical and professional education delivering innovative, ethical, and industry-ready engineering professionals." },
      { question: "How does RKGIT ensure Outcome Based Education (OBE)?", answer: "All courses follow Bloom's Taxonomy, defined Course Outcomes (COs), Program Outcomes (POs), and continuous internal assessment feedback loops." }
    ],
    contact: { title: "Directorate of Academics", name: "Dr. B. K. Gupta (Director)", phone: "+91-120-2788270", email: "director@rkgit.edu.in", office: "Director Block, Room 101" }
  },

  "leadership": {
    slug: "leadership",
    category: "About",
    title: "Leadership & Management",
    subtitle: "Visionary leaders guiding RKGIT toward global educational distinction and social impact.",
    badge: "Governance",
    overview: [
      "RKGIT is governed by an eminent Board of Management comprising industrial stalwarts, academic visionaries, and administrative leaders.",
      "Under their stewardship, RKGIT has transformed from a pioneering regional engineering institute into an accredited center of excellence with world-class facilities.",
      "The leadership team emphasizes continuous innovation, faculty empowerment, transparent governance, and student-centric academic growth."
    ],
    keyHighlights: [
      { title: "Strategic Vision", description: "Guided by top educationists and former IIT/AKTU directors." },
      { title: "Transparent Governance", description: "Strict compliance with AICTE, AKTU, and NAAC quality frameworks." },
      { title: "Student-First Leadership", description: "Open door policy for student feedback, innovation ideas, and grievances." }
    ],
    stats: [
      { label: "Board Members", value: "15+", subtext: "Eminent Industrialists & Scholars" },
      { label: "Ph.D. Leaders", value: "100%", subtext: "All Deans & HODs Ph.D. Holders" },
      { label: "Experience", value: "25+ Yrs", subtext: "Average Leadership Tenure" }
    ],
    table: {
      headers: ["Name", "Designation", "Qualification", "Domain / Focus Area", "Email"],
      rows: [
        ["Shri Dinesh Kumar Goel", "Group Chairman", "B.Tech, Industrialist", "Institutional Growth & Vision", "chairman@rkgit.edu.in"],
        ["Shri Akshat Goel", "Vice Chairman", "MBA (UK)", "Strategic Expansion & Tech Integration", "vc@rkgit.edu.in"],
        ["Dr. B. K. Gupta", "Director RKGIT", "Ph.D. (IIT Delhi), M.Tech", "Academic Administration & Research", "director@rkgit.edu.in"],
        ["Dr. D. K. Sharma", "Dean Academics", "Ph.D., M.Tech (CSE)", "Curriculum, Regulations & Exams", "dean.academic@rkgit.edu.in"],
        ["Dr. R. K. Yadav", "Dean R&D", "Ph.D. (IIT Roorkee)", "Sponsored Research & Patents", "dean.rnd@rkgit.edu.in"],
        ["Dr. V. A. Singh", "Dean Student Welfare", "Ph.D., M.Tech", "Clubs, Hostel & Student Affairs", "dsw@rkgit.edu.in"],
        ["Prof. H. G. Garg", "Dean Placements", "MBA, B.Tech", "Corporate Relations & Recruitment", "head.tnp@rkgit.edu.in"],
        ["Dr. Meenakshi Sharma", "HOD Computer Science", "Ph.D. (CS)", "AI/ML, Software Engineering", "hod.cse@rkgit.edu.in"],
        ["Dr. Amit Agarwal", "HOD Information Tech", "Ph.D. (IT)", "Cloud Computing & Cybersecurity", "hod.it@rkgit.edu.in"],
        ["Dr. P. K. Singh", "HOD Electronics & Comm", "Ph.D. (ECE)", "VLSI Design & Embedded Systems", "hod.ece@rkgit.edu.in"],
        ["Dr. Sanjeev Kumar", "HOD Mechanical Engg", "Ph.D. (ME)", "Robotics, Thermal & CAD/CAM", "hod.me@rkgit.edu.in"],
        ["Dr. S. C. Gupta", "HOD Applied Sciences", "Ph.D. (Physics)", "Nanomaterials & Quantum Physics", "hod.as@rkgit.edu.in"],
        ["Dr. Monica Sharma", "HOD Management (MBA)", "Ph.D. (Management)", "Finance, Marketing & Strategy", "hod.mba@rkgit.edu.in"],
        ["Dr. Anuj Sharma", "Director Pharmacy", "Ph.D. (Pharmaceutics)", "Pharmaceutical Analysis & Drug Research", "director.pharmacy@rkgit.edu.in"]
      ]
    },
    gallery: [
      { url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80", caption: "Board of Management Strategy Meeting" },
      { url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80", caption: "Director Addressing Annual Academic Convocation" }
    ],
    faqs: [
      { question: "Who heads the RKGIT Management Board?", answer: "Shri Dinesh Kumar Goel is the Group Chairman, steering the strategic direction of RKGIT Ghaziabad." },
      { question: "How can students schedule a meeting with Deans or Director?", answer: "Students can visit the Dean Student Welfare (DSW) office or request an appointment via directorate email." }
    ],
    contact: { title: "Office of the Director", name: "Executive Assistant to Director", phone: "+91-120-2788270", email: "director.office@rkgit.edu.in", office: "Admin Block, 1st Floor" }
  },

  "history": {
    slug: "history",
    category: "About",
    title: "History & Heritage",
    subtitle: "26 Years of transforming lives through technical education in Delhi–NCR.",
    badge: "Milestones",
    overview: [
      "Founded in the year 2000 in Ghaziabad, Raj Kumar Goel Institute of Technology started with just 4 B.Tech branches and 240 students.",
      "Over the last quarter century, RKGIT has expanded into a multi-disciplinary technical campus housing Engineering, Pharmacy, Management, and Applied Sciences.",
      "Today, RKGIT stands tall as one of North India's premier NAAC Grade A accredited institutions with over 4,500 active students and 12,000+ alumni worldwide."
    ],
    keyHighlights: [
      { title: "2000 — Foundation", description: "Established with AICTE approval and affiliation to Dr. A.P.J. Abdul Kalam Technical University (AKTU)." },
      { title: "2008 — Expansion", description: "Launched Pharmacy College (RKGITPS) and Department of Management Studies." },
      { title: "2016 — NBA Accreditation", description: "Accredited by National Board of Accreditation (NBA) for core engineering departments." },
      { title: "2024–26 — Tech Era", description: "Inaugurated AI/ML Centre of Excellence, 12 R&D centres, and 34 LPA placement benchmark." }
    ],
    stats: [
      { label: "Year Founded", value: "2000", subtext: "Established in Ghaziabad" },
      { label: "Campus Growth", value: "27 Acres", subtext: "State-of-the-Art Built-up Area" },
      { label: "Total Batches", value: "22+", subtext: "Successfully Graduated" }
    ],
    table: {
      headers: ["Year", "Milestone / Event", "Impact / Scope", "Key Achiever"],
      rows: [
        ["2000", "Establishment of RKGIT Ghaziabad", "B.Tech in CSE, ECE, ME, IT with 240 seats", "Founding Trust"],
        ["2004", "First Graduating Batch", "85%+ Placement in leading IT firms", "First Batch Students"],
        ["2006", "Launch of Post Graduate Courses", "M.Tech & MBA programs introduced", "Academic Council"],
        ["2008", "Establishment of RKGITPS Pharmacy College", "B.Pharm & D.Pharm courses initiated", "Trust Board"],
        ["2012", "Inauguration of Central Library & Auditorium", "100,000+ books & 1000-seater hall", "Estate Team"],
        ["2016", "First NBA Accreditation Awarded", "Tier-1 status for CSE & ECE branches", "IQAC Cell"],
        ["2018", "TBI Incubation Centre Approved", "Government support for student startups", "EDC Cell"],
        ["2021", "NAAC 'A' Grade Accreditation", "Recognized for institutional excellence", "Full Faculty"],
        ["2023", "AI & Data Science Branch Launch", "High-demand specialization introduced", "Dept of CSE"],
        ["2025", "Highest Package Reaches 34 LPA", "International & Product MNC offers", "Placement Cell"],
        ["2026", "26th Anniversary Silver Jubilee Year", "12,000+ Alumni Network reached", "RKGIT Community"]
      ]
    },
    gallery: [
      { url: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80", caption: "RKGIT Main Campus Gate in 2000 vs Present" },
      { url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80", caption: "25th Year Jubilee Celebrations" }
    ],
    faqs: [
      { question: "When was RKGIT founded?", answer: "RKGIT was established in September 2000 by Raj Kumar Goel Educational Foundations." },
      { question: "Is RKGIT affiliated with AKTU?", answer: "Yes, RKGIT is permanently affiliated with Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow, and approved by AICTE, New Delhi." }
    ],
    contact: { title: "Archives & Public Relations", name: "PRO Cell", phone: "+91-120-2788273", email: "pr@rkgit.edu.in", office: "Admin Building, Block A" }
  },

  "approvals-accreditations": {
    slug: "approvals-accreditations",
    category: "About",
    title: "Approvals & Accreditations",
    subtitle: "Recognized and validated by top national accreditation councils for rigorous quality.",
    badge: "Quality Assurance",
    overview: [
      "RKGIT adheres strictly to national educational quality benchmarks set by statutory bodies of the Government of India.",
      "Our degree programs are approved by the All India Council for Technical Education (AICTE), Pharmacy Council of India (PCI), and affiliated with Dr. A.P.J. Abdul Kalam Technical University (AKTU).",
      "RKGIT holds NAAC 'A' Grade accreditation and NBA accreditation for major engineering branches."
    ],
    keyHighlights: [
      { title: "AICTE Approved", description: "All Engineering, Management & Computer Application courses approved by AICTE, New Delhi." },
      { title: "PCI Recognized", description: "B.Pharm & D.Pharm approved by Pharmacy Council of India (PCI)." },
      { title: "NBA Accredited", description: "Tier-1 Outcome Based Education framework validated by National Board of Accreditation." },
      { title: "NAAC 'A' Grade", description: "Reaccredited by National Assessment and Accreditation Council for quality infrastructure and teaching." }
    ],
    stats: [
      { label: "NAAC Grade", value: "A", subtext: "National Rating" },
      { label: "NBA Branches", value: "3", subtext: "CSE, ECE, ME Accredited" },
      { label: "AICTE Status", value: "Approved", subtext: "Permanent Recognition" }
    ],
    table: {
      headers: ["Accreditation Body", "Program / Scope", "Status / Grade", "Valid Up To", "Document Ref"],
      rows: [
        ["AICTE, New Delhi", "B.Tech, M.Tech, MBA, MCA", "Approved (Annual Renewal)", "2026–2027", "F.No. Northern/1-10978/AICTE"],
        ["PCI, New Delhi", "B.Pharm, D.Pharm", "Approved", "2026–2027", "PCI-1748 / 2026"],
        ["AKTU, Lucknow", "Institutional Affiliation", "Permanent Affiliation", "Lifetime", "AKTU/Affil/2000-01/12"],
        ["NAAC, Bengaluru", "Entire Institutional Campus", "Grade 'A'", "2029", "NAAC/EC/A&A/2024/RKGIT"],
        ["NBA, New Delhi", "B.Tech Computer Science & Engg", "Accredited Tier-1", "2029", "NBA/2026/CSE-RKGIT"],
        ["NBA, New Delhi", "B.Tech Electronics & Comm", "Accredited Tier-1", "2029", "NBA/2026/ECE-RKGIT"],
        ["NBA, New Delhi", "B.Tech Mechanical Engineering", "Accredited Tier-1", "2029", "NBA/2026/ME-RKGIT"],
        ["ISO Certification", "Quality Management Systems", "ISO 9001:2015", "2028", "ISO/QMS/9001/RKGIT"],
        ["UGC Section 2(f)", "UGC Recognition", "Recognized College", "Permanent", "F.8-120/2012(CPP-I)"],
        ["NIRF, MoE", "Engineering Institutions Data", "Participating Institute", "2026", "NIRF-ENGG-2026-RKGIT"]
      ]
    },
    gallery: [
      { url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80", caption: "NAAC & NBA Peer Team Inspection Visit" }
    ],
    faqs: [
      { question: "Where can I view official accreditation certificates?", answer: "All NBA, NAAC, AICTE, and PCI approval letters can be downloaded directly from the mandatory disclosure section." }
    ],
    contact: { title: "IQAC Cell", name: "Dr. R. K. Sharma (IQAC Coordinator)", phone: "+91-120-2788290", email: "iqac@rkgit.edu.in", office: "Admin Block Room 204" }
  },

  "rankings": {
    slug: "rankings",
    category: "About",
    title: "Rankings & Recognitions",
    subtitle: "Consistently ranked among the top engineering colleges in North India.",
    badge: "Awards",
    overview: [
      "RKGIT Ghaziabad has earned prestigious spots in national engineering rankings conducted by Ministry of Education (NIRF), Times Engineering Survey, Outlook-ICARE, and India Today.",
      "Our commitment to high placement conversion, cutting-edge labs, patent generation, and student hackathon wins consistently places us in the top tier."
    ],
    keyHighlights: [
      { title: "NIRF Rank Band", description: "Ranked among top engineering institutions in Delhi-NCR region." },
      { title: "Times Engineering 2025", description: "Ranked #14 Private Engineering Institute in North India." },
      { title: "Outlook ICARE", description: "Top 25 Engineering College in India for Graduate Placement Performance." }
    ],
    stats: [
      { label: "Times Rank", value: "#14", subtext: "North India Private Institutes" },
      { label: "Placement Score", value: "94%", subtext: "Ranked High for Placements" },
      { label: "Awards Count", value: "15+", subtext: "National & State Level Awards" }
    ],
    table: {
      headers: ["Ranking Agency / Survey", "Category", "Rank / Position", "Year", "Key Metric Highlight"],
      rows: [
        ["Times Engineering Survey", "Top Private Engineering Colleges", "#14 North India", "2025", "Infrastructure & Placements"],
        ["Outlook-ICARE Survey", "Top Private Engineering Institutes", "#22 All India", "2025", "Placement & ROI"],
        ["India Today Best Colleges", "Private Engineering Colleges", "Top 30 North India", "2025", "Academic Excellence & Pedagogy"],
        ["Dataquest CyberMedia", "T-School Survey (Private)", "#18 National Rank", "2024", "Tech Labs & Industry Readiness"],
        ["The Week Hansa Research", "Private Engineering Colleges", "#25 North Zone", "2024", "Faculty Credentials & Research"],
        ["CSR-GHRDC Engineering Survey", "Top Colleges of Excellence", "#1 in UP State", "2024", "Overall Campus Quality"],
        ["Smart India Hackathon", "National Hardware & Software", "1st Prize Winner", "2025", "Student Innovation & Coding"],
        ["AKTU Merit Rank", "University Examination Ranks", "Top 5 Positions", "2024", "Academic Results"],
        ["AICTE Internship Ranking", "Student Internship Participation", "Top 10 Tier-2 Colleges", "2025", "Summer Internships"],
        ["Green Campus Award", "Eco-Friendly Architecture", "Gold Rating", "2025", "Solar & Water Recycling"]
      ]
    },
    gallery: [
      { url: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&q=80", caption: "RKGIT Receiving Best Engineering College Award" }
    ],
    faqs: [
      { question: "Is RKGIT listed in NIRF?", answer: "Yes, RKGIT participates in NIRF every year and submits detailed data under Engineering & Innovation categories." }
    ],
    contact: { title: "Media & Rankings Bureau", name: "Public Relations Officer", phone: "+91-120-2788273", email: "rankings@rkgit.edu.in", office: "Media Cell, Admin Block" }
  },

  "infrastructure": {
    slug: "infrastructure",
    category: "About",
    title: "Campus Infrastructure",
    subtitle: "109,265 sq. m. of state-of-the-art academic blocks, specialized research labs, and green spaces.",
    badge: "World-Class Campus",
    overview: [
      "Spread over a lush green 27-acre campus, RKGIT provides a high-tech academic environment engineered for modern learning.",
      "Features include air-conditioned smart lecture theatres, 60+ specialized laboratories, a 100,000+ volume central library, 1000-seater auditorium, air-cooled hostels, and sports grounds."
    ],
    keyHighlights: [
      { title: "Smart Classrooms", description: "Interactive flat panels, digital projectors, and high-speed Wi-Fi in all lecture halls." },
      { title: "60+ Advanced Labs", description: "Dedicated AI/ML, Cloud Computing, VLSI, Robotics, and IC Engine research laboratories." },
      { title: "Central Library", description: "104,394+ books, 500+ e-journals, IEEE subscription, and 24x7 digital reading room." }
    ],
    stats: [
      { label: "Campus Area", value: "109,265", subtext: "Square Metres Built-up" },
      { label: "Laboratories", value: "60+", subtext: "Hi-Tech Labs" },
      { label: "Auditorium", value: "1,000", subtext: "Seating Capacity" },
      { label: "Wi-Fi Speed", value: "1 Gbps", subtext: "High-Speed Campus Backbone" }
    ],
    table: {
      headers: ["Facility Name", "Capacity / Area", "Key Features / Equipment", "Location / Block"],
      rows: [
        ["Main Auditorium", "1,000 Seats", "Acoustic panels, 4K Projection, Dolby Audio", "Central Block"],
        ["Central Library", "104,000+ Books", "IEEE Xplore, ScienceDirect, Delnet, Air-conditioned", "Library Block 2nd Floor"],
        ["AI & Deep Learning Lab", "60 Workstations", "NVIDIA RTX GPUs, High-End Workstations", "CSE Department 3rd Floor"],
        ["Cadence VLSI Lab", "30 Terminals", "Cadence Virtuoso, Synopsys Design Suite", "ECE Department 2nd Floor"],
        ["Robotics & Automation Hub", "Industrial Arm", "KUKA Robot Trainer, Pneumatic Kits, PLC", "ME Department Ground Floor"],
        ["Cloud Computing Lab", "40 Nodes", "AWS Cloud Sandbox, Docker, Kubernetes setup", "IT Department 1st Floor"],
        ["Central Computing Centre", "300 PCs", "Core i7 Systems, 1 Gbps Fiber connection", "Academic Block C"],
        ["Boys Hostel (4 Blocks)", "1,200 Residents", "Air-cooled, Wi-Fi, Gym, Indoor games, Mess", "Hostel Campus South"],
        ["Girls Hostel (2 Blocks)", "600 Residents", "High Security, Biometric Access, Solar Water", "Hostel Campus North"],
        ["Sports Complex", "5 Acres Ground", "Cricket Pitch, Football Turf, Basketball & Tennis", "Sports Arena"],
        ["Cafeteria & Food Court", "400 Seating", "Hygienic snacks, Nescafe Outlet, South Indian", "Student Activity Centre"],
        ["Medical Centre", "4 Beds", "24x7 Resident Doctor, Ambulance on Call", "Ground Floor Block B"]
      ]
    },
    gallery: [
      { url: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&q=80", caption: "High-Tech Computer Science Laboratory" },
      { url: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80", caption: "RKGIT Air-Conditioned Central Library" }
    ],
    faqs: [
      { question: "Is the entire RKGIT campus Wi-Fi enabled?", answer: "Yes, the campus has a high-speed 1 Gbps Wi-Fi backbone accessible to all registered students and staff." }
    ],
    contact: { title: "Estate & Infrastructure Office", name: "Estate Officer", phone: "+91-120-2788275", email: "estate@rkgit.edu.in", office: "Maintenance Block" }
  },

  "campus-tour": {
    slug: "campus-tour",
    category: "About",
    title: "Virtual Campus Tour",
    subtitle: "Explore our vibrant 27-acre campus in 360-degree interactive view.",
    badge: "360° Experience",
    overview: [
      "Welcome to the virtual campus tour of Raj Kumar Goel Institute of Technology (RKGIT), Ghaziabad.",
      "Experience our modern academic blocks, lush green lawns, state-of-the-art innovation hubs, hostels, cafeteria, and sports arena right from your device."
    ],
    keyHighlights: [
      { title: "Academic Blocks", description: "Explore Blocks A, B, C, D housing 8 engineering departments." },
      { title: "R&D Centres", description: "Virtual entry into Robotics, AI, and IoT Centres of Excellence." },
      { title: "Student Zones", description: "View the Food Court, Amphitheatre, and Sports Arena." }
    ],
    stats: [
      { label: "Campus Map Spots", value: "25+", subtext: "Interactive Locations" },
      { label: "Virtual Tour", value: "360°", subtext: "High Definition Views" }
    ],
    table: {
      headers: ["Zone / Landmark", "Description", "Key Facilities Located Here", "Visitor Access"],
      rows: [
        ["Block A (Admin Block)", "Main administrative hub & Directorate", "Director Office, Admissions Cell, Accounts", "Open for Visitors"],
        ["Block B (CSE & IT)", "Computer Science & IT Departments", "AI Lab, Cloud Lab, Software Dev Labs", "Student / Faculty"],
        ["Block C (ECE & EE)", "Electronics & Electrical Block", "VLSI Lab, Embedded Systems, Circuit Lab", "Student / Faculty"],
        ["Block D (ME & Civil)", "Mechanical & Civil Engineering", "Robotics Hub, Workshop, Fluid Mechanics Lab", "Student / Faculty"],
        ["Pharmacy Block", "RKGITPS Campus", "Pharmaceutics Labs, Pharmacology, Drug Room", "Pharmacy Students"],
        ["Management Block", "Department of Management Studies", "Case Study Rooms, GD Rooms, Seminar Hall", "MBA Students"],
        ["Central Library Block", "3-Storey Library Building", "Stack Room, Reference Section, E-Library", "All Registered Users"],
        ["Auditorium Complex", "1000-seater main auditorium", "Cultural events, Guest Lectures, Symposia", "Event Pass Required"],
        ["Sports Arena", "Multi-sport outdoor grounds", "Cricket Ground, Football, Basketball Court", "Open to Students"],
        ["Hostel Zone", "Boys & Girls Hostels", "Dining Halls, Gym, Recreation Rooms", "Resident Pass Only"]
      ]
    },
    gallery: [
      { url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80", caption: "Aerial View of RKGIT Ghaziabad Campus" }
    ],
    faqs: [
      { question: "Can parents visit the campus physically?", answer: "Yes, campus visits are open Monday through Saturday between 09:00 AM and 05:00 PM at the Admissions Cell." }
    ],
    contact: { title: "Admissions & Visitors Desk", name: "Campus Tour Coordinator", phone: "+91-120-2788273", email: "visit@rkgit.edu.in", office: "Admissions Cell, Block A" }
  },

  "annual-reports": {
    slug: "annual-reports",
    category: "About",
    title: "Annual Reports & Mandatory Disclosures",
    subtitle: "Transparent reporting of institutional growth, financial audits, and academic achievements.",
    badge: "Governance & Transparency",
    overview: [
      "RKGIT publishes annual comprehensive performance reports detailing academic results, placement figures, research grants, patents, financial audits, and community development activities.",
      "Download official AICTE Mandatory Disclosures, Audited Financial Statements, and IQAC Annual Reports below."
    ],
    keyHighlights: [
      { title: "AICTE Disclosure", description: "Complete mandatory disclosures filed as per AICTE guidelines." },
      { title: "Financial Audits", description: "Audited balance sheets and financial statements certified by Chartered Accountants." },
      { title: "Academic Audits", description: "Annual IQAC Quality Reports and AKTU academic audit scores." }
    ],
    stats: [
      { label: "Reports Archived", value: "20+", subtext: "From 2005 to 2026" },
      { label: "Financial Status", value: "Audited", subtext: "Clean Audit Track Record" }
    ],
    table: {
      headers: ["Academic Year", "Report Type / Document Title", "Published Date", "File Format", "Download Link"],
      rows: [
        ["2025–2026", "RKGIT Annual Performance & Academic Report", "July 2026", "PDF (4.2 MB)", "Download PDF"],
        ["2025–2026", "AICTE Mandatory Disclosure Report 2026–27", "May 2026", "PDF (2.8 MB)", "Download PDF"],
        ["2024–2025", "RKGIT Annual Academic & Research Report", "July 2025", "PDF (5.1 MB)", "Download PDF"],
        ["2024–2025", "Audited Financial Balance Sheet 2024–25", "September 2025", "PDF (1.9 MB)", "Download PDF"],
        ["2024–2025", "IQAC Annual Quality Assurance Report (AQAR)", "October 2025", "PDF (3.4 MB)", "Download PDF"],
        ["2023–2024", "RKGIT Annual Performance Report 2023–24", "July 2024", "PDF (4.8 MB)", "Download PDF"],
        ["2023–2024", "Audited Financial Balance Sheet 2023–24", "September 2024", "PDF (1.7 MB)", "Download PDF"],
        ["2022–2023", "RKGIT Annual Institutional Report 2022–23", "July 2023", "PDF (4.5 MB)", "Download PDF"],
        ["2021–2022", "NAAC Re-Accreditation Self Study Report (SSR)", "December 2021", "PDF (8.9 MB)", "Download PDF"],
        ["2020–2021", "20 Year Milestone Special Commemorative Report", "October 2020", "PDF (6.5 MB)", "Download PDF"]
      ]
    },
    gallery: [
      { url: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&q=80", caption: "Annual Performance Review & Audit Presentation" }
    ],
    faqs: [
      { question: "Where can I request physical copies of annual reports?", answer: "Physical copies are available for inspection at the Registrar's Office upon written request." }
    ],
    contact: { title: "Registrar Office", name: "Registrar RKGIT", phone: "+91-120-2788271", email: "registrar@rkgit.edu.in", office: "Admin Block Room 102" }
  },

  // ─── ACADEMICS ─────────────────────────────────────────────────────────
  "undergraduate-programs": {
    slug: "undergraduate-programs",
    category: "Academics",
    title: "Undergraduate (B.Tech & B.Pharm) Programs",
    subtitle: "Future-focused 4-year degree programs designed to build high-caliber engineers and pharmacists.",
    badge: "UG Degrees",
    overview: [
      "RKGIT offers 4-year Bachelor of Technology (B.Tech) degrees across 9 disciplines and Bachelor of Pharmacy (B.Pharm).",
      "All programs follow AKTU's Choice Based Credit System (CBCS) integrated with industry-certified skills, hands-on lab training, and capstone projects."
    ],
    keyHighlights: [
      { title: "NBA Accredited", description: "CSE, ECE, and ME programs are NBA accredited." },
      { title: "Industry Specializations", description: "Embedded minors in Artificial Intelligence, Cloud Computing, IoT, and Data Science." },
      { title: "Capstone Internships", description: "Mandatory 6-month industrial internships in 7th/8th semester." }
    ],
    stats: [
      { label: "B.Tech Branches", value: "9", subtext: "Specialized Engineering Disciplines" },
      { label: "Annual UG Intake", value: "1,200+", subtext: "Fresh Admissions Each Year" },
      { label: "Placement Rate", value: "94%", subtext: "Eligible Students Placed" }
    ],
    table: {
      headers: ["Program Name", "Branch Code", "Duration", "Annual Seat Intake", "NBA Accreditation", "Fee per Year"],
      rows: [
        ["B.Tech Computer Science & Engineering", "CSE", "4 Years (8 Sems)", "240 Seats", "Accredited (Tier-1)", "₹1,15,000"],
        ["B.Tech CS (Artificial Intelligence & ML)", "CSE-AIML", "4 Years (8 Sems)", "120 Seats", "Approved", "₹1,20,000"],
        ["B.Tech CS (Data Science)", "CSE-DS", "4 Years (8 Sems)", "60 Seats", "Approved", "₹1,20,000"],
        ["B.Tech Computer Science", "CS", "4 Years (8 Sems)", "180 Seats", "Approved", "₹1,15,000"],
        ["B.Tech Information Technology", "IT", "4 Years (8 Sems)", "120 Seats", "Accredited (Tier-1)", "₹1,15,000"],
        ["B.Tech Electronics & Communication", "ECE", "4 Years (8 Sems)", "120 Seats", "Accredited (Tier-1)", "₹1,10,000"],
        ["B.Tech Electrical & Electronics Engg", "EEE", "4 Years (8 Sems)", "60 Seats", "Approved", "₹1,05,000"],
        ["B.Tech Mechanical Engineering", "ME", "4 Years (8 Sems)", "60 Seats", "Accredited (Tier-1)", "₹1,05,000"],
        ["B.Tech Civil Engineering", "CE", "4 Years (8 Sems)", "60 Seats", "Approved", "₹1,05,000"],
        ["Bachelor of Pharmacy", "B.Pharm", "4 Years (8 Sems)", "100 Seats", "PCI Approved", "₹1,10,000"]
      ]
    },
    gallery: [
      { url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80", caption: "B.Tech Students Working on Microcontroller Project" }
    ],
    faqs: [
      { question: "What is the eligibility for B.Tech admission?", answer: "Candidates must have passed 10+2 with Physics, Mathematics, and Chemistry/CS with a minimum of 45% aggregate (40% for SC/ST) and a valid JEE Main score." }
    ],
    contact: { title: "UG Admissions Cell", name: "Dean Academics Office", phone: "+91-120-2788273", email: "ug.admissions@rkgit.edu.in", office: "Academic Block 1st Floor" }
  },

  "academic-calendar": {
    slug: "academic-calendar",
    category: "Academics",
    title: "Academic Calendar 2026–27",
    subtitle: "Key dates, semester schedules, examination windows, and institutional holidays.",
    badge: "Schedules",
    overview: [
      "The RKGIT Academic Calendar outlines semester start dates, mid-term examinations, end-semester practicals, cultural fests, and holidays.",
      "Strict compliance with the AKTU master academic schedule is maintained across all departments."
    ],
    keyHighlights: [
      { title: "Odd Semester", description: "August 2026 – December 2026" },
      { title: "Even Semester", description: "January 2027 – May 2027" }
    ],
    stats: [
      { label: "Teaching Days", value: "90 Days", subtext: "Per Semester Minimum" },
      { label: "Mid Sem Exams", value: "2 Rounds", subtext: "Internal Continuous Evaluation" }
    ],
    table: {
      headers: ["S.No.", "Event / Activity Description", "Target Audience / Semesters", "Start Date", "End Date / Deadline"],
      rows: [
        ["1", "Commencement of Classes (Odd Semester)", "3rd, 5th, 7th Semester B.Tech/B.Pharm", "August 10, 2026", "August 10, 2026"],
        ["2", "Orientation & Induction Program", "1st Year Freshers (All Programs)", "August 17, 2026", "August 22, 2026"],
        ["3", "First Internal Assessment (Mid-Sem 1)", "All UG & PG Batches", "September 21, 2026", "September 26, 2026"],
        ["4", "TRISHA Intra-College Cultural Auditions", "All Students", "October 5, 2026", "October 8, 2026"],
        ["5", "Second Internal Assessment (Mid-Sem 2)", "All UG & PG Batches", "November 9, 2026", "November 14, 2026"],
        ["6", "AKTU End Semester Practical Examinations", "All Odd Semesters", "December 1, 2026", "December 7, 2026"],
        ["7", "AKTU End Semester Theory Examinations", "All Odd Semesters", "December 10, 2026", "December 30, 2026"],
        ["8", "Winter Break & Internship Window", "All Students", "January 1, 2027", "January 15, 2027"],
        ["9", "Commencement of Classes (Even Semester)", "All Semesters", "January 18, 2027", "January 18, 2027"],
        ["10", "Annual Sports Meet & Techfest 2027", "All Departments", "February 24, 2027", "February 27, 2027"],
        ["11", "Mid-Semester Examinations (Even Sem)", "All Batches", "March 22, 2027", "March 27, 2027"],
        ["12", "AKTU Even Semester Final Theory Exams", "All Batches", "May 15, 2027", "June 10, 2027"]
      ]
    },
    gallery: [
      { url: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80", caption: "Students Reviewing Examination Schedule on Campus Notice Board" }
    ],
    faqs: [
      { question: "Where can I download the signed PDF calendar?", answer: "The official AKTU approved PDF calendar is downloadable via the student portal." }
    ],
    contact: { title: "Dean Academics Office", name: "Academic Registrar", phone: "+91-120-2788272", email: "academic.calendar@rkgit.edu.in", office: "Admin Block Room 105" }
  },

  // ─── DEPARTMENTS ───────────────────────────────────────────────────────
  "computer-science": {
    slug: "computer-science",
    category: "Departments",
    title: "Department of Computer Science & Engineering",
    subtitle: "NBA Accredited | Centre of Excellence in AI, Cloud Computing & Software Engineering.",
    badge: "NBA Accredited",
    overview: [
      "The Department of Computer Science & Engineering (CSE) at RKGIT is NBA Accredited and recognized for producing high-tech software developers, cloud architects, and data scientists.",
      "Equipped with 10 state-of-the-art computer labs, high-performance GPU servers, and active ACM & IEEE student chapters, the department maintains an extraordinary 95%+ placement record."
    ],
    keyHighlights: [
      { title: "NBA Accredited", description: "Tier-1 accreditation validating top-quality Outcome Based Education." },
      { title: "AI & Deep Learning Hub", description: "Equipped with NVIDIA RTX workstations for generative AI projects." },
      { title: "34 LPA Highest Package", description: "Top placement offers from Microsoft, Amazon, Google, and Adobe." }
    ],
    stats: [
      { label: "Faculty Members", value: "35+", subtext: "15+ Ph.D. Holders" },
      { label: "Student Intake", value: "240", subtext: "B.Tech CSE Seats" },
      { label: "Highest Package", value: "34 LPA", subtext: "International & Product MNCs" },
      { label: "Computer Labs", value: "10 Labs", subtext: "500+ High-End PCs" }
    ],
    table: {
      headers: ["Faculty Name", "Designation", "Qualification", "Specialization", "Experience", "Email"],
      rows: [
        ["Dr. Meenakshi Sharma", "Professor & HOD", "Ph.D. (CS), M.Tech", "Artificial Intelligence & ML", "22 Years", "hod.cse@rkgit.edu.in"],
        ["Dr. Vikas Gupta", "Professor", "Ph.D. (IIT Delhi)", "Cloud Computing & Distributed Systems", "18 Years", "vikas.cse@rkgit.edu.in"],
        ["Dr. Pooja Sharma", "Associate Professor", "Ph.D. (JNU)", "Cyber Security & Cryptography", "14 Years", "pooja.cse@rkgit.edu.in"],
        ["Dr. R. K. Lall", "Associate Professor", "Ph.D., M.Tech", "Data Science & Big Analytics", "15 Years", "rklall.cse@rkgit.edu.in"],
        ["Mr. Amit Kumar", "Assistant Professor", "M.Tech (CSE), NET", "Full Stack Web Development", "10 Years", "amit.cse@rkgit.edu.in"],
        ["Ms. Richa Verma", "Assistant Professor", "M.Tech (CSE)", "Computer Networks & IoT", "8 Years", "richa.cse@rkgit.edu.in"],
        ["Mr. Deepak Singh", "Assistant Professor", "M.Tech (CSE)", "Operating Systems & Linux Kernel", "9 Years", "deepak.cse@rkgit.edu.in"],
        ["Dr. Sneha Rastogi", "Assistant Professor", "Ph.D. (CS)", "Natural Language Processing (NLP)", "6 Years", "sneha.cse@rkgit.edu.in"],
        ["Mr. Nitin Tyagi", "Assistant Professor", "M.Tech (CSE)", "Software Engineering & Testing", "11 Years", "nitin.cse@rkgit.edu.in"],
        ["Ms. Priyanka Goel", "Assistant Professor", "M.Tech (CSE)", "Mobile Application Dev (Flutter)", "7 Years", "priyanka.cse@rkgit.edu.in"],
        ["Mr. Saurabh Mishra", "Assistant Professor", "M.Tech (CSE)", "Algorithms & Competitive Coding", "6 Years", "saurabh.cse@rkgit.edu.in"],
        ["Ms. Kavita Sharma", "Assistant Professor", "M.Tech (CSE)", "Database Management Systems", "8 Years", "kavita.cse@rkgit.edu.in"]
      ]
    },
    gallery: [
      { url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80", caption: "CSE Students Coding in High-Performance AI Lab" },
      { url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80", caption: "Department Hackathon Brainstorming Session" }
    ],
    faqs: [
      { question: "What coding languages are taught in B.Tech CSE?", answer: "C, C++, Java, Python, JavaScript/TypeScript, SQL, and Go, alongside frameworks like React, Node.js, and PyTorch." }
    ],
    contact: { title: "CSE Department Office", name: "HOD CSE Office", phone: "+91-120-2788276", email: "hod.cse@rkgit.edu.in", office: "Block B, 2nd Floor" }
  },

  // ─── ADMISSIONS ────────────────────────────────────────────────────────
  "admission-process": {
    slug: "admission-process",
    category: "Admissions",
    title: "Admission Process 2026–27",
    subtitle: "Complete guidance, seat matrix, eligibility criteria, and quota policies for B.Tech, M.Tech, MBA, MCA & Pharmacy admissions.",
    badge: "Admissions 2026",
    overview: [
      "RKGIT offers Four years, full time Graduate Program in Engineering - B.Tech. Approved by All India Council for Technical Education (AICTE), Ministry of HRD, and Affiliated to Dr. APJ Abdul Kalam Technical University (AKTU), Lucknow.",
      "15% of the total intake is available through Management Quota as per the norms of JEE 2026 and State Government. The vacant seats after counselling of JEE 2026 shall be filled by the Institute as per the norms of the State Government."
    ],
    keyHighlights: [
      { title: "Management Quota (15%)", description: "15% of the total intake available as per the norms of JEE 2026 and State Government." },
      { title: "Fee Waiver Seats (5%)", description: "Up to 5% sanctioned intake in B.Tech for economically weaker meritorious students (AICTE norms) with 100% tuition fee waiver via JEE counselling." },
      { title: "Kashmiri Migrants Scheme", description: "Direct admission over & above sanctioned intake (1 seat per AKTU institute) as per AICTE & UP Govt orders. JEE 2026 exam not required." },
      { title: "B.Tech Lateral Entry (2nd Year)", description: "20% of sanctioned 1st-year intake for 3-year Engg Diploma or B.Sc. graduates with min 45% marks (40% for SC/ST) via JEE 2026." }
    ],
    stats: [
      { label: "AKTU Code", value: "033", subtext: "RKGIT Institute Code" },
      { label: "B.Tech Seats", value: "1,440", subtext: "Across 9 Disciplines" },
      { label: "Management Quota", value: "15%", subtext: "JEE / State Govt Norms" },
      { label: "Fee Waiver Seats", value: "5%", subtext: "100% Tuition Exemption" }
    ],
    table: {
      headers: ["Courses / Discipline", "No. of Seats", "Program Level & Duration", "Accreditation / Approval Status"],
      rows: [
        ["B.Tech. Computer Science and Engineering", "360", "Undergraduate (4 Years)", "NBA Accredited / AICTE / AKTU"],
        ["B.Tech. Computer Science", "240", "Undergraduate (4 Years)", "AICTE / AKTU Approved"],
        ["B.Tech. Computer Science and Engineering (Artificial Intelligence and Machine Learning)", "300", "Undergraduate (4 Years)", "AICTE / AKTU Approved"],
        ["B.Tech. Computer Science and Engineering (DATA Science)", "120", "Undergraduate (4 Years)", "AICTE / AKTU Approved"],
        ["B.Tech. Information Technology", "120", "Undergraduate (4 Years)", "NBA Accredited / AICTE / AKTU"],
        ["B.Tech. Electronics and Communication Engineering", "120", "Undergraduate (4 Years)", "NBA Accredited / AICTE / AKTU"],
        ["B.Tech. Electrical and Electronics Engineering", "30", "Undergraduate (4 Years)", "AICTE / AKTU Approved"],
        ["B.Tech. Mechanical Engineering", "30", "Undergraduate (4 Years)", "AICTE / AKTU Approved"],
        ["B.Tech. Civil Engineering", "30", "Undergraduate (4 Years)", "AICTE / AKTU Approved"],
        ["Master Of Technology - ECE", "9", "Postgraduate (2 Years)", "AICTE / AKTU Approved"],
        ["Master Of Technology - CSE", "18", "Postgraduate (2 Years)", "AICTE / AKTU Approved"],
        ["Master Of Business Administration (M.B.A)", "90", "Postgraduate (2 Years)", "AICTE / AKTU Approved"],
        ["Master Of Computer Application (M.C.A)", "60", "Postgraduate (2 Years)", "AICTE / AKTU Approved"],
        ["Diploma In Pharmacy (D.Pharm)", "60", "Diploma (2 Years)", "PCI Approved"],
        ["Bachelor of Pharmacy (B.Pharm)", "100", "Undergraduate (4 Years)", "NBA Accredited / PCI Approved"],
        ["Master of Pharmacy (Pharmacology / Pharmaceutics)", "12 / 15", "Postgraduate (2 Years)", "PCI Approved"]
      ]
    },
    gallery: [
      { url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80", caption: "Admissions Counseling & Information Centre" }
    ],
    faqs: [
      {
        question: "What is the Management Quota seat availability and procedure?",
        answer: "15% of the total intake is available through Management Quota as per the norms of JEE 2026 and State Government. The vacant seats after counselling of JEE 2026 shall be filled by the Institute as per the norms of the State Government."
      },
      {
        question: "What are the guidelines for Fee Waiver seats for Economically Weaker Meritorious Students?",
        answer: "The fee waiver seats will be limited to a maximum of 5% of the sanctioned intake in the B.Tech. course for economically weaker meritorious candidates as per AICTE. No tuition fee will be charged from such candidates admitted against such seats. Economically weaker students must submit Certificate No. 12 (Income Certificate) at the time of document verification during counselling. These seats are allotted strictly through JEE counselling only."
      },
      {
        question: "What is the policy for Direct Admission to Kashmiri Migrants?",
        answer: "Direct admission to Kashmiri Migrants in the first year in each institute is to be made as per the latest instructions of AICTE and orders from U.P. Govt. Such admissions will be over and above the sanctioned intake and normally limited up to one admission per Institute affiliated to Dr. APJ AKTU, Lucknow. Detailed information is published in May 2026 in newspapers and University website (http://www.aktu.ac.in). Candidates opting for admission under this scheme need not appear in JEE-2026."
      },
      {
        question: "What is the eligibility for 2nd Year B.Tech. (Lateral Entry) through JEE 2026?",
        answer: "Lateral Entry intake is 20% of total sanctioned intake at first-year level. Eligibility: 1) Passed 3-year Engg Diploma from an institution in U.P. with min 45% marks (40% for SC/ST) OR UP domicile parents and passed 3-year Engg Diploma with min 45% marks (40% SC/ST) recognized by BTE U.P. (except Agri, Pharmacy & Arch). OR passed 3-year B.Sc. degree and passed XII standard with Mathematics securing min 45% marks (40% SC/ST). 2) Vacant seats to 2nd year after counselling shall be filled by the Institute as per UPCET 2026 & State Govt norms."
      }
    ],
    contact: { title: "Central Admission Cell", name: "Chief Admission Officer", phone: "+91-120-2788273", email: "admissions@rkgit.edu.in", office: "Admissions Office, Ground Floor Block A" }
  },

  "fee-structure": {
    slug: "fee-structure",
    category: "Admissions",
    title: "Fee Structure 2026–27",
    subtitle: "Official academic and hostel fee structure for B.Tech, B.Pharm, MBA, and M.Tech programs (Academic Session 2026-27 | College Code: 033).",
    badge: "Session 2026-27",
    overview: [
      "Official Fee Structure of Raj Kumar Goel Institute of Technology (RKGIT), Ghaziabad for Academic Session 2026–27 (College Code: 033).",
      "RKGIT ensures complete transparency in all tuition, development, and academic support charges. All fees are listed per academic year in Indian Rupees (INR ₹) and governed by state regulations and AKTU guidelines."
    ],
    keyHighlights: [
      { title: "Transparent Fee Structure", description: "Clear breakdown of tuition fees, development, digital learning, and AKTU exam fees." },
      { title: "Refundable Security Deposit", description: "Academic security deposit paid at 1st year admission is 100% refundable upon completion of degree." },
      { title: "Hostel Facilities", description: "Separately managed Boys (Triple Seater) & Girls (Double Seater) air-cooled hostels with mess." },
      { title: "No Hidden Charges", description: "Compliant with AICTE, PCI, and AKTU Lucknow fee norms." }
    ],
    stats: [
      { label: "College Code", value: "033", subtext: "AKTU Affiliated" },
      { label: "Session", value: "2026–27", subtext: "Approved Rates" },
      { label: "B.Tech Gross Total", value: "₹1,47,500", subtext: "1st Year Total" },
      { label: "Hostel Fee", value: "From ₹92,500", subtext: "Including Mess & Security" }
    ],
    table: {
      headers: ["Program Name", "Duration", "1st Year Fee", "Annual Exam Fee (AKTU)"],
      rows: [
        ["B.Tech (Bachelor of Technology)", "4 Years", "₹1,47,500", "₹7,500"],
        ["B.Pharm (Bachelor of Pharmacy)", "4 Years", "₹1,47,500", "₹8,200"],
        ["Master of Business Administration (MBA)", "2 Years", "₹1,50,000", "₹8,200"],
        ["M.Tech (ECE / CSE)", "2 Years", "₹1,00,000", "As per AKTU"]
      ]
    },
    gallery: [
      { url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80", caption: "RKGIT Accounts & Administrative Building" }
    ],
    faqs: [
      {
        question: "Is the fee structure for 2026-27 subject to change?",
        answer: "Fee structure is subject to change by the state/fee fixation committee, if any."
      },
      {
        question: "How can I pay the academic or hostel fees?",
        answer: "Fees can be paid online via credit/debit card, netbanking, or UPI through our official Pay Fee portal (/pay-fee) or via Demand Draft in favor of 'Raj Kumar Goel Institute of Technology' payable at Ghaziabad."
      }
    ],
    contact: { title: "Accounts & Fee Desk", name: "Finance Officer", phone: "+91-120-2788272", email: "accounts@rkgit.edu.in", office: "Accounts Office, Block A Ground Floor" }
  },

  // ─── RESEARCH ──────────────────────────────────────────────────────────
  "publications": {
    slug: "publications",
    category: "Research",
    title: "Research Publications & Journals",
    subtitle: "High-impact research published by RKGIT faculty and students in SCI/Scopus indexed journals.",
    badge: "Scholarly Research",
    overview: [
      "RKGIT fosters a vibrant research culture resulting in over 400+ peer-reviewed papers published in IEEE Transactions, Elsevier, Springer LNCS, and Wiley journals.",
      "The institute provides financial incentives up to ₹50,000 for faculty members publishing in high-impact-factor SCI journals."
    ],
    keyHighlights: [
      { title: "400+ Papers Published", description: "Indexed in Scopus, Web of Science, and SCI databases." },
      { title: "Financial Incentive", description: "Cash awards and conference travel grants for authors." },
      { title: "Student Co-Authorship", description: "Over 35% of papers co-authored by B.Tech final year students." }
    ],
    stats: [
      { label: "Total Publications", value: "400+", subtext: "Scopus & SCI Indexed" },
      { label: "Highest Impact Factor", value: "12.4", subtext: "IEEE Transactions Journal" },
      { label: "Citations Count", value: "3,500+", subtext: "Global Academic Citations" }
    ],
    table: {
      headers: ["Title of Research Paper", "Authors (Faculty / Students)", "Journal / Conference Name", "Publisher", "Indexation", "Year"],
      rows: [
        ["Deep Learning Framework for Edge AI Traffic Management", "Dr. Meenakshi Sharma, Dr. Vikas Gupta", "IEEE Transactions on Intelligent Transport", "IEEE", "SCI (IF: 8.5)", "2026"],
        ["Novel Nanomaterial Composite for Supercapacitor Electrodes", "Dr. S. C. Gupta, Dr. R. K. Yadav", "Journal of Energy Storage", "Elsevier", "SCI (IF: 9.2)", "2026"],
        ["Quantum Cryptography Protocol for IoT Security", "Dr. Pooja Sharma, Mr. Amit Kumar", "Applied Soft Computing", "Elsevier", "Scopus / SCI", "2025"],
        ["Optimized MPPT Algorithm for Solar PV Grid Integration", "Dr. P. K. Singh, Mr. V. A. Singh", "Solar Energy Journal", "Elsevier", "SCI (IF: 7.1)", "2025"],
        ["Generative Adversarial Networks in Medical Image Segmentation", "Dr. Sneha Rastogi, Mr. Deepanshu (Student)", "Computers in Biology and Medicine", "Elsevier", "SCI (IF: 7.7)", "2025"],
        ["Thermal Performance of 3D Printed Micro-Channel Heat Sinks", "Dr. Sanjeev Kumar, Dr. P. Verma", "International Journal of Thermal Sciences", "Elsevier", "SCI (IF: 4.8)", "2025"],
        ["Formulation & In-Vitro Evaluation of Nanoparticulate Drug Delivery", "Dr. Anuj Sharma, Dr. R. B. Smith", "European Journal of Pharmaceutical Sciences", "Elsevier", "SCI (IF: 5.3)", "2024"],
        ["Blockchain-based Federated Learning for Smart Healthcare", "Dr. Vikas Gupta, Ms. Richa Verma", "Future Generation Computer Systems", "Elsevier", "SCI (IF: 7.5)", "2024"],
        ["Low Power FinFET SRAM Cell Design at 7nm Technology", "Dr. P. K. Singh, Mr. N. Tyagi", "IEEE Transactions on VLSI Systems", "IEEE", "SCI (IF: 2.9)", "2024"],
        ["Seismic Resistance Analysis of Multi-Storey RCC Framed Structures", "Dr. A. K. Shukla, Mr. S. Sharma", "Structures & Infrastructure Engineering", "Taylor & Francis", "Scopus / SCI", "2024"],
        ["Predictive Financial Analytics using Hybrid LSTM-Transformer Models", "Dr. Monica Sharma, Dr. M. K. Roy", "Expert Systems with Applications", "Elsevier", "SCI (IF: 8.6)", "2024"],
        ["Smart Water Quality Monitoring System using LoRaWAN IoT Networks", "Mr. Amit Kumar, Mr. Saurabh Mishra", "IEEE Sensors Journal", "IEEE", "SCI (IF: 4.3)", "2024"]
      ]
    },
    gallery: [
      { url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80", caption: "Faculty Presentation at IEEE International Conference" }
    ],
    faqs: [
      { question: "Does RKGIT fund international conference travel for paper presentation?", answer: "Yes, RKGIT provides 100% registration fee reimbursement and airfare grant for presenting papers abroad." }
    ],
    contact: { title: "Dean R&D Office", name: "Dr. R. K. Yadav (Dean R&D)", phone: "+91-120-2788280", email: "dean.rnd@rkgit.edu.in", office: "R&D Centre Block B" }
  },

  // ─── PLACEMENTS ────────────────────────────────────────────────────────
  "placement-statistics": {
    slug: "placement-statistics",
    category: "Placements",
    title: "Placement Statistics & Records",
    subtitle: "Consistently delivering high CTC placements across 300+ global corporate recruiters.",
    badge: "Placements 2026",
    overview: [
      "The Training & Placement Cell at RKGIT works round-the-year to connect students with leading product companies, tech giants, and core MNCs.",
      "For the batch passing out in 2025–26, RKGIT students secured over 850+ placement offers with a highest package of 34 LPA and an average package of 7.3 LPA."
    ],
    keyHighlights: [
      { title: "34 LPA Highest CTC", description: "Offered by international product tier companies." },
      { title: "7.3 LPA Average Package", description: "Consistently rising across engineering and management streams." },
      { title: "300+ Visiting Companies", description: "TCS, Infosys, Wipro, Microsoft, Amazon, Cognizant, Capgemini, Accenture." }
    ],
    stats: [
      { label: "Highest CTC", value: "34 LPA", subtext: "Batch 2025–26" },
      { label: "Average CTC", value: "7.3 LPA", subtext: "Across Engineering" },
      { label: "Total Offers", value: "850+", subtext: "Issued On-Campus" },
      { label: "Placement Rate", value: "94%", subtext: "Eligible Students Placed" }
    ],
    table: {
      headers: ["Passing Batch Year", "Highest Package (LPA)", "Average Package (LPA)", "Total Offers Issued", "Companies Visited", "Placement %"],
      rows: [
        ["2025–2026 (Current)", "34.00 LPA", "7.30 LPA", "850+ Offers", "300+ MNCs", "94% Placed"],
        ["2024–2025", "28.00 LPA", "6.80 LPA", "820+ Offers", "280+ MNCs", "91% Placed"],
        ["2023–2024", "24.50 LPA", "6.20 LPA", "790+ Offers", "250+ MNCs", "88% Placed"],
        ["2022–2023", "21.00 LPA", "5.80 LPA", "750+ Offers", "230+ MNCs", "85% Placed"],
        ["2021–2022", "19.00 LPA", "5.40 LPA", "710+ Offers", "210+ MNCs", "82% Placed"],
        ["2020–2021", "16.50 LPA", "5.00 LPA", "650+ Offers", "190+ MNCs", "79% Placed"],
        ["2019–2020", "14.00 LPA", "4.60 LPA", "600+ Offers", "175+ MNCs", "76% Placed"],
        ["2018–2019", "12.00 LPA", "4.20 LPA", "550+ Offers", "160+ MNCs", "74% Placed"],
        ["2017–2018", "10.00 LPA", "3.90 LPA", "500+ Offers", "145+ MNCs", "72% Placed"],
        ["2016–2017", "9.50 LPA", "3.60 LPA", "450+ Offers", "130+ MNCs", "70% Placed"]
      ]
    },
    gallery: [
      { url: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80", caption: "Corporate Placement Drive in Auditorium" }
    ],
    faqs: [
      { question: "When does campus placement drive start?", answer: "Placement activities begin in the 6th semester (Pre-Final Year) with aptitude bootcamps and mock interviews, followed by company visits in the 7th semester." }
    ],
    contact: { title: "Training & Placement Cell", name: "Prof. H. G. Garg (Head T&P)", phone: "+91-120-2788274", email: "head.tnp@rkgit.edu.in", office: "T&P Block Room 101" }
  },

  // ─── CAMPUS LIFE ───────────────────────────────────────────────────────
  "clubs": {
    slug: "clubs",
    category: "Campus Life",
    title: "Clubs & Societies",
    subtitle: "Unleash your creativity, leadership, and technical passion through 25+ student-driven clubs.",
    badge: "Student Life",
    overview: [
      "At RKGIT, learning extends far beyond textbooks. Our vibrant campus life is powered by student-led technical, cultural, literary, and sports societies.",
      "From competitive programming and robotics to music bands, drama, and social service drives, there is a club for every passion."
    ],
    keyHighlights: [
      { title: "Technical Clubs", description: "CodeChef Chapter, Robotics Society, IEEE Student Branch, CyberSec Club." },
      { title: "Cultural Clubs", description: "Resonance Music Band, Footloose Dance Troupe, Awaaz Dramatics Society." },
      { title: "Social Clubs", description: "NSS Unit, Rotaract Club, Eco Warriors." }
    ],
    stats: [
      { label: "Active Clubs", value: "25+", subtext: "Student Societies" },
      { label: "Annual Events", value: "50+", subtext: "Competitions & Workshops" },
      { label: "Club Members", value: "2,500+", subtext: "Enrolled Students" }
    ],
    table: {
      headers: ["Club Name", "Category", "Faculty Coordinator", "Student Lead", "Key Annual Event"],
      rows: [
        ["ByteCraft Coding Club", "Technical (CSE)", "Mr. Amit Kumar", "Rahul Sharma (4th Yr)", "Hack-A-Thon 24Hrs"],
        ["IEEE RKGIT Chapter", "Technical / Global", "Dr. P. K. Singh", "Ananya Verma (3rd Yr)", "TechXpo & Paper Contest"],
        ["RoboTech Society", "Robotics & Hardware", "Dr. Sanjeev Kumar", "Vikas Singh (4th Yr)", "RoboWars & Line Follower"],
        ["CyberShield Club", "Cybersecurity", "Dr. Pooja Sharma", "Aman Gupta (3rd Yr)", "CTF Flag Hunting"],
        ["Resonance Music Club", "Cultural (Music)", "Dr. S. C. Gupta", "Rohan Mehta (4th Yr)", "Unplugged Acoustic Night"],
        ["Footloose Dance Crew", "Cultural (Dance)", "Ms. Richa Verma", "Ishita Saxena (3rd Yr)", "Beat Drop Dance Battle"],
        ["Awaaz Dramatics Society", "Cultural (Drama)", "Dr. Monica Sharma", "Harsh Vardhan (4th Yr)", "Nukkad Natak Competition"],
        ["RKGIT Literary Club", "Literary & Debate", "Dr. Sneha Rastogi", "Shruti Pandey (3rd Yr)", "Parliamentary Debate"],
        ["Rotaract Club of RKGIT", "Social Service", "Dr. V. A. Singh", "Aditya Srivastava (4th Yr)", "Blood Donation Drive"],
        ["NSS RKGIT Unit", "Social Welfare", "Dr. R. K. Lall", "Shivam Kumar (3rd Yr)", "Gramin Literacy Camp"]
      ]
    },
    gallery: [
      { url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80", caption: "Resonance Music Club Live Concert Performance" }
    ],
    faqs: [
      { question: "How can 1st year students join clubs?", answer: "Club recruitment orientation drives take place in August during Induction Week." }
    ],
    contact: { title: "Dean Student Welfare", name: "DSW Office", phone: "+91-120-2788277", email: "dsw@rkgit.edu.in", office: "Student Activity Centre Room 12" }
  },

  // ─── PEOPLE ────────────────────────────────────────────────────────────
  "faculty-directory": {
    slug: "faculty-directory",
    category: "People",
    title: "Faculty Directory",
    subtitle: "Meet our 150+ dedicated professors, researchers, and mentors.",
    badge: "Faculty Roster",
    overview: [
      "RKGIT takes pride in its distinguished team of 150+ full-time faculty members, over 60% of whom hold doctoral degrees from IITs, NITs, and reputed state universities.",
      "Our faculty members combine academic rigor with extensive research and industrial consultancy experience."
    ],
    keyHighlights: [
      { title: "Ph.D. Qualified", description: "Over 60% faculty members hold Ph.D. credentials." },
      { title: "IIT/NIT Alumni", description: "Professors educated at premier national institutions." },
      { title: "Active Mentorship", description: "1:15 Faculty-to-Student mentor ratio for academic guidance." }
    ],
    stats: [
      { label: "Faculty Members", value: "150+", subtext: "Full-Time Teaching Staff" },
      { label: "Ph.D. Holders", value: "90+", subtext: "Doctorate Degree Holders" },
      { label: "Patents Granted", value: "25+", subtext: "Faculty Innovations" }
    ],
    table: {
      headers: ["S.No.", "Faculty Name", "Department", "Designation", "Qualification", "Specialization", "Email ID"],
      rows: [
        ["1", "Dr. Meenakshi Sharma", "Computer Science", "Professor & HOD", "Ph.D. (CS)", "Artificial Intelligence & ML", "hod.cse@rkgit.edu.in"],
        ["2", "Dr. Vikas Gupta", "Computer Science", "Professor", "Ph.D. (IIT Delhi)", "Cloud Computing & Systems", "vikas.cse@rkgit.edu.in"],
        ["3", "Dr. Pooja Sharma", "Computer Science", "Associate Professor", "Ph.D. (JNU)", "Cyber Security & Cryptography", "pooja.cse@rkgit.edu.in"],
        ["4", "Dr. Amit Agarwal", "Information Tech", "Professor & HOD", "Ph.D. (IT)", "Software Engineering & Data", "hod.it@rkgit.edu.in"],
        ["5", "Dr. P. K. Singh", "Electronics & Comm", "Professor & HOD", "Ph.D. (ECE)", "VLSI Design & Embedded Systems", "hod.ece@rkgit.edu.in"],
        ["6", "Dr. Sanjeev Kumar", "Mechanical Engg", "Professor & HOD", "Ph.D. (ME)", "Robotics & Manufacturing", "hod.me@rkgit.edu.in"],
        ["7", "Dr. A. K. Shukla", "Civil Engineering", "Professor & HOD", "Ph.D. (CE)", "Structural Engineering", "hod.ce@rkgit.edu.in"],
        ["8", "Dr. S. C. Gupta", "Applied Sciences", "Professor & HOD", "Ph.D. (Physics)", "Nanotechnology & Materials", "hod.as@rkgit.edu.in"],
        ["9", "Dr. Monica Sharma", "Management (MBA)", "Professor & HOD", "Ph.D. (Management)", "Corporate Finance & Strategy", "hod.mba@rkgit.edu.in"],
        ["10", "Dr. Anuj Sharma", "Pharmacy", "Director & HOD", "Ph.D. (Pharmaceutics)", "Novel Drug Delivery Systems", "director.pharmacy@rkgit.edu.in"],
        ["11", "Dr. R. K. Lall", "Computer Science", "Associate Professor", "Ph.D., M.Tech", "Big Data & Machine Learning", "rklall.cse@rkgit.edu.in"],
        ["12", "Dr. Sneha Rastogi", "Computer Science", "Assistant Professor", "Ph.D. (CS)", "Natural Language Processing", "sneha.cse@rkgit.edu.in"],
        ["13", "Mr. Amit Kumar", "Computer Science", "Assistant Professor", "M.Tech (CSE)", "Full Stack Web Development", "amit.cse@rkgit.edu.in"],
        ["14", "Ms. Richa Verma", "Computer Science", "Assistant Professor", "M.Tech (CSE)", "IoT & Computer Networks", "richa.cse@rkgit.edu.in"],
        ["15", "Dr. P. Verma", "Mechanical Engg", "Associate Professor", "Ph.D. (ME)", "Thermal Systems & IC Engines", "pverma.me@rkgit.edu.in"]
      ]
    },
    gallery: [
      { url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80", caption: "Faculty Members Conducting Interactive Workshop" }
    ],
    faqs: [
      { question: "How can I contact a specific faculty member?", answer: "You can find official email IDs in the faculty directory table or email the department HOD office." }
    ],
    contact: { title: "HR & Faculty Relations", name: "Dean Faculty Affairs", phone: "+91-120-2788278", email: "faculty.affairs@rkgit.edu.in", office: "Admin Block Room 201" }
  }
};
