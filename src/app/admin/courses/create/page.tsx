import React from 'react';
import { getCategories, getAllInstructors } from '@/lib/db';
import { CourseCreatorView } from '@/components/admin/CourseCreatorView';

export const metadata = {
  title: 'Create New Course | YSM Admin LMS',
  description: 'Initialize a new specialized IT track with validated pricing and curriculum defaults.',
};

export default async function CreateCoursePage() {
  const categories = getCategories();
  const instructors = getAllInstructors();

  return (
    <CourseCreatorView
      categories={categories}
      instructors={instructors}
    />
  );
}
