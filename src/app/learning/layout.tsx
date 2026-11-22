import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/session';
import { logoutAction } from '@/app/actions/auth';
import { Container } from '@/components/ui/Container';

export default async function LearningPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  const { user } = session;

  return (
    <div className="min-h-screen bg-[#F8FAFA] text-[#111817] flex flex-col selection:bg-[#16B6B8]/20 selection:text-[#176B68]">
      {/* Student Portal Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0B201F] text-white border-b border-white/10 shadow-md">
        <Container>
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Left Brand & Portal Title */}
            <div className="flex items-center gap-3.5">
              <Link href="/" className="inline-flex items-center gap-2 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/logo/ysm-brand-logo.png"
                  alt="YSM Infotech"
                  className="h-9 w-auto brightness-0 invert object-contain"
                />
              </Link>
              <div className="hidden sm:flex items-center gap-2 border-l border-white/15 pl-3">
                <span className="font-mono text-[11px] font-bold tracking-wider uppercase text-[#5BC4CC] bg-white/10 px-2 py-0.5 rounded">
                  STUDENT LEARNING PORTAL
                </span>
              </div>
            </div>

            {/* Center Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 text-xs font-semibold">
              <Link
                href="/learning"
                className="text-[#D8E6E4] hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/learning/my-courses"
                className="text-[#D8E6E4] hover:text-white transition-colors"
              >
                My Courses
              </Link>
              <Link
                href="/learning/certificates"
                className="text-[#D8E6E4] hover:text-white transition-colors"
              >
                Certificates
              </Link>
              <Link
                href="/courses"
                className="text-[#5BC4CC] hover:text-white transition-colors"
              >
                Course Catalog &rarr;
              </Link>
            </nav>

            {/* Right User State & Actions */}
            <div className="flex items-center gap-3">
              {user.role === 'admin' && (
                <Link
                  href="/admin"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-colors"
                >
                  Super Admin Panel
                </Link>
              )}

              <div className="flex items-center gap-2.5 text-xs text-left">
                <div className="w-8 h-8 rounded-full bg-[#16B6B8] text-[#0A201F] font-bold flex items-center justify-center text-xs shadow-xs">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="hidden lg:block">
                  <span className="font-bold text-white block leading-tight">{user.name}</span>
                  <span className="text-[10px] text-white/50 uppercase font-mono">{user.role}</span>
                </div>
              </div>

              <form action={logoutAction}>
                <button
                  type="submit"
                  className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-xs font-semibold cursor-pointer"
                  title="Sign out of portal"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </Container>
      </header>

      {/* Main Student Portal Viewport */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
