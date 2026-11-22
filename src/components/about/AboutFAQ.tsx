'use client';

import React, { useState } from 'react';
import { Container } from '../ui/Container';
import { ABOUT_PAGE_DATA } from '@/data/about-page';

export function AboutFAQ() {
  const { faqs } = ABOUT_PAGE_DATA;
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative py-20 sm:py-24 md:py-28 bg-white border-b border-[#E3ECEA] overflow-hidden">
      <Container className="relative z-10">
        {/* Monospace Editorial Section Masthead */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E3ECEA] mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 font-mono text-[11px] sm:text-xs text-[#586765] uppercase tracking-widest mb-2">
              <span className="text-[#176B68] font-bold">05 //</span>
              <span>FREQUENTLY ASKED QUESTIONS</span>
              <span>•</span>
              <span>TRANSPARENT ANSWERS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold tracking-tight text-[#111817] leading-[1.15]">
              Popular Questions to Ask Before Choosing a Course
            </h2>
          </div>
          <p className="text-sm text-[#586765] max-w-md font-normal leading-relaxed">
            Clear, transparent answers about our instructional methodology, prerequisites, schedule, and support.
          </p>
        </div>

        {/* Accessible Editorial Accordion List */}
        <div className="max-w-3xl mx-auto divide-y divide-[#E3ECEA] border-y border-[#E3ECEA]">
          {faqs.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="py-5 sm:py-6 group">
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#176B68] rounded-lg cursor-pointer"
                >
                  <span className="flex items-center gap-4">
                    <span className="text-xs font-mono font-semibold text-[#176B68] group-hover:text-[#104E4D] transition-colors">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[16px] sm:text-[17.5px] font-bold text-[#111817] group-hover:text-[#176B68] transition-colors">
                      {faq.question}
                    </span>
                  </span>

                  <span
                    className={`shrink-0 w-7 h-7 rounded-md flex items-center justify-center transition-transform duration-200 ${
                      isOpen
                        ? 'bg-[#176B68] text-white rotate-180'
                        : 'bg-[#F5F9F8] text-[#586765] group-hover:bg-[#16B6B8]/15 group-hover:text-[#176B68]'
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div className="pt-4 pl-8 sm:pl-9 pr-4 text-[14.5px] sm:text-[15.5px] leading-relaxed text-[#586765] font-normal">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Direct Assistance Box */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 px-6 py-3.5 rounded-xl bg-[#F5F9F8] border border-[#E3ECEA] text-xs text-[#586765]">
            <span className="font-semibold text-[#111817]">
              Have a specific question not listed here?
            </span>
            <a
              href="https://wa.me/917997791456?text=Hi%20YSM%20Infotech%2C%20I%20have%20a%20question%20about%20your%20training%20courses."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-bold text-[#176B68] hover:text-[#104E4D] underline underline-offset-4"
            >
              <span>Chat with our admissions advisors on WhatsApp</span>
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
