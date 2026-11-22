import { DetailedCourse } from './types';

export const tableauCourse: DetailedCourse = {
  slug: 'tableau',
  title: 'Tableau',
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
  iconType: 'tableau',
  overviewParagraphs: [
    'Design high-impact visual storytelling dashboards, Level of Detail (LOD) expressions, spatial geographic maps, and collaborative Tableau Server workflows.',
    'Tableau is recognized as an industry benchmark in enterprise analytics. This course covers everything from visual perception best practices to advanced calculated fields and server governance.'
  ],
  highlightsTitle: 'The training covers:',
  highlights: [
    'Visual Data Architecture & Dashboard UX Best Practices',
    'Advanced Calculated Fields & Level of Detail (LOD) Expressions (FIXED, INCLUDE, EXCLUDE)',
    'Geospatial Mapping, Dual-Axis Visualizations & Interactive Dynamic Parameters',
    'Tableau Cloud & Server Publishing, Permissions & Automated Refreshes',
    'Executive KPI Dashboards, Stories & Action Filters',
    'Real-World Enterprise Capstone Projects'
  ],
  targetAudience: [
    'Students & Fresh Graduates',
    'Data Analysts & BI Developers',
    'Marketing & Product Managers',
    'Consultants & Strategists',
    'Career Switchers'
  ],
  prerequisitesNote: 'No prior coding experience required. Basic understanding of spreadsheets and data concepts is helpful.',
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
    'Tableau Developer',
    'Visual Data Strategist',
    'BI Analyst',
    'Data Analytics Consultant',
    'Reporting Specialist'
  ],
  tools: [
    { name: 'Tableau Desktop', category: 'Visualization' },
    { name: 'Tableau Cloud / Server', category: 'Publishing' },
    { name: 'Tableau Prep Builder', category: 'Data Preparation' }
  ],
  modules: [
    {
      number: '01',
      title: 'Module 1: Tableau Foundations & Visual Analytics',
      topics: [
        {
          title: 'Interface & Architecture',
          items: [
            'Tableau Desktop workspace, shelves, marks cards & data pane',
            'Connecting to files, relational databases & cloud warehouses',
            'Live vs Extract connections & performance considerations',
            'Dimensions vs Measures, Discrete vs Continuous fields'
          ]
        }
      ],
      outcome: 'Connect, inspect, and visualize diverse business datasets.'
    },
    {
      number: '02',
      title: 'Module 2: Calculations & Level of Detail (LOD) Expressions',
      topics: [
        {
          title: 'Analytical Formulas',
          items: [
            'Basic calculations: Number, String, Date & Logical functions',
            'Table calculations: Running total, Percent of total, Moving average',
            'Level of Detail (LOD) expressions: FIXED, INCLUDE & EXCLUDE',
            'Dynamic parameters & user-driven dashboard inputs'
          ]
        }
      ],
      outcome: 'Solve multi-level granularity analysis challenges with LOD expressions.'
    },
    {
      number: '03',
      title: 'Module 3: Advanced Charts, Mapping & Interactive Actions',
      topics: [
        {
          title: 'Interactive Visuals',
          items: [
            'Dual-axis charts, combined axis, bullet graphs & sparklines',
            'Geographic maps, filled maps & custom territory polygons',
            'Dashboard action filters, highlight actions & URL parameters',
            'Visual storytelling with Tableau Story points'
          ]
        }
      ],
      outcome: 'Construct engaging, interactive dashboards with seamless filter actions.'
    },
    {
      number: '04',
      title: 'Module 4: Tableau Server, Cloud Governance & Publishing',
      topics: [
        {
          title: 'Enterprise Delivery',
          items: [
            'Publishing workbooks and data sources to Tableau Server/Cloud',
            'Setting up project permissions, user roles & row-level security',
            'Scheduling automated extract refreshes & email subscriptions',
            'Performance recording & workbook optimization best practices'
          ]
        }
      ],
      outcome: 'Publish and administer secure enterprise dashboards on cloud.'
    }
  ],
  projects: [
    {
      title: 'Global Supply Chain & Logistics Control Tower',
      description: 'Geospatial shipment tracking and transit bottleneck analysis dashboard in Tableau Desktop.',
      category: 'Logistics Analytics'
    },
    {
      title: 'SaaS Customer Retention & Churn Analytics Portal',
      description: 'Cohort retention analysis dashboard with custom LOD expressions and interactive parameter controls.',
      category: 'SaaS Analytics'
    }
  ],
  inquiryMessage: 'Hi YSM Infotech, I would like to inquire about the Tableau program.',
  whatsappUrl: 'https://wa.me/917997791456?text=Hi%20YSM%20Infotech%2C%20I%20would%20like%20to%20inquire%20about%20the%20Tableau%20program.'
};

