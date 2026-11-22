'use client';

import React, { useState } from 'react';
import { DetailedCourse, CourseFAQ as FAQType } from '@/data/courses/types';
import { Container } from '@/components/ui/Container';

interface CourseFAQProps {
  course: DetailedCourse;
}

export function CourseFAQ({ course }: CourseFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!course.faqs || course.faqs.length === 0) return null;

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#E3ECEA]">
      <Container>
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#F5F9F8] text-[#176B68] border border-[#E3ECEA] mb-3">
            <span>FREQUENTLY ASKED QUESTIONS</span>
            <span>&bull;</span>
            <span>CLARITY &amp; ADMISSIONS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#111817]">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-[#586765] leading-relaxed">
            Everything you need to know about the curriculum, schedule, mentorship, and career support.
          </p>
        </div>

        <div className="max-w-3xl space-y-3.5">
          {course.faqs.map((faq: FAQType, idx: number) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${isOpen
                    ? 'border-[#16B6B8]/50 bg-[#F5F9F8]'
                    : 'border-[#E3ECEA] bg-white hover:border-[#16B6B8]/30'
                  }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16B6B8]"
                >
                  <span className="text-sm sm:text-base font-bold text-[#111817] pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen
                        ? 'rotate-180 bg-[#176B68] text-white'
                        : 'bg-[#F5F9F8] text-[#586765]'
                      }`}
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-[#586765] leading-relaxed border-t border-[#E3ECEA]/60">
                    {faq.answer}
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

