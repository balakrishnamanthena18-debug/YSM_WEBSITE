'use client';

import React from 'react';
import Image from 'next/image';

export function ExpectVisualComposition() {
  return (
    <div className="relative w-full max-w-[500px] lg:max-w-none mx-auto flex items-center justify-center py-6 sm:py-8 select-none">
      
      {/* 1. Ambient Background Mint Lighting Blooms */}
      <div
        className="absolute -top-12 -left-12 w-72 h-72 rounded-full bg-[#12AFA8]/15 blur-[90px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-10 -right-10 w-72 h-72 rounded-full bg-[#004B48]/12 blur-[80px] pointer-events-none"
        aria-hidden="true"
      />

      {/* 2. Fine Dotted Matrix Patterns (Top-Right) */}
      <div
        className="absolute -top-6 -right-6 w-36 h-36 opacity-30 bg-[radial-gradient(#006B68_1.8px,transparent_1.8px)] [background-size:16px_16px] pointer-events-none hidden sm:block"
        aria-hidden="true"
      />

      {/* 3. Layered Teal Geometric Backing Shape (Rotated offset frame) */}
      <div
        className="absolute inset-2 sm:inset-4 rounded-3xl sm:rounded-[36px] bg-gradient-to-br from-[#004B48] via-[#006B68] to-[#12AFA8] rotate-2 opacity-95 shadow-2xl shadow-[#004B48]/20 transition-transform duration-500 hover:rotate-1"
        aria-hidden="true"
      />

      {/* 4. Elegant Curved Decorative Swoosh (SVG Arc Accent) */}
      <svg
        className="absolute -bottom-6 -left-6 w-48 h-48 pointer-events-none opacity-40 hidden sm:block"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 20 180 C 40 80 120 20 180 20"
          stroke="#12AFA8"
          strokeWidth="2.5"
          strokeDasharray="4 4"
        />
        <circle cx="180" cy="20" r="4" fill="#5BC4CC" />
      </svg>

      {/* 5. Main Art-Directed Learner Image Frame */}
      <div className="relative z-10 w-full rounded-3xl sm:rounded-[32px] overflow-hidden border-2 border-white/90 shadow-2xl bg-white aspect-[4/5] sm:aspect-[4/5] max-h-[580px]">
        <Image
          src="/images/hero/ysm-hero.webp"
          alt="YSM Infotech learner engaged in practical note-taking and applied study"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 520px"
          className="object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
          quality={95}
        />

        {/* Soft bottom vignette to ground the photo */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#021A1D]/45 via-transparent to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Subtle upper badge marker */}
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#004B48]/85 backdrop-blur-md border border-white/20 text-white flex items-center gap-1.5 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#16B6B8]" />
          <span className="text-[10px] uppercase tracking-wider font-semibold">
            Applied Study
          </span>
        </div>
      </div>

      {/* =========================================================================
          6. THREE REFINED INFORMATION CALLOUT BADGES
          Positioned along the perimeters so they never obscure the learner's face
          ========================================================================= */}

      {/* --- Callout 1: Practical Learning (Top-Right) --- */}
      <div className="absolute -top-3 right-2 sm:-top-5 sm:-right-6 z-20 transition-transform duration-300 hover:-translate-y-1">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 border border-[#006B68]/15 shadow-xl shadow-[#004B48]/10 flex items-center gap-3 max-w-[240px] sm:max-w-[270px]">
          {/* Hands-on code icon container */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#004B48] to-[#006B68] text-white flex items-center justify-center shrink-0 shadow-sm border border-[#12AFA8]/30">
            <svg className="w-5 h-5 text-[#5BC4CC]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>
          <div>
            <span className="text-[12px] sm:text-[13px] font-bold text-[#071B1C] leading-snug block">
              Practical Learning
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-[#006B68] block">
              Real-World Industry Labs
            </span>
          </div>
        </div>
      </div>

      {/* --- Callout 2: Learn Today (Middle-Left) --- */}
      <div className="absolute bottom-20 -left-2 sm:bottom-24 sm:-left-8 z-20 transition-transform duration-300 hover:-translate-y-1">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 border border-[#12AFA8]/25 shadow-xl shadow-[#004B48]/10 flex items-center gap-3 max-w-[230px] sm:max-w-[260px]">
          {/* Live class / calendar container */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#E6FFFA] to-[#CCFBF1] text-[#006B68] flex items-center justify-center shrink-0 shadow-sm border border-[#006B68]/15">
            <svg className="w-5 h-5 text-[#006B68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div>
            <span className="text-[12px] sm:text-[13px] font-bold text-[#071B1C] leading-snug block">
              Learn Today
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-[#071B1C]/65 block">
              Live Mentor-Led Sessions
            </span>
          </div>
        </div>
      </div>

      {/* --- Callout 3: Build a Brighter Career (Bottom-Right) --- */}
      <div className="absolute -bottom-3 right-2 sm:-bottom-5 sm:-right-6 z-20 transition-transform duration-300 hover:-translate-y-1">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 border border-[#004B48]/15 shadow-xl shadow-[#004B48]/10 flex items-center gap-3 max-w-[250px] sm:max-w-[280px]">
          {/* Star trajectory container */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5] text-[#047857] flex items-center justify-center shrink-0 shadow-sm border border-emerald-300/60">
            <svg className="w-5 h-5 text-[#047857]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div>
            <span className="text-[12px] sm:text-[13px] font-bold text-[#071B1C] leading-snug block">
              Build a Brighter Career
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-[#047857] block">
              Confidence &amp; Job Readiness
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}

