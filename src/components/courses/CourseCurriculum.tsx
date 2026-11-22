'use client';

import React, { useState } from 'react';
import { DetailedCourse, CourseCurriculumModule } from '@/data/courses/types';
import { Container } from '@/components/ui/Container';

interface CourseCurriculumProps {
  course: DetailedCourse;
}

function getCurriculumModuleIcon(index: number) {
  switch (index) {
    case 0:
      return (
        <svg className="w-4 h-4 text-[#176B68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      );
    case 1:
      return (
        <svg className="w-4 h-4 text-[#176B68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="6" height="6" rx="1" />
          <rect x="15" y="15" width="6" height="6" rx="1" />
          <path d="M9 6h6v6" />
        </svg>
      );
    case 2:
      return (
        <svg className="w-4 h-4 text-[#176B68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" />
          <path d="M2 20h20" />
        </svg>
      );
    case 3:
      return (
        <svg className="w-4 h-4 text-[#176B68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        </svg>
      );
    case 4:
      return (
        <svg className="w-4 h-4 text-[#176B68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" />
        </svg>
      );
    case 5:
      return (
        <svg className="w-4 h-4 text-[#176B68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      );
    case 6:
      return (
        <svg className="w-4 h-4 text-[#176B68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    case 7:
      return (
        <svg className="w-4 h-4 text-[#176B68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      );
    case 8:
      return (
        <svg className="w-4 h-4 text-[#176B68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
    case 9:
      return (
        <svg className="w-4 h-4 text-[#176B68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2" />
        </svg>
      );
    case 10:
      return (
        <svg className="w-4 h-4 text-[#176B68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
        </svg>
      );
    default:
      return (
        <svg className="w-4 h-4 text-[#176B68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      );
  }
}

export function CourseCurriculum({ course }: CourseCurriculumProps) {
  const [expandedIndices, setExpandedIndices] = useState<number[]>([0, 1]);

  const toggleModule = (index: number) => {
    setExpandedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const expandAll = () => {
    setExpandedIndices(course.modules.map((_, i) => i));
  };

  const collapseAll = () => {
    setExpandedIndices([]);
  };

  const allExpanded = expandedIndices.length === course.modules.length;

  return (
    <section id="curriculum" className="py-16 sm:py-22 bg-[#F5F8F7] border-b border-[#E3ECEA] scroll-mt-16">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold bg-white text-[#176B68] border border-[#E3ECEA] mb-3">
              <span>COURSE CURRICULUM</span>
              <span>&bull;</span>
              <span>{course.modules.length} MODULES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#111817]">
              Course Curriculum
            </h2>
          </div>

          {/* Master Controls */}
          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
            <button
              type="button"
              onClick={allExpanded ? collapseAll : expandAll}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-[#176B68] bg-white hover:bg-[#E3ECEA]/40 border border-[#E3ECEA] transition-colors cursor-pointer"
            >
              <span>{allExpanded ? 'Collapse All' : 'Expand All'}</span>
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  allExpanded ? 'rotate-180' : ''
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>
        </div>

        {/* Structured Curriculum Stack */}
        <div className="space-y-3.5">
          {course.modules.map((mod: CourseCurriculumModule, index: number) => {
            const isExpanded = expandedIndices.includes(index);
            const totalSubtopics = mod.topics.reduce(
              (acc, t) => acc + (t.items?.length || 1),
              0
            );

            return (
              <div
                key={index}
                className={`rounded-xl transition-all duration-150 border ${
                  isExpanded
                    ? 'bg-white border-[#176B68] shadow-sm'
                    : 'bg-white border-[#E3ECEA] hover:border-[#176B68]/40'
                } overflow-hidden`}
              >
                {/* Header Row */}
                <button
                  type="button"
                  onClick={() => toggleModule(index)}
                  aria-expanded={isExpanded}
                  className="w-full p-4 sm:p-5 text-left flex items-start sm:items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-[#F5F8F7] border border-[#E3ECEA] flex items-center justify-center shrink-0">
                      {getCurriculumModuleIcon(index)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-mono text-[11px] font-bold text-[#176B68] uppercase tracking-wider">
                          Module {mod.number}
                        </span>
                        <span className="text-[11px] text-[#4A5755] font-medium">
                          &bull; {totalSubtopics} Topics
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-[#111817] leading-snug">
                        {mod.title}
                      </h3>
                    </div>
                  </div>

                  <div className="text-[#176B68] p-1 shrink-0">
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-[#E3ECEA] bg-[#FAFCFB]">
                    <div className="space-y-4 pt-3">
                      {mod.topics.map((topic, topicIdx) => (
                        <div key={topicIdx} className="space-y-2">
                          {topic.title && topic.title !== mod.title && (
                            <div className="text-xs font-bold uppercase tracking-wider text-[#176B68]">
                              {topic.title}
                            </div>
                          )}

                          {topic.items && topic.items.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                              {topic.items.map((item, itemIdx) => (
                                <div
                                  key={itemIdx}
                                  className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white border border-[#E3ECEA] text-xs sm:text-[13px] text-[#111817]"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#176B68] shrink-0" />
                                  <span className="leading-snug">{item}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
