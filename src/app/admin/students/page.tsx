import React from 'react';
import { getAllUsers, getAllEnrollments, getAllCourses } from '@/lib/db';
import { StudentsRegistryView } from '@/components/admin/StudentsRegistryView';

export const metadata = {
  title: 'Student Registry & Access | YSM Admin LMS',
  description: 'Manage registered students, track learning progress, and grant manual course enrollments.',
};

export default async function AdminStudentsPage() {
  const users = await getAllUsers();
  const enrollments = await getAllEnrollments();
  const courses = await getAllCourses();

  return (
    <div className="p-6 sm:p-8">
      <StudentsRegistryView
        users={users}
        enrollments={enrollments}
        courses={courses}
      />
    </div>
  );
}
