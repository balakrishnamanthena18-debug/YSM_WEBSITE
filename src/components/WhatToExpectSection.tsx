'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Container } from './ui/Container';
import { WHAT_TO_EXPECT_CONTENT } from '@/data/what-to-expect';
import { ExpectFeatureIcon } from './ExpectFeatureIcon';
import { ExpectVisualComposition } from './ExpectVisualComposition';

export function WhatToExpectSection() {
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
      id="what-to-expect"
      className="relative py-20 sm:py-24 md:py-28 bg-[#FFFFFF] border-t border-[#E3ECEA] overflow-hidden"
      aria-labelledby="what-to-expect-heading"
    >
      {/* Anchor for #approach and #e-learning links */}
      <div id="approach" className="absolute -top-24" aria-hidden="true" />
      <div id="e-learning" className="absolute -top-24" aria-hidden="true" />

      {/* Subtle Background Architectural Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,rgba(22,182,184,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(22,182,184,0.04)_1px,transparent_1px)] [background-size:48px_48px]"
        aria-hidden="true"
      />

      {/* Ambient Lighting Blooms */}
      <div
        className="pointer-events-none absolute top-1/4 -left-[6%] w-[520px] h-[520px] rounded-full bg-[#16B6B8]/5 blur-[130px] animate-bg-breathe"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-center">
          
          {/* =========================================================================
              LEFT SIDE: Art-Directed Learning Visual (5 cols)
              ========================================================================= */}
          <div className="hidden lg:block lg:col-span-5 sticky top-28 self-start animate-hero-image delay-2">
            <ExpectVisualComposition />
          </div>

          {/* =========================================================================
              RIGHT SIDE: Introduction & 4 Feature Cards (7 cols)
              ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col justify-start text-left">
            
            {/* 1. OUR APPROACH Eyebrow */}
            <div className="animate-hero-fade inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F9F8] border border-[#E3ECEA] text-[#176B68] w-fit mb-4">
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em]">
                {WHAT_TO_EXPECT_CONTENT.eyebrow}
              </span>
            </div>

            {/* 2. Main Heading: "What to Expect from us" */}
            <h2
              id="what-to-expect-heading"
              className="animate-hero-fade delay-1 text-[34px] sm:text-[42px] md:text-[46px] font-bold tracking-tight text-[#111817] leading-[1.14] mb-4"
            >
              <span>{WHAT_TO_EXPECT_CONTENT.headingPrefix}</span>{' '}
              <span className="text-[#176B68]">{WHAT_TO_EXPECT_CONTENT.headingHighlight}</span>
            </h2>

            {/* 3. Supporting Text */}
            <p className="animate-hero-fade delay-2 text-[15.5px] sm:text-[16.5px] leading-[1.68] text-[#586765] font-normal max-w-xl mb-8 sm:mb-10">
              {WHAT_TO_EXPECT_CONTENT.supportingText}
            </p>

            {/* Mobile Viewport Image Placement */}
            <div className="block lg:hidden mb-10">
              <ExpectVisualComposition />
            </div>

            {/* 4. Four Feature Cards in a Two-Column, Two-Row Grid (2x2) */}
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 transition-opacity duration-700 ${
                hasEnteredView ? 'opacity-100' : 'opacity-90'
              }`}
            >
              {WHAT_TO_EXPECT_CONTENT.features.map((feature, idx) => (
                <article
                  key={feature.number}
                  style={{ animationDelay: `${idx * 80}ms` }}
                  className="group relative flex flex-col justify-between h-full rounded-xl bg-[#F5F9F8] border border-[#E3ECEA] p-5 sm:p-6 transition-all duration-200 shadow-[0_2px_8px_rgba(17,24,23,0.02)] hover:shadow-md hover:border-[#16B6B8]/60 hover:-translate-y-0.5 select-none"
                >
                  {/* Card Content */}
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      {/* Feature Icon */}
                      <ExpectFeatureIcon type={feature.iconType} accent={feature.accent} />

                      {/* Sequence Identifier */}
                      <span className="font-mono text-[11px] font-semibold text-[#586765]/60 tracking-wider">
                        0{feature.number}
                      </span>
                    </div>

                    {/* Feature Heading */}
                    <h3 className="text-[17px] sm:text-[18px] font-bold leading-snug text-[#111817] group-hover:text-[#176B68] transition-colors mb-2.5">
                      {feature.title}
                    </h3>

                    {/* Original Feature Description */}
                    <p className="text-[13px] sm:text-[13.5px] leading-[1.62] text-[#586765] font-normal">
                      {feature.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}
