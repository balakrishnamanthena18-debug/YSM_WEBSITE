'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { registerAction } from '@/app/actions/auth';
import { Container } from '@/components/ui/Container';

export function RegisterView() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('password', password);

    try {
      const res = await registerAction(null, formData);
      if (res.success && res.redirectTo) {
        router.push(res.redirectTo);
        router.refresh();
      } else {
        setError(res.error || 'Failed to create student account.');
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFA] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Container className="sm:mx-auto sm:w-full sm:max-w-md">
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
            Create Your Student Account
          </h1>
          <p className="text-xs text-[#586765] mt-1.5">
            Join thousands of ambitious technology graduates and professionals.
          </p>
        </div>

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
              <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-[#586765] mb-1 font-mono">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Priyanka Sharma"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] text-sm text-[#111817] focus:outline-hidden focus:ring-2 focus:ring-[#16B6B8] focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#586765] mb-1 font-mono">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] text-sm text-[#111817] focus:outline-hidden focus:ring-2 focus:ring-[#16B6B8] focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-[#586765] mb-1 font-mono">
                Mobile Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] text-sm text-[#111817] focus:outline-hidden focus:ring-2 focus:ring-[#16B6B8] focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-[#586765] mb-1 font-mono">
                Create Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] text-sm text-[#111817] focus:outline-hidden focus:ring-2 focus:ring-[#16B6B8] focus:border-transparent transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center py-3 px-4 rounded-xl font-bold text-sm bg-[#176B68] text-white hover:bg-[#104E4D] transition-colors shadow-sm disabled:opacity-60 cursor-pointer"
            >
              {loading ? 'Registering Account...' : 'Create Student Account'}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-[#586765]">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-[#176B68] hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
