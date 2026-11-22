export interface AudienceTrack {
  id: string;
  number: string;
  label: string;
  audience: string;
  heading: string;
  description: string;
  accent: 'emerald' | 'blue' | 'violet' | 'amber';
  features: string[];
  cta: string;
  ctaHref: string;
  supportingLabel: string;
}

export const AUDIENCE_SECTION_CONTENT = {
  eyebrow: 'DESIGNED FOR EVERY STAGE OF YOUR CAREER',
  mainHeadingPrefix: 'Our Courses are ',
  mainHeadingHighlight: 'Suitable for ...',
  supportingDescription:
    'Whether you are taking your very first step in technology, transitioning into an IT role, advancing senior engineering expertise, or upskilling enterprise teams—explore structured pathways built for your trajectory.',
  tracks: [
    {
      id: 'beginners-students',
      number: '01',
      label: '01 — FOUNDATIONAL PATHWAY',
      audience: 'College Students & Fresh Graduates',
      heading: 'For Beginners Students',
      description:
        'Start your tech journey with our beginner-friendly courses and gain the skills you need to succeed.',
      accent: 'emerald',
      features: ['Zero-Prior-Code Curriculum', 'Step-by-Step Fundamentals', 'Guided Hands-on Labs'],
      cta: 'Explore Student Tracks',
      ctaHref: '#programs',
      supportingLabel: 'Beginner Friendly • Mentorship Included',
    },
    {
      id: 'beginners-it-specialists',
      number: '02',
      label: '02 — CAREER TRANSITION',
      audience: 'Aspiring Developers & IT Switchers',
      heading: 'Beginners IT Specialists',
      description:
        'Take your first step towards an IT career with our courses designed for beginners and IT enthusiasts.',
      accent: 'blue',
      features: ['Applied Software Toolchains', 'Production IDE Workflows', 'Git & CI/CD Practices'],
      cta: 'Explore Career Starter Tracks',
      ctaHref: '#programs',
      supportingLabel: 'Applied IT Toolchains • Production Labs',
    },
    {
      id: 'current-it-specialists',
      number: '03',
      label: '03 — ADVANCED UPSKILLING',
      audience: 'Practicing Engineers & Architects',
      heading: 'Current IT Specialists',
      description:
        'Advance your IT career with our expert-led courses that cover the latest technologies and industry trends.',
      accent: 'violet',
      features: ['Agentic AI & Neural Frameworks', 'Multi-Cloud Architecture', 'Real-Time Enterprise Telemetry'],
      cta: 'Explore Advanced Tracks',
      ctaHref: '#programs',
      supportingLabel: 'Senior Cloud & AI Architecture',
    },
    {
      id: 'corporate-customers',
      number: '04',
      label: '04 — ENTERPRISE SOLUTIONS',
      audience: 'Engineering Teams & Organizations',
      heading: 'Corporate Customers',
      description:
        'Equip your employees with cutting-edge technology skills and drive innovation with our corporate training solutions.',
      accent: 'amber',
      features: ['Custom Cohort Curricula', 'Live Enterprise Sandbox Labs', 'Scalable Team Skill Analytics'],
      cta: 'Inquire for Enterprise',
      ctaHref: 'https://wa.me/917997791456?text=Hi%20YSM%20Infotech%2C%20we%20are%20interested%20in%20custom%20corporate%20training%20solutions%20for%20our%20team.',
      supportingLabel: 'Custom Sandbox • Enterprise SLA',
    },
  ] as AudienceTrack[],
};
