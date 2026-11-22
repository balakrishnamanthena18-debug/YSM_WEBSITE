import React from 'react';
import { notFound } from 'next/navigation';
import { getCourseById, getLiveBatches, getAllInstructors, getBatchEnrollments } from '@/lib/db';
import { LiveBatchesView } from '@/components/admin/LiveBatchesView';

interface BatchesPageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export const metadata = {
  title: 'Live Batches & Schedules | YSM Admin LMS',
  description: 'Manage cohort batches, class schedules, meeting links, and attendance.',
};

export default async function AdminLiveBatchesPage({ params }: BatchesPageProps) {
  const resolvedParams = await params;
  const course = getCourseById(resolvedParams.courseId);

  if (!course) {
    notFound();
  }

  const batches = getLiveBatches(course.id);
  const instructors = getAllInstructors();
  const batchEnrollments = getBatchEnrollments();

  return (
    <LiveBatchesView
      course={course}
      initialBatches={batches}
      instructors={instructors}
      batchEnrollments={batchEnrollments}
    />
  );
}
