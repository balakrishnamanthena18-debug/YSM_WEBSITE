'use client';

import React from 'react';
import { DetailedCourse } from '@/data/courses/types';
import { Container } from '@/components/ui/Container';

interface CourseMethodologyProps {
  course: DetailedCourse;
}

function getStageIcon(idx: number) {
  switch (idx) {
    case 0:
      return (
        <svg className="w-5 h-5 text-[#176B68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      );
    case 1:
      return (
        <svg className="w-5 h-5 text-[#176B68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case 2:
      return (
        <svg className="w-5 h-5 text-[#176B68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polygon points="12 8 8 12 12 16 16 12 12 8" />
        </svg>
      );
    case 3:
      return (
        <svg className="w-5 h-5 text-[#176B68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      );
    case 4:
      return (
        <svg className="w-5 h-5 text-[#176B68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      );
    default:
      return (
        <svg className="w-5 h-5 text-[#176B68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
  }
}

export function CourseMethodology({ course }: CourseMethodologyProps) {
  // Use authentic methodology points directly from course data
  const methodologyList =
    course.methodologyPoints && course.methodologyPoints.length > 0
      ? course.methodologyPoints
      : [
          'Instructor-Led Live',
          'Practical Assignments',
          'Real-Time Case Studies',
          'Hands-on Tool Practice',
          'Weekly Assessments',
          'Mock Interviews',
        ];

  return (
    <section className="py-14 sm:py-20 bg-[#F5F8F7] border-b border-[#E3ECEA]">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold bg-white text-[#176B68] border border-[#E3ECEA] mb-3">
            <span>TRAINING METHODOLOGY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#111817]">
            Training Methodology
          </h2>
        </div>

        {/* 6 Authentic Methodology Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {methodologyList.map((point, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-xl bg-white border border-[#E3ECEA] hover:border-[#176B68] transition-colors shadow-2xs flex items-center gap-4"
            >
              <div className="w-11 h-11 rounded-lg bg-[#F5F8F7] border border-[#E3ECEA] flex items-center justify-center shrink-0">
                {getStageIcon(idx)}
              </div>
              <div>
                <span className="font-mono text-[10px] font-bold text-[#176B68] uppercase tracking-wider block mb-0.5">
                  Method 0{idx + 1}
                </span>
                <h3 className="text-base font-bold text-[#111817] leading-snug">
                  {point}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
