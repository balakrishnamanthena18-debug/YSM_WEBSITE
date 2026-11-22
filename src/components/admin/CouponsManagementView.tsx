'use client';

import React, { useState, useTransition } from 'react';
import { Coupon, Order } from '@/lib/db/schema';
import { toggleCouponStatusAction } from '@/app/actions/admin';

interface CouponsManagementViewProps {
  initialCoupons: Coupon[];
  orders: Order[];
}

export function CouponsManagementView({
  initialCoupons,
  orders,
}: CouponsManagementViewProps) {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPending, startTransition] = useTransition();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Compute coupon statistics
  const totalRedemptions = coupons.reduce((sum, c) => sum + (c.timesUsed || 0), 0);
  const activeCoupons = coupons.filter((c) => c.isActive).length;
  const couponOrders = orders.filter((o) => o.couponCode);
  const totalDiscountGiven = couponOrders.reduce((sum, o) => sum + (o.discountAmount || 0), 0);

  const filteredCoupons = coupons.filter((c) =>
    c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggle = (couponId: string) => {
    startTransition(async () => {
      setStatusMessage(null);
      const res = await toggleCouponStatusAction(couponId);
      if (res.success && res.coupon) {
        setCoupons((prev) =>
          prev.map((c) => (c.id === couponId ? { ...c, isActive: res.coupon!.isActive } : c))
        );
        setStatusMessage(`Coupon "${res.coupon.code}" status updated.`);
      } else {
        setStatusMessage(res.error || 'Failed to update coupon status.');
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#E3ECEA] shadow-xs">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#586765] block">
            Active Discount Codes
          </span>
          <span className="text-3xl font-extrabold text-[#176B68] mt-1 block">
            {activeCoupons}
          </span>
          <p className="text-xs text-[#586765] mt-1">
            {coupons.length} total coupons configured in system
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E3ECEA] shadow-xs">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#586765] block">
            Lifetime Redemptions
          </span>
          <span className="text-3xl font-extrabold text-[#111817] mt-1 block">
            {totalRedemptions}
          </span>
          <p className="text-xs text-[#586765] mt-1">
            Applied during student checkout transactions
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E3ECEA] shadow-xs">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#586765] block">
            Promotional Savings Delivered
          </span>
          <span className="text-2xl font-extrabold text-[#0D7D7F] mt-1 block">
            ₹{totalDiscountGiven.toLocaleString('en-IN')}
          </span>
          <p className="text-xs text-[#586765] mt-1">
            Direct fee concessions granted to enrolled students
          </p>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-between">
          <span>{statusMessage}</span>
          <button
            onClick={() => setStatusMessage(null)}
            className="text-emerald-700 hover:text-emerald-900 font-bold ml-2"
          >
            &times;
          </button>
        </div>
      )}

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E3ECEA] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#586765]">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search coupon code (e.g. YSM20, CAREER50)..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-[#E3ECEA] bg-[#F8FAFA] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16B6B8] focus:border-transparent transition-all"
          />
        </div>
        <div className="text-xs text-[#586765] font-mono">
          Showing {filteredCoupons.length} coupons
        </div>
      </div>

      {/* Coupons Table */}
      <div className="overflow-x-auto bg-white rounded-2xl border border-[#E3ECEA] shadow-xs">
        <table className="w-full text-xs text-left">
          <thead className="bg-[#F8FAFA] border-b border-[#E3ECEA] text-[#586765] uppercase font-mono text-[10px]">
            <tr>
              <th className="py-3.5 px-4 font-bold">Voucher Code</th>
              <th className="py-3.5 px-4 font-bold">Discount Rule</th>
              <th className="py-3.5 px-4 font-bold">Constraints</th>
              <th className="py-3.5 px-4 font-bold">Usage / Limit</th>
              <th className="py-3.5 px-4 font-bold">Status</th>
              <th className="py-3.5 px-4 font-bold text-right">Toggle Active</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E3ECEA]/60">
            {filteredCoupons.map((coupon) => (
              <tr key={coupon.id} className="hover:bg-[#F8FAFA] transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-[#081716] px-2.5 py-1 rounded-lg bg-[#EBF7F5] border border-[#16B6B8]/30">
                      {coupon.code}
                    </span>
                  </div>
                  <span className="text-[10.5px] text-[#586765] block mt-1 font-mono">
                    ID: {coupon.id}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="font-bold text-[#111817] block">
                    {coupon.discountType === 'percentage'
                      ? `${coupon.discountValue}% OFF`
                      : `₹${coupon.discountValue.toLocaleString('en-IN')} FLAT OFF`}
                  </span>
                  <span className="text-[10.5px] text-[#586765]">
                    {coupon.discountType === 'percentage'
                      ? 'Proportional discount on cart total'
                      : 'Fixed cash deduction from cart'}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-mono text-[11px]">
                  <div>Min Order: ₹{coupon.minOrderValue?.toLocaleString('en-IN') || '0'}</div>
                  {coupon.maxDiscount && (
                    <div className="text-[#586765]">
                      Max Cap: ₹{coupon.maxDiscount.toLocaleString('en-IN')}
                    </div>
                  )}
                </td>
                <td className="py-3.5 px-4 font-mono">
                  <span className="font-bold text-[#111817]">
                    {coupon.timesUsed || 0}
                  </span>
                  <span className="text-[#586765]">
                    {' '}/ {coupon.usageLimit ? coupon.usageLimit : 'Unlimited'}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      coupon.isActive
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-neutral-100 text-neutral-600 border border-neutral-200'
                    }`}
                  >
                    {coupon.isActive ? 'Active' : 'Disabled'}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => handleToggle(coupon.id)}
                    disabled={isPending}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                      coupon.isActive
                        ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                    }`}
                  >
                    {coupon.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
