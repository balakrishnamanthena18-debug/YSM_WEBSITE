import React from 'react';
import type { Metadata } from 'next';
import { RegisterView } from '@/components/auth/RegisterView';

export const metadata: Metadata = {
  title: 'Register Student Account | YSM Infotech',
  description: 'Create your YSM Infotech student learning profile and enroll in industry-accredited courses.',
};

export default function RegisterPage() {
  return <RegisterView />;
}
