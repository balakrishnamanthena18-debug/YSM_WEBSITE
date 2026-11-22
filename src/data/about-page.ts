export interface LearningPillar {
  number: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface StudentTestimonial {
  id: string;
  author: string;
  course: string;
  quote: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const ABOUT_PAGE_DATA = {
  hero: {
    eyebrow: 'WHO WE ARE // ISO CERTIFIED ORGANIZATION',
    headline: 'Empowering Learners with Industry-Leading Tech Skills',
    description:
      'YSM Infotech is a leading provider of professional IT training and certification courses. We are proud to be an ISO certified organization, demonstrating our commitment to upholding standards of quality, efficiency, and student satisfaction. Our ISO certification validates our dedication to delivering excellence in all aspects of our courses and assistance. With a focus on delivering high-quality training and practical skills.',
  },

  introduction: {
    eyebrow: 'WHO WE ARE',
    title: 'Dedication to Excellence in Technology Education',
    paragraphs: [
      'YSM Infotech is a leading provider of professional IT training and certification courses. We are proud to be an ISO certified organization, demonstrating our commitment to upholding standards of quality, efficiency, and student satisfaction.',
      'Our ISO certification validates our dedication to delivering excellence in all aspects of our courses and assistance. With a focus on delivering high-quality training and practical skills.',
    ],
    accreditationTag: 'ISO Certified Organization',
  },

  visionMission: {
    vision: {
      number: '01',
      title: 'Our Vision',
      label: 'STRATEGIC VISION',
      statement:
        'At YSM Infotech, our vision is to be the leading provider of professional IT training and certification courses worldwide. We aim to inspire and empower our students to become experts in their field, enabling them to drive innovation and change in the global technology landscape. We strive to provide high-quality education that is accessible to all, regardless of background or location, and to create a community of lifelong learners who are committed to excellence and continuous improvement.',
    },
    mission: {
      number: '02',
      title: 'Our Mission',
      label: 'ORGANIZATIONAL MISSION',
      statement:
        "Our mission at YSM Infotech is to provide the best possible IT training and certification courses to our students. We are dedicated to helping individuals advance their careers by offering comprehensive, practical, and up-to-date courses that cover the latest trends and technologies in the industry. We are committed to providing excellent customer service, expert instructors, and a supportive learning environment to ensure our students' success.",
    },
  },

  pillarsSectionTitle: 'Our courses include',
  pillars: [
    {
      number: '01',
      title: 'Instructors',
      subtitle: 'Experienced Faculty',
      description:
        'Our courses are taught by experienced and certified instructors with a passion for teaching and a deep understanding of the subject matter.',
    },
    {
      number: '02',
      title: 'Hands on Experience',
      subtitle: 'Real-World Projects',
      description:
        'We provide real-world projects and practical exercises to help you develop the skills you need to succeed in your career.',
    },
    {
      number: '03',
      title: 'Career Guidance',
      subtitle: 'Job Readiness',
      description:
        'Our courses are designed to prepare you for success in your chosen field, with resources and support to help you find and secure the job of your dreams.',
    },
    {
      number: '04',
      title: 'Theoretical Knowledge',
      subtitle: 'Comprehensive Learning',
      description:
        'Gain comprehensive knowledge of the latest technologies and industry trends to stay ahead of the curve and succeed in your career.',
    },
  ] as LearningPillar[],

  metrics: {
    title: 'Numbers and facts that define performance',
    items: [
      {
        value: 500,
        suffix: '+',
        label: 'Hours of hands-on learning in our courses',
      },
      {
        value: 350,
        suffix: '+',
        label: 'Students Passed Our Competitions and Got a Job',
      },
      {
        value: 95,
        suffix: '%',
        label: 'Course Completion and succesful students from every batch',
      },
    ],
  },

  testimonialsSectionTitle: 'Testimonials',
  testimonialsSectionSubtitle: 'What our Students say',
  testimonials: [
    {
      id: 'ishita-malhotra',
      author: 'Ishita Malhotra',
      course: 'Python Programming',
      quote:
        'I took the Python course at YSM Infotech and it was an amazing experience. The instructors were very knowledgeable and the course was well-structured. I learned a lot and was able to apply my new skills in my job immediately.',
    },
    {
      id: 'pradeep',
      author: 'Pradeep',
      course: 'DevOps & Cloud Engineering',
      quote:
        'The DevOps course was excellent. The instructor was very patient and provided lots of real-world examples to help me understand the concepts. The course materials were comprehensive and I was able to reference them even after completing the course.',
    },
    {
      id: 'anusha',
      author: 'Anusha',
      course: 'Power BI & Analytics',
      quote:
        'I highly recommend the PowerBI course at YSM Infotech. The course was well-paced and covered all the important topics. The instructors were very helpful and always available to answer my questions. I learned a lot and was able to improve my data analysis skills significantly',
    },
    {
      id: 'vikram',
      author: 'Vikram',
      course: 'SAP FICO Specialization',
      quote:
        'I had a great experience taking the SAPFico course at YSM Infotech. The instructors were very experienced and provided a lot of practical knowledge. The course materials were very helpful and I was able to gain a deep understanding of the subject. I would definitely recommend this course to anyone looking to enhance their skills in SAPFico.',
    },
  ] as StudentTestimonial[],

  faqSectionTitle: 'Popular Questions to Ask Before Choosing a Course',
  faqs: [
    {
      id: 'faq-1',
      question: 'What skills will I gain from this course?',
      answer:
        'You will gain practical skills and knowledge in the specific subject area of the course. Our courses are designed to provide hands-on experience and develop relevant skills that can be applied in real-world scenarios.',
    },
    {
      id: 'faq-2',
      question: 'Who are the instructors for the course?',
      answer:
        'Our instructors are experienced and certified experts in their respective fields. They have years of experience and are passionate about teaching and sharing their knowledge with students. You can be assured that you are learning from the best in the industry.',
    },
    {
      id: 'faq-3',
      question: 'Is there any prerequisite for this course?',
      answer:
        'Our courses have varying levels of prerequisites depending on the subject matter and difficulty level. You can find more information about course prerequisites on the individual course pages or by contacting our support team.',
    },
    {
      id: 'faq-4',
      question: 'What is the course fee?',
      answer:
        'Our course fees also vary depending on the specific course and any additional options or resources you may choose to include. You can find more details about course fees on the individual course pages or by contacting our support team.',
    },
    {
      id: 'faq-5',
      question: 'What is the duration of the course?',
      answer:
        'Our course durations vary depending on the specific course, but we generally offer flexible scheduling options to accommodate different student needs. You can find more details about course durations on the individual course pages or by contacting our support team.',
    },
    {
      id: 'faq-6',
      question: 'Where can I go for help?',
      answer:
        'If you need help during the course, you can always reach out to our support team. They are available 24/7 to assist you with any questions or concerns you may have. Additionally, we offer chat through many ways but the best way would be ping on our whatsapp number.',
    },
  ] as FAQItem[],

  closing: {
    eyebrow: 'CAREER ADVANCEMENT',
    headline: 'Empowering Learners with Industry-Leading Tech Skills',
    description:
      'Empowering learners with industry-leading tech skills. As an ISO-certified organization, we are committed to delivering high-quality, hands-on training with real time projects . Join us and take the next step in your tech career!',
    ctaPrimary: {
      label: 'Explore Our Courses',
      href: '/#programs',
    },
    ctaWhatsApp: {
      label: 'Connect on WhatsApp',
      href: 'https://wa.me/917997791456?text=Hi%20YSM%20Infotech%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20training%20programs.',
    },
  },
};
