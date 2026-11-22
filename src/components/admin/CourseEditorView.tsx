'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Course,
  CourseCategory,
  CourseDeliveryType,
  CourseStatus,
  CourseSkillLevel,
  CourseValidityType,
  CourseDurationUnit,
  CourseSection,
  Lesson,
} from '@/lib/db/schema';
import {
  updateCourseAction,
  updateCoursePricingAction,
  toggleCoursePublishAction,
} from '@/app/actions/admin';
import { InstructorViewRecord } from '@/lib/db';
import { parseAndValidateYouTubeUrl, getYouTubeEmbedUrl } from '@/lib/video/youtube';

interface CourseEditorViewProps {
  initialCourse: Course;
  categories: CourseCategory[];
  instructors: InstructorViewRecord[];
  sections: CourseSection[];
  lessons: Lesson[];
}

export function CourseEditorView({
  initialCourse,
  categories,
  instructors,
  sections,
  lessons,
}: CourseEditorViewProps) {
  const router = useRouter();
  const [course, setCourse] = useState<Course>(initialCourse);

  // Active section tab for navigation
  const [activeTab, setActiveTab] = useState<'basic' | 'pricing' | 'duration' | 'validity' | 'instructor' | 'media'>('basic');

  // Form states: Basic Information
  const [title, setTitle] = useState(course.title);
  const [subtitle, setSubtitle] = useState(course.subtitle || '');
  const [description, setDescription] = useState(course.description || '');
  const [slug, setSlug] = useState(course.slug);
  const [deliveryType, setDeliveryType] = useState<CourseDeliveryType>(course.deliveryType || 'LIVE_INSTRUCTOR_LED');
  const [categoryId, setCategoryId] = useState(course.categoryId);
  const [skillLevel, setSkillLevel] = useState<CourseSkillLevel>(course.skillLevel || 'Intermediate');
  const [language, setLanguage] = useState(course.language || 'English');
  const [tagsInput, setTagsInput] = useState((course.tags || course.toolsCovered || []).join(', '));
  const [seoTitle, setSeoTitle] = useState(course.seoTitle || '');
  const [seoDescription, setSeoDescription] = useState(course.seoDescription || '');

  // Form states: Pricing
  const initialRegPrice = course.regularPrice ?? course.price ?? 9999;
  const initialSellPrice = course.sellingPrice ?? course.discountPrice ?? 4999;
  const [regularPrice, setRegularPrice] = useState(String(initialRegPrice));
  const [sellingPrice, setSellingPrice] = useState(String(initialSellPrice));
  const [discountEnabled, setDiscountEnabled] = useState(course.discountEnabled ?? true);
  const [discountStartsAt, setDiscountStartsAt] = useState(course.discountStartsAt ? course.discountStartsAt.slice(0, 10) : '');
  const [discountEndsAt, setDiscountEndsAt] = useState(course.discountEndsAt ? course.discountEndsAt.slice(0, 10) : '');

  // Form states: Duration & Skill
  const [durationValue, setDurationValue] = useState(String(course.durationValue || parseInt(course.duration) || 8));
  const [durationUnit, setDurationUnit] = useState<CourseDurationUnit>(
    course.durationUnit || (course.duration.includes('Month') ? 'Months' : 'Weeks')
  );

  // Form states: Validity
  const [validityType, setValidityType] = useState<CourseValidityType>(course.validityType || 'lifetime');
  const [validityDuration, setValidityDuration] = useState(String(course.validityDuration || 180));

  // Form states: Instructor
  const [instructorId, setInstructorId] = useState(course.instructorId || instructors[0]?.id || '');

  // Form states: Media
  const [thumbnailUrl, setThumbnailUrl] = useState(course.thumbnailUrl || '/logos/tools/python.svg');
  const [promotionalVideoUrl, setPromotionalVideoUrl] = useState(
    course.promotionalVideoUrl || course.promoVideoUrl || 'https://www.youtube.com/watch?v=kqtD5dpn9C8'
  );

  // Form states: Status
  const [status, setStatus] = useState<CourseStatus>(course.status || (course.isPublished ? 'published' : 'draft'));

  // Feedback & Save states
  const [savingSection, setSavingSection] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Auto-calculated discount percentage
  const numRegular = Math.max(0, Number(regularPrice) || 0);
  const numSelling = Math.max(0, Number(sellingPrice) || 0);
  const calculatedDiscountPct =
    numRegular > 0 && discountEnabled ? Math.round(((numRegular - numSelling) / numRegular) * 100) : 0;

  // Real-time promo YouTube validation preview
  const ytPromoValidation = promotionalVideoUrl.trim()
    ? parseAndValidateYouTubeUrl(promotionalVideoUrl)
    : null;

  // Selected instructor object
  const selectedInstructor = instructors.find((i) => i.id === instructorId) || instructors[0];

  // Handlers
  const handleSavePricingOnly = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSavingSection('pricing');
    setFeedback(null);

    if (numRegular < 0 || numSelling < 0) {
      setFeedback({ type: 'error', text: 'Prices must be non-negative values.' });
      setSavingSection(null);
      return;
    }

    if (discountEnabled && numSelling > numRegular) {
      setFeedback({
        type: 'error',
        text: 'Selling price cannot exceed regular price when discount is enabled.',
      });
      setSavingSection(null);
      return;
    }

    try {
      const res = await updateCoursePricingAction(course.id, {
        regularPrice: numRegular,
        sellingPrice: numSelling,
        discountEnabled,
        discountStartsAt: discountStartsAt || undefined,
        discountEndsAt: discountEndsAt || undefined,
      });

      if (res.success && res.course) {
        setCourse(res.course);
        setFeedback({
          type: 'success',
          text: `Pricing updated successfully! Regular: ₹${numRegular.toLocaleString('en-IN')}, Selling: ₹${numSelling.toLocaleString('en-IN')} (${calculatedDiscountPct}% OFF).`,
        });
      } else {
        setFeedback({ type: 'error', text: res.error || 'Failed to update pricing.' });
      }
    } catch (err) {
      console.error(err);
      setFeedback({ type: 'error', text: 'Server error while saving pricing changes.' });
    } finally {
      setSavingSection(null);
    }
  };

  const handleSaveAll = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSavingSection('all');
    setFeedback(null);

    if (!title.trim()) {
      setFeedback({ type: 'error', text: 'Course title is required.' });
      setSavingSection(null);
      return;
    }

    if (discountEnabled && numSelling > numRegular) {
      setFeedback({
        type: 'error',
        text: 'Selling price cannot exceed regular price when discount is enabled.',
      });
      setSavingSection(null);
      return;
    }

    const tagsArray = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      const res = await updateCourseAction(course.id, {
        title: title.trim(),
        subtitle: subtitle.trim(),
        description: description.trim(),
        slug: slug.trim(),
        deliveryType,
        categoryId,
        skillLevel,
        language: language.trim(),
        regularPrice: numRegular,
        sellingPrice: numSelling,
        discountEnabled,
        discountStartsAt: discountStartsAt || undefined,
        discountEndsAt: discountEndsAt || undefined,
        durationValue: parseInt(durationValue, 10) || 8,
        durationUnit,
        validityType,
        validityDuration: parseInt(validityDuration, 10) || 180,
        instructorId,
        thumbnailUrl: thumbnailUrl.trim(),
        promotionalVideoUrl: promotionalVideoUrl.trim(),
        status,
        tags: tagsArray,
        seoTitle: seoTitle.trim(),
        seoDescription: seoDescription.trim(),
      });

      if (res.success && res.course) {
        setCourse(res.course);
        setFeedback({ type: 'success', text: 'All course configurations saved and synchronized successfully!' });
        router.refresh();
      } else {
        setFeedback({ type: 'error', text: res.error || 'Failed to update course configurations.' });
      }
    } catch (err) {
      console.error(err);
      setFeedback({ type: 'error', text: 'An unexpected server error occurred.' });
    } finally {
      setSavingSection(null);
    }
  };

  const handleTogglePublish = async () => {
    const target: CourseStatus = status === 'published' ? 'draft' : 'published';
    setSavingSection('status');
    try {
      const res = await toggleCoursePublishAction(course.id, target);
      if (res.success) {
        setStatus(res.status);
        setCourse((prev) => ({ ...prev, status: res.status, isPublished: res.isPublished }));
        setFeedback({
          type: 'success',
          text: `Course ${res.isPublished ? 'is now Live in Marketplace' : 'moved to Draft status'}.`,
        });
      }
    } catch (err) {
      console.error(err);
      setFeedback({ type: 'error', text: 'Failed to toggle course status.' });
    } finally {
      setSavingSection(null);
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 pb-32">
      {/* Top Header & Breadcrumb */}
      <div>
        <nav className="flex items-center gap-2 text-xs text-[#586765] font-mono mb-2">
          <Link href="/admin/courses" className="hover:text-[#176B68]">
            Courses
          </Link>
          <span>&rsaquo;</span>
          <span className="text-[#111817] font-bold truncate max-w-sm">{course.title}</span>
          <span>&rsaquo;</span>
          <span className="text-[#176B68]">Edit Configuration</span>
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#E3ECEA]">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold uppercase tracking-wider ${
                  status === 'published'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : status === 'archived'
                    ? 'bg-neutral-100 text-neutral-600 border border-neutral-300'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    status === 'published'
                      ? 'bg-emerald-500'
                      : status === 'archived'
                      ? 'bg-neutral-400'
                      : 'bg-amber-500'
                  }`}
                />
                <span>{status}</span>
              </span>
              <span className="text-xs font-mono text-[#8A9795]">ID: {course.id}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111817]">
              {course.title}
            </h1>
            <p className="text-xs text-[#586765] mt-1">
              Configure course metadata, independent pricing &amp; discounts, validity models, assigned faculty, and media.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            {/* Live Cohorts Direct Link */}
            <Link
              href={`/admin/courses/${course.id}/batches`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>Live Batches</span>
            </Link>

            {/* Curriculum Builder Direct Link */}
            <Link
              href={`/admin/courses/${course.id}/curriculum`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-[#176B68] bg-[#EBF7F5] border border-[#16B6B8]/30 hover:bg-[#D7EFEA] transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <span>Curriculum ({lessons.length} Lessons)</span>
            </Link>

            {/* Live Marketplace Preview */}
            <Link
              href={`/courses/${course.slug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#586765] hover:bg-neutral-100 border border-[#E3ECEA] transition-colors"
            >
              <span>Public Preview</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Toast Alert Message */}
      {feedback && (
        <div
          className={`p-4 rounded-xl text-xs font-semibold flex items-center justify-between gap-3 shadow-xs ${
            feedback.type === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border border-rose-200 text-rose-800'
          }`}
        >
          <span>{feedback.text}</span>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-xs font-bold p-1 hover:opacity-75"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Grid: Section Navigation Tabs & Form Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar Tabs (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-[#E3ECEA] p-2 space-y-1 shadow-xs sticky top-4">
          <div className="p-3 border-b border-[#E3ECEA] mb-1">
            <span className="font-mono text-[10px] uppercase font-bold text-[#8A9795] block">
              WORKBENCH SECTIONS
            </span>
          </div>

          {[
            { id: 'basic', label: 'Basic Information', icon: '📝' },
            { id: 'pricing', label: 'Pricing & Discounts', icon: '💰', highlight: true },
            { id: 'duration', label: 'Duration & Level', icon: '⏱️' },
            { id: 'validity', label: 'Access Validity', icon: '🛡️' },
            { id: 'instructor', label: 'Assigned Faculty', icon: '👨‍🏫' },
            { id: 'media', label: 'Media & Promo Video', icon: '🎬' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#176B68] text-white shadow-xs font-bold'
                  : 'text-[#586765] hover:bg-[#F8FAFA] hover:text-[#111817]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </div>
              {tab.highlight && activeTab !== tab.id && (
                <span className="w-2 h-2 rounded-full bg-[#16B6B8]" />
              )}
            </button>
          ))}

          {/* Quick Curriculum Link Card */}
          <div className="pt-3 mt-3 border-t border-[#E3ECEA] p-3 text-xs bg-[#F8FAFA] rounded-xl space-y-1.5">
            <span className="font-mono text-[10px] text-[#8A9795] uppercase font-bold block">
              Curriculum Summary
            </span>
            <div className="text-[11px] text-[#586765]">
              <strong>{sections.length}</strong> sections &bull; <strong>{lessons.length}</strong> video lectures
            </div>
            <Link
              href={`/admin/courses/${course.id}/curriculum`}
              className="text-xs font-bold text-[#176B68] hover:underline block pt-1"
            >
              Open Curriculum Builder &rarr;
            </Link>
          </div>
        </div>

        {/* Content Workspace Form (9 cols) */}
        <div className="lg:col-span-9 space-y-8">
          {/* ============================================================== */}
          {/* SECTION A: BASIC INFORMATION                                    */}
          {/* ============================================================== */}
          {activeTab === 'basic' && (
            <div className="bg-white rounded-2xl border border-[#E3ECEA] p-6 sm:p-7 shadow-xs space-y-6">
              <div className="pb-4 border-b border-[#E3ECEA]">
                <h3 className="font-bold text-base text-[#111817]">Course Fundamentals &amp; Delivery Model</h3>
                <p className="text-xs text-[#586765] mt-0.5">
                  General title, subtitle, delivery model, public slug, category, and search engine metadata.
                </p>
              </div>

              {/* Delivery Model Selector */}
              <div>
                <label className="block text-xs font-bold text-[#111817] mb-2">
                  Training Delivery Model *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <label
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-3 ${
                      deliveryType === 'LIVE_INSTRUCTOR_LED'
                        ? 'border-[#176B68] bg-[#EBF7F5] ring-2 ring-[#176B68]/20'
                        : 'border-[#E3ECEA] bg-[#F8FAFA] hover:bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryTypeEdit"
                      value="LIVE_INSTRUCTOR_LED"
                      checked={deliveryType === 'LIVE_INSTRUCTOR_LED'}
                      onChange={() => setDeliveryType('LIVE_INSTRUCTOR_LED')}
                      className="mt-0.5 text-[#176B68]"
                    />
                    <div>
                      <span className="font-bold text-xs text-[#111817] block">
                        Live Instructor-Led Training
                      </span>
                      <span className="text-[11px] text-[#586765] block mt-0.5 leading-snug">
                        Scheduled cohort batches, live Google Meet/Zoom classrooms, interactive Q&amp;A, and attendance tracking.
                      </span>
                    </div>
                  </label>

                  <label
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-3 ${
                      deliveryType === 'RECORDED_SELF_PACED'
                        ? 'border-[#176B68] bg-[#EBF7F5] ring-2 ring-[#176B68]/20'
                        : 'border-[#E3ECEA] bg-[#F8FAFA] hover:bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryTypeEdit"
                      value="RECORDED_SELF_PACED"
                      checked={deliveryType === 'RECORDED_SELF_PACED'}
                      onChange={() => setDeliveryType('RECORDED_SELF_PACED')}
                      className="mt-0.5 text-[#176B68]"
                    />
                    <div>
                      <span className="font-bold text-xs text-[#111817] block">
                        Recorded Self-Paced E-Learning
                      </span>
                      <span className="text-[11px] text-[#586765] block mt-0.5 leading-snug">
                        Structured video modules, YouTube unlisted video integration, watch progress tracking, and 24/7 on-demand access.
                      </span>
                    </div>
                  </label>
                </div>

                {/* Contextual Link */}
                <div className="p-3 rounded-xl bg-[#F8FAFA] border border-[#E3ECEA] flex items-center justify-between text-xs">
                  {deliveryType === 'LIVE_INSTRUCTOR_LED' ? (
                    <>
                      <span className="text-[#586765]">
                        Cohorts and class schedules are managed in the Live Batches control center.
                      </span>
                      <Link
                        href={`/admin/courses/${course.id}/batches`}
                        className="font-bold text-[#176B68] hover:underline shrink-0 ml-3"
                      >
                        Manage Cohort Batches &rarr;
                      </Link>
                    </>
                  ) : (
                    <>
                      <span className="text-[#586765]">
                        Video lessons and YouTube embeds are configured in the Curriculum Builder.
                      </span>
                      <Link
                        href={`/admin/courses/${course.id}/curriculum`}
                        className="font-bold text-[#176B68] hover:underline shrink-0 ml-3"
                      >
                        Open Curriculum Builder &rarr;
                      </Link>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-[#111817] mb-1">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68]"
                    required
                  />
                </div>

                {/* Subtitle */}
                <div>
                  <label className="block text-xs font-bold text-[#111817] mb-1">
                    Course Subtitle / Tagline
                  </label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="e.g. Master Enterprise Python, Neural Networks &amp; Generative AI with Live Code Labs"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68]"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-xs font-bold text-[#111817] mb-1">
                    Public URL Slug *
                  </label>
                  <div className="flex items-center rounded-xl border border-[#E3ECEA] bg-[#F8FAFA] overflow-hidden focus-within:border-[#176B68]">
                    <span className="px-3.5 text-xs text-[#8A9795] font-mono border-r border-[#E3ECEA] bg-neutral-100">
                      ysminfotech.com/courses/
                    </span>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                      className="w-full text-xs px-3.5 py-2.5 bg-transparent focus:outline-none font-mono"
                      required
                    />
                  </div>
                  <span className="text-[10.5px] text-[#8A9795] block mt-1">
                    Lowercase alphanumeric with dashes. Changing this updates public bookmarks and links.
                  </span>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-[#111817] mb-1">
                    Comprehensive Course Description *
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68]"
                    required
                  />
                </div>

                {/* Category & Language */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#111817] mb-1">
                      Course Category *
                    </label>
                    <select
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] bg-white focus:outline-none focus:border-[#176B68]"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#111817] mb-1">
                      Instruction Language
                    </label>
                    <input
                      type="text"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      placeholder="e.g. English or Hindi / English"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68]"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-xs font-bold text-[#111817] mb-1">
                    Technology &amp; Skill Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="e.g. Python, TensorFlow, PyTorch, Scikit-Learn, REST APIs"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68]"
                  />
                </div>

                {/* SEO Metadata */}
                <div className="pt-3 border-t border-[#E3ECEA] space-y-3">
                  <span className="font-mono text-[10.5px] uppercase font-bold text-[#176B68] block">
                    Search Engine Optimization (SEO)
                  </span>

                  <div>
                    <label className="block text-xs font-bold text-[#111817] mb-1">
                      Meta SEO Title
                    </label>
                    <input
                      type="text"
                      value={seoTitle}
                      onChange={(e) => setSeoTitle(e.target.value)}
                      placeholder="e.g. Python for AI Training &amp; Placement in Hyderabad | YSM Infotech"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#111817] mb-1">
                      Meta SEO Description
                    </label>
                    <textarea
                      rows={2}
                      value={seoDescription}
                      onChange={(e) => setSeoDescription(e.target.value)}
                      placeholder="Brief 150-160 character description for Google search engine results..."
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* SECTION B: COURSE PRICING — CRITICAL                           */}
          {/* ============================================================== */}
          {activeTab === 'pricing' && (
            <div className="bg-white rounded-2xl border border-[#E3ECEA] p-6 sm:p-7 shadow-xs space-y-6">
              <div className="pb-4 border-b border-[#E3ECEA] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#16B6B8]" />
                    <span className="font-mono text-[10.5px] uppercase font-bold text-[#176B68]">
                      COMMERCE ENGINE
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-[#111817]">Course Pricing &amp; Discounts</h3>
                  <p className="text-xs text-[#586765] mt-0.5">
                    Configure regular price, promotional selling price, and automated discount thresholds.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSavePricingOnly}
                  disabled={savingSection === 'pricing'}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#176B68] text-white hover:bg-[#104E4D] transition-colors disabled:opacity-50 shrink-0 cursor-pointer shadow-xs"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                    <polyline points="17 21 17 13 7 13 7 21" />
                    <polyline points="7 3 7 8 15 8" />
                  </svg>
                  <span>{savingSection === 'pricing' ? 'Saving...' : 'Save Pricing Changes'}</span>
                </button>
              </div>

              {/* Pricing Form Fields */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Regular Price */}
                  <div>
                    <label className="block text-xs font-bold text-[#111817] mb-1">
                      Regular Price (INR ₹) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#8A9795]">
                        ₹
                      </span>
                      <input
                        type="number"
                        min="0"
                        step="100"
                        value={regularPrice}
                        onChange={(e) => setRegularPrice(e.target.value)}
                        className="w-full text-xs pl-8 pr-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68] font-mono font-bold text-[#111817]"
                        required
                      />
                    </div>
                    <span className="text-[10.5px] text-[#8A9795] block mt-1">
                      Standard course catalog retail price before promotions.
                    </span>
                  </div>

                  {/* Selling Price */}
                  <div>
                    <label className="block text-xs font-bold text-[#111817] mb-1">
                      Selling Price (INR ₹) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#176B68]">
                        ₹
                      </span>
                      <input
                        type="number"
                        min="0"
                        step="100"
                        value={sellingPrice}
                        onChange={(e) => setSellingPrice(e.target.value)}
                        className="w-full text-xs pl-8 pr-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68] font-mono font-bold text-[#176B68]"
                        required
                      />
                    </div>
                    <span className="text-[10.5px] text-[#8A9795] block mt-1">
                      Actual checkout transaction amount charged to student.
                    </span>
                  </div>
                </div>

                {/* Discount Percentage Display & Toggle */}
                <div className="p-4 rounded-xl bg-[#F8FAFA] border border-[#E3ECEA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-[#111817] block">
                      Automated Discount Percentage
                    </span>
                    <span className="text-xs text-[#586765]">
                      Computed from Regular (₹{numRegular.toLocaleString('en-IN')}) &bull; Selling (₹{numSelling.toLocaleString('en-IN')})
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-lg font-extrabold font-mono text-[#176B68] bg-[#EBF7F5] px-3 py-1 rounded-lg border border-[#16B6B8]/30">
                      {calculatedDiscountPct}% OFF
                    </span>

                    <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#111817]">
                      <input
                        type="checkbox"
                        checked={discountEnabled}
                        onChange={(e) => setDiscountEnabled(e.target.checked)}
                        className="w-4 h-4 rounded text-[#176B68] focus:ring-[#176B68]"
                      />
                      <span>Enable Discount</span>
                    </label>
                  </div>
                </div>

                {/* Promotional Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-[#111817] mb-1">
                      Promotion Start Date (Optional)
                    </label>
                    <input
                      type="date"
                      value={discountStartsAt}
                      onChange={(e) => setDiscountStartsAt(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] bg-white focus:outline-none focus:border-[#176B68]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#111817] mb-1">
                      Promotion End Date (Optional)
                    </label>
                    <input
                      type="date"
                      value={discountEndsAt}
                      onChange={(e) => setDiscountEndsAt(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] bg-white focus:outline-none focus:border-[#176B68]"
                    />
                  </div>
                </div>

                {/* Live Marketplace Pricing Preview Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#081716] text-white border border-white/10 space-y-3">
                  <span className="font-mono text-[10px] uppercase font-bold text-[#5BC4CC] tracking-wider block">
                    MARKETPLACE &amp; CHECKOUT PREVIEW
                  </span>

                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white">
                      ₹{numSelling.toLocaleString('en-IN')}
                    </span>
                    {numRegular > numSelling && (
                      <span className="text-sm font-semibold text-white/50 line-through">
                        ₹{numRegular.toLocaleString('en-IN')}
                      </span>
                    )}
                    {calculatedDiscountPct > 0 && (
                      <span className="px-2 py-0.5 rounded text-xs font-extrabold bg-[#16B6B8] text-[#0A201F]">
                        Save {calculatedDiscountPct}%
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#D8E6E4] leading-relaxed">
                    Students will see this exact price across the public catalog, course landing page, cart, and payment gateway.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* SECTION C: DURATION & LEVEL                                    */}
          {/* ============================================================== */}
          {activeTab === 'duration' && (
            <div className="bg-white rounded-2xl border border-[#E3ECEA] p-6 sm:p-7 shadow-xs space-y-6">
              <div className="pb-4 border-b border-[#E3ECEA]">
                <h3 className="font-bold text-base text-[#111817]">Course Duration &amp; Skill Level</h3>
                <p className="text-xs text-[#586765] mt-0.5">
                  Set academic duration units, curriculum intensity, and difficulty level.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#111817] mb-1">
                    Duration Value *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={durationValue}
                    onChange={(e) => setDurationValue(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#111817] mb-1">
                    Duration Unit *
                  </label>
                  <select
                    value={durationUnit}
                    onChange={(e) => setDurationUnit(e.target.value as CourseDurationUnit)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] bg-white focus:outline-none focus:border-[#176B68]"
                  >
                    <option value="Weeks">Weeks (Standard)</option>
                    <option value="Months">Months</option>
                    <option value="Days">Days</option>
                    <option value="Hours">Hours (Bootcamp)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111817] mb-1">
                  Target Skill Level *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(['Beginner', 'Intermediate', 'Advanced', 'All Levels'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSkillLevel(lvl)}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                        skillLevel === lvl
                          ? 'bg-[#EBF7F5] border-[#176B68] text-[#176B68] shadow-xs'
                          : 'border-[#E3ECEA] text-[#586765] hover:border-neutral-300'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* SECTION D: COURSE VALIDITY                                     */}
          {/* ============================================================== */}
          {activeTab === 'validity' && (
            <div className="bg-white rounded-2xl border border-[#E3ECEA] p-6 sm:p-7 shadow-xs space-y-6">
              <div className="pb-4 border-b border-[#E3ECEA]">
                <h3 className="font-bold text-base text-[#111817]">Course Access &amp; Validity Policy</h3>
                <p className="text-xs text-[#586765] mt-0.5">
                  Govern student entitlement windows after purchase activation.
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Lifetime Option */}
                  <label
                    className={`p-4 rounded-xl border cursor-pointer block transition-all ${
                      validityType === 'lifetime'
                        ? 'bg-[#EBF7F5] border-[#176B68] text-[#176B68]'
                        : 'border-[#E3ECEA] text-[#586765]'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <input
                        type="radio"
                        name="validityType"
                        value="lifetime"
                        checked={validityType === 'lifetime'}
                        onChange={() => setValidityType('lifetime')}
                        className="w-4 h-4 text-[#176B68]"
                      />
                      <span className="font-bold text-xs text-[#111817]">Lifetime Access</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-[#586765]">
                      Enrolled students enjoy perpetual access to curriculum modules, updates, and ISO certification downloads.
                    </p>
                  </label>

                  {/* Fixed Duration Option */}
                  <label
                    className={`p-4 rounded-xl border cursor-pointer block transition-all ${
                      validityType === 'fixed_duration'
                        ? 'bg-[#EBF7F5] border-[#176B68] text-[#176B68]'
                        : 'border-[#E3ECEA] text-[#586765]'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <input
                        type="radio"
                        name="validityType"
                        value="fixed_duration"
                        checked={validityType === 'fixed_duration'}
                        onChange={() => setValidityType('fixed_duration')}
                        className="w-4 h-4 text-[#176B68]"
                      />
                      <span className="font-bold text-xs text-[#111817]">Fixed Duration Access</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-[#586765]">
                      Access is automatically revoked after a set period from the student&apos;s enrollment date.
                    </p>
                  </label>
                </div>

                {/* Fixed Duration Parameters */}
                {validityType === 'fixed_duration' && (
                  <div className="p-4 rounded-xl bg-[#F8FAFA] border border-[#E3ECEA] space-y-3">
                    <label className="block text-xs font-bold text-[#111817]">
                      Validity Window (Days from Activation)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="3650"
                      value={validityDuration}
                      onChange={(e) => setValidityDuration(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] bg-white focus:outline-none focus:border-[#176B68]"
                    />
                    <span className="text-[10.5px] text-[#8A9795] block">
                      e.g. 180 Days (6 months) or 365 Days (1 year). LMS access engine checks expiration on every video play request.
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* SECTION E: INSTRUCTOR MANAGEMENT                               */}
          {/* ============================================================== */}
          {activeTab === 'instructor' && (
            <div className="bg-white rounded-2xl border border-[#E3ECEA] p-6 sm:p-7 shadow-xs space-y-6">
              <div className="pb-4 border-b border-[#E3ECEA]">
                <h3 className="font-bold text-base text-[#111817]">Assigned Course Faculty</h3>
                <p className="text-xs text-[#586765] mt-0.5">
                  Select certified faculty mentor displayed on course landing pages and certificates.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#111817] mb-1">
                    Select Assigned Instructor *
                  </label>
                  <select
                    value={instructorId}
                    onChange={(e) => setInstructorId(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] bg-white focus:outline-none focus:border-[#176B68]"
                  >
                    {instructors.map((inst) => (
                      <option key={inst.id} value={inst.id}>
                        {inst.name} ({inst.title}) &bull; {inst.email}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Instructor Profile Card Preview */}
                {selectedInstructor && (
                  <div className="p-4 sm:p-5 rounded-xl bg-[#F8FAFA] border border-[#E3ECEA] flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#176B68] text-white font-bold flex items-center justify-center shrink-0 text-sm">
                      {selectedInstructor.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="space-y-1 min-w-0">
                      <span className="font-bold text-sm text-[#111817] block">
                        {selectedInstructor.name}
                      </span>
                      <span className="text-xs font-medium text-[#176B68] block">
                        {selectedInstructor.title}
                      </span>
                      <p className="text-xs text-[#586765] leading-relaxed pt-1">
                        {selectedInstructor.bio}
                      </p>
                      <div className="flex items-center gap-1.5 flex-wrap pt-2">
                        {selectedInstructor.expertise.map((exp) => (
                          <span
                            key={exp}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-[#E3ECEA] text-[#586765]"
                          >
                            {exp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* SECTION F: MEDIA & PROMOTIONAL VIDEO                           */}
          {/* ============================================================== */}
          {activeTab === 'media' && (
            <div className="bg-white rounded-2xl border border-[#E3ECEA] p-6 sm:p-7 shadow-xs space-y-6">
              <div className="pb-4 border-b border-[#E3ECEA]">
                <h3 className="font-bold text-base text-[#111817]">Course Visual Assets &amp; Promo Video</h3>
                <p className="text-xs text-[#586765] mt-0.5">
                  Catalog thumbnail and promotional YouTube video played in the public course preview modal.
                </p>
              </div>

              <div className="space-y-6">
                {/* Thumbnail Image URL & Preview */}
                <div>
                  <label className="block text-xs font-bold text-[#111817] mb-1">
                    Course Thumbnail Image URL
                  </label>
                  <input
                    type="text"
                    value={thumbnailUrl}
                    onChange={(e) => setThumbnailUrl(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68]"
                  />

                  {/* Thumbnail Preview Box */}
                  <div className="mt-3 flex items-center gap-4">
                    <div className="relative w-36 h-24 rounded-xl overflow-hidden bg-neutral-100 border border-[#E3ECEA] shrink-0">
                      <Image
                        src={thumbnailUrl || '/logos/tools/python.svg'}
                        alt="Thumbnail Preview"
                        fill
                        className={thumbnailUrl?.endsWith('.svg') ? 'object-contain p-3' : 'object-cover'}
                        unoptimized
                      />
                    </div>
                    <div className="text-xs text-[#586765] space-y-1">
                      <span className="font-bold text-[#111817] block">Thumbnail Visual Preview</span>
                      <span className="text-[11px] block text-[#8A9795]">
                        Recommended aspect ratio: 16:9 (1280x720px minimum recommended).
                      </span>
                    </div>
                  </div>
                </div>

                {/* YouTube Promotional Video URL */}
                <div className="pt-4 border-t border-[#E3ECEA]">
                  <label className="block text-xs font-bold text-[#111817] mb-1">
                    Promotional YouTube Video URL or Embed URL
                  </label>
                  <input
                    type="text"
                    value={promotionalVideoUrl}
                    onChange={(e) => setPromotionalVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=kqtD5dpn9C8"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68]"
                  />

                  {/* Live YouTube Promo Validation */}
                  {ytPromoValidation && (
                    <div className="mt-3 space-y-3">
                      {ytPromoValidation.valid && ytPromoValidation.videoId ? (
                        <>
                          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                            <span>✓ Verified YouTube Promo Video (ID: {ytPromoValidation.videoId})</span>
                          </div>
                          <div className="relative aspect-video max-w-md rounded-xl overflow-hidden bg-black border border-neutral-300">
                            <iframe
                              src={getYouTubeEmbedUrl(ytPromoValidation.videoId)}
                              title="Promo Preview"
                              className="w-full h-full border-0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            />
                          </div>
                        </>
                      ) : (
                        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                          ⚠ {ytPromoValidation.error}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Save Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E3ECEA] p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#111817]">
              Status: <span className="capitalize font-mono text-[#176B68]">{status}</span>
            </span>
            <span className="text-[#8A9795]">&bull;</span>
            <button
              type="button"
              onClick={handleTogglePublish}
              disabled={savingSection === 'status'}
              className="text-xs font-bold text-[#176B68] hover:underline cursor-pointer"
            >
              {status === 'published' ? 'Switch to Draft' : 'Publish Course Live'}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/courses"
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#586765] hover:bg-[#F8FAFA]"
            >
              Cancel
            </Link>

            <button
              type="button"
              onClick={handleSaveAll}
              disabled={savingSection === 'all'}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#176B68] text-white hover:bg-[#104E4D] transition-colors disabled:opacity-50 cursor-pointer shadow-md shadow-[#176B68]/20"
            >
              {savingSection === 'all' ? 'Saving All Changes...' : 'Save All Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
