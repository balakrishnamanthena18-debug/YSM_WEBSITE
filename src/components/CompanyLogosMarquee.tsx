'use client';

import React from 'react';
import {
  ROW_1_INDIAN_IT_SERVICES,
  ROW_2_HYDERABAD_EMPLOYERS,
  ROW_3_ENTERPRISE_ECOSYSTEM,
  CompanyLogo,
} from './CompanyLogos';

interface MarqueeRowProps {
  logos: CompanyLogo[];
  direction: 'left' | 'right';
  speedClass: string;
  categoryLabel: string;
  accent: {
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    dotBg: string;
  };
}

function MarqueeRow({ logos, speedClass, categoryLabel, accent }: MarqueeRowProps) {
  // 4 seamless repetitions for mathematical -25% infinite looping with zero pop or gap
  const quadLogos = React.useMemo(
    () => [...logos, ...logos, ...logos, ...logos],
    [logos]
  );

  return (
    <div className="relative group/row flex flex-col gap-3 overflow-hidden py-1.5 select-none">
      {/* Category Header with Domain Accent Marker */}
      <div className="flex items-center gap-3 px-4 max-w-7xl mx-auto w-full">
        <div
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[10.5px] font-semibold uppercase tracking-[0.2em] ${accent.badgeBg} ${accent.badgeText} border ${accent.badgeBorder}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${accent.dotBg}`} />
          <span>{categoryLabel}</span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-[#E3ECEA] to-transparent" />
      </div>

      {/* Marquee Viewport with Silky Smooth Edge Fade Curtains & Mask */}
      <div className="relative w-full overflow-hidden py-2">
        {/* Generous edge curtains matching section background */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-28 sm:w-44 md:w-56 bg-gradient-to-r from-white via-white/95 to-transparent z-10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-28 sm:w-44 md:w-56 bg-gradient-to-l from-white via-white/95 to-transparent z-10"
          aria-hidden="true"
        />

        {/* Dual CSS Alpha Mask for seamless edge feathering */}
        <div
          className="w-full overflow-hidden"
          style={{
            maskImage:
              'linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)',
          }}
        >
          <div
            className={`flex shrink-0 gap-4 sm:gap-6 md:gap-7 items-center w-max ${speedClass} group-hover/row:[animation-play-state:paused]`}
          >
            {quadLogos.map((logo, idx) => (
              <div
                key={`${logo.id}-${idx}`}
                className="h-14 sm:h-16 px-6 sm:px-8 rounded-xl bg-[#F5F9F8] hover:bg-white border border-[#E3ECEA] hover:border-[#16B6B8]/60 shadow-[0_1px_3px_rgba(17,24,23,0.02)] hover:shadow-md flex items-center justify-center shrink-0 transition-all duration-200 ease-out hover:-translate-y-0.5 cursor-default group"
                title={logo.name}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo.src}
                  alt={logo.name}
                  className={`${logo.heightClass || 'h-6 sm:h-7 md:h-8'} w-auto max-w-[130px] sm:max-w-[150px] object-contain select-none pointer-events-none opacity-85 group-hover:opacity-100 transition-opacity duration-200`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CompanyLogosMarquee() {
  return (
    <div className="relative w-full space-y-6 sm:space-y-8 my-4 sm:my-6">
      {/* ROW 1 — INDIAN IT SERVICES (Deep Teal #176B68) */}
      <MarqueeRow
        logos={ROW_1_INDIAN_IT_SERVICES}
        direction="left"
        speedClass="animate-marquee-left"
        categoryLabel="Indian IT Services Leaders"
        accent={{
          badgeBg: 'bg-[#F5F9F8]',
          badgeText: 'text-[#176B68]',
          badgeBorder: 'border-[#E3ECEA]',
          dotBg: 'bg-[#16B6B8]',
        }}
      />

      {/* ROW 2 — HYDERABAD TECHNOLOGY EMPLOYERS (Dark Teal #104E4D) */}
      <MarqueeRow
        logos={ROW_2_HYDERABAD_EMPLOYERS}
        direction="right"
        speedClass="animate-marquee-right"
        categoryLabel="Hyderabad Hubs & Global Enterprises"
        accent={{
          badgeBg: 'bg-[#F5F9F8]',
          badgeText: 'text-[#104E4D]',
          badgeBorder: 'border-[#E3ECEA]',
          dotBg: 'bg-[#5BC4CC]',
        }}
      />

      {/* ROW 3 — ENTERPRISE TECHNOLOGY ECOSYSTEM (Primary Teal #16B6B8) */}
      <MarqueeRow
        logos={ROW_3_ENTERPRISE_ECOSYSTEM}
        direction="left"
        speedClass="animate-marquee-slow"
        categoryLabel="Enterprise Technology Ecosystem"
        accent={{
          badgeBg: 'bg-[#F5F9F8]',
          badgeText: 'text-[#176B68]',
          badgeBorder: 'border-[#E3ECEA]',
          dotBg: 'bg-[#16B6B8]',
        }}
      />
    </div>
  );
}
