'use client';

import React from 'react';
import Image from 'next/image';

export function AboutVisualComposition() {
  return (
    <div className="relative w-full max-w-[500px] lg:max-w-none mx-auto flex items-center justify-center py-6 sm:py-8 select-none">
      
      {/* 1. Subtle Ambient Background Blooms */}
      <div
        className="absolute -top-12 -right-12 w-72 h-72 rounded-full bg-[#12AFA8]/15 blur-[90px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-10 -left-10 w-72 h-72 rounded-full bg-[#006B68]/12 blur-[80px] pointer-events-none"
        aria-hidden="true"
      />

      {/* 2. Geometric Coordinate Dots Grid (Top-Left) */}
      <div
        className="absolute -top-6 -left-6 w-36 h-36 opacity-30 bg-[radial-gradient(#006B68_1.8px,transparent_1.8px)] [background-size:16px_16px] pointer-events-none hidden sm:block"
        aria-hidden="true"
      />

      {/* 3. Layered Geometric Teal Backing Shape (Slightly rotated offset frame) */}
      <div
        className="absolute inset-2 sm:inset-4 rounded-3xl sm:rounded-[36px] bg-gradient-to-br from-[#004B48] via-[#006B68] to-[#12AFA8] -rotate-2 opacity-95 shadow-2xl shadow-[#004B48]/20 transition-transform duration-500 hover:-rotate-1"
        aria-hidden="true"
      />

      {/* 4. Secondary Offset Mint Accent Outline */}
      <div
        className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-full h-full rounded-3xl sm:rounded-[36px] border-2 border-[#12AFA8]/35 pointer-events-none hidden sm:block"
        aria-hidden="true"
      />

      {/* 5. Main Art-Directed Institutional Image Frame */}
      <div className="relative z-10 w-full rounded-3xl sm:rounded-[32px] overflow-hidden border-2 border-white/90 shadow-2xl bg-white aspect-[4/5] sm:aspect-[4/5] max-h-[580px]">
        <Image
          src="/images/hero/ysm-about-learning-hero.jpg"
          alt="Modern YSM Infotech hands-on technology learning lab and mentorship"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 520px"
          className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
          quality={95}
        />

        {/* Soft bottom vignette to ground the photo */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#021A1D]/55 via-transparent to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Subtle corner badge marker inside frame */}
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#004B48]/85 backdrop-blur-md border border-white/20 text-white flex items-center gap-1.5 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#16B6B8]" />
          <span className="text-[10px] uppercase tracking-wider font-semibold">
            Certified Academy
          </span>
        </div>
      </div>

      {/* =========================================================================
          6. THREE REFINED INFORMATION CALLOUT BADGES
          Positioned along the perimeters so they never obscure the main subject
          ========================================================================= */}

      {/* --- Callout 1: ISO Certified Organization (Top-Left) --- */}
      <div className="absolute -top-3 left-2 sm:-top-5 sm:-left-6 z-20 transition-transform duration-300 hover:-translate-y-1">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 border border-[#006B68]/15 shadow-xl shadow-[#004B48]/10 flex items-center gap-3 max-w-[240px] sm:max-w-[270px]">
          {/* ISO Medal Emblem Container */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#004B48] to-[#006B68] text-white flex items-center justify-center shrink-0 shadow-sm border border-[#12AFA8]/30">
            <svg className="w-5 h-5 text-[#5BC4CC]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="6" />
              <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
            </svg>
          </div>
          <div>
            <span className="text-[12px] sm:text-[13px] font-bold text-[#071B1C] leading-snug block">
              ISO Certified Organization
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-[#006B68] block">
              ISO 9001:2015 Accredited
            </span>
          </div>
        </div>
      </div>

      {/* --- Callout 2: Empowering Tech Careers (Middle-Left) --- */}
      <div className="absolute bottom-20 -left-2 sm:bottom-24 sm:-left-8 z-20 transition-transform duration-300 hover:-translate-y-1">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 border border-[#12AFA8]/25 shadow-xl shadow-[#004B48]/10 flex items-center gap-3 max-w-[230px] sm:max-w-[260px]">
          {/* Career Growth Rocket Container */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#E6FFFA] to-[#CCFBF1] text-[#006B68] flex items-center justify-center shrink-0 shadow-sm border border-[#006B68]/15">
            <svg className="w-5 h-5 text-[#006B68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
              <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
              <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
              <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
            </svg>
          </div>
          <div>
            <span className="text-[12px] sm:text-[13px] font-bold text-[#071B1C] leading-snug block">
              Empowering Tech Careers
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-[#071B1C]/65 block">
              Job-Ready Applied Skills
            </span>
          </div>
        </div>
      </div>

      {/* --- Callout 3: Your Growth, Our Commitment (Bottom-Right) --- */}
      <div className="absolute -bottom-3 right-2 sm:-bottom-5 sm:-right-6 z-20 transition-transform duration-300 hover:-translate-y-1">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 border border-[#004B48]/15 shadow-xl shadow-[#004B48]/10 flex items-center gap-3 max-w-[250px] sm:max-w-[280px]">
          {/* Commitment Shield Container */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5] text-[#047857] flex items-center justify-center shrink-0 shadow-sm border border-emerald-300/60">
            <svg className="w-5 h-5 text-[#047857]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <div>
            <span className="text-[12px] sm:text-[13px] font-bold text-[#071B1C] leading-snug block">
              Your Growth, Our Commitment
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-[#047857] block">
              Dedicated 1-on-1 Mentorship
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}

