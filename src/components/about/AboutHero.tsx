'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '../ui/Container';
import { ABOUT_PAGE_DATA } from '@/data/about-page';

export function AboutHero() {
  const { hero, introduction, pillars } = ABOUT_PAGE_DATA;

  return (
    <div className="relative w-full">
      {/* =========================================================================
          PART 1: CINEMATIC DARK TEAL HERO STAGE (#102E2D)
          Matches reference design: deep emerald canvas, white headline, pill CTA,
          and signature central image card with floating glass rating badge
          ========================================================================= */}
      <section className="relative pt-28 sm:pt-32 md:pt-36 pb-20 sm:pb-28 lg:pb-36 bg-[#102E2D] text-white overflow-hidden">
        {/* Subtle Background Architectural Coordinate Grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-15 [background-image:linear-gradient(to_right,rgba(22,182,184,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(22,182,184,0.15)_1px,transparent_1px)] [background-size:64px_64px]"
          aria-hidden="true"
        />

        {/* Ambient Radial Teal Lighting Blooms */}
        <div
          className="pointer-events-none absolute -top-20 right-1/4 w-[600px] h-[600px] rounded-full bg-[#16B6B8]/15 blur-[140px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-1/3 -right-24 w-[500px] h-[500px] rounded-full bg-[#5BC4CC]/10 blur-[130px]"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          {/* Top Editorial Eyebrow Tag */}
          <div className="mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#5BC4CC] text-xs font-semibold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#16B6B8] animate-pulse" />
              <span>01 // WHO WE ARE • ISO 9001:2015 ACCREDITED</span>
            </div>
          </div>

          {/* Main Headline & Supporting Paragraph / CTA Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12 sm:mb-16">
            <div className="lg:col-span-7">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold tracking-tight text-white leading-[1.14]">
                Empowering Learners with Industry-Leading Tech Skills
              </h1>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col justify-end gap-4 lg:gap-5">
              <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/80 font-normal">
                {hero.description}
              </p>

              <div className="pt-1 flex items-center gap-4">
                <Link
                  href="/#programs"
                  className="group inline-flex items-center justify-center gap-2.5 h-11 sm:h-12 px-7 rounded-full bg-[#176B68] hover:bg-[#104E4D] text-white font-semibold text-sm tracking-wide shadow-sm hover:shadow-lg hover:shadow-[#176B68]/30 transition-all duration-200 active:scale-[0.98]"
                >
                  <span>Explore Courses</span>
                  <svg
                    className="w-4 h-4 text-white transition-transform duration-200 group-hover:translate-x-1"
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

                <Link
                  href="https://wa.me/917997791456?text=Hi%20YSM%20Infotech%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20academy."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-11 sm:h-12 px-6 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-sm transition-all duration-200"
                >
                  <span>Admissions Help</span>
                </Link>
              </div>
            </div>
          </div>

          {/* =========================================================================
              SIGNATURE FEATURED PHOTO CARD WITH FLOATING GLASS BADGE
              Matches central photo card in reference design
              ========================================================================= */}
          <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-[#0D2625] aspect-[16/9] max-h-[540px]">
            <Image
              src="/images/hero/ysm-about-learning-hero.jpg"
              alt="YSM Infotech hands-on technology learning lab with learners and mentor"
              fill
              priority
              sizes="(max-width: 1440px) 100vw, 1380px"
              className="object-cover object-center scale-[1.01] transition-transform duration-700 hover:scale-[1.03]"
              quality={92}
            />

            {/* Subtle Gradient Vignette to ground the photo */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#102E2D]/70 via-transparent to-transparent pointer-events-none"
              aria-hidden="true"
            />

            {/* FLOATING GLASS RATING BADGE (Matches reference `( 4.8 )` pill exactly) */}
            <div className="absolute top-4 left-4 sm:top-7 sm:left-7 px-4 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-[#102E2D]/85 sm:bg-white/15 backdrop-blur-md border border-white/30 text-white shadow-2xl flex items-center gap-3 sm:gap-4 select-none">
              <div className="flex items-center gap-1 font-bold text-xl sm:text-2xl tracking-tight text-white">
                <span className="text-[#5BC4CC] font-serif font-normal text-lg sm:text-xl">(</span>
                <span>4.8</span>
                <span className="text-[#5BC4CC] font-serif font-normal text-lg sm:text-xl">)</span>
              </div>

              <div className="h-7 w-px bg-white/25" />

              <div>
                <div className="flex items-center gap-1 text-[#5BC4CC] text-xs sm:text-sm">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
                <span className="text-[10.5px] sm:text-[11.5px] font-semibold text-white/90 block mt-0.5 tracking-wide">
                  ISO 9001:2015 &bull; 1,000+ Alumni
                </span>
              </div>
            </div>

            {/* Bottom Photo Caption Strip */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-7 sm:right-7 flex items-center justify-between text-xs text-white/80 font-mono tracking-wider uppercase">
              <div className="hidden sm:block">FIG. 01 — HANDS-ON TECHNOLOGY LEARNING LAB</div>
              <div className="bg-black/40 backdrop-blur-xs px-3 py-1 rounded-md border border-white/15 text-[11px]">
                HYDERABAD CAMPUS &bull; LIVE MENTORSHIP &amp; LABS
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          PART 2: SIX-CARD BENTO GRID ON SOFT CANVAS (#F5F9F8)
          Directly matches the 3x2 bento card layout shown below the photo in the reference
          ========================================================================= */}
      <section id="bento-features" className="relative py-20 sm:py-24 md:py-28 bg-[#F5F9F8] border-b border-[#E3ECEA] overflow-hidden">
        {/* Subtle Background Pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(22,182,184,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(22,182,184,0.035)_1px,transparent_1px)] [background-size:48px_48px]"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          {/* Asymmetric 3x2 Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
            
            {/* --- CARD 1 (Top-Left): ISO Certified Quality --- */}
            <div className="p-7 sm:p-8 rounded-2xl bg-white border border-[#E3ECEA] shadow-xs flex flex-col justify-between group hover:border-[#16B6B8] hover:shadow-md transition-all duration-200">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#F5F9F8] border border-[#E3ECEA] text-[#176B68] flex items-center justify-center mb-6 shadow-2xs group-hover:bg-[#176B68] group-hover:text-white transition-all duration-200">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="6" />
                    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-[#111817] mb-2.5 group-hover:text-[#176B68] transition-colors">
                  ISO Certified IT Training
                </h3>
                <p className="text-[14.5px] leading-relaxed text-[#586765] font-normal">
                  {introduction.paragraphs[0]}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-[#E3ECEA] flex items-center gap-2 text-xs font-semibold text-[#176B68]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16B6B8]" />
                <span>ISO 9001:2015 Accredited</span>
              </div>
            </div>

            {/* --- CARD 2 (Top-Center): Center Asymmetric Highlight Card --- */}
            <div className="p-7 sm:p-8 rounded-2xl bg-gradient-to-br from-[#102E2D] to-[#176B68] text-white shadow-md flex flex-col justify-between group hover:shadow-xl transition-all duration-200">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#5BC4CC] text-[10.5px] font-bold uppercase tracking-wider mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16B6B8]" />
                  <span>CHOOSE THE BEST</span>
                </div>
                <h3 className="text-2xl sm:text-[26px] font-bold tracking-tight text-white mb-3 leading-snug">
                  Solutions Built for Technology Careers.
                </h3>
                <p className="text-[14.5px] leading-relaxed text-white/80 font-normal">
                  {introduction.paragraphs[1]}
                </p>
              </div>

              <div className="mt-7 pt-5 border-t border-white/15">
                <Link
                  href="/#programs"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#104E4D] hover:bg-[#F5F9F8] text-xs font-bold tracking-wide transition-all shadow-sm active:scale-[0.98]"
                >
                  <span>Explore Courses</span>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* --- CARD 3 (Top-Right): Expert Team / Instructors --- */}
            <div className="p-7 sm:p-8 rounded-2xl bg-white border border-[#E3ECEA] shadow-xs flex flex-col justify-between group hover:border-[#16B6B8] hover:shadow-md transition-all duration-200">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#F5F9F8] border border-[#E3ECEA] text-[#176B68] flex items-center justify-center mb-6 shadow-2xs group-hover:bg-[#176B68] group-hover:text-white transition-all duration-200">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-[#111817] mb-2.5 group-hover:text-[#176B68] transition-colors">
                  {pillars[0].title}
                </h3>
                <p className="text-[14.5px] leading-relaxed text-[#586765] font-normal">
                  {pillars[0].description}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-[#E3ECEA] flex items-center gap-2 text-xs font-semibold text-[#176B68]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16B6B8]" />
                <span>Senior Industry Practitioners</span>
              </div>
            </div>

            {/* --- CARD 4 (Bottom-Left): Dedicated Career Mentorship --- */}
            <div className="p-7 sm:p-8 rounded-2xl bg-white border border-[#E3ECEA] shadow-xs flex flex-col justify-between group hover:border-[#16B6B8] hover:shadow-md transition-all duration-200">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#F5F9F8] border border-[#E3ECEA] text-[#176B68] flex items-center justify-center mb-6 shadow-2xs group-hover:bg-[#176B68] group-hover:text-white transition-all duration-200">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-[#111817] mb-2.5 group-hover:text-[#176B68] transition-colors">
                  {pillars[2].title}
                </h3>
                <p className="text-[14.5px] leading-relaxed text-[#586765] font-normal">
                  {pillars[2].description}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-[#E3ECEA] flex items-center gap-2 text-xs font-semibold text-[#176B68]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16B6B8]" />
                <span>1-on-1 Guidance &amp; Mock Interviews</span>
              </div>
            </div>

            {/* --- CARD 5 (Bottom-Center): Practical Enterprise Labs --- */}
            <div className="p-7 sm:p-8 rounded-2xl bg-white border border-[#E3ECEA] shadow-xs flex flex-col justify-between group hover:border-[#16B6B8] hover:shadow-md transition-all duration-200">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#F5F9F8] border border-[#E3ECEA] text-[#176B68] flex items-center justify-center mb-6 shadow-2xs group-hover:bg-[#176B68] group-hover:text-white transition-all duration-200">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-[#111817] mb-2.5 group-hover:text-[#176B68] transition-colors">
                  {pillars[1].title}
                </h3>
                <p className="text-[14.5px] leading-relaxed text-[#586765] font-normal">
                  {pillars[1].description}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-[#E3ECEA] flex items-center gap-2 text-xs font-semibold text-[#176B68]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16B6B8]" />
                <span>500+ Hours Hands-On Learning</span>
              </div>
            </div>

            {/* --- CARD 6 (Bottom-Right): Photographic Verified Outcome Card --- */}
            <div className="relative rounded-2xl overflow-hidden border border-[#E3ECEA] shadow-xs flex flex-col justify-end p-7 sm:p-8 min-h-[280px] group">
              <Image
                src="/images/hero/ysm-hero.webp"
                alt="YSM Infotech graduate mastering cloud and data engineering"
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#102E2D] via-[#102E2D]/80 to-transparent"
                aria-hidden="true"
              />

              <div className="relative z-10 text-white space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-[#5BC4CC] text-[10.5px] font-bold uppercase tracking-wider">
                  <span>OUTCOME VERIFIED</span>
                </div>
                <div className="text-3xl font-extrabold tracking-tight text-white flex items-baseline gap-1">
                  <span>95%</span>
                  <span className="text-sm font-normal text-white/80 tracking-normal">completion rate</span>
                </div>
                <p className="text-xs text-white/80 leading-relaxed">
                  350+ students passed our competitions and got a job across top tech companies.
                </p>
              </div>
            </div>

          </div>

          {/* =========================================================================
              PART 3: NUMBERS & FACTS STRIP (Matches the top-right in reference)
              "Numbers and facts that define performance."
              ========================================================================= */}
          <div className="mt-16 sm:mt-20 pt-12 border-t border-[#E3ECEA]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#176B68]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16B6B8]" />
                  <span>KEY METRICS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111817]">
                  Numbers and facts that define performance.
                </h3>
                <p className="text-sm text-[#586765] max-w-md">
                  Verifiable academic metrics from our ISO 9001:2015 accredited technology training cohorts.
                </p>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="p-5 rounded-xl bg-white border border-[#E3ECEA] shadow-2xs">
                  <div className="text-xs font-mono font-semibold uppercase text-[#586765] tracking-wider mb-1">
                    BATCH COMPLETION
                  </div>
                  <div className="text-3xl font-bold text-[#176B68]">
                    95<span className="text-[#16B6B8]">%</span>
                  </div>
                  <div className="text-xs text-[#586765] mt-1">
                    Course completion from every batch
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-white border border-[#E3ECEA] shadow-2xs">
                  <div className="text-xs font-mono font-semibold uppercase text-[#586765] tracking-wider mb-1">
                    APPLIED LABS
                  </div>
                  <div className="text-3xl font-bold text-[#104E4D]">
                    500<span className="text-[#5BC4CC]">+</span>
                  </div>
                  <div className="text-xs text-[#586765] mt-1">
                    Hours of hands-on learning in courses
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-white border border-[#E3ECEA] shadow-2xs">
                  <div className="text-xs font-mono font-semibold uppercase text-[#586765] tracking-wider mb-1">
                    CAREER OUTCOMES
                  </div>
                  <div className="text-3xl font-bold text-[#176B68]">
                    350<span className="text-[#16B6B8]">+</span>
                  </div>
                  <div className="text-xs text-[#586765] mt-1">
                    Students passed competitions &amp; got a job
                  </div>
                </div>
              </div>
            </div>
          </div>

        </Container>
      </section>
    </div>
  );
}
