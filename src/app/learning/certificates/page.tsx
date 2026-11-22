import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { requireAuth } from '@/lib/auth/session';
import { getCertificatesByStudentId } from '@/lib/db';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'My Course Certificates | YSM Infotech Learning Portal',
  description: 'View and download your official ISO 9001:2015 course completion certificates.',
};

export default async function CertificatesPage() {
  const user = await requireAuth();
  const certificates = getCertificatesByStudentId(user.id);

  return (
    <div className="py-10 sm:py-14 bg-[#F8FAFA] min-h-[85vh]">
      <Container>
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-10 pb-6 border-b border-[#E3ECEA] text-left">
          <span className="font-mono text-xs font-bold text-[#176B68] uppercase tracking-wider block mb-1">
            ACCREDITED CREDENTIALS REGISTRY
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111817]">
            Official Course Completion Certificates
          </h1>
          <p className="text-xs sm:text-sm text-[#586765] mt-1">
            Certificates issued by YSM Infotech are ISO 9001:2015 accredited and verifiable globally by employers.
          </p>
        </div>

        {certificates.length === 0 ? (
          <div className="max-w-md mx-auto bg-white rounded-3xl border border-[#E3ECEA] p-10 text-center shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-[#EBF7F5] text-[#176B68] flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="8" r="7" />
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-[#111817] mb-1">No certificates issued yet</h2>
            <p className="text-xs text-[#586765] mb-6 leading-relaxed">
              Complete 100% of your course modules and pass all curriculum assessments to generate your verified certificate.
            </p>
            <Link
              href="/learning/my-courses"
              className="inline-flex items-center justify-center py-2.5 px-6 rounded-xl font-bold text-xs bg-[#176B68] text-white hover:bg-[#104E4D]"
            >
              Continue Course Learning
            </Link>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-8">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-white rounded-3xl border-2 border-[#16B6B8]/40 p-8 sm:p-10 shadow-lg text-left relative overflow-hidden"
              >
                {/* Watermark accent */}
                <div className="absolute top-0 right-0 p-8 text-neutral-100 select-none pointer-events-none text-8xl font-black opacity-30">
                  ISO
                </div>

                <div className="flex items-center justify-between pb-6 border-b border-[#E3ECEA] mb-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/logo/ysm-brand-logo.png"
                    alt="YSM Infotech"
                    className="h-10 w-auto object-contain"
                  />
                  <div className="text-right">
                    <span className="font-mono text-xs font-bold text-[#176B68] block">
                      {cert.certificateNumber}
                    </span>
                    <span className="text-[10px] text-[#8A9795] font-mono">
                      Verification: {cert.verificationCode}
                    </span>
                  </div>
                </div>

                <div className="text-center py-6 space-y-3">
                  <span className="text-xs uppercase font-mono tracking-widest text-[#586765] font-semibold">
                    Certificate of Competence &amp; Course Completion
                  </span>
                  <p className="text-xs text-[#586765]">This is to certify that</p>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111817] tracking-tight">
                    {cert.studentName}
                  </h3>
                  <p className="text-xs text-[#586765] max-w-md mx-auto leading-relaxed">
                    has successfully satisfied all rigorous curriculum specifications, practical lab demonstrations, and assessment thresholds in
                  </p>
                  <h4 className="text-xl sm:text-2xl font-bold text-[#176B68]">
                    {cert.courseTitle}
                  </h4>
                  <div className="pt-2">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold font-mono bg-[#EBF7F5] text-[#176B68] border border-[#16B6B8]/30">
                      {cert.accreditationBadge}
                    </span>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#E3ECEA] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#586765]">
                  <div>
                    <span>Issued Date: </span>
                    <strong className="text-[#111817]">
                      {new Date(cert.issuedAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </strong>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        if (typeof window !== 'undefined') window.print();
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-[#176B68] text-white hover:bg-[#104E4D] transition-colors"
                    >
                      Print / Save as PDF
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
