import { DetailedCourse } from './types';
import { advancedExcelCourse } from './advanced-excel-with-ai';
import { sqlCourse } from './sql';
import { powerBiCourse } from './power-bi-with-ai';
import { tableauCourse } from './tableau';
import { dataAnalyticsCourse } from './data-analytics-gen-ai';
import { aiMachineLearningCourse } from './ai-ml';
import { pythonForAiCourse } from './python-for-ai';
import { dataScienceCourse } from './data-science-with-gen-ai';
import { aiEngineerCourse } from './ai-engineer';
import { genAiAgenticCourse } from './gen-ai-agentic-ai';
import { azureDevopsCourse } from './azure-devops';
import { businessAnalystCourse } from './business-analyst-ai';

export * from './types';
export {
  advancedExcelCourse,
  sqlCourse,
  powerBiCourse,
  tableauCourse,
  dataAnalyticsCourse,
  aiMachineLearningCourse,
  pythonForAiCourse,
  dataScienceCourse,
  aiEngineerCourse,
  genAiAgenticCourse,
  azureDevopsCourse,
  businessAnalystCourse,
};

export const ALL_DETAILED_COURSES: DetailedCourse[] = [
  advancedExcelCourse,
  sqlCourse,
  powerBiCourse,
  tableauCourse,
  dataAnalyticsCourse,
  aiMachineLearningCourse,
  pythonForAiCourse,
  dataScienceCourse,
  aiEngineerCourse,
  genAiAgenticCourse,
  azureDevopsCourse,
  businessAnalystCourse,
];

// Map of canonical slugs and aliases to courses
const SLUG_MAP: Record<string, DetailedCourse> = {
  'advanced-excel-with-ai': advancedExcelCourse,
  'sql': sqlCourse,
  'power-bi-with-ai': powerBiCourse,
  'tableau': tableauCourse,
  'data-analytics-gen-ai': dataAnalyticsCourse,
  'ai-ml': aiMachineLearningCourse,
  'python-for-ai': pythonForAiCourse,
  'data-science-with-gen-ai': dataScienceCourse,
  'ai-engineer': aiEngineerCourse,
  'data-engineer-ai': aiEngineerCourse, // Alias for old WordPress URL
  'gen-ai-agentic-ai': genAiAgenticCourse,
  'azure-devops': azureDevopsCourse,
  'business-analyst-ai': businessAnalystCourse,
};

export function getCourseBySlug(slug: string): DetailedCourse | undefined {
  if (!slug) return undefined;
  const normalized = slug.toLowerCase().trim();
  return SLUG_MAP[normalized];
}

export function getAllCourseSlugs(): string[] {
  return Object.keys(SLUG_MAP);
}

export function getRelatedCourses(currentSlug: string, count: number = 3): DetailedCourse[] {
  const current = getCourseBySlug(currentSlug);
  return ALL_DETAILED_COURSES
    .filter((c) => c.slug !== current?.slug && c.title !== current?.title)
    .slice(0, count);
}
