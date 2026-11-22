import { DetailedCourse } from './types';

export const powerBiCourse: DetailedCourse = {
  slug: 'power-bi-with-ai',
  title: 'Power BI with AI',
  rating: '4.8',
  level: 'Advanced',
  duration: '6 Weeks',
  featureBadges: [
    'Expert-led Training',
    'Hands-on Practical Labs',
    'Career Transformation & Guidance',
    '24/7 Support'
  ],
  accent: 'emerald',
  iconType: 'power-bi',
  overviewParagraphs: [
    'Build executive business intelligence dashboards, advanced DAX measures, automated enterprise dataflows, and AI-powered visual analytics.',
    'Power BI is Microsoft leading BI platform used by enterprises globally. This program provides end-to-end expertise in ETL with Power Query, complex DAX modeling, and cloud dashboard deployment.'
  ],
  highlightsTitle: 'The training covers:',
  highlights: [
    'Data Modeling with Star & Snowflake Schemas in Power BI',
    'Advanced DAX Calculations (CALCULATE, Time Intelligence, Iterators, Variables)',
    'Smart AI Visuals (Key Influencers, Decomposition Trees, Q&A NLP)',
    'Power BI Service Deployment, Scheduled Gateways & Row-Level Security (RLS)',
    'Interactive Mobile Layouts, Bookmarks & Drill-Through Actions',
    'Real-World Enterprise Capstone Dashboards'
  ],
  targetAudience: [
    'Students & Fresh Graduates',
    'Business Analysts & Data Analysts',
    'MIS Executives & Reporting Leads',
    'Project Managers & Finance Professionals',
    'Career Switchers'
  ],
  prerequisitesNote: 'Basic familiarity with spreadsheets. No prior programming background required.',
  methodologyPoints: [
    'Instructor-Led Live Training',
    'Practical Assignments',
    'Real-Time Case Studies',
    'Hands-on Tool Practice',
    'Weekly Assessments',
    'Mock Interviews'
  ],
  certificateText: 'Students will receive: Course Completion Certificate accredited by YSM Infotech (ISO 9001:2015 Certified).',
  careerOpportunitiesTitle: 'Career Opportunities After Course',
  careerRoles: [
    'Power BI Developer',
    'Business Intelligence Analyst',
    'BI Consultant',
    'Data Visualization Specialist',
    'Reporting Analyst'
  ],
  tools: [
    { name: 'Power BI Desktop', category: 'BI Authoring' },
    { name: 'Power BI Service', category: 'Cloud Deployment' },
    { name: 'Power Query', category: 'Data Transformation' },
    { name: 'DAX Studio', category: 'DAX Performance' }
  ],
  modules: [
    {
      number: '01',
      title: 'Module 1: Power BI Interface & Data Modeling',
      topics: [
        {
          title: 'Architecture & Modeling',
          items: [
            'Power BI Desktop overview & connecting multi-source databases',
            'Star and Snowflake schema architecture',
            'Relationships: 1-to-many, many-to-many & cross-filter direction',
            'Power Query transformations, merge & append pipelines'
          ]
        }
      ],
      outcome: 'Architect enterprise-grade relational star schemas.'
    },
    {
      number: '02',
      title: 'Module 2: Advanced DAX (Data Analysis Expressions)',
      topics: [
        {
          title: 'Calculated Logic',
          items: [
            'Calculated columns vs explicit DAX measures',
            'CALCULATE, FILTER, ALL, ALLEXCEPT, and evaluation contexts',
            'Time Intelligence: YTD, QTD, MTD, SAMEPERIODLASTYEAR, PARALLELPERIOD',
            'Iterators: SUMX, AVERAGEX, RANKX and DAX variables (VAR/RETURN)'
          ]
        }
      ],
      outcome: 'Write sophisticated business metrics and variance calculations.'
    },
    {
      number: '03',
      title: 'Module 3: Report UX, AI Visuals & Storytelling',
      topics: [
        {
          title: 'Visual Analytics',
          items: [
            'Executive KPI cards, matrix tables, waterfall & gauge charts',
            'Bookmarks, selection pane & customized tabbed navigations',
            'Smart narrative AI, Key Influencers, and Decomposition Tree visuals',
            'Mobile report layout optimization & accessibility standards'
          ]
        }
      ],
      outcome: 'Design intuitive, high-impact visual storytelling dashboards.'
    },
    {
      number: '04',
      title: 'Module 4: Power BI Service, Governance & Deployment',
      topics: [
        {
          title: 'Enterprise Deployment',
          items: [
            'Publishing to Power BI Service Workspaces & App creation',
            'On-premises data gateway configuration & automated refresh schedules',
            'Row-Level Security (RLS) implementation for organizational access control',
            'Exporting reports, subscriptions & embedding in Teams'
          ]
        }
      ],
      outcome: 'Deploy secure, governed enterprise dashboards to global corporate users.'
    }
  ],
  projects: [
    {
      title: 'Executive Healthcare Operational Dashboard',
      description: 'End-to-end hospital operational capacity, patient wait time, and clinical outcome monitoring dashboard in Power BI.',
      category: 'Healthcare Analytics'
    },
    {
      title: 'Global Retail Sales & Inventory BI Platform',
      description: 'Multi-store retail performance platform featuring dynamic currency switching, inventory velocity, and predictive DAX measures.',
      category: 'Retail BI'
    }
  ],
  inquiryMessage: 'Hi YSM Infotech, I would like to inquire about the Power BI with AI program.',
  whatsappUrl: 'https://wa.me/917997791456?text=Hi%20YSM%20Infotech%2C%20I%20would%20like%20to%20inquire%20about%20the%20Power%20BI%20with%20AI%20program.'
};

