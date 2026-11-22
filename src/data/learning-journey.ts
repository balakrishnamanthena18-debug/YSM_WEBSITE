export interface LearningStage {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  focusAreas: string[];
}

export const LEARNING_STAGES: LearningStage[] = [
  {
    id: 'learn',
    number: '01',
    title: 'Learn',
    subtitle: 'Foundational Mastery',
    description:
      'Build strong foundations with structured learning across modern technology disciplines, core algorithmic principles, and enterprise architectural patterns.',
    focusAreas: ['Core Principles', 'Structured Curriculum', 'Live Mentorship'],
  },
  {
    id: 'build',
    number: '02',
    title: 'Build',
    subtitle: 'Applied Engineering',
    description:
      'Turn concepts into practical projects using the tools, frameworks, and continuous delivery workflows used in modern high-performance technology environments.',
    focusAreas: ['Industry Toolchains', 'Production Workflows', 'Hands-on Labs'],
  },
  {
    id: 'prove',
    number: '03',
    title: 'Prove',
    subtitle: 'Demonstrable Output',
    description:
      'Create meaningful, deployable project work and code repositories that demonstrate how you apply your skills to solve real-world problems.',
    focusAreas: ['Portfolio Artifacts', 'Code Reviews', 'System Architecture'],
  },
  {
    id: 'grow',
    number: '04',
    title: 'Grow',
    subtitle: 'Career Evolution',
    description:
      'Develop the confidence, technical communication, and career readiness needed for your next professional stage in the global technology ecosystem.',
    focusAreas: ['Technical Readiness', 'Professional Communication', 'Continuous Growth'],
  },
];
