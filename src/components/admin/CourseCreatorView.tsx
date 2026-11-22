'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  CourseCategory,
  CourseDeliveryType,
  CourseSkillLevel,
  CourseValidityType,
  CourseDurationUnit,
} from '@/lib/db/schema';
import { createCourseAction } from '@/app/actions/admin';
import { InstructorViewRecord } from '@/lib/db';
import { parseAndValidateYouTubeUrl } from '@/lib/video/youtube';

interface CourseCreatorViewProps {
  categories: CourseCategory[];
  instructors: InstructorViewRecord[];
}

export function CourseCreatorView({ categories, instructors }: CourseCreatorViewProps) {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [slug, setSlug] = useState('');
  const [autoSlug, setAutoSlug] = useState(true);
  const [deliveryType, setDeliveryType] = useState<CourseDeliveryType>('LIVE_INSTRUCTOR_LED');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || '');
  const [skillLevel, setSkillLevel] = useState<CourseSkillLevel>('Intermediate');
  const [language, setLanguage] = useState('English');
  const [durationValue, setDurationValue] = useState('8');
  const [durationUnit, setDurationUnit] = useState<CourseDurationUnit>('Weeks');

  // Pricing
  const [regularPrice, setRegularPrice] = useState('9999');
  const [sellingPrice, setSellingPrice] = useState('4999');
  const [discountEnabled, setDiscountEnabled] = useState(true);

  // Validity
  const [validityType, setValidityType] = useState<CourseValidityType>('lifetime');
  const [validityDuration, setValidityDuration] = useState('180');

  // Instructor
  const [instructorId, setInstructorId] = useState(instructors[0]?.id || '');

  // Media
  const [thumbnailUrl, setThumbnailUrl] = useState('/logos/tools/python.svg');
  const [promotionalVideoUrl, setPromotionalVideoUrl] = useState('https://www.youtube.com/watch?v=kqtD5dpn9C8');

  // State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate discount percentage
  const numRegular = Math.max(0, Number(regularPrice) || 0);
  const numSelling = Math.max(0, Number(sellingPrice) || 0);
  const discountPct =
    numRegular > 0 && discountEnabled ? Math.round(((numRegular - numSelling) / numRegular) * 100) : 0;

  // Handle Title change & Auto-slug
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (autoSlug) {
      const generated = val
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setSlug(generated);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Course title is required.');
      return;
    }

    if (numRegular < 0 || numSelling < 0) {
      setError('Prices cannot be negative.');
      return;
    }

    if (discountEnabled && numSelling > numRegular) {
      setError('Selling price cannot exceed regular price when discount is enabled.');
      return;
    }

    // Validate YouTube promo URL if provided
    if (promotionalVideoUrl.trim()) {
      const v = parseAndValidateYouTubeUrl(promotionalVideoUrl);
      if (!v.valid) {
        setError(v.error || 'Please enter a valid YouTube promotional video link.');
        return;
      }
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await createCourseAction({
        title: title.trim(),
        subtitle: subtitle.trim(),
        slug: slug.trim(),
        deliveryType,
        description: description.trim(),
        categoryId,
        skillLevel,
        language: language.trim(),
        durationValue: parseInt(durationValue, 10) || 8,
        durationUnit,
        regularPrice: numRegular,
        sellingPrice: numSelling,
        discountEnabled,
        validityType,
        validityDuration: parseInt(validityDuration, 10) || 180,
        instructorId,
        thumbnailUrl: thumbnailUrl.trim(),
        promotionalVideoUrl: promotionalVideoUrl.trim(),
        status: 'draft',
      });

      if (res.success && res.course) {
        router.push(`/admin/courses/${res.course.id}/edit`);
      } else {
        setError(res.error || 'Failed to create course.');
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected server error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 max-w-4xl mx-auto space-y-8">
      {/* Breadcrumb & Header */}
      <div>
        <nav className="flex items-center gap-2 text-xs text-[#586765] font-mono mb-2">
          <Link href="/admin/courses" className="hover:text-[#176B68]">
            Courses
          </Link>
          <span>&rsaquo;</span>
          <span className="text-[#111817] font-bold">New Course Creation</span>
        </nav>
        <div className="pb-6 border-b border-[#E3ECEA]">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111817]">
            Create Specialized Track
          </h1>
          <p className="text-xs text-[#586765] mt-1">
            Initialize a new IT training specialization with validated pricing, instructor mapping, and syllabus defaults.
          </p>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
          {error}
        </div>
      )}

      {/* Creation Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Card 1: Fundamentals */}
        <div className="bg-white rounded-2xl border border-[#E3ECEA] p-6 sm:p-7 shadow-xs space-y-5">
          <h3 className="font-bold text-sm text-[#111817] border-b border-[#E3ECEA] pb-3">
            1. Training Delivery Model &amp; Basics
          </h3>

          {/* Delivery Model Selection */}
          <div>
            <label className="block text-xs font-bold text-[#111817] mb-2">
              Select Delivery Model *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-3 ${
                  deliveryType === 'LIVE_INSTRUCTOR_LED'
                    ? 'border-[#176B68] bg-[#EBF7F5] ring-2 ring-[#176B68]/20'
                    : 'border-[#E3ECEA] bg-[#F8FAFA] hover:bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="deliveryType"
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
                    Scheduled virtual cohorts, live Zoom/Meet sessions, real-time trainer Q&amp;A, practical labs, and attendance tracking.
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
                  name="deliveryType"
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
                    Structured recorded video modules, YouTube integration, resume playback, lesson completion progress, and 24/7 on-demand access.
                  </span>
                </div>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#111817] mb-1">
              Course Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Generative AI with Agentic Workflows"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#111817] mb-1">
              Course Tagline / Subtitle
            </label>
            <input
              type="text"
              placeholder="e.g. Master LangGraph, Multi-Agent Orchestration & Enterprise LLM Deployment"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-[#111817]">
                Public URL Slug *
              </label>
              <button
                type="button"
                onClick={() => setAutoSlug((prev) => !prev)}
                className="text-[11px] font-mono text-[#176B68] hover:underline"
              >
                {autoSlug ? 'Auto-generating from Title' : 'Manual editing enabled'}
              </button>
            </div>
            <div className="flex items-center rounded-xl border border-[#E3ECEA] bg-[#F8FAFA] overflow-hidden focus-within:border-[#176B68]">
              <span className="px-3.5 text-xs text-[#8A9795] font-mono border-r border-[#E3ECEA] bg-neutral-100">
                ysminfotech.com/courses/
              </span>
              <input
                type="text"
                value={slug}
                onChange={(e) => {
                  setAutoSlug(false);
                  setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'));
                }}
                className="w-full text-xs px-3.5 py-2.5 bg-transparent focus:outline-none font-mono"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#111817] mb-1">
              Course Description *
            </label>
            <textarea
              rows={3}
              placeholder="Overview of curriculum coverage, industry application, and hands-on laboratory outcomes..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68]"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#111817] mb-1">
                Category *
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
                Difficulty Level
              </label>
              <select
                value={skillLevel}
                onChange={(e) => setSkillLevel(e.target.value as CourseSkillLevel)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] bg-white focus:outline-none focus:border-[#176B68]"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="All Levels">All Levels</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#111817] mb-1">
                Language
              </label>
              <input
                type="text"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68]"
              />
            </div>
          </div>
        </div>

        {/* Card 2: Pricing */}
        <div className="bg-white rounded-2xl border border-[#E3ECEA] p-6 sm:p-7 shadow-xs space-y-5">
          <h3 className="font-bold text-sm text-[#111817] border-b border-[#E3ECEA] pb-3">
            2. Course Pricing &amp; Commercial Policy
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-[#111817] mb-1">
                Regular Catalog Retail Price (₹) *
              </label>
              <input
                type="number"
                min="0"
                step="100"
                value={regularPrice}
                onChange={(e) => setRegularPrice(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68] font-mono font-bold"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#111817] mb-1">
                Promotional Selling Price (₹) *
              </label>
              <input
                type="number"
                min="0"
                step="100"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68] font-mono font-bold text-[#176B68]"
                required
              />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8FAFA] border border-[#E3ECEA] flex items-center justify-between">
            <span className="text-xs text-[#586765]">
              Computed Student Discount: <strong className="text-[#176B68] font-mono text-sm">{discountPct}% OFF</strong>
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

        {/* Card 3: Duration & Validity */}
        <div className="bg-white rounded-2xl border border-[#E3ECEA] p-6 sm:p-7 shadow-xs space-y-5">
          <h3 className="font-bold text-sm text-[#111817] border-b border-[#E3ECEA] pb-3">
            3. Duration, Validity &amp; Faculty
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-[#111817] mb-1">
                Estimated Duration
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  min="1"
                  max="52"
                  value={durationValue}
                  onChange={(e) => setDurationValue(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68]"
                />
                <select
                  value={durationUnit}
                  onChange={(e) => setDurationUnit(e.target.value as CourseDurationUnit)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] bg-white focus:outline-none focus:border-[#176B68]"
                >
                  <option value="Weeks">Weeks</option>
                  <option value="Months">Months</option>
                  <option value="Days">Days</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#111817] mb-1">
                Access Validity
              </label>
              <select
                value={validityType}
                onChange={(e) => setValidityType(e.target.value as CourseValidityType)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] bg-white focus:outline-none focus:border-[#176B68]"
              >
                <option value="lifetime">Lifetime Access</option>
                <option value="fixed_duration">Fixed Duration</option>
              </select>
              {validityType === 'fixed_duration' && (
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="1825"
                    value={validityDuration}
                    onChange={(e) => setValidityDuration(e.target.value)}
                    className="w-24 text-xs px-3 py-1.5 rounded-lg border border-[#E3ECEA] focus:outline-none focus:border-[#176B68]"
                  />
                  <span className="text-xs text-[#586765]">Days from enrollment</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#111817] mb-1">
              Assigned Faculty Mentor
            </label>
            <select
              value={instructorId}
              onChange={(e) => setInstructorId(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] bg-white focus:outline-none focus:border-[#176B68]"
            >
              {instructors.map((inst) => (
                <option key={inst.id} value={inst.id}>
                  {inst.name} ({inst.title})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-[#E3ECEA]">
            <div>
              <label className="block text-xs font-bold text-[#111817] mb-1">
                Thumbnail Asset Path
              </label>
              <input
                type="text"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="/images/courses/..."
                className="w-full text-xs px-3.5 py-2 rounded-xl border border-[#E3ECEA] font-mono focus:outline-none focus:border-[#176B68]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#111817] mb-1">
                Promotional YouTube Video URL
              </label>
              <input
                type="url"
                value={promotionalVideoUrl}
                onChange={(e) => setPromotionalVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full text-xs px-3.5 py-2 rounded-xl border border-[#E3ECEA] font-mono focus:outline-none focus:border-[#176B68]"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Link
            href="/admin/courses"
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#586765] hover:bg-neutral-100"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting || !title.trim()}
            className="px-7 py-2.5 rounded-xl text-xs font-bold bg-[#176B68] text-white hover:bg-[#104E4D] transition-colors disabled:opacity-50 cursor-pointer shadow-md shadow-[#176B68]/20"
          >
            {isSubmitting ? 'Creating Course...' : 'Create Course & Open Editor'}
          </button>
        </div>
      </form>
    </div>
  );
}
