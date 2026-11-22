import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { ELearningHero } from '@/components/elearning/ELearningHero';
import { ELearningProgramsDirectory } from '@/components/elearning/ELearningProgramsDirectory';
import { ELearningFeatures } from '@/components/elearning/ELearningFeatures';
import { ELearningWhyChoose } from '@/components/elearning/ELearningWhyChoose';
import { ELearningMissionVision } from '@/components/elearning/ELearningMissionVision';
import { ELearningClosingCTA } from '@/components/elearning/ELearningClosingCTA';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'E-Learning Programs & Digital Tech Training | YSM Infotech',
  description:
    'Empowering your future through digital learning. Industry-oriented online technology training with live sessions, 24/7 LMS access, practical labs, and ISO 9001:2015 certification.',
  openGraph: {
    title: 'E-Learning Programs | YSM Infotech — ISO 9001:2015 Certified IT Academy',
    description:
      'Explore 13 specialized digital training tracks in AI, Machine Learning, Data Analytics, Cloud & DevOps, and Software Architecture.',
    type: 'website',
  },
};

export default function ELearningPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111817] selection:bg-[#16B6B8]/20 selection:text-[#176B68]">
      {/* Universal Fixed Navigation Bar */}
      <Navbar />

      {/* Main E-Learning Content Flow */}
      <main className="flex-1">
        {/* Section 01: E-Learning Hero with Asymmetric Storytelling */}
        <ELearningHero />

        {/* Section 02: Our Training Programs (13 Curated Tracks with Real Logos) */}
        <ELearningProgramsDirectory />

        {/* Section 03: Our E-Learning Features (7 Core Capabilities) */}
        <ELearningFeatures />

        {/* Section 04: Why Choose YSM Infotech? (8 Verbatim Pillars) */}
        <ELearningWhyChoose />

        {/* Section 05: Our Mission & Vision (Deep Forest Green Double-Panel) */}
        <ELearningMissionVision />

        {/* Section 06: Final Call to Action */}
        <ELearningClosingCTA />
      </main>

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}
