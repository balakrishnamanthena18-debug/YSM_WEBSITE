import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { ContactView } from '@/components/contact/ContactView';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Contact Us | YSM Infotech — ISO 9001:2015 Certified IT Training Academy',
  description:
    'Contact Our Support Team to Know What You Want. You are just a step away from us. Fill out our inquiry form or contact us directly via phone, WhatsApp, or email.',
  openGraph: {
    title: 'Contact Us | YSM Infotech',
    description:
      'Contact our admissions and technical support team for course inquiries, curriculum syllabi, and upcoming cohort schedules.',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111817] selection:bg-[#16B6B8]/20 selection:text-[#176B68]">
      {/* Universal Navigation Header */}
      <Navbar />

      {/* Main Contact Page View */}
      <main className="flex-1">
        <ContactView />
      </main>

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}

