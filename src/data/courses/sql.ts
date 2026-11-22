import { DetailedCourse } from './types';

export const sqlCourse: DetailedCourse = {
  slug: 'sql',
  title: 'SQL',
  rating: '4.8',
  level: 'Advanced',
  duration: '4 Weeks',
  featureBadges: [
    'Expert-led Training',
    'Hands-on Practical Labs',
    'Career Transformation & Guidance',
    '24/7 Support'
  ],
  accent: 'blue',
  iconType: 'sql',
  overviewParagraphs: [
    'Write production-grade relational database queries, complex multi-table joins, subqueries, indexing, window functions, and database schema optimizations.',
    'SQL is the universal language of enterprise data. This program is designed to take learners from core database design principles to advanced query tuning required in top software and data teams.'
  ],
  highlightsTitle: 'The training covers:',
  highlights: [
    'Relational Database Architecture, DDL, DML & Schema Normalization',
    'Advanced Multi-table JOINS, Subqueries & Common Table Expressions (CTEs)',
    'Analytical Window Functions (ROW_NUMBER, RANK, DENSE_RANK, NTILE, LAG/LEAD)',
    'Database Performance Indexing, Execution Plans & Query Tuning',
    'Stored Procedures, Triggers, Views & Transaction Management',
    'Real-Time Business Case Studies with PostgreSQL & MySQL'
  ],
  targetAudience: [
    'Students & Fresh Graduates',
    'Software Developers & Backend Engineers',
    'Data Analysts & BI Professionals',
    'QA Engineers & Database Administrators',
    'Career Switchers'
  ],
  prerequisitesNote: 'No prior coding experience required. We start from relational database fundamentals.',
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
    'Database Developer',
    'SQL Developer',
    'Data Analyst',
    'Data Engineer',
    'Backend Engineer'
  ],
  tools: [
    { name: 'MySQL', category: 'RDBMS' },
    { name: 'PostgreSQL', category: 'Enterprise Database' },
    { name: 'DBeaver / Workbench', category: 'GUI Client' },
    { name: 'SQL Query Profiler', category: 'Query Optimization' }
  ],
  modules: [
    {
      number: '01',
      title: 'Module 1: Relational Database Architecture & DDL',
      topics: [
        {
          title: 'Database Foundations',
          items: [
            'Introduction to RDBMS concepts & ACID properties',
            'Tables, rows, columns, data types, primary & foreign keys',
            'DDL Commands: CREATE, ALTER, DROP, TRUNCATE database objects',
            'Database schema normalization (1NF, 2NF, 3NF)'
          ]
        }
      ],
      outcome: 'Design robust, normalized relational schemas from business specifications.'
    },
    {
      number: '02',
      title: 'Module 2: DML Commands & Query Operations',
      topics: [
        {
          title: 'Data Manipulation',
          items: [
            'DML Commands: INSERT, UPDATE, DELETE & MERGE',
            'Filtering records: WHERE clause, AND, OR, NOT, BETWEEN, IN, LIKE',
            'Sorting & pagination: ORDER BY, LIMIT, OFFSET',
            'Aggregate functions: COUNT, SUM, AVG, MIN, MAX with GROUP BY & HAVING'
          ]
        }
      ],
      outcome: 'Extract and summarize business records across massive transactional tables.'
    },
    {
      number: '03',
      title: 'Module 3: Advanced Joins, Subqueries & CTEs',
      topics: [
        {
          title: 'Multi-Table Relationships',
          items: [
            'INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN & CROSS JOIN',
            'Self joins & non-equi joins in business hierarchies',
            'Scalar, correlated & nested subqueries',
            'Common Table Expressions (CTEs) & recursive queries'
          ]
        }
      ],
      outcome: 'Solve complex multi-entity reporting challenges with readable CTEs.'
    },
    {
      number: '04',
      title: 'Module 4: Window Functions, Indexing & Performance Tuning',
      topics: [
        {
          title: 'Analytical SQL & Optimization',
          items: [
            'Ranking functions: ROW_NUMBER, RANK, DENSE_RANK',
            'Value window functions: LAG, LEAD, FIRST_VALUE, LAST_VALUE',
            'B-Tree and Hash Indexing strategies',
            'Reading EXPLAIN query execution plans & query optimization'
          ]
        }
      ],
      outcome: 'Optimize slow queries to execute efficiently on enterprise production databases.'
    }
  ],
  projects: [
    {
      title: 'E-Commerce Database Architecture & Analytics',
      description: 'Design a complete relational database for an e-commerce platform and build high-performance reporting queries.',
      category: 'Database Architecture'
    },
    {
      title: 'Banking Transaction Monitoring & Fraud Query Suite',
      description: 'Write window function pipelines to detect anomalous transactional velocity across millions of banking records.',
      category: 'FinTech Analytics'
    }
  ],
  inquiryMessage: 'Hi YSM Infotech, I would like to inquire about the SQL program.',
  whatsappUrl: 'https://wa.me/917997791456?text=Hi%20YSM%20Infotech%2C%20I%20would%20like%20to%20inquire%20about%20the%20SQL%20program.'
};

