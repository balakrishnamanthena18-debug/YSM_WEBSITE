'use client';

import React from 'react';
import { Container } from '../ui/Container';
import { ABOUT_PAGE_DATA } from '@/data/about-page';

export function AboutVisionMission() {
  const { vision, mission } = ABOUT_PAGE_DATA.visionMission;

  return (
    <section className="relative py-20 sm:py-24 md:py-28 bg-[#FFFFFF] border-b border-[#E3ECEA] overflow-hidden">
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
              <span className="text-[#176B68] font-bold">02 //</span>
              <span>STRATEGIC FOUNDATION</span>
              <span>•</span>
              <span>CORE PURPOSE &amp; OBJECTIVES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold tracking-tight text-[#111817] leading-[1.15]">
              Vision &amp; Mission
            </h2>
          </div>
          <p className="text-sm text-[#586765] max-w-md font-normal leading-relaxed">
            Guiding our commitment to technical mastery, student success, and global technological leadership.
          </p>
        </div>

        {/* Editorial Split Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* Card 01: Our Vision */}
          <div className="relative p-8 sm:p-10 md:p-12 rounded-2xl bg-[#F5F9F8] border border-[#E3ECEA] shadow-xs flex flex-col justify-between group hover:border-[#16B6B8] hover:bg-white hover:shadow-md transition-all duration-200">
            <div>
              {/* Header with Number and Category */}
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#E3ECEA] mb-6">
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#176B68]">
                  {vision.label}
                </span>
                <span className="font-mono text-xs text-[#586765]/60">
                  REF: 03.1
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-bold text-[#111817] tracking-tight mb-4 group-hover:text-[#176B68] transition-colors">
                {vision.title}
              </h3>

              {/* Verbatim Statement */}
              <p className="text-[15px] sm:text-[16px] leading-[1.8] text-[#586765] font-normal">
                {vision.statement}
              </p>
            </div>

            {/* Bottom Pillar Anchor */}
            <div className="mt-8 pt-6 border-t border-[#E3ECEA] flex items-center justify-between text-xs text-[#176B68] font-medium">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16B6B8]" />
                <span>Global Technology Standard</span>
              </div>
              <span className="font-mono text-[11px] text-[#586765]/60 uppercase tracking-wider">EST. HYDERABAD</span>
            </div>
          </div>

          {/* Card 02: Our Mission */}
          <div className="relative p-8 sm:p-10 md:p-12 rounded-2xl bg-[#F5F9F8] border border-[#E3ECEA] shadow-xs flex flex-col justify-between group hover:border-[#16B6B8] hover:bg-white hover:shadow-md transition-all duration-200">
            <div>
              {/* Header with Number and Category */}
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#E3ECEA] mb-6">
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#176B68]">
                  {mission.label}
                </span>
                <span className="font-mono text-xs text-[#586765]/60">
                  REF: 03.2
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-bold text-[#111817] tracking-tight mb-4 group-hover:text-[#176B68] transition-colors">
                {mission.title}
              </h3>

              {/* Verbatim Statement */}
              <p className="text-[15px] sm:text-[16px] leading-[1.8] text-[#586765] font-normal">
                {mission.statement}
              </p>
            </div>

            {/* Bottom Pillar Anchor */}
            <div className="mt-8 pt-6 border-t border-[#E3ECEA] flex items-center justify-between text-xs text-[#176B68] font-medium">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16B6B8]" />
                <span>Practitioner Mentorship</span>
              </div>
              <span className="font-mono text-[11px] text-[#586765]/60 uppercase tracking-wider">ISO 9001:2015</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
