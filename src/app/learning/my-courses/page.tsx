import React from 'react';
import Link from 'next/link';
import { requireAuth } from '@/lib/auth/session';
import { getEnrollmentsByStudentId, getDatabase } from '@/lib/db';
import { Container } from '@/components/ui/Container';
import { MyLearningTabsView, EnrolledProgramItem } from '@/components/learning/MyLearningTabsView';

export const metadata = {
  title: 'My Learning & Programs | YSM Infotech Student Portal',
  description: 'Access your enrolled live training cohorts, schedules, meeting links, and recorded self-paced e-learning tracks.',
};

export default async function MyCoursesPage() {
  const user = await requireAuth();
  const db = getDatabase();

  const enrollments = getEnrollmentsByStudentId(user.id);
  const items: EnrolledProgramItem[] = enrollments
    .map((enr) => {
      const course = db.courses.find((c) => c.id === enr.courseId);
      if (!course) return null;

      // Match live batch if applicable
      const batch =
        (db.liveBatches || []).find((b) => b.id === enr.batchId) ||
        (db.liveBatches || []).find((b) => b.courseId === course.id);

      // Calculate attendance rate for live batch
      const studentAttendance = (db.attendanceRecords || []).filter(
        (ar) => ar.batchId === batch?.id && ar.studentId === user.id
      );
      const totalSessions = studentAttendance.length;
      const presentSessions = studentAttendance.filter((ar) => ar.status === 'present').length;
      const attendanceRate = totalSessions > 0 ? Math.round((presentSessions / totalSessions) * 100) : 100;

      // Calculate lesson progress for self-paced video track
      const totalLessons = db.lessons.filter((l) => l.courseId === enr.courseId).length;
      const completedLessons = db.lessonProgress.filter(
        (lp) => lp.studentId === user.id && lp.courseId === enr.courseId && lp.isCompleted
      ).length;
      const completionPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

      return {
        enrollment: enr,
        course,
        batch,
        attendanceRate,
        totalLessons,
        completedLessons,
        completionPercentage,
      };
    })
    .filter(Boolean) as EnrolledProgramItem[];

  return (
    <div className="py-8 sm:py-12 bg-[#F8FAFA] min-h-[85vh]">
      <Container>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#E3ECEA] text-left">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#16B6B8]" />
              <span className="font-mono text-[11px] font-bold text-[#176B68] uppercase tracking-wider">
                STUDENT LEARNING VAULT
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111817]">
              My Enrolled Programs ({items.length})
            </h1>
            <p className="text-xs sm:text-sm text-[#586765] mt-1">
              Manage your active live training batches, virtual classroom links, and recorded on-demand video courses.
            </p>
          </div>

          <Link
            href="/courses"
            className="inline-flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-[#176B68] text-white hover:bg-[#104E4D] transition-colors shadow-xs"
          >
            <span>Explore More Courses</span>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Tabbed Learning View Component */}
        <MyLearningTabsView items={items} />
      </Container>
    </div>
  );
}
