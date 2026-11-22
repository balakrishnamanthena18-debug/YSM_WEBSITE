'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from './ui/Container';
import { ALL_12_COURSES } from '@/data/programs';
import { CourseTechIcon } from './CourseTechIcon';
import { useCart } from '@/context/CartContext';
import { CartDrawer } from './cart/CartDrawer';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  const { cartCount } = useCart();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const pathname = usePathname();

  const isAbout = pathname === '/about';
  const isHome = pathname === '/' || pathname === '';
  const isELearning = pathname === '/e-learning' || pathname === '/elearning';
  const isContact = pathname === '/contact';

  // Close desktop dropdown on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCoursesDropdownOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setCoursesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  // Smooth hover handlers with small debounce to prevent glitchy closing
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setCoursesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setCoursesDropdownOpen(false);
    }, 180);
  };

  return (
    <header className="relative z-50 w-full">
      {/* -------------------------------------------------------------
          TOP NOTICE / ANNOUNCEMENT BANNER
          Uses official Dark Section (#102E2D) with Aqua (#5BC4CC) accents
          ------------------------------------------------------------- */}
      {!bannerDismissed && (
        <div className="w-full bg-[#102E2D] border-b border-white/10 text-white/90 text-xs sm:text-[13px] py-2 sm:py-2.5 px-4 backdrop-blur-md transition-all">
          <Container>
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 text-center sm:text-left flex items-center justify-center sm:justify-start gap-2.5 flex-wrap">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-[#16B6B8]/20 text-[#5BC4CC] border border-[#16B6B8]/35 uppercase tracking-wider">
                  NEW COHORTS
                </span>
                <span className="font-normal text-white/90">
                  Live instructor-led batches enrolling in{' '}
                  <strong className="font-semibold text-white">
                    AI, Data Analytics &amp; Cloud Architecture
                  </strong>
                  .
                </span>
                <Link
                  href="https://wa.me/917997791456"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-[#5BC4CC] hover:text-white transition-colors ml-1"
                >
                  <span>Chat on WhatsApp</span>
                  <svg
                    className="w-3 h-3 ml-0.5 inline-block"
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
                </Link>
              </div>

              {/* Dismiss Button */}
              <button
                type="button"
                onClick={() => setBannerDismissed(true)}
                className="text-white/60 hover:text-white p-1 rounded-md transition-colors"
                aria-label="Dismiss banner"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </Container>
        </div>
      )}

      {/* -------------------------------------------------------------
          PRIMARY STICKY NAVBAR — White, Clean, Corporate
          ------------------------------------------------------------- */}
      <div className="w-full bg-white/95 backdrop-blur-md border-b border-[#E3ECEA] shadow-[0_2px_12px_rgba(17,24,23,0.03)] transition-all">
        <Container>
          <div className="flex items-center justify-between h-[72px] sm:h-[78px] gap-4">
            {/* LEFT: Official Brand Logo */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 group transition-transform duration-200 hover:scale-[1.01]"
              aria-label="YSM Infotech Home"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo/ysm-brand-logo.png"
                alt="YSM Infotech — ISO 9001:2015 Certified"
                className="h-10 sm:h-11 md:h-12 w-auto object-contain select-none pointer-events-none"
              />
            </Link>

            {/* CENTER: Navigation Links */}
            <nav
              className="hidden md:flex items-center gap-7 lg:gap-8 text-[14.5px] font-medium text-[#111817]"
              aria-label="Main Navigation"
            >
              <Link
                href="/"
                className={
                  isHome
                    ? 'text-[#176B68] font-bold transition-colors duration-200'
                    : 'text-[#586765] font-medium hover:text-[#176B68] transition-colors duration-200'
                }
              >
                Home
              </Link>

              <Link
                href="/about"
                className={
                  isAbout
                    ? 'text-[#176B68] font-bold transition-colors duration-200'
                    : 'text-[#586765] font-medium hover:text-[#176B68] transition-colors duration-200'
                }
              >
                About
              </Link>

              {/* COURSES DROPDOWN TRIGGER & MEGA MENU */}
              <div
                ref={dropdownRef}
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setCoursesDropdownOpen((prev) => !prev)}
                  aria-expanded={coursesDropdownOpen}
                  aria-haspopup="true"
                  className={`inline-flex items-center gap-1.5 py-2 font-medium transition-colors duration-200 cursor-pointer ${
                    coursesDropdownOpen
                      ? 'text-[#176B68] font-bold'
                      : 'text-[#586765] hover:text-[#176B68]'
                  }`}
                >
                  <span>Courses</span>
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      coursesDropdownOpen ? 'rotate-180 text-[#176B68]' : 'text-[#586765]'
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                {/* Invisible hover bridge to prevent premature closing */}
                <div
                  className={`absolute -bottom-3 left-0 right-0 h-3 ${
                    coursesDropdownOpen ? 'block' : 'hidden'
                  }`}
                  aria-hidden="true"
                />

                {/* Desktop 12-Course Mega Dropdown Panel */}
                <div
                  className={`absolute top-full -left-48 lg:-left-64 mt-2.5 w-[760px] lg:w-[870px] max-w-[94vw] bg-white rounded-2xl border border-[#E3ECEA] shadow-[0_20px_50px_rgba(17,24,23,0.12),0_4px_16px_rgba(17,24,23,0.04)] p-6 z-50 transition-all duration-200 ${
                    coursesDropdownOpen
                      ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                      : 'opacity-0 -translate-y-2 pointer-events-none invisible'
                  }`}
                  role="menu"
                  aria-label="Courses Catalog"
                >
                    {/* Top Header Bar */}
                    <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#E3ECEA]">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-[#16B6B8] animate-pulse" />
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#176B68]">
                          ALL 12 SPECIALIZED TRACKS
                        </span>
                        <span className="text-xs text-[#586765] hidden sm:inline">
                          &bull; ISO 9001:2015 Accredited
                        </span>
                      </div>

                      <Link
                        href={isHome ? '#programs' : '/#programs'}
                        onClick={() => setCoursesDropdownOpen(false)}
                        className="group inline-flex items-center gap-1.5 text-xs font-semibold text-[#176B68] hover:text-[#104E4D] transition-colors"
                      >
                        <span>View Full Catalog</span>
                        <svg
                          className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </Link>
                    </div>

                    {/* 3-Column Responsive Grid of All 12 Courses */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {ALL_12_COURSES.map((course) => (
                        <Link
                          key={course.id}
                          href={`/courses/${course.slug}`}
                          onClick={() => setCoursesDropdownOpen(false)}
                          className="flex items-center gap-3 p-2.5 rounded-xl transition-all duration-150 hover:bg-[#F5F9F8] group/item text-left cursor-pointer"
                          role="menuitem"
                        >
                          <CourseTechIcon
                            type={course.iconType}
                            accent={course.accent}
                            size="sm"
                            showGlow={false}
                            className="shrink-0 transition-transform duration-150 group-hover/item:scale-105"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span className="font-mono text-[10px] font-semibold text-[#586765] uppercase tracking-wider">
                                Track {course.number}
                              </span>
                              <span className="text-[9.5px] font-semibold px-1.5 py-0.5 bg-[#F5F9F8] text-[#176B68] rounded group-hover/item:bg-white truncate max-w-[120px]">
                                {course.category}
                              </span>
                            </div>
                            <div className="text-[13.5px] font-bold text-[#111817] group-hover/item:text-[#176B68] transition-colors truncate">
                              {course.title}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Bottom Guidance Strip */}
                    <div className="mt-4 pt-3.5 border-t border-[#E3ECEA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs bg-[#F5F9F8] -mx-6 -mb-6 px-6 py-3 rounded-b-2xl">
                      <div className="flex items-center gap-2 text-[#586765]">
                        <span className="font-medium text-[#111817]">Need personalized advice?</span>
                        <span className="text-[#E3ECEA] hidden sm:inline">&bull;</span>
                        <span className="hidden sm:inline">Connect with our senior academic mentors</span>
                      </div>
                      <a
                        href="https://wa.me/917997791456?text=Hi%20YSM%20Infotech%2C%20I%20would%20like%20guidance%20on%20choosing%20the%20right%20training%20program."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-bold text-[#176B68] hover:text-[#104E4D] transition-colors"
                      >
                        <span>Chat on WhatsApp</span>
                        <svg
                          className="w-3.5 h-3.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
              </div>

              <Link
                href="/e-learning"
                className={
                  isELearning
                    ? 'text-[#176B68] font-bold transition-colors duration-200'
                    : 'text-[#586765] font-medium hover:text-[#176B68] transition-colors duration-200'
                }
              >
                E-Learning
              </Link>

              <Link
                href="/contact"
                className={
                  isContact
                    ? 'text-[#176B68] font-bold transition-colors duration-200'
                    : 'text-[#586765] font-medium hover:text-[#176B68] transition-colors duration-200'
                }
              >
                Contact
              </Link>
            </nav>

            {/* RIGHT: Cart, Learning Portal & Auth Actions */}
            <div className="hidden md:flex items-center gap-3">
              {/* Shopping Cart Button */}
              <button
                type="button"
                onClick={() => setCartDrawerOpen(true)}
                className="relative p-2.5 rounded-xl text-[#586765] hover:text-[#176B68] hover:bg-[#F5F8F7] transition-colors cursor-pointer"
                aria-label={`View shopping cart with ${cartCount} items`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#16B6B8] text-[#0A201F] text-[11px] font-extrabold flex items-center justify-center shadow-xs animate-scale-in">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* My Learning Link */}
              <Link
                href="/learning"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#586765] hover:text-[#176B68] px-3 py-2 rounded-lg hover:bg-[#F5F8F7] transition-colors"
              >
                <span>My Learning</span>
              </Link>

              {/* Login / Portal Link */}
              <Link
                href="/login"
                className="inline-flex items-center justify-center text-xs font-bold text-[#176B68] border border-[#176B68]/30 hover:border-[#176B68] px-3.5 py-2 rounded-lg hover:bg-[#EBF7F5] transition-colors"
              >
                Sign In
              </Link>

              {/* Primary Live Training CTA */}
              <Link
                href="/courses"
                className="group inline-flex items-center gap-2 h-[40px] px-4 rounded-lg bg-[#176B68] hover:bg-[#104E4D] text-white text-xs font-bold tracking-wide transition-all duration-200 shadow-sm active:scale-[0.98]"
              >
                <span>Explore Catalog</span>
                <svg
                  className="w-3.5 h-3.5 text-white transition-transform duration-200 group-hover:translate-x-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#111817] hover:bg-[#F5F9F8] focus-visible:outline-none"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Dropdown Panel */}
          {mobileMenuOpen && (
            <div className="md:hidden pt-3 pb-6 border-t border-[#E3ECEA] bg-white rounded-xl p-4 mt-2 shadow-xl border animate-hero-fade">
              <nav className="flex flex-col gap-2 font-medium text-base text-[#111817]">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 px-3 rounded-lg font-semibold ${
                    isHome ? 'bg-[#F5F9F8] text-[#176B68]' : 'text-[#111817] hover:bg-[#F5F9F8]'
                  }`}
                >
                  Home
                </Link>

                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 px-3 rounded-lg font-semibold ${
                    isAbout ? 'bg-[#F5F9F8] text-[#176B68]' : 'text-[#111817] hover:bg-[#F5F9F8]'
                  }`}
                >
                  About
                </Link>

                {/* Mobile Courses Accordion (All 12 Programs) */}
                <div className="border-y border-[#E3ECEA]/80 py-1 my-1">
                  <button
                    type="button"
                    onClick={() => setMobileCoursesOpen((prev) => !prev)}
                    className="w-full flex items-center justify-between py-2 px-3 rounded-lg hover:bg-[#F5F9F8] text-[#111817] font-semibold"
                  >
                    <span className="flex items-center gap-2">
                      <span>Courses</span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#16B6B8]/15 text-[#176B68] border border-[#16B6B8]/30">
                        12 Tracks
                      </span>
                    </span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 text-[#586765] ${
                        mobileCoursesOpen ? 'rotate-180 text-[#176B68]' : ''
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  {mobileCoursesOpen && (
                    <div className="pl-1 pr-1 pt-2 pb-1 space-y-1 max-h-[340px] overflow-y-auto">
                      {ALL_12_COURSES.map((course) => (
                        <Link
                          key={course.id}
                          href={`/courses/${course.slug}`}
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileCoursesOpen(false);
                          }}
                          className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[#F5F9F8] text-left transition-colors"
                        >
                          <CourseTechIcon
                            type={course.iconType}
                            accent={course.accent}
                            size="sm"
                            showGlow={false}
                            className="shrink-0 scale-90"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono text-[9.5px] text-[#586765] font-semibold">
                                {course.number}
                              </span>
                              <span className="text-xs font-bold text-[#111817] truncate">
                                {course.title}
                              </span>
                            </div>
                            <span className="text-[10.5px] text-[#586765] block truncate">
                              {course.category}
                            </span>
                          </div>
                        </Link>
                      ))}

                      <div className="pt-2 px-2">
                        <Link
                          href={isHome ? '#programs' : '/#programs'}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-center py-2 text-xs font-semibold text-[#176B68] bg-[#F5F9F8] rounded-lg border border-[#E3ECEA]"
                        >
                          View Full 12-Track Catalog &rarr;
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                <Link
                  href="/e-learning"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 px-3 rounded-lg hover:bg-[#F5F9F8] transition-colors ${
                    isELearning ? 'text-[#176B68] font-bold bg-[#F5F9F8]' : 'text-[#586765]'
                  }`}
                >
                  E-Learning
                </Link>

                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 px-3 rounded-lg hover:bg-[#F5F9F8] transition-colors ${
                    isContact ? 'text-[#176B68] font-bold bg-[#F5F9F8]' : 'text-[#586765]'
                  }`}
                >
                  Contact
                </Link>

                <div className="pt-2 pb-1 border-t border-[#E3ECEA] flex items-center justify-between px-3">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setCartDrawerOpen(true);
                    }}
                    className="flex items-center gap-2 text-xs font-bold text-[#176B68]"
                  >
                    <span>Shopping Cart</span>
                    {cartCount > 0 && (
                      <span className="w-5 h-5 rounded-full bg-[#16B6B8] text-[#0A201F] text-[10px] font-bold flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </button>
                  <Link
                    href="/learning"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs font-bold text-[#586765]"
                  >
                    My Learning
                  </Link>
                </div>

                <div className="pt-1 flex gap-2">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 flex items-center justify-center py-2.5 rounded-lg border border-[#176B68] text-xs font-bold text-[#176B68]"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/courses"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 flex items-center justify-center py-2.5 rounded-lg bg-[#176B68] text-xs font-bold text-white"
                  >
                    Catalog
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </Container>
      </div>

      {/* Slide-Over Shopping Cart Drawer */}
      <CartDrawer isOpen={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />
    </header>
  );
}