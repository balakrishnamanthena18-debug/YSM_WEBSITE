import React from 'react';
import Link from 'next/link';
import { Program } from '@/data/programs';

interface WideEditorialProgramProps {
  program: Program;
}

export function WideEditorialProgram({ program }: WideEditorialProgramProps) {
  return (
    <article className="group relative w-full max-w-4xl rounded-[24px] sm:rounded-[28px] bg-white border border-[#071B1C]/8 shadow-lg shadow-[#006B68]/5 hover:shadow-xl hover:shadow-[#006B68]/8 hover:border-[#006B68]/25 transition-all duration-300 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
        
        {/* MAIN PROGRAM CONTENT (~68% / 8 cols) */}
        <div className="md:col-span-8 p-7 sm:p-9 md:p-11 flex flex-col justify-between">
          <div>
            {/* Category Tag */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] sm:text-[11.5px] font-semibold tracking-[0.14em] uppercase text-[#006B68] bg-[#006B68]/8 px-3 py-1 rounded-full border border-[#006B68]/15">
                {program.categoryLabel}
              </span>
              <span className="text-[11px] font-medium tracking-wider uppercase text-[#071B1C]/50">
                SPECIALIZED CURRICULUM
              </span>
            </div>

            {/* Title */}
            <h3 className="text-[24px] sm:text-[30px] md:text-[34px] font-normal leading-[1.15] tracking-[-0.03em] text-[#071B1C] mb-4 group-hover:text-[#006B68] transition-colors duration-200">
              {program.title}
            </h3>

            {/* Description */}
            <p className="text-[15px] sm:text-[16px] leading-[1.62] text-[#071B1C]/75 font-normal max-w-xl mb-6">
              {program.description}
            </p>

            {/* Technology Tags */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-[#071B1C]/6 mb-8">
              {program.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium bg-[#F5FAF9] text-[#071B1C]/80 px-3 py-1.5 rounded-lg border border-[#071B1C]/6"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Link */}
          <div>
            <Link
              href={program.href}
              className="inline-flex items-center gap-3 h-[46px] sm:h-[48px] pl-6 pr-2 rounded-full bg-[#006B68] text-white text-[13.5px] font-medium tracking-wide hover:bg-[#005754] transition-all duration-200 shadow-sm shadow-[#006B68]/20 group-hover:shadow-md active:scale-[0.98]"
            >
              <span>EXPLORE SYLLABUS</span>
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1 group-hover:bg-white/25">
                <svg
                  className="w-3.5 h-3.5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {/* SUBTLE ARCHITECTURAL / TECHNICAL BLUEPRINT SIDE (~32% / 4 cols) */}
        <div className="md:col-span-4 relative bg-gradient-to-br from-[#F5FAF9] to-[#EAF7FA]/60 p-7 md:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-[#071B1C]/8 overflow-hidden">
          {/* Faint architectural coordinate pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(#006B68_1px,transparent_1px)] [background-size:16px_16px]"
            aria-hidden="true"
          />

          <div className="relative z-10">
            <span className="text-[10.5px] font-mono uppercase tracking-[0.18em] text-[#006B68]/70 block mb-1">
              DOMAIN TRACK
            </span>
            <span className="text-2xl font-light font-mono text-[#071B1C]/25 tracking-tighter">
              01 // {program.category.toUpperCase().replace('-', '_')}
            </span>
          </div>

          <div className="relative z-10 pt-8 sm:pt-12 md:pt-16">
            <div className="space-y-2 text-xs font-mono text-[#071B1C]/60">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#12AFA8]" />
                <span>Industry Alignment</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006B68]" />
                <span>Applied Projects</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </article>
  );
}
