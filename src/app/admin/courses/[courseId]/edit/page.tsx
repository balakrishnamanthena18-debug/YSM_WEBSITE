import React from 'react';
import { notFound } from 'next/navigation';
import {
  getCourseById,
  getCategories,
  getAllInstructors,
  getSectionsByCourseId,
  getLessonsByCourseId,
} from '@/lib/db';
import { CourseEditorView } from '@/components/admin/CourseEditorView';

interface PageProps {
  params: Promise<{ courseId: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { courseId } = await params;
  const course = getCourseById(courseId);
  return {
    title: course
      ? `Edit ${course.title} | Course Management | YSM Admin`
      : 'Edit Course | YSM Admin',
  };
}

export default async function EditCoursePage({ params }: PageProps) {
  const { courseId } = await params;
  const course = getCourseById(courseId);

  if (!course) {
    notFound();
  }

  const categories = getCategories();
  const instructors = getAllInstructors();
  const sections = getSectionsByCourseId(course.id);
  const lessons = getLessonsByCourseId(course.id);

  return (
    <CourseEditorView
      initialCourse={course}
      categories={categories}
      instructors={instructors}
      sections={sections}
      lessons={lessons}
    />
  );
}
