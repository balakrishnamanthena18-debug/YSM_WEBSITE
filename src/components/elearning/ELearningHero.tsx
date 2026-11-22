'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '../ui/Container';
import { ELEARNING_DATA } from '@/data/elearning-page';

export function ELearningHero() {
  const { hero } = ELEARNING_DATA;

  return (
    <section className="relative bg-[#0B201F] text-white pt-10 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28 border-b border-[#163635] overflow-hidden">
      {/* Background Architectural Patterns */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15 [background-image:linear-gradient(to_right,rgba(22,182,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(22,182,184,0.12)_1px,transparent_1px)] [background-size:56px_56px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-40 right-1/4 w-[600px] h-[600px] rounded-full bg-[#16B6B8]/10 blur-[140px]"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs sm:text-[13px] text-[#9CBDBA] mb-8 font-sans"
        >
          <Link
            href="/"
            className="hover:text-white transition-colors underline-offset-4 hover:underline"
          >
            Home
          </Link>
          <span className="text-white/30">&rsaquo;</span>
          <span className="text-white font-medium">E-Learning</span>
        </nav>

        {/* Asymmetric Editorial 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column (7 cols): Editorial Typography & Direct Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Accreditation Badge */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs">
              <span className="font-mono text-[11px] font-bold tracking-wider uppercase text-[#5BC4CC] bg-white/5 px-3 py-1 rounded border border-white/10">
                {hero.eyebrow}
              </span>
              <span className="text-white/30 hidden sm:inline">&bull;</span>
              <span className="text-xs font-medium text-[#D8E6E4] hidden sm:inline">
                Live &amp; On-Demand Digital Training
              </span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold tracking-tight text-white leading-[1.12]">
                {hero.headline}
              </h1>
            </div>

            {/* Lead Supporting Paragraphs */}
            <div className="space-y-4 text-base sm:text-[17px] text-[#D8E6E4] leading-[1.75] font-normal max-w-2xl">
              <p>{hero.leadParagraph}</p>
              <p className="text-sm sm:text-base text-[#B0CAC7] leading-relaxed border-l-2 border-[#16B6B8] pl-4 italic">
                &ldquo;{hero.secondaryParagraph}&rdquo;
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="https://wa.me/917997791456?text=Hi%20YSM%20Infotech%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20E-Learning%20programs%20and%20upcoming%20batch%20timings."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg font-bold text-sm bg-[#16B6B8] text-[#0A201F] hover:bg-[#5BC4CC] transition-colors shadow-sm cursor-pointer"
              >
                <svg
                  className="w-4 h-4 fill-current shrink-0"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                </svg>
                <span>Enroll / Inquire on WhatsApp</span>
              </a>

              <a
                href="#programs"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-colors"
              >
                <span>Explore 13 Programs</span>
                <svg
                  className="w-4 h-4 text-[#5BC4CC]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Micro Credential Grid */}
            <div className="pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {hero.stats.map((stat, idx) => (
                <div key={idx} className="space-y-0.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#8BB8B4] block">
                    {stat.label}
                  </span>
                  <span className="text-sm font-bold text-white tracking-tight">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (5 cols): Authentic Corporate Digital Learning Photography */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#081B1A] shadow-2xl">
              <div className="relative aspect-[4/3] w-full bg-[#081B1A]">
                <Image
                  src="/images/hero/Focused Remote Work Setup.png"
                  alt="Software engineer participating in high-definition interactive online training"
                  fill
                  sizes="(max-width: 768px) 100vw, 520px"
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081B1A] via-transparent to-transparent opacity-60" />
              </div>

              {/* Verified Institutional Caption */}
              <div className="p-5 bg-[#081B1A] border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] text-[#5BC4CC] uppercase tracking-wider block font-semibold">
                    ENTERPRISE DIGITAL TRAINING
                  </span>
                  <p className="text-xs text-white/90 font-medium mt-0.5">
                    Live Instructor-Led Virtual Labs &bull; Batch Schedules Available
                  </p>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
