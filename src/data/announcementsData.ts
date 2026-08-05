export interface ImportantDate {
  label: string;
  date: string;
}

export interface DetailedAnnouncement {
  id: number;
  title: string;
  category: string;
  date: string;
  priority: 'High' | 'Medium' | 'Low';
  department: string;
  shortDescription: string;
  detailedInfo: string;
  pdfUrl?: string;
  externalUrl?: string;
  contactEmail: string;
  contactPhone: string;
  importantDates: ImportantDate[];
  featured?: boolean;
}

export const DETAILED_ANNOUNCEMENTS: DetailedAnnouncement[] = [
  {
    id: 1,
    title: "Admissions Open 2026–27 — B.Tech, M.Tech, MBA, MCA & Pharmacy",
    category: "Admissions",
    date: "2026-08-01",
    priority: "High",
    department: "Admissions Cell",
    shortDescription: "Online and offline applications are invited for all undergraduate and postgraduate programs for the academic session 2026–27.",
    detailedInfo: "Raj Kumar Goel Institute of Technology (RKGIT), Ghaziabad announces the commencement of admission process for session 2026–27. Admission is strictly based on JEE Main / CUET scores and UPSEE merit counseling as per AKTU guidelines. Direct management seats are also available based on 10+2 marks.",
    pdfUrl: "https://rkgit.edu.in/downloads/Admissions_Brochure_2026.pdf",
    externalUrl: "https://admission.rkgit.edu.in",
    contactEmail: "admissions@rkgit.edu.in",
    contactPhone: "+91-120-2788273",
    importantDates: [
      { label: "Application Start Date", date: "August 1, 2026" },
      { label: "Last Date for Phase 1", date: "August 25, 2026" },
      { label: "Counseling & Reporting", date: "September 1, 2026" }
    ],
    featured: true
  },
  {
    id: 2,
    title: "Mega Campus Placement Drive by Microsoft & Amazon India",
    category: "Placements",
    date: "2026-08-03",
    priority: "High",
    department: "Training & Placement Cell",
    shortDescription: "Joint recruitment drive for B.Tech CSE, IT, AI/ML, and ECE 2027 passing out batch with packages up to 34 LPA.",
    detailedInfo: "The Training & Placement Cell is hosting Microsoft and Amazon India for an exclusive campus hiring drive for Software Development Engineer (SDE-1) and Cloud Solutions Architect roles. Eligible students must complete profile verification on the T&P Portal before the deadline.",
    pdfUrl: "https://rkgit.edu.in/downloads/Placement_Drive_Microsoft_2026.pdf",
    externalUrl: "https://tnp.rkgit.edu.in/portal",
    contactEmail: "placement@rkgit.edu.in",
    contactPhone: "+91-9810012345",
    importantDates: [
      { label: "Registration Deadline", date: "August 10, 2026" },
      { label: "Online Assessment", date: "August 14, 2026" },
      { label: "Interview Rounds", date: "August 18–20, 2026" }
    ],
    featured: true
  },
  {
    id: 3,
    title: "Smart India Hackathon (SIH) 2026 Internal Screening Finalists",
    category: "Student Activities",
    date: "2026-08-02",
    priority: "Medium",
    department: "Innovation & Incubation Cell",
    shortDescription: "List of 15 student teams shortlisted for the Grand Finale of Smart India Hackathon 2026 (Software & Hardware Editions).",
    detailedInfo: "Congratulations to the 15 selected teams representing RKGIT at the National Level SIH 2026. Mentorship sessions by industry experts will begin from August 10 in the RKGIT Innovation Hub.",
    pdfUrl: "https://rkgit.edu.in/downloads/SIH_2026_Finalists_List.pdf",
    contactEmail: "iic@rkgit.edu.in",
    contactPhone: "+91-120-2784501",
    importantDates: [
      { label: "Mentorship Orientation", date: "August 10, 2026" },
      { label: "Prototype Submission", date: "August 22, 2026" }
    ],
    featured: true
  },
  {
    id: 4,
    title: "AI & Generative Deep Learning Workshop Registration Open",
    category: "Workshops",
    date: "2026-07-28",
    priority: "Medium",
    department: "Department of CSE & AI/ML",
    shortDescription: "3-day hands-on workshop on LLMs, PyTorch, and LangChain conducted by Senior AI Engineers from Google Cloud.",
    detailedInfo: "The Department of CSE & AI/ML is organizing an intensive 3-day practical workshop covering Transformer architectures, Prompt Engineering, RAG applications, and PyTorch model fine-tuning. Certificate of completion will be issued.",
    pdfUrl: "https://rkgit.edu.in/downloads/AI_Workshop_Brochure.pdf",
    externalUrl: "https://events.rkgit.edu.in/ai-workshop",
    contactEmail: "ai.workshop@rkgit.edu.in",
    contactPhone: "+91-9876543210",
    importantDates: [
      { label: "Registration Closes", date: "August 15, 2026" },
      { label: "Workshop Dates", date: "August 22–24, 2026" }
    ],
    featured: true
  },
  {
    id: 5,
    title: "Mid-Semester Examination Schedule (Odd Semester 2026–27)",
    category: "Examinations",
    date: "2026-08-04",
    priority: "High",
    department: "Examination Cell",
    shortDescription: "Detailed date sheet and seating plan released for 3rd, 5th, and 7th semester mid-term examinations.",
    detailedInfo: "All students are informed that Mid-Semester Examinations for Odd Semester (2026–27) will commence from September 15, 2026. Hall tickets can be downloaded from the RKGIT ERP Student Portal after clearance of fee dues.",
    pdfUrl: "https://rkgit.edu.in/downloads/Mid_Sem_Datesheet_Odd2026.pdf",
    externalUrl: "https://erp.rkgit.edu.in",
    contactEmail: "coe@rkgit.edu.in",
    contactPhone: "+91-120-2788275",
    importantDates: [
      { label: "Fee Clearance Deadline", date: "September 5, 2026" },
      { label: "Admit Card Download", date: "September 10, 2026" },
      { label: "Exams Begin", date: "September 15, 2026" }
    ],
    featured: true
  },
  {
    id: 6,
    title: "Library New Arrivals — 500+ Digital E-Books & Journals Added",
    category: "Library",
    date: "2026-07-30",
    priority: "Low",
    department: "Central Library",
    shortDescription: "RKGIT Central Library has subscribed to IEEE Xplore, ScienceDirect, and added 500+ physical and digital reference books.",
    detailedInfo: "Students and faculty members can now access IEEE Transactions, ACM Digital Library, and Springer LNCS volumes remotely using their institutional email ID. Physical books are available at the Issue Counter.",
    pdfUrl: "https://rkgit.edu.in/downloads/Library_New_Arrivals_Aug2026.pdf",
    externalUrl: "https://library.rkgit.edu.in",
    contactEmail: "librarian@rkgit.edu.in",
    contactPhone: "+91-120-2788278",
    importantDates: [
      { label: "Orientation Session", date: "August 8, 2026" }
    ],
    featured: true
  },
  {
    id: 7,
    title: "Merit & Social Welfare Scholarship Applications Invited 2026–27",
    category: "Scholarships",
    date: "2026-07-25",
    priority: "High",
    department: "Scholarship & Welfare Cell",
    shortDescription: "Eligible SC/ST/OBC/EWS and Academic Merit students can submit application forms for tuition fee reimbursement.",
    detailedInfo: "Applications are open for UP Government Post-Matric Scholarship and RKGIT Chairman Merit Scholarship. Eligible students with family income under ₹2.5 Lakh per annum can apply online at upscholarship.gov.in.",
    pdfUrl: "https://rkgit.edu.in/downloads/Scholarship_Notice_2026.pdf",
    externalUrl: "https://scholarship.up.gov.in",
    contactEmail: "scholarship@rkgit.edu.in",
    contactPhone: "+91-120-2788280",
    importantDates: [
      { label: "Online Submission Last Date", date: "October 15, 2026" },
      { label: "Hardcopy Verification", date: "October 25, 2026" }
    ]
  },
  {
    id: 8,
    title: "IEEE International Conference on Sustainable Tech (ICST 2026)",
    category: "Conferences",
    date: "2026-07-20",
    priority: "Medium",
    department: "Research & Development Cell",
    shortDescription: "Call for papers for the 4th IEEE International Conference on Smart Grids, IoT, and Clean Energy Solutions.",
    detailedInfo: "RKGIT in technical co-sponsorship with IEEE UP Section invites high-quality original research papers for ICST 2026. All accepted papers will be submitted to IEEE Xplore for indexation.",
    pdfUrl: "https://rkgit.edu.in/downloads/ICST_2026_CFP.pdf",
    externalUrl: "https://icst2026.rkgit.edu.in",
    contactEmail: "icst2026@rkgit.edu.in",
    contactPhone: "+91-9910223344",
    importantDates: [
      { label: "Paper Submission Deadline", date: "September 30, 2026" },
      { label: "Acceptance Notification", date: "October 30, 2026" },
      { label: "Conference Dates", date: "December 18–19, 2026" }
    ]
  },
  {
    id: 9,
    title: "Faculty Development Program (FDP) on VLSI System Design",
    category: "FDPs",
    date: "2026-07-15",
    priority: "Medium",
    department: "Department of ECE",
    shortDescription: "1-Week AICTE-ATAL sponsored FDP on Advanced System-on-Chip (SoC) Design and Cadence EDA Tools.",
    detailedInfo: "Faculty members, research scholars, and industry professionals are invited for hands-on training in 7nm VLSI design using Cadence Virtuoso and Synopsys Design Compiler.",
    pdfUrl: "https://rkgit.edu.in/downloads/FDP_VLSI_2026.pdf",
    contactEmail: "fdp.ece@rkgit.edu.in",
    contactPhone: "+91-120-2788282",
    importantDates: [
      { label: "Registration Deadline", date: "August 20, 2026" },
      { label: "FDP Dates", date: "August 25–29, 2026" }
    ]
  },
  {
    id: 10,
    title: "26th Annual Convocation Ceremony 2026 Registration",
    category: "Academic",
    date: "2026-07-10",
    priority: "High",
    department: "Registrar Office",
    shortDescription: "Graduating batch of 2025-26 can register for degree distribution and medal ceremony.",
    detailedInfo: "The 26th Annual Convocation of Raj Kumar Goel Institute of Technology will be held at the Main Auditorium. Hon'ble Vice Chancellor of AKTU will be the Chief Guest.",
    pdfUrl: "https://rkgit.edu.in/downloads/Convocation_2026_Notice.pdf",
    externalUrl: "https://convocation.rkgit.edu.in",
    contactEmail: "convocation@rkgit.edu.in",
    contactPhone: "+91-120-2788285",
    importantDates: [
      { label: "Registration Deadline", date: "September 1, 2026" },
      { label: "Dress Code & Gown Issue", date: "September 14, 2026" },
      { label: "Convocation Day", date: "September 15, 2026" }
    ]
  },
  {
    id: 11,
    title: "NSS Volunteer Recruitment Drive for Session 2026–27",
    category: "Student Activities",
    date: "2026-08-01",
    priority: "Low",
    department: "National Service Scheme (NSS)",
    shortDescription: "Enrollment open for 1st & 2nd year students for community welfare, blood donation camps, and literacy drives.",
    detailedInfo: "Join NSS RKGIT Unit for social leadership, rural community adoption camps, tree plantation drives, and disaster management workshops. Certificates awarded upon completion of 120 hours of service.",
    pdfUrl: "https://rkgit.edu.in/downloads/NSS_Enrollment_2026.pdf",
    contactEmail: "nss@rkgit.edu.in",
    contactPhone: "+91-9871122334",
    importantDates: [
      { label: "Interview & Selection", date: "August 12–13, 2026" }
    ]
  },
  {
    id: 12,
    title: "Inter-Departmental Sports Trials — Cricket, Football & Badminton",
    category: "Sports",
    date: "2026-07-28",
    priority: "Low",
    department: "Department of Physical Education",
    shortDescription: "Selection trials for RKGIT official sports teams for AKTU Zonal Sports Meet 2026.",
    detailedInfo: "All interested students are invited to bring their student ID cards and sports kit for official selection trials at the RKGIT Sports Complex.",
    pdfUrl: "https://rkgit.edu.in/downloads/Sports_Trials_2026.pdf",
    contactEmail: "sports@rkgit.edu.in",
    contactPhone: "+91-9999887766",
    importantDates: [
      { label: "Cricket Trials", date: "August 8, 2026 (04:00 PM)" },
      { label: "Football & Badminton", date: "August 9, 2026 (04:00 PM)" }
    ]
  },
  {
    id: 13,
    title: "NBA Re-Accreditation Awarded to B.Tech CSE, ECE, & ME Departments",
    category: "Research",
    date: "2026-07-18",
    priority: "High",
    department: "IQAC Cell",
    shortDescription: "National Board of Accreditation (NBA) extends Tier-1 accreditation status up to Academic Year 2029.",
    detailedInfo: "RKGIT Ghaziabad is proud to announce that the National Board of Accreditation (NBA), New Delhi has reaccredited our B.Tech in CSE, ECE, and Mechanical Engineering programs following rigorous peer team evaluation.",
    pdfUrl: "https://rkgit.edu.in/downloads/NBA_Accreditation_Letter_2026.pdf",
    contactEmail: "iqac@rkgit.edu.in",
    contactPhone: "+91-120-2788290",
    importantDates: [
      { label: "Accreditation Period", date: "2026 – 2029" }
    ]
  },
  {
    id: 14,
    title: "Entrepreneurship Bootcamp & Seed Funding by RKGIT E-Cell",
    category: "Workshops",
    date: "2026-07-22",
    priority: "Medium",
    department: "Entrepreneurship Development Cell",
    shortDescription: "Incubation grants up to ₹5 Lakhs for top 3 student startup ideas presented during pitch night.",
    detailedInfo: "Pitch your startup idea to leading Angel Investors, VC funds, and successful RKGIT Alumni founders. Selected startups will receive free co-working space, legal assistance, and prototype seed capital.",
    pdfUrl: "https://rkgit.edu.in/downloads/ECELL_Bootcamp_2026.pdf",
    externalUrl: "https://ecell.rkgit.edu.in",
    contactEmail: "ecell@rkgit.edu.in",
    contactPhone: "+91-9811223344",
    importantDates: [
      { label: "Executive Summary Deadline", date: "August 20, 2026" },
      { label: "Pitch Day", date: "September 5, 2026" }
    ]
  },
  {
    id: 15,
    title: "Industrial Visit to DRDO & ISRO Telemetry Centre for 3rd Year Students",
    category: "Student Activities",
    date: "2026-07-16",
    priority: "Medium",
    department: "Department of Mechanical & ECE",
    shortDescription: "One-day observational tour to defense research labs and telemetry tracking stations.",
    detailedInfo: "Students of 5th semester ME and ECE will visit DRDO Ghaziabad and ISRO Telemetry, Tracking and Command Network (ISTRAC) to inspect radar systems, satellite antennas, and precision manufacturing.",
    pdfUrl: "https://rkgit.edu.in/downloads/DRDO_Visit_Circular.pdf",
    contactEmail: "me.dept@rkgit.edu.in",
    contactPhone: "+91-120-2788292",
    importantDates: [
      { label: "Consent Form Submission", date: "August 10, 2026" },
      { label: "Visit Date", date: "August 18, 2026" }
    ]
  },
  {
    id: 16,
    title: "Hostel Fee Payment & Room Allocation Notice (Academic Session 2026–27)",
    category: "Hostel",
    date: "2026-07-12",
    priority: "High",
    department: "Chief Warden Office",
    shortDescription: "Online room booking portal open for Senior Boys and Girls Hostels with Wi-Fi & AC options.",
    detailedInfo: "Hostel resident students can pay their annual hostel dues online through the Pay Fee portal and select room preferences (Single/Double/Triple sharing AC/Non-AC).",
    pdfUrl: "https://rkgit.edu.in/downloads/Hostel_Allocation_Rules_2026.pdf",
    externalUrl: "https://rkgit.edu.in/pay-fee",
    contactEmail: "hostel@rkgit.edu.in",
    contactPhone: "+91-120-2788295",
    importantDates: [
      { label: "Booking Deadline", date: "August 15, 2026" },
      { label: "Hostel Check-in", date: "August 20, 2026" }
    ]
  },
  {
    id: 17,
    title: "Ph.D. Research Scholar Admissions — Entrance Test & Interview 2026",
    category: "Research",
    date: "2026-07-08",
    priority: "Medium",
    department: "Dean Research & AKTU Study Centre",
    shortDescription: "Applications invited for full-time and part-time Ph.D. in CSE, ECE, ME, Pharmacy, and Management.",
    detailedInfo: "Candidates with GATE / NET / GPAT qualification or AKTU RET scorecard can apply for doctoral research under RKGIT approved research guides.",
    pdfUrl: "https://rkgit.edu.in/downloads/PhD_Admissions_RKGIT_2026.pdf",
    contactEmail: "dean.research@rkgit.edu.in",
    contactPhone: "+91-120-2788298",
    importantDates: [
      { label: "Application Last Date", date: "August 30, 2026" },
      { label: "Interview Date", date: "September 10, 2026" }
    ]
  },
  {
    id: 18,
    title: "Cultural Club Auditions for TRISHA Annual Fest 2026",
    category: "Cultural Events",
    date: "2026-07-05",
    priority: "Low",
    department: "Cultural Society",
    shortDescription: "Auditions for Dance, Music, Dramatics, Fashion, and Fine Arts teams for upcoming inter-college events.",
    detailedInfo: "Showcase your artistic talent! Cultural society is holding auditions for Music Band 'Resonance', Dance Troupe 'Footloose', and Drama Team 'Awaaz'.",
    pdfUrl: "https://rkgit.edu.in/downloads/Trisha_Auditions_2026.pdf",
    contactEmail: "cultural@rkgit.edu.in",
    contactPhone: "+91-9871234567",
    importantDates: [
      { label: "Audition Dates", date: "August 14–16, 2026" }
    ]
  },
  {
    id: 19,
    title: "NCC 13 UP Battalion Enrolment & Physical Efficiency Test",
    category: "Student Activities",
    date: "2026-07-02",
    priority: "Low",
    department: "NCC RKGIT Coy",
    shortDescription: "Selection for NCC 'B' and 'C' Certificate Training for Senior Division Cadets.",
    detailedInfo: "Physical test comprising 1.6 km run, pushups, and personal interview will be conducted by Army Staff of 13 UP Bn NCC Ghaziabad.",
    pdfUrl: "https://rkgit.edu.in/downloads/NCC_Enrolment_2026.pdf",
    contactEmail: "ncc@rkgit.edu.in",
    contactPhone: "+91-9810998877",
    importantDates: [
      { label: "Physical Test Date", date: "August 11, 2026 (07:00 AM)" }
    ]
  },
  {
    id: 20,
    title: "Annual Alumni Reunion & Mentorship Summit 2026",
    category: "Academic",
    date: "2026-06-28",
    priority: "Medium",
    department: "Alumni Relations Association",
    shortDescription: "Over 300+ distinguished alumni from Fortune 500 companies returning to campus for 1-on-1 career mentoring.",
    detailedInfo: "RKGIT Alumni Association cordially invites all former graduates for the Annual Meet 'SMRITI 2026'. Networking dinner and startup panel discussions scheduled.",
    pdfUrl: "https://rkgit.edu.in/downloads/Alumni_Meet_2026_Schedule.pdf",
    externalUrl: "https://rkgit.edu.in/alumni",
    contactEmail: "alumni@rkgit.edu.in",
    contactPhone: "+91-120-2788300",
    importantDates: [
      { label: "Alumni Meet Date", date: "September 26, 2026" }
    ]
  },
  {
    id: 21,
    title: "New Electric Bus Service Started on Delhi–NCR Routes",
    category: "Hostel",
    date: "2026-06-25",
    priority: "Low",
    department: "Transport Section",
    shortDescription: "Environment-friendly AC electric buses added to Anand Vihar, Vaishali, Noida Sector 62, and Dilshad Garden routes.",
    detailedInfo: "To ensure comfortable and eco-friendly commuting, RKGIT has upgraded its fleet with 10 brand-new fully electric AC buses equipped with GPS tracking and panic buttons.",
    pdfUrl: "https://rkgit.edu.in/downloads/Bus_Routes_Fee_2026.pdf",
    contactEmail: "transport@rkgit.edu.in",
    contactPhone: "+91-120-2788305",
    importantDates: [
      { label: "Pass Registration", date: "Open Now" }
    ]
  },
  {
    id: 22,
    title: "Patent Grant Notification — Department of Electrical Engineering",
    category: "Research",
    date: "2026-06-20",
    priority: "High",
    department: "Intellectual Property Rights Cell",
    shortDescription: "Indian Patent Office grants patent for 'Smart Grid Fault Location System' invented by Dr. P. K. Singh & team.",
    detailedInfo: "Patent No. 412985 granted for an innovative IoT-enabled microgrid fault localization technique. Hearty congratulations to the inventors!",
    pdfUrl: "https://rkgit.edu.in/downloads/Patent_Grant_Certificate.pdf",
    contactEmail: "ipr@rkgit.edu.in",
    contactPhone: "+91-120-2788310",
    importantDates: [
      { label: "Grant Date", date: "June 18, 2026" }
    ]
  },
  {
    id: 23,
    title: "Free Medical Checkup & Blood Donation Camp on Campus",
    category: "Student Activities",
    date: "2026-06-15",
    priority: "Low",
    department: "RKGIT Medical Cell & Rotaract Club",
    shortDescription: "Free eye checkup, dental screening, and blood donation camp in collaboration with Rotary Blood Bank.",
    detailedInfo: "All students, faculty, and staff members are invited for health screening at the Medical Centre. Donors will receive certificates and donor cards.",
    pdfUrl: "https://rkgit.edu.in/downloads/Blood_Donation_Camp.pdf",
    contactEmail: "medical@rkgit.edu.in",
    contactPhone: "+91-120-2788315",
    importantDates: [
      { label: "Camp Date", date: "August 18, 2026 (10 AM - 4 PM)" }
    ]
  },
  {
    id: 24,
    title: "International Joint Degree Program MoU signed with University of Texas",
    category: "Conferences",
    date: "2026-06-10",
    priority: "High",
    department: "International Relations Office",
    shortDescription: "3+1 Accelerated Dual Degree and Student Exchange Opportunities for CSE and ECE students.",
    detailedInfo: "RKGIT students can complete their final year of study at the University of Texas, Arlington, USA and receive dual credentials with preferential scholarship tuition rates.",
    pdfUrl: "https://rkgit.edu.in/downloads/MOU_UT_Arlington.pdf",
    contactEmail: "iro@rkgit.edu.in",
    contactPhone: "+91-120-2788320",
    importantDates: [
      { label: "Information Session", date: "August 28, 2026" }
    ]
  },
  {
    id: 25,
    title: "Annual Security Audit & Anti-Ragging Undertaking Submission",
    category: "Academic",
    date: "2026-06-05",
    priority: "High",
    department: "Anti-Ragging Committee",
    shortDescription: "Mandatory online anti-ragging affidavit submission on antiragging.in for all registered students.",
    detailedInfo: "In compliance with UGC and AICTE regulations, all students must complete their online anti-ragging undertaking and submit the signed printout to their departmental coordinator.",
    pdfUrl: "https://rkgit.edu.in/downloads/Anti_Ragging_Notice_2026.pdf",
    externalUrl: "https://antiragging.in",
    contactEmail: "antiragging@rkgit.edu.in",
    contactPhone: "+91-120-2788325",
    importantDates: [
      { label: "Submission Deadline", date: "August 20, 2026" }
    ]
  }
];

export const HOMEPAGE_TICKER_ANNOUNCEMENTS = DETAILED_ANNOUNCEMENTS.slice(0, 18).map(a => ({
  id: a.id,
  text: a.title,
  category: a.category,
  date: a.date
}));
