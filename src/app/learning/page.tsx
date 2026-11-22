import React from 'react';
import Link from 'next/link';
import { requireAuth } from '@/lib/auth/session';
import {
  getStudentLiveTraining,
  getStudentELearning,
  getEnrollmentsByStudentId,
  getDatabase,
} from '@/lib/db';
import { Container } from '@/components/ui/Container';

export default async function StudentDashboardPage() {
  const user = await requireAuth();
  const db = getDatabase();

  const liveTrainings = getStudentLiveTraining(user.id);
  const eLearningCourses = getStudentELearning(user.id);
  const allEnrollments = getEnrollmentsByStudentId(user.id);

  const announcements = db.announcements.slice(0, 3);
  const certificates = db.certificates.filter((c) => c.studentId === user.id);

  return (
    <div className="py-8 sm:py-12 bg-[#F8FAFA]">
      <Container>
        {/* Welcome Masthead */}
        <div className="bg-white rounded-3xl border border-[#E3ECEA] p-6 sm:p-8 shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 text-left">
          <div className="space-y-2">
            <span className="font-mono text-xs font-bold text-[#176B68] uppercase tracking-wider block">
              ACCREDITED TECHNOLOGY LEARNING DASHBOARD
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111817]">
              Welcome back, {user.name}!
            </h1>
            <p className="text-xs sm:text-sm text-[#586765] max-w-xl leading-relaxed">
              Track your live instructor-led cohort schedules, access virtual meeting rooms, or continue watching recorded self-paced e-learning modules.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/learning/my-courses"
              className="inline-flex items-center gap-2 py-3 px-5 rounded-xl text-xs font-bold bg-[#176B68] text-white hover:bg-[#104E4D] transition-colors shadow-sm"
            >
              <span>View All My Programs</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>

            <Link
              href="/courses"
              className="inline-flex items-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold text-[#586765] bg-[#F8FAFA] border border-[#E3ECEA] hover:bg-neutral-100 transition-colors"
            >
              Explore Live Catalog
            </Link>
          </div>
        </div>

        {/* 4 Performance Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="p-5 rounded-2xl bg-white border border-[#E3ECEA] shadow-2xs text-left">
            <span className="text-[11px] font-mono uppercase font-bold text-[#586765] block mb-1">
              Total Enrollments
            </span>
            <span className="text-3xl font-bold text-[#111817] block">
              {allEnrollments.length}
            </span>
            <span className="text-[10.5px] text-[#8A9795] mt-1 block">
              Active learning entitlements
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E3ECEA] shadow-2xs text-left">
            <span className="text-[11px] font-mono uppercase font-bold text-emerald-700 block mb-1">
              Live Cohorts
            </span>
            <span className="text-3xl font-bold text-emerald-700 block">
              {liveTrainings.length}
            </span>
            <span className="text-[10.5px] text-[#8A9795] mt-1 block">
              Instructor-led virtual tracks
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E3ECEA] shadow-2xs text-left">
            <span className="text-[11px] font-mono uppercase font-bold text-indigo-700 block mb-1">
              E-Learning Courses
            </span>
            <span className="text-3xl font-bold text-indigo-700 block">
              {eLearningCourses.length}
            </span>
            <span className="text-[10.5px] text-[#8A9795] mt-1 block">
              Recorded on-demand video tracks
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E3ECEA] shadow-2xs text-left">
            <span className="text-[11px] font-mono uppercase font-bold text-[#176B68] block mb-1">
              Certificates
            </span>
            <span className="text-3xl font-bold text-[#111817] block">
              {certificates.length}
            </span>
            <span className="text-[10.5px] text-[#8A9795] mt-1 block">
              ISO 9001:2015 credentials
            </span>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left items-start">
          {/* Left Column: My Live Training & My E-Learning (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* ============================================================== */}
            {/* AREA 1: MY LIVE TRAINING (INSTRUCTOR-LED COHORTS)             */}
            {/* ============================================================== */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#E3ECEA]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <h2 className="text-base sm:text-lg font-bold text-[#111817]">
                    My Live Training ({liveTrainings.length})
                  </h2>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Live Instructor-Led
                  </span>
                </div>

                <Link href="/courses" className="text-xs font-semibold text-[#176B68] hover:underline">
                  Browse Live Batches &rarr;
                </Link>
              </div>

              {liveTrainings.length === 0 ? (
                <div className="bg-white rounded-2xl border border-[#E3ECEA] p-7 text-center space-y-2">
                  <p className="text-xs text-[#586765]">
                    You have no active live cohort enrollments. Attend scheduled virtual classes led by senior tech architects.
                  </p>
                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B68] hover:underline pt-1"
                  >
                    <span>Explore Live Instructor-Led Batches</span>
                    <span>&rarr;</span>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {liveTrainings.map((item) => {
                    if (!item) return null;
                    const { course, batch, attendanceRate } = item;

                    return (
                      <div
                        key={course.id}
                        className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E3ECEA] hover:border-emerald-500/50 transition-all shadow-2xs space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                {course.categoryName}
                              </span>
                              <span className="text-xs text-[#8A9795]">&bull;</span>
                              <span className="text-xs text-[#586765] font-medium">{course.duration}</span>
                            </div>

                            <h3 className="text-base font-bold text-[#111817]">
                              {course.title}
                            </h3>
                            <span className="text-xs text-[#586765] block">
                              Mentor: {course.instructorName || 'Dr. Rajesh Varma'}
                            </span>
                          </div>

                          {batch?.meetingLink ? (
                            <a
                              href={batch.meetingLink}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-xs shrink-0 cursor-pointer"
                            >
                              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                              <span>Join Live Classroom</span>
                              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                              </svg>
                            </a>
                          ) : (
                            <span className="text-xs px-3 py-1.5 rounded-lg bg-neutral-100 text-neutral-600 shrink-0">
                              Meeting Link Pending
                            </span>
                          )}
                        </div>

                        {/* Batch Schedule Strip */}
                        {batch && (
                          <div className="p-3 bg-[#F8FAFA] rounded-xl border border-[#E3ECEA] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                            <div className="flex items-center gap-2 text-[#111817] font-medium">
                              <svg className="w-4 h-4 text-emerald-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                              </svg>
                              <span>
                                <strong>{batch.title}</strong>: {batch.scheduleDescription}
                              </span>
                            </div>

                            <div className="flex items-center gap-3 text-[11px] font-mono text-[#586765]">
                              <span>Cohort: {batch.batchCode}</span>
                              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                                Attendance: {attendanceRate}%
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ============================================================== */}
            {/* AREA 2: MY E-LEARNING (RECORDED SELF-PACED VIDEO COURSES)      */}
            {/* ============================================================== */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#E3ECEA]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  <h2 className="text-base sm:text-lg font-bold text-[#111817]">
                    My E-Learning ({eLearningCourses.length})
                  </h2>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200">
                    Recorded On-Demand
                  </span>
                </div>

                <Link href="/e-learning" className="text-xs font-semibold text-[#176B68] hover:underline">
                  Browse E-Learning &rarr;
                </Link>
              </div>

              {eLearningCourses.length === 0 ? (
                <div className="bg-white rounded-2xl border border-[#E3ECEA] p-7 text-center space-y-2">
                  <p className="text-xs text-[#586765]">
                    You have not purchased any recorded self-paced e-learning courses. Study at your own pace with 24/7 on-demand video modules.
                  </p>
                  <Link
                    href="/e-learning"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B68] hover:underline pt-1"
                  >
                    <span>Browse Recorded E-Learning Video Courses</span>
                    <span>&rarr;</span>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {eLearningCourses.map((item) => {
                    if (!item) return null;
                    const { course, completionPercentage, completedLessons, totalLessons } = item;

                    return (
                      <div
                        key={course.id}
                        className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E3ECEA] hover:border-indigo-500/50 transition-all shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-5 group"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                              {course.categoryName}
                            </span>
                            <span className="text-xs text-[#8A9795]">&bull;</span>
                            <span className="text-xs text-[#586765]">{totalLessons} Video Lectures</span>
                          </div>

                          <h3 className="text-base font-bold text-[#111817] group-hover:text-[#176B68] transition-colors truncate">
                            {course.title}
                          </h3>

                          {/* Video Progress Bar */}
                          <div className="mt-3.5 max-w-md">
                            <div className="flex items-center justify-between text-[11px] text-[#586765] mb-1">
                              <span>Watch Progress ({completedLessons}/{totalLessons} lessons)</span>
                              <span className="font-bold text-[#111817]">{completionPercentage}%</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-[#E3ECEA] overflow-hidden">
                              <div
                                className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                                style={{ width: `${completionPercentage}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="shrink-0 flex items-center gap-2">
                          <Link
                            href={`/learning/courses/${course.id}`}
                            className="inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl font-bold text-xs bg-[#176B68] text-white hover:bg-[#104E4D] transition-colors shadow-xs"
                          >
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                              <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                            <span>{completionPercentage > 0 ? 'Resume Video' : 'Start Watching'}</span>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Faculty Announcements & Credentials (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Announcements Card */}
            <div className="bg-white rounded-2xl border border-[#E3ECEA] p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#E3ECEA]">
                <span className="w-2 h-2 rounded-full bg-[#16B6B8] animate-pulse" />
                <h3 className="text-sm font-bold text-[#111817]">Faculty Announcements</h3>
              </div>

              {announcements.length === 0 ? (
                <p className="text-xs text-[#8A9795]">No active announcements at this time.</p>
              ) : (
                <div className="space-y-3.5">
                  {announcements.map((ann) => (
                    <div key={ann.id} className="text-xs space-y-1 pb-3 border-b border-[#E3ECEA]/60 last:border-b-0 last:pb-0">
                      <span className="font-bold text-[#111817] block leading-snug">
                        {ann.title}
                      </span>
                      <p className="text-[#586765] leading-relaxed line-clamp-3">
                        {ann.content}
                      </p>
                      <span className="text-[10px] text-[#8A9795] block pt-0.5">
                        Posted by {ann.instructorName}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Certificates Widget */}
            <div className="bg-white rounded-2xl border border-[#E3ECEA] p-6 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-[#111817]">Accredited Credentials</h3>
              <p className="text-xs text-[#586765] leading-relaxed">
                Complete your live training capstone project or 100% of your self-paced curriculum to receive your verified ISO 9001:2015 completion certificate.
              </p>
              <Link
                href="/learning/certificates"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B68] hover:underline"
              >
                <span>View Certificate Records ({certificates.length})</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
