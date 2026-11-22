import React from 'react';
import { getAllCoupons, getAllOrders } from '@/lib/db';
import { CouponsManagementView } from '@/components/admin/CouponsManagementView';

export const metadata = {
  title: 'Coupons & Discounts | YSM Admin LMS',
  description: 'Manage platform discount codes, campaign vouchers, and redemption tracking.',
};

export default async function AdminCouponsPage() {
  const coupons = getAllCoupons();
  const orders = getAllOrders();

  return (
    <div className="p-6 sm:p-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E3ECEA]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#16B6B8]" />
            <span className="font-mono text-[11px] font-bold text-[#176B68] uppercase tracking-wider">
              COMMERCIAL INCENTIVES
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111817]">
            Coupons &amp; Promotional Discounts
          </h1>
          <p className="text-xs text-[#586765] mt-1">
            Create promotional codes, configure percentage and flat fee deductions, and track redemption volume.
          </p>
        </div>
      </div>

      <CouponsManagementView initialCoupons={coupons} orders={orders} />
    </div>
  );
}
