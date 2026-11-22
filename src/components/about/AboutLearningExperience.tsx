'use client';

import React from 'react';
import { Container } from '../ui/Container';
import { ABOUT_PAGE_DATA } from '@/data/about-page';

export function AboutLearningExperience() {
  const { pillars } = ABOUT_PAGE_DATA;

  return (
    <section className="relative py-20 sm:py-24 md:py-28 bg-white border-b border-[#E3ECEA] overflow-hidden">
      <Container className="relative z-10">
        {/* Monospace Editorial Section Masthead */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E3ECEA] mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 font-mono text-[11px] sm:text-xs text-[#586765] uppercase tracking-widest mb-2">
              <span className="text-[#176B68] font-bold">03 //</span>
              <span>PEDAGOGICAL RIGOR</span>
              <span>•</span>
              <span>FOUR-PILLAR FRAMEWORK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold tracking-tight text-[#111817] leading-[1.15]">
              Our Courses Include
            </h2>
          </div>
          <p className="text-sm text-[#586765] max-w-md font-normal leading-relaxed">
            A comprehensive, four-pillar framework designed to bridge the gap between academic theory and enterprise production delivery.
          </p>
        </div>

        {/* Bento Grid Editorial Composition */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Pillar 01: Experienced Instructors (Span 7) — Deep Teal (#176B68) */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-2xl bg-[#F5F9F8] border border-[#E3ECEA] shadow-xs flex flex-col justify-between group hover:border-[#16B6B8] hover:bg-white hover:shadow-md transition-all duration-200">
            <div>
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#E3ECEA] mb-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[#176B68] tracking-wider uppercase bg-white px-2.5 py-1 rounded-md border border-[#E3ECEA]">
                    PILLAR {pillars[0].number}
                  </span>
                  <span className="text-xs text-[#E3ECEA]">•</span>
                  <span className="font-mono text-xs text-[#586765]">
                    {pillars[0].subtitle}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E3ECEA] flex items-center justify-center text-[#176B68] group-hover:bg-[#176B68] group-hover:text-white transition-all duration-200 shadow-2xs">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#111817] tracking-tight mb-3 group-hover:text-[#176B68] transition-colors">
                {pillars[0].title}
              </h3>

              <p className="text-[15.5px] leading-relaxed text-[#586765] font-normal max-w-xl">
                {pillars[0].description}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E3ECEA] flex flex-wrap items-center gap-4 text-xs font-medium text-[#586765]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16B6B8]" />
                Certified Subject Matter Experts
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16B6B8]" />
                Active Industry Practitioners
              </span>
            </div>
          </div>

          {/* Pillar 02: Hands on Experience (Span 5) — Primary Teal (#16B6B8) */}
          <div className="lg:col-span-5 p-8 sm:p-10 rounded-2xl bg-[#F5F9F8] border border-[#E3ECEA] shadow-xs flex flex-col justify-between group hover:border-[#16B6B8] hover:bg-white hover:shadow-md transition-all duration-200">
            <div>
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#E3ECEA] mb-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[#104E4D] tracking-wider uppercase bg-white px-2.5 py-1 rounded-md border border-[#E3ECEA]">
                    PILLAR {pillars[1].number}
                  </span>
                  <span className="text-xs text-[#E3ECEA]">•</span>
                  <span className="font-mono text-xs text-[#586765]">
                    {pillars[1].subtitle}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E3ECEA] flex items-center justify-center text-[#104E4D] group-hover:bg-[#104E4D] group-hover:text-white transition-all duration-200 shadow-2xs">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-[#111817] tracking-tight mb-3 group-hover:text-[#104E4D] transition-colors">
                {pillars[1].title}
              </h3>

              <p className="text-[15px] leading-relaxed text-[#586765] font-normal">
                {pillars[1].description}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E3ECEA] flex items-center gap-1.5 text-xs font-medium text-[#104E4D]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16B6B8]" />
              <span>Production-grade real-world projects</span>
            </div>
          </div>

          {/* Pillar 03: Career Guidance (Span 5) — Aqua / Deep Teal (#176B68) */}
          <div className="lg:col-span-5 p-8 sm:p-10 rounded-2xl bg-[#F5F9F8] border border-[#E3ECEA] shadow-xs flex flex-col justify-between group hover:border-[#16B6B8] hover:bg-white hover:shadow-md transition-all duration-200">
            <div>
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#E3ECEA] mb-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[#176B68] tracking-wider uppercase bg-white px-2.5 py-1 rounded-md border border-[#E3ECEA]">
                    PILLAR {pillars[2].number}
                  </span>
                  <span className="text-xs text-[#E3ECEA]">•</span>
                  <span className="font-mono text-xs text-[#586765]">
                    {pillars[2].subtitle}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E3ECEA] flex items-center justify-center text-[#176B68] group-hover:bg-[#176B68] group-hover:text-white transition-all duration-200 shadow-2xs">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-[#111817] tracking-tight mb-3 group-hover:text-[#176B68] transition-colors">
                {pillars[2].title}
              </h3>

              <p className="text-[15px] leading-relaxed text-[#586765] font-normal">
                {pillars[2].description}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E3ECEA] flex items-center gap-1.5 text-xs font-medium text-[#176B68]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16B6B8]" />
              <span>Resume support &amp; technical interview prep</span>
            </div>
          </div>

          {/* Pillar 04: Theoretical Knowledge (Span 7) — Dark Teal (#104E4D) */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-2xl bg-[#F5F9F8] border border-[#E3ECEA] shadow-xs flex flex-col justify-between group hover:border-[#16B6B8] hover:bg-white hover:shadow-md transition-all duration-200">
            <div>
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#E3ECEA] mb-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[#104E4D] tracking-wider uppercase bg-white px-2.5 py-1 rounded-md border border-[#E3ECEA]">
                    PILLAR {pillars[3].number}
                  </span>
                  <span className="text-xs text-[#E3ECEA]">•</span>
                  <span className="font-mono text-xs text-[#586765]">
                    {pillars[3].subtitle}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E3ECEA] flex items-center justify-center text-[#104E4D] group-hover:bg-[#104E4D] group-hover:text-white transition-all duration-200 shadow-2xs">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                    <path d="M6 6h10" />
                    <path d="M6 10h10" />
                  </svg>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#111817] tracking-tight mb-3 group-hover:text-[#104E4D] transition-colors">
                {pillars[3].title}
              </h3>

              <p className="text-[15.5px] leading-relaxed text-[#586765] font-normal max-w-xl">
                {pillars[3].description}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E3ECEA] flex flex-wrap items-center gap-4 text-xs font-medium text-[#586765]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16B6B8]" />
                Architectural depth &amp; conceptual mastery
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16B6B8]" />
                Current engineering trends &amp; paradigms
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
