'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { DetailedCourse } from '@/data/courses/types';

interface SyllabusModalProps {
  course: DetailedCourse;
  isOpen: boolean;
  onClose: () => void;
}

export function SyllabusModal({ course, isOpen, onClose }: SyllabusModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [experience, setExperience] = useState('Working Professional');
  const [submitted, setSubmitted] = useState(false);

  const handleClose = useCallback(() => {
    setSubmitted(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const message = `Hi YSM Infotech, I would like to download the detailed syllabus for ${course.title}.\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nProfile: ${experience}`;
    const whatsappUrl = `https://wa.me/917997791456?text=${encodeURIComponent(message)}`;

    // Open WhatsApp in a new tab after a brief pause
    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#111817]/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="syllabus-modal-title"
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl border border-[#E3ECEA] shadow-[0_24px_64px_rgba(17,24,23,0.2)] p-6 sm:p-8 overflow-hidden">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F5F9F8] text-[#586765] hover:text-[#111817] flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {!submitted ? (
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#F5F9F8] text-[#176B68] border border-[#E3ECEA] mb-3">
              <span>OFFICIAL BROCHURE REQUEST</span>
            </div>

            <h3
              id="syllabus-modal-title"
              className="text-xl sm:text-2xl font-extrabold text-[#111817] tracking-tight leading-snug"
            >
              Download Full Syllabus Booklet
            </h3>
            <p className="text-xs sm:text-sm text-[#586765] mt-1 mb-6 leading-relaxed">
              Receive the complete {course.modules.length}-module curriculum for{' '}
              <strong className="text-[#111817] font-semibold">{course.title}</strong>{' '}
              including coding assignments, real capstone requirements, and schedule breakdown.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#111817] mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] text-sm text-[#111817] focus:outline-none focus:border-[#16B6B8] focus:ring-1 focus:ring-[#16B6B8] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111817] mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. rahul.sharma@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] text-sm text-[#111817] focus:outline-none focus:border-[#16B6B8] focus:ring-1 focus:ring-[#16B6B8] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111817] mb-1">
                  WhatsApp / Phone Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] text-sm text-[#111817] focus:outline-none focus:border-[#16B6B8] focus:ring-1 focus:ring-[#16B6B8] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111817] mb-1">
                  Current Profile
                </label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] text-sm text-[#111817] focus:outline-none focus:border-[#16B6B8] focus:ring-1 focus:ring-[#16B6B8] transition-colors bg-white"
                >
                  <option value="Working Professional">Working IT Professional</option>
                  <option value="Non-IT Professional">Non-IT Professional (Career Switch)</option>
                  <option value="Final Year Student / Fresh Graduate">Final Year Student / Fresh Graduate</option>
                  <option value="Entrepreneur / Freelancer">Entrepreneur / Freelancer</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3.5 px-4 rounded-xl font-bold text-sm bg-[#176B68] hover:bg-[#104E4D] text-white shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Download &amp; Receive via WhatsApp</span>
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>

              <p className="text-[11px] text-center text-[#586765] mt-2">
                🔒 We respect your privacy. No spam. You will also receive immediate WhatsApp counselor assistance.
              </p>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-7 h-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h3 className="text-xl font-bold text-[#111817] mb-2">
              Syllabus Request Received!
            </h3>
            <p className="text-sm text-[#586765] leading-relaxed mb-6">
              Thank you, <strong className="text-[#111817]">{name}</strong>. Opening WhatsApp to deliver the {course.title} PDF syllabus directly to your device.
            </p>

            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#F5F9F8] text-[#176B68] border border-[#E3ECEA] hover:bg-white transition-colors"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
