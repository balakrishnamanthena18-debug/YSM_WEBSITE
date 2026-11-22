'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Container } from './ui/Container';
import { ABOUT_US_CONTENT } from '@/data/about-us';
import { BenefitIcon } from './BenefitIcon';
import { AboutVisualComposition } from './AboutVisualComposition';

export function WhyYSMSection() {
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Trigger entrance animations when section comes into viewport
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

  return (
    <section
      ref={sectionRef}
      id="why-ysm"
      className="relative py-20 sm:py-24 md:py-28 lg:py-32 bg-[#F5F9F8] border-t border-[#E3ECEA] overflow-hidden"
      aria-labelledby="who-we-are-heading"
    >
      {/* Subtle Background Architectural Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(to_right,rgba(22,182,184,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(22,182,184,0.04)_1px,transparent_1px)] [background-size:48px_48px]"
        aria-hidden="true"
      />

      {/* Ambient Depth Lighting */}
      <div
        className="pointer-events-none absolute top-1/4 -right-[8%] w-[520px] h-[520px] rounded-full bg-[#16B6B8]/6 blur-[130px] animate-bg-breathe"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 -left-[6%] w-[480px] h-[480px] rounded-full bg-[#176B68]/5 blur-[120px]"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-start">
          
          {/* =========================================================================
              LEFT COLUMN: About Us, Description, CTA & Why Choose Us (56% / 7 cols)
              ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col justify-start text-left">
            
            {/* 1. ABOUT US Eyebrow */}
            <div className="animate-hero-fade inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E3ECEA] text-[#176B68] w-fit mb-4 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16B6B8]" />
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em]">
                {ABOUT_US_CONTENT.eyebrow}
              </span>
            </div>

            {/* 2. Main Heading: "Who We Are" */}
            <h2
              id="who-we-are-heading"
              className="animate-hero-fade delay-1 text-[34px] sm:text-[42px] md:text-[48px] font-bold tracking-tight text-[#111817] leading-[1.12] mb-5"
            >
              <span className="text-[#111817]">{ABOUT_US_CONTENT.headingPrefix}</span>
              <span className="text-[#176B68]">{ABOUT_US_CONTENT.headingSuffix}</span>
            </h2>

            {/* 3. Original Company Description (EXACT text preserved) */}
            <p className="animate-hero-fade delay-2 text-[15.5px] sm:text-[16.5px] leading-[1.72] text-[#586765] font-normal max-w-2xl mb-7">
              {ABOUT_US_CONTENT.description}
            </p>

            {/* 4. "Know More" CTA Button */}
            <div className="animate-hero-fade delay-3 mb-12 sm:mb-14">
              <Link
                href={ABOUT_US_CONTENT.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-8 sm:px-9 py-3.5 sm:py-4 rounded-lg bg-[#176B68] hover:bg-[#104E4D] text-white font-semibold text-sm sm:text-[14.5px] tracking-wide shadow-sm hover:shadow-lg hover:shadow-[#176B68]/20 transition-all duration-200 active:scale-[0.98]"
              >
                <span>{ABOUT_US_CONTENT.cta.label}</span>
                <span className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1 group-hover:bg-white/25">
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

            {/* Mobile Viewport Image Placement */}
            <div className="block lg:hidden mb-12">
              <AboutVisualComposition />
            </div>

            {/* 5. Secondary Heading: "Why Choose Us" */}
            <div className="flex items-center gap-3 mb-6 pt-6 border-t border-[#E3ECEA]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#16B6B8]" />
              <h3 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold tracking-tight text-[#111817] leading-snug">
                {ABOUT_US_CONTENT.secondaryHeading}
              </h3>
            </div>

            {/* 6. Eight Reasons in an Elegant Two-Column Feature Grid (4 rows x 2 cols) */}
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 transition-opacity duration-700 ${
                hasEnteredView ? 'opacity-100' : 'opacity-90'
              }`}
            >
              {ABOUT_US_CONTENT.benefits.map((benefit, idx) => (
                <div
                  key={benefit.id}
                  style={{ animationDelay: `${idx * 60}ms` }}
                  className="group relative flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl bg-white border border-[#E3ECEA] shadow-xs hover:border-[#16B6B8]/60 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  {/* Distinctive Multicolor Icon Container */}
                  <BenefitIcon type={benefit.icon} />

                  {/* Benefit Label & Micro Tag */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] sm:text-[10.5px] uppercase font-semibold text-[#176B68] tracking-wider block mb-0.5">
                      {benefit.shortTag}
                    </span>
                    <h4 className="text-[13.5px] sm:text-[14.5px] font-bold text-[#111817] leading-snug group-hover:text-[#176B68] transition-colors truncate sm:whitespace-normal">
                      {benefit.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* =========================================================================
              RIGHT COLUMN: Art-Directed Visual Composition (44% / 5 cols)
              Desktop Viewport Display
              ========================================================================= */}
          <div className="hidden lg:block lg:col-span-5 sticky top-28 self-start animate-hero-image delay-2">
            <AboutVisualComposition />
          </div>

        </div>
      </Container>
    </section>
  );
}
