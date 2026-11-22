'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TechMarquee } from './TechMarquee';

export function Hero() {
  return (
    <div className="relative w-full overflow-hidden bg-white">
      {/* =========================================================================
          HERO MAIN STAGE: Viewport-Height Cover Canvas (100vh Cover on Desktop)
          Uses official YSM brand identity (Dark Section #102E2D, Deep Teal #176B68, Aqua #5BC4CC)
          ========================================================================= */}
      <div className="relative w-full h-auto min-h-[calc(100vh-116px)] lg:h-[calc(100dvh-112px)] lg:min-h-[700px] pt-4 sm:pt-6 lg:pt-2 pb-0 flex flex-col justify-between overflow-hidden">
        
        {/* Layer 1: Photographic Modern Open-Plan Office Canvas */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/Modern Open-Plan Office with City Views.png"
            alt="Modern high-tech corporate office architecture"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-105"
            quality={92}
          />
        </div>

        {/* Layer 2: Official Brand Gradient Overlay (Dark Section #102E2D, Dark Teal #104E4D & Deep Teal #176B68) */}
        <div
          className="absolute inset-0 z-[1] bg-gradient-to-br from-[#102E2D]/96 via-[#104E4D]/92 to-[#176B68]/94 mix-blend-multiply"
          aria-hidden="true"
        />

        {/* Layer 3: Official Brand Atmospheric Lighting Blooms (Primary Teal #16B6B8 & Aqua #5BC4CC) */}
        <div
          className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_80%_65%_at_75%_45%,rgba(22,182,184,0.35)_0%,rgba(23,107,104,0.22)_45%,transparent_80%)] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -top-20 left-[12%] w-[550px] h-[550px] rounded-full bg-[#5BC4CC]/16 blur-[130px] pointer-events-none z-[2]"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-16 right-[10%] w-[500px] h-[500px] rounded-full bg-[#16B6B8]/18 blur-[140px] pointer-events-none z-[2]"
          aria-hidden="true"
        />

        {/* Layer 4: Subtle Architectural Coordinate Grid */}
        <div
          className="absolute inset-0 z-[3] opacity-20 hero-architectural-grid [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none"
          aria-hidden="true"
        />

        {/* Layer 5: Subtle Architectural Circular Arcs */}
        <div
          className="absolute top-0 right-0 w-[55vw] max-w-[960px] h-full pointer-events-none z-[4] overflow-hidden hidden sm:block"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 900 900"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute -right-20 -top-20 w-[850px] lg:w-[1000px] xl:w-[1100px] h-[850px] lg:h-[1000px] xl:h-[1100px]"
          >
            <defs>
              <linearGradient id="arcGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#16B6B8" stopOpacity="0.22" />
                <stop offset="60%" stopColor="#176B68" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#5BC4CC" stopOpacity="0.03" />
              </linearGradient>
              <linearGradient id="arcGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#5BC4CC" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#16B6B8" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Outer Architectural Elliptical Curve */}
            <ellipse
              cx="560"
              cy="450"
              rx="430"
              ry="410"
              stroke="url(#arcGrad1)"
              strokeWidth="1.2"
              fill="rgba(22, 182, 184, 0.015)"
            />

            {/* Inner Concentric Architectural Curve */}
            <ellipse
              cx="560"
              cy="450"
              rx="320"
              ry="305"
              stroke="url(#arcGrad2)"
              strokeWidth="1"
              strokeDasharray="6 8"
              fill="rgba(23, 107, 104, 0.01)"
            />

            <circle cx="130" cy="450" r="2.5" fill="#5BC4CC" fillOpacity="0.4" />
            <circle cx="560" cy="40" r="2.5" fill="#16B6B8" fillOpacity="0.35" />
          </svg>
        </div>

        {/* =========================================================================
            PROFESSIONAL DUAL-LAYER VIEWPORT WAVE TRANSITION
            Layer A: Subtle Primary Teal translucent accent crest (#16B6B8, 12% opacity)
            Layer B: Pure white primary foreground wave seamlessly connecting to next section
            ========================================================================= */}
        <div className="absolute bottom-0 left-0 right-0 w-full h-[20vh] sm:h-[24vh] lg:h-[28vh] z-[5] pointer-events-none overflow-hidden">
          <svg
            viewBox="0 0 1440 260"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full block"
            preserveAspectRatio="none"
          >
            {/* Layer A: Subtle turquoise translucent accent crest */}
            <path
              d="M 0,95 C 200,95 350,135 500,135 C 740,135 1120,30 1440,30 L 1440,260 L 0,260 Z"
              fill="#16B6B8"
              fillOpacity="0.12"
            />
            {/* Layer B: Pure white primary foreground wave */}
            <path
              d="M 0,115 C 200,115 350,155 500,155 C 740,155 1120,50 1440,50 L 1440,260 L 0,260 Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>

        {/* =========================================================================
            HERO CONTENT: Side-by-Side Composition (Minimalist & High-Impact)
            ========================================================================= */}
        <div className="relative z-10 w-full max-w-[1720px] 2xl:max-w-[1880px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex-1 flex items-end">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-end w-full">
            
            {/* -------------------------------------------------------------
                LEFT COLUMN: Minimalist Value Proposition & Dual CTAs (6 cols)
                ------------------------------------------------------------- */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center text-left pt-2 sm:pt-4 lg:pt-2 pb-10 sm:pb-14 lg:pb-16 xl:pb-22 z-20">
              
              {/* Eyebrow Badge (Capsule Credential - Brand Aqua & Teal) */}
              <div className="animate-hero-fade inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-medium tracking-wide w-fit mb-4 sm:mb-5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16B6B8]" />
                <span className="tracking-wide text-[11.5px] sm:text-xs font-semibold text-[#5BC4CC]">
                  ISO 9001:2015 Certified Academy &bull; 1,000+ Alumni
                </span>
              </div>

              {/* Main Headline with Plus Jakarta Sans & Brand Aqua Accent */}
              <h1 className="animate-hero-fade delay-1 tracking-tight leading-[1.05] mb-4 sm:mb-5 font-sans">
                <span className="block font-sans font-bold text-white text-[26px] sm:text-[34px] md:text-[40px] lg:text-[42px] xl:text-[50px] mb-1 tracking-tight whitespace-nowrap drop-shadow-sm">
                  Become an <span className="text-[#5BC4CC]">expert</span> in
                </span>
                <span className="block font-sans font-black text-white text-[30px] sm:text-[40px] md:text-[48px] lg:text-[50px] xl:text-[58px] tracking-tight whitespace-nowrap">
                  Data Science &amp; Cloud
                </span>
                <span className="block font-sans font-black text-white text-[30px] sm:text-[40px] md:text-[48px] lg:text-[50px] xl:text-[58px] tracking-tight">
                  Computing
                </span>
              </h1>

              {/* Minimalist Subheadline */}
              <p className="animate-hero-fade delay-2 text-[14.5px] sm:text-[16px] md:text-[17px] leading-[1.6] text-white/85 font-normal max-w-lg mb-7 sm:mb-8 font-sans">
                Interactive live training, real-time enterprise cloud labs &amp; 1-on-1 placement guidance taught by senior industry practitioners.
              </p>

              {/* Dual Action CTAs */}
              <div className="animate-hero-fade delay-3 flex flex-row items-center gap-3.5 sm:gap-4 w-full max-w-[460px]">
                {/* Primary Button: Solid White */}
                <Link
                  href="#programs"
                  className="inline-flex items-center justify-center h-[46px] sm:h-[50px] px-7 sm:px-8 rounded-lg bg-white text-[#104E4D] hover:bg-[#F5F9F8] hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 font-sans font-semibold text-[14px] sm:text-[14.5px] tracking-wide text-center"
                >
                  Start Learning
                </Link>

                {/* Secondary Button: Frosted Glass Translucent */}
                <Link
                  href="#programs"
                  className="inline-flex items-center justify-center h-[46px] sm:h-[50px] px-7 sm:px-8 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 font-sans font-medium text-[14px] sm:text-[14.5px] tracking-wide text-center"
                >
                  Full Catalog
                </Link>
              </div>

            </div>

            {/* -------------------------------------------------------------
                RIGHT COLUMN: Hero Cutout Person
                ------------------------------------------------------------- */}
            <div className="lg:col-span-6 xl:col-span-6 relative flex justify-center lg:justify-end items-end z-10 self-end mt-4 sm:mt-6 lg:mt-0 lg:-mr-6 xl:-mr-10 2xl:-mr-16 pointer-events-none">
              
              {/* Floating Ambient Aura */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] sm:w-[550px] lg:w-[700px] h-[450px] sm:h-[550px] lg:h-[700px] rounded-full bg-gradient-to-tr from-[#16B6B8]/20 to-[#5BC4CC]/15 blur-[120px] pointer-events-none"
                aria-hidden="true"
              />

              {/* Hero Cutout Person */}
              <div className="relative w-[380px] sm:w-[480px] md:w-[560px] lg:w-[660px] xl:w-[760px] 2xl:w-[840px] 3xl:w-[920px] max-w-none shrink-0 leading-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/hero/hero-person-cutout.png"
                  alt="Professional learner mastering cloud and data engineering with YSM Infotech"
                  className="w-full h-auto object-contain object-bottom drop-shadow-[0_20px_45px_rgba(0,0,0,0.45)] select-none pointer-events-none block"
                  loading="eager"
                  fetchPriority="high"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('Focused%20Remote%20Work%20Setup.png')) {
                      target.src = '/images/hero/Focused Remote Work Setup.png';
                    }
                  }}
                />
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* =========================================================================
          TECHNOLOGY MARQUEE: Authentic Technology Logos on Off-White Surface
          ========================================================================= */}
      <TechMarquee />
    </div>
  );
}
