'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from './ui/Container';

export function MotivationSection() {
  return (
    <section className="relative py-24 sm:py-28 md:py-32 overflow-hidden bg-[#102E2D] text-white">
      {/* Layer 1: Panoramic Mountain Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/Lone Hiker Above the Misty Mountains.png"
          alt="Lone hiker standing proudly above misty mountain peaks"
          fill
          sizes="100vw"
          className="object-cover object-center scale-105"
          quality={90}
        />
      </div>

      {/* Layer 2: Official Dark Section Overlay */}
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-r from-[#102E2D]/95 via-[#104E4D]/88 to-[#102E2D]/95 mix-blend-multiply"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-[2] bg-gradient-to-t from-[#102E2D] via-transparent to-[#102E2D]/70"
        aria-hidden="true"
      />

      {/* Layer 3: Official Brand Atmospheric Blooms */}
      <div
        className="pointer-events-none absolute -top-24 left-1/4 w-[500px] h-[500px] rounded-full bg-[#16B6B8]/15 blur-[140px] z-[3]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 right-1/4 w-[450px] h-[450px] rounded-full bg-[#5BC4CC]/10 blur-[130px] z-[3]"
        aria-hidden="true"
      />

      {/* Layer 4: Content Layer */}
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-7">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#5BC4CC]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16B6B8] animate-pulse" />
            <span className="text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-[0.22em]">
              ACADEMIC PERSISTENCE &amp; CAREER ASCENT
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold tracking-tight text-white leading-[1.12]">
            Every Great Career Peak Begins with a{' '}
            <span className="text-[#5BC4CC]">
              Single Resolute Step
            </span>
          </h2>

          {/* Supporting Text */}
          <p className="text-[15.5px] sm:text-[17px] leading-[1.75] text-white/80 font-normal max-w-2xl mx-auto">
            At YSM Infotech, we guide ambitious learners from foundational fundamentals to production-level engineering mastery. Your journey to technical excellence starts with disciplined practice, expert practitioner mentorship, and real-time enterprise execution.
          </p>

          {/* Key Value Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-white/90">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16B6B8]" />
              <span className="font-semibold tracking-wide">
                ISO 9001:2015 Accredited Quality Standards
              </span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-white/90">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5BC4CC]" />
              <span className="font-semibold tracking-wide">
                100% Practical Production Labs
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#programs"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-lg bg-[#176B68] hover:bg-[#104E4D] text-white font-semibold text-sm shadow-[0_4px_24px_rgba(23,107,104,0.35)] transition-all duration-200 transform hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <span>Explore Programs</span>
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

            <Link
              href="https://wa.me/917997791456?text=Hi%20YSM%20Infotech%2C%20I%20would%20like%20to%20speak%20with%20a%20career%20advisor."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 rounded-lg bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-white font-semibold text-sm transition-all duration-200"
            >
              <span>Speak with a Mentor</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
