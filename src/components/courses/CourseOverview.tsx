'use client';

import React from 'react';
import Image from 'next/image';
import { DetailedCourse } from '@/data/courses/types';
import { Container } from '@/components/ui/Container';

interface CourseOverviewProps {
  course: DetailedCourse;
}

export function CourseOverview({ course }: CourseOverviewProps) {
  return (
    <section className="py-14 sm:py-20 bg-white border-b border-[#E3ECEA]">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold bg-[#F5F9F8] text-[#176B68] border border-[#E3ECEA] mb-3">
            <span>COURSE OVERVIEW</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#111817]">
            About the Program
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Authentic Paragraphs & Beginner Foundation Note */}
          <div className="lg:col-span-7 space-y-5">
            {/* Lead Overview Paragraph */}
            {course.overviewParagraphs.length > 0 && (
              <p className="text-base sm:text-lg font-medium text-[#111817] leading-[1.7] border-l-3 border-[#16B6B8] pl-4 sm:pl-5">
                {course.overviewParagraphs[0]}
              </p>
            )}

            {/* Secondary Paragraph */}
            {course.overviewParagraphs.length > 1 && (
              <p className="text-[15px] sm:text-base text-[#4A5755] leading-[1.8]">
                {course.overviewParagraphs[1]}
              </p>
            )}

            {/* Beginner Foundation Note */}
            {course.overviewParagraphs.length > 2 && (
              <div className="p-4 rounded-xl bg-[#F8FAFA] border border-[#E3ECEA]">
                <p className="text-sm text-[#111817] font-medium leading-relaxed">
                  {course.overviewParagraphs[2]}
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Training Covers List */}
          <div className="lg:col-span-5 space-y-6">
            {/* Practical Laboratory Photo */}
            <div className="relative rounded-xl overflow-hidden border border-[#E3ECEA] shadow-xs bg-[#0A201F]">
              <div className="relative h-48 sm:h-52 w-full">
                <Image
                  src="/images/courses/ai-analytics-lab.webp"
                  alt="Enterprise AI and technology technical training laboratory"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* Authentic The Training Covers List */}
            <div className="rounded-xl bg-[#F8FAFA] border border-[#E3ECEA] p-6 shadow-2xs">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E3ECEA]">
                <div className="w-2 h-2 rounded-full bg-[#16B6B8]" />
                <h3 className="text-base font-bold text-[#111817]">
                  {course.highlightsTitle || 'The training covers:'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {course.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 text-xs sm:text-[13px] text-[#111817] font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#176B68] shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
