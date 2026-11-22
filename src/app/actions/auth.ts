'use server';

import { redirect } from 'next/navigation';
import { findUserByEmail, createUser, logAuditAction } from '@/lib/db';
import { hashPassword, verifyPassword } from '@/lib/auth/crypto';
import { createSession, destroySession } from '@/lib/auth/session';
import { UserRole } from '@/lib/db/schema';

export interface AuthActionResult {
  success: boolean;
  error?: string;
  redirectTo?: string;
}

/**
 * Handle student/admin/instructor login.
 */
export async function loginAction(
  prevState: AuthActionResult | null,
  formData: FormData
): Promise<AuthActionResult> {
  const email = formData.get('email')?.toString().trim().toLowerCase();
  const password = formData.get('password')?.toString();

  if (!email || !password) {
    return { success: false, error: 'Email and password are required.' };
  }

  const user = findUserByEmail(email);
  if (!user || !user.isActive) {
    return { success: false, error: 'Invalid email or password.' };
  }

  const isValid = verifyPassword(password, user.passwordHash, user.salt);
  if (!isValid) {
    return { success: false, error: 'Invalid email or password.' };
  }

  await createSession(user);

  logAuditAction(user.id, 'USER_LOGIN', 'User', user.id, {
    email: user.email,
    role: user.role,
  });

  const redirectTo =
    user.role === 'admin'
      ? '/admin'
      : user.role === 'instructor'
      ? '/admin/courses'
      : '/learning';

  return { success: true, redirectTo };
}

/**
 * Handle new student registration.
 */
export async function registerAction(
  prevState: AuthActionResult | null,
  formData: FormData
): Promise<AuthActionResult> {
  const name = formData.get('name')?.toString().trim();
  const email = formData.get('email')?.toString().trim().toLowerCase();
  const password = formData.get('password')?.toString();
  const phone = formData.get('phone')?.toString().trim();

  if (!name || !email || !password) {
    return { success: false, error: 'Full name, email, and password are required.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: 'Please enter a valid email address.' };
  }

  if (password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters.' };
  }

  const existing = findUserByEmail(email);
  if (existing) {
    return { success: false, error: 'An account with this email already exists.' };
  }

  const { hash, salt } = hashPassword(password);
  const now = new Date().toISOString();

  const newUser = createUser({
    id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    email,
    passwordHash: hash,
    salt,
    name,
    phone,
    role: 'student',
    isActive: true,
    createdAt: now,
    updatedAt: now,
  });

  await createSession(newUser);

  logAuditAction(newUser.id, 'USER_REGISTERED', 'User', newUser.id, {
    email: newUser.email,
  });

  return { success: true, redirectTo: '/learning' };
}

/**
 * Handle user logout.
 */
export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect('/login');
}

/**
 * One-click demo login helper for seamless role switching during testing.
 */
export async function demoLoginAction(role: UserRole): Promise<void> {
  let email = 'student@ysminfotech.com';
  if (role === 'admin') email = 'admin@ysminfotech.com';
  if (role === 'instructor') email = 'instructor@ysminfotech.com';

  const user = findUserByEmail(email);
  if (user) {
    await createSession(user);
    logAuditAction(user.id, 'DEMO_LOGIN', 'User', user.id, { role });
  }

  const dest = role === 'admin' ? '/admin' : '/learning';
  redirect(dest);
}
