'use client';

import React from 'react';
import { DetailedCourse, CourseTool } from '@/data/courses/types';
import { Container } from '@/components/ui/Container';
import { TechLogo } from './TechLogo';

interface CourseTechStackProps {
  course: DetailedCourse;
}

export function CourseTechStack({ course }: CourseTechStackProps) {
  if (!course.tools || course.tools.length === 0) return null;

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-[#E3ECEA]">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold bg-[#F5F9F8] text-[#176B68] border border-[#E3ECEA] mb-3">
            <span>TECHNOLOGIES &amp; LIBRARIES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#111817]">
            Tools &amp; Technologies Covered
          </h2>
        </div>

        {/* Technology Ecosystem Grid with Authentic Brand Logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {course.tools.map((tool: CourseTool, idx: number) => (
            <div
              key={idx}
              className="group p-4 sm:p-5 rounded-xl bg-[#F8FAFA] border border-[#E3ECEA] hover:border-[#176B68] hover:shadow-xs transition-all duration-200 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-[#4A5755] truncate max-w-[110px]">
                  {tool.category}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#176B68]" />
              </div>

              {/* Logo Visual Presentation */}
              <div className="my-2 h-16 w-full flex items-center justify-center rounded-xl bg-white border border-[#E3ECEA] shadow-2xs group-hover:border-[#176B68]/30 transition-colors">
                <TechLogo name={tool.name} size="lg" className="transition-transform duration-200 group-hover:scale-110" />
              </div>

              {/* Tool Name */}
              <div className="pt-2 border-t border-[#E3ECEA] text-center">
                <h3 className="font-bold text-sm text-[#111817] leading-snug group-hover:text-[#176B68] transition-colors">
                  {tool.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
