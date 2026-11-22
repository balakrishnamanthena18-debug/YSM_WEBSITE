'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Course, LiveBatch, BatchEnrollment, BatchStatus } from '@/lib/db/schema';
import {
  createLiveBatchAction,
  updateLiveBatchAction,
  deleteLiveBatchAction,
  toggleBatchPublishAction,
  recordBatchAttendanceAction,
} from '@/app/actions/admin';

interface Instructor {
  id: string;
  name: string;
  title?: string;
}

interface LiveBatchesViewProps {
  course: Course;
  initialBatches: LiveBatch[];
  instructors: Instructor[];
  batchEnrollments: BatchEnrollment[];
}

export function LiveBatchesView({
  course,
  initialBatches,
  instructors,
  batchEnrollments,
}: LiveBatchesViewProps) {
  const [batches, setBatches] = useState<LiveBatch[]>(initialBatches);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingBatch, setEditingBatch] = useState<LiveBatch | null>(null);
  const [attendanceModalBatch, setAttendanceModalBatch] = useState<LiveBatch | null>(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formCode, setFormCode] = useState('');
  const [formStartDate, setFormStartDate] = useState('');
  const [formEndDate, setFormEndDate] = useState('');
  const [formSchedule, setFormSchedule] = useState('');
  const [formPlatform, setFormPlatform] = useState<'zoom' | 'google_meet' | 'microsoft_teams' | 'custom'>('google_meet');
  const [formMeetingLink, setFormMeetingLink] = useState('');
  const [formMeetingId, setFormMeetingId] = useState('');
  const [formPasscode, setFormPasscode] = useState('');
  const [formInstructorId, setFormInstructorId] = useState(course.instructorId || instructors[0]?.id || '');
  const [formCapacity, setFormCapacity] = useState('30');
  const [formStatus, setFormStatus] = useState<BatchStatus>('upcoming');
  const [formPublished, setFormPublished] = useState(true);
  const [formNotes, setFormNotes] = useState('');

  // Attendance states
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceTopic, setAttendanceTopic] = useState('Live Lecture & Lab Walkthrough');
  const [studentStatusMap, setStudentStatusMap] = useState<Record<string, 'present' | 'absent' | 'excused'>>({});

  const openCreateModal = () => {
    const nextMonth = new Date(Date.now() + 10 * 86400000);
    const endMonth = new Date(Date.now() + 45 * 86400000);

    setFormTitle('New Executive Cohort');
    setFormCode(`BAT-${course.slug.slice(0, 4).toUpperCase()}-${Date.now().toString().slice(-4)}`);
    setFormStartDate(nextMonth.toISOString().split('T')[0]);
    setFormEndDate(endMonth.toISOString().split('T')[0]);
    setFormSchedule('Mon - Fri • 07:00 AM - 08:30 AM IST');
    setFormPlatform('google_meet');
    setFormMeetingLink('https://meet.google.com/ysm-tech-live');
    setFormMeetingId('');
    setFormPasscode('');
    setFormInstructorId(course.instructorId || instructors[0]?.id || '');
    setFormCapacity('30');
    setFormStatus('upcoming');
    setFormPublished(true);
    setFormNotes('Interactive virtual classes with hands-on lab assignments and 1-on-1 mentorship.');
    setEditingBatch(null);
    setIsCreateModalOpen(true);
  };

  const openEditModal = (batch: LiveBatch) => {
    setEditingBatch(batch);
    setFormTitle(batch.title);
    setFormCode(batch.batchCode);
    setFormStartDate(batch.startDate);
    setFormEndDate(batch.endDate);
    setFormSchedule(batch.scheduleDescription);
    setFormPlatform(batch.meetingPlatform);
    setFormMeetingLink(batch.meetingLink || '');
    setFormMeetingId(batch.meetingId || '');
    setFormPasscode(batch.meetingPasscode || '');
    setFormInstructorId(batch.instructorId);
    setFormCapacity(String(batch.maxCapacity));
    setFormStatus(batch.status);
    setFormPublished(batch.isPublished);
    setFormNotes(batch.notes || '');
    setIsCreateModalOpen(true);
  };

  const handleSaveBatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    try {
      if (editingBatch) {
        const res = await updateLiveBatchAction(editingBatch.id, {
          title: formTitle,
          batchCode: formCode,
          startDate: formStartDate,
          endDate: formEndDate,
          scheduleDescription: formSchedule,
          meetingPlatform: formPlatform,
          meetingLink: formMeetingLink || undefined,
          meetingId: formMeetingId || undefined,
          meetingPasscode: formPasscode || undefined,
          instructorId: formInstructorId,
          instructorName: instructors.find((i) => i.id === formInstructorId)?.name || 'Faculty',
          maxCapacity: Number(formCapacity) || 30,
          status: formStatus,
          isPublished: formPublished,
          notes: formNotes || undefined,
        });

        if (res.success && res.batch) {
          setBatches((prev) => prev.map((b) => (b.id === res.batch!.id ? res.batch! : b)));
          setIsCreateModalOpen(false);
          setFeedback({ type: 'success', text: `Batch "${res.batch.title}" updated successfully.` });
        } else {
          setFeedback({ type: 'error', text: res.error || 'Failed to update batch.' });
        }
      } else {
        const res = await createLiveBatchAction(course.id, {
          title: formTitle,
          batchCode: formCode,
          startDate: formStartDate,
          endDate: formEndDate,
          scheduleDescription: formSchedule,
          meetingPlatform: formPlatform,
          meetingLink: formMeetingLink || undefined,
          meetingId: formMeetingId || undefined,
          meetingPasscode: formPasscode || undefined,
          instructorId: formInstructorId,
          maxCapacity: Number(formCapacity) || 30,
          status: formStatus,
          isPublished: formPublished,
          notes: formNotes || undefined,
        });

        if (res.success && res.batch) {
          setBatches((prev) => [res.batch!, ...prev]);
          setIsCreateModalOpen(false);
          setFeedback({ type: 'success', text: `New cohort batch "${res.batch.title}" created successfully.` });
        } else {
          setFeedback({ type: 'error', text: res.error || 'Failed to create batch.' });
        }
      }
    } catch (err) {
      console.error(err);
      setFeedback({ type: 'error', text: 'An unexpected server error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBatch = async (batchId: string) => {
    if (!confirm('Are you sure you want to delete this cohort batch?')) return;
    setLoading(true);
    setFeedback(null);
    try {
      const res = await deleteLiveBatchAction(batchId, true);
      if (res.success) {
        setBatches((prev) => prev.filter((b) => b.id !== batchId));
        setFeedback({ type: 'success', text: 'Cohort batch permanently removed.' });
      } else {
        setFeedback({ type: 'error', text: res.error || 'Failed to delete batch.' });
      }
    } catch (err) {
      console.error(err);
      setFeedback({ type: 'error', text: 'Failed to delete batch.' });
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (batchId: string) => {
    try {
      const res = await toggleBatchPublishAction(batchId);
      if (res.success) {
        setBatches((prev) =>
          prev.map((b) => (b.id === batchId ? { ...b, isPublished: res.isPublished! } : b))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openAttendanceModal = (batch: LiveBatch) => {
    setAttendanceModalBatch(batch);
    const enrolledStudents = batchEnrollments.filter((be) => be.batchId === batch.id);
    const initStatus: Record<string, 'present' | 'absent' | 'excused'> = {};
    enrolledStudents.forEach((st) => {
      initStatus[st.studentId] = 'present';
    });
    // Fallback if no specific students yet, seed a placeholder
    if (enrolledStudents.length === 0) {
      initStatus['student_001'] = 'present';
    }
    setStudentStatusMap(initStatus);
  };

  const handleSaveAttendance = async () => {
    if (!attendanceModalBatch) return;
    setLoading(true);
    try {
      const records = Object.entries(studentStatusMap).map(([studentId, status]) => ({
        studentId,
        sessionDate: attendanceDate,
        sessionTopic: attendanceTopic,
        status,
      }));

      const res = await recordBatchAttendanceAction(attendanceModalBatch.id, records);
      if (res.success && 'count' in res) {
        setFeedback({ type: 'success', text: `Attendance recorded for ${res.count} student(s).` });
        setAttendanceModalBatch(null);
      } else {
        setFeedback({ type: 'error', text: 'Failed to save attendance.' });
      }
    } catch (err) {
      console.error(err);
      setFeedback({ type: 'error', text: 'Error recording attendance.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
      {feedback && (
        <div
          className={`p-4 rounded-xl text-xs font-semibold flex items-center justify-between shadow-xs ${
            feedback.type === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border border-rose-200 text-rose-800'
          }`}
        >
          <span>{feedback.text}</span>
          <button type="button" onClick={() => setFeedback(null)} className="text-xs p-1 font-bold">
            ✕
          </button>
        </div>
      )}

      {/* Top Header & Breadcrumb */}
      <div className="bg-white rounded-2xl border border-[#E3ECEA] p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Link href="/admin/courses" className="text-xs font-semibold text-[#176B68] hover:underline">
                Courses
              </Link>
              <span className="text-xs text-[#8A9795]">&rsaquo;</span>
              <span className="text-xs text-[#586765] font-medium">{course.title}</span>
              <span className="text-xs text-[#8A9795]">&rsaquo;</span>
              <span className="text-xs text-[#111817] font-bold">Live Cohorts &amp; Batches</span>
            </div>

            <div className="flex items-center gap-3">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111817]">
                Live Cohort Batches &amp; Class Schedules
              </h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Instructor-Led</span>
              </span>
            </div>

            <p className="text-xs text-[#586765] mt-1 max-w-2xl leading-relaxed">
              Create and manage interactive instructor-led cohort batches for <strong>{course.title}</strong>. Configure start dates, schedules, Google Meet / Zoom links, and student attendance.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#176B68] text-white hover:bg-[#104E4D] transition-colors shadow-xs cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              <span>Create New Batch</span>
            </button>

            <Link
              href={`/admin/courses/${course.id}/edit`}
              className="inline-flex items-center px-4 py-2.5 rounded-xl text-xs font-semibold text-[#586765] bg-[#F8FAFA] border border-[#E3ECEA] hover:bg-neutral-100 transition-colors"
            >
              Edit Course
            </Link>
          </div>
        </div>

        {/* Quick Batch Statistics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-[#E3ECEA] text-left">
          <div className="p-3 bg-[#F8FAFA] rounded-xl border border-[#E3ECEA]">
            <span className="text-[10px] font-mono uppercase text-[#8A9795] block">Total Batches</span>
            <span className="text-lg font-bold text-[#111817]">{batches.length}</span>
          </div>

          <div className="p-3 bg-[#F8FAFA] rounded-xl border border-[#E3ECEA]">
            <span className="text-[10px] font-mono uppercase text-[#8A9795] block">Upcoming / Ongoing</span>
            <span className="text-lg font-bold text-emerald-700">
              {batches.filter((b) => b.status === 'upcoming' || b.status === 'ongoing').length}
            </span>
          </div>

          <div className="p-3 bg-[#F8FAFA] rounded-xl border border-[#E3ECEA]">
            <span className="text-[10px] font-mono uppercase text-[#8A9795] block">Enrolled Students</span>
            <span className="text-lg font-bold text-[#176B68]">
              {batches.reduce((acc, b) => acc + (b.enrolledCount || 0), 0)}
            </span>
          </div>

          <div className="p-3 bg-[#F8FAFA] rounded-xl border border-[#E3ECEA]">
            <span className="text-[10px] font-mono uppercase text-[#8A9795] block">Assigned Lead Trainer</span>
            <span className="text-xs font-bold text-[#111817] truncate block mt-1">
              {course.instructorName || 'Dr. Rajesh Varma'}
            </span>
          </div>
        </div>
      </div>

      {/* Batches List Container */}
      <div className="space-y-4">
        {batches.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E3ECEA] p-12 text-center text-xs text-[#586765]">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#176B68] flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-[#111817] mb-1">No cohort batches created yet</h3>
            <p className="max-w-md mx-auto mb-5 text-[#8A9795]">
              Live instructor-led courses require scheduled cohort batches with meeting links so enrolling students know their exact class timings.
            </p>
            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#176B68] text-white hover:bg-[#104E4D]"
            >
              + Create First Cohort Batch
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {batches.map((batch) => {
              const enrolledPct = Math.min(100, Math.round(((batch.enrolledCount || 0) / Math.max(batch.maxCapacity, 1)) * 100));

              return (
                <div
                  key={batch.id}
                  className="bg-white rounded-2xl border border-[#E3ECEA] p-5 shadow-xs hover:border-[#16B6B8]/40 transition-all text-left flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    {/* Top status & code badge */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10.5px] font-bold text-[#176B68] bg-[#EBF7F5] px-2 py-0.5 rounded">
                          {batch.batchCode}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                            batch.status === 'ongoing'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : batch.status === 'upcoming'
                              ? 'bg-sky-50 text-sky-700 border border-sky-200'
                              : 'bg-neutral-100 text-neutral-600 border border-neutral-200'
                          }`}
                        >
                          {batch.status}
                        </span>
                      </div>

                      {/* Published Toggle */}
                      <button
                        type="button"
                        onClick={() => handleTogglePublish(batch.id)}
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border transition-colors cursor-pointer ${
                          batch.isPublished
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-neutral-100 text-neutral-500 border-neutral-300'
                        }`}
                        title="Toggle visibility in student enrollment catalog"
                      >
                        {batch.isPublished ? '● Published' : '○ Draft'}
                      </button>
                    </div>

                    {/* Batch Title */}
                    <div>
                      <h3 className="text-base font-bold text-[#111817]">{batch.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-[#586765] mt-1 font-medium">
                        <svg className="w-3.5 h-3.5 text-[#176B68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span>{batch.scheduleDescription}</span>
                      </div>
                    </div>

                    {/* Date Span */}
                    <div className="text-xs text-[#586765] flex items-center gap-2 font-mono bg-[#F8FAFA] p-2.5 rounded-xl border border-[#E3ECEA]">
                      <svg className="w-3.5 h-3.5 text-[#8A9795]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <span>
                        {batch.startDate} &rarr; {batch.endDate}
                      </span>
                    </div>

                    {/* Meeting Link Section */}
                    {batch.meetingLink && (
                      <div className="text-xs p-2.5 rounded-xl bg-[#F0FDF4] border border-[#C8E6D9] text-[#111817] flex items-center justify-between gap-2">
                        <div className="min-w-0 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                          <span className="truncate text-[11px] font-mono">{batch.meetingLink}</span>
                        </div>
                        <a
                          href={batch.meetingLink}
                          target="_blank"
                          rel="noreferrer"
                          className="shrink-0 text-[10.5px] font-bold text-[#176B68] hover:underline"
                        >
                          Join &rarr;
                        </a>
                      </div>
                    )}

                    {/* Capacity Indicator */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-[#586765]">Enrollment Capacity</span>
                        <span className="font-bold text-[#111817]">
                          {batch.enrolledCount || 0} / {batch.maxCapacity} ({batch.maxCapacity - (batch.enrolledCount || 0)} seats left)
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-[#E3ECEA] overflow-hidden">
                        <div
                          className="h-full bg-[#176B68] rounded-full transition-all"
                          style={{ width: `${enrolledPct}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-3 border-t border-[#E3ECEA] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => openEditModal(batch)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#176B68] bg-[#EBF7F5] hover:bg-[#D7EFEA] transition-colors cursor-pointer"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => openAttendanceModal(batch)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#586765] hover:bg-neutral-100 border border-[#E3ECEA] transition-colors cursor-pointer"
                      >
                        Attendance
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteBatch(batch.id)}
                      className="text-xs font-semibold text-rose-600 hover:text-rose-800 p-1.5 cursor-pointer"
                      title="Delete cohort batch"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Create / Edit Batch Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E3ECEA] max-h-[90vh] overflow-y-auto text-left space-y-5">
            <div className="flex items-center justify-between border-b border-[#E3ECEA] pb-4">
              <h2 className="text-lg font-bold text-[#111817]">
                {editingBatch ? 'Edit Cohort Batch' : 'Create New Cohort Batch'}
              </h2>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="text-[#8A9795] hover:text-[#111817] text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveBatch} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-[#111817] block mb-1">Batch Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Morning Executive Cohort A"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#111817] block mb-1">Batch Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. BAT-SQL-2026-M1"
                    value={formCode}
                    onChange={(e) => setFormCode(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68] font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#111817] block mb-1">Assigned Trainer *</label>
                  <select
                    value={formInstructorId}
                    onChange={(e) => setFormInstructorId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68]"
                  >
                    {instructors.map((inst) => (
                      <option key={inst.id} value={inst.id}>
                        {inst.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#111817] block mb-1">Start Date *</label>
                  <input
                    type="date"
                    required
                    value={formStartDate}
                    onChange={(e) => setFormStartDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#111817] block mb-1">End Date *</label>
                  <input
                    type="date"
                    required
                    value={formEndDate}
                    onChange={(e) => setFormEndDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#111817] block mb-1">Class Schedule &amp; Timings *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mon - Fri • 07:00 AM - 08:30 AM IST"
                  value={formSchedule}
                  onChange={(e) => setFormSchedule(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#111817] block mb-1">Meeting Platform</label>
                  <select
                    value={formPlatform}
                    onChange={(e) => setFormPlatform(e.target.value as typeof formPlatform)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68]"
                  >
                    <option value="google_meet">Google Meet</option>
                    <option value="zoom">Zoom Video</option>
                    <option value="microsoft_teams">Microsoft Teams</option>
                    <option value="custom">Custom Web Link</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#111817] block mb-1">Max Capacity (Students)</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={formCapacity}
                    onChange={(e) => setFormCapacity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#111817] block mb-1">Live Meeting Join URL</label>
                <input
                  type="url"
                  placeholder="https://meet.google.com/xxx-xxxx-xxx or Zoom link"
                  value={formMeetingLink}
                  onChange={(e) => setFormMeetingLink(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68] font-mono text-[11px]"
                />
                <span className="text-[10px] text-[#8A9795] block mt-1">
                  Protected: Accessible only by enrolled students and authorized faculty.
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#111817] block mb-1">Cohort Status</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as BatchStatus)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68]"
                  >
                    <option value="upcoming">Upcoming Cohort</option>
                    <option value="ongoing">Active / Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="publishedBatch"
                    checked={formPublished}
                    onChange={(e) => setFormPublished(e.target.checked)}
                    className="w-4 h-4 text-[#176B68] rounded border-[#E3ECEA]"
                  />
                  <label htmlFor="publishedBatch" className="font-semibold text-[#111817]">
                    Published in Catalog
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E3ECEA] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#586765] hover:bg-neutral-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#176B68] text-white hover:bg-[#104E4D] transition-colors disabled:opacity-50"
                >
                  {loading ? 'Saving...' : editingBatch ? 'Save Changes' : 'Create Batch'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Attendance Management Modal */}
      {attendanceModalBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-[#E3ECEA] text-left space-y-4">
            <div className="flex items-center justify-between border-b border-[#E3ECEA] pb-3">
              <div>
                <h2 className="text-base font-bold text-[#111817]">Record Live Attendance</h2>
                <span className="text-[11px] text-[#8A9795] font-mono">{attendanceModalBatch.title}</span>
              </div>
              <button
                type="button"
                onClick={() => setAttendanceModalBatch(null)}
                className="text-[#8A9795] hover:text-[#111817] font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#111817] block mb-1">Session Date</label>
                <input
                  type="date"
                  value={attendanceDate}
                  onChange={(e) => setAttendanceDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E3ECEA]"
                />
              </div>

              <div>
                <label className="font-bold text-[#111817] block mb-1">Topic / Lab Exercise</label>
                <input
                  type="text"
                  value={attendanceTopic}
                  onChange={(e) => setAttendanceTopic(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E3ECEA]"
                />
              </div>

              <div className="pt-2">
                <span className="font-bold text-[#111817] block mb-2">Student Attendance Status</span>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {Object.keys(studentStatusMap).map((stId) => (
                    <div
                      key={stId}
                      className="p-2.5 rounded-xl bg-[#F8FAFA] border border-[#E3ECEA] flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-[#111817] block">Student {stId.replace('student_', '#')}</span>
                        <span className="text-[10px] text-[#8A9795] font-mono">Enrolled Candidate</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {(['present', 'absent', 'excused'] as const).map((st) => (
                          <button
                            key={st}
                            type="button"
                            onClick={() => setStudentStatusMap((prev) => ({ ...prev, [stId]: st }))}
                            className={`px-2 py-1 rounded text-[10px] font-bold capitalize transition-colors ${
                              studentStatusMap[stId] === st
                                ? st === 'present'
                                  ? 'bg-emerald-600 text-white'
                                  : st === 'absent'
                                  ? 'bg-rose-600 text-white'
                                  : 'bg-amber-600 text-white'
                                : 'bg-white text-[#586765] border border-[#E3ECEA]'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E3ECEA] flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setAttendanceModalBatch(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#586765]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveAttendance}
                disabled={loading}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#176B68] text-white hover:bg-[#104E4D]"
              >
                {loading ? 'Recording...' : 'Save Attendance'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
