import React from 'react';
import type { Metadata } from 'next';
import { LoginView } from '@/components/auth/LoginView';

export const metadata: Metadata = {
  title: 'Sign In | YSM Infotech Learning Management System',
  description: 'Access your enrolled technology training programs, labs, and certification records.',
};

export default function LoginPage() {
  return <LoginView />;
}
