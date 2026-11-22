'use client';

import React from 'react';
import { DetailedCourse } from '@/data/courses/types';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CourseHero } from './CourseHero';
import { CourseOverview } from './CourseOverview';
import { CourseCurriculum } from './CourseCurriculum';
import { CourseTechStack } from './CourseTechStack';
import { CourseAudienceEligibility } from './CourseAudienceEligibility';
import { CourseMethodology } from './CourseMethodology';
import { CourseCertification } from './CourseCertification';
import { CourseCareerPaths } from './CourseCareerPaths';
import { CourseFAQ } from './CourseFAQ';
import { CourseEnquiryCTA } from './CourseEnquiryCTA';
import { RelatedCourses } from './RelatedCourses';

interface CourseDetailViewProps {
  course: DetailedCourse;
  relatedCourses: DetailedCourse[];
}

export function CourseDetailView({
  course,
  relatedCourses,
}: CourseDetailViewProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111817] selection:bg-[#16B6B8]/20 selection:text-[#176B68]">
      {/* 1. Global Website Header / Navigation Bar */}
      <Navbar />

      {/* Main Course Content Flow */}
      <main className="flex-1">
        {/* Course Hero Section with Authentic Specs */}
        <CourseHero course={course} />

        {/* Course Overview, Training Coverage & Program Highlights */}
        <CourseOverview course={course} />

        {/* Target Audience, Eligibility & Prerequisites */}
        <CourseAudienceEligibility course={course} />

        {/* Comprehensive Curriculum Accordion with All Modules & Subtopics */}
        <CourseCurriculum course={course} />

        {/* Industry-Standard Tools & Technology Stack */}
        <CourseTechStack course={course} />

        {/* Training Methodology */}
        <CourseMethodology course={course} />

        {/* ISO 9001:2015 Course Completion Certificate */}
        <CourseCertification course={course} />

        {/* Career Opportunities & Industry Placement Guidance */}
        <CourseCareerPaths course={course} />

        {/* Frequently Asked Questions (if applicable) */}
        {course.faqs && course.faqs.length > 0 && <CourseFAQ course={course} />}

        {/* Closing Admissions & Direct WhatsApp / Phone Contact */}
        <CourseEnquiryCTA course={course} />

        {/* Related Specialized Programs */}
        <RelatedCourses courses={relatedCourses} />
      </main>

      {/* Universal Website Footer */}
      <Footer />
    </div>
  );
}
