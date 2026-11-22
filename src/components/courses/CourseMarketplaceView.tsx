'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Course, CourseCategory } from '@/lib/db/schema';
import { useCart } from '@/context/CartContext';
import { CourseTechIcon, TechIconType } from '@/components/CourseTechIcon';

function getCourseIconType(slug: string): TechIconType {
  switch (slug) {
    case 'advanced-excel-with-ai':
      return 'excel';
    case 'sql':
      return 'sql';
    case 'power-bi-with-ai':
      return 'power-bi';
    case 'tableau':
      return 'tableau';
    case 'data-analytics-gen-ai':
      return 'data-analytics';
    case 'python-for-ai':
      return 'python';
    case 'ai-ml':
      return 'ai-ml';
    case 'data-science-with-gen-ai':
      return 'data-science';
    case 'ai-engineer':
      return 'ai-engineer';
    case 'gen-ai-agentic-ai':
      return 'agentic-ai';
    case 'azure-devops':
      return 'azure-devops';
    case 'business-analyst-ai':
      return 'business-analyst';
    default:
      return 'python';
  }
}

interface CourseMarketplaceViewProps {
  initialCourses: Course[];
  categories: CourseCategory[];
}

export function CourseMarketplaceView({
  initialCourses,
  categories,
}: CourseMarketplaceViewProps) {
  const { addToCart, isInCart, toggleWishlist, isInWishlist } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popularity');

  // Filter & sort logic
  const filteredCourses = useMemo(() => {
    return initialCourses
      .filter((course) => {
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = course.title.toLowerCase().includes(q);
          const matchesDesc = course.description.toLowerCase().includes(q);
          const matchesTools = course.toolsCovered.some((t) => t.toLowerCase().includes(q));
          if (!matchesTitle && !matchesDesc && !matchesTools) return false;
        }

        // Category filter
        if (selectedCategory !== 'all') {
          if (course.categorySlug !== selectedCategory) return false;
        }

        // Level filter
        if (selectedLevel !== 'all') {
          if (course.skillLevel.toLowerCase() !== selectedLevel.toLowerCase()) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'price_asc') return a.discountPrice - b.discountPrice;
        if (sortBy === 'price_desc') return b.discountPrice - a.discountPrice;
        if (sortBy === 'newest') return b.id.localeCompare(a.id);
        // Default: popularity by student count
        return b.studentsCount - a.studentsCount;
      });
  }, [initialCourses, searchQuery, selectedCategory, selectedLevel, sortBy]);

  const featuredCourses = useMemo(() => {
    return initialCourses.filter((c) => c.isFeatured).slice(0, 3);
  }, [initialCourses]);

  return (
    <div className="bg-[#F8FAFA] min-h-screen">
      {/* 1. EDITORIAL MARKETPLACE HERO */}
      <section className="relative bg-[#0B201F] text-white pt-10 pb-16 sm:pt-14 sm:pb-20 border-b border-[#163635] overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-10 [background-image:linear-gradient(to_right,rgba(22,182,184,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(22,182,184,0.15)_1px,transparent_1px)] [background-size:48px_48px]"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <div className="max-w-3xl space-y-4 text-left">
            {/* Accreditation Badge */}
            <div className="flex items-center gap-2.5 text-xs">
              <span className="font-mono text-[11px] font-bold tracking-wider uppercase text-[#5BC4CC] bg-white/5 px-2.5 py-1 rounded border border-white/10">
                ISO 9001:2015 ACCREDITED COURSE COMMERCE
              </span>
              <span className="text-white/30">&bull;</span>
              <span className="text-xs font-medium text-[#D8E6E4]">
                {initialCourses.length} Curated Technology Specializations
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.15]">
              Explore Our Industry-Leading Course Catalog
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-[17px] text-[#D8E6E4] font-normal leading-relaxed max-w-2xl">
              Professional training programs designed and instructed by seasoned software architects. Master high-demand skills in AI, Data Analytics, Cloud &amp; DevOps with live practical labs and completion certifications.
            </p>

            {/* Interactive Search Bar in Hero */}
            <div className="pt-4 max-w-xl">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by technology (e.g. Python, Power BI, SQL, Azure, Generative AI)..."
                  className="w-full bg-white text-[#111817] placeholder:text-[#8A9795] text-sm pl-11 pr-4 py-3.5 rounded-xl border border-transparent shadow-lg focus:outline-hidden focus:ring-2 focus:ring-[#16B6B8]"
                />
                <svg
                  className="w-5 h-5 text-[#8A9795] absolute left-3.5 pointer-events-none"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 text-xs font-semibold text-[#8A9795] hover:text-[#111817] px-2 py-1"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. FEATURED COURSES HIGHLIGHT (If No Active Filter) */}
      {!searchQuery && selectedCategory === 'all' && selectedLevel === 'all' && (
        <section className="py-12 bg-white border-b border-[#E3ECEA]">
          <Container>
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="font-mono text-[11px] font-bold text-[#176B68] uppercase tracking-wider block mb-1">
                  RECOMMENDED FOR ENTERPRISE READINESS
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111817]">
                  Featured Specializations
                </h2>
              </div>
              <span className="text-xs font-semibold text-[#586765] hidden sm:inline">
                Hand-Picked by Senior Faculty
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredCourses.map((course) => (
                <div
                  key={course.id}
                  className="rounded-2xl border border-[#E3ECEA] bg-white p-6 shadow-xs hover:border-[#16B6B8] hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold font-mono uppercase px-2 py-0.5 rounded bg-[#EBF7F5] text-[#176B68]">
                        Featured &bull; {course.categoryName}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleWishlist(course.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isInWishlist(course.id)
                            ? 'text-red-500 bg-red-50'
                            : 'text-[#8A9795] hover:text-red-500 hover:bg-neutral-50'
                        }`}
                        title="Add to wishlist"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-start gap-3.5 mb-3">
                      <CourseTechIcon
                        type={getCourseIconType(course.slug)}
                        size="md"
                      />
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/courses/${course.slug}`}
                          className="text-lg font-bold text-[#111817] group-hover:text-[#176B68] transition-colors leading-snug line-clamp-2"
                        >
                          {course.title}
                        </Link>
                        <span className="text-xs text-[#586765] block mt-0.5">
                          by {course.instructorName}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-[#586765] line-clamp-2 leading-relaxed mb-4">
                      {course.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E3ECEA] flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-[#111817]">
                          ₹{course.discountPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-[#8A9795] line-through">
                          ₹{course.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#176B68] font-bold">
                        ★ {course.rating} ({course.reviewsCount} reviews)
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => addToCart(course)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                        isInCart(course.id)
                          ? 'bg-[#EBF7F5] text-[#176B68] border border-[#16B6B8]'
                          : 'bg-[#176B68] text-white hover:bg-[#104E4D]'
                      }`}
                    >
                      {isInCart(course.id) ? '✓ In Cart' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 3. CATALOGUE CONTROLS & MAIN GRID */}
      <section className="py-12 sm:py-16">
        <Container>
          {/* Filter & Sort Bar */}
          <div className="bg-white rounded-2xl border border-[#E3ECEA] p-5 sm:p-6 mb-8 shadow-xs space-y-5">
            {/* Category Pills */}
            <div>
              <span className="text-xs font-bold text-[#586765] uppercase tracking-wider block mb-3 font-mono">
                Browse by Category
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-[#176B68] text-white shadow-xs'
                      : 'bg-[#F8FAFA] text-[#586765] border border-[#E3ECEA] hover:bg-neutral-100'
                  }`}
                >
                  All Categories ({initialCourses.length})
                </button>
                {categories.map((cat) => {
                  const count = initialCourses.filter((c) => c.categorySlug === cat.slug).length;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        selectedCategory === cat.slug
                          ? 'bg-[#176B68] text-white shadow-xs'
                          : 'bg-[#F8FAFA] text-[#586765] border border-[#E3ECEA] hover:bg-neutral-100'
                      }`}
                    >
                      {cat.name} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Second Row: Filters and Sorters */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#E3ECEA]">
              <div className="flex flex-wrap items-center gap-3 text-xs">
                {/* Level Filter */}
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-[#586765]">Skill Level:</span>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="bg-[#F8FAFA] border border-[#E3ECEA] rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#111817] focus:outline-hidden focus:border-[#176B68]"
                  >
                    <option value="all">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Medium">Medium</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                {/* Active Filter Clear */}
                {(selectedCategory !== 'all' || selectedLevel !== 'all' || searchQuery) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedLevel('all');
                      setSearchQuery('');
                    }}
                    className="text-[#176B68] font-bold hover:underline"
                  >
                    Reset Filters
                  </button>
                )}
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-[#586765]">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#F8FAFA] border border-[#E3ECEA] rounded-lg px-3 py-1.5 text-xs font-medium text-[#111817] focus:outline-hidden focus:border-[#176B68]"
                >
                  <option value="popularity">Most Popular (Enrolled)</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="newest">Newest Specializations</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Count Header */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-semibold text-[#586765]">
              Showing <strong className="text-[#111817]">{filteredCourses.length}</strong> courses
            </span>
          </div>

          {/* 13-Course Responsive Marketplace Grid */}
          {filteredCourses.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#E3ECEA] p-12 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#F5F8F7] text-[#176B68] flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#111817] mb-1">No matching courses found</h3>
              <p className="text-xs text-[#586765] max-w-md mx-auto mb-6">
                We couldn&apos;t find any programs matching your search criteria. Try selecting another category or clearing your search.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedLevel('all');
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#176B68] text-white hover:bg-[#104E4D] transition-colors"
              >
                View All Courses
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => {
                const discountPercentage = Math.round(
                  ((course.price - course.discountPrice) / course.price) * 100
                );

                return (
                  <div
                    key={course.id}
                    className="flex flex-col justify-between rounded-2xl bg-white border border-[#E3ECEA] p-6 shadow-xs hover:border-[#16B6B8] hover:shadow-lg transition-all duration-200 group text-left"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F8FAFA] text-[#176B68]">
                          {course.categoryName}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => toggleWishlist(course.id)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              isInWishlist(course.id)
                                ? 'text-red-500 bg-red-50'
                                : 'text-[#8A9795] hover:text-red-500 hover:bg-neutral-50'
                            }`}
                            title="Add to wishlist"
                          >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Course Title + Official Logo Header */}
                      <div className="flex items-start gap-3.5 mb-3">
                        <CourseTechIcon
                          type={getCourseIconType(course.slug)}
                          size="md"
                        />
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/courses/${course.slug}`}
                            className="text-lg font-bold text-[#111817] group-hover:text-[#176B68] transition-colors leading-snug line-clamp-2"
                          >
                            {course.title}
                          </Link>
                          <span className="text-xs text-[#586765] block mt-0.5">
                            by {course.instructorName}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-[#586765] line-clamp-3 leading-relaxed mb-4">
                        {course.description}
                      </p>

                      {/* Specification Pills */}
                      <div className="flex flex-wrap items-center gap-2 mb-4 text-[11px] text-[#586765]">
                        <span className="inline-flex items-center gap-1 font-medium bg-[#F8FAFA] px-2 py-0.5 rounded border border-[#E3ECEA]">
                          ⏱ {course.duration}
                        </span>
                        <span className="inline-flex items-center gap-1 font-medium bg-[#F8FAFA] px-2 py-0.5 rounded border border-[#E3ECEA]">
                          📊 {course.skillLevel}
                        </span>
                        <span className="inline-flex items-center gap-1 font-medium bg-[#F8FAFA] px-2 py-0.5 rounded border border-[#E3ECEA]">
                          ⭐ {course.rating} ({course.reviewsCount})
                        </span>
                      </div>

                      {/* Tools Tag Pills */}
                      <div className="flex flex-wrap gap-1 mb-5">
                        {course.toolsCovered.slice(0, 4).map((tool) => (
                          <span
                            key={tool}
                            className="text-[10px] font-medium text-[#4A5755] bg-[#F5F8F7] px-2 py-0.5 rounded"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Pricing & CTAs */}
                    <div className="pt-4 border-t border-[#E3ECEA]">
                      <div className="flex items-baseline justify-between mb-3.5">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold text-[#111817]">
                            ₹{course.discountPrice.toLocaleString('en-IN')}
                          </span>
                          {course.price > course.discountPrice && (
                            <span className="text-xs text-[#8A9795] line-through">
                              ₹{course.price.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>

                        {discountPercentage > 0 && (
                          <span className="text-[10.5px] font-bold text-[#176B68] bg-[#EBF7F5] px-2 py-0.5 rounded">
                            {discountPercentage}% OFF
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href={`/courses/${course.slug}`}
                          className="flex items-center justify-center py-2.5 px-3 rounded-xl text-xs font-semibold text-[#176B68] bg-[#F8FAFA] hover:bg-[#E3ECEA]/40 border border-[#E3ECEA] transition-colors text-center"
                        >
                          Curriculum
                        </Link>

                        <button
                          type="button"
                          onClick={() => addToCart(course)}
                          className={`flex items-center justify-center py-2.5 px-3 rounded-xl text-xs font-bold transition-all shadow-xs ${
                            isInCart(course.id)
                              ? 'bg-[#EBF7F5] text-[#176B68] border border-[#16B6B8]'
                              : 'bg-[#176B68] text-white hover:bg-[#104E4D]'
                          }`}
                        >
                          {isInCart(course.id) ? '✓ In Cart' : 'Add to Cart'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
