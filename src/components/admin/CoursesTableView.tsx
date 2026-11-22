'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Course, CourseCategory, CourseStatus } from '@/lib/db/schema';
import {
  toggleCoursePublishAction,
  archiveCourseAction,
  duplicateCourseAction,
  deleteCourseAction,
} from '@/app/actions/admin';

// Real technology logo and visual accent metadata for all specialized tracks
const COURSE_LOGOS: Record<
  string,
  { src: string; bg: string; border: string; alt: string }
> = {
  'advanced-excel-with-ai': {
    src: '/logos/tools/excel.svg',
    bg: 'bg-[#EBF7F0]',
    border: 'border-[#C8E6D9]',
    alt: 'Microsoft Excel',
  },
  sql: {
    src: '/logos/tools/postgresql.svg',
    bg: 'bg-[#E8F3FA]',
    border: 'border-[#CFE4F3]',
    alt: 'PostgreSQL / SQL',
  },
  'power-bi-with-ai': {
    src: '/logos/tools/powerbi.svg',
    bg: 'bg-[#FEF7E6]',
    border: 'border-[#FCE6B7]',
    alt: 'Power BI',
  },
  tableau: {
    src: '/logos/tools/tableau.svg',
    bg: 'bg-[#F8F9FA]',
    border: 'border-[#E9ECEF]',
    alt: 'Tableau',
  },
  'data-analytics-gen-ai': {
    src: '/logos/tools/pandas.svg',
    bg: 'bg-[#E6F6F6]',
    border: 'border-[#BDEAEA]',
    alt: 'Pandas Data Analytics',
  },
  'ai-ml': {
    src: '/logos/tools/scikit-learn.svg',
    bg: 'bg-[#F3EEFB]',
    border: 'border-[#E0D2F6]',
    alt: 'Scikit-Learn AI & ML',
  },
  'python-for-ai': {
    src: '/logos/tools/python.svg',
    bg: 'bg-[#FEF9E7]',
    border: 'border-[#FCEFB5]',
    alt: 'Python for AI',
  },
  'data-science-with-gen-ai': {
    src: '/logos/tools/jupyter.svg',
    bg: 'bg-[#F5EDF9]',
    border: 'border-[#E6D0F2]',
    alt: 'Jupyter Data Science',
  },
  'ai-engineer': {
    src: '/logos/tools/openai.svg',
    bg: 'bg-[#0F172A]',
    border: 'border-[#334155]',
    alt: 'OpenAI AI Engineer',
  },
  'data-engineer-ai': {
    src: '/logos/tools/openai.svg',
    bg: 'bg-[#0F172A]',
    border: 'border-[#334155]',
    alt: 'OpenAI AI Engineer',
  },
  'gen-ai-agentic-ai': {
    src: '/logos/tools/langchain.svg',
    bg: 'bg-[#F4EFFB]',
    border: 'border-[#E1D4F6]',
    alt: 'LangChain Agentic AI',
  },
  'azure-devops': {
    src: '/logos/tools/azure-devops.svg',
    bg: 'bg-[#E8F3FD]',
    border: 'border-[#CCE3FB]',
    alt: 'Azure DevOps',
  },
  'business-analyst-ai': {
    src: '/logos/tools/jira.svg',
    bg: 'bg-[#EAF6EE]',
    border: 'border-[#CBEAD5]',
    alt: 'Jira Business Analyst',
  },
};

function getCourseLogoMeta(slug: string, title: string) {
  if (COURSE_LOGOS[slug]) return COURSE_LOGOS[slug];
  // Fuzzy match by slug prefix or key
  const foundKey = Object.keys(COURSE_LOGOS).find((k) => slug.includes(k) || k.includes(slug));
  if (foundKey) return COURSE_LOGOS[foundKey];
  return {
    src: '/logos/tools/python.svg',
    bg: 'bg-[#F8FAFA]',
    border: 'border-[#E3ECEA]',
    alt: title,
  };
}

interface CoursesTableViewProps {
  initialCourses: Course[];
  categories: CourseCategory[];
}

export function CoursesTableView({ initialCourses, categories }: CoursesTableViewProps) {
  const [courses, setCourses] = useState<Course[]>(initialCourses);

  // Search, Filter & Sort states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeliveryType, setSelectedDeliveryType] = useState<'all' | 'live' | 'recorded'>('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [sortBy, setSortBy] = useState<'order' | 'price-asc' | 'price-desc' | 'students' | 'title'>('order');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Active action states
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [activeMenuCourseId, setActiveMenuCourseId] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Delete modal state
  const [deletingCourse, setDeletingCourse] = useState<Course | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Filter & Sort Logic
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = course.title.toLowerCase().includes(q);
        const matchesSlug = course.slug.toLowerCase().includes(q);
        const matchesInstructor = (course.instructorName || '').toLowerCase().includes(q);
        if (!matchesTitle && !matchesSlug && !matchesInstructor) return false;
      }

      // Delivery type filter
      if (selectedDeliveryType === 'live' && course.deliveryType !== 'LIVE_INSTRUCTOR_LED') {
        return false;
      }
      if (selectedDeliveryType === 'recorded' && course.deliveryType !== 'RECORDED_SELF_PACED') {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && course.categoryId !== selectedCategory && course.categorySlug !== selectedCategory) {
        return false;
      }

      // Status filter
      if (selectedStatus !== 'all') {
        const cStatus = course.status || (course.isPublished ? 'published' : 'draft');
        if (cStatus !== selectedStatus) return false;
      }

      // Skill level filter
      if (selectedLevel !== 'all' && course.skillLevel !== selectedLevel) {
        return false;
      }

      return true;
    });
  }, [courses, searchQuery, selectedDeliveryType, selectedCategory, selectedStatus, selectedLevel]);

  const sortedCourses = useMemo(() => {
    return [...filteredCourses].sort((a, b) => {
      const aSell = a.sellingPrice ?? a.discountPrice ?? a.regularPrice ?? a.price ?? 0;
      const bSell = b.sellingPrice ?? b.discountPrice ?? b.regularPrice ?? b.price ?? 0;

      switch (sortBy) {
        case 'price-asc':
          return aSell - bSell;
        case 'price-desc':
          return bSell - aSell;
        case 'students':
          return (b.studentsCount || 0) - (a.studentsCount || 0);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'order':
        default:
          return (a.displayOrder || 0) - (b.displayOrder || 0);
      }
    });
  }, [filteredCourses, sortBy]);

  // Pagination
  const totalPages = Math.ceil(sortedCourses.length / pageSize) || 1;
  const paginatedCourses = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedCourses.slice(start, start + pageSize);
  }, [sortedCourses, currentPage, pageSize]);

  // Handlers
  const handleTogglePublish = async (courseId: string, currentStatus?: CourseStatus) => {
    setActionLoadingId(courseId);
    setActiveMenuCourseId(null);
    setFeedbackMessage(null);
    try {
      const targetStatus: CourseStatus = currentStatus === 'published' ? 'draft' : 'published';
      const res = await toggleCoursePublishAction(courseId, targetStatus);
      if (res.success) {
        setCourses((prev) =>
          prev.map((c) =>
            c.id === courseId ? { ...c, status: res.status, isPublished: res.isPublished } : c
          )
        );
        setFeedbackMessage({
          type: 'success',
          text: `Course ${res.isPublished ? 'published to live catalog' : 'moved to draft'}.`,
        });
      }
    } catch (e) {
      console.error('Publish toggle failed:', e);
      setFeedbackMessage({ type: 'error', text: 'Failed to update publication status.' });
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleArchive = async (courseId: string) => {
    setActionLoadingId(courseId);
    setActiveMenuCourseId(null);
    setFeedbackMessage(null);
    try {
      const res = await archiveCourseAction(courseId);
      if (res.success && res.course) {
        setCourses((prev) => prev.map((c) => (c.id === courseId ? res.course! : c)));
        setFeedbackMessage({ type: 'success', text: 'Course archived successfully.' });
      }
    } catch (e) {
      console.error('Archive failed:', e);
      setFeedbackMessage({ type: 'error', text: 'Failed to archive course.' });
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDuplicate = async (courseId: string) => {
    setActionLoadingId(courseId);
    setActiveMenuCourseId(null);
    setFeedbackMessage(null);
    try {
      const res = await duplicateCourseAction(courseId);
      if (res.success && res.course) {
        setCourses((prev) => [res.course!, ...prev]);
        setFeedbackMessage({
          type: 'success',
          text: `Duplicated as "${res.course.title}". Saved as Draft.`,
        });
      }
    } catch (e) {
      console.error('Duplicate failed:', e);
      setFeedbackMessage({ type: 'error', text: 'Failed to duplicate course.' });
    } finally {
      setActionLoadingId(null);
    }
  };

  const confirmDelete = async (force = false) => {
    if (!deletingCourse) return;
    setDeleteError(null);
    setActionLoadingId(deletingCourse.id);
    try {
      const res = await deleteCourseAction(deletingCourse.id, force);
      if (res.success) {
        setCourses((prev) => prev.filter((c) => c.id !== deletingCourse.id));
        setDeletingCourse(null);
        setFeedbackMessage({ type: 'success', text: 'Course permanently deleted.' });
      } else {
        setDeleteError(res.error || 'Failed to delete course.');
      }
    } catch (e) {
      console.error('Delete error:', e);
      setDeleteError('An unexpected server error occurred.');
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Feedback Notification */}
      {feedbackMessage && (
        <div
          className={`p-3.5 rounded-xl text-xs font-semibold flex items-center justify-between gap-3 shadow-xs ${
            feedbackMessage.type === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border border-rose-200 text-rose-800'
          }`}
        >
          <span>{feedbackMessage.text}</span>
          <button
            type="button"
            onClick={() => setFeedbackMessage(null)}
            className="text-xs font-bold p-1 hover:opacity-75"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E3ECEA] shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <svg
              className="w-4 h-4 text-[#8A9795] absolute left-3.5 top-1/2 -translate-y-1/2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Search courses by title, slug, or instructor..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68] bg-[#F8FAFA]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8A9795] hover:text-[#111817]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Create Action */}
          <Link
            href="/admin/courses/create"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#176B68] text-white hover:bg-[#104E4D] transition-colors shadow-xs shrink-0 cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Create New Course</span>
          </Link>
        </div>

        {/* Filter Dropdowns Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-3 border-t border-[#E3ECEA]">
          <div className="flex flex-wrap items-center gap-2">
            {/* Delivery Model Filter Tabs */}
            <div className="inline-flex p-1 rounded-xl bg-[#EBF7F5] border border-[#C8E6D9] text-xs font-semibold">
              {[
                { id: 'all', label: 'All Courses' },
                { id: 'live', label: 'Live Instructor-Led' },
                { id: 'recorded', label: 'Recorded E-Learning' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setSelectedDeliveryType(tab.id as typeof selectedDeliveryType);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer text-xs ${
                    selectedDeliveryType === tab.id
                      ? 'bg-[#176B68] text-white shadow-xs font-bold'
                      : 'text-[#176B68] hover:text-[#104E4D]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Status Filter Tabs */}
            <div className="inline-flex p-1 rounded-xl bg-[#F8FAFA] border border-[#E3ECEA] text-xs font-semibold">
              {(['all', 'published', 'draft', 'archived'] as const).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => {
                    setSelectedStatus(status);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1 rounded-lg capitalize transition-colors ${
                    selectedStatus === status
                      ? 'bg-white text-[#176B68] shadow-xs font-bold'
                      : 'text-[#586765] hover:text-[#111817]'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Category Select */}
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="text-xs px-3 py-1.5 rounded-xl border border-[#E3ECEA] bg-[#F8FAFA] text-[#586765] focus:outline-none focus:border-[#176B68]"
            >
              <option value="all">All Categories ({categories.length})</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Skill Level Select */}
            <select
              value={selectedLevel}
              onChange={(e) => {
                setSelectedLevel(e.target.value);
                setCurrentPage(1);
              }}
              className="text-xs px-3 py-1.5 rounded-xl border border-[#E3ECEA] bg-[#F8FAFA] text-[#586765] focus:outline-none focus:border-[#176B68]"
            >
              <option value="all">All Skill Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="All Levels">All Levels</option>
            </select>
          </div>

          {/* Sort By Select */}
          <div className="flex items-center gap-2 text-xs text-[#586765]">
            <span className="text-[11px] font-mono uppercase font-bold text-[#8A9795]">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="text-xs px-3 py-1.5 rounded-xl border border-[#E3ECEA] bg-[#F8FAFA] text-[#111817] font-semibold focus:outline-none focus:border-[#176B68]"
            >
              <option value="order">Curriculum Sequence</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="students">Enrollment Count</option>
              <option value="title">Course Title (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Courses Count Summary */}
      <div className="flex items-center justify-between text-xs text-[#586765] px-1 font-mono">
        <span>
          Showing <strong>{sortedCourses.length}</strong> {sortedCourses.length === 1 ? 'course' : 'courses'}
          {selectedCategory !== 'all' || selectedStatus !== 'all' || searchQuery ? ' (filtered)' : ''}
        </span>
        {totalPages > 1 && (
          <span>
            Page {currentPage} of {totalPages}
          </span>
        )}
      </div>

      {/* Responsive View A: Desktop Data Table */}
      <div className="hidden lg:block overflow-x-auto bg-white rounded-2xl border border-[#E3ECEA] shadow-xs">
        <table className="w-full text-xs text-left">
          <thead className="bg-[#F8FAFA] text-[#586765] font-mono uppercase text-[10px] tracking-wider border-b border-[#E3ECEA]">
            <tr>
              <th className="py-3 px-3.5 min-w-[210px]">Course</th>
              <th className="py-3 px-3 w-[140px]">Track &amp; Delivery</th>
              <th className="py-3 px-3 w-[100px]">Duration &amp; Level</th>
              <th className="py-3 px-3 w-[110px]">Pricing (INR)</th>
              <th className="py-3 px-3 w-[110px]">Students &amp; Validity</th>
              <th className="py-3 px-3 w-[115px]">Instructor</th>
              <th className="py-3 px-3 w-[95px]">Status</th>
              <th className="sticky right-0 z-20 bg-[#F8FAFA] py-3 px-3.5 text-right whitespace-nowrap w-[195px] shadow-[-6px_0_10px_-4px_rgba(0,0,0,0.08)]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E3ECEA]">
            {paginatedCourses.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-xs text-[#586765]">
                  No courses matching your filter criteria. Click &ldquo;Reset Filters&rdquo; or create a new course.
                </td>
              </tr>
            ) : (
              paginatedCourses.map((course) => {
                const regularPrice = course.regularPrice ?? course.price ?? 9999;
                const sellingPrice = course.sellingPrice ?? course.discountPrice ?? 4999;
                const discountPct =
                  course.discountPercentage ??
                  (regularPrice > 0 ? Math.round(((regularPrice - sellingPrice) / regularPrice) * 100) : 0);
                const status = course.status || (course.isPublished ? 'published' : 'draft');
                const isMenuOpen = activeMenuCourseId === course.id;
                const logoMeta = getCourseLogoMeta(course.slug, course.title);

                return (
                  <tr key={course.id} className="group hover:bg-[#F8FAFA] transition-colors">
                    {/* Course Title & Real Technology Logo */}
                    <td className="py-3.5 px-3.5 font-bold text-[#111817]">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`relative w-9 h-9 rounded-xl ${logoMeta.bg} ${logoMeta.border} border p-1.5 flex items-center justify-center shrink-0 shadow-2xs`}
                          title={logoMeta.alt}
                        >
                          <Image
                            src={logoMeta.src}
                            alt={logoMeta.alt}
                            width={22}
                            height={22}
                            className="w-5 h-5 object-contain"
                            unoptimized
                          />
                        </div>
                        <div className="min-w-0 max-w-[190px]">
                          <span className="block leading-snug line-clamp-1 text-xs font-bold text-[#111817]">
                            {course.title}
                          </span>
                          <span className="text-[10px] text-[#8A9795] font-mono block truncate">
                            /{course.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Track & Delivery Model */}
                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 rounded bg-[#EBF7F5] text-[#176764] font-bold text-[10px] truncate block max-w-[125px] mb-1">
                        {course.categoryName}
                      </span>
                      <div>
                        {course.deliveryType === 'LIVE_INSTRUCTOR_LED' ? (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9.5px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Live Cohort</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9.5px] font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                            <span>Self-Paced</span>
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Duration & Level */}
                    <td className="py-3.5 px-3 text-[#586765]">
                      <span className="block font-medium text-[#111817] text-xs leading-snug">{course.duration}</span>
                      <span className="text-[10px] font-mono text-[#8A9795]">{course.skillLevel}</span>
                    </td>

                    {/* Pricing */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-1 flex-wrap">
                        <span className="font-bold text-[#111817] text-xs block">
                          ₹{sellingPrice.toLocaleString('en-IN')}
                        </span>
                        {discountPct > 0 && (
                          <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-amber-50 text-amber-700 font-bold border border-amber-200">
                            {discountPct}%
                          </span>
                        )}
                      </div>
                      {regularPrice > sellingPrice && (
                        <span className="text-[10px] text-[#8A9795] line-through block">
                          ₹{regularPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </td>

                    {/* Students & Access */}
                    <td className="py-3.5 px-3">
                      <span className="font-bold text-[#111817] text-xs block">
                        {course.studentsCount || 0} students
                      </span>
                      <span className="text-[10px] font-mono text-[#586765] block">
                        {course.validityType === 'fixed_duration'
                          ? `${course.validityDuration || 180}d Access`
                          : 'Lifetime Access'}
                      </span>
                    </td>

                    {/* Instructor */}
                    <td className="py-3.5 px-3 text-xs">
                      <span className="font-medium text-[#111817] block truncate max-w-[110px]">
                        {course.instructorName || 'Dr. Rajesh Varma'}
                      </span>
                      <span className="text-[10px] text-[#8A9795] block truncate max-w-[110px]">
                        {course.instructorTitle || 'Faculty'}
                      </span>
                    </td>

                    {/* Status Pill */}
                    <td className="py-3.5 px-3">
                      <button
                        type="button"
                        onClick={() => handleTogglePublish(course.id, status)}
                        disabled={actionLoadingId === course.id}
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold transition-colors cursor-pointer ${
                          status === 'published'
                            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                            : status === 'archived'
                            ? 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 border border-neutral-300'
                            : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
                        }`}
                        title="Click to toggle publish/draft"
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            status === 'published'
                              ? 'bg-emerald-500'
                              : status === 'archived'
                              ? 'bg-neutral-400'
                              : 'bg-amber-500'
                          }`}
                        />
                        <span className="capitalize">{status}</span>
                      </button>
                    </td>

                    {/* Actions Column: Sticky Right so it is NEVER cut off */}
                    <td className="sticky right-0 z-10 bg-white group-hover:bg-[#F8FAFA] py-3.5 px-3.5 text-right whitespace-nowrap shadow-[-6px_0_10px_-4px_rgba(0,0,0,0.08)]">
                      <div className="flex items-center justify-end gap-1.5 relative">
                        {/* 1. Edit Course */}
                        <Link
                          href={`/admin/courses/${course.id}/edit`}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold text-[#176B68] bg-[#EBF7F5] hover:bg-[#D7EFEA] transition-colors cursor-pointer shrink-0"
                          title="Edit course configuration and pricing"
                        >
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                          <span>Edit</span>
                        </Link>

                        {/* 2. Primary Action: Batches (Live) vs Curriculum (Recorded) */}
                        {course.deliveryType === 'LIVE_INSTRUCTOR_LED' ? (
                          <Link
                            href={`/admin/courses/${course.id}/batches`}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800 transition-colors shrink-0 shadow-2xs"
                            title="Manage live cohort batches, class schedules, meeting links & attendance"
                          >
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                              <line x1="16" y1="2" x2="16" y2="6" />
                              <line x1="8" y1="2" x2="8" y2="6" />
                              <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            <span>Batches</span>
                          </Link>
                        ) : (
                          <Link
                            href={`/admin/courses/${course.id}/curriculum`}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-[#176B68] text-white hover:bg-[#104E4D] transition-colors shrink-0 shadow-2xs"
                            title="Manage recorded video curriculum modules & lectures"
                          >
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                            <span>Curriculum</span>
                          </Link>
                        )}

                        {/* 3. More Actions Dropdown Toggle */}
                        <button
                          type="button"
                          onClick={() => setActiveMenuCourseId(isMenuOpen ? null : course.id)}
                          className="p-1 rounded-lg text-[#586765] hover:bg-neutral-100 hover:text-[#111817] transition-colors cursor-pointer shrink-0"
                          title="More course actions"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="12" cy="5" r="1" />
                            <circle cx="12" cy="19" r="1" />
                          </svg>
                        </button>

                        {/* Dropdown Menu Panel with Backdrop */}
                        {isMenuOpen && (
                          <>
                            <div
                              className="fixed inset-0 z-20"
                              onClick={() => setActiveMenuCourseId(null)}
                            />
                            <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-xl shadow-xl border border-[#E3ECEA] py-1.5 z-30 text-left text-xs font-medium">
                              {/* Public Preview */}
                              <Link
                                href={`/courses/${course.slug}`}
                                target="_blank"
                                onClick={() => setActiveMenuCourseId(null)}
                                className="w-full px-3.5 py-2 text-left hover:bg-[#F8FAFA] text-[#111817] flex items-center gap-2 cursor-pointer"
                              >
                                <svg className="w-3.5 h-3.5 text-[#586765]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                  <polyline points="15 3 21 3 21 9" />
                                  <line x1="10" y1="14" x2="21" y2="3" />
                                </svg>
                                <span>Preview Public Page ↗</span>
                              </Link>

                              <div className="border-t border-[#E3ECEA] my-1" />

                              {/* Duplicate Course */}
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveMenuCourseId(null);
                                  handleDuplicate(course.id);
                                }}
                                disabled={actionLoadingId === course.id}
                                className="w-full px-3.5 py-2 text-left hover:bg-[#F8FAFA] text-[#111817] flex items-center gap-2 cursor-pointer"
                              >
                                <svg className="w-3.5 h-3.5 text-[#586765]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                </svg>
                                <span>Duplicate Course</span>
                              </button>

                              {/* Publish / Unpublish Toggle */}
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveMenuCourseId(null);
                                  handleTogglePublish(course.id, status);
                                }}
                                disabled={actionLoadingId === course.id}
                                className="w-full px-3.5 py-2 text-left hover:bg-[#F8FAFA] text-[#111817] flex items-center gap-2 cursor-pointer"
                              >
                                <svg className="w-3.5 h-3.5 text-[#586765]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <circle cx="12" cy="12" r="10" />
                                  <polygon points="10 8 16 12 10 16 10 8" />
                                </svg>
                                <span>{status === 'published' ? 'Unpublish (Draft)' : 'Publish Course'}</span>
                              </button>

                              {/* Archive Course */}
                              {status !== 'archived' && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveMenuCourseId(null);
                                    handleArchive(course.id);
                                  }}
                                  disabled={actionLoadingId === course.id}
                                  className="w-full px-3.5 py-2 text-left hover:bg-[#F8FAFA] text-[#111817] flex items-center gap-2 cursor-pointer"
                                >
                                  <svg className="w-3.5 h-3.5 text-[#586765]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="21 8 21 21 3 21 3 8" />
                                    <rect x="1" y="3" width="22" height="5" />
                                    <line x1="10" y1="12" x2="14" y2="12" />
                                  </svg>
                                  <span>Archive Course</span>
                                </button>
                              )}

                              <div className="border-t border-[#E3ECEA] my-1" />

                              {/* Delete Course */}
                              <button
                                type="button"
                                onClick={() => {
                                  setDeletingCourse(course);
                                  setActiveMenuCourseId(null);
                                  setDeleteError(null);
                                }}
                                className="w-full px-3.5 py-2 text-left hover:bg-rose-50 text-rose-600 flex items-center gap-2 cursor-pointer font-semibold"
                              >
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="3 6 5 6 21 6" />
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                </svg>
                                <span>Delete Course...</span>
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Responsive View B: Mobile Card Stack */}
      <div className="lg:hidden space-y-3">
        {paginatedCourses.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-[#E3ECEA] text-center text-xs text-[#586765]">
            No courses found matching your filters.
          </div>
        ) : (
          paginatedCourses.map((course) => {
            const regularPrice = course.regularPrice ?? course.price ?? 9999;
            const sellingPrice = course.sellingPrice ?? course.discountPrice ?? 4999;
            const status = course.status || (course.isPublished ? 'published' : 'draft');
            const logoMeta = getCourseLogoMeta(course.slug, course.title);

            return (
              <div
                key={course.id}
                className="bg-white p-4 rounded-2xl border border-[#E3ECEA] shadow-xs space-y-3"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`relative w-12 h-12 rounded-xl ${logoMeta.bg} ${logoMeta.border} border p-2 flex items-center justify-center shrink-0 shadow-2xs`}
                    title={logoMeta.alt}
                  >
                    <Image
                      src={logoMeta.src}
                      alt={logoMeta.alt}
                      width={30}
                      height={30}
                      className="w-7 h-7 object-contain"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-bold text-xs text-[#111817] block line-clamp-1">
                      {course.title}
                    </span>
                    <span className="text-[10.5px] text-[#8A9795] font-mono block">
                      /{course.slug}
                    </span>
                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                      <span className="px-2 py-0.5 rounded bg-[#EBF7F5] text-[#176B68] font-bold text-[10px]">
                        {course.categoryName}
                      </span>
                      {course.deliveryType === 'LIVE_INSTRUCTOR_LED' ? (
                        <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          Live Cohort
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">
                          Self-Paced
                        </span>
                      )}
                      <span className="text-[10px] text-[#586765] font-medium">
                        {course.duration}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#E3ECEA] text-xs">
                  <div>
                    <span className="font-bold text-[#111817]">
                      ₹{sellingPrice.toLocaleString('en-IN')}
                    </span>
                    {regularPrice > sellingPrice && (
                      <span className="text-[10px] text-[#8A9795] line-through ml-1.5">
                        ₹{regularPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                      status === 'published'
                        ? 'bg-emerald-50 text-emerald-700'
                        : status === 'archived'
                        ? 'bg-neutral-100 text-neutral-600'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {status}
                  </span>
                </div>

                {/* Mobile Actions Button Row */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <Link
                    href={`/admin/courses/${course.id}/edit`}
                    className="py-1.5 px-2 rounded-lg text-xs font-bold text-center text-[#176B68] bg-[#EBF7F5] border border-[#176B68]/30"
                  >
                    Edit
                  </Link>
                  {course.deliveryType === 'LIVE_INSTRUCTOR_LED' ? (
                    <Link
                      href={`/admin/courses/${course.id}/batches`}
                      className="py-1.5 px-2 rounded-lg text-xs font-bold text-center text-white bg-[#176B68]"
                    >
                      Batches
                    </Link>
                  ) : (
                    <Link
                      href={`/admin/courses/${course.id}/curriculum`}
                      className="py-1.5 px-2 rounded-lg text-xs font-bold text-center text-white bg-[#176B68]"
                    >
                      Curriculum
                    </Link>
                  )}
                  <Link
                    href={`/courses/${course.slug}`}
                    target="_blank"
                    className="py-1.5 px-2 rounded-lg text-xs font-semibold text-center text-[#586765] border border-[#E3ECEA]"
                  >
                    Preview
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-[#586765] bg-white border border-[#E3ECEA] hover:bg-[#F8FAFA] disabled:opacity-40 disabled:pointer-events-none"
          >
            &larr; Previous
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                  currentPage === page
                    ? 'bg-[#176B68] text-white'
                    : 'text-[#586765] hover:bg-white'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-[#586765] bg-white border border-[#E3ECEA] hover:bg-[#F8FAFA] disabled:opacity-40 disabled:pointer-events-none"
          >
            Next &rarr;
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E3ECEA]">
            <div className="flex items-center gap-3 text-rose-600 mb-3">
              <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-base text-[#111817]">Confirm Course Deletion</h3>
                <span className="text-[11px] text-[#8A9795] font-mono">ID: {deletingCourse.id}</span>
              </div>
            </div>

            <p className="text-xs text-[#586765] leading-relaxed mb-4">
              Are you sure you want to permanently delete <strong>{deletingCourse.title}</strong>? All curriculum sections, lessons, and assessment links associated with this course will be removed.
            </p>

            {deleteError && (
              <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs leading-relaxed">
                <span className="font-bold block mb-1">Notice:</span>
                {deleteError}
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E3ECEA]">
              <button
                type="button"
                onClick={() => {
                  setDeletingCourse(null);
                  setDeleteError(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#586765] hover:bg-[#F8FAFA]"
              >
                Cancel
              </button>

              {deleteError ? (
                <button
                  type="button"
                  onClick={() => confirmDelete(true)}
                  disabled={actionLoadingId === deletingCourse.id}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 transition-colors disabled:opacity-50"
                >
                  {actionLoadingId === deletingCourse.id ? 'Deleting...' : 'Force Delete Anyway'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => confirmDelete(false)}
                  disabled={actionLoadingId === deletingCourse.id}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 transition-colors disabled:opacity-50"
                >
                  {actionLoadingId === deletingCourse.id ? 'Deleting...' : 'Yes, Delete Course'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
