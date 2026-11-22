import React from 'react';
import { notFound } from 'next/navigation';
import { getCourseById, getSectionsByCourseId, getLessonsByCourseId } from '@/lib/db';
import { CurriculumBuilderView } from '@/components/admin/CurriculumBuilderView';

interface CurriculumPageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export const metadata = {
  title: 'Curriculum Builder | YSM Admin LMS',
  description: 'Manage course sections, video lectures, and curriculum hierarchy.',
};

export default async function AdminCurriculumPage({ params }: CurriculumPageProps) {
  const resolvedParams = await params;
  const course = getCourseById(resolvedParams.courseId);

  if (!course) {
    notFound();
  }

  const sections = getSectionsByCourseId(course.id);
  const lessons = getLessonsByCourseId(course.id);

  return (
    <CurriculumBuilderView
      course={course}
      initialSections={sections}
      initialLessons={lessons}
    />
  );
}
