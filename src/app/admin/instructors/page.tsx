import React from 'react';
import { getAllInstructors, getAllCourses } from '@/lib/db';
import { InstructorsManagementView } from '@/components/admin/InstructorsManagementView';

export const metadata = {
  title: 'Faculty & Instructor Management | YSM Admin LMS',
  description: 'Manage accredited corporate trainers, academic mentors, and course assignments.',
};

export default async function AdminInstructorsPage() {
  const instructors = getAllInstructors();
  const courses = getAllCourses();

  return (
    <div className="p-6 sm:p-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E3ECEA]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#16B6B8]" />
            <span className="font-mono text-[11px] font-bold text-[#176B68] uppercase tracking-wider">
              ACADEMIC GOVERNANCE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111817]">
            Instructor &amp; Faculty Management
          </h1>
          <p className="text-xs text-[#586765] mt-1">
            Directory of verified mentors, corporate educators, and assigned curriculum tracks.
          </p>
        </div>
      </div>

      <InstructorsManagementView instructors={instructors} courses={courses} />
    </div>
  );
}
