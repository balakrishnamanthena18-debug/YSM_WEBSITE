export interface WhyChooseUsBenefit {
  id: string;
  number: string;
  title: string;
  icon:
    | 'online-training'
    | 'industry-experts'
    | 'practice-manual'
    | 'real-time-projects'
    | 'one-to-one'
    | 'resume-building'
    | 'mock-interview'
    | 'placement-guidance';
  shortTag: string;
}

export interface FloatingCalloutBadge {
  id: string;
  title: string;
  subtitle: string;
  badgeType: 'iso' | 'career' | 'commitment';
}

export const ABOUT_US_CONTENT = {
  eyebrow: 'ABOUT US',
  headingPrefix: 'Who ',
  headingSuffix: 'We Are',
  description:
    'At YSM Infotech, we are passionate about empowering learners with the knowledge and skills they need to succeed in today’s fast-paced tech industry. We are proud to be an ISO certified organization, demonstrating our commitment to upholding standards of quality, efficiency, and student satisfaction. Our ISO certification validates our dedication to delivering excellence in all aspects of our courses and assistance.',
  cta: {
    label: 'Know More',
    href: 'https://wa.me/917997791456?text=Hi%20YSM%20Infotech%2C%20I%20would%20like%20to%20know%20more%20about%20your%20programs%2C%20ISO%20certification%2C%20and%20admissions.',
  },
  secondaryHeading: 'Why Choose Us',
  benefits: [
    {
      id: 'online-training',
      number: '01',
      title: '100% Online Training',
      icon: 'online-training',
      shortTag: 'Live Interactive',
    },
    {
      id: 'industry-experts',
      number: '02',
      title: 'Trained by Industry Experts',
      icon: 'industry-experts',
      shortTag: 'Senior Practitioners',
    },
    {
      id: 'practice-manual',
      number: '03',
      title: 'Material and Practice manual',
      icon: 'practice-manual',
      shortTag: 'Hands-On Labs',
    },
    {
      id: 'real-time-projects',
      number: '04',
      title: 'Real Time Projects',
      icon: 'real-time-projects',
      shortTag: 'Enterprise Scope',
    },
    {
      id: 'one-to-one',
      number: '05',
      title: 'One to One Connect',
      icon: 'one-to-one',
      shortTag: 'Direct Mentorship',
    },
    {
      id: 'resume-building',
      number: '06',
      title: 'Resume Building',
      icon: 'resume-building',
      shortTag: 'ATS-Optimized',
    },
    {
      id: 'mock-interview',
      number: '07',
      title: 'Mock Interview',
      icon: 'mock-interview',
      shortTag: 'Technical & HR',
    },
    {
      id: 'placement-guidance',
      number: '08',
      title: 'Placement Guidance',
      icon: 'placement-guidance',
      shortTag: 'Career Support',
    },
  ] as WhyChooseUsBenefit[],
  callouts: [
    {
      id: 'iso-certified',
      title: 'ISO Certified Organization',
      subtitle: 'ISO 9001:2015 Accredited Quality',
      badgeType: 'iso',
    },
    {
      id: 'empowering-careers',
      title: 'Empowering Tech Careers',
      subtitle: 'Real-Time Industry Projects',
      badgeType: 'career',
    },
    {
      id: 'growth-commitment',
      title: 'Your Growth, Our Commitment',
      subtitle: 'Dedicated 1-on-1 Mentorship',
      badgeType: 'commitment',
    },
  ] as FloatingCalloutBadge[],
};

