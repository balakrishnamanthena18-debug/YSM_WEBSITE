export interface ELearningProgram {
  id: string;
  number: string;
  title: string;
  category: string;
  slug?: string;
  description: string;
  logo: string;
  logoAlt: string;
  badge: string;
  duration: string;
  level: string;
  hasCoursePage: boolean;
}

export interface ELearningFeature {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  bulletPoints: string[];
  image: string;
  imageAlt: string;
}

export interface WhyChooseReason {
  id: string;
  number: string;
  title: string;
  shortTag: string;
  description: string;
}

export const ELEARNING_DATA = {
  hero: {
    eyebrow: 'DIGITAL ACADEMY • ISO 9001:2015 ACCREDITED',
    headline: 'Empowering Your Future Through Digital Learning',
    leadParagraph:
      'YSM Infotech delivers high-impact, industry-accredited digital technology training designed for ambitious graduates and working professionals. Master high-demand skills in AI, Data Science, Cloud Engineering, and Business Analytics through flexible, self-paced on-demand online video learning.',
    secondaryParagraph:
      'As an ISO 9001:2015 certified organization, we are committed to delivering high-quality, hands-on training with real time projects. Join us and take the next step in your tech career!',
    stats: [
      { label: 'Accreditation', value: 'ISO 9001:2015' },
      { label: 'Learning Format', value: '100% Self-Paced Video' },
      { label: 'Career Support', value: '1-on-1 Mentorship' },
      { label: 'Practical Labs', value: 'Guided Labs' },
    ],
  },

  programsSection: {
    eyebrow: '02 // CURRICULUM DIRECTORY',
    heading: 'Our Training Programs',
    subheading:
      'Explore our comprehensive suite of 13 industry-aligned digital training programs spanning Artificial Intelligence, Data Engineering, Cloud Infrastructure, and Business Intelligence.',
    programs: [
      {
        id: 'python-for-ai',
        number: '01',
        title: 'Python for AI',
        category: 'Programming & AI',
        slug: 'python-for-ai',
        description:
          'Master Python programming, NumPy, Pandas, object-oriented architecture, and asynchronous data pipelines tailored for machine learning and AI development.',
        logo: '/logos/tools/python.svg',
        logoAlt: 'Python official logo',
        badge: 'Core Programming',
        duration: '60 Days',
        level: 'Intermediate',
        hasCoursePage: true,
      },
      {
        id: 'data-analytics-gen-ai',
        number: '02',
        title: 'Data Analytics with Gen AI',
        category: 'Data Analytics',
        slug: 'data-analytics-gen-ai',
        description:
          'End-to-end analytical lifecycles from automated data extraction and statistical validation to generative AI assistants that accelerate executive insights.',
        logo: '/logos/tools/pandas.svg',
        logoAlt: 'Pandas Data Analytics official logo',
        badge: 'Executive Analytics',
        duration: '60 Days',
        level: 'Beginner to Advanced',
        hasCoursePage: true,
      },
      {
        id: 'ai-ml',
        number: '03',
        title: 'AI & Machine Learning',
        category: 'Artificial Intelligence',
        slug: 'ai-ml',
        description:
          'Build strong mathematical foundations in predictive modeling, supervised and unsupervised learning algorithms, deep neural networks, and model evaluation.',
        logo: '/logos/tools/scikit-learn.svg',
        logoAlt: 'Scikit-Learn Machine Learning logo',
        badge: 'Core AI Track',
        duration: '75 Days',
        level: 'Intermediate to Advanced',
        hasCoursePage: true,
      },
      {
        id: 'data-science-gen-ai',
        number: '04',
        title: 'Data Science with Gen AI',
        category: 'Data Science',
        slug: 'data-science-with-gen-ai',
        description:
          'Formulate statistical hypotheses, engineer predictive features, deploy production machine learning pipelines, and harness generative AI for complex synthesis.',
        logo: '/logos/tools/jupyter.svg',
        logoAlt: 'Jupyter & Data Science logo',
        badge: 'Advanced Modeling',
        duration: '75 Days',
        level: 'Advanced',
        hasCoursePage: true,
      },
      {
        id: 'ai-engineer',
        number: '05',
        title: 'AI Engineer',
        category: 'AI Systems',
        slug: 'data-engineer-ai',
        description:
          'Deploy high-throughput inference endpoints, vector indexing databases, model quantization, containerized microservices, and enterprise LLMOps infrastructure.',
        logo: '/logos/tools/openai.svg',
        logoAlt: 'OpenAI AI Engineer logo',
        badge: 'Production Systems',
        duration: '75 Days',
        level: 'Advanced',
        hasCoursePage: true,
      },
      {
        id: 'gen-ai-agentic-ai',
        number: '06',
        title: 'Gen AI & Agentic AI',
        category: 'Generative AI',
        slug: 'gen-ai-agentic-ai',
        description:
          'Design autonomous multi-agent systems, goal-directed reasoning loops, Retrieval-Augmented Generation (RAG), and enterprise tool-calling LLM workflows.',
        logo: '/logos/tools/langchain.svg',
        logoAlt: 'LangChain Agentic AI logo',
        badge: 'Cutting-Edge AI',
        duration: '60 Days',
        level: 'Advanced',
        hasCoursePage: true,
      },
      {
        id: 'azure-devops',
        number: '07',
        title: 'Azure DevOps',
        category: 'Cloud & DevOps',
        slug: 'azure-devops',
        description:
          'Automated CI/CD release pipelines, Kubernetes cluster orchestration, and Infrastructure as Code with Terraform on the Microsoft Azure enterprise cloud.',
        logo: '/logos/tools/azure-devops.svg',
        logoAlt: 'Microsoft Azure DevOps logo',
        badge: 'Cloud Engineering',
        duration: '60 Days',
        level: 'Intermediate',
        hasCoursePage: true,
      },
      {
        id: 'business-analyst-ai',
        number: '08',
        title: 'Business Analyst with AI',
        category: 'Business & Strategy',
        slug: 'business-analyst-ai',
        description:
          'AI-augmented requirements engineering, agile user stories, stakeholder analytics, process mapping, and strategic executive KPI dashboards.',
        logo: '/logos/tools/jira.svg',
        logoAlt: 'Atlassian Jira Business Analyst logo',
        badge: 'Enterprise Strategy',
        duration: '45 Days',
        level: 'Beginner to Intermediate',
        hasCoursePage: true,
      },
      {
        id: 'advanced-excel-ai',
        number: '09',
        title: 'Advanced Excel with AI',
        category: 'Data Analytics',
        slug: 'advanced-excel-with-ai',
        description:
          'Master dynamic array formulas, Power Query automated ETL pipelines, VBA automation, and integrate AI Copilot for predictive forecasting models.',
        logo: '/logos/tools/excel.svg',
        logoAlt: 'Microsoft Excel official logo',
        badge: 'Productivity & Modeling',
        duration: '45 Days',
        level: 'All Levels',
        hasCoursePage: true,
      },
      {
        id: 'sql',
        number: '10',
        title: 'SQL',
        category: 'Programming & Data',
        slug: 'sql',
        description:
          'Write production relational database queries, complex multi-table joins, subqueries, analytical window functions, indexing, and schema optimizations.',
        logo: '/logos/tools/postgresql.svg',
        logoAlt: 'SQL PostgreSQL official logo',
        badge: 'Database Foundations',
        duration: '45 Days',
        level: 'All Levels',
        hasCoursePage: true,
      },
      {
        id: 'power-bi-ai',
        number: '11',
        title: 'Power BI with AI',
        category: 'Data Analytics',
        slug: 'power-bi-with-ai',
        description:
          'Build executive business intelligence dashboards, advanced DAX measures, automated enterprise dataflows, and AI-powered visual reporting.',
        logo: '/logos/tools/powerbi.svg',
        logoAlt: 'Microsoft Power BI official logo',
        badge: 'Business Intelligence',
        duration: '45 Days',
        level: 'Intermediate',
        hasCoursePage: true,
      },
      {
        id: 'tableau',
        number: '12',
        title: 'Tableau',
        category: 'Data Analytics',
        slug: 'tableau',
        description:
          'High-impact visual storytelling dashboards, Level of Detail (LOD) expressions, geospatial mapping, and collaborative Tableau Server workflows.',
        logo: '/logos/tools/tableau.svg',
        logoAlt: 'Tableau official logo',
        badge: 'Visual Analytics',
        duration: '45 Days',
        level: 'Intermediate',
        hasCoursePage: true,
      },
      {
        id: 'microsoft-fabric',
        number: '13',
        title: 'Microsoft Fabric & Cloud Data',
        category: 'Cloud & Modern Data',
        slug: undefined,
        description:
          'Unified enterprise data analytics architecture connecting OneLake, Synapse Data Engineering, real-time analytics, and Power BI enterprise reporting.',
        logo: '/logos/tools/azure.svg',
        logoAlt: 'Microsoft Azure & Fabric logo',
        badge: 'Modern Data Stack',
        duration: '60 Days',
        level: 'Advanced',
        hasCoursePage: false,
      },
    ] as ELearningProgram[],
  },

  featuresSection: {
    eyebrow: '03 // PEDAGOGICAL METHODOLOGY',
    heading: 'Our E-Learning Features',
    subheading:
      'Seven pillars of instructional excellence engineered to provide an engaging, rigorous, and flexible remote learning experience.',
    features: [
      {
        id: 'on-demand-video-curriculum',
        number: '01',
        title: 'Comprehensive On-Demand Video Curriculum',
        tagline: 'High-Definition Structured Video Modules',
        description:
          'Access a complete library of professionally recorded video lessons organized into structured, step-by-step technical modules. Learn at your own pace with unlimited replays, clear coding walkthroughs, and downloadable curriculum materials.',
        bulletPoints: [
          'High-definition on-demand video lessons across all modules',
          'Self-paced learning with pause, rewind, and bookmarking',
          'Lifetime access with 24/7 video availability',
        ],
        image: '/images/courses/learning-classroom.jpg',
        imageAlt: 'High definition on demand technology video learning environment',
      },
      {
        id: 'recorded-training-sessions',
        number: '02',
        title: 'Recorded Training Sessions',
        tagline: '24/7 On-Demand Video Archive',
        description:
          'Every live lecture is recorded in high definition and made available on your student portal within hours. Review complex topics, catch up on missed sessions, and learn at your own pace whenever it suits your schedule.',
        bulletPoints: [
          'Full-length high-definition recordings of every lecture',
          'Unlimited re-watching throughout your enrollment window',
          'Downloadable session transcripts and code assets',
        ],
        image: '/images/hero/Focused Remote Work Setup.png',
        imageAlt: 'Engineer reviewing recorded session and coding on remote workstation',
      },
      {
        id: 'learning-management-system',
        number: '03',
        title: 'Learning Management System',
        tagline: 'Centralized Digital Learning Portal',
        description:
          'A centralized, intuitive LMS provides 24/7 access to your full course curriculum, downloadable laboratory manuals, slide decks, reference documentation, and direct assignment submission pipelines.',
        bulletPoints: [
          'Single sign-on access to all enrolled tracks and modules',
          'Organized weekly reading materials and lab guidebooks',
          'Integrated progress tracking and milestone indicators',
        ],
        image: '/images/courses/python-workspace.png',
        imageAlt: 'LMS dashboard displaying coding curriculum and course materials',
      },
      {
        id: 'hands-on-practical-training',
        number: '04',
        title: 'Hands-On Practical Training',
        tagline: 'Enterprise Scope & Guided Labs',
        description:
          'Theory without practice is obsolete. More than 70% of each training program is dedicated to hands-on exercises, writing code in local IDEs, querying live databases, and building full-scale capstone projects.',
        bulletPoints: [
          'Real-world enterprise project datasets and case studies',
          'Step-by-step practice manuals for independent lab work',
          'Code review and architectural feedback from mentors',
        ],
        image: '/images/courses/ai-analytics-lab.webp',
        imageAlt: 'Data science workstation running enterprise analytics code',
      },
      {
        id: 'assignments-assessments',
        number: '05',
        title: 'Assignments & Assessments',
        tagline: 'Continuous Evaluation & Skill Benchmarking',
        description:
          'Structured module assignments, coding challenges, and comprehensive capstone assessments ensure you achieve verifiable mastery of the concepts before moving forward in your specialization.',
        bulletPoints: [
          'Weekly module assignments with rubric-based scoring',
          'Comprehensive capstone project evaluations',
          'Detailed qualitative mentor feedback on submissions',
        ],
        image: '/images/hero/Modern Open-Plan Office with City Views.png',
        imageAlt: 'Professional reviewing technical assignment specifications',
      },
      {
        id: 'expert-trainers',
        number: '06',
        title: 'Expert Trainers',
        tagline: 'Taught by Senior Industry Practitioners',
        description:
          'Learn directly from experienced practitioners who work in top multinational tech companies. Our trainers bring real-world production challenges, modern industry best practices, and enterprise workflows to every class.',
        bulletPoints: [
          'Instructors with 8+ years of production experience',
          'Subject matter experts in Cloud, Data, and AI',
          'Practical insights beyond standard textbook theory',
        ],
        image: '/images/hero/ysm-about-learning-hero.jpg',
        imageAlt: 'Senior mentor guiding learner in modern technology lab',
      },
      {
        id: 'career-oriented-learning',
        number: '07',
        title: 'Career-Oriented Learning',
        tagline: 'Placement Guidance & Professional Growth',
        description:
          'We bridge the gap from education to career advancement. Receive dedicated support including ATS-friendly resume crafting, technical and behavioral mock interviews, portfolio creation, and placement guidance.',
        bulletPoints: [
          'Tailored ATS-optimized resume formatting',
          '1-on-1 technical and HR mock interview sessions',
          'Portfolio building on GitHub, Kaggle, and LinkedIn',
        ],
        image: '/images/hero/image.png',
        imageAlt: 'Professional career mentoring and interview preparation discussion',
      },
    ] as ELearningFeature[],
  },

  whyChooseSection: {
    eyebrow: '04 // INSTITUTIONAL ADVANTAGE',
    heading: 'Why Choose YSM INFOTECH?',
    subheading:
      'Eight core commitments that set our digital education programs apart, delivering measurable skill acquisition and career advancement.',
    reasons: [
      {
        id: 'online-training',
        number: '01',
        title: '100% Online Training',
        shortTag: 'Self-Paced & Flexible',
        description:
          'Full digital online format enables you to complete comprehensive accredited curriculum from anywhere at your own pace without disrupting your current career.',
      },
      {
        id: 'industry-experts',
        number: '02',
        title: 'Trained by Industry Experts',
        shortTag: 'Senior Practitioners',
        description:
          'Faculty members are active industry leaders and engineers bringing real-time enterprise scenarios and modern architecture into every session.',
      },
      {
        id: 'practice-manual',
        number: '03',
        title: 'Material and Practice manual',
        shortTag: 'Step-by-Step Labs',
        description:
          'Comprehensive course material, curated exercise datasets, and detailed step-by-step laboratory manuals provided for every module.',
      },
      {
        id: 'real-time-projects',
        number: '04',
        title: 'Real Time Projects',
        shortTag: 'Enterprise Scale',
        description:
          'Gain practical competence by working on authentic, production-grade industry capstone projects that demonstrate your capability to employers.',
      },
      {
        id: 'one-to-one',
        number: '05',
        title: 'One to One Connect',
        shortTag: 'Personalized Mentorship',
        description:
          'Dedicated personalized doubt-clearing sessions and 1-on-1 mentor guidance tailored to your individual learning pace and technical background.',
      },
      {
        id: 'resume-building',
        number: '06',
        title: 'Resume Building',
        shortTag: 'ATS-Optimized',
        description:
          'Professional resume refinement to highlight in-demand technical competencies, project architectures, and ISO 9001:2015 certifications.',
      },
      {
        id: 'mock-interview',
        number: '07',
        title: 'Mock Interview',
        shortTag: 'Technical & HR Readiness',
        description:
          'Rigorous simulated technical interviews, live coding assessments, and behavioral feedback designed to build interview confidence.',
      },
      {
        id: 'placement-guidance',
        number: '08',
        title: 'Placement Guidance',
        shortTag: 'Career Advancement',
        description:
          'Active placement assistance, company referral support, and guidance on navigating technology job markets and recruitment portals.',
      },
    ] as WhyChooseReason[],
  },

  missionVisionSection: {
    eyebrow: '05 // INSTITUTIONAL PHILOSOPHY',
    heading: 'Our Mission & Vision',
    subheading:
      'The foundational principles and global aspirations that guide YSM INFOTECH as an ISO 9001:2015 accredited technology education leader.',
    mission: {
      number: '01',
      title: 'Our Mission',
      label: 'ORGANIZATIONAL MISSION',
      statement:
        "Our mission at YSM Infotech is to provide the best possible IT training and certification courses to our students. We are dedicated to helping individuals advance their careers by offering comprehensive, practical, and up-to-date courses that cover the latest trends and technologies in the industry. We are committed to providing excellent customer service, expert instructors, and a supportive learning environment to ensure our students' success.",
      pillars: [
        'Career-first practical technology curriculum',
        'Certified, highly experienced faculty',
        'Supportive and accessible digital learning environment',
      ],
    },
    vision: {
      number: '02',
      title: 'Our Vision',
      label: 'STRATEGIC VISION',
      statement:
        'At YSM Infotech, our vision is to be the leading provider of professional IT training and certification courses worldwide. We aim to inspire and empower our students to become experts in their field, enabling them to drive innovation and change in the global technology landscape. We strive to provide high-quality education that is accessible to all, regardless of background or location, and to create a community of lifelong learners who are committed to excellence and continuous improvement.',
      pillars: [
        'Global leadership in technical skill development',
        'Democratizing access to high-impact tech education',
        'Fostering a lifelong community of technology innovators',
      ],
    },
  },

  finalCtaSection: {
    eyebrow: '06 // START TODAY',
    headline: 'Start Your Learning Journey Today!',
    supportingParagraph:
      'Empowering learners with industry-leading tech skills. As an ISO-certified organization, we are committed to delivering high-quality, hands-on training with real time projects . Join us and take the next step in your tech career!',
    closingBrandStatement:
      'Join ambitious professionals and graduates accelerating their careers with YSM INFOTECH. Speak with an admissions mentor today to identify the right program and cohort timing for your goals.',
    whatsappUrl:
      'https://wa.me/917997791456?text=Hi%20YSM%20Infotech%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20E-Learning%20programs%20and%20upcoming%20batch%20schedules.',
  },
};
