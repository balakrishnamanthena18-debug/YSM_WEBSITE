import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Program } from '@/data/programs';

interface FeaturedProgramCardProps {
  program: Program;
}

export function FeaturedProgramCard({ program }: FeaturedProgramCardProps) {
  return (
    <article className="group relative w-full rounded-[26px] sm:rounded-[30px] lg:rounded-[32px] bg-white border border-[#071B1C]/8 shadow-lg shadow-[#006B68]/5 hover:shadow-xl hover:shadow-[#006B68]/8 hover:border-[#006B68]/25 transition-all duration-300 overflow-hidden mb-10 sm:mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        
        {/* LEFT COLUMN: Program Details (~55% / 7 cols) */}
        <div className="lg:col-span-7 p-7 sm:p-9 md:p-12 flex flex-col justify-between">
          <div>
            {/* Category & Badge */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-[11px] sm:text-[11.5px] font-semibold tracking-[0.14em] uppercase text-[#006B68] bg-[#006B68]/8 px-3 py-1 rounded-full border border-[#006B68]/15">
                {program.categoryLabel}
              </span>
              {program.featured && (
                <span className="text-[11px] font-medium text-[#071B1C]/60 tracking-wider uppercase">
                  FEATURED CURRICULUM
                </span>
              )}
            </div>

            {/* Program Title */}
            <h3 className="text-[26px] sm:text-[32px] md:text-[38px] font-normal leading-[1.12] tracking-[-0.03em] text-[#071B1C] mb-4 group-hover:text-[#006B68] transition-colors duration-200">
              {program.title}
            </h3>

            {/* Description */}
            <p className="text-[15px] sm:text-[16.5px] leading-[1.6] text-[#071B1C]/75 font-normal max-w-xl mb-6">
              {program.description}
            </p>

            {/* Learning Format */}
            {program.format && (
              <div className="flex items-center gap-2 text-xs font-medium text-[#071B1C]/65 mb-7">
                <span className="w-1.5 h-1.5 rounded-full bg-[#12AFA8]" />
                <span>{program.format}</span>
              </div>
            )}

            {/* Technology Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
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

          {/* CTA Link */}
          <div>
            <Link
              href={program.href}
              className="inline-flex items-center gap-3 h-[48px] sm:h-[50px] pl-6 pr-2 rounded-full bg-[#006B68] text-white text-[13.5px] font-medium tracking-wide hover:bg-[#005754] transition-all duration-200 shadow-sm shadow-[#006B68]/20 group-hover:shadow-md"
            >
              <span>VIEW PROGRAM</span>
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

        {/* RIGHT COLUMN: Architectural Technology Visual (~45% / 5 cols) */}
        <div className="lg:col-span-5 relative min-h-[280px] sm:min-h-[340px] lg:min-h-full bg-[#071B1C]/5 overflow-hidden border-t lg:border-t-0 lg:border-l border-[#071B1C]/8">
          {program.visualPath ? (
            <Image
              src={program.visualPath}
              alt={`${program.title} computational architecture visual`}
              fill
              sizes="(max-width: 1024px) 100vw, 480px"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center p-8 bg-gradient-to-br from-[#082C35] to-[#071B1C] text-white">
              <span className="text-sm font-mono text-[#12AFA8]">{program.title}</span>
            </div>
          )}
        </div>

      </div>
    </article>
  );
}
