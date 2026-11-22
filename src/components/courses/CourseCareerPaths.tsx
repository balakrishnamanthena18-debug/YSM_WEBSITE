'use client';

import React from 'react';
import { DetailedCourse } from '@/data/courses/types';
import { Container } from '@/components/ui/Container';

interface CourseCareerPathsProps {
  course: DetailedCourse;
}

function getCareerRoleIcon(role: string) {
  const lower = role.toLowerCase();
  if (lower.includes('ai') || lower.includes('machine learning')) {
    return (
      <svg className="w-4 h-4 text-[#176B68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2" />
      </svg>
    );
  }
  if (lower.includes('data') || lower.includes('analyst')) {
    return (
      <svg className="w-4 h-4 text-[#176B68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    );
  }
  if (lower.includes('automation')) {
    return (
      <svg className="w-4 h-4 text-[#176B68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
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

export function CourseCareerPaths({ course }: CourseCareerPathsProps) {
  const whatsappUrl = `https://wa.me/917997791456?text=${encodeURIComponent(
    `Hi YSM Infotech, I would like to inquire about career guidance for ${course.title}.`
  )}`;

  return (
    <section className="py-14 sm:py-20 bg-[#F5F8F7] border-b border-[#E3ECEA]">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold bg-white text-[#176B68] border border-[#E3ECEA] mb-3">
            <span>CAREER PATHWAYS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#111817]">
            {course.careerOpportunitiesTitle || 'Career Opportunities After Course'}
          </h2>
        </div>

        {/* 10 Authentic Career Roles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-8">
          {course.careerRoles.map((role, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white border border-[#E3ECEA] flex items-center gap-3 shadow-2xs hover:border-[#176B68] transition-colors"
            >
              <div className="w-8 h-8 rounded-md bg-[#F5F8F7] border border-[#E3ECEA] flex items-center justify-center shrink-0">
                {getCareerRoleIcon(role)}
              </div>
              <span className="text-sm font-semibold text-[#111817]">
                {role}
              </span>
            </div>
          ))}
        </div>

        {/* Action Link */}
        <div className="flex items-center gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold bg-[#176B68] text-white hover:bg-[#104E4D] transition-colors"
          >
            <span>Inquire About Placements &rarr;</span>
          </a>
        </div>
      </Container>
    </section>
  );
}
