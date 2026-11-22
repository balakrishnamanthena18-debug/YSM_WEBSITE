'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Course, Enrollment, LiveBatch } from '@/lib/db/schema';

export interface EnrolledProgramItem {
  enrollment: Enrollment;
  course: Course;
  batch?: LiveBatch;
  attendanceRate?: number;
  totalLessons?: number;
  completedLessons?: number;
  completionPercentage?: number;
}

interface MyLearningTabsViewProps {
  items: EnrolledProgramItem[];
}

export function MyLearningTabsView({ items }: MyLearningTabsViewProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'live' | 'recorded'>('all');

  const liveItems = items.filter((i) => i.course.deliveryType === 'LIVE_INSTRUCTOR_LED');
  const recordedItems = items.filter((i) => i.course.deliveryType === 'RECORDED_SELF_PACED');

  const displayedItems =
    activeTab === 'live'
      ? liveItems
      : activeTab === 'recorded'
      ? recordedItems
      : items;

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[#E3ECEA]">
        <div className="inline-flex p-1 rounded-xl bg-white border border-[#E3ECEA] text-xs font-semibold shadow-2xs">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#176B68] text-white shadow-xs font-bold'
                : 'text-[#586765] hover:text-[#111817]'
            }`}
          >
            All Programs ({items.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('live')}
            className={`px-4 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'live'
                ? 'bg-emerald-700 text-white shadow-xs font-bold'
                : 'text-[#586765] hover:text-emerald-700'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>My Live Training ({liveItems.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('recorded')}
            className={`px-4 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'recorded'
                ? 'bg-indigo-700 text-white shadow-xs font-bold'
                : 'text-[#586765] hover:text-indigo-700'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <span>My E-Learning ({recordedItems.length})</span>
          </button>
        </div>

        <div className="text-xs text-[#8A9795] font-mono hidden sm:block">
          Showing <strong>{displayedItems.length}</strong> enrolled program{displayedItems.length === 1 ? '' : 's'}
        </div>
      </div>

      {/* Grid of Enrolled Programs */}
      {displayedItems.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#E3ECEA] p-12 text-center max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-[#E8F5F3] text-[#176B68] flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-[#111817] mb-1">
            {activeTab === 'live'
              ? 'No live instructor-led cohorts enrolled'
              : activeTab === 'recorded'
              ? 'No self-paced e-learning courses enrolled'
              : 'No enrolled programs yet'}
          </h3>
          <p className="text-xs text-[#586765] mb-5">
            {activeTab === 'live'
              ? 'Browse our live training catalog to join upcoming cohorts in AI, Data Science, and Cloud Architecture.'
              : 'Browse our on-demand e-learning catalog to study recorded video courses at your own schedule.'}
          </p>
          <Link
            href={activeTab === 'recorded' ? '/e-learning' : '/courses'}
            className="inline-flex items-center justify-center py-2.5 px-6 rounded-xl font-bold text-xs bg-[#176B68] text-white hover:bg-[#104E4D]"
          >
            {activeTab === 'recorded' ? 'Browse E-Learning Courses' : 'Browse Live Training Batches'}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left items-stretch">
          {displayedItems.map(({ course, batch, attendanceRate, totalLessons, completedLessons, completionPercentage }) => {
            const isLive = course.deliveryType === 'LIVE_INSTRUCTOR_LED';

            return (
              <div
                key={course.id}
                className={`rounded-3xl bg-white border p-6 shadow-xs transition-all flex flex-col justify-between space-y-4 ${
                  isLive
                    ? 'border-emerald-200/80 hover:border-emerald-500'
                    : 'border-indigo-200/80 hover:border-indigo-500'
                }`}
              >
                <div className="space-y-3">
                  {/* Model & Category Header */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#176B68] bg-[#EBF7F5] px-2 py-0.5 rounded">
                      {course.categoryName}
                    </span>

                    {isLive ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Live Cohort</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        <span>Self-Paced</span>
                      </span>
                    )}
                  </div>

                  {/* Title & Mentor */}
                  <div>
                    <h3 className="text-base font-bold text-[#111817] leading-snug line-clamp-2">
                      {course.title}
                    </h3>
                    <span className="text-xs text-[#586765] mt-1 block">
                      Lead Faculty: {course.instructorName || 'Dr. Rajesh Varma'}
                    </span>
                  </div>

                  {/* Model Specific Content */}
                  {isLive ? (
                    <div className="p-3 bg-[#F8FAFA] rounded-2xl border border-[#E3ECEA] space-y-2 text-xs">
                      {batch ? (
                        <>
                          <div className="flex items-center justify-between text-[11px] font-mono">
                            <span className="font-bold text-[#111817]">{batch.title}</span>
                            <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded">
                              {attendanceRate ?? 100}% Attended
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 text-[11.5px] text-[#586765]">
                            <svg className="w-3.5 h-3.5 text-emerald-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10" />
                              <polyline points="12 6 12 12 16 14" />
                            </svg>
                            <span className="line-clamp-1">{batch.scheduleDescription}</span>
                          </div>

                          <div className="text-[10.5px] font-mono text-[#8A9795]">
                            Dates: {batch.startDate} &rarr; {batch.endDate}
                          </div>
                        </>
                      ) : (
                        <div className="text-[11px] text-[#8A9795]">
                          Cohort assignment pending faculty verification.
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-3 bg-[#F8FAFA] rounded-2xl border border-[#E3ECEA] space-y-2 text-xs">
                      <div className="flex items-center justify-between text-[11px] text-[#586765]">
                        <span>Lesson Progress</span>
                        <span className="font-bold text-[#111817]">
                          {completedLessons || 0} / {totalLessons || 0} ({completionPercentage || 0}%)
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-[#E3ECEA] overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                          style={{ width: `${completionPercentage || 0}%` }}
                        />
                      </div>
                      <div className="text-[10.5px] font-mono text-[#8A9795]">
                        Access: Lifetime On-Demand
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Action Button */}
                <div className="pt-2">
                  {isLive ? (
                    batch?.meetingLink ? (
                      <a
                        href={batch.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-xs"
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
                      <span className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl font-semibold text-xs bg-neutral-100 text-neutral-500">
                        Class Link Pending
                      </span>
                    )
                  ) : (
                    <Link
                      href={`/learning/courses/${course.id}`}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs bg-[#176B68] text-white hover:bg-[#104E4D] transition-colors shadow-xs"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      <span>
                        {(completionPercentage || 0) > 0 ? 'Resume Video' : 'Start Course'}
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
