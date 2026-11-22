import React from 'react';
import Link from 'next/link';
import { Program } from '@/data/programs';

interface SupportingProgramCardProps {
  program: Program;
}

export function SupportingProgramCard({ program }: SupportingProgramCardProps) {
  return (
    <article className="group relative flex flex-col justify-between rounded-[20px] bg-white border border-[#071B1C]/8 p-6 sm:p-7 transition-all duration-300 hover:border-[#006B68]/30 hover:shadow-lg hover:shadow-[#006B68]/5 hover:-translate-y-1">
      <div>
        {/* Category Label */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#006B68]">
            {program.categoryLabel}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#12AFA8]/60 group-hover:bg-[#006B68] transition-colors duration-200" />
        </div>

        {/* Title */}
        <h4 className="text-[19px] sm:text-[20px] font-normal leading-[1.25] tracking-[-0.02em] text-[#071B1C] mb-3 group-hover:text-[#006B68] transition-colors duration-200">
          <Link href={program.href} className="focus-visible:outline-none">
            {program.title}
          </Link>
        </h4>

        {/* Description */}
        <p className="text-[14px] leading-[1.58] text-[#071B1C]/70 font-normal mb-5">
          {program.description}
        </p>
      </div>

      <div>
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#071B1C]/6 mb-4">
          {program.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium text-[#071B1C]/65 bg-[#F5FAF9] px-2.5 py-1 rounded-md border border-[#071B1C]/4"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Arrow Action */}
        <div className="flex items-center justify-between pt-1">
          <Link
            href={program.href}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#006B68] group-hover:text-[#005754] transition-colors duration-200"
            aria-label={`Learn more about ${program.title}`}
          >
            <span>Explore Syllabus</span>
            <svg
              className="w-3.5 h-3.5 text-[#006B68] transition-transform duration-200 group-hover:translate-x-1"
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
          </Link>
        </div>
      </div>
    </article>
  );
}
