'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Container } from './ui/Container';
import { AUDIENCE_SECTION_CONTENT } from '@/data/audience';
import {
  BeginnersStudentIllustration,
  BeginnerITSpecialistIllustration,
  CurrentITSpecialistIllustration,
  CorporateCustomerIllustration,
} from './AudienceIllustrations';

export function AudienceSection() {
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Trigger viewport entrance animation
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasEnteredView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const [track1, track2, track3, track4] = AUDIENCE_SECTION_CONTENT.tracks;

  return (
    <section
      ref={sectionRef}
      id="audience"
      className="relative py-16 sm:py-20 md:py-24 bg-[#F5F9F8] border-t border-[#E3ECEA] overflow-hidden"
      aria-labelledby="audience-section-heading"
    >
      {/* Anchors for #suitable-for and #learners */}
      <div id="suitable-for" className="absolute -top-24" aria-hidden="true" />
      <div id="learners" className="absolute -top-24" aria-hidden="true" />

      {/* Subtle Background Architectural Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,rgba(22,182,184,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(22,182,184,0.04)_1px,transparent_1px)] [background-size:48px_48px]"
        aria-hidden="true"
      />

      {/* Ambient Lighting Blooms */}
      <div
        className="pointer-events-none absolute top-1/4 -right-[6%] w-[500px] h-[500px] rounded-full bg-[#16B6B8]/5 blur-[130px] animate-bg-breathe"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 -left-[6%] w-[460px] h-[460px] rounded-full bg-[#176B68]/4 blur-[120px]"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        
        {/* =========================================================================
            1. SECTION HEADER: Editorial Title & Subtitle with Controlled Teal Accent
            ========================================================================= */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-14 md:mb-16">
          
          {/* Eyebrow Pill */}
          <div className="animate-hero-fade inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E3ECEA] text-[#176B68] mb-3.5 shadow-xs">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em]">
              {AUDIENCE_SECTION_CONTENT.eyebrow}
            </span>
          </div>

          {/* Main Heading: "Our Courses are Suitable for ..." */}
          <h2
            id="audience-section-heading"
            className="animate-hero-fade delay-1 text-[30px] sm:text-[36px] md:text-[42px] font-bold tracking-tight text-[#111817] leading-[1.15] mb-3 sm:mb-4"
          >
            <span>{AUDIENCE_SECTION_CONTENT.mainHeadingPrefix}</span>{' '}
            <span className="text-[#176B68]">{AUDIENCE_SECTION_CONTENT.mainHeadingHighlight}</span>
          </h2>

          {/* Supporting Description */}
          <p className="animate-hero-fade delay-2 text-[14.5px] sm:text-[15.5px] leading-[1.68] text-[#586765] font-normal max-w-2xl mx-auto">
            {AUDIENCE_SECTION_CONTENT.supportingDescription}
          </p>
        </div>

        {/* =========================================================================
            2. ASYMMETRIC BENTO GRID: 12-Column Responsive Layout
            ROW 1: Panel 01 (7 cols, Roadmap-led) + Panel 02 (5 cols, Code-led)
            ROW 2: Panel 03 (5 cols, Telemetry-led) + Panel 04 (7 cols, Enterprise-led)
            ========================================================================= */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 transition-opacity duration-700 ${
            hasEnteredView ? 'opacity-100' : 'opacity-90'
          }`}
        >
          
          {/* -----------------------------------------------------------------------
              AUDIENCE 01 — 7 COLUMNS (FEATURED EDITORIAL PANEL)
              Visual: Horizontal Learning Roadmap Canvas
              Accent: Emerald & Mint
              ----------------------------------------------------------------------- */}
          <article
            style={{ animationDelay: '0ms' }}
            className="group relative lg:col-span-7 flex flex-col justify-between rounded-3xl bg-white border border-emerald-200/80 p-6 sm:p-7 md:p-8 transition-all duration-300 shadow-[0_4px_16px_rgba(7,27,28,0.03)] hover:shadow-xl hover:border-emerald-300 hover:-translate-y-1 bg-[radial-gradient(ellipse_at_top_right,rgba(5,150,105,0.05)_0%,transparent_70%)] overflow-hidden select-none"
          >
            <div>
              {/* Top Row: Label Badge + Audience Descriptor */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 pb-4 mb-5 border-b border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60">
                  {track1.label}
                </span>
                <span className="text-xs font-medium text-[#071B1C]/60">
                  {track1.audience}
                </span>
              </div>

              {/* Main Content Area: Split 7/5 inside the 7-col panel */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-5">
                {/* Left Text Column */}
                <div className="md:col-span-7 flex flex-col justify-center text-left">
                  <h3 className="text-[20px] sm:text-[22px] font-bold text-[#071B1C] leading-snug tracking-tight mb-2.5 group-hover:text-emerald-800 transition-colors">
                    {track1.heading}
                  </h3>

                  <p className="text-[13.5px] sm:text-[14px] leading-[1.62] text-[#071B1C]/75 font-normal mb-4">
                    {track1.description}
                  </p>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {track1.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-[11px] font-medium text-emerald-900 bg-emerald-50/80 border border-emerald-200/60 px-2.5 py-0.5 rounded-md"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Visual: Structured Learning Roadmap Canvas */}
                <div className="md:col-span-5 flex items-center justify-center">
                  <BeginnersStudentIllustration />
                </div>
              </div>
            </div>

            {/* Bottom Row: Aligned CTA & Reassurance */}
            <div className="pt-3.5 mt-auto border-t border-slate-100 flex items-center justify-between">
              <Link
                href={track1.ctaHref}
                className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-emerald-700 hover:text-emerald-900 transition-colors"
              >
                <span>{track1.cta}</span>
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
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
              <span className="text-[11px] font-medium text-[#071B1C]/45 hidden sm:inline-block">
                {track1.supportingLabel}
              </span>
            </div>
          </article>

          {/* -----------------------------------------------------------------------
              AUDIENCE 02 — 5 COLUMNS (COMPACT TECHNICAL PANEL)
              Visual: Embedded IDE Code Window & Terminal Environment
              Accent: Electric Blue & Cyan
              ----------------------------------------------------------------------- */}
          <article
            style={{ animationDelay: '80ms' }}
            className="group relative lg:col-span-5 flex flex-col justify-between rounded-3xl bg-white border border-sky-200/80 p-6 sm:p-7 md:p-8 transition-all duration-300 shadow-[0_4px_16px_rgba(7,27,28,0.03)] hover:shadow-xl hover:border-sky-300 hover:-translate-y-1 bg-[radial-gradient(ellipse_at_top_right,rgba(2,132,199,0.05)_0%,transparent_70%)] overflow-hidden select-none"
          >
            <div>
              {/* Top Row: Label Badge + Audience Descriptor */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 pb-4 mb-4 border-b border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200/60">
                  {track2.label}
                </span>
                <span className="text-xs font-medium text-[#071B1C]/60">
                  {track2.audience}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-[20px] sm:text-[22px] font-bold text-[#071B1C] leading-snug tracking-tight mb-2 group-hover:text-sky-800 transition-colors">
                {track2.heading}
              </h3>

              <p className="text-[13.5px] sm:text-[14px] leading-[1.62] text-[#071B1C]/75 font-normal mb-4">
                {track2.description}
              </p>

              {/* Centerpiece: Developer Environment Terminal Visual */}
              <div className="my-3 flex justify-center">
                <BeginnerITSpecialistIllustration />
              </div>

              {/* Feature Tags */}
              <div className="flex flex-wrap gap-1.5 my-3">
                {track2.features.map((feature) => (
                  <span
                    key={feature}
                    className="text-[11px] font-medium text-sky-900 bg-sky-50/80 border border-sky-200/60 px-2.5 py-0.5 rounded-md"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Row: Aligned CTA & Reassurance */}
            <div className="pt-3.5 mt-auto border-t border-slate-100 flex items-center justify-between">
              <Link
                href={track2.ctaHref}
                className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-sky-700 hover:text-sky-900 transition-colors"
              >
                <span>{track2.cta}</span>
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
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
              <span className="text-[11px] font-medium text-[#071B1C]/45 hidden sm:inline-block">
                {track2.supportingLabel}
              </span>
            </div>
          </article>

          {/* -----------------------------------------------------------------------
              AUDIENCE 03 — 5 COLUMNS (ADVANCED TECHNOLOGY PANEL)
              Visual: AI Telemetry & Neural Convergence HUD
              Accent: Violet & Indigo
              ----------------------------------------------------------------------- */}
          <article
            style={{ animationDelay: '160ms' }}
            className="group relative lg:col-span-5 flex flex-col justify-between rounded-3xl bg-white border border-violet-200/80 p-6 sm:p-7 md:p-8 transition-all duration-300 shadow-[0_4px_16px_rgba(7,27,28,0.03)] hover:shadow-xl hover:border-violet-300 hover:-translate-y-1 bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.05)_0%,transparent_70%)] overflow-hidden select-none"
          >
            <div>
              {/* Top Row: Label Badge + Audience Descriptor */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 pb-4 mb-4 border-b border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-violet-800 bg-violet-50 px-2.5 py-1 rounded-md border border-violet-200/60">
                  {track3.label}
                </span>
                <span className="text-xs font-medium text-[#071B1C]/60">
                  {track3.audience}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-[20px] sm:text-[22px] font-bold text-[#071B1C] leading-snug tracking-tight mb-2 group-hover:text-violet-800 transition-colors">
                {track3.heading}
              </h3>

              <p className="text-[13.5px] sm:text-[14px] leading-[1.62] text-[#071B1C]/75 font-normal mb-4">
                {track3.description}
              </p>

              {/* Centerpiece: AI Telemetry & Convergence HUD */}
              <div className="my-3 flex justify-center">
                <CurrentITSpecialistIllustration />
              </div>

              {/* Feature Tags */}
              <div className="flex flex-wrap gap-1.5 my-3">
                {track3.features.map((feature) => (
                  <span
                    key={feature}
                    className="text-[11px] font-medium text-violet-900 bg-violet-50/80 border border-violet-200/60 px-2.5 py-0.5 rounded-md"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Row: Aligned CTA & Reassurance */}
            <div className="pt-3.5 mt-auto border-t border-slate-100 flex items-center justify-between">
              <Link
                href={track3.ctaHref}
                className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-violet-700 hover:text-violet-900 transition-colors"
              >
                <span>{track3.cta}</span>
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
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
              <span className="text-[11px] font-medium text-[#071B1C]/45 hidden sm:inline-block">
                {track3.supportingLabel}
              </span>
            </div>
          </article>

          {/* -----------------------------------------------------------------------
              AUDIENCE 04 — 7 COLUMNS (ENTERPRISE FEATURE PANEL)
              Visual: Workforce 360 Talent Scorecard & Governance Dashboard
              Accent: Teal & Sophisticated Amber
              ----------------------------------------------------------------------- */}
          <article
            style={{ animationDelay: '240ms' }}
            className="group relative lg:col-span-7 flex flex-col justify-between rounded-3xl bg-white border border-teal-200/80 p-6 sm:p-7 md:p-8 transition-all duration-300 shadow-[0_4px_16px_rgba(7,27,28,0.03)] hover:shadow-xl hover:border-teal-300 hover:-translate-y-1 bg-[radial-gradient(ellipse_at_top_right,rgba(0,143,137,0.05)_0%,transparent_70%)] overflow-hidden select-none"
          >
            <div>
              {/* Top Row: Label Badge + Audience Descriptor */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 pb-4 mb-5 border-b border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#004B48] bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200/60">
                  {track4.label}
                </span>
                <span className="text-xs font-medium text-[#071B1C]/60">
                  {track4.audience}
                </span>
              </div>

              {/* Main Content Area: Split 7/5 inside the 7-col panel */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-5">
                {/* Left Text Column */}
                <div className="md:col-span-7 flex flex-col justify-center text-left">
                  <h3 className="text-[20px] sm:text-[22px] font-bold text-[#071B1C] leading-snug tracking-tight mb-2.5 group-hover:text-[#007F7A] transition-colors">
                    {track4.heading}
                  </h3>

                  <p className="text-[13.5px] sm:text-[14px] leading-[1.62] text-[#071B1C]/75 font-normal mb-4">
                    {track4.description}
                  </p>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {track4.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-[11px] font-medium text-[#004B48] bg-[#E6FFFA] border border-teal-200/60 px-2.5 py-0.5 rounded-md"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Visual: Workforce 360 Talent Scorecard */}
                <div className="md:col-span-5 flex items-center justify-center">
                  <CorporateCustomerIllustration />
                </div>
              </div>
            </div>

            {/* Bottom Row: Aligned CTA & Reassurance */}
            <div className="pt-3.5 mt-auto border-t border-slate-100 flex items-center justify-between">
              <a
                href={track4.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#007F7A] hover:text-[#004B48] transition-colors"
              >
                <span>{track4.cta}</span>
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
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
              </a>
              <span className="text-[11px] font-medium text-[#071B1C]/45 hidden sm:inline-block">
                {track4.supportingLabel}
              </span>
            </div>
          </article>

        </div>

      </Container>
    </section>
  );
}
