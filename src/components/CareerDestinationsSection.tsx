'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Container } from './ui/Container';
import { CompanyLogosMarquee } from './CompanyLogosMarquee';
import { CAREER_METRICS, CareerMetric } from './CompanyLogos';

/**
 * Minimalist, lightweight count-up hook using requestAnimationFrame and cubic easing.
 * Respects prefers-reduced-motion to avoid unnecessary animations.
 */
function useCountUp(target: number, isVisible: boolean, durationMs = 1500) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let animId: number;
    let startTime: number | null = null;

    const isReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isReduced) {
      animId = requestAnimationFrame(() => setCount(target));
      return () => cancelAnimationFrame(animId);
    }

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isVisible, target, durationMs]);

  return count;
}

function StatItem({
  metric,
  isVisible,
}: {
  metric: CareerMetric;
  isVisible: boolean;
}) {
  const animatedValue = useCountUp(metric.value, isVisible);

  const config = {
    'hands-on-hours': {
      text: 'text-[#176B68]',
      badgeBg: 'bg-white',
      badgeText: 'text-[#176B68]',
      badgeBorder: 'border-[#E3ECEA]',
      dotBg: 'bg-[#16B6B8]',
      subtext: 'Enterprise Lab Rigor',
    },
    'competitions-placed': {
      text: 'text-[#104E4D]',
      badgeBg: 'bg-white',
      badgeText: 'text-[#104E4D]',
      badgeBorder: 'border-[#E3ECEA]',
      dotBg: 'bg-[#5BC4CC]',
      subtext: 'Industry Placements',
    },
    'completion-rate': {
      text: 'text-[#176B68]',
      badgeBg: 'bg-white',
      badgeText: 'text-[#176B68]',
      badgeBorder: 'border-[#E3ECEA]',
      dotBg: 'bg-[#16B6B8]',
      subtext: 'Academic Retention',
    },
  }[metric.id] || {
    text: 'text-[#176B68]',
    badgeBg: 'bg-white',
    badgeText: 'text-[#176B68]',
    badgeBorder: 'border-[#E3ECEA]',
    dotBg: 'bg-[#16B6B8]',
    subtext: 'Verified Outcome',
  };

  return (
    <div className="flex flex-col py-6 sm:py-8 px-4 sm:px-8 text-left transition-all duration-200">
      {/* Category Micro-Badge */}
      <div className="flex items-center justify-between mb-3">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[10.5px] font-semibold uppercase tracking-[0.18em] ${config.badgeBg} ${config.badgeText} border ${config.badgeBorder}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${config.dotBg}`} />
          <span>{metric.categoryLabel}</span>
        </span>
        <span className="text-[11px] font-mono text-[#586765]/70 uppercase tracking-wider">
          {config.subtext}
        </span>
      </div>

      {/* Large Refined Typography */}
      <div className="flex items-baseline tracking-tight text-[#111817] my-2">
        <span className="text-5xl sm:text-6xl lg:text-[62px] leading-none tabular-nums font-bold">
          {isVisible ? animatedValue : metric.value}
        </span>
        <span className={`text-3xl sm:text-4xl ${config.text} font-bold ml-1.5`}>
          {metric.suffix}
        </span>
      </div>

      {/* Description */}
      <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-[#586765] font-normal max-w-xs mt-2">
        {metric.description}
      </p>
    </div>
  );
}

export function CareerDestinationsSection() {
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
      id="career-destinations"
      className="relative py-24 sm:py-28 md:py-32 bg-white border-t border-[#E3ECEA] overflow-hidden"
      aria-labelledby="career-destinations-heading"
    >
      {/* Secondary anchor for #graduates */}
      <div id="graduates" className="absolute -top-24" aria-hidden="true" />

      {/* Subtle Background Architectural Ambience */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(to_right,rgba(22,182,184,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(22,182,184,0.035)_1px,transparent_1px)] [background-size:56px_56px]"
        aria-hidden="true"
      />

      {/* Depth Glow Accents */}
      <div
        className="pointer-events-none absolute top-1/4 -right-[10%] w-[500px] h-[500px] rounded-full bg-[#16B6B8]/5 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 -left-[10%] w-[480px] h-[480px] rounded-full bg-[#176B68]/4 blur-[120px]"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        {/* =========================================================================
            1. SECTION INTRODUCTION & REFINED HEADING HIERARCHY
            ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5F9F8] border border-[#E3ECEA] text-[#176B68] mb-4 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16B6B8]" />
            <span className="text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-[0.2em]">
              CAREER DESTINATIONS
            </span>
          </div>

          {/* Main Exact Heading */}
          <h2
            id="career-destinations-heading"
            className="text-[32px] sm:text-[40px] md:text-[46px] font-bold tracking-tight text-[#111817] leading-[1.14] mb-4"
          >
            Where Our Graduates Work
          </h2>

          {/* Supporting Exact Text */}
          <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#586765] font-normal max-w-2xl mx-auto">
            Explore the companies shaping India&apos;s technology landscape — from leading IT services providers to global enterprises with a strong presence in Hyderabad.
          </p>
        </div>

        {/* =========================================================================
            2. THREE-ROW FLOATING BRAND ECOSYSTEM MARQUEE
            ========================================================================= */}
        <CompanyLogosMarquee />

        {/* =========================================================================
            3. STATISTICS SECTION (Elevated Enterprise Architecture Panel)
            ========================================================================= */}
        <div className="mt-14 sm:mt-18 max-w-6xl mx-auto rounded-xl bg-[#F5F9F8] border border-[#E3ECEA] shadow-[0_2px_16px_rgba(17,24,23,0.03)] p-4 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E3ECEA]">
            {CAREER_METRICS.map((metric) => (
              <StatItem
                key={metric.id}
                metric={metric}
                isVisible={hasEnteredView}
              />
            ))}
          </div>

          {/* Minimalist Ecosystem & Verification Footnote */}
          <div className="mt-6 pt-5 border-t border-[#E3ECEA] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs text-[#586765] px-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#176B68]" />
              <span>
                <strong className="text-[#111817]">Enterprise Ecosystem:</strong> Corporate logos represent prominent technology services firms and Hyderabad global hubs across Data, Cloud, and Software domains.
              </span>
            </div>
            <div className="text-[11px] font-mono text-[#586765] tracking-wide">
              ISO 9001:2015 Verified • Batch Evaluations
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
