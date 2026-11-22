'use client';

import React from 'react';
import { Container } from '../ui/Container';
import { ABOUT_PAGE_DATA } from '@/data/about-page';

export function AboutTestimonials() {
  const { testimonials } = ABOUT_PAGE_DATA;

  return (
    <section className="relative py-20 sm:py-24 md:py-28 bg-[#F5F9F8] border-b border-[#E3ECEA] overflow-hidden">
      {/* Background Ambience */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(22,182,184,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(22,182,184,0.03)_1px,transparent_1px)] [background-size:56px_56px]"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        {/* Monospace Editorial Section Masthead */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E3ECEA] mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 font-mono text-[11px] sm:text-xs text-[#586765] uppercase tracking-widest mb-2">
              <span className="text-[#176B68] font-bold">04 //</span>
              <span>TESTIMONIALS</span>
              <span>•</span>
              <span>AUTHENTIC EXPERIENCES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold tracking-tight text-[#111817] leading-[1.15]">
              What Our Students Say
            </h2>
          </div>
          <p className="text-sm text-[#586765] max-w-md font-normal leading-relaxed">
            Authentic experiences shared by learners across our professional programming, data, and cloud specializations.
          </p>
        </div>

        {/* 2x2 Editorial Quotes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch max-w-5xl mx-auto">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-8 sm:p-10 rounded-2xl bg-white border border-[#E3ECEA] shadow-xs flex flex-col justify-between group hover:border-[#16B6B8] hover:shadow-md transition-all duration-200"
            >
              <div>
                {/* Quotation Marker */}
                <div className="text-[#176B68]/30 text-4xl leading-none font-serif select-none mb-3">
                  &ldquo;
                </div>

                {/* Verbatim Quote */}
                <p className="text-[15px] sm:text-[16px] leading-[1.75] text-[#586765] font-normal">
                  {t.quote}
                </p>
              </div>

              {/* Attribution */}
              <div className="mt-8 pt-6 border-t border-[#E3ECEA] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#176B68] text-white flex items-center justify-center font-bold text-sm shadow-2xs">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#111817]">
                      {t.author}
                    </h3>
                    <p className="font-mono text-[11px] text-[#586765]/60">
                      ALUMNI VERIFIED
                    </p>
                  </div>
                </div>

                {/* Course Tag */}
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-[#F5F9F8] text-[#176B68] border border-[#E3ECEA]">
                  {t.course}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
