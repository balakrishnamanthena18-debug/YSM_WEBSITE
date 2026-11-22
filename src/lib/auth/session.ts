import { cookies } from 'next/headers';
import { User, UserRole } from '../db/schema';
import { findUserById } from '../db';
import { signPayload, verifySignedPayload } from './crypto';

const SESSION_COOKIE_NAME = 'ysm_session';
const SESSION_SECRET =
  process.env.SESSION_SECRET || 'ysm-infotech-lms-enterprise-platform-secret-2025';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

export interface SessionPayload {
  userId: string;
  email: string;
  role: UserRole;
  name: string;
  exp: number;
}

/**
 * Creates an encrypted/signed session cookie for authenticated users.
 */
export async function createSession(user: User): Promise<void> {
  const cookieStore = await cookies();
  const payload: SessionPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS,
  };

  const token = signPayload(payload, SESSION_SECRET);

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: '/',
  });
}

/**
 * Retrieves and validates the current user session.
 */
export async function getSession(): Promise<{ user: User } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  const payload = verifySignedPayload<SessionPayload>(token, SESSION_SECRET);
  if (!payload) return null;

  // Check expiration
  if (payload.exp < Math.floor(Date.now() / 1000)) {
    return null;
  }

  const user = findUserById(payload.userId);
  if (!user || !user.isActive) return null;

  return { user };
}

/**
 * Destroys the current session cookie.
 */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * Server-side guard: Ensures the user is logged in.
 * Redirects or throws if unauthenticated.
 */
export async function requireAuth(): Promise<User> {
  const session = await getSession();
  if (!session) {
    throw new Error('UNAUTHORIZED');
  }
  return session.user;
}

/**
 * Server-side guard: Ensures the user has one of the required roles.
 */
export async function requireRole(allowedRoles: UserRole[]): Promise<User> {
  const user = await requireAuth();
  if (!allowedRoles.includes(user.role)) {
    throw new Error('FORBIDDEN');
  }
  return user;
}
