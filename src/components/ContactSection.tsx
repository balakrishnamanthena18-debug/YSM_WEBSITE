'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Container } from './ui/Container';

interface FormData {
  name: string;
  mobile: string;
  email: string;
}

interface FormErrors {
  name?: string;
  mobile?: string;
  email?: string;
}

export function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobile: '',
    email: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasEnteredView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const cleanMobile = formData.mobile.replace(/[\s-]/g, '');
    if (!cleanMobile) {
      newErrors.mobile = 'Please enter your mobile number';
    } else if (!/^[0-9+]{10,14}$/.test(cleanMobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus('submitting');

    setTimeout(() => {
      setStatus('success');
    }, 850);
  };

  const handleReset = () => {
    setFormData({ name: '', mobile: '', email: '' });
    setErrors({});
    setStatus('idle');
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-20 sm:py-24 md:py-28 lg:py-32 bg-white border-t border-[#E3ECEA] overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Secondary anchor for #contact-us */}
      <div id="contact-us" className="absolute -top-24" aria-hidden="true" />

      {/* Subtle Background Architectural Coordinate Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(22,182,184,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(22,182,184,0.035)_1px,transparent_1px)] [background-size:56px_56px]"
        aria-hidden="true"
      />

      {/* Ambient Lighting Depth Bloom */}
      <div
        className="pointer-events-none absolute top-1/3 -left-[6%] w-[500px] h-[500px] rounded-full bg-[#16B6B8]/5 blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 -right-[6%] w-[480px] h-[480px] rounded-full bg-[#176B68]/5 blur-[120px]"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-20 items-start">
          {/* =========================================================================
              LEFT COLUMN — CONTACT INFORMATION & EDITORIAL HIERARCHY
              ========================================================================= */}
          <div
            className={`lg:col-span-5 flex flex-col justify-start transition-all duration-700 ${
              hasEnteredView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            {/* Small Uppercase Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5F9F8] border border-[#E3ECEA] text-[#176B68] w-fit mb-4 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16B6B8]" />
              <span className="text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-[0.2em]">
                LET&apos;S CONNECT
              </span>
            </div>

            {/* Main Exact Heading */}
            <h2
              id="contact-heading"
              className="text-[34px] sm:text-[42px] md:text-[48px] font-bold tracking-tight text-[#111817] leading-[1.12] mb-4"
            >
              Contact Us
            </h2>

            {/* Supporting Exact Paragraph */}
            <p className="text-[15.5px] sm:text-[16.5px] leading-[1.7] text-[#586765] font-normal max-w-lg mb-8 sm:mb-10">
              You are just a step away from us. You can fill the form or directly contact us through one of this way.
            </p>

            {/* Three Contact Information Rows */}
            <div className="space-y-4 sm:space-y-5">
              {/* --- Row 1: WhatsApp --- */}
              <Link
                href="https://wa.me/917997791456?text=Hi%20YSM%20Infotech%2C%20I%20would%20like%20to%20get%20in%20touch%20with%20you."
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-[#F5F9F8] border border-[#E3ECEA] hover:border-[#16B6B8] hover:bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Refined WhatsApp Icon */}
                <div className="w-11 h-11 rounded-xl bg-white border border-[#E3ECEA] flex items-center justify-center text-[#176B68] group-hover:bg-[#176B68] group-hover:text-white transition-all duration-200 shrink-0 shadow-2xs">
                  <svg
                    className="w-5 h-5 fill-currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] sm:text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#176B68] block mb-0.5">
                    CHAT WITH US
                  </span>
                  <span className="text-[16px] sm:text-[17px] font-bold text-[#111817] group-hover:text-[#176B68] transition-colors block">
                    7997791456
                  </span>
                  <span className="text-[11.5px] text-[#586765] block mt-0.5">
                    Live WhatsApp instant support &amp; consultation
                  </span>
                </div>

                <svg
                  className="w-4 h-4 text-[#586765]/40 group-hover:text-[#176B68] group-hover:translate-x-1 transition-all duration-200 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>

              {/* --- Row 2: Email Address --- */}
              <Link
                href="mailto:info@ysminfotech.com"
                className="group relative flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-[#F5F9F8] border border-[#E3ECEA] hover:border-[#16B6B8] hover:bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Refined Mail Icon */}
                <div className="w-11 h-11 rounded-xl bg-white border border-[#E3ECEA] flex items-center justify-center text-[#176B68] group-hover:bg-[#176B68] group-hover:text-white transition-all duration-200 shrink-0 shadow-2xs">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] sm:text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#176B68] block mb-0.5">
                    EMAIL ADDRESS
                  </span>
                  <span className="text-[15.5px] sm:text-[16.5px] font-bold text-[#111817] group-hover:text-[#176B68] transition-colors truncate block">
                    info@ysminfotech.com
                  </span>
                  <span className="text-[11.5px] text-[#586765] block mt-0.5">
                    Direct admissions, syllabus &amp; batch inquiries
                  </span>
                </div>

                <svg
                  className="w-4 h-4 text-[#586765]/40 group-hover:text-[#176B68] group-hover:translate-x-1 transition-all duration-200 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>

              {/* --- Row 3: Reach Us --- */}
              <Link
                href="mailto:info@ysminfotech.com"
                className="group relative flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-[#F5F9F8] border border-[#E3ECEA] hover:border-[#16B6B8] hover:bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Refined Location / Map Pin Icon */}
                <div className="w-11 h-11 rounded-xl bg-white border border-[#E3ECEA] flex items-center justify-center text-[#176B68] group-hover:bg-[#176B68] group-hover:text-white transition-all duration-200 shrink-0 shadow-2xs">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] sm:text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#176B68] block mb-0.5">
                    REACH US
                  </span>
                  <span className="text-[15.5px] sm:text-[16.5px] font-bold text-[#111817] group-hover:text-[#176B68] transition-colors truncate block">
                    info@ysminfotech.com
                  </span>
                  <span className="text-[11.5px] text-[#586765] block mt-0.5">
                    Hyderabad Hub &bull; ISO 9001:2015 Accredited Center
                  </span>
                </div>

                <svg
                  className="w-4 h-4 text-[#586765]/40 group-hover:text-[#176B68] group-hover:translate-x-1 transition-all duration-200 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN — PREMIUM CONTACT FORM
              ========================================================= */}
          <div
            className={`lg:col-span-7 transition-all duration-700 delay-150 ${
              hasEnteredView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="relative rounded-3xl sm:rounded-[32px] bg-[#F5F9F8] border border-[#E3ECEA] shadow-sm p-6 sm:p-9 md:p-11">
              {/* Corner Status Accent */}
              <div className="flex items-center justify-between mb-8 pb-5 border-b border-[#E3ECEA]">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111817]">
                    Send us an Inquiry
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#586765] mt-1">
                    Fill out the form below and an admissions mentor will contact you.
                  </p>
                </div>
                <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E3ECEA] text-[#176B68] text-xs font-semibold shrink-0 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-[#16B6B8] animate-pulse" />
                  <span>Admissions Open</span>
                </div>
              </div>

              {/* SUCCESS STATE FEEDBACK */}
              {status === 'success' ? (
                <div className="py-8 sm:py-12 text-center space-y-5 animate-hero-fade">
                  <div className="w-16 h-16 rounded-full bg-white text-[#176B68] border border-[#E3ECEA] mx-auto flex items-center justify-center shadow-sm">
                    <svg
                      className="w-8 h-8"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>

                  <div className="space-y-2 max-w-md mx-auto">
                    <h4 className="text-2xl font-bold tracking-tight text-[#111817]">
                      Thank You, {formData.name || 'Learner'}!
                    </h4>
                    <p className="text-[14.5px] text-[#586765] leading-relaxed">
                      We have received your details. An executive mentor will reach out to you at{' '}
                      <strong className="text-[#111817] font-semibold">{formData.mobile}</strong> or{' '}
                      <strong className="text-[#111817] font-semibold">{formData.email}</strong> with batch timings and course curriculum.
                    </p>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                      href={`https://wa.me/917997791456?text=Hi%20YSM%20Infotech%2C%20my%20name%20is%20${encodeURIComponent(
                        formData.name
                      )}.%20I%20just%20submitted%20an%20inquiry%20form%20for%20admissions.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#176B68] hover:bg-[#104E4D] text-white text-sm font-semibold transition-all duration-200"
                    >
                      <span>Connect on WhatsApp</span>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </Link>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white border border-[#E3ECEA] hover:bg-[#F5F9F8] text-[#111817] text-sm font-semibold transition-colors cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                /* FORM FIELDS */
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Field 1: Name * */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-name"
                      className="block text-[13px] sm:text-[13.5px] font-semibold text-[#111817]"
                    >
                      Name <span className="text-[#176B68] font-bold">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      className={`w-full h-12 sm:h-13 px-4 rounded-lg text-[14.5px] text-[#111817] placeholder:text-[#586765]/60 bg-white border transition-all duration-200 outline-none ${
                        errors.name
                          ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
                          : 'border-[#E3ECEA] focus:border-[#176B68] focus:ring-4 focus:ring-[#176B68]/10'
                      }`}
                      aria-invalid={errors.name ? 'true' : 'false'}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-xs text-red-500 font-medium pl-1">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Field 2: Mobile Number * */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-mobile"
                      className="block text-[13px] sm:text-[13.5px] font-semibold text-[#111817]"
                    >
                      Mobile Number <span className="text-[#176B68] font-bold">*</span>
                    </label>
                    <input
                      id="contact-mobile"
                      type="tel"
                      placeholder="Number"
                      value={formData.mobile}
                      onChange={(e) => {
                        setFormData({ ...formData, mobile: e.target.value });
                        if (errors.mobile) setErrors({ ...errors, mobile: undefined });
                      }}
                      className={`w-full h-12 sm:h-13 px-4 rounded-lg text-[14.5px] text-[#111817] placeholder:text-[#586765]/60 bg-white border transition-all duration-200 outline-none ${
                        errors.mobile
                          ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
                          : 'border-[#E3ECEA] focus:border-[#176B68] focus:ring-4 focus:ring-[#176B68]/10'
                      }`}
                      aria-invalid={errors.mobile ? 'true' : 'false'}
                      aria-describedby={errors.mobile ? 'mobile-error' : undefined}
                    />
                    {errors.mobile && (
                      <p id="mobile-error" className="text-xs text-red-500 font-medium pl-1">
                        {errors.mobile}
                      </p>
                    )}
                  </div>

                  {/* Field 3: Email Address * */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-email"
                      className="block text-[13px] sm:text-[13.5px] font-semibold text-[#111817]"
                    >
                      Email Address <span className="text-[#176B68] font-bold">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="Contact Email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      className={`w-full h-12 sm:h-13 px-4 rounded-lg text-[14.5px] text-[#111817] placeholder:text-[#586765]/60 bg-white border transition-all duration-200 outline-none ${
                        errors.email
                          ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
                          : 'border-[#E3ECEA] focus:border-[#176B68] focus:ring-4 focus:ring-[#176B68]/10'
                      }`}
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-xs text-red-500 font-medium pl-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Submit Button: Submit → */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="group w-full h-12 sm:h-13 px-8 rounded-lg bg-[#176B68] hover:bg-[#104E4D] text-white font-semibold text-[15px] tracking-wide shadow-sm hover:shadow-lg hover:shadow-[#176B68]/20 transition-all duration-200 active:scale-[0.99] flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {status === 'submitting' ? (
                        <>
                          <svg
                            className="animate-spin w-4 h-4 text-white"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit</span>
                          <span className="transition-transform duration-200 group-hover:translate-x-1">
                            &rarr;
                          </span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Privacy Assurance Micro-Footnote */}
                  <div className="pt-2 text-center text-xs text-[#586765] flex items-center justify-center gap-2">
                    <svg className="w-3.5 h-3.5 text-[#176B68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span>Your details are secure. We respect your privacy and never share your data.</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
