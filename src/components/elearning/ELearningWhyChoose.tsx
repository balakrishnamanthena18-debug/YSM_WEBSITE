'use client';

import React from 'react';
import Image from 'next/image';
import { Container } from '../ui/Container';
import { ELEARNING_DATA } from '@/data/elearning-page';

export function ELearningWhyChoose() {
  const { whyChooseSection } = ELEARNING_DATA;
  const { reasons } = whyChooseSection;

  return (
    <section className="py-20 sm:py-24 md:py-28 bg-[#F8FAFA] border-b border-[#E3ECEA] overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#E3ECEA] mb-14 sm:mb-18 text-left">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-[#586765] uppercase tracking-widest mb-2 font-semibold">
              <span className="text-[#176B68]">{whyChooseSection.eyebrow}</span>
              <span>&bull;</span>
              <span>8 STRATEGIC PILLARS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold tracking-tight text-[#111817] leading-[1.15]">
              {whyChooseSection.heading}
            </h2>
            <p className="text-sm sm:text-base text-[#586765] font-normal leading-relaxed mt-3">
              {whyChooseSection.subheading}
            </p>
          </div>

          {/* Institutional Quality Badge */}
          <div className="inline-flex items-center gap-3 p-3.5 rounded-xl bg-white border border-[#E3ECEA] shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-[#E8F5F3] text-[#176B68] flex items-center justify-center font-bold text-xs font-mono">
              ISO
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-[#111817] block">
                ISO 9001:2015 Certified
              </span>
              <span className="text-[11px] text-[#586765]">
                Audited Standards of Quality &amp; Rigor
              </span>
            </div>
          </div>
        </div>

        {/* 8 Reasons: Asymmetric Composition with Corporate Training Environment Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Left Side (5 cols): Authentic Corporate Training Environment Photo Card */}
          <div className="lg:col-span-5 rounded-3xl overflow-hidden border border-[#E3ECEA] bg-[#0F2827] shadow-md relative min-h-[380px] lg:min-h-full flex flex-col justify-end p-8 text-white">
            <Image
              src="/images/hero/Modern Open-Plan Office with City Views.png"
              alt="Professional corporate technology environment representing modern enterprise standards"
              fill
              sizes="(max-width: 1024px) 100vw, 480px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#091D1C] via-[#091D1C]/60 to-transparent" />

            <div className="relative z-10 space-y-3">
              <span className="font-mono text-xs text-[#5BC4CC] font-bold uppercase tracking-wider block">
                ENTERPRISE RIGOR
              </span>
              <h3 className="text-2xl font-bold text-white leading-snug">
                Designed for Real Production Demands
              </h3>
              <p className="text-xs sm:text-sm text-[#D8E6E4] leading-relaxed">
                Our digital learning curriculum is constantly refined to reflect active technology hiring requirements, industry toolchains, and real corporate deliverables.
              </p>
            </div>
          </div>

          {/* Right Side (7 cols): 2-Column Grid of 8 Numbered Reasons */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((reason) => (
              <div
                key={reason.id}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E3ECEA] hover:border-[#16B6B8] transition-all duration-200 text-left flex flex-col justify-between group shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-[#176B68]">
                      {`${reason.number} //`}
                    </span>
                    <span className="text-[10.5px] font-semibold text-[#586765] bg-[#F5F9F8] px-2 py-0.5 rounded">
                      {reason.shortTag}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-[#111817] group-hover:text-[#176B68] transition-colors mb-2">
                    {reason.title}
                  </h4>
                  <p className="text-xs text-[#586765] leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
