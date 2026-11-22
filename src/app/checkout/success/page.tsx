import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Container } from '@/components/ui/Container';
import { getOrderById } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Enrollment Confirmed | YSM Infotech',
  description: 'Your payment has been verified and your course enrollment is active.',
};

interface PageProps {
  searchParams: Promise<{ orderId?: string }>;
}

export default async function CheckoutSuccessPage({ searchParams }: PageProps) {
  const { orderId } = await searchParams;
  const order = orderId ? getOrderById(orderId) : undefined;
  const isCompleted = order?.status === 'completed';

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFA]">
      <Navbar />

      <main className="flex-1 py-14 sm:py-20">
        <Container className="max-w-2xl text-center">
          {/* Status Icon */}
          <div
            className={`w-20 h-20 rounded-full border-2 flex items-center justify-center mx-auto mb-6 shadow-sm ${
              isCompleted
                ? 'bg-[#EBF7F5] border-[#16B6B8] text-[#176B68]'
                : 'bg-amber-50 border-amber-300 text-amber-600'
            }`}
          >
            {isCompleted ? (
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            )}
          </div>

          {/* Heading */}
          <span
            className={`font-mono text-xs font-bold uppercase tracking-widest block mb-2 ${
              isCompleted ? 'text-[#176B68]' : 'text-amber-700'
            }`}
          >
            {isCompleted
              ? 'TRANSACTION VERIFIED • ENROLLMENT ACTIVE'
              : 'ORDER RECORDED • PAYMENT VERIFICATION PENDING'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111817] mb-3">
            {isCompleted ? 'Welcome to YSM Infotech!' : 'Order Placed Successfully'}
          </h1>
          <p className="text-sm text-[#586765] max-w-lg mx-auto mb-8 leading-relaxed">
            {isCompleted
              ? 'Your payment was successfully verified and your student learning access has been activated in the portal.'
              : 'Your order has been recorded in the platform database. Payment verification from the gateway is currently pending. Your course access will activate immediately once payment is confirmed.'}
          </p>

          {/* Order Details Receipt Card */}
          <div className="bg-white rounded-2xl border border-[#E3ECEA] p-6 sm:p-8 text-left shadow-xs mb-8 space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-[#E3ECEA]">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#586765] block">
                  Order Reference
                </span>
                <span className="text-sm font-bold text-[#111817]">
                  {order?.orderNumber || 'YSM-ORD-CONFIRMED'}
                </span>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                  isCompleted
                    ? 'bg-[#EBF7F5] text-[#176B68]'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isCompleted ? 'bg-[#16B6B8]' : 'bg-amber-500'
                  }`}
                />
                {isCompleted ? 'Paid • Verified' : 'Payment Pending'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[#8A9795] block mb-0.5">Enrolled Student</span>
                <span className="font-bold text-[#111817]">{order?.studentName || 'Student'}</span>
              </div>
              <div>
                <span className="text-[#8A9795] block mb-0.5">Login Email</span>
                <span className="font-bold text-[#111817]">{order?.studentEmail || 'Registered Email'}</span>
              </div>
              <div>
                <span className="text-[#8A9795] block mb-0.5">Total Amount</span>
                <span className="font-bold text-[#176B68] text-sm">
                  ₹{order ? order.totalAmount.toLocaleString('en-IN') : 'Confirmed'}
                </span>
              </div>
              <div>
                <span className="text-[#8A9795] block mb-0.5">Payment Gateway</span>
                <span className="font-bold text-[#111817]">Razorpay Secure</span>
              </div>
            </div>

            {/* Enrolled Courses */}
            {order && order.items && (
              <div className="pt-3 border-t border-[#E3ECEA] space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#586765] block font-bold">
                  {isCompleted
                    ? `Activated Course Programs (${order.items.length})`
                    : `Course Programs in Order (${order.items.length})`}
                </span>
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-[#F8FAFA] border border-[#E3ECEA]">
                    <span className="text-xs font-bold text-[#111817]">{item.courseTitle}</span>
                    {isCompleted ? (
                      <Link
                        href={`/learning/courses/${item.courseId}`}
                        className="text-xs font-bold text-[#176B68] hover:underline"
                      >
                        Open in Portal &rarr;
                      </Link>
                    ) : (
                      <span className="text-xs text-amber-700 font-semibold">
                        Awaiting Payment
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={isCompleted ? '/learning' : '/courses'}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-8 rounded-xl font-bold text-sm bg-[#176B68] text-white hover:bg-[#104E4D] transition-colors shadow-sm"
            >
              <span>{isCompleted ? 'Go to Student Dashboard' : 'Explore More Courses'}</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>

            <Link
              href="/learning/my-courses"
              className="w-full sm:w-auto inline-flex items-center justify-center py-3.5 px-6 rounded-xl font-semibold text-sm text-[#586765] bg-white border border-[#E3ECEA] hover:bg-neutral-50 transition-colors"
            >
              My Learning View
            </Link>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
