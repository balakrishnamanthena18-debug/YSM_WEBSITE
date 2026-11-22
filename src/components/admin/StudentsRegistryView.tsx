'use client';

import React, { useState } from 'react';
import { User, Enrollment, Course } from '@/lib/db/schema';
import { manualEnrollStudentAction, revokeStudentEnrollmentAction } from '@/app/actions/admin';

interface StudentsRegistryViewProps {
  users: User[];
  enrollments: Enrollment[];
  courses: Course[];
}

export function StudentsRegistryView({
  users,
  enrollments: initialEnrollments,
  courses,
}: StudentsRegistryViewProps) {
  const [enrollments, setEnrollments] = useState(initialEnrollments);
  const [modalOpen, setModalOpen] = useState(false);
  const [studentEmail, setStudentEmail] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || '');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [revokingId, setRevokingId] = useState<string | null>(null);

  const handleManualEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentEmail.trim() || !selectedCourseId) return;

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await manualEnrollStudentAction(studentEmail.trim(), selectedCourseId);
      if (res.success) {
        setSuccessMsg(`Successfully granted enrollment to ${studentEmail}`);
        // Optimistically update local view
        const targetStudent = users.find(
          (u) => u.email.toLowerCase() === studentEmail.trim().toLowerCase()
        );
        if (targetStudent) {
          const newEnrollment: Enrollment = {
            id: `enr_${Date.now()}`,
            studentId: targetStudent.id,
            courseId: selectedCourseId,
            enrolledAt: new Date().toISOString(),
            status: 'active',
            source: 'manual_admin',
            completionPercentage: 0,
          };
          setEnrollments((prev) => [...prev, newEnrollment]);
        }
        setTimeout(() => {
          setModalOpen(false);
          setSuccessMsg('');
          setStudentEmail('');
        }, 1200);
      } else {
        setErrorMsg(res.error || 'Failed to enroll student.');
      }
    } catch {
      setErrorMsg('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleRevoke = async (studentId: string, courseId: string, enrollmentId: string) => {
    if (!confirm('Are you sure you want to revoke this student\'s access?')) return;
    setRevokingId(enrollmentId);
    try {
      const res = await revokeStudentEnrollmentAction(studentId, courseId);
      if (res.success) {
        setEnrollments((prev) =>
          prev.map((e) => (e.id === enrollmentId ? { ...e, status: 'suspended' as const } : e))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setRevokingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E3ECEA]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#16B6B8]" />
            <span className="font-mono text-[11px] font-bold text-[#176B68] uppercase tracking-wider">
              ACCESS &amp; ENTITLEMENTS
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111817]">
            Student Registry &amp; Access Control
          </h1>
          <p className="text-xs text-[#586765] mt-1">
            Audit registered learners, monitor active entitlements, and manually grant or revoke course access.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setModalOpen(true);
            setErrorMsg('');
            setSuccessMsg('');
          }}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-[#176B68] text-white hover:bg-[#104E4D] transition-colors shadow-xs cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Grant Manual Enrollment</span>
        </button>
      </div>

      {/* Students & Enrollments Table */}
      <div className="overflow-x-auto bg-white rounded-2xl border border-[#E3ECEA] shadow-xs">
        <table className="w-full text-xs text-left">
          <thead className="bg-[#F8FAFA] text-[#586765] font-mono uppercase text-[10.5px] border-b border-[#E3ECEA]">
            <tr>
              <th className="py-3 px-4">Student Name &amp; Email</th>
              <th className="py-3 px-4">Enrolled Course</th>
              <th className="py-3 px-4">Enrollment Source</th>
              <th className="py-3 px-4">Enrolled Date</th>
              <th className="py-3 px-4">Progress</th>
              <th className="py-3 px-4">Access Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E3ECEA]">
            {enrollments.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-xs text-[#586765]">
                  No course enrollments found. Use &ldquo;Grant Manual Enrollment&rdquo; to add access.
                </td>
              </tr>
            ) : (
              enrollments.map((enr) => {
                const student = users.find((u) => u.id === enr.studentId);
                const course = courses.find((c) => c.id === enr.courseId);

                return (
                  <tr key={enr.id} className="hover:bg-[#F8FAFA] transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-bold text-[#111817]">
                        {student?.name || 'Unknown Student'}
                      </div>
                      <div className="text-[11px] font-mono text-[#586765]">
                        {student?.email || enr.studentId}
                      </div>
                    </td>

                    <td className="py-4 px-4 font-semibold text-[#111817]">
                      {course?.title || enr.courseId}
                    </td>

                    <td className="py-4 px-4">
                      <span className="font-mono text-[10.5px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold uppercase">
                        {enr.source.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="py-4 px-4 font-mono text-[11px] text-[#586765]">
                      {new Date(enr.enrolledAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-gray-200 overflow-hidden">
                          <div
                            className="h-full bg-[#16B6B8] rounded-full"
                            style={{ width: `${enr.completionPercentage}%` }}
                          />
                        </div>
                        <span className="font-mono text-[11px] font-bold text-[#111817]">
                          {enr.completionPercentage}%
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      {enr.status === 'active' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          ACTIVE
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                          SUSPENDED
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-4 text-right">
                      {enr.status === 'active' && (
                        <button
                          type="button"
                          disabled={revokingId === enr.id}
                          onClick={() => handleRevoke(enr.studentId, enr.courseId, enr.id)}
                          className="text-xs font-semibold text-rose-600 hover:text-rose-800 disabled:opacity-50 cursor-pointer"
                        >
                          {revokingId === enr.id ? 'Revoking...' : 'Revoke Access'}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Manual Enrollment Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E3ECEA]">
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#E3ECEA]">
              <div>
                <h3 className="font-bold text-base text-[#111817]">
                  Grant Manual Course Enrollment
                </h3>
                <span className="text-xs text-[#586765]">Admin-authorized complimentary access</span>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-[#586765] hover:text-[#111817] p-1"
              >
                ✕
              </button>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700">
                {successMsg}
              </div>
            )}

            <form onSubmit={handleManualEnroll} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#111817] mb-1">
                  Registered Student Email *
                </label>
                <input
                  type="email"
                  placeholder="student@ysminfotech.com"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68]"
                  required
                />
                <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[#586765]">
                  <span>Available sample:</span>
                  <button
                    type="button"
                    onClick={() => setStudentEmail('student@ysminfotech.com')}
                    className="font-mono text-[#176B68] hover:underline"
                  >
                    student@ysminfotech.com
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111817] mb-1">
                  Select Target Course *
                </label>
                <select
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68] bg-white"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} (₹{c.discountPrice.toLocaleString('en-IN')})
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-3 bg-[#F8FAFA] rounded-xl border border-[#E3ECEA] text-[11px] text-[#586765]">
                Manual enrollments are recorded with source <code className="font-bold">manual_admin</code> and audited in the LMS governance ledger.
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E3ECEA]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#586765] hover:bg-[#F8FAFA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !studentEmail.trim()}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#176B68] text-white hover:bg-[#104E4D] transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {loading ? 'Authorizing...' : 'Grant Access'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
