import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getCourseBySlug,
  getAllCourseSlugs,
  getRelatedCourses,
} from '@/data/courses';
import { getCourseBySlug as getDbCourseBySlug } from '@/lib/db';
import { CourseDetailView } from '@/components/courses/CourseDetailView';
import { DetailedCourse } from '@/data/courses/types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const slugs = getAllCourseSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    return {
      title: 'Course Not Found | YSM Infotech',
      description: 'The requested course program could not be located.',
    };
  }

  const description =
    course.overviewParagraphs && course.overviewParagraphs.length > 0
      ? course.overviewParagraphs[0]
      : `${course.title} professional training program at YSM Infotech.`;

  return {
    title: `${course.title} Training & Certification | YSM Infotech`,
    description,
    keywords: [
      course.title,
      'YSM Infotech',
      'ISO 9001:2015 certified IT training',
      'Hyderabad tech academy',
      ...course.highlights.slice(0, 6),
      ...course.careerRoles.slice(0, 4),
    ],
    openGraph: {
      title: `${course.title} | YSM Infotech`,
      description,
      url: `https://ysminfotech.com/courses/${course.slug}`,
      siteName: 'YSM Infotech',
      locale: 'en_IN',
      type: 'article',
    },
    alternates: {
      canonical: `https://ysminfotech.com/courses/${course.slug}`,
    },
  };
}

export default async function CoursePage({ params }: PageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  const dbCourse = getDbCourseBySlug(slug);

  if (!course && !dbCourse) {
    notFound();
  }

  // Merge dynamic database pricing and settings with static course content
  const mergedCourse: DetailedCourse & {
    price?: number;
    discountPrice?: number;
    regularPrice?: number;
    sellingPrice?: number;
  } = course
    ? {
        ...course,
        price: dbCourse?.price ?? dbCourse?.regularPrice,
        discountPrice: dbCourse?.discountPrice ?? dbCourse?.sellingPrice,
        regularPrice: dbCourse?.regularPrice ?? dbCourse?.price,
        sellingPrice: dbCourse?.sellingPrice ?? dbCourse?.discountPrice,
      }
    : {
        slug: dbCourse!.slug,
        title: dbCourse!.title,
        rating: String(dbCourse!.rating || '5.0'),
        level: dbCourse!.skillLevel || 'Intermediate',
        duration: dbCourse!.duration,
        featureBadges: dbCourse!.featureBadges || [
          'Expert-led Training',
          'Hands-on Practical Labs',
          'Career Transformation & Guidance',
          '24/7 Support',
        ],
        accent: 'emerald',
        iconType: 'python',
        overviewParagraphs: dbCourse!.overviewParagraphs || [dbCourse!.description],
        highlightsTitle: 'Program Coverage',
        highlights: dbCourse!.learningOutcomes || ['Comprehensive Industry Curriculum'],
        targetAudience: ['Graduates and working professionals seeking career advancement.'],
        prerequisitesNote: dbCourse!.prerequisites?.[0] || 'Basic computer proficiency.',
        tools: (dbCourse!.toolsCovered || ['Industry Standard Tools']).map((t) => ({
          name: t,
          category: 'Standard',
        })),
        methodologyPoints: ['Live Instructor-Led Sessions', 'Hands-on Lab Exercises'],
        certificateText: 'ISO 9001:2015 Accredited Certification with verification ID.',
        careerRoles: ['Specialist', 'Consultant', 'Technical Lead'],
        modules: [],
        projects: [],
        faqs: [],
        inquiryMessage: `Hello YSM Infotech, I would like to inquire about ${dbCourse!.title}`,
        whatsappUrl: `https://wa.me/917997791456?text=Inquiry%20about%20${encodeURIComponent(dbCourse!.title)}`,
        price: dbCourse!.price,
        discountPrice: dbCourse!.discountPrice,
        regularPrice: dbCourse!.regularPrice,
        sellingPrice: dbCourse!.sellingPrice,
      };

  const related = getRelatedCourses(slug, 3);

  return <CourseDetailView course={mergedCourse} relatedCourses={related} />;
}
