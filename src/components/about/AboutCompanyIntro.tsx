'use client';

import React from 'react';
import { Container } from '../ui/Container';
import { ABOUT_PAGE_DATA } from '@/data/about-page';

export function AboutCompanyIntro() {
  const { introduction } = ABOUT_PAGE_DATA;

  return (
    <section className="relative py-20 sm:py-24 md:py-28 bg-white border-b border-[#E3ECEA] overflow-hidden text-[#111817]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Editorial Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-[#176B68]">
                02 // {introduction.eyebrow}
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-[#E3ECEA] to-transparent" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold tracking-tight text-[#111817] leading-[1.16]">
              {introduction.title}
            </h2>

            <div className="space-y-4 text-[15.5px] sm:text-[16.5px] leading-[1.75] text-[#586765] font-normal">
              {introduction.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Core Institutional Commitments */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-[#F5F9F8] border border-[#E3ECEA]">
                <div className="w-8 h-8 rounded-lg bg-[#16B6B8]/15 flex items-center justify-center text-[#176B68] mb-3">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-[#111817]">
                  Efficiency &amp; Quality Focus
                </h3>
                <p className="text-xs text-[#586765] mt-1 leading-relaxed">
                  Rigorous course structures designed around industry deliverables and active student outcomes.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#F5F9F8] border border-[#E3ECEA]">
                <div className="w-8 h-8 rounded-lg bg-[#16B6B8]/15 flex items-center justify-center text-[#176B68] mb-3">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-[#111817]">
                  Student Satisfaction
                </h3>
                <p className="text-xs text-[#586765] mt-1 leading-relaxed">
                  Hands-on mentorship, continuous feedback loops, and career placement readiness.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Institutional Accreditation Seal & Card */}
          <div className="lg:col-span-5">
            <div className="p-7 sm:p-9 rounded-2xl bg-[#F5F9F8] border border-[#E3ECEA] shadow-xs relative overflow-hidden">
              <div className="flex items-center gap-2 text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-[#176B68] mb-5">
                <span className="w-2 h-2 rounded-full bg-[#16B6B8]" aria-hidden="true" />
                <span>ACCREDITATION &amp; QUALITY</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#111817] tracking-tight leading-snug mb-3">
                {introduction.accreditationTag}
              </h3>

              <p className="text-sm text-[#586765] leading-relaxed mb-6">
                Demonstrating verifiable adherence to international quality management systems, continuously auditing curriculum freshness, instructor capability, and practical learning benchmarks.
              </p>

              <div className="space-y-3.5 pt-5 border-t border-[#E3ECEA]">
                <div className="flex items-start gap-3 text-xs text-[#586765]">
                  <div className="shrink-0 w-4 h-4 rounded-full bg-[#176B68] text-white flex items-center justify-center mt-0.5">
                    <svg
                      className="w-2.5 h-2.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                    >
                      <path d="m5 13 4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-[#111817] font-semibold">Standardized Syllabi:</strong> Regularly updated against enterprise job requirements in Data, Cloud, and Software Engineering.
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs text-[#586765]">
                  <div className="shrink-0 w-4 h-4 rounded-full bg-[#176B68] text-white flex items-center justify-center mt-0.5">
                    <svg
                      className="w-2.5 h-2.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                    >
                      <path d="m5 13 4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-[#111817] font-semibold">Practitioner Faculty:</strong> Led by industry veterans bringing active enterprise architectures to the classroom.
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs text-[#586765]">
                  <div className="shrink-0 w-4 h-4 rounded-full bg-[#176B68] text-white flex items-center justify-center mt-0.5">
                    <svg
                      className="w-2.5 h-2.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                    >
                      <path d="m5 13 4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-[#111817] font-semibold">Real-World Enterprise Labs:</strong> Dedicated project environments that replicate production technology setups.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
