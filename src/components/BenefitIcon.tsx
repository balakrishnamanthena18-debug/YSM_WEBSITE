'use client';

import React from 'react';
import { WhyChooseUsBenefit } from '@/data/about-us';

interface BenefitIconProps {
  type: WhyChooseUsBenefit['icon'];
  className?: string;
}

export function BenefitIcon({ type, className = '' }: BenefitIconProps) {
  // Domain color schemes
  const colorMap = {
    'online-training': {
      bg: 'bg-gradient-to-br from-blue-50 via-blue-50/50 to-blue-100/80 text-blue-700 border-blue-200/80 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-blue-600/20',
    },
    'industry-experts': {
      bg: 'bg-gradient-to-br from-emerald-50 via-emerald-50/50 to-emerald-100/80 text-emerald-700 border-emerald-200/80 group-hover:bg-emerald-600 group-hover:text-white group-hover:shadow-emerald-600/20',
    },
    'practice-manual': {
      bg: 'bg-gradient-to-br from-amber-50 via-amber-50/50 to-amber-100/80 text-amber-700 border-amber-200/80 group-hover:bg-amber-600 group-hover:text-white group-hover:shadow-amber-600/20',
    },
    'real-time-projects': {
      bg: 'bg-gradient-to-br from-indigo-50 via-indigo-50/50 to-indigo-100/80 text-indigo-700 border-indigo-200/80 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-indigo-600/20',
    },
    'one-to-one': {
      bg: 'bg-gradient-to-br from-rose-50 via-rose-50/50 to-rose-100/80 text-rose-700 border-rose-200/80 group-hover:bg-rose-600 group-hover:text-white group-hover:shadow-rose-600/20',
    },
    'resume-building': {
      bg: 'bg-gradient-to-br from-sky-50 via-sky-50/50 to-sky-100/80 text-sky-700 border-sky-200/80 group-hover:bg-sky-600 group-hover:text-white group-hover:shadow-sky-600/20',
    },
    'mock-interview': {
      bg: 'bg-gradient-to-br from-violet-50 via-violet-50/50 to-violet-100/80 text-violet-700 border-violet-200/80 group-hover:bg-violet-600 group-hover:text-white group-hover:shadow-violet-600/20',
    },
    'placement-guidance': {
      bg: 'bg-gradient-to-br from-teal-50 via-teal-50/50 to-teal-100/80 text-[#006B68] border-teal-200/80 group-hover:bg-[#006B68] group-hover:text-white group-hover:shadow-[#006B68]/20',
    },
  }[type];

  return (
    <div
      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 shadow-xs group-hover:scale-105 group-hover:shadow-md ${colorMap.bg} ${className}`}
      aria-hidden="true"
    >
      {/* 01. 100% Online Training: Graduation cap on digital display */}
      {type === 'online-training' && (
        <svg className="w-5 h-5 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      )}

      {/* 02. Trained by Industry Experts: Senior instructor & mentor team */}
      {type === 'industry-experts' && (
        <svg className="w-5 h-5 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )}

      {/* 03. Material and Practice manual: Open reference book & practice manual */}
      {type === 'practice-manual' && (
        <svg className="w-5 h-5 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <line x1="8" y1="7" x2="16" y2="7" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      )}

      {/* 04. Real Time Projects: Production project board with workflow branches */}
      {type === 'real-time-projects' && (
        <svg className="w-5 h-5 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
          <circle cx="15" cy="15" r="1.5" fill="currentColor" />
        </svg>
      )}

      {/* 05. One to One Connect: Direct 1-on-1 mentorship user conversation */}
      {type === 'one-to-one' && (
        <svg className="w-5 h-5 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <circle cx="9" cy="10" r="1" fill="currentColor" />
          <circle cx="12" cy="10" r="1" fill="currentColor" />
        </svg>
      )}

      {/* 06. Resume Building: Curriculum vitae document with approval badge */}
      {type === 'resume-building' && (
        <svg className="w-5 h-5 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <line x1="10" y1="9" x2="8" y2="9" />
        </svg>
      )}

      {/* 07. Mock Interview: Interactive candidate evaluation interview */}
      {type === 'mock-interview' && (
        <svg className="w-5 h-5 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
        </svg>
      )}

      {/* 08. Placement Guidance: Target bullseye with career achievement check */}
      {type === 'placement-guidance' && (
        <svg className="w-5 h-5 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )}
    </div>
  );
}
