export type ExpectAccent = 'teal' | 'blue' | 'amber' | 'violet';

export interface ExpectFeature {
  number: string;
  title: string;
  description: string;
  accent: ExpectAccent;
  iconType: 'knowledge' | 'instructors' | 'skills' | 'interactive';
}

export interface ExpectCallout {
  id: string;
  title: string;
  subtitle: string;
  iconType: 'practical' | 'learn-today' | 'career';
}

export const WHAT_TO_EXPECT_CONTENT = {
  eyebrow: 'OUR APPROACH',
  headingPrefix: 'What to Expect ',
  headingHighlight: 'from us',
  supportingText:
    'A learning experience designed to give you practical knowledge, real-world skills, and the confidence to grow in your career.',
  features: [
    {
      number: '01',
      title: 'Knowledge',
      description:
        'Gain comprehensive knowledge of the latest technologies and industry trends to stay ahead of the curve and succeed in your career.',
      accent: 'teal',
      iconType: 'knowledge',
    },
    {
      number: '02',
      title: 'Expert Instructors',
      description:
        'Learn from industry experts with years of experience in their respective fields, providing you with insights and knowledge that you can’t find anywhere else.',
      accent: 'blue',
      iconType: 'instructors',
    },
    {
      number: '03',
      title: 'Practical Skills',
      description:
        'Learn real-world, practical skills that you can immediately apply in your job or project, and stand out as a valuable asset in your organization.',
      accent: 'amber',
      iconType: 'skills',
    },
    {
      number: '04',
      title: 'Interactive Learning',
      description:
        'Engage in hands-on learning with our interactive courses and gain practical experience that can be applied immediately in the workplace.',
      accent: 'violet',
      iconType: 'interactive',
    },
  ] as ExpectFeature[],
  callouts: [
    {
      id: 'practical-learning',
      title: 'Practical Learning',
      subtitle: 'Hands-On Applied Labs',
      iconType: 'practical',
    },
    {
      id: 'learn-today',
      title: 'Learn Today',
      subtitle: 'Industry-Standard Tech',
      iconType: 'learn-today',
    },
    {
      id: 'brighter-career',
      title: 'Build a Brighter Career',
      subtitle: 'Confidence to Grow',
      iconType: 'career',
    },
  ] as ExpectCallout[],
};

