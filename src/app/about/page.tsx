import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { AboutHero } from '@/components/about/AboutHero';
import { AboutVisionMission } from '@/components/about/AboutVisionMission';
import { AboutLearningExperience } from '@/components/about/AboutLearningExperience';
import { AboutTestimonials } from '@/components/about/AboutTestimonials';
import { AboutFAQ } from '@/components/about/AboutFAQ';
import { AboutClosingCTA } from '@/components/about/AboutClosingCTA';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'About Us | YSM Infotech — ISO 9001:2015 Certified IT Training Academy',
  description:
    'Learn about YSM Infotech, an ISO 9001:2015 certified IT training organization committed to practical, industry-aligned technology courses, expert instructors, and student career advancement.',
  openGraph: {
    title: 'About Us | YSM Infotech',
    description:
      'ISO 9001:2015 Certified IT Training Academy in Hyderabad providing practical, real-world tech education in Cloud, Data, and Software Engineering.',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111817] selection:bg-[#16B6B8]/20 selection:text-[#176B68]">
      {/* Universal Fixed Navigation Bar */}
      <Navbar />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* 1. Cinematic Hero Stage with Central Photo Card, 6-Card Bento & Performance Metrics */}
        <AboutHero />

        {/* 2. Vision & Mission Strategic Foundation (01 / 02 Split) */}
        <AboutVisionMission />

        {/* 3. Four Pedagogical Learning Pillars Framework */}
        <AboutLearningExperience />

        {/* 4. Verified Alumni Student Testimonials */}
        <AboutTestimonials />

        {/* 5. Comprehensive FAQ Accordion */}
        <AboutFAQ />

        {/* 6. Institutional Closing Call to Action */}
        <AboutClosingCTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
