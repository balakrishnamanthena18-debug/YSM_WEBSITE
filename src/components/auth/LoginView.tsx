'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginAction, demoLoginAction } from '@/app/actions/auth';
import { Container } from '@/components/ui/Container';

export function LoginView() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      const res = await loginAction(null, formData);
      if (res.success && res.redirectTo) {
        router.push(res.redirectTo);
        router.refresh();
      } else {
        setError(res.error || 'Failed to sign in. Please verify your credentials.');
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (role: 'student' | 'instructor' | 'admin') => {
    setLoading(true);
    await demoLoginAction(role);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFA] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Container className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo/ysm-brand-logo.png"
              alt="YSM Infotech"
              className="h-12 w-auto mx-auto object-contain"
            />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-[#111817]">
            Sign in to YSM Learning Portal
          </h1>
          <p className="text-xs text-[#586765] mt-1.5">
            Access your enrolled courses, interactive labs, and completion certificates.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white py-8 px-6 shadow-sm rounded-2xl border border-[#E3ECEA] sm:px-10">
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#586765] mb-1 font-mono">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] text-sm text-[#111817] focus:outline-hidden focus:ring-2 focus:ring-[#16B6B8] focus:border-transparent transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-[#586765] font-mono">
                  Password
                </label>
                <Link href="/contact" className="text-xs text-[#176B68] hover:underline">
                  Forgot?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] text-sm text-[#111817] focus:outline-hidden focus:ring-2 focus:ring-[#16B6B8] focus:border-transparent transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center py-3 px-4 rounded-xl font-bold text-sm bg-[#176B68] text-white hover:bg-[#104E4D] transition-colors shadow-sm disabled:opacity-60 cursor-pointer"
            >
              {loading ? 'Authenticating...' : 'Sign In to Portal'}
            </button>
          </form>

          {/* Quick Demo Access Switcher */}
          <div className="mt-8 pt-6 border-t border-[#E3ECEA]">
            <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-[#586765] block mb-2 text-center">
              Quick Role-Based Demonstration
            </span>
            <p className="text-[11px] text-[#8A9795] text-center mb-3">
              Click any role to test instant authorization with pre-seeded database accounts:
            </p>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('student')}
                disabled={loading}
                className="py-2 px-2 text-center rounded-lg border border-[#16B6B8]/40 bg-[#EBF7F5] hover:bg-[#16B6B8]/20 text-[#176B68] text-xs font-bold transition-colors cursor-pointer"
              >
                Student
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('instructor')}
                disabled={loading}
                className="py-2 px-2 text-center rounded-lg border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold transition-colors cursor-pointer"
              >
                Instructor
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                disabled={loading}
                className="py-2 px-2 text-center rounded-lg border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold transition-colors cursor-pointer"
              >
                Super Admin
              </button>
            </div>
          </div>

          {/* Registration Link */}
          <div className="mt-6 text-center text-xs text-[#586765]">
            New learner?{' '}
            <Link href="/register" className="font-bold text-[#176B68] hover:underline">
              Create a free student account
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
