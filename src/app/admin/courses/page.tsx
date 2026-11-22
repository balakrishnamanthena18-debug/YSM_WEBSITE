import React from 'react';
import Link from 'next/link';
import { getAllCourses, getCategories } from '@/lib/db';
import { CoursesTableView } from '@/components/admin/CoursesTableView';

export const metadata = {
  title: 'Course Management | YSM Admin LMS',
  description: 'Manage specialized tracks, syllabus, curriculum, and publication states.',
};

export default async function AdminCoursesPage() {
  const courses = getAllCourses();
  const categories = getCategories();

  return (
    <div className="p-6 sm:p-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E3ECEA]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#16B6B8]" />
            <span className="font-mono text-[11px] font-bold text-[#176B68] uppercase tracking-wider">
              ENTERPRISE COURSE MANAGEMENT &amp; COMMERCE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111817]">
            Course Management
          </h1>
          <p className="text-xs text-[#586765] mt-1">
            Create, edit course metadata, configure pricing &amp; discounts, assign instructors, and manage curriculum modules.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/courses"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-[#176B68] bg-[#EBF7F5] border border-[#16B6B8]/30 hover:bg-[#D7EFEA] transition-colors"
          >
            <span>Live Marketplace</span>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Courses Table View */}
      <CoursesTableView initialCourses={courses} categories={categories} />
    </div>
  );
}
