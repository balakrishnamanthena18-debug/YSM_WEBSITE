import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CourseMarketplaceView } from '@/components/courses/CourseMarketplaceView';
import { getPublishedCourses, getCategories } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Course Marketplace & Professional Specializations | YSM Infotech',
  description:
    'Browse and enroll in 13 industry-leading technology training programs in Artificial Intelligence, Data Analytics, Python, Cloud & DevOps, and Software Architecture.',
  openGraph: {
    title: 'Course Marketplace | YSM Infotech — ISO 9001:2015 Certified IT Academy',
    description:
      'Professional training programs with live interactive labs, 24/7 LMS curriculum access, and recognized certification.',
    type: 'website',
  },
};

export default function CoursesMarketplacePage() {
  const courses = getPublishedCourses();
  const categories = getCategories();

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111817] selection:bg-[#16B6B8]/20 selection:text-[#176B68]">
      {/* Universal Fixed Navigation Bar */}
      <Navbar />

      {/* Main Course Marketplace Flow */}
      <main className="flex-1">
        <CourseMarketplaceView
          initialCourses={courses}
          categories={categories}
        />
      </main>

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}
