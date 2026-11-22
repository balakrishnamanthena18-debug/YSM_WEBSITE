export type ProgramCategorySlug =
  | 'all'
  | 'data-analytics'
  | 'artificial-intelligence'
  | 'programming'
  | 'cloud-devops'
  | 'business-strategy';

export type CategoryAccent =
  | 'emerald' // Data Analytics
  | 'violet'  // Artificial Intelligence
  | 'blue'    // Programming
  | 'cyan'    // Cloud & DevOps
  | 'amber'   // Business & Strategy
  | 'teal';   // General / All

export interface ProgramCategory {
  id: ProgramCategorySlug;
  label: string;
  accent: CategoryAccent;
  description: string;
}

export interface ProgramCourse {
  id: string;
  number: string; // "01", "02", ... "12"
  title: string;
  slug: string;
  category: string;
  categorySlug: ProgramCategorySlug;
  categories: ProgramCategorySlug[];
  description: string;
  tags: [string, string, string];
  accent: CategoryAccent;
  iconType:
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
  curriculum: string[];
  careerRoles: string[];
  inquiryMessage: string;
  href: string;
}

// Backwards-compatibility interface
export interface Program {
  id: string;
  slug: string;
  category: string;
  categoryLabel: string;
  title: string;
  description: string;
  tags: string[];
  format?: string;
  featured?: boolean;
  href: string;
  visualPath?: string;
}

export const PROGRAM_CATEGORIES: ProgramCategory[] = [
  {
    id: 'all',
    label: 'All Programs',
    accent: 'emerald',
    description: 'Comprehensive enterprise curriculum spanning Data, AI, Development, and Cloud infrastructure.',
  },
  {
    id: 'data-analytics',
    label: 'Data Analytics',
    accent: 'emerald',
    description: 'Business intelligence dashboards, automated data pipelines, dynamic SQL queries, and visual reporting.',
  },
  {
    id: 'artificial-intelligence',
    label: 'Artificial Intelligence',
    accent: 'violet',
    description: 'Applied machine learning, neural architectures, LLM systems, autonomous agentic networks, and predictive modeling.',
  },
  {
    id: 'programming',
    label: 'Programming',
    accent: 'blue',
    description: 'High-performance Python engineering, relational database querying, algorithmic design, and backend APIs.',
  },
  {
    id: 'cloud-devops',
    label: 'Cloud & DevOps',
    accent: 'cyan',
    description: 'Automated CI/CD delivery, container orchestration, Kubernetes, and cloud infrastructure on Microsoft Azure.',
  },
  {
    id: 'business-strategy',
    label: 'Business & Strategy',
    accent: 'amber',
    description: 'AI-augmented requirements engineering, agile business workflows, stakeholder analytics, and process modeling.',
  },
];

export const ALL_12_COURSES: ProgramCourse[] = [
  {
    id: 'advanced-excel-ai',
    number: '01',
    title: 'Advanced Excel with AI',
    slug: 'advanced-excel-with-ai',
    category: 'Data Analytics',
    categorySlug: 'data-analytics',
    categories: ['data-analytics', 'business-strategy'],
    description:
      'Master advanced lookup formulas, dynamic array models, Power Query ETL, automated VBA workflows, and integrate AI Copilot for predictive forecasting.',
    tags: ['Excel Copilot', 'Power Query', 'Data Modeling'],
    accent: 'emerald',
    iconType: 'excel',
    curriculum: [
      'Advanced Formulas & Dynamic Array Functions (XLOOKUP, LAMBDA)',
      'Automated ETL Pipelines with Microsoft Power Query',
      'Interactive Scenario Modeling, Goal Seek & Pivot Dashboards',
      'AI Copilot Integration for Formula Generation & Trend Predictions',
    ],
    careerRoles: ['Financial Analyst', 'MIS Reporting Specialist', 'Operations Manager'],
    inquiryMessage: 'Hi YSM Infotech, I would like to inquire about the Advanced Excel with AI course curriculum and upcoming batch timings.',
    href: 'https://wa.me/917997791456?text=Hi%20YSM%20Infotech%2C%20I%20would%20like%20to%20inquire%20about%20the%20Advanced%20Excel%20with%20AI%20course.',
  },
  {
    id: 'sql',
    number: '02',
    title: 'SQL',
    slug: 'sql',
    category: 'Programming',
    categorySlug: 'programming',
    categories: ['programming', 'data-analytics'],
    description:
      'Write production-grade relational database queries, complex multi-table joins, subqueries, indexing, window functions, and database schema optimizations.',
    tags: ['PostgreSQL & MySQL', 'Query Optimization', 'Window Functions'],
    accent: 'blue',
    iconType: 'sql',
    curriculum: [
      'Relational Database Architecture, DDL, DML & Schema Normalization',
      'Advanced Multi-table JOINS, Subqueries & Common Table Expressions (CTEs)',
      'Analytical Window Functions (ROW_NUMBER, RANK, DENSE_RANK, NTILE)',
      'Database Performance Indexing, Execution Plans & Query Tuning',
    ],
    careerRoles: ['Database Developer', 'Data Engineer', 'Backend SQL Specialist'],
    inquiryMessage: 'Hi YSM Infotech, I would like to inquire about the SQL course curriculum and upcoming batch timings.',
    href: 'https://wa.me/917997791456?text=Hi%20YSM%20Infotech%2C%20I%20would%20like%20to%20inquire%20about%20the%20SQL%20course.',
  },
  {
    id: 'power-bi-ai',
    number: '03',
    title: 'Power BI with AI',
    slug: 'power-bi-with-ai',
    category: 'Data Analytics',
    categorySlug: 'data-analytics',
    categories: ['data-analytics', 'business-strategy'],
    description:
      'Build executive business intelligence dashboards, advanced DAX measures, automated enterprise dataflows, and AI-powered visual analytics.',
    tags: ['DAX & Measures', 'Executive Dashboards', 'AI Visuals'],
    accent: 'emerald',
    iconType: 'power-bi',
    curriculum: [
      'Data Modeling with Star & Snowflake Schemas in Power BI',
      'Advanced DAX Calculations (CALCULATE, Time Intelligence, Iterators)',
      'Smart AI Visuals (Key Influencers, Decomposition Trees, Q&A NLP)',
      'Power BI Service Deployment, Scheduled Gateways & Row-Level Security',
    ],
    careerRoles: ['Power BI Developer', 'BI Consultant', 'Data Storyteller'],
    inquiryMessage: 'Hi YSM Infotech, I would like to inquire about the Power BI with AI course curriculum and upcoming batch timings.',
    href: 'https://wa.me/917997791456?text=Hi%20YSM%20Infotech%2C%20I%20would%20like%20to%20inquire%20about%20the%20Power%20BI%20with%20AI%20course.',
  },
  {
    id: 'tableau',
    number: '04',
    title: 'Tableau',
    slug: 'tableau',
    category: 'Data Analytics',
    categorySlug: 'data-analytics',
    categories: ['data-analytics', 'business-strategy'],
    description:
      'Design high-impact visual storytelling dashboards, Level of Detail (LOD) expressions, spatial geographic maps, and collaborative Tableau Server workflows.',
    tags: ['Visual Analytics', 'LOD Expressions', 'Tableau Server'],
    accent: 'emerald',
    iconType: 'tableau',
    curriculum: [
      'Visual Data Architecture & Dashboard UX Best Practices',
      'Advanced Calculated Fields & Level of Detail (LOD) Expressions',
      'Geospatial Mapping, Dual-Axis Visualizations & Interactive Filters',
      'Tableau Cloud & Server Publishing, Permissions & Automated Refreshes',
    ],
    careerRoles: ['Tableau Developer', 'Visual Data Strategist', 'Analytics Lead'],
    inquiryMessage: 'Hi YSM Infotech, I would like to inquire about the Tableau course curriculum and upcoming batch timings.',
    href: 'https://wa.me/917997791456?text=Hi%20YSM%20Infotech%2C%20I%20would%20like%20to%20inquire%20about%20the%20Tableau%20course.',
  },
  {
    id: 'data-analytics-gen-ai',
    number: '05',
    title: 'Data Analytics with Gen AI',
    slug: 'data-analytics-gen-ai',
    category: 'Data Analytics',
    categorySlug: 'data-analytics',
    categories: ['data-analytics', 'artificial-intelligence'],
    description:
      'Master the full analytical lifecycle from data extraction and statistical validation to generative AI assistants that accelerate insights and automated reporting.',
    tags: ['BI Dashboards', 'Automated EDA', 'Gen AI Insights'],
    accent: 'emerald',
    iconType: 'data-analytics',
    curriculum: [
      'End-to-End Analytics Pipeline: Ingestion, Hygiene & Transformation',
      'Exploratory Data Analysis (EDA) Powered by Generative AI Tools',
      'Cross-Platform Dashboarding: Power BI, SQL & Python Analytics',
      'Executive Storytelling & Automated Business Recommendation Reports',
    ],
    careerRoles: ['Data Analyst', 'Analytics Consultant', 'Insights Architect'],
    inquiryMessage: 'Hi YSM Infotech, I would like to inquire about the Data Analytics with Gen AI course curriculum and upcoming batch timings.',
    href: 'https://wa.me/917997791456?text=Hi%20YSM%20Infotech%2C%20I%20would%20like%20to%20inquire%20about%20the%20Data%20Analytics%20with%20Gen%20AI%20course.',
  },
  {
    id: 'python-for-ai',
    number: '06',
    title: 'Python for AI',
    slug: 'python-for-ai',
    category: 'Programming',
    categorySlug: 'programming',
    categories: ['programming', 'artificial-intelligence'],
    description:
      'Master object-oriented programming, NumPy vectorization, Pandas data structures, algorithmic design patterns, and asynchronous pipelines purpose-built for AI.',
    tags: ['Python 3.12', 'NumPy & Pandas', 'Vectorized Pipelines'],
    accent: 'blue',
    iconType: 'python',
    curriculum: [
      'Object-Oriented Python, Functional Patterns & Memory Optimization',
      'High-Performance NumPy Vectorization & Array Broadcast Computing',
      'Pandas Data Wrangling, Time-Series Analysis & Multi-Index Operations',
      'Asynchronous APIs, Concurrency & Data Pipeline Design for ML',
    ],
    careerRoles: ['Python AI Developer', 'Core Software Engineer', 'Machine Learning Assistant'],
    inquiryMessage: 'Hi YSM Infotech, I would like to inquire about the Python for AI course curriculum and upcoming batch timings.',
    href: 'https://wa.me/917997791456?text=Hi%20YSM%20Infotech%2C%20I%20would%20like%20to%20inquire%20about%20the%20Python%20for%20AI%20course.',
  },
  {
    id: 'ai-machine-learning',
    number: '07',
    title: 'AI & Machine Learning',
    slug: 'ai-ml',
    category: 'Artificial Intelligence',
    categorySlug: 'artificial-intelligence',
    categories: ['artificial-intelligence'],
    description:
      'Build practical foundations in predictive modeling, supervised and unsupervised learning algorithms, deep neural architectures, and enterprise model evaluation.',
    tags: ['Deep Learning', 'Scikit-Learn', 'Neural Networks'],
    accent: 'violet',
    iconType: 'ai-ml',
    curriculum: [
      'Statistical Foundations, Mathematical Optimization & Loss Functions',
      'Supervised & Unsupervised Machine Learning with Scikit-Learn',
      'Deep Neural Networks, Convolutional & Recurrent Architectures',
      'Model Validation, Hyperparameter Tuning & Bias Mitigation',
    ],
    careerRoles: ['Machine Learning Engineer', 'AI Research Practitioner', 'Data Scientist'],
    inquiryMessage: 'Hi YSM Infotech, I would like to inquire about the AI & Machine Learning course curriculum and upcoming batch timings.',
    href: 'https://wa.me/917997791456?text=Hi%20YSM%20Infotech%2C%20I%20would%20like%20to%20inquire%20about%20the%20AI%20and%20Machine%20Learning%20course.',
  },
  {
    id: 'data-science-gen-ai',
    number: '08',
    title: 'Data Science with Gen AI',
    slug: 'data-science-with-gen-ai',
    category: 'Artificial Intelligence',
    categorySlug: 'artificial-intelligence',
    categories: ['artificial-intelligence', 'data-analytics'],
    description:
      'Formulate statistical hypotheses, engineer predictive features, deploy production machine learning pipelines, and harness generative AI for complex synthesis.',
    tags: ['Statistical Modeling', 'LLM Integration', 'Predictive ML'],
    accent: 'violet',
    iconType: 'data-science',
    curriculum: [
      'Probability, Inferential Statistics & Experimental A/B Hypothesis Testing',
      'Feature Engineering, Dimensionality Reduction & Predictive Pipelines',
      'Generative AI Integration for Synthetic Data & Semantic Extraction',
      'End-to-End Production ML Project Lifecycle & Model Governance',
    ],
    careerRoles: ['Senior Data Scientist', 'Predictive Modeler', 'Applied AI Researcher'],
    inquiryMessage: 'Hi YSM Infotech, I would like to inquire about the Data Science with Gen AI course curriculum and upcoming batch timings.',
    href: 'https://wa.me/917997791456?text=Hi%20YSM%20Infotech%2C%20I%20would%20like%20to%20inquire%20about%20the%20Data%20Science%20with%20Gen%20AI%20course.',
  },
  {
    id: 'ai-engineer',
    number: '09',
    title: 'AI Engineer',
    slug: 'data-engineer-ai',
    category: 'Artificial Intelligence',
    categorySlug: 'artificial-intelligence',
    categories: ['artificial-intelligence', 'cloud-devops'],
    description:
      'Deploy scalable production AI infrastructure, high-throughput inference endpoints, vector indexing databases, model quantization, and containerized APIs.',
    tags: ['Vector Databases', 'FastAPI Serving', 'Model Quantization'],
    accent: 'violet',
    iconType: 'ai-engineer',
    curriculum: [
      'High-Throughput Model Serving with FastAPI & vLLM Architectures',
      'Vector Databases (Milvus, Qdrant, Pinecone) & Embedding Indexing',
      'Quantization, TensorRT Optimization & Low-Latency Inference',
      'Dockerized Microservices & Kubernetes Deployment for AI Workloads',
    ],
    careerRoles: ['AI Systems Engineer', 'LLMOps Architect', 'Production AI Specialist'],
    inquiryMessage: 'Hi YSM Infotech, I would like to inquire about the AI Engineer course curriculum and upcoming batch timings.',
    href: 'https://wa.me/917997791456?text=Hi%20YSM%20Infotech%2C%20I%20would%20like%20to%20inquire%20about%20the%20AI%20Engineer%20course.',
  },
  {
    id: 'gen-ai-agentic-ai',
    number: '10',
    title: 'Gen AI with Agentic AI',
    slug: 'gen-ai-agentic-ai',
    category: 'Artificial Intelligence',
    categorySlug: 'artificial-intelligence',
    categories: ['artificial-intelligence'],
    description:
      'Design autonomous multi-agent systems, goal-directed reasoning loops, Retrieval-Augmented Generation (RAG), and enterprise tool-calling LLM workflows.',
    tags: ['Autonomous Agents', 'LangChain & RAG', 'Multi-Agent Swarms'],
    accent: 'violet',
    iconType: 'agentic-ai',
    curriculum: [
      'LLM Foundations, Prompt Engineering & Structured JSON Outputs',
      'Advanced Retrieval-Augmented Generation (Hybrid Search, GraphRAG)',
      'Autonomous Multi-Agent Frameworks (LangGraph, AutoGen, CrewAI)',
      'Enterprise Tool Use, Human-in-the-Loop Safeguards & Eval Frameworks',
    ],
    careerRoles: ['GenAI Engineer', 'Agentic Systems Architect', 'AI Solutions Consultant'],
    inquiryMessage: 'Hi YSM Infotech, I would like to inquire about the Gen AI with Agentic AI course curriculum and upcoming batch timings.',
    href: 'https://wa.me/917997791456?text=Hi%20YSM%20Infotech%2C%20I%20would%20like%20to%20inquire%20about%20the%20Gen%20AI%20with%20Agentic%20AI%20course.',
  },
  {
    id: 'azure-devops',
    number: '11',
    title: 'Azure DevOps',
    slug: 'azure-devops',
    category: 'Cloud & DevOps',
    categorySlug: 'cloud-devops',
    categories: ['cloud-devops', 'programming'],
    description:
      'Build automated CI/CD release pipelines, manage container orchestration with Kubernetes, implement Infrastructure as Code with Terraform on Microsoft Azure.',
    tags: ['CI/CD Pipelines', 'Docker & Kubernetes', 'Terraform IaC'],
    accent: 'cyan',
    iconType: 'azure-devops',
    curriculum: [
      'Azure Cloud Fundamentals, IAM, Virtual Networks & Security Groups',
      'Automated Azure DevOps YAML Pipelines for Continuous Integration & CD',
      'Containerization with Docker & Cluster Management with Azure AKS',
      'Infrastructure as Code (IaC) with Terraform & GitOps Practices',
    ],
    careerRoles: ['Azure DevOps Engineer', 'Cloud Systems Architect', 'Site Reliability Engineer'],
    inquiryMessage: 'Hi YSM Infotech, I would like to inquire about the Azure DevOps course curriculum and upcoming batch timings.',
    href: 'https://wa.me/917997791456?text=Hi%20YSM%20Infotech%2C%20I%20would%20like%20to%20inquire%20about%20the%20Azure%20DevOps%20course.',
  },
  {
    id: 'business-analyst-ai',
    number: '12',
    title: 'Business Analyst with AI',
    slug: 'business-analyst-ai',
    category: 'Business & Strategy',
    categorySlug: 'business-strategy',
    categories: ['business-strategy', 'data-analytics'],
    description:
      'Bridge business requirements and modern technology. Learn AI-augmented requirement gathering, agile sprint planning, BPMN process modeling, and data storytelling.',
    tags: ['Agile & Jira', 'BPMN Workflows', 'AI Requirements'],
    accent: 'amber',
    iconType: 'business-analyst',
    curriculum: [
      'Requirements Gathering, User Stories & AI-Augmented Documentation',
      'Business Process Model and Notation (BPMN 2.0) & Workflow Mapping',
      'Agile Sprint Ceremonies, Jira Backlog Management & Acceptance Criteria',
      'Stakeholder Alignment, Financial Feasibility & Data-Driven Presentations',
    ],
    careerRoles: ['Business Analyst', 'Product Owner Assistant', 'IT Strategy Consultant'],
    inquiryMessage: 'Hi YSM Infotech, I would like to inquire about the Business Analyst with AI course curriculum and upcoming batch timings.',
    href: 'https://wa.me/917997791456?text=Hi%20YSM%20Infotech%2C%20I%20would%20like%20to%20inquire%20about%20the%20Business%20Analyst%20with%20AI%20course.',
  },
];

export function getCoursesByCategory(categoryId: ProgramCategorySlug): ProgramCourse[] {
  if (categoryId === 'all') {
    return ALL_12_COURSES;
  }
  return ALL_12_COURSES.filter((course) =>
    course.categories.includes(categoryId) || course.categorySlug === categoryId
  );
}

export function getCourseBySlug(slug: string): ProgramCourse | undefined {
  return ALL_12_COURSES.find((c) => c.slug === slug || c.id === slug);
}

// Backwards compatibility mappings for any legacy components
export const FEATURED_PROGRAM: Program = {
  id: 'ai-machine-learning',
  slug: 'ai-ml',
  category: 'ai-ml',
  categoryLabel: 'AI & MACHINE LEARNING',
  title: 'AI & Machine Learning',
  description:
    'Build practical foundations in modern AI, machine learning algorithms, deep neural architectures, and enterprise applied projects.',
  tags: ['Python', 'Machine Learning', 'Deep Learning', 'Neural Networks'],
  format: 'Live instructor-led • Practical projects',
  featured: true,
  href: 'https://wa.me/917997791456?text=Hi%20YSM%20Infotech%2C%20I%20would%20like%20to%20inquire%20about%20the%20AI%20and%20Machine%20Learning%20program.',
  visualPath: '/images/programs/ai-ml-featured.webp',
};

export const SUPPORTING_PROGRAMS: Program[] = ALL_12_COURSES.slice(0, 7).map((c) => ({
  id: c.id,
  slug: c.slug,
  category: c.categorySlug,
  categoryLabel: c.category.toUpperCase(),
  title: c.title,
  description: c.description,
  tags: [...c.tags],
  format: 'Live instructor-led • Practical projects',
  href: c.href,
}));

export const ALL_PROGRAMS: Program[] = [FEATURED_PROGRAM, ...SUPPORTING_PROGRAMS];

export function getProgramsByCategory(categoryId: string): Program[] {
  if (categoryId === 'all') {
    return ALL_PROGRAMS;
  }
  return ALL_PROGRAMS.filter((p) => p.category === categoryId);
}
