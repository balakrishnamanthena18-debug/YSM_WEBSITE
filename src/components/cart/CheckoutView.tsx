'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { processCheckoutAction } from '@/app/actions/checkout';
import { Container } from '@/components/ui/Container';

export function CheckoutView() {
  const router = useRouter();
  const { cart, cartSubtotal, cartTotal, clearCart } = useCart();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountPct, setDiscountPct] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    if (couponCode.toUpperCase() === 'YSM20') {
      setCouponApplied(true);
      setDiscountPct(20);
      setError(null);
    } else if (couponCode.toUpperCase() === 'CAREER50') {
      setCouponApplied(true);
      setDiscountPct(15);
      setError(null);
    } else {
      setError('Invalid coupon code. Try code "YSM20" for 20% off.');
    }
  };

  const couponDiscountAmount = couponApplied ? Math.round((cartTotal * discountPct) / 100) : 0;
  const finalPayable = Math.max(0, cartTotal - couponDiscountAmount);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      setError('Your cart is empty.');
      return;
    }
    if (!name.trim() || !email.trim()) {
      setError('Please provide your full name and email for your course registration.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await processCheckoutAction({
        items: cart.map((it) => ({
          courseId: it.courseId,
          price: it.price,
          discountPrice: it.discountPrice,
        })),
        couponCode: couponApplied ? couponCode : undefined,
        studentName: name,
        studentEmail: email,
        studentPhone: phone,
      });

      if (res.success && res.orderId) {
        clearCart();
        router.push(`/checkout/success?orderId=${res.orderId}`);
      } else {
        setError(res.error || 'Payment transaction failed. Please retry.');
      }
    } catch {
      setError('An error occurred during checkout processing.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="py-20 bg-[#F8FAFA] min-h-[70vh] flex items-center justify-center">
        <Container className="text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-[#E8F5F3] text-[#176B68] flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-[#111817] mb-2">No courses in your cart</h2>
          <p className="text-xs text-[#586765] mb-6">
            Explore our accredited technology programs and choose your specialization.
          </p>
          <Link
            href="/courses"
            className="inline-flex items-center justify-center py-2.5 px-6 rounded-xl font-bold text-xs bg-[#176B68] text-white hover:bg-[#104E4D] transition-colors"
          >
            Explore Course Catalog
          </Link>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16 bg-[#F8FAFA] min-h-screen">
      <Container>
        {/* Page Title */}
        <div className="max-w-4xl mx-auto mb-8 text-left">
          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 text-xs text-[#586765] hover:text-[#176B68] mb-3 transition-colors"
          >
            &larr; Continue Exploring Courses
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-[#111817]">
            Secure Student Checkout &amp; Enrollment
          </h1>
          <p className="text-xs text-[#586765] mt-1">
            Complete your purchase to receive instant access to your course curriculum and practical labs.
          </p>
        </div>

        {error && (
          <div className="max-w-4xl mx-auto mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form: Student & Payment Info (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E3ECEA] p-6 sm:p-8 shadow-xs text-left">
            <form onSubmit={handleCheckout} className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-[#111817] mb-4 pb-2 border-b border-[#E3ECEA]">
                  1. Learner Profile Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#586765] mb-1 font-mono">
                      Full Name (for Completion Certificate)
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Priyanka Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] text-sm text-[#111817] focus:outline-hidden focus:ring-2 focus:ring-[#16B6B8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#586765] mb-1 font-mono">
                      Email Address (Course Access Login)
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] text-sm text-[#111817] focus:outline-hidden focus:ring-2 focus:ring-[#16B6B8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#586765] mb-1 font-mono">
                      Mobile / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] text-sm text-[#111817] focus:outline-hidden focus:ring-2 focus:ring-[#16B6B8]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <h3 className="text-base font-bold text-[#111817] mb-4 pb-2 border-b border-[#E3ECEA]">
                  2. Payment Method
                </h3>
                <div className="p-4 rounded-xl border border-[#16B6B8] bg-[#F0FAF7] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-4 h-4 rounded-full border-4 border-[#176B68] bg-white" />
                    <div>
                      <span className="font-bold text-sm text-[#111817] block">
                        Razorpay Secure Gateway
                      </span>
                      <span className="text-xs text-[#586765]">
                        UPI (GPay / PhonePe / Paytm), Credit/Debit Cards, NetBanking
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-white text-[#176B68] border border-[#16B6B8]/30">
                    Encrypted
                  </span>
                </div>
              </div>

              {/* Final Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-sm bg-[#176B68] text-white hover:bg-[#104E4D] transition-colors shadow-sm disabled:opacity-60 cursor-pointer"
              >
                {loading ? (
                  <span>Processing Verified Payment...</span>
                ) : (
                  <span>Pay ₹{finalPayable.toLocaleString('en-IN')} &amp; Activate Course Access</span>
                )}
              </button>

              <div className="text-[11px] text-center text-[#8A9795]">
                🔒 256-bit TLS Encryption &bull; ISO 9001:2015 Accredited Course Access
              </div>
            </form>
          </div>

          {/* Right Summary: Selected Courses & Order Totals (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E3ECEA] p-6 shadow-xs text-left space-y-5">
            <h3 className="text-base font-bold text-[#111817] pb-3 border-b border-[#E3ECEA]">
              Order Summary ({cart.length} {cart.length === 1 ? 'Program' : 'Programs'})
            </h3>

            {/* Itemized Courses */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.courseId} className="flex justify-between items-start gap-3 text-xs pb-3 border-b border-[#E3ECEA]/60">
                  <div>
                    <span className="font-mono text-[9.5px] uppercase font-bold text-[#176B68] block">
                      {item.category}
                    </span>
                    <span className="font-bold text-[#111817] leading-snug line-clamp-2">
                      {item.title}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-bold text-[#111817] block">
                      ₹{item.discountPrice.toLocaleString('en-IN')}
                    </span>
                    {item.price > item.discountPrice && (
                      <span className="text-[10px] text-[#8A9795] line-through">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon Code Section */}
            <div className="pt-2">
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Coupon code (e.g. YSM20)"
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#E3ECEA] uppercase font-mono tracking-wider text-[#111817] focus:outline-hidden focus:border-[#176B68]"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#EBF7F5] text-[#176B68] hover:bg-[#16B6B8]/20 transition-colors"
                >
                  Apply
                </button>
              </form>
              {couponApplied && (
                <span className="text-[11px] text-[#176B68] font-bold block mt-1">
                  ✓ Coupon {couponCode.toUpperCase()} applied ({discountPct}% OFF)!
                </span>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="pt-3 border-t border-[#E3ECEA] space-y-2 text-xs text-[#586765]">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="line-through">₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#176B68] font-medium">
                <span>Standard Institutional Savings:</span>
                <span>-₹{(cartSubtotal - cartTotal).toLocaleString('en-IN')}</span>
              </div>
              {couponApplied && (
                <div className="flex justify-between text-[#176B68] font-bold">
                  <span>Coupon Discount:</span>
                  <span>-₹{couponDiscountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-[#111817] pt-2 border-t border-[#E3ECEA]">
                <span>Total Amount Due:</span>
                <span className="text-[#176B68]">₹{finalPayable.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="pt-2 bg-[#F8FAFA] -mx-6 -mb-6 p-4 rounded-b-2xl text-[11px] text-[#586765] space-y-1">
              <div>✓ Instant LMS portal enrollment upon payment confirmation</div>
              <div>✓ 24/7 access to recorded lectures &amp; lab workbooks</div>
              <div>✓ ISO 9001:2015 Accredited Course Certificate</div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
