import { ALL_DETAILED_COURSES } from '@/data/courses';
import { ELEARNING_DATA } from '@/data/elearning-page';
import { hashPassword } from '../auth/crypto';
import {
  LMSDatabase,
  User,
  CourseCategory,
  Course,
  CourseSection,
  Lesson,
  Enrollment,
  CourseProgress,
  LessonProgress,
  Quiz,
  Assignment,
  Coupon,
  Review,
  Announcement,
  AuditLog,
} from './schema';
import { COURSE_YOUTUBE_DEFAULTS } from '../video/youtube';

export function createInitialSeed(): LMSDatabase {
  const now = new Date().toISOString();

  // 1. Initial Core Users
  const adminPwd = hashPassword('Admin@YSM2025');
  const adminUser: User = {
    id: 'usr_admin_001',
    email: 'admin@ysminfotech.com',
    passwordHash: adminPwd.hash,
    salt: adminPwd.salt,
    name: 'YSM Master Administrator',
    phone: '+91 79977 91456',
    role: 'admin',
    isActive: true,
    createdAt: now,
    updatedAt: now,
  };

  const instructorPwd = hashPassword('Instructor@YSM2025');
  const instructorUser: User = {
    id: 'usr_inst_001',
    email: 'instructor@ysminfotech.com',
    passwordHash: instructorPwd.hash,
    salt: instructorPwd.salt,
    name: 'Dr. Rajesh Varma',
    phone: '+91 79977 91456',
    role: 'instructor',
    isActive: true,
    createdAt: now,
    updatedAt: now,
  };

  const studentPwd = hashPassword('Student@YSM2025');
  const studentUser: User = {
    id: 'usr_stud_001',
    email: 'student@ysminfotech.com',
    passwordHash: studentPwd.hash,
    salt: studentPwd.salt,
    name: 'Priyanka Sharma',
    phone: '+91 98765 43210',
    role: 'student',
    isActive: true,
    createdAt: now,
    updatedAt: now,
  };

  // 2. Initial Categories
  const categories: CourseCategory[] = [
    {
      id: 'cat_da',
      slug: 'data-analytics',
      name: 'Data Analytics',
      description: 'Business intelligence dashboards, automated data pipelines, dynamic SQL queries, and visual reporting.',
      displayOrder: 1,
    },
    {
      id: 'cat_ai',
      slug: 'artificial-intelligence',
      name: 'Artificial Intelligence',
      description: 'Applied machine learning, neural architectures, LLM systems, autonomous agentic networks, and predictive modeling.',
      displayOrder: 2,
    },
    {
      id: 'cat_prog',
      slug: 'programming',
      name: 'Programming',
      description: 'High-performance Python engineering, relational database querying, algorithmic design, and backend APIs.',
      displayOrder: 3,
    },
    {
      id: 'cat_cloud',
      slug: 'cloud-devops',
      name: 'Cloud & DevOps',
      description: 'Automated CI/CD delivery, container orchestration, Kubernetes, and cloud infrastructure on Microsoft Azure.',
      displayOrder: 4,
    },
    {
      id: 'cat_bs',
      slug: 'business-strategy',
      name: 'Business & Strategy',
      description: 'AI-augmented requirements engineering, agile business workflows, stakeholder analytics, and process modeling.',
      displayOrder: 5,
    },
    {
      id: 'cat_ds',
      slug: 'data-science',
      name: 'Data Science',
      description: 'End-to-end data science lifecycle, exploratory analytics, statistical inference, and generative AI augmentation.',
      displayOrder: 6,
    },
  ];

  // Pricing matrix by course slug
  const PRICING_MAP: Record<string, { price: number; discountPrice: number }> = {
    'advanced-excel-with-ai': { price: 9999, discountPrice: 3499 },
    'sql': { price: 8999, discountPrice: 2999 },
    'power-bi-with-ai': { price: 12999, discountPrice: 4499 },
    'tableau': { price: 11999, discountPrice: 3999 },
    'data-analytics-gen-ai': { price: 18999, discountPrice: 6499 },
    'python-for-ai': { price: 14999, discountPrice: 4999 },
    'ai-ml': { price: 21999, discountPrice: 7999 },
    'data-science-with-gen-ai': { price: 24999, discountPrice: 8499 },
    'ai-engineer': { price: 29999, discountPrice: 9999 },
    'gen-ai-agentic-ai': { price: 27999, discountPrice: 9499 },
    'azure-devops': { price: 16999, discountPrice: 5999 },
    'business-analyst-ai': { price: 15999, discountPrice: 5499 },
    'microsoft-fabric': { price: 19999, discountPrice: 6999 },
  };

  const courses: Course[] = [];
  const sections: CourseSection[] = [];
  const lessons: Lesson[] = [];

  // Seed 12 detailed courses
  ALL_DETAILED_COURSES.forEach((courseData, courseIndex) => {
    const pricing = PRICING_MAP[courseData.slug] || { price: 15999, discountPrice: 5499 };
    const courseId = `crs_${courseData.slug.replace(/[^a-z0-9]/g, '_')}`;

    let categoryId = 'cat_ai';
    let catSlug = 'artificial-intelligence';
    let catName = 'Artificial Intelligence';

    if (courseData.accent === 'emerald') {
      categoryId = 'cat_da';
      catSlug = 'data-analytics';
      catName = 'Data Analytics';
    } else if (courseData.accent === 'blue') {
      categoryId = 'cat_prog';
      catSlug = 'programming';
      catName = 'Programming';
    } else if (courseData.accent === 'cyan') {
      categoryId = 'cat_cloud';
      catSlug = 'cloud-devops';
      catName = 'Cloud & DevOps';
    } else if (courseData.accent === 'amber') {
      categoryId = 'cat_bs';
      catSlug = 'business-strategy';
      catName = 'Business & Strategy';
    }

    const courseRecord: Course = {
      id: courseId,
      slug: courseData.slug,
      title: courseData.title,
      subtitle: courseData.featureBadges?.join(' • ') || 'ISO 9001:2015 Accredited IT Training',
      description: courseData.overviewParagraphs[0] || `${courseData.title} practical industry training program at YSM Infotech.`,
      overviewParagraphs: courseData.overviewParagraphs || [],
      categoryId,
      categorySlug: catSlug,
      categoryName: catName,
      deliveryType: [
        'ai-ml',
        'data-science-with-gen-ai',
        'ai-engineer',
        'gen-ai-agentic-ai',
        'azure-devops',
        'business-analyst-ai',
        'sql',
      ].includes(courseData.slug)
        ? 'LIVE_INSTRUCTOR_LED'
        : 'RECORDED_SELF_PACED',
      duration: courseData.duration,
      skillLevel: (courseData.level as Course['skillLevel']) || 'All Levels',
      trainingMode: 'Instructor-Led Live & Practical Labs',
      price: pricing.price,
      discountPrice: pricing.discountPrice,
      thumbnailUrl:
        {
          'advanced-excel-with-ai': '/logos/tools/excel.svg',
          sql: '/logos/tools/postgresql.svg',
          'power-bi-with-ai': '/logos/tools/powerbi.svg',
          tableau: '/logos/tools/tableau.svg',
          'data-analytics-gen-ai': '/logos/tools/pandas.svg',
          'ai-ml': '/logos/tools/scikit-learn.svg',
          'python-for-ai': '/logos/tools/python.svg',
          'data-science-with-gen-ai': '/logos/tools/jupyter.svg',
          'ai-engineer': '/logos/tools/openai.svg',
          'data-engineer-ai': '/logos/tools/openai.svg',
          'gen-ai-agentic-ai': '/logos/tools/langchain.svg',
          'azure-devops': '/logos/tools/azure-devops.svg',
          'business-analyst-ai': '/logos/tools/jira.svg',
        }[courseData.slug] || '/logos/tools/python.svg',
      bannerUrl: `/images/hero/Modern Open-Plan Office with City Views.png`,
      promoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      rating: parseFloat(courseData.rating) || 4.8,
      reviewsCount: 38 + courseIndex * 7,
      studentsCount: 240 + courseIndex * 35,
      isPublished: true,
      isFeatured: courseIndex < 4,
      instructorId: instructorUser.id,
      instructorName: instructorUser.name,
      instructorTitle: 'Principal Technical Architect & Corporate Mentor',
      prerequisites: courseData.prerequisitesNote
        ? [courseData.prerequisitesNote]
        : ['Basic computer literacy', 'Passion to build high-demand tech skills'],
      learningOutcomes: courseData.highlights || [],
      toolsCovered: courseData.tools?.map((t) => t.name) || [],
      featureBadges: courseData.featureBadges || ['Expert-led Training', 'Practical Labs', 'ISO 9001:2015', '24/7 Support'],
      certificateEligible: true,
      displayOrder: courseIndex + 1,
      createdAt: now,
      updatedAt: now,
    };

    courses.push(courseRecord);

    // Seed sections & lessons from modules
    const defaultYtId = COURSE_YOUTUBE_DEFAULTS[courseData.slug] || 'kqtD5dpn9C8';

    courseData.modules.forEach((mod, modIdx) => {
      const sectionId = `sec_${courseId}_m${modIdx + 1}`;
      sections.push({
        id: sectionId,
        courseId,
        title: `Module ${mod.number}: ${mod.title}`,
        description: `Comprehensive module covering ${mod.topics.length} key core focus areas.`,
        displayOrder: modIdx + 1,
        isPublished: true,
        createdAt: now,
      });

      // Seed lessons for this section
      mod.topics.forEach((topic, topicIdx) => {
        const lessonId = `les_${sectionId}_t${topicIdx + 1}`;
        const isFirstInCourse = modIdx === 0 && topicIdx === 0;
        const isPreviewLesson = isFirstInCourse || (modIdx === 0 && topicIdx === 1);

        lessons.push({
          id: lessonId,
          sectionId,
          courseId,
          title: topic.title || `Topic ${topicIdx + 1}: ${courseData.title} Fundamentals`,
          description: topic.items ? topic.items.join(', ') : `Detailed practical lecture and coding demonstration for ${topic.title}.`,
          durationSeconds: 900 + (topicIdx % 4) * 300, // 15 to 30 mins
          lessonType: 'video',
          videoProvider: 'youtube',
          videoId: defaultYtId,
          videoUrl: `https://www.youtube.com/watch?v=${defaultYtId}`,
          contentText: `### Lesson Overview\n\nWelcome to this session on **${topic.title || courseData.title}**.\n\nKey takeaways from this lesson:\n${
            topic.items
              ? topic.items.map((i) => `- ${i}`).join('\n')
              : `- Industry best practices in ${courseData.title}\n- Practical architectural concepts\n- Hands-on implementation guidance`
          }\n\nReview the lecture video above and execute the practice notebook in your development workspace.`,
          isFreePreview: isPreviewLesson,
          isPreview: isPreviewLesson,
          isRequired: true,
          position: topicIdx + 1,
          displayOrder: topicIdx + 1,
          isPublished: true,
          createdAt: now,
          updatedAt: now,
        });
      });
    });
  });

  // Seed Track 13: Microsoft Fabric & Cloud Data from elearning-page.ts
  const fabricCourseData = ELEARNING_DATA.programsSection.programs.find((p) => p.id === 'prog-13');
  if (fabricCourseData) {
    const fabricId = 'crs_microsoft_fabric';
    courses.push({
      id: fabricId,
      slug: 'microsoft-fabric',
      title: fabricCourseData.title,
      subtitle: 'Modern Lakehouse, OneLake & Unified Analytics',
      description: fabricCourseData.description,
      overviewParagraphs: [
        fabricCourseData.description,
        'This program delivers comprehensive hands-on training in Microsoft Fabric, Synapse Data Engineering, Real-Time Analytics, and Data Activator.',
      ],
      categoryId: 'cat_cloud',
      categorySlug: 'cloud-devops',
      categoryName: 'Cloud & DevOps',
      deliveryType: 'LIVE_INSTRUCTOR_LED',
      duration: fabricCourseData.duration,
      skillLevel: 'Medium',
      trainingMode: 'Live Online Training + Hands-On Labs',
      price: 19999,
      discountPrice: 6999,
      thumbnailUrl: '/images/courses/python-workspace.png',
      bannerUrl: '/images/hero/Modern Open-Plan Office with City Views.png',
      promoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      rating: 4.9,
      reviewsCount: 42,
      studentsCount: 185,
      isPublished: true,
      isFeatured: false,
      instructorId: instructorUser.id,
      instructorName: instructorUser.name,
      instructorTitle: 'Principal Cloud & Data Architect',
      prerequisites: ['Basic SQL understanding', 'Familiarity with cloud concepts'],
      learningOutcomes: [
        'Master OneLake unified storage architecture',
        'Build Delta Lake pipelines with Synapse Data Engineering',
        'Configure Data Factory pipelines in Microsoft Fabric',
        'Implement enterprise security and governance',
      ],
      toolsCovered: ['Microsoft Fabric', 'Synapse', 'Data Factory', 'OneLake', 'Power BI'],
      featureBadges: ['Enterprise Lakehouse', 'Live Labs', 'ISO 9001:2015 Accredited'],
      certificateEligible: true,
      displayOrder: 13,
      createdAt: now,
      updatedAt: now,
    });

    // Add sections for Microsoft Fabric
    const sec1 = `sec_${fabricId}_m1`;
    sections.push({
      id: sec1,
      courseId: fabricId,
      title: 'Module 1: Microsoft Fabric Architecture & OneLake',
      displayOrder: 1,
      isPublished: true,
      createdAt: now,
    });
    lessons.push({
      id: `les_${sec1}_1`,
      sectionId: sec1,
      courseId: fabricId,
      title: 'Introduction to Microsoft Fabric & OneLake Paradigm',
      description: 'Understanding unified SaaS analytics, shortcuts, and lakehouse storage.',
      durationSeconds: 1200,
      lessonType: 'video',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      contentText: 'Unified analytics on Microsoft Fabric.',
      isPreview: true,
      displayOrder: 1,
      isPublished: true,
      createdAt: now,
    });
  }

  // 3. Seed Sample Active Enrollment for studentUser in Python for AI
  const pythonCourse = courses.find((c) => c.slug === 'python-for-ai') || courses[0];
  const pythonLessons = lessons.filter((l) => l.courseId === pythonCourse.id);
  const sampleEnrollmentId = 'enr_sample_001';

  const enrollments: Enrollment[] = [
    {
      id: sampleEnrollmentId,
      studentId: studentUser.id,
      courseId: pythonCourse.id,
      source: 'purchase',
      status: 'active',
      enrolledAt: new Date(Date.now() - 7 * 86400000).toISOString(),
      completionPercentage: 35,
      lastAccessedAt: now,
    },
  ];

  // Seed sample lesson progress: mark first 2 lessons as completed
  const lessonProgress: LessonProgress[] = [];
  if (pythonLessons.length > 0) {
    lessonProgress.push({
      id: 'lp_001',
      enrollmentId: sampleEnrollmentId,
      studentId: studentUser.id,
      courseId: pythonCourse.id,
      lessonId: pythonLessons[0].id,
      isCompleted: true,
      videoProgressSeconds: 900,
      completedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
      lastWatchedAt: now,
    });
  }
  if (pythonLessons.length > 1) {
    lessonProgress.push({
      id: 'lp_002',
      enrollmentId: sampleEnrollmentId,
      studentId: studentUser.id,
      courseId: pythonCourse.id,
      lessonId: pythonLessons[1].id,
      isCompleted: true,
      videoProgressSeconds: 1200,
      completedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      lastWatchedAt: now,
    });
  }

  const courseProgress: CourseProgress[] = [
    {
      id: 'cp_001',
      enrollmentId: sampleEnrollmentId,
      studentId: studentUser.id,
      courseId: pythonCourse.id,
      completedLessonsCount: lessonProgress.length,
      totalLessonsCount: pythonLessons.length,
      progressPercentage: Math.round((lessonProgress.length / Math.max(pythonLessons.length, 1)) * 100),
      lastLessonId: pythonLessons[1]?.id || pythonLessons[0]?.id,
      isCompleted: false,
      updatedAt: now,
    },
  ];

  // 4. Seed Sample Quiz for Python for AI
  const quizzes: Quiz[] = [
    {
      id: 'quiz_python_01',
      lessonId: pythonLessons[0]?.id || 'les_python_01',
      courseId: pythonCourse.id,
      title: 'Python for AI Fundamentals Knowledge Check',
      passPercentage: 70,
      timeLimitMinutes: 15,
      questions: [
        {
          id: 'q_001',
          quizId: 'quiz_python_01',
          prompt: 'Which data structure in Python is immutable by default?',
          type: 'mcq',
          options: ['List', 'Dictionary', 'Tuple', 'Set'],
          correctAnswers: [2],
          explanation: 'Tuples in Python cannot be modified once instantiated, ensuring immutability.',
          points: 10,
        },
        {
          id: 'q_002',
          quizId: 'quiz_python_01',
          prompt: 'Which libraries are fundamental to machine learning data manipulation and mathematical computation in Python?',
          type: 'multiple',
          options: ['NumPy', 'Pandas', 'Flask', 'CSS3'],
          correctAnswers: [0, 1],
          explanation: 'NumPy and Pandas are the foundational numerical computation and DataFrame libraries.',
          points: 10,
        },
        {
          id: 'q_003',
          quizId: 'quiz_python_01',
          prompt: 'Python supports multi-paradigm programming including Object-Oriented and Functional paradigms.',
          type: 'true_false',
          options: ['True', 'False'],
          correctAnswers: [0],
          explanation: 'Python fully supports both OOP (classes/objects) and functional constructs (lambdas, map, filter).',
          points: 10,
        },
      ],
    },
  ];

  // 5. Seed Sample Assignment
  const assignments: Assignment[] = [
    {
      id: 'asg_python_01',
      lessonId: pythonLessons[1]?.id || 'les_python_02',
      courseId: pythonCourse.id,
      title: 'Capstone: Customer Retention & Churn Prediction Model',
      instructions:
        'Download the provided customer dataset. Implement an exploratory data analysis workflow in Jupyter Notebook, impute missing values, engineer interaction features, and evaluate classification metrics.',
      maxPoints: 100,
      deadlineDays: 14,
    },
  ];

  // 6. Seed Coupons
  const coupons: Coupon[] = [
    {
      id: 'cpn_ysm20',
      code: 'YSM20',
      discountType: 'percentage',
      discountValue: 20,
      minOrderValue: 2000,
      maxDiscount: 2000,
      usageLimit: 500,
      timesUsed: 42,
      isActive: true,
      createdAt: now,
    },
    {
      id: 'cpn_career50',
      code: 'CAREER50',
      discountType: 'fixed',
      discountValue: 1000,
      minOrderValue: 4000,
      isActive: true,
      timesUsed: 18,
      createdAt: now,
    },
  ];

  // 7. Seed Reviews
  const reviews: Review[] = [
    {
      id: 'rev_001',
      courseId: pythonCourse.id,
      studentId: studentUser.id,
      studentName: 'Priyanka Sharma',
      rating: 5,
      comment:
        'The instructor explained complex vector math and matrix manipulations in Python so intuitively. The hands-on labs and mentoring made a huge difference.',
      isApproved: true,
      createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    },
    {
      id: 'rev_002',
      courseId: pythonCourse.id,
      studentId: 'usr_stud_ext_02',
      studentName: 'Vikas Reddy',
      rating: 5,
      comment:
        'ISO-certified structured curriculum with production-grade coding standards. Transitioned smoothly into our enterprise data science team.',
      isApproved: true,
      createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    },
  ];

  // 8. Seed Announcements
  const announcements: Announcement[] = [
    {
      id: 'ann_001',
      courseId: pythonCourse.id,
      instructorId: instructorUser.id,
      instructorName: instructorUser.name,
      title: 'Upcoming Weekend Live Q&A and Capstone Code Review',
      content:
        'Join us this Saturday at 11:00 AM IST for an interactive code review session covering NumPy vectorization and Pandas query optimization.',
      createdAt: now,
    },
  ];

  // 9. Initial Audit Log
  const auditLogs: AuditLog[] = [
    {
      id: 'aud_001',
      userId: adminUser.id,
      userEmail: adminUser.email,
      action: 'SYSTEM_INITIALIZATION',
      entityType: 'PLATFORM',
      entityId: 'ROOT',
      details: {
        message: 'YSM Infotech LMS & Course Commerce Engine initialized successfully.',
        coursesCount: courses.length,
        categoriesCount: categories.length,
      },
      createdAt: now,
    },
  ];

  return {
    users: [adminUser, instructorUser, studentUser],
    studentProfiles: [
      {
        id: 'prof_stud_001',
        userId: studentUser.id,
        headline: 'Aspiring AI & Machine Learning Engineer',
        bio: 'Technology graduate specializing in high-performance Python, cloud analytics, and predictive modeling.',
        completedCoursesCount: 0,
        certificatesCount: 0,
        updatedAt: now,
      },
    ],
    instructorProfiles: [
      {
        id: 'prof_inst_001',
        userId: instructorUser.id,
        title: 'Principal Technical Architect & Lead Instructor',
        bio: '15+ years in Enterprise AI, Data Platforms, and Cloud Solution Architecture across global enterprises.',
        expertise: ['Python for AI', 'Machine Learning', 'Data Analytics', 'Azure DevOps'],
        assignedCourseIds: courses.map((c) => c.id),
        updatedAt: now,
      },
    ],
    categories,
    courses,
    liveBatches: [
      {
        id: 'bat_sql_morning',
        courseId: 'crs_sql',
        courseTitle: 'SQL Masterclass',
        batchCode: 'BAT-SQL-2026-M1',
        title: 'Morning Executive Cohort A',
        startDate: '2026-12-01',
        endDate: '2026-12-30',
        scheduleDescription: 'Mon - Fri • 07:00 AM - 08:30 AM IST',
        timeZone: 'Asia/Kolkata (IST)',
        meetingPlatform: 'google_meet',
        meetingLink: 'https://meet.google.com/ysm-sql-live',
        meetingId: 'ysm-sql-live',
        instructorId: instructorUser.id,
        instructorName: instructorUser.name,
        maxCapacity: 30,
        enrolledCount: 18,
        status: 'upcoming',
        isPublished: true,
        notes: 'Google Meet virtual classroom with hands-on PostgreSQL live terminal labs.',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'bat_sql_weekend',
        courseId: 'crs_sql',
        courseTitle: 'SQL Masterclass',
        batchCode: 'BAT-SQL-2026-W1',
        title: 'Weekend Professional Cohort B',
        startDate: '2026-12-06',
        endDate: '2027-01-10',
        scheduleDescription: 'Sat & Sun • 10:00 AM - 01:00 PM IST',
        timeZone: 'Asia/Kolkata (IST)',
        meetingPlatform: 'zoom',
        meetingLink: 'https://zoom.us/j/9876543210',
        meetingId: '987 654 3210',
        meetingPasscode: 'YSM2026',
        instructorId: instructorUser.id,
        instructorName: instructorUser.name,
        maxCapacity: 25,
        enrolledCount: 14,
        status: 'upcoming',
        isPublished: true,
        notes: 'Intensive weekend query optimization & transaction architecture lab.',
        createdAt: now,
        updatedAt: now,
      },
    ],
    batchEnrollments: [],
    attendanceRecords: [],
    sections,
    lessons,
    resources: [
      {
        id: 'res_001',
        lessonId: lessons[0]?.id || 'les_001',
        courseId: pythonCourse.id,
        title: 'Python for AI Starter Lab Notebook (.ipynb)',
        fileUrl: '/downloads/resources/python_starter_lab.ipynb',
        fileType: 'ipynb',
        fileSizeMb: 1.4,
      },
      {
        id: 'res_002',
        lessonId: lessons[0]?.id || 'les_001',
        courseId: pythonCourse.id,
        title: 'Python AI Quick-Reference Cheat Sheet (PDF)',
        fileUrl: '/downloads/resources/python_ai_cheatsheet.pdf',
        fileType: 'pdf',
        fileSizeMb: 2.1,
      },
    ],
    enrollments,
    lessonProgress,
    courseProgress,
    orders: [
      {
        id: 'ord_sample_001',
        orderNumber: 'YSM-ORD-2025-1001',
        studentId: studentUser.id,
        studentName: studentUser.name,
        studentEmail: studentUser.email,
        studentPhone: studentUser.phone,
        items: [
          {
            id: 'item_001',
            orderId: 'ord_sample_001',
            courseId: pythonCourse.id,
            courseTitle: pythonCourse.title,
            courseSlug: pythonCourse.slug,
            price: pythonCourse.price,
            discountPrice: pythonCourse.discountPrice,
          },
        ],
        subtotalAmount: pythonCourse.price,
        discountAmount: pythonCourse.price - pythonCourse.discountPrice,
        totalAmount: pythonCourse.discountPrice,
        status: 'completed',
        paymentMethod: 'razorpay',
        paymentId: 'pay_sample_test_001',
        createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
      },
    ],
    payments: [
      {
        id: 'pay_sample_test_001',
        orderId: 'ord_sample_001',
        studentId: studentUser.id,
        amount: pythonCourse.discountPrice,
        currency: 'INR',
        provider: 'razorpay',
        razorpayOrderId: 'order_test_987654',
        razorpayPaymentId: 'pay_test_987654',
        status: 'captured',
        createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
      },
    ],
    refunds: [],
    coupons,
    couponRedemptions: [],
    quizzes,
    quizAttempts: [],
    assignments,
    assignmentSubmissions: [],
    reviews,
    certificates: [],
    notifications: [
      {
        id: 'notif_001',
        userId: studentUser.id,
        title: 'Welcome to Python for AI!',
        message: 'Your enrollment has been verified. You now have full access to all 12 modules, labs, and mentoring.',
        type: 'enrollment',
        isRead: false,
        link: `/learning/courses/${pythonCourse.id}`,
        createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
      },
    ],
    announcements,
    auditLogs,
  };
}
