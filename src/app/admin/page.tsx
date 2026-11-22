import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { requireRole } from '@/lib/auth/session';
import { getAdminDashboardStats, getDatabase } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Admin Operations Dashboard | YSM Infotech LMS',
  description: 'Enterprise administration, student management, and course commerce oversight.',
};

export default async function AdminDashboardPage() {
  await requireRole(['admin', 'instructor']);
  const stats = getAdminDashboardStats();
  const db = getDatabase();

  return (
    <div className="p-6 sm:p-10 text-left space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E3ECEA]">
        <div>
          <span className="font-mono text-xs font-bold text-[#176B68] uppercase tracking-wider block mb-1">
            EXECUTIVE CONTROL CENTER
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111817]">
            LMS Platform &amp; Commerce Operations
          </h1>
          <p className="text-xs sm:text-sm text-[#586765] mt-1">
            Real-time verified metrics from persistent database operations.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/courses"
            className="py-2.5 px-4 rounded-xl text-xs font-bold bg-[#176B68] text-white hover:bg-[#104E4D] transition-colors shadow-xs"
          >
            Manage Courses &amp; Builder
          </Link>
          <Link
            href="/admin/students"
            className="py-2.5 px-4 rounded-xl text-xs font-bold bg-white border border-[#E3ECEA] text-[#586765] hover:bg-neutral-50 transition-colors"
          >
            Manual Enrollment
          </Link>
        </div>
      </div>

      {/* 6 Core Operational Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#E3ECEA] shadow-2xs">
          <span className="text-[10.5px] font-mono uppercase font-bold text-[#586765] block mb-1">
            Total Students
          </span>
          <span className="text-2xl font-bold text-[#111817] block">{stats.totalStudents}</span>
          <span className="text-[10px] text-[#8A9795] mt-1 block">Registered profiles</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E3ECEA] shadow-2xs">
          <span className="text-[10.5px] font-mono uppercase font-bold text-[#176B68] block mb-1">
            Active Catalog
          </span>
          <span className="text-2xl font-bold text-[#176B68] block">{stats.totalPublishedCourses}</span>
          <span className="text-[10px] text-[#8A9795] mt-1 block">Published specializations</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E3ECEA] shadow-2xs">
          <span className="text-[10.5px] font-mono uppercase font-bold text-amber-600 block mb-1">
            Draft Courses
          </span>
          <span className="text-2xl font-bold text-amber-600 block">{stats.totalDraftCourses}</span>
          <span className="text-[10px] text-[#8A9795] mt-1 block">Unpublished in review</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E3ECEA] shadow-2xs">
          <span className="text-[10.5px] font-mono uppercase font-bold text-emerald-600 block mb-1">
            Enrollments
          </span>
          <span className="text-2xl font-bold text-emerald-600 block">{stats.totalEnrollments}</span>
          <span className="text-[10px] text-[#8A9795] mt-1 block">Active course seats</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E3ECEA] shadow-2xs">
          <span className="text-[10.5px] font-mono uppercase font-bold text-purple-600 block mb-1">
            Total Orders
          </span>
          <span className="text-2xl font-bold text-purple-600 block">{stats.totalOrders}</span>
          <span className="text-[10px] text-[#8A9795] mt-1 block">
            {stats.completedOrdersCount} captured
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E3ECEA] shadow-2xs">
          <span className="text-[10.5px] font-mono uppercase font-bold text-[#16B6B8] block mb-1">
            Gross Revenue
          </span>
          <span className="text-xl font-bold text-[#111817] block">
            ₹{stats.totalRevenue.toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] text-emerald-600 font-bold mt-1 block">
            Verified Payments
          </span>
        </div>
      </div>

      {/* 2-Column Split: Recent Orders Table & Recent Enrollments */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols): Recent Orders */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E3ECEA] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E3ECEA]">
            <h2 className="text-base font-bold text-[#111817]">Recent Course Orders</h2>
            <Link href="/admin/orders" className="text-xs font-bold text-[#176B68] hover:underline">
              View All Orders &rarr;
            </Link>
          </div>

          {stats.recentOrders.length === 0 ? (
            <p className="text-xs text-[#8A9795] py-4 text-center">No orders recorded yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#F8FAFA] text-[#586765] font-mono uppercase text-[10px]">
                  <tr>
                    <th className="py-2.5 px-3 rounded-l-lg">Order Ref</th>
                    <th className="py-2.5 px-3">Student</th>
                    <th className="py-2.5 px-3">Amount</th>
                    <th className="py-2.5 px-3 rounded-r-lg">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E3ECEA]/60">
                  {stats.recentOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#F8FAFA] transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-[#176B68]">
                        {ord.orderNumber}
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-bold text-[#111817] block leading-tight">{ord.studentName}</span>
                        <span className="text-[10px] text-[#8A9795] block">{ord.studentEmail}</span>
                      </td>
                      <td className="py-3 px-3 font-bold text-[#111817]">
                        ₹{ord.totalAmount.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                            ord.status === 'completed'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {ord.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Column (5 cols): Recent Enrollments */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E3ECEA] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E3ECEA]">
            <h2 className="text-base font-bold text-[#111817]">Active Enrollments</h2>
            <Link href="/admin/students" className="text-xs font-bold text-[#176B68] hover:underline">
              Manage Access &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {stats.recentEnrollments.map((enr) => {
              const student = db.users.find((u) => u.id === enr.studentId);
              const course = db.courses.find((c) => c.id === enr.courseId);

              return (
                <div key={enr.id} className="p-3 rounded-xl bg-[#F8FAFA] border border-[#E3ECEA] flex items-center justify-between gap-3 text-xs">
                  <div className="min-w-0">
                    <span className="font-bold text-[#111817] block truncate">
                      {student?.name || 'Student'}
                    </span>
                    <span className="text-[11px] text-[#176B68] font-medium block truncate">
                      {course?.title || 'Course'}
                    </span>
                  </div>
                  <span className="shrink-0 text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white border border-[#E3ECEA] text-[#586765]">
                    {enr.source}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* System Audit Trail Log */}
      <div className="bg-white rounded-2xl border border-[#E3ECEA] p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#111817] pb-3 border-b border-[#E3ECEA]">
          Recent System Audit Logs (Role-Based Action Integrity)
        </h2>
        <div className="divide-y divide-[#E3ECEA]/60 text-xs">
          {stats.recentAuditLogs.map((log) => (
            <div key={log.id} className="py-2.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#EBF7F5] text-[#176B68]">
                  {log.action}
                </span>
                <span className="text-[#111817] font-medium">
                  {log.entityType} ({log.entityId})
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-[#8A9795]">
                <span>{log.userEmail}</span>
                <span>&bull;</span>
                <span>{new Date(log.createdAt).toLocaleTimeString('en-IN')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
