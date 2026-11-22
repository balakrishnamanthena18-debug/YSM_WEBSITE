'use client';

import React from 'react';
import { DetailedCourse } from '@/data/courses/types';
import { Container } from '@/components/ui/Container';

interface CourseCertificationProps {
  course: DetailedCourse;
}

export function CourseCertification({ course }: CourseCertificationProps) {
  return (
    <section className="py-14 sm:py-20 bg-white border-b border-[#E3ECEA]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Authentic Certification Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold bg-[#F5F9F8] text-[#176B68] border border-[#E3ECEA]">
              <span>CERTIFICATION</span>
              <span>&bull;</span>
              <span>ISO 9001:2015</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#111817] leading-tight">
              Course Completion Certificate
            </h2>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-[#176B68] uppercase tracking-wider font-mono">
                Students will receive:
              </p>
              <div className="inline-flex items-center gap-3 px-4 py-3 rounded-lg bg-[#F5F9F8] border border-[#E3ECEA] text-base font-bold text-[#111817]">
                <span className="w-2 h-2 rounded-full bg-[#16B6B8]" />
                <span>Course Completion Certificate</span>
              </div>
            </div>

            <div className="bg-[#F8FAFA] rounded-xl border border-[#E3ECEA] p-5 sm:p-6">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#176B68] mb-1">
                ISO 9001:2015 Certified
              </div>
              <p className="text-sm text-[#4A5755] leading-relaxed">
                As an ISO-certified organization, we are committed to delivering high-quality, hands-on training with real time projects . Join us and take the next step in your tech career!
              </p>
            </div>
          </div>

          {/* Right Column: Realistic Academic Credential Document */}
          <div className="lg:col-span-6">
            <div className="bg-[#FBFDFD] rounded-xl border border-[#E3ECEA] p-6 sm:p-8 shadow-xs">
              <div className="border border-[#D1E0DD] rounded-lg p-6 sm:p-7 bg-white space-y-5 text-center">
                {/* Academic Header */}
                <div className="pb-4 border-b border-[#E3ECEA]">
                  <div className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-[#586765]">
                    YSM INFOTECH &bull; ISO 9001:2015 CERTIFIED
                  </div>
                  <div className="text-xs uppercase font-bold tracking-wider text-[#176B68] mt-1.5">
                    CERTIFICATE OF COMPLETION
                  </div>
                </div>

                {/* Candidate Content */}
                <div className="space-y-2 py-3">
                  <div className="text-[10.5px] font-mono text-[#586765] uppercase tracking-wider">
                    THIS CERTIFICATE IS AWARDED TO
                  </div>
                  <div className="text-xl font-serif italic font-bold text-[#111817]">
                    Student Candidate Name
                  </div>
                  <div className="text-xs text-[#4A5755] max-w-xs mx-auto leading-relaxed pt-1">
                    for successful completion of training and practical implementation in:
                  </div>
                  <div className="text-base sm:text-lg font-bold text-[#176B68] pt-1">
                    {course.title}
                  </div>
                </div>

                {/* Verification Footer */}
                <div className="pt-4 border-t border-[#E3ECEA] flex items-center justify-between text-xs text-[#586765]">
                  <span className="font-mono text-[11px]">YSM Infotech</span>
                  <span className="font-mono text-[11px] font-semibold text-[#176B68]">ISO 9001:2015 Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
