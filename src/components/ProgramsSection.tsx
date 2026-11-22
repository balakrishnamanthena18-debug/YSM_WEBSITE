'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from './ui/Container';
import { CourseExplorerIllustration } from './CourseExplorerIllustration';
import { CourseCard } from './CourseCard';
import {
  PROGRAM_CATEGORIES,
  ALL_12_COURSES,
  ProgramCategorySlug,
  getCoursesByCategory,
} from '@/data/programs';

export function ProgramsSection() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] =
    useState<ProgramCategorySlug>('all');
  const [hasScrolledIntoView, setHasScrolledIntoView] = useState(false);

  const coursesGridRef = useRef<HTMLDivElement>(null);

  // Filter courses based on active category
  const displayedCourses = getCoursesByCategory(selectedCategory);
  const activeCategoryMeta = PROGRAM_CATEGORIES.find(
    (c) => c.id === selectedCategory
  );

  // Trigger smooth card reveal once the catalog enters the viewport
  useEffect(() => {
    if (!coursesGridRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasScrolledIntoView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(coursesGridRef.current);

    return () => observer.disconnect();
  }, []);

  // Listen for external course triggers (e.g. from navbar dropdown or URL params)
  useEffect(() => {
    const handleOpenCourse = (e: Event) => {
      const customEvent = e as CustomEvent<{ slug?: string; id?: string }>;
      const { slug, id } = customEvent.detail || {};
      const target = ALL_12_COURSES.find(
        (c) => c.slug === slug || c.id === id || c.slug === id
      );
      if (target) {
        router.push(`/courses/${target.slug}`);
      }
    };

    window.addEventListener('ysm:open-course', handleOpenCourse);

    // Also check URL parameters and hash on load: immediately redirect to the dedicated page
    const checkUrl = () => {
      if (typeof window === 'undefined') return;
      const params = new URLSearchParams(window.location.search);
      const courseParam = params.get('course');
      const hash = window.location.hash.replace('#', '');
      const candidate =
        courseParam ||
        (hash.startsWith('course-') ? hash.replace('course-', '') : null);

      if (candidate) {
        const target = ALL_12_COURSES.find(
          (c) => c.slug === candidate || c.id === candidate
        );
        if (target) {
          router.replace(`/courses/${target.slug}`);
        }
      }
    };

    checkUrl();
    window.addEventListener('hashchange', checkUrl);

    return () => {
      window.removeEventListener('ysm:open-course', handleOpenCourse);
      window.removeEventListener('hashchange', checkUrl);
    };
  }, [router]);

  // Bottom "View All Programs" handler
  const handleViewAllPrograms = () => {
    setSelectedCategory('all');
    if (coursesGridRef.current) {
      coursesGridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="programs"
      className="relative pt-10 sm:pt-12 md:pt-14 pb-20 sm:pb-24 lg:pb-28 bg-gradient-to-b from-[#FFFFFF] via-[#F4FAF9] to-[#FFFFFF] overflow-hidden"
      aria-labelledby="course-explorer-heading"
    >
      {/* Anchors for #courses links */}
      <div id="courses" className="absolute -top-24" aria-hidden="true" />
      {/* Subtle Background Architectural Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,rgba(0,107,104,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,107,104,0.04)_1px,transparent_1px)] [background-size:48px_48px]"
        aria-hidden="true"
      />

      {/* Slowly Shifting Teal Radial Lighting Blooms */}
      <div
        className="pointer-events-none absolute -top-16 right-[8%] w-[560px] h-[560px] rounded-full bg-[#12AFA8]/6 blur-[130px] animate-bg-breathe"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-12 left-[5%] w-[480px] h-[480px] rounded-full bg-[#006B68]/5 blur-[120px]"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        {/* =========================================================================
            1. HERO INTRODUCTION: Left Content + Right 3D Tech Illustration
            Proportionately balanced with tight vertical rhythm after preceding logo strip
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-14 items-center">
          
          {/* Left Column: Eyebrow, Main Heading, Supporting Text, 3 Key Benefits (7 cols) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
            {/* Eyebrow */}
            <div className="animate-hero-fade inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006B68]/8 border border-[#006B68]/18 text-[#006B68]">
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.15em]">
                MASTER TOMORROW&apos;S TECHNOLOGY
              </span>
            </div>

            {/* Main Heading (prominent without consuming excessive vertical space) */}
            <h2
              id="course-explorer-heading"
              className="animate-hero-fade delay-1 text-[32px] sm:text-[38px] md:text-[44px] lg:text-[46px] xl:text-[50px] font-bold tracking-tight text-[#071B1C] leading-[1.12]"
            >
              Build Skills for the <span className="text-[#006B68]">AI-Powered Future</span>
            </h2>

            {/* Supporting Text */}
            <p className="animate-hero-fade delay-2 text-[15px] sm:text-[16.5px] leading-[1.62] text-[#071B1C]/75 font-normal max-w-xl">
              Explore industry-focused programs in data analytics, artificial intelligence, programming, and cloud engineering—designed to help you develop practical, job-ready skills.
            </p>

            {/* Three Supporting Benefits Cards with Staggered Entrance & Micro-Interactions */}
            <div className="animate-hero-fade delay-3 pt-1 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3.5">
              {/* Benefit 1 */}
              <div className="group flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#006B68]/30 hover:-translate-y-1 transition-all duration-300">
                <span className="w-8 h-8 rounded-lg bg-[#006B68]/10 text-[#006B68] flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                </span>
                <div>
                  <h3 className="text-[13px] font-bold text-[#071B1C] leading-tight group-hover:text-[#006B68] transition-colors">Practical Curriculum</h3>
                  <p className="text-[11px] text-[#071B1C]/65 leading-tight mt-0.5">Designed by Industry Experts</p>
                </div>
              </div>

              {/* Benefit 2 */}
              <div className="group flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#008F8B]/30 hover:-translate-y-1 transition-all duration-300">
                <span className="w-8 h-8 rounded-lg bg-[#12AFA8]/12 text-[#008F8B] flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </span>
                <div>
                  <h3 className="text-[13px] font-bold text-[#071B1C] leading-tight group-hover:text-[#008F8B] transition-colors">Real-World Projects</h3>
                  <p className="text-[11px] text-[#071B1C]/65 leading-tight mt-0.5">Build Job-Ready Skills</p>
                </div>
              </div>

              {/* Benefit 3 */}
              <div className="group flex items-start gap-3 p-3.5 rounded-xl bg-white border border-[#E3ECEA] shadow-xs hover:shadow-md hover:border-[#176B68]/30 hover:-translate-y-0.5 transition-all duration-300">
                <span className="w-8 h-8 rounded-lg bg-[#16B6B8]/15 text-[#176B68] flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </span>
                <div>
                  <h3 className="text-[13px] font-bold text-[#111817] leading-tight group-hover:text-[#176B68] transition-colors">Career Support</h3>
                  <p className="text-[11px] text-[#586765] leading-tight mt-0.5">Guidance for Your Growth</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Art-Directed Technology Illustration with entrance scale (5 cols) */}
          <div className="lg:col-span-5 w-full animate-hero-image delay-2">
            <CourseExplorerIllustration />
          </div>

        </div>

        {/* =========================================================================
            2. NATURAL TRANSITION INTO COURSE CATALOG & CATEGORY NAVIGATION
            Deliberate vertical breathing room and structured domain indicator
            ========================================================================= */}
        <div ref={coursesGridRef} className="scroll-mt-24 mt-16 sm:mt-20 md:mt-24 mb-10 sm:mb-12">
          
          {/* Subtle transition divider with domain badge */}
          <div className="flex items-center justify-between gap-4 mb-5 pb-3 border-b border-slate-200/85">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#071B1C]/70">
                Explore by Domain
              </span>
            </div>
            <div className="text-xs font-medium text-[#006B68]">
              Showing {displayedCourses.length} of {ALL_12_COURSES.length} specialized tracks
            </div>
          </div>

          {/* Horizontal Category Navigation */}
          <nav
            className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Filter courses by category"
            role="tablist"
          >
            {PROGRAM_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              // Compute dynamic count for badge
              const count =
                cat.id === 'all'
                  ? ALL_12_COURSES.length
                  : ALL_12_COURSES.filter((c) => c.categories.includes(cat.id)).length;

              const activeStyle = {
                all: 'bg-[#176B68] text-white shadow-md shadow-[#176B68]/20 border-[#176B68]',
                'data-analytics': 'bg-[#104E4D] text-white shadow-md shadow-[#104E4D]/20 border-[#104E4D]',
                'artificial-intelligence': 'bg-[#176B68] text-white shadow-md shadow-[#176B68]/20 border-[#176B68]',
                programming: 'bg-[#104E4D] text-white shadow-md shadow-[#104E4D]/20 border-[#104E4D]',
                'cloud-devops': 'bg-[#176B68] text-white shadow-md shadow-[#176B68]/20 border-[#176B68]',
                'business-strategy': 'bg-[#104E4D] text-white shadow-md shadow-[#104E4D]/20 border-[#104E4D]',
              }[cat.id];

              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="course-collection-grid"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-4.5 sm:px-5 py-2.5 rounded-full text-xs sm:text-[13px] font-semibold tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006B68]/40 ${
                    isActive
                      ? `${activeStyle} border`
                      : 'bg-white hover:bg-slate-50 text-[#071B1C]/80 hover:text-[#006B68] border border-slate-200/90 hover:border-[#006B68]/30 hover:-translate-y-0.5 shadow-xs'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`inline-flex items-center justify-center px-1.5 py-0.2 rounded-full text-[10.5px] font-mono ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-[#071B1C]/60'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Category Description Banner when filtered */}
        {selectedCategory !== 'all' && activeCategoryMeta && (
          <div className="mb-8 p-4 rounded-xl bg-white border border-[#006B68]/18 shadow-xs flex items-center justify-between gap-4 flex-wrap animate-card-reveal">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006B68]" />
              <p className="text-xs sm:text-sm text-[#071B1C]/80 font-medium">
                {activeCategoryMeta.description}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className="text-xs font-semibold text-[#006B68] hover:underline cursor-pointer"
            >
              Reset to All Programs &times;
            </button>
          </div>
        )}

        {/* =========================================================================
            3. COURSE COLLECTION — FOUR-COLUMN DESKTOP GRID (12 COURSES)
            Reveals with staggered upward transition and micro-interactions
            ========================================================================= */}
        <div
          id="course-collection-grid"
          role="tabpanel"
          key={selectedCategory}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6 items-stretch transition-opacity duration-700 ${
            hasScrolledIntoView ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {displayedCourses.map((course, idx) => (
            <CourseCard
              key={course.id}
              course={course}
              index={idx}
            />
          ))}
        </div>

        {/* =========================================================================
            4. BOTTOM NAVIGATION: Centered "View All Programs" Button
            ========================================================================= */}
        <div className="mt-14 sm:mt-16 text-center flex flex-col items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleViewAllPrograms}
            className="group inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-white text-[#006B68] border-2 border-[#006B68] hover:bg-[#006B68] hover:text-white transition-all duration-200 font-semibold text-sm sm:text-[15px] tracking-wide shadow-sm hover:shadow-lg hover:shadow-[#006B68]/15 cursor-pointer active:scale-[0.98]"
          >
            <span>View All Programs</span>
            <svg
              className="w-4 h-4 text-[#006B68] group-hover:text-white transition-transform duration-200 group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>

          <span className="text-xs font-mono text-[#071B1C]/50">
            Showing all 12 enterprise curricula • ISO 9001:2015 Certified
          </span>
        </div>
      </Container>
    </section>
  );
}
