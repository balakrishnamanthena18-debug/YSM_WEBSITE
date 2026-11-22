'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ProgramCourse } from '@/data/programs';
import { CourseTechIcon } from './CourseTechIcon';

interface CourseDetailModalProps {
  course: ProgramCourse | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CourseDetailModal({ course, isOpen, onClose }: CourseDetailModalProps) {
  // Handle ESC key to close modal & lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !course) return null;

  const accentBadgeStyles: Record<string, string> = {
    teal: 'bg-[#006B68]/10 text-[#006B68] border-[#006B68]/20',
    violet: 'bg-[#6366F1]/12 text-[#4F46E5] border-[#6366F1]/25',
    cyan: 'bg-[#0284C7]/12 text-[#0284C7] border-[#0284C7]/25',
    blue: 'bg-[#2563EB]/12 text-[#1D4ED8] border-[#2563EB]/25',
    emerald: 'bg-[#059669]/12 text-[#047857] border-[#059669]/25',
    amber: 'bg-[#D97706]/12 text-[#B45309] border-[#D97706]/25',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="course-modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#071B1C]/65 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#006B68]/15 overflow-hidden z-10 my-auto animate-hero-fade">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 sm:px-8 pt-6 pb-4 border-b border-slate-100 bg-[#F5FAF9]/60">
          <div className="flex items-center gap-3">
            <CourseTechIcon type={course.iconType} accent={course.accent} size="md" />
            <div>
              <span className="text-[11.5px] font-medium tracking-wide text-[#071B1C]/60 block">
                Track {course.number} of 12 Specialized Programs
              </span>
              <span
                className={`inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold tracking-wide border mt-1 ${accentBadgeStyles[course.accent] || 'bg-slate-100 text-slate-700'}`}
              >
                {course.category}
              </span>
            </div>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-[#071B1C]/70 hover:text-[#071B1C] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          <div>
            <h3
              id="course-modal-title"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-[#071B1C] leading-snug mb-3"
            >
              {course.title}
            </h3>
            <p className="text-[15px] sm:text-[15.5px] leading-relaxed text-[#071B1C]/75">
              {course.description}
            </p>
          </div>

          {/* Key Skill Tags */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#071B1C]/60 mb-2.5">
              Core Technologies &amp; Skill Competencies
            </h4>
            <div className="flex flex-wrap gap-2">
              {course.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#F0F7F6] text-[#006B68] border border-[#006B68]/15"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Comprehensive Curriculum Modules */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#071B1C]/60 mb-3">
              Comprehensive Curriculum Breakdown
            </h4>
            <div className="space-y-2.5">
              {course.curriculum.map((module, idx) => (
                <div
                  key={module}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100"
                >
                  <span className="w-6 h-6 rounded-full bg-[#006B68]/10 text-[#006B68] text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                    0{idx + 1}
                  </span>
                  <span className="text-[13.5px] font-medium text-[#071B1C]/85 leading-snug">
                    {module}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Target Career Roles */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#071B1C]/60 mb-2">
              Target Career Pathways
            </h4>
            <div className="flex flex-wrap gap-2">
              {course.careerRoles.map((role) => (
                <span
                  key={role}
                  className="text-xs font-medium text-[#071B1C]/75 bg-slate-100 px-3 py-1 rounded-full"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer / Direct Inquiry Actions */}
        <div className="px-6 sm:px-8 py-4 sm:py-5 bg-[#F5FAF9] border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#071B1C]/60 text-center sm:text-left">
            ISO 9001:2015 Certified • Live Instructor-Led &amp; Industry Labs
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            <Link
              href={`/courses/${course.slug}`}
              onClick={onClose}
              className="inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-full bg-[#16B6B8] hover:bg-[#5BC4CC] text-[#102E2D] font-bold text-xs sm:text-sm tracking-wide shadow-sm hover:shadow transition-all"
            >
              <span>Full Course Page</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>

            <Link
              href={`https://wa.me/917997791456?text=${encodeURIComponent(course.inquiryMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-full bg-[#176B68] hover:bg-[#104E4D] text-white font-semibold text-xs sm:text-sm tracking-wide shadow-sm hover:shadow transition-all"
            >
              <span>WhatsApp</span>
            </Link>

            <Link
              href="tel:+917997791456"
              className="inline-flex items-center justify-center h-10 px-3.5 rounded-full bg-white hover:bg-slate-50 text-[#111817] border border-[#E3ECEA] font-medium text-xs sm:text-sm tracking-wide transition-all"
            >
              Call Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
