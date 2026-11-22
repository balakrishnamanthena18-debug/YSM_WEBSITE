'use client';

import React from 'react';
import { ExpectAccent } from '@/data/what-to-expect';

interface ExpectFeatureIconProps {
  type: 'knowledge' | 'instructors' | 'skills' | 'interactive';
  accent: ExpectAccent;
  className?: string;
}

export function ExpectFeatureIcon({ type, accent, className = '' }: ExpectFeatureIconProps) {
  // Container styling matching the feature's accent
  const containerStyles = {
    teal: 'bg-gradient-to-br from-[#E6FFFA] via-[#F0FDFA] to-[#CCFBF1] text-[#006B68] border-teal-200/80 shadow-[0_4px_16px_rgba(0,107,104,0.15)]',
    blue: 'bg-gradient-to-br from-[#EFF6FF] via-[#F0F9FF] to-[#DBEAFE] text-[#0284C7] border-blue-200/80 shadow-[0_4px_16px_rgba(2,132,199,0.15)]',
    amber: 'bg-gradient-to-br from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A] text-[#D97706] border-amber-200/80 shadow-[0_4px_16px_rgba(217,119,6,0.15)]',
    violet: 'bg-gradient-to-br from-[#F5F3FF] via-[#EDE9FE] to-[#DDD6FE] text-[#7C3AED] border-purple-200/80 shadow-[0_4px_16px_rgba(124,58,237,0.15)]',
  }[accent];

  return (
    <div
      className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border transition-transform duration-300 group-hover:scale-105 ${containerStyles} ${className}`}
      aria-hidden="true"
    >
      {/* 01. Knowledge: Graduation cap & open book of technology */}
      {type === 'knowledge' && (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
          <path d="M12 15a3 3 0 0 0-3-3" strokeDasharray="1.5 1.5" />
        </svg>
      )}

      {/* 02. Expert Instructors: Senior mentor and technical practitioners */}
      {type === 'instructors' && (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          <circle cx="19" cy="8" r="1.5" fill="currentColor" />
        </svg>
      )}

      {/* 03. Practical Skills: Hands-on technical toolbench & real-world gear */}
      {type === 'skills' && (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          <circle cx="18" cy="6" r="1.5" fill="currentColor" />
        </svg>
      )}

      {/* 04. Interactive Learning: Interactive laptop screen & collaborative loop */}
      {type === 'interactive' && (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
          <path d="m8 9 2 2-2 2" strokeWidth="2.2" />
          <line x1="13" y1="13" x2="16" y2="13" strokeWidth="2.2" />
        </svg>
      )}
    </div>
  );
}

