'use client';

import React from 'react';
import Link from 'next/link';
import { ProgramCourse } from '@/data/programs';
import { CourseTechIcon } from './CourseTechIcon';

interface CourseCardProps {
  course: ProgramCourse;
  index?: number;
  onExplore?: (course: ProgramCourse) => void;
}

export function CourseCard({ course, index = 0 }: CourseCardProps) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      id={`course-${course.slug}`}
      data-course-id={course.id}
      style={{ animationDelay: `${(index % 12) * 45}ms` }}
      className="group relative flex flex-col justify-between h-full rounded-xl bg-white border border-[#E3ECEA] p-6 sm:p-6.5 transition-all duration-200 shadow-[0_2px_12px_rgba(17,24,23,0.03)] hover:shadow-lg hover:border-[#16B6B8]/60 hover:-translate-y-0.5 cursor-pointer select-none text-left no-underline block"
      aria-label={`View full course page: ${course.title}`}
    >
      {/* TOP SECTION: Track Index, Category & Technology Header */}
      <div>
        {/* Top Meta Bar */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="text-[11.5px] font-semibold text-[#586765] uppercase tracking-wider">
            Track {course.number}
          </span>
          <span className="text-[10.5px] font-semibold tracking-wide px-2.5 py-0.5 rounded-full bg-[#F5F9F8] text-[#176B68]">
            {course.category}
          </span>
        </div>

        {/* Expressive Composition: Course Title (Left) + Technology Logo (Right) */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1">
            <h3 className="text-[18px] sm:text-[19px] font-bold leading-[1.28] tracking-[-0.015em] text-[#111817] group-hover:text-[#176B68] transition-colors duration-200">
              {course.title}
            </h3>
          </div>

          <CourseTechIcon
            type={course.iconType}
            accent={course.accent}
            size="lg"
            className="shrink-0 transition-transform duration-200 group-hover:scale-105"
          />
        </div>

        {/* Short Professional Description */}
        <p className="text-[13px] sm:text-[13.5px] leading-[1.62] text-[#586765] font-normal line-clamp-3 mb-5">
          {course.description}
        </p>
      </div>

      {/* BOTTOM SECTION: Three Skill Tags & Aligned Explore CTA */}
      <div className="mt-auto pt-4 border-t border-[#E3ECEA]/80">
        {/* Three relevant technology/skill tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {course.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium text-[#586765] bg-[#F5F9F8] px-2.5 py-1 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Single Focused Action CTA */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-[13px] font-semibold text-[#176B68] group-hover:text-[#104E4D] transition-colors">
            Explore Curriculum
          </span>
          <div
            className="w-7 h-7 rounded-lg bg-[#F5F9F8] text-[#176B68] border border-[#E3ECEA] group-hover:bg-[#176B68] group-hover:text-white group-hover:border-[#176B68] flex items-center justify-center transition-all duration-200"
            aria-hidden="true"
          >
            <svg
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
