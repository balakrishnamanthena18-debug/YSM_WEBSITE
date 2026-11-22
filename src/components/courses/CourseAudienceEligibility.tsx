'use client';

import React from 'react';
import { DetailedCourse } from '@/data/courses/types';
import { Container } from '@/components/ui/Container';

interface CourseAudienceEligibilityProps {
  course: DetailedCourse;
}

function getAudienceVectorIcon(audience: string) {
  const lower = audience.toLowerCase();
  if (lower.includes('student')) {
    return (
      <svg className="w-4 h-4 text-[#176B68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    );
  }
  if (lower.includes('fresher')) {
    return (
      <svg className="w-4 h-4 text-[#176B68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    );
  }
  if (lower.includes('working') || lower.includes('professional')) {
    return (
      <svg className="w-4 h-4 text-[#176B68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    );
  }
  if (lower.includes('non-it') || lower.includes('background')) {
    return (
      <svg className="w-4 h-4 text-[#176B68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      </svg>
    );
  }
  if (lower.includes('switcher')) {
    return (
      <svg className="w-4 h-4 text-[#176B68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="17 1 21 5 17 9" />
        <path d="M3 11V9a4 4 0 0 1 4-4h14" />
        <polyline points="7 23 3 19 7 15" />
        <path d="M21 13v2a4 4 0 0 1-4 4H3" />
      </svg>
    );
  }
  if (lower.includes('entrepreneur')) {
    return (
      <svg className="w-4 h-4 text-[#176B68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    );
  }
  if (lower.includes('analyst')) {
    return (
      <svg className="w-4 h-4 text-[#176B68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    );
  }
  return (
    <svg className="w-4 h-4 text-[#176B68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

export function CourseAudienceEligibility({
  course,
}: CourseAudienceEligibilityProps) {
  return (
    <section className="py-14 sm:py-20 bg-white border-b border-[#E3ECEA]">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold bg-[#F5F9F8] text-[#176B68] border border-[#E3ECEA] mb-3">
            <span>ELIGIBILITY</span>
            <span>&bull;</span>
            <span>WHO CAN JOIN</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#111817]">
            Who Can Join This Course?
          </h2>
          <p className="mt-2 text-base text-[#176B68] font-semibold">
            This course is suitable for:
          </p>
        </div>

        {/* 8 Authentic Learner Profiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5 mb-8">
          {course.targetAudience.map((audience, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#F8FAFA] border border-[#E3ECEA] flex items-center gap-3.5 hover:border-[#176B68]/50 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-white border border-[#E3ECEA] flex items-center justify-center shrink-0 shadow-2xs">
                {getAudienceVectorIcon(audience)}
              </div>
              <span className="text-sm font-semibold text-[#111817]">
                {audience}
              </span>
            </div>
          ))}
        </div>

        {/* Authentic Prerequisites & Beginners Note */}
        {course.prerequisitesNote && (
          <div className="p-5 rounded-xl bg-[#F5F9F8] border border-[#E3ECEA] flex items-center gap-3.5 max-w-2xl">
            <div className="w-8 h-8 rounded-lg bg-[#176B68] text-white flex items-center justify-center shrink-0">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-[#111817]">
              {course.prerequisitesNote}
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
