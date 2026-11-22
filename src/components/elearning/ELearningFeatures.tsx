'use client';

import React from 'react';
import Image from 'next/image';
import { Container } from '../ui/Container';
import { ELEARNING_DATA } from '@/data/elearning-page';

export function ELearningFeatures() {
  const { featuresSection } = ELEARNING_DATA;
  const { features } = featuresSection;

  return (
    <section className="py-20 sm:py-24 md:py-28 bg-white border-b border-[#E3ECEA] overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="max-w-2xl mb-16 sm:mb-20 text-left">
          <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-[#586765] uppercase tracking-widest mb-2 font-semibold">
            <span className="text-[#176B68]">{featuresSection.eyebrow}</span>
            <span>&bull;</span>
            <span>7 CORE CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold tracking-tight text-[#111817] leading-[1.15]">
            {featuresSection.heading}
          </h2>
          <p className="text-sm sm:text-base text-[#586765] font-normal leading-relaxed mt-3">
            {featuresSection.subheading}
          </p>
        </div>

        {/* Feature Storytelling: Asymmetric Alternating Layout */}
        <div className="space-y-16 sm:space-y-24">
          {features.map((feature, idx) => {
            const isEven = idx % 2 === 1;

            return (
              <div
                key={feature.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${
                  isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Left/Text Content Column (6 cols) */}
                <div
                  className={`lg:col-span-6 space-y-5 text-left ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#176B68] bg-[#F5F9F8] px-2.5 py-1 rounded">
                      PILLAR {feature.number}
                    </span>
                    <span className="text-xs text-[#586765] font-mono tracking-wider uppercase font-semibold">
                      {feature.tagline}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111817] leading-snug">
                    {feature.title}
                  </h3>

                  <p className="text-[15px] sm:text-base text-[#4A5755] leading-relaxed font-normal">
                    {feature.description}
                  </p>

                  {/* Bullet checklist */}
                  <ul className="space-y-2.5 pt-2 border-t border-[#E3ECEA]">
                    {feature.bulletPoints.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-[13.5px] text-[#2C3836]">
                        <span className="w-4 h-4 rounded-full bg-[#E8F5F3] text-[#176B68] flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                          ✓
                        </span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right/Visual Photograph Column (6 cols) */}
                <div
                  className={`lg:col-span-6 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E3ECEA] shadow-lg bg-[#0F2827] aspect-[16/10] group">
                    <Image
                      src={feature.image}
                      alt={feature.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 560px"
                      className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B201F]/80 via-transparent to-transparent opacity-60" />

                    {/* Lower caption overlay */}
                    <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-white/90 backdrop-blur-md border border-white/40 flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#111817]">
                        {feature.title}
                      </span>
                      <span className="font-mono text-[11px] text-[#176B68] font-bold">
                        YSM DIGITAL LAB
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
