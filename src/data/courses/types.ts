export interface ModuleTopic {
  title: string;
  items: string[];
  outcome?: string;
}

export interface CourseCurriculumModule {
  number: string; // "01", "02", etc.
  title: string;
  duration?: string;
  topics: ModuleTopic[];
  outcome?: string;
}

export interface CourseProject {
  title: string;
  description: string;
  category?: string;
  tags?: string[];
}

export interface CourseTool {
  name: string;
  category: string;
  icon?: string;
}

export interface CourseFAQ {
  question: string;
  answer: string;
}

export type CourseTechIconType =
  | 'excel'
  | 'sql'
  | 'power-bi'
  | 'tableau'
  | 'data-analytics'
  | 'python'
  | 'ai-ml'
  | 'data-science'
  | 'ai-engineer'
  | 'agentic-ai'
  | 'azure-devops'
  | 'business-analyst';

export interface DetailedCourse {
  slug: string;
  aliases?: string[];
  title: string;
  
  // Authentic Website Meta
  rating: string; // e.g. "4.5" or "4.7"
  level: string; // e.g. "Advanced" or "Medium"
  duration: string; // e.g. "25 Weeks", "20 Weeks", "60 Days", "12 Weeks"
  featureBadges: string[]; // ["Expert-led Training", "Hands-on Practical Labs", "Career Transformation & Guidance", "24/7 Support"]
  
  // Visual Theme Tokens
  accent: 'emerald' | 'violet' | 'blue' | 'cyan' | 'amber' | 'teal';
  iconType: CourseTechIconType;

  // Authentic Course Descriptions
  overviewParagraphs: string[];
  
  // Authentic "The training covers:" / "Program Highlights:"
  highlightsTitle?: string;
  highlights: string[];

  // Authentic "Who Can Join This Course?"
  targetAudience: string[];
  prerequisitesNote?: string;

  // Authentic Training Methodology
  methodologyPoints: string[];

  // Authentic Course Completion Certificate
  certificateText: string;

  // Authentic Career Opportunities / Job Roles
  careerOpportunitiesTitle?: string;
  careerRoles: string[];
  careersNarrative?: string;

  // Tools & Technologies
  tools: CourseTool[];

  // Authentic Modules & Topics from Source Accordion
  modules: CourseCurriculumModule[];

  // Applied Case Studies & Practical Labs
  projects: CourseProject[];

  // Optional FAQs if present on source
  faqs?: CourseFAQ[];

  // Enrollment configuration
  inquiryMessage: string;
  whatsappUrl: string;
}
