'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '../ui/Container';
import { ELEARNING_DATA } from '@/data/elearning-page';

export function ELearningClosingCTA() {
  const { finalCtaSection } = ELEARNING_DATA;

  return (
    <section className="relative py-20 sm:py-24 md:py-28 bg-[#102E2D] text-white border-t border-white/10 overflow-hidden">
      {/* Background Architectural Patterns */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15 [background-image:linear-gradient(to_right,rgba(22,182,184,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(22,182,184,0.15)_1px,transparent_1px)] [background-size:48px_48px]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#16B6B8]/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#5BC4CC]/15 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative z-10 text-center max-w-3xl mx-auto">
        {/* Monospace Editorial Indicator */}
        <div className="flex items-center justify-center gap-3 font-mono text-[11px] sm:text-xs text-white/60 uppercase tracking-widest mb-6 font-semibold">
          <span className="text-[#5BC4CC]">{finalCtaSection.eyebrow}</span>
          <span>&bull;</span>
          <span>ADMISSIONS &amp; ENROLLMENT</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.12] mb-6">
          {finalCtaSection.headline}
        </h2>

        {/* Exact Verbatim Supporting Paragraph */}
        <p className="text-[15.5px] sm:text-[17px] leading-[1.7] text-white/80 font-normal max-w-2xl mx-auto mb-4">
          {finalCtaSection.supportingParagraph}
        </p>

        {/* Closing Brand Statement */}
        <p className="text-xs sm:text-sm text-[#9CBDBA] leading-relaxed max-w-xl mx-auto mb-10">
          {finalCtaSection.closingBrandStatement}
        </p>

        {/* Interactive CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={finalCtaSection.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#16B6B8] hover:bg-[#5BC4CC] text-[#0A201F] font-bold text-sm transition-all duration-200 shadow-md transform hover:-translate-y-0.5 cursor-pointer"
          >
            <svg
              className="w-4 h-4 fill-current shrink-0"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
            </svg>
            <span>Chat with Admissions on WhatsApp</span>
          </a>

          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm transition-all duration-200"
          >
            <span>Contact Support Team</span>
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Institutional Accreditation Micro-Badge */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-4 text-xs text-[#5BC4CC]">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            ISO 9001:2015 Accredited IT Training Academy
          </span>
          <span className="text-white/30 hidden sm:inline">&bull;</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            100% Online Instructor-Led Digital Learning
          </span>
          <span className="text-white/30 hidden sm:inline">&bull;</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Direct 1-on-1 Placement Support
          </span>
        </div>
      </Container>
    </section>
  );
}
