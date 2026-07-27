export interface Recruiter {
  id: string;
  name: string;
  logo: string;
  sector: 'Technology & AI' | 'Product & E-Commerce' | 'Finance & Fintech' | 'Consulting & IT Services' | 'Core & Telecom';
  featured?: boolean;
}

export interface CompensationData {
  year: string;
  highest: number; // in LPA
  average: number; // in LPA
}

export interface PlacementPercentageData {
  year: string;
  rate: number; // percentage
}

export interface KPICardData {
  label: string;
  value: string;
  subtext: string;
  iconName: 'Award' | 'IndianRupee' | 'Percent' | 'Building2';
  trend: string;
  color: string;
}

export const PLACEMENT_KPIS: KPICardData[] = [
  {
    label: "Highest Package",
    value: "35 LPA",
    subtext: "International & Product Tier",
    iconName: "Award",
    trend: "+25% vs last year",
    color: "from-blue-600 to-indigo-700"
  },
  {
    label: "Average Package",
    value: "7.3 LPA",
    subtext: "Across B.Tech Batch 2025-26",
    iconName: "IndianRupee",
    trend: "+17.7% growth",
    color: "from-emerald-600 to-teal-700"
  },
  {
    label: "Placement Rate",
    value: "94%",
    subtext: "Eligible Students Placed",
    iconName: "Percent",
    trend: "Consistent top tier",
    color: "from-violet-600 to-purple-700"
  },
  {
    label: "Recruiting Companies",
    value: "300+",
    subtext: "Global & Domestic Leaders",
    iconName: "Building2",
    trend: "50+ new recruiters",
    color: "from-amber-500 to-orange-600"
  }
];

export const COMPENSATION_STATS: CompensationData[] = [
  { year: "2025–26", highest: 28, average: 6.9 },
  { year: "2024–25", highest: 24, average: 6.2 },
  { year: "2023–24", highest: 21, average: 5.8 },
  { year: "2022–23", highest: 19, average: 5.4 },
  { year: "2021–22", highest: 17, average: 5.0 },
];

export const PLACEMENT_PERCENTAGE_STATS: PlacementPercentageData[] = [
  { year: "2025–26", rate: 91 },
  { year: "2024–25", rate: 87 },
  { year: "2023–24", rate: 84 },
  { year: "2022–23", rate: 80 },
  { year: "2021–22", rate: 76 },
];

export const ALL_RECRUITERS: Recruiter[] = [
  {
    id: "google",
    name: "Google",
    sector: "Technology & AI",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/google.svg",
    featured: true
  },
  {
    id: "microsoft",
    name: "Microsoft",
    sector: "Technology & AI",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoft.svg",
    featured: true
  },
  {
    id: "amazon",
    name: "Amazon",
    sector: "Product & E-Commerce",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazon.svg",
    featured: true
  },
  {
    id: "flipkart",
    name: "Flipkart",
    sector: "Product & E-Commerce",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/flipkart.svg",
    featured: true
  },
  {
    id: "adobe",
    name: "Adobe",
    sector: "Technology & AI",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/adobe.svg",
    featured: true
  },
  {
    id: "accenture",
    name: "Accenture",
    sector: "Consulting & IT Services",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/accenture.svg"
  },
  {
    id: "tcs",
    name: "TCS",
    sector: "Consulting & IT Services",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tata.svg"
  },
  {
    id: "infosys",
    name: "Infosys",
    sector: "Consulting & IT Services",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/infosys.svg"
  },
  {
    id: "wipro",
    name: "Wipro",
    sector: "Consulting & IT Services",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/wipro.svg"
  },
  {
    id: "hcl",
    name: "HCL",
    sector: "Consulting & IT Services",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/hcl.svg"
  },
  {
    id: "ibm",
    name: "IBM",
    sector: "Technology & AI",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/ibm.svg"
  },
  {
    id: "deloitte",
    name: "Deloitte",
    sector: "Consulting & IT Services",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/deloitte.svg",
    featured: true
  },
  {
    id: "cognizant",
    name: "Cognizant",
    sector: "Consulting & IT Services",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/cognizant.svg"
  },
  {
    id: "capgemini",
    name: "Capgemini",
    sector: "Consulting & IT Services",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/capgemini.svg"
  },
  {
    id: "paypal",
    name: "PayPal",
    sector: "Finance & Fintech",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/paypal.svg",
    featured: true
  },
  {
    id: "nvidia",
    name: "NVIDIA",
    sector: "Technology & AI",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nvidia.svg",
    featured: true
  },
  {
    id: "servicenow",
    name: "ServiceNow",
    sector: "Technology & AI",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/servicenow.svg"
  },
  {
    id: "goldman-sachs",
    name: "Goldman Sachs",
    sector: "Finance & Fintech",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/goldmansachs.svg",
    featured: true
  },
  {
    id: "oracle",
    name: "Oracle",
    sector: "Technology & AI",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/oracle.svg"
  },
  {
    id: "sap",
    name: "SAP",
    sector: "Technology & AI",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/sap.svg"
  },
  {
    id: "bosch",
    name: "Bosch",
    sector: "Core & Telecom",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/bosch.svg"
  },
  {
    id: "reliance-jio",
    name: "Reliance Jio",
    sector: "Core & Telecom",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/jio.svg"
  },
  {
    id: "airtel",
    name: "Airtel",
    sector: "Core & Telecom",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/airtel.svg"
  },
  {
    id: "tata-technologies",
    name: "Tata Technologies",
    sector: "Core & Telecom",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tatamotors.svg"
  },
  {
    id: "tech-mahindra",
    name: "Tech Mahindra",
    sector: "Consulting & IT Services",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/techmahindra.svg"
  },
  {
    id: "nagarro",
    name: "Nagarro",
    sector: "Consulting & IT Services",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nagarro.svg"
  },
  {
    id: "epam",
    name: "EPAM",
    sector: "Consulting & IT Services",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/epam.svg"
  },
  {
    id: "maq-software",
    name: "MAQ Software",
    sector: "Technology & AI",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/maqsoftware.svg"
  },
  {
    id: "juspay",
    name: "Juspay",
    sector: "Finance & Fintech",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/juspay.svg"
  },
  {
    id: "commvault",
    name: "Commvault",
    sector: "Technology & AI",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Commvault_logo_2019.svg"
  },
  {
    id: "mathworks",
    name: "MathWorks",
    sector: "Technology & AI",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/mathworks.svg"
  },
  {
    id: "qualcomm",
    name: "Qualcomm",
    sector: "Core & Telecom",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/qualcomm.svg",
    featured: true
  },
  {
    id: "samsung",
    name: "Samsung",
    sector: "Technology & AI",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/samsung.svg",
    featured: true
  },
  {
    id: "intel",
    name: "Intel",
    sector: "Technology & AI",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/intel.svg"
  },
  {
    id: "cisco",
    name: "Cisco",
    sector: "Core & Telecom",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/cisco.svg"
  },
  {
    id: "zoho",
    name: "Zoho",
    sector: "Product & E-Commerce",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/zoho.svg"
  },
  {
    id: "phonepe",
    name: "PhonePe",
    sector: "Finance & Fintech",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/phonepe.svg"
  },
  {
    id: "cred",
    name: "CRED",
    sector: "Finance & Fintech",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/cred.svg"
  },
  {
    id: "meesho",
    name: "Meesho",
    sector: "Product & E-Commerce",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/meesho.svg"
  },
  {
    id: "zs-associates",
    name: "ZS Associates",
    sector: "Consulting & IT Services",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/zs.svg"
  },
  {
    id: "musigma",
    name: "MuSigma",
    sector: "Consulting & IT Services",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/musigma.svg"
  }
];
