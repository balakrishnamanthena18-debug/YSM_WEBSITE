import React from 'react';
import { getAllOrders, getAllUsers } from '@/lib/db';

export const metadata = {
  title: 'Orders & Revenue | YSM Admin LMS',
  description: 'Track e-commerce course orders, payment transactions, and enrollment fulfillments.',
};

export default async function AdminOrdersPage() {
  const orders = await getAllOrders();
  const users = await getAllUsers();

  const totalRevenue = orders
    .filter((o) => o.status === 'completed')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div className="p-6 sm:p-8 space-y-6">
      {/* Header & Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E3ECEA]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#16B6B8]" />
            <span className="font-mono text-[11px] font-bold text-[#176B68] uppercase tracking-wider">
              FINANCIAL AUDIT TRAIL
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111817]">
            Orders &amp; Commercial Transactions
          </h1>
          <p className="text-xs text-[#586765] mt-1">
            Audit course sales, coupon redemptions, payment gateway transaction IDs, and receipt status.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#EBF7F5] px-4 py-2.5 rounded-2xl border border-[#16B6B8]/20">
          <div>
            <span className="text-[10px] font-mono text-[#586765] uppercase block font-bold">
              Total Realized Revenue
            </span>
            <span className="text-lg font-extrabold text-[#176B68]">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto bg-white rounded-2xl border border-[#E3ECEA] shadow-xs">
        <table className="w-full text-xs text-left">
          <thead className="bg-[#F8FAFA] text-[#586765] font-mono uppercase text-[10.5px] border-b border-[#E3ECEA]">
            <tr>
              <th className="py-3 px-4">Order ID &amp; Date</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Items Enrolled</th>
              <th className="py-3 px-4">Amount (INR)</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Payment Method</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E3ECEA]">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-xs text-[#586765]">
                  No orders recorded yet. As students checkout from the course catalog, orders will populate here.
                </td>
              </tr>
            ) : (
              orders.map((order) => {
                const customer = users.find((u) => u.id === order.studentId);
                return (
                  <tr key={order.id} className="hover:bg-[#F8FAFA] transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-mono font-bold text-[#111817]">
                        {order.orderNumber || order.id}
                      </div>
                      <div className="text-[11px] font-mono text-[#586765]">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-bold text-[#111817]">
                        {order.studentName || customer?.name || 'Guest Student'}
                      </div>
                      <div className="text-[11px] font-mono text-[#586765]">
                        {order.studentEmail || customer?.email}
                      </div>
                    </td>

                    <td className="py-4 px-4 font-mono text-[11px] text-[#586765]">
                      {order.items?.length || 1} Course(s)
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-bold text-[#111817]">
                        ₹{order.totalAmount.toLocaleString('en-IN')}
                      </div>
                      {order.discountAmount > 0 && (
                        <div className="text-[10.5px] font-mono text-emerald-600">
                          -₹{order.discountAmount.toLocaleString('en-IN')} ({order.couponCode || 'PROMO'})
                        </div>
                      )}
                    </td>

                    <td className="py-4 px-4">
                      {order.status === 'completed' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          COMPLETED
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-mono font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          {order.status.toUpperCase()}
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-4 font-mono text-[11px] text-[#586765] capitalize">
                      {order.paymentMethod || 'Razorpay Online'}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
