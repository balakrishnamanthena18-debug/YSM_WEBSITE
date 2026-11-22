'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { DetailedCourse } from '@/data/courses/types';
import { Course } from '@/lib/db/schema';
import { Container } from '@/components/ui/Container';
import { useCart } from '@/context/CartContext';
import { getYouTubeEmbedUrl, COURSE_YOUTUBE_DEFAULTS } from '@/lib/video/youtube';

const PRICING_MAP: Record<string, { price: number; discountPrice: number }> = {
  'advanced-excel-with-ai': { price: 9999, discountPrice: 3499 },
  'sql': { price: 8999, discountPrice: 2999 },
  'power-bi-with-ai': { price: 12999, discountPrice: 4499 },
  'tableau': { price: 11999, discountPrice: 3999 },
  'data-analytics-gen-ai': { price: 18999, discountPrice: 6499 },
  'python-for-ai': { price: 14999, discountPrice: 4999 },
  'ai-ml': { price: 21999, discountPrice: 7999 },
  'data-science-with-gen-ai': { price: 24999, discountPrice: 8499 },
  'ai-engineer': { price: 29999, discountPrice: 9999 },
  'gen-ai-agentic-ai': { price: 27999, discountPrice: 9499 },
  'azure-devops': { price: 16999, discountPrice: 5999 },
  'business-analyst-ai': { price: 15999, discountPrice: 5499 },
};

interface CourseHeroProps {
  course: DetailedCourse;
}

export function CourseHero({ course }: CourseHeroProps) {
  const router = useRouter();
  const { addToCart, isInCart } = useCart();
  const [previewModalOpen, setPreviewModalOpen] = useState(false);

  // Priority: Database course pricing > PRICING_MAP defaults
  const courseRecord = course as unknown as {
    regularPrice?: number;
    sellingPrice?: number;
    price?: number;
    discountPrice?: number;
  };

  const regPrice =
    courseRecord.regularPrice ??
    courseRecord.price ??
    PRICING_MAP[course.slug]?.price ??
    14999;
  const sellPrice =
    courseRecord.sellingPrice ??
    courseRecord.discountPrice ??
    PRICING_MAP[course.slug]?.discountPrice ??
    4999;

  const isLiveCourse =
    (courseRecord as { deliveryType?: string }).deliveryType
      ? (courseRecord as { deliveryType?: string }).deliveryType === 'LIVE_INSTRUCTOR_LED'
      : !['advanced-excel-with-ai', 'power-bi-with-ai', 'tableau', 'data-analytics-gen-ai', 'python-for-ai'].includes(
          course.slug
        );

  const pricing = { price: regPrice, discountPrice: sellPrice };
  const courseId = `crs_${course.slug.replace(/[^a-z0-9]/g, '_')}`;

  const courseForCart = {
    id: courseId,
    slug: course.slug,
    title: course.title,
    subtitle: course.featureBadges?.join(' • ') || 'ISO 9001:2015 Accredited IT Training',
    description: course.overviewParagraphs[0] || `${course.title} practical training.`,
    overviewParagraphs: course.overviewParagraphs || [],
    categoryId: 'cat_ai',
    categorySlug: 'artificial-intelligence',
    categoryName: 'Specialized Program',
    deliveryType: isLiveCourse ? ('LIVE_INSTRUCTOR_LED' as const) : ('RECORDED_SELF_PACED' as const),
    duration: course.duration,
    skillLevel: (course.level as Course['skillLevel']) || 'All Levels',
    trainingMode: isLiveCourse ? 'Instructor-Led Live & Practical Labs' : 'Recorded Self-Paced Video & Labs',
    price: pricing.price,
    discountPrice: pricing.discountPrice,
    thumbnailUrl: '/images/courses/python-workspace.png',
    bannerUrl: '/images/hero/Modern Open-Plan Office with City Views.png',
    rating: parseFloat(course.rating) || 4.8,
    reviewsCount: 42,
    studentsCount: 280,
    isPublished: true,
    isFeatured: true,
    instructorId: 'usr_inst_001',
    instructorName: 'Dr. Rajesh Varma',
    instructorTitle: 'Principal Technical Architect',
    prerequisites: ['Basic computer knowledge'],
    learningOutcomes: course.highlights || [],
    toolsCovered: course.tools?.map((t) => t.name) || [],
    featureBadges: course.featureBadges || [],
    certificateEligible: true,
    displayOrder: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const handleBuyNow = () => {
    addToCart(courseForCart);
    router.push('/checkout');
  };
  const whatsappUrl = `https://wa.me/917997791456?text=${encodeURIComponent(
    course.inquiryMessage ||
      `Hi YSM Infotech, I would like to inquire about the ${course.title} program.`
  )}`;

  return (
    <section className="relative bg-[#0B201F] text-white pt-8 pb-14 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24 border-b border-[#163635]">
      <Container>
        {/* Editorial Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs sm:text-[13px] text-[#9CBDBA] mb-8 font-sans"
        >
          <Link
            href="/"
            className="hover:text-white transition-colors underline-offset-4 hover:underline"
          >
            Home
          </Link>
          <span className="text-white/30">&rsaquo;</span>
          <Link
            href="/#programs"
            className="hover:text-white transition-colors underline-offset-4 hover:underline"
          >
            Courses
          </Link>
          <span className="text-white/30">&rsaquo;</span>
          <span className="text-white font-medium truncate max-w-[220px] sm:max-w-none">
            {course.title}
          </span>
        </nav>

        {/* 12-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column (7 cols): Editorial Typography, Academic Credentials & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Quiet Academic Credential Header */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-mono text-[11px] font-bold tracking-wider uppercase text-[#5BC4CC] bg-white/5 px-2.5 py-1 rounded border border-white/10">
                ISO 9001:2015 ACCREDITED
              </span>
              <span className="text-white/30 hidden sm:inline">&bull;</span>
              {isLiveCourse ? (
                <span className="font-mono text-[10.5px] font-bold tracking-wider uppercase text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded border border-emerald-500/30 inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Instructor-Led Cohort
                </span>
              ) : (
                <span className="font-mono text-[10.5px] font-bold tracking-wider uppercase text-indigo-300 bg-indigo-500/20 px-2.5 py-1 rounded border border-indigo-500/30 inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  On-Demand E-Learning Track
                </span>
              )}
              <span className="text-white/30 hidden sm:inline">&bull;</span>
              <span className="text-xs font-medium text-[#D8E6E4] hidden sm:inline">
                Alumni Rating ★ {course.rating} / 5.0
              </span>
            </div>

            {/* Course Title with Confident Typography */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold tracking-[-0.02em] leading-[1.12] text-white">
                {course.title}
              </h1>
            </div>

            {/* Lead Narrative Paragraph */}
            {course.overviewParagraphs.length > 0 && (
              <p className="text-base sm:text-[17px] text-[#D8E6E4] leading-[1.75] font-normal max-w-2xl">
                {course.overviewParagraphs[0]}
              </p>
            )}

            {/* Program Value Pillars (Clean Architectural List, Not Chip Badges) */}
            <div className="pt-2 pb-1 border-y border-white/10">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 text-xs">
                {course.featureBadges.map((badge, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[#D8E6E4]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16B6B8] shrink-0" />
                    <span className="font-medium text-[12px] leading-snug">{badge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Actions Cluster: Online Purchase + Cart + WhatsApp Guidance */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={handleBuyNow}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-bold text-sm bg-[#16B6B8] text-[#0A201F] hover:bg-[#5BC4CC] transition-colors shadow-sm cursor-pointer"
              >
                <span>Enroll Online &bull; ₹{pricing.discountPrice.toLocaleString('en-IN')}</span>
              </button>

              <button
                type="button"
                onClick={() => addToCart(courseForCart)}
                className={`inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg font-bold text-sm transition-colors cursor-pointer ${
                  isInCart(courseId)
                    ? 'bg-white/20 text-[#5BC4CC] border border-[#5BC4CC]'
                    : 'bg-white/10 hover:bg-white/15 text-white border border-white/20'
                }`}
              >
                <span>{isInCart(courseId) ? '✓ In Cart' : 'Add to Cart'}</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-3.5 text-xs font-semibold text-[#D8E6E4] hover:text-white transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5 fill-current shrink-0 text-[#25D366]"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>WhatsApp</span>
              </a>

              <a
                href="#curriculum"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-3.5 text-sm font-semibold text-[#D8E6E4] hover:text-white transition-colors"
              >
                <span>View All {course.modules.length} Modules</span>
                <svg
                  className="w-4 h-4 text-[#5BC4CC]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column (5 cols): Prominent Educational Photography & Architectural Specifications Dossier */}
          <div className="lg:col-span-5">
            <div className="rounded-xl overflow-hidden border border-white/15 bg-[#081B1A] shadow-xl">
              
              {/* Natural Full-Width Architectural Photograph */}
              <div className="relative aspect-[16/11] w-full bg-[#081B1A]">
                <Image
                  src="/images/courses/python-workspace.png"
                  alt="Senior software engineer programming in Python with data science tools in modern development laboratory"
                  fill
                  sizes="(max-width: 768px) 100vw, 520px"
                  className="object-cover object-center"
                  priority
                />
              </div>

              {/* Architectural Course Specification Dossier */}
              <div className="p-5 sm:p-6 bg-[#081B1A] border-t border-white/10">
                <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-white/10">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#5BC4CC] font-bold">
                    PROGRAM SPECIFICATIONS
                  </span>
                  <span className="text-xs font-semibold text-white/70">
                    {course.title}
                  </span>
                </div>

                {/* Pricing & Offer Row */}
                <div className="mb-4 pb-3.5 border-b border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-white/50 block font-mono text-[10.5px] uppercase tracking-wider mb-0.5">
                      Course Investment
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-white">
                        ₹{pricing.discountPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-white/40 line-through">
                        ₹{pricing.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#0A201F] bg-[#5BC4CC] px-2.5 py-1 rounded-md">
                    {Math.round(((pricing.price - pricing.discountPrice) / pricing.price) * 100)}% OFF
                  </span>
                </div>

                {/* Structured Specification Rows */}
                <div className="grid grid-cols-2 gap-y-3.5 gap-x-4 text-xs">
                  <div>
                    <span className="text-white/50 block font-mono text-[10.5px] uppercase tracking-wider mb-0.5">
                      Duration
                    </span>
                    <span className="font-bold text-white text-[13px]">{course.duration}</span>
                  </div>

                  <div>
                    <span className="text-white/50 block font-mono text-[10.5px] uppercase tracking-wider mb-0.5">
                      Skill Level
                    </span>
                    <span className="font-bold text-white text-[13px]">{course.level}</span>
                  </div>

                  <div>
                    <span className="text-white/50 block font-mono text-[10.5px] uppercase tracking-wider mb-0.5">
                      Training Mode
                    </span>
                    <span className="font-semibold text-white text-[12px] leading-snug">
                      {isLiveCourse ? 'Live Instructor-Led Cohort & Labs' : '100% Self-Paced Video & Guided Labs'}
                    </span>
                  </div>

                  <div>
                    <span className="text-white/50 block font-mono text-[10.5px] uppercase tracking-wider mb-0.5">
                      Curriculum Scope
                    </span>
                    <span className="font-semibold text-[#5BC4CC] text-[12px] leading-snug">
                      {course.modules.length} Modules
                    </span>
                  </div>

                  <div>
                    <span className="text-white/50 block font-mono text-[10.5px] uppercase tracking-wider mb-0.5">
                      Certification
                    </span>
                    <span className="font-semibold text-white text-[12px]">
                      ISO 9001:2015 Accredited
                    </span>
                  </div>

                  <div>
                    <span className="text-white/50 block font-mono text-[10.5px] uppercase tracking-wider mb-0.5">
                      Learner Rating
                    </span>
                    <span className="font-bold text-amber-300 text-[12px]">
                      ★ {course.rating} / 5.0
                    </span>
                  </div>
                </div>

                {/* Instant Online Enrollment CTA */}
                <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs bg-[#16B6B8] text-[#0A201F] hover:bg-[#5BC4CC] transition-colors shadow-md cursor-pointer"
                  >
                    <span>Instant Online Enrollment &bull; ₹{pricing.discountPrice.toLocaleString('en-IN')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPreviewModalOpen(true)}
                    className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-semibold text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5 text-[#5BC4CC]" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    <span>Watch Free Preview Lecture</span>
                  </button>
                </div>

                {/* Admissions Footnote */}
                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-[#5BC4CC]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="font-semibold text-[11.5px]">Admissions Open for Live Batches</span>
                  </div>
                  <span className="text-white/40 text-[11px] font-mono">Weekend &amp; Weekday</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Free Preview Video Modal */}
        {previewModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
            <div className="bg-[#0B201F] text-white rounded-2xl border border-white/15 max-w-3xl w-full p-6 relative shadow-2xl">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#5BC4CC] font-bold">
                    FREE PREVIEW LECTURE
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">{course.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewModalOpen(false)}
                  className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black mb-4 border border-white/10">
                <iframe
                  src={getYouTubeEmbedUrl(
                    COURSE_YOUTUBE_DEFAULTS[course.slug] || 'kqtD5dpn9C8',
                    { autoplay: true }
                  )}
                  title={`${course.title} Free Preview Lecture`}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="flex items-center justify-between">
                <p className="text-xs text-[#D8E6E4]">
                  Ready to unlock the full 12 modules, practical code labs, and mentoring?
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setPreviewModalOpen(false);
                    handleBuyNow();
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#16B6B8] text-[#0A201F] hover:bg-[#5BC4CC] transition-colors"
                >
                  Enroll Now &bull; ₹{pricing.discountPrice.toLocaleString('en-IN')}
                </button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
