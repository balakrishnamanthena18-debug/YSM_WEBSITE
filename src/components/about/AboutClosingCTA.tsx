'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '../ui/Container';
import { ABOUT_PAGE_DATA } from '@/data/about-page';

export function AboutClosingCTA() {
  const { closing } = ABOUT_PAGE_DATA;

  return (
    <section className="relative py-24 sm:py-28 md:py-32 bg-[#102E2D] text-white border-t border-white/10 overflow-hidden">
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
        <div className="flex items-center justify-center gap-3 font-mono text-[11px] sm:text-xs text-white/60 uppercase tracking-widest mb-6">
          <span className="text-[#5BC4CC] font-bold">06 //</span>
          <span>ADMISSIONS &amp; ENROLLMENT</span>
          <span>•</span>
          <span>START YOUR CAREER</span>
        </div>

        {/* Solid Confident Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.12] mb-6">
          Empowering Learners with Industry-Leading Tech Skills
        </h2>

        {/* Verbatim Supporting Text */}
        <p className="text-[15.5px] sm:text-[17px] leading-[1.7] text-white/75 font-normal max-w-2xl mx-auto mb-10">
          {closing.description}
        </p>

        {/* Interactive CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={closing.ctaPrimary.href}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-lg bg-[#176B68] hover:bg-[#104E4D] text-white font-semibold text-sm transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <span>{closing.ctaPrimary.label}</span>
            <svg
              className="w-4 h-4 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>

          <a
            href={closing.ctaWhatsApp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm transition-all duration-200"
          >
            <span className="w-2 h-2 rounded-full bg-[#5BC4CC]" />
            <span>{closing.ctaWhatsApp.label}</span>
          </a>
        </div>
      </Container>
    </section>
  );
}
