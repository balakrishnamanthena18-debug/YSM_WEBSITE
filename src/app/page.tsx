import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { HashRedirectHandler } from '@/components/HashRedirectHandler';
import { ProgramsSection } from '@/components/ProgramsSection';
import { WhatToExpectSection } from '@/components/WhatToExpectSection';
import { AudienceSection } from '@/components/AudienceSection';
import { CareerDestinationsSection } from '@/components/CareerDestinationsSection';
import { WhyYSMSection } from '@/components/WhyYSMSection';
import { MotivationSection } from '@/components/MotivationSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col text-[#071B1C] bg-white">
      <HashRedirectHandler />
      {/* 1. Unified Cinematic Hero Stage with Announcement, Navbar & Hero */}
      <div className="flex flex-col bg-[#062024]">
        <Navbar />
        <main className="flex-1 flex flex-col">
          <Hero />
        </main>
      </div>

      {/* 2. Programs / Courses Discovery Section */}
      <ProgramsSection />

      {/* 3. Our Approach: What to Expect from us Section */}
      <WhatToExpectSection />

      {/* 4. Audience: Our Courses are Suitable for … Section */}
      <AudienceSection />

      {/* 5. Career Destinations: Where Our Graduates Work */}
      <CareerDestinationsSection />

      {/* 6. About Us & Why Choose Us Section */}
      <WhyYSMSection />

      {/* 7. Academic Motivation Stage: Panoramic Mountain Canvas */}
      <MotivationSection />

      {/* 8. Contact Us Section */}
      <ContactSection />

      {/* 9. Production Footer */}
      <Footer />
    </div>
  );
}
