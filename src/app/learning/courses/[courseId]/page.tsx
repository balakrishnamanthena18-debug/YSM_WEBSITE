import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { requireAuth } from '@/lib/auth/session';
import {
  getCourseById,
  getSectionsByCourseId,
  getAuthorizedLessonsForCourse,
  hasCourseAccess,
  getCourseProgress,
  getDatabase,
} from '@/lib/db';
import { CoursePlayerView } from '@/components/learning/CoursePlayerView';
import { Container } from '@/components/ui/Container';

interface PageProps {
  params: Promise<{ courseId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { courseId } = await params;
  const course = getCourseById(courseId);
  return {
    title: course ? `${course.title} | Learning Portal | YSM Infotech` : 'Course Player',
  };
}

export default async function CourseLearningPage({ params }: PageProps) {
  const user = await requireAuth();
  const { courseId } = await params;

  const course = getCourseById(courseId);
  if (!course) {
    notFound();
  }

  // 1. Mandatory Security Access Check
  const hasAccess = hasCourseAccess(user.id, course.id);
  const authorizedLessons = getAuthorizedLessonsForCourse(course.id, user.id);
  const hasFreePreviews = authorizedLessons.some((l) => Boolean(l.isFreePreview || l.isPreview));

  // If user has neither full enrollment access NOR any free preview lessons, block access
  if (!hasAccess && !hasFreePreviews) {
    return (
      <div className="py-20 bg-[#F8FAFA] min-h-[80vh] flex items-center justify-center">
        <Container className="max-w-lg text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>

          <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">
            ENROLLMENT ACCESS REQUIRED
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-[#111817] mb-2">
            Protected Course Curriculum
          </h1>
          <p className="text-xs text-[#586765] mb-6 leading-relaxed">
            You do not have an active enrollment for <strong>{course.title}</strong>. Complete enrollment to unlock all {course.duration} of lectures, code repositories, and ISO 9001:2015 certification.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={`/courses/${course.slug}`}
              className="w-full sm:w-auto inline-flex items-center justify-center py-3 px-6 rounded-xl font-bold text-xs bg-[#176B68] text-white hover:bg-[#104E4D] transition-colors"
            >
              Enroll in {course.title} &bull; ₹{course.discountPrice.toLocaleString('en-IN')}
            </Link>

            <Link
              href="/learning/my-courses"
              className="w-full sm:w-auto inline-flex items-center justify-center py-3 px-5 rounded-xl font-semibold text-xs text-[#586765] bg-white border border-[#E3ECEA] hover:bg-neutral-50 transition-colors"
            >
              Back to My Courses
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  const sections = getSectionsByCourseId(course.id);
  const db = getDatabase();

  const userProgress = db.lessonProgress.filter(
    (lp) => lp.studentId === user.id && lp.courseId === course.id
  );
  const courseProgress = getCourseProgress(user.id, course.id);
  const quizzes = db.quizzes.filter((q) => q.courseId === course.id);
  const assignments = db.assignments.filter((a) => a.courseId === course.id);

  return (
    <CoursePlayerView
      course={course}
      sections={sections}
      lessons={authorizedLessons}
      initialLessonProgress={userProgress}
      initialCourseProgress={courseProgress}
      quizzes={quizzes}
      assignments={assignments}
      userId={user.id}
      isEnrolled={hasAccess}
    />
  );
}
