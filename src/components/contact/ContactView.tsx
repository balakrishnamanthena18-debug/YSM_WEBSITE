'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';

const COURSES_LIST = [
  'Python for AI',
  'Data Analytics with Gen AI',
  'AI & Machine Learning',
  'Data Science with Gen AI',
  'AI Engineer',
  'Gen AI & Agentic AI',
  'Azure DevOps',
  'Business Analyst with AI',
  'Advanced Excel with AI',
  'SQL',
  'Power BI with AI',
  'Tableau',
];

export function ContactView() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('Python for AI');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) return;

    const inquiryText = `Hi YSM Infotech, I have submitted an inquiry from the Contact page:
Name: ${name}
Phone: ${phone}
Email: ${email}
Course of Interest: ${course}
Message: ${message || 'I would like more information on upcoming cohorts and curriculum details.'}`;

    const whatsappUrl = `https://wa.me/917997791456?text=${encodeURIComponent(inquiryText)}`;
    setSubmitted(true);
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white">
      {/* 1. EDITORIAL HERO STAGE */}
      <section className="relative bg-[#0B201F] text-white pt-8 pb-14 sm:pt-12 sm:pb-20 border-b border-[#163635]">
        <Container>
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs sm:text-[13px] text-[#9CBDBA] mb-8 font-sans"
          >
            <Link
              href="/"
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Home
            </Link>
            <span className="text-white/30">&rsaquo;</span>
            <span className="text-white font-medium">Contact Us</span>
          </nav>

          <div className="max-w-3xl space-y-5 text-left">
            {/* Accreditation Badge */}
            <div className="flex items-center gap-2 text-xs">
              <span className="font-mono text-[11px] font-bold tracking-wider uppercase text-[#5BC4CC] bg-white/5 px-2.5 py-1 rounded border border-white/10">
                ISO 9001:2015 ACCREDITED
              </span>
              <span className="text-white/30">&bull;</span>
              <span className="text-xs font-medium text-[#D8E6E4]">
                Admissions &amp; Academic Support
              </span>
            </div>

            {/* Verbatim Page Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.15]">
              Contact Our Support Team to Know What You Want
            </h1>

            {/* Verbatim Page Subtitle */}
            <p className="text-base sm:text-lg text-[#D8E6E4] font-normal leading-relaxed max-w-2xl">
              You are just a step away from us. You can fill the form or directly contact us through one of this way.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. THREE DIRECT CONTACT CARDS */}
      <section className="py-12 sm:py-16 bg-[#F8FAFA] border-b border-[#E3ECEA]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Chat with us */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E3ECEA] hover:border-[#176B68] transition-all duration-200 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#E8F5F3] text-[#176B68] flex items-center justify-center mb-5">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <span className="font-mono text-xs font-bold text-[#176B68] uppercase tracking-wider block mb-1">
                  DIRECT LINE &amp; WHATSAPP
                </span>
                <h3 className="text-xl font-bold text-[#111817] mb-2">
                  Chat with us
                </h3>
                <p className="text-2xl font-bold text-[#176B68] tracking-tight mb-2">
                  7997791456
                </p>
                <p className="text-xs text-[#586765] leading-relaxed mb-6">
                  Available for immediate chat, admissions counseling, and cohort schedules.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 pt-4 border-t border-[#E3ECEA]">
                <a
                  href="https://wa.me/917997791456?text=Hi%20YSM%20Infotech%2C%20I%20would%20like%20to%20know%20more%20about%20your%20courses."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-bold bg-[#16B6B8] text-[#0A201F] hover:bg-[#5BC4CC] transition-colors"
                >
                  <span>Chat on WhatsApp</span>
                </a>
                <a
                  href="tel:+917997791456"
                  className="inline-flex items-center justify-center py-2.5 px-4 rounded-lg text-xs font-semibold bg-[#F5F8F7] text-[#111817] border border-[#E3ECEA] hover:bg-white transition-colors"
                >
                  <span>Call Directly</span>
                </a>
              </div>
            </div>

            {/* Card 2: Email Address */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E3ECEA] hover:border-[#176B68] transition-all duration-200 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#E8F5F3] text-[#176B68] flex items-center justify-center mb-5">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <span className="font-mono text-xs font-bold text-[#176B68] uppercase tracking-wider block mb-1">
                  OFFICIAL CORRESPONDENCE
                </span>
                <h3 className="text-xl font-bold text-[#111817] mb-2">
                  Email Address
                </h3>
                <p className="text-lg font-bold text-[#111817] tracking-tight mb-2 break-all">
                  info@ysminfotech.com
                </p>
                <p className="text-xs text-[#586765] leading-relaxed mb-6">
                  Send your technical, corporate training, or certification inquiries.
                </p>
              </div>

              <div className="pt-4 border-t border-[#E3ECEA]">
                <a
                  href="mailto:info@ysminfotech.com"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-bold bg-[#176B68] text-white hover:bg-[#104E4D] transition-colors"
                >
                  <span>Send an Email</span>
                </a>
              </div>
            </div>

            {/* Card 3: Reach Us */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E3ECEA] hover:border-[#176B68] transition-all duration-200 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#E8F5F3] text-[#176B68] flex items-center justify-center mb-5">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <span className="font-mono text-xs font-bold text-[#176B68] uppercase tracking-wider block mb-1">
                  OFFICE LOCATION
                </span>
                <h3 className="text-xl font-bold text-[#111817] mb-2">
                  Reach Us
                </h3>
                <p className="text-base font-bold text-[#111817] leading-snug mb-2">
                  31 Sunset Road, Gales Ferry
                </p>
                <p className="text-xs text-[#586765] leading-relaxed mb-6">
                  Enterprise Training Labs &bull; Online Live Operations &bull; Student Support
                </p>
              </div>

              <div className="pt-4 border-t border-[#E3ECEA]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#176B68] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Open Mon – Sat: 9:00 AM – 7:00 PM IST</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. INTERACTIVE CONTACT FORM & SUPPORT ARCHITECTURE */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#E3ECEA]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column (5 cols): Context & Support Overview */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold bg-[#F5F9F8] text-[#176B68] border border-[#E3ECEA]">
                <span>INQUIRY FORM</span>
                <span>&bull;</span>
                <span>QUICK RESPONSE</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#111817] leading-tight">
                Send a Message to Our Academic Team
              </h2>

              <p className="text-[15px] sm:text-base text-[#4A5755] leading-relaxed">
                Whether you want to explore career transition paths, request detailed module syllabi, or check live cohort schedules, our advisors are here to help.
              </p>

              {/* What to Expect List */}
              <div className="p-6 rounded-2xl bg-[#F8FAFA] border border-[#E3ECEA] space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#111817] font-mono">
                  Why Inquire with YSM Infotech?
                </h3>
                <ul className="space-y-3 text-xs sm:text-[13px] text-[#4A5755]">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#176B68] font-bold">✓</span>
                    <span>Direct discussion with senior industry instructors.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#176B68] font-bold">✓</span>
                    <span>Customized learning roadmap based on your current technical background.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#176B68] font-bold">✓</span>
                    <span>Full schedule of upcoming weekday and weekend batches.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#176B68] font-bold">✓</span>
                    <span>ISO 9001:2015 accredited certification details and evaluation criteria.</span>
                  </li>
                </ul>
              </div>

              {/* Social Channels Strip */}
              <div className="pt-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#586765] block mb-3 font-semibold">
                  Connect on Social Channels
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://wa.me/917997791456"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-[#F5F8F7] border border-[#E3ECEA] flex items-center justify-center text-[#176B68] hover:bg-[#176B68] hover:text-white transition-all shadow-2xs"
                    aria-label="WhatsApp"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-[#F5F8F7] border border-[#E3ECEA] flex items-center justify-center text-[#176B68] hover:bg-[#176B68] hover:text-white transition-all shadow-2xs"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-[#F5F8F7] border border-[#E3ECEA] flex items-center justify-center text-[#176B68] hover:bg-[#176B68] hover:text-white transition-all shadow-2xs"
                    aria-label="Instagram"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-[#F5F8F7] border border-[#E3ECEA] flex items-center justify-center text-[#176B68] hover:bg-[#176B68] hover:text-white transition-all shadow-2xs"
                    aria-label="Facebook"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column (7 cols): The Authentic Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-[#FBFDFD] border border-[#E3ECEA] rounded-3xl p-6 sm:p-10 shadow-sm">
                <div className="mb-8 pb-5 border-b border-[#E3ECEA]">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#176B68] font-bold block mb-1">
                    GET IN TOUCH
                  </span>
                  <h3 className="text-2xl font-bold text-[#111817]">
                    Contact Us
                  </h3>
                </div>

                {submitted ? (
                  <div className="p-8 rounded-2xl bg-[#E8F5F3] border border-[#16B6B8]/40 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-[#176B68] text-white flex items-center justify-center mx-auto">
                      <svg
                        className="w-6 h-6"
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
                    <h4 className="text-lg font-bold text-[#111817]">
                      Inquiry Received!
                    </h4>
                    <p className="text-sm text-[#4A5755] max-w-md mx-auto leading-relaxed">
                      Thank you, <strong className="text-[#111817]">{name}</strong>. Opening WhatsApp to connect directly with our admissions coordinator.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#176B68] hover:underline cursor-pointer pt-2"
                    >
                      <span>Send Another Inquiry &rarr;</span>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Your Name */}
                    <div>
                      <label
                        htmlFor="user-name"
                        className="block text-xs font-bold uppercase tracking-wider text-[#111817] mb-2 font-mono"
                      >
                        Your Name *
                      </label>
                      <input
                        id="user-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3.5 rounded-xl border border-[#E3ECEA] bg-white text-sm text-[#111817] placeholder:text-[#586765]/50 focus:outline-hidden focus:border-[#176B68] focus:ring-1 focus:ring-[#176B68] transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Number */}
                      <div>
                        <label
                          htmlFor="user-phone"
                          className="block text-xs font-bold uppercase tracking-wider text-[#111817] mb-2 font-mono"
                        >
                          Number (WhatsApp) *
                        </label>
                        <input
                          id="user-phone"
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3.5 rounded-xl border border-[#E3ECEA] bg-white text-sm text-[#111817] placeholder:text-[#586765]/50 focus:outline-hidden focus:border-[#176B68] focus:ring-1 focus:ring-[#176B68] transition-all"
                        />
                      </div>

                      {/* Contact Email */}
                      <div>
                        <label
                          htmlFor="user-email"
                          className="block text-xs font-bold uppercase tracking-wider text-[#111817] mb-2 font-mono"
                        >
                          Contact Email *
                        </label>
                        <input
                          id="user-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full px-4 py-3.5 rounded-xl border border-[#E3ECEA] bg-white text-sm text-[#111817] placeholder:text-[#586765]/50 focus:outline-hidden focus:border-[#176B68] focus:ring-1 focus:ring-[#176B68] transition-all"
                        />
                      </div>
                    </div>

                    {/* Course Selection */}
                    <div>
                      <label
                        htmlFor="user-course"
                        className="block text-xs font-bold uppercase tracking-wider text-[#111817] mb-2 font-mono"
                      >
                        Program of Interest
                      </label>
                      <select
                        id="user-course"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl border border-[#E3ECEA] bg-white text-sm text-[#111817] focus:outline-hidden focus:border-[#176B68] focus:ring-1 focus:ring-[#176B68] transition-all"
                      >
                        {COURSES_LIST.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="user-message"
                        className="block text-xs font-bold uppercase tracking-wider text-[#111817] mb-2 font-mono"
                      >
                        Your Message / Questions (Optional)
                      </label>
                      <textarea
                        id="user-message"
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us about your learning goals or batch timing preferences..."
                        className="w-full px-4 py-3.5 rounded-xl border border-[#E3ECEA] bg-white text-sm text-[#111817] placeholder:text-[#586765]/50 focus:outline-hidden focus:border-[#176B68] focus:ring-1 focus:ring-[#176B68] transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-4 px-6 rounded-xl font-bold text-sm bg-[#16B6B8] text-[#0A201F] hover:bg-[#5BC4CC] transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
                      >
                        <span>Submit Inquiry</span>
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </button>
                      <p className="text-[11px] text-[#586765] text-center mt-3">
                        By submitting, you agree to receive training curriculum details and admissions support.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. INSTITUTIONAL COMMITMENT BANNER (Verbatim from source) */}
      <section className="bg-[#0F2827] text-white py-14 sm:py-18 border-t border-[#1A3D3C]">
        <Container className="text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold bg-white/10 text-[#5BC4CC] border border-white/15 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16B6B8]" />
            <span className="tracking-wider uppercase font-mono font-bold">
              ISO 9001:2015 CERTIFIED ACADEMY
            </span>
          </div>

          <p className="text-base sm:text-lg text-[#D8E6E4] leading-relaxed mb-6">
            Empowering learners with industry-leading tech skills. As an ISO-certified organization, we are committed to delivering high-quality, hands-on training with real time projects . Join us and take the next step in your tech career!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#5BC4CC]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Live Interactive Instructor-Led Sessions
            </span>
            <span className="text-white/30 hidden sm:inline">&bull;</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Real-Time Practical Implementation
            </span>
            <span className="text-white/30 hidden sm:inline">&bull;</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              1-on-1 Career Support
            </span>
          </div>
        </Container>
      </section>
    </div>
  );
}

