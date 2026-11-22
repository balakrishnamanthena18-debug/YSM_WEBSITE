'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '../ui/Container';
import { ELEARNING_DATA } from '@/data/elearning-page';

export function ELearningProgramsDirectory() {
  const { programsSection } = ELEARNING_DATA;
  const [filter, setFilter] = useState<string>('All');

  const categories = [
    'All',
    'Artificial Intelligence',
    'Data Analytics',
    'Cloud & DevOps',
    'Programming & Strategy',
  ];

  const filteredPrograms = programsSection.programs.filter((prog) => {
    if (filter === 'All') return true;
    if (filter === 'Artificial Intelligence') {
      return (
        prog.category.includes('Artificial Intelligence') ||
        prog.category.includes('Generative AI') ||
        prog.category.includes('AI Systems') ||
        prog.category.includes('Data Science')
      );
    }
    if (filter === 'Data Analytics') {
      return prog.category.includes('Data Analytics') || prog.title.includes('Excel') || prog.title.includes('Tableau') || prog.title.includes('Power BI');
    }
    if (filter === 'Cloud & DevOps') {
      return prog.category.includes('Cloud');
    }
    if (filter === 'Programming & Strategy') {
      return prog.category.includes('Programming') || prog.category.includes('Business & Strategy');
    }
    return true;
  });

  return (
    <section id="programs" className="py-20 sm:py-24 md:py-28 bg-[#F8FAFA] border-b border-[#E3ECEA] scroll-mt-12">
      <Container>
        {/* Editorial Section Masthead */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#E3ECEA] mb-12 sm:mb-14">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-[#586765] uppercase tracking-widest mb-2 font-semibold">
              <span className="text-[#176B68]">{programsSection.eyebrow}</span>
              <span>&bull;</span>
              <span>13 PROFESSIONAL TRACKS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold tracking-tight text-[#111817] leading-[1.15]">
              {programsSection.heading}
            </h2>
            <p className="text-sm sm:text-base text-[#586765] font-normal leading-relaxed mt-3">
              {programsSection.subheading}
            </p>
          </div>

          {/* Filter Pill Row */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  filter === cat
                    ? 'bg-[#176B68] text-white shadow-xs'
                    : 'bg-white text-[#586765] border border-[#E3ECEA] hover:bg-[#F5F8F7]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 13 Programs Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              className="flex flex-col justify-between bg-white rounded-2xl border border-[#E3ECEA] p-6 hover:border-[#16B6B8]/60 hover:shadow-md transition-all duration-200 group text-left"
            >
              <div>
                {/* Header: Track Number, Badge & Official Tech Logo */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] font-bold text-[#586765] uppercase tracking-wider block">
                      Track {program.number} of 13
                    </span>
                    <span className="inline-block text-[10.5px] font-semibold text-[#176B68] bg-[#F5F9F8] px-2 py-0.5 rounded">
                      {program.badge}
                    </span>
                  </div>

                  {/* Authentic Official Vector Logo without Borders */}
                  <div className="w-12 h-12 rounded-xl bg-[#F8FAFA] flex items-center justify-center shrink-0">
                    <Image
                      src={program.logo}
                      alt={program.logoAlt}
                      width={28}
                      height={28}
                      className="w-7 h-7 object-contain"
                      unoptimized
                    />
                  </div>
                </div>

                {/* Program Title */}
                <h3 className="text-lg sm:text-[19px] font-bold text-[#111817] group-hover:text-[#176B68] transition-colors leading-snug mb-2.5">
                  {program.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-[#586765] leading-relaxed line-clamp-3 mb-5">
                  {program.description}
                </p>
              </div>

              {/* Footer Meta Strip & Action */}
              <div className="pt-4 border-t border-[#E3ECEA] flex items-center justify-between">
                <div className="text-[11px] text-[#586765] space-x-2">
                  <span className="font-semibold text-[#111817]">{program.duration}</span>
                  <span>&bull;</span>
                  <span>{program.level}</span>
                </div>

                {program.hasCoursePage && program.slug ? (
                  <Link
                    href={`/courses/${program.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B68] hover:text-[#104E4D] group-hover:translate-x-0.5 transition-all"
                  >
                    <span>View Curriculum</span>
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </Link>
                ) : (
                  <a
                    href="https://wa.me/917997791456?text=Hi%20YSM%20Infotech%2C%20I%20would%20like%20to%20inquire%20about%20the%20Microsoft%20Fabric%20training%20track."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B68] hover:text-[#104E4D]"
                  >
                    <span>Inquire Cohort</span>
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
