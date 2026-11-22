'use client';

import React from 'react';
import Link from 'next/link';
import { DetailedCourse } from '@/data/courses/types';
import { Container } from '@/components/ui/Container';
import { CourseTechIcon } from '@/components/CourseTechIcon';

interface RelatedCoursesProps {
  courses: DetailedCourse[];
}

export function RelatedCourses({ courses }: RelatedCoursesProps) {
  if (!courses || courses.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-[#E3ECEA]">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold bg-[#F5F9F8] text-[#176B68] border border-[#E3ECEA] mb-3">
              <span>EXPLORE MORE</span>
              <span>&bull;</span>
              <span>RELATED PROGRAMS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111817]">
              Related Specialized Tracks
            </h2>
          </div>

          <Link
            href="/#programs"
            className="text-xs font-bold uppercase tracking-wider text-[#176B68] hover:text-[#104E4D] transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>View All Programs</span>
            <svg
              className="w-3.5 h-3.5"
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
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((rel) => (
            <Link
              key={rel.slug}
              href={`/courses/${rel.slug}`}
              className="bg-[#F8FAFA] rounded-xl border border-[#E3ECEA] p-6 hover:bg-white hover:border-[#176B68] transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white text-[#176B68] border border-[#E3ECEA]">
                    {rel.level}
                  </span>
                  <span className="text-[11px] font-semibold text-[#586765]">
                    {rel.duration} &bull; ★ {rel.rating}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-base font-bold text-[#111817] leading-snug">
                    {rel.title}
                  </h3>
                  <CourseTechIcon
                    type={rel.iconType}
                    accent={rel.accent}
                    size="sm"
                    showGlow={false}
                    className="shrink-0"
                  />
                </div>

                <p className="text-xs sm:text-[13px] text-[#4A5755] line-clamp-2 leading-relaxed mb-4">
                  {rel.overviewParagraphs && rel.overviewParagraphs[0]
                    ? rel.overviewParagraphs[0]
                    : `Comprehensive professional curriculum in ${rel.title}.`}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E3ECEA] flex items-center justify-between text-xs font-semibold text-[#176B68]">
                <span>Explore Track &amp; Syllabus</span>
                <span>&rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
