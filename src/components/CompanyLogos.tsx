export interface CompanyLogo {
  id: string;
  name: string;
  category: 'it-services' | 'hyderabad-global' | 'enterprise';
  src: string;
  heightClass?: string;
}

// =========================================================================
// ROW 1: INDIAN IT SERVICES LEADERS (10 Distinct Companies - Zero Duplication)
// TCS, Infosys, Wipro, HCLTech, Tech Mahindra, LTIMindtree, Mphasis, Persistent Systems, Coforge, Hexaware
// =========================================================================
export const ROW_1_INDIAN_IT_SERVICES: CompanyLogo[] = [
  {
    id: 'tcs',
    name: 'Tata Consultancy Services',
    category: 'it-services',
    src: '/images/companies/tcs.svg',
    heightClass: 'h-[26px] sm:h-[28px] md:h-[30px]',
  },
  {
    id: 'infosys',
    name: 'Infosys',
    category: 'it-services',
    src: '/images/companies/infosys.svg',
    heightClass: 'h-[22px] sm:h-[24px] md:h-[26px]',
  },
  {
    id: 'wipro',
    name: 'Wipro',
    category: 'it-services',
    src: '/images/companies/wipro.svg',
    heightClass: 'h-[26px] sm:h-[28px] md:h-[30px]',
  },
  {
    id: 'hcltech',
    name: 'HCLTech',
    category: 'it-services',
    src: '/images/companies/hcltech.svg',
    heightClass: 'h-[20px] sm:h-[22px] md:h-[24px]',
  },
  {
    id: 'tech-mahindra',
    name: 'Tech Mahindra',
    category: 'it-services',
    src: '/images/companies/tech-mahindra.svg',
    heightClass: 'h-[22px] sm:h-[24px] md:h-[26px]',
  },
  {
    id: 'ltimindtree',
    name: 'LTIMindtree',
    category: 'it-services',
    src: '/images/companies/ltimindtree.svg',
    heightClass: 'h-[20px] sm:h-[22px] md:h-[24px]',
  },
  {
    id: 'mphasis',
    name: 'Mphasis',
    category: 'it-services',
    src: '/images/companies/mphasis.svg',
    heightClass: 'h-[22px] sm:h-[24px] md:h-[26px]',
  },
  {
    id: 'persistent',
    name: 'Persistent Systems',
    category: 'it-services',
    src: '/images/companies/persistent.svg',
    heightClass: 'h-[22px] sm:h-[24px] md:h-[25px]',
  },
  {
    id: 'coforge',
    name: 'Coforge',
    category: 'it-services',
    src: '/images/companies/coforge.svg',
    heightClass: 'h-[20px] sm:h-[22px] md:h-[23px]',
  },
  {
    id: 'hexaware',
    name: 'Hexaware',
    category: 'it-services',
    src: '/images/companies/hexaware.svg',
    heightClass: 'h-[20px] sm:h-[22px] md:h-[23px]',
  },
];

// =========================================================================
// ROW 2: HYDERABAD HUBS & GLOBAL ENTERPRISES (10 Distinct Companies - Zero Duplication)
// Microsoft, Google, Amazon, Deloitte, Accenture, Oracle, Salesforce, ServiceNow, AMD, NVIDIA
// =========================================================================
export const ROW_2_HYDERABAD_EMPLOYERS: CompanyLogo[] = [
  {
    id: 'microsoft',
    name: 'Microsoft',
    category: 'hyderabad-global',
    src: '/images/companies/microsoft.svg',
    heightClass: 'h-[22px] sm:h-[24px] md:h-[25px]',
  },
  {
    id: 'google',
    name: 'Google',
    category: 'hyderabad-global',
    src: '/images/companies/google.svg',
    heightClass: 'h-[22px] sm:h-[24px] md:h-[26px]',
  },
  {
    id: 'amazon',
    name: 'Amazon',
    category: 'hyderabad-global',
    src: '/images/companies/amazon.svg',
    heightClass: 'h-[22px] sm:h-[24px] md:h-[26px]',
  },
  {
    id: 'deloitte',
    name: 'Deloitte',
    category: 'hyderabad-global',
    src: '/images/companies/deloitte.svg',
    heightClass: 'h-[19px] sm:h-[21px] md:h-[22px]',
  },
  {
    id: 'accenture',
    name: 'Accenture',
    category: 'hyderabad-global',
    src: '/images/companies/accenture.svg',
    heightClass: 'h-[21px] sm:h-[23px] md:h-[24px]',
  },
  {
    id: 'oracle',
    name: 'Oracle',
    category: 'hyderabad-global',
    src: '/images/companies/oracle.svg',
    heightClass: 'h-[18px] sm:h-[20px] md:h-[21px]',
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    category: 'hyderabad-global',
    src: '/images/companies/salesforce.svg',
    heightClass: 'h-[25px] sm:h-[27px] md:h-[29px]',
  },
  {
    id: 'servicenow',
    name: 'ServiceNow',
    category: 'hyderabad-global',
    src: '/images/companies/servicenow.svg',
    heightClass: 'h-[18px] sm:h-[20px] md:h-[21px]',
  },
  {
    id: 'amd',
    name: 'AMD',
    category: 'hyderabad-global',
    src: '/images/companies/amd.svg',
    heightClass: 'h-[20px] sm:h-[22px] md:h-[23px]',
  },
  {
    id: 'nvidia',
    name: 'NVIDIA',
    category: 'hyderabad-global',
    src: '/images/companies/nvidia.svg',
    heightClass: 'h-[20px] sm:h-[22px] md:h-[23px]',
  },
];

// =========================================================================
// ROW 3: ENTERPRISE SOFTWARE, CLOUD & SEMICONDUCTOR ECOSYSTEM (8 Distinct Companies - Zero Duplication)
// IBM, Intel, Cisco, Qualcomm, Capgemini, Cognizant, ADP, SAP
// =========================================================================
export const ROW_3_ENTERPRISE_ECOSYSTEM: CompanyLogo[] = [
  {
    id: 'ibm',
    name: 'IBM',
    category: 'enterprise',
    src: '/images/companies/ibm.svg',
    heightClass: 'h-[20px] sm:h-[22px] md:h-[24px]',
  },
  {
    id: 'intel',
    name: 'Intel',
    category: 'enterprise',
    src: '/images/companies/intel.svg',
    heightClass: 'h-[21px] sm:h-[23px] md:h-[25px]',
  },
  {
    id: 'cisco',
    name: 'Cisco',
    category: 'enterprise',
    src: '/images/companies/cisco.svg',
    heightClass: 'h-[23px] sm:h-[25px] md:h-[27px]',
  },
  {
    id: 'qualcomm',
    name: 'Qualcomm',
    category: 'enterprise',
    src: '/images/companies/qualcomm.svg',
    heightClass: 'h-[19px] sm:h-[21px] md:h-[22px]',
  },
  {
    id: 'capgemini',
    name: 'Capgemini',
    category: 'enterprise',
    src: '/images/companies/capgemini.svg',
    heightClass: 'h-[21px] sm:h-[23px] md:h-[24px]',
  },
  {
    id: 'cognizant',
    name: 'Cognizant',
    category: 'enterprise',
    src: '/images/companies/cognizant.svg',
    heightClass: 'h-[20px] sm:h-[22px] md:h-[23px]',
  },
  {
    id: 'adp',
    name: 'ADP',
    category: 'enterprise',
    src: '/images/companies/adp.svg',
    heightClass: 'h-[21px] sm:h-[23px] md:h-[24px]',
  },
  {
    id: 'sap',
    name: 'SAP',
    category: 'enterprise',
    src: '/images/companies/sap.svg',
    heightClass: 'h-[21px] sm:h-[23px] md:h-[24px]',
  },
];

// =========================================================================
// VERIFIED CAREER STATISTICS (STRICTLY PRESERVED VALUES AS REQUIRED)
// =========================================================================
export interface CareerMetric {
  id: string;
  value: number;
  suffix: string;
  categoryLabel: string;
  description: string;
}

export const CAREER_METRICS: CareerMetric[] = [
  {
    id: 'hands-on-hours',
    value: 500,
    suffix: '+',
    categoryLabel: 'APPLIED CURRICULUM',
    description: 'Hours of hands-on learning in our courses.',
  },
  {
    id: 'competitions-placed',
    value: 350,
    suffix: '+',
    categoryLabel: 'CAREER OUTCOMES',
    description: 'Students passed our competitions and got a job.',
  },
  {
    id: 'completion-rate',
    value: 95,
    suffix: '%',
    categoryLabel: 'BATCH COMPLETION',
    description: 'Course completion and successful students from every batch.',
  },
];
