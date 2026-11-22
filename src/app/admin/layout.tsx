import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/session';
import { logoutAction } from '@/app/actions/auth';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  if (session.user.role !== 'admin' && session.user.role !== 'instructor') {
    redirect('/learning');
  }

  const { user } = session;

  return (
    <div className="min-h-screen bg-[#F8FAFA] text-[#111817] flex flex-col lg:flex-row">
      {/* Admin Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-[#081716] text-white flex flex-col shrink-0 border-r border-white/10">
        {/* Brand Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo/ysm-brand-logo.png"
              alt="YSM Infotech"
              className="h-8 w-auto brightness-0 invert object-contain"
            />
          </Link>
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
            {user.role === 'admin' ? 'Super Admin' : 'Instructor'}
          </span>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="p-3.5 space-y-4 flex-1 text-xs font-semibold overflow-y-auto">
          {/* Operations Section */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 px-3 block mb-1.5 font-bold">
              Operations
            </span>
            <div className="space-y-0.5">
              <Link
                href="/admin"
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 text-[#5BC4CC]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
                <span>Dashboard</span>
              </Link>

              <Link
                href="/admin/courses"
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 text-[#5BC4CC]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
                <span>Course Management</span>
              </Link>

              <Link
                href="/admin/instructors"
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 text-[#5BC4CC]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>Instructor Management</span>
              </Link>
            </div>
          </div>

          {/* Students Section */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 px-3 block mb-1.5 font-bold">
              Students &amp; Access
            </span>
            <div className="space-y-0.5">
              <Link
                href="/admin/students"
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 text-[#5BC4CC]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span>Student Registry &amp; Access</span>
              </Link>
            </div>
          </div>

          {/* Commerce Section */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 px-3 block mb-1.5 font-bold">
              Commerce
            </span>
            <div className="space-y-0.5">
              <Link
                href="/admin/orders"
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 text-[#5BC4CC]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <span>Orders &amp; Revenue</span>
              </Link>

              <Link
                href="/admin/coupons"
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 text-[#5BC4CC]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                  <line x1="7" y1="7" x2="7.01" y2="7" />
                </svg>
                <span>Coupons &amp; Discounts</span>
              </Link>
            </div>
          </div>

          {/* Portals Section */}
          <div className="pt-2 border-t border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 px-3 block mb-1.5 font-bold">
              Portals
            </span>
            <div className="space-y-0.5">
              <Link
                href="/learning"
                className="flex items-center justify-between px-3 py-2 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              >
                <span>Student Learning View</span>
                <span className="text-[#5BC4CC]">&rarr;</span>
              </Link>
              <Link
                href="/courses"
                className="flex items-center justify-between px-3 py-2 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              >
                <span>Public Course Catalog</span>
                <span className="text-[#5BC4CC]">&rarr;</span>
              </Link>
            </div>
          </div>
        </nav>

        {/* User Info & Logout Footer */}
        <div className="p-4 bg-[#051110] border-t border-white/10 flex items-center justify-between text-xs">
          <div className="min-w-0 pr-2">
            <span className="font-bold text-white block truncate">{user.name}</span>
            <span className="text-[10.5px] text-white/50 block truncate">{user.email}</span>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Sign out"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Admin Viewport Area */}
      <main className="flex-1 min-w-0 overflow-y-auto">{children}</main>
    </div>
  );
}
