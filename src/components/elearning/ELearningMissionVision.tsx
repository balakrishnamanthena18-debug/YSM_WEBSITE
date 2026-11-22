'use client';

import React from 'react';
import { Container } from '../ui/Container';
import { ELEARNING_DATA } from '@/data/elearning-page';

export function ELearningMissionVision() {
  const { missionVisionSection } = ELEARNING_DATA;
  const { mission, vision } = missionVisionSection;

  return (
    <section className="relative py-20 sm:py-24 md:py-32 bg-[#0B201F] text-white border-b border-[#163635] overflow-hidden">
      {/* Background Architectural Patterns */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10 [background-image:linear-gradient(to_right,rgba(22,182,184,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(22,182,184,0.15)_1px,transparent_1px)] [background-size:64px_64px]"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 sm:mb-18 text-left">
          <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-[#5BC4CC] uppercase tracking-widest mb-2 font-semibold">
            <span>{missionVisionSection.eyebrow}</span>
            <span>&bull;</span>
            <span>STRATEGIC FOUNDATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold tracking-tight text-white leading-[1.15]">
            {missionVisionSection.heading}
          </h2>
          <p className="text-sm sm:text-base text-[#D8E6E4] font-normal leading-relaxed mt-3">
            {missionVisionSection.subheading}
          </p>
        </div>

        {/* Two Complementary Visual Panels: Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Panel 1: Our Mission */}
          <div className="rounded-3xl bg-[#081B1A] border border-white/15 p-8 sm:p-10 flex flex-col justify-between text-left shadow-xl hover:border-[#16B6B8]/50 transition-colors">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                <span className="font-mono text-xs font-bold text-[#5BC4CC] uppercase tracking-wider">
                  {mission.label}
                </span>
                <span className="font-mono text-xs font-bold text-white/40">
                  {`${mission.number} //`}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                {mission.title}
              </h3>

              <p className="text-sm sm:text-[15px] leading-[1.8] text-[#D8E6E4] font-normal mb-8">
                {mission.statement}
              </p>
            </div>

            <div className="pt-6 border-t border-white/10">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#8BB8B4] block mb-3 font-semibold">
                Core Organizational Commitments
              </span>
              <ul className="space-y-2">
                {mission.pillars.map((pil, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-[#D8E6E4]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16B6B8] shrink-0" />
                    <span>{pil}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Panel 2: Our Vision */}
          <div className="rounded-3xl bg-[#081B1A] border border-white/15 p-8 sm:p-10 flex flex-col justify-between text-left shadow-xl hover:border-[#16B6B8]/50 transition-colors">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                <span className="font-mono text-xs font-bold text-[#5BC4CC] uppercase tracking-wider">
                  {vision.label}
                </span>
                <span className="font-mono text-xs font-bold text-white/40">
                  {`${vision.number} //`}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                {vision.title}
              </h3>

              <p className="text-sm sm:text-[15px] leading-[1.8] text-[#D8E6E4] font-normal mb-8">
                {vision.statement}
              </p>
            </div>

            <div className="pt-6 border-t border-white/10">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#8BB8B4] block mb-3 font-semibold">
                Strategic Global Vision
              </span>
              <ul className="space-y-2">
                {vision.pillars.map((pil, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-[#D8E6E4]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5BC4CC] shrink-0" />
                    <span>{pil}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
