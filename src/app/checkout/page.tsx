import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CheckoutView } from '@/components/cart/CheckoutView';

export const metadata: Metadata = {
  title: 'Checkout & Enrollment | YSM Infotech',
  description: 'Complete your course enrollment and access your learning portal.',
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <CheckoutView />
      </main>
      <Footer />
    </div>
  );
}
