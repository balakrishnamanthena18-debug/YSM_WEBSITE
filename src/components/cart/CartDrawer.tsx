'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, cartSubtotal, cartTotal, clearCart } = useCart();

  if (!isOpen) return null;

  const totalDiscount = cartSubtotal - cartTotal;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="cart-drawer-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 sm:p-6 bg-[#0B201F] text-white flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <svg className="w-5 h-5 text-[#5BC4CC]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <h2 id="cart-drawer-title" className="text-lg font-bold">
                Your Learning Cart ({cart.length})
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close cart"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-[#F5F8F7] text-[#176B68] flex items-center justify-center mb-4">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-[#111817] mb-1">Your cart is empty</h3>
                <p className="text-xs text-[#586765] max-w-xs mb-6">
                  Explore our 13 specialized industry tracks and build production-grade technology skills.
                </p>
                <Link
                  href="/courses"
                  onClick={onClose}
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-bold text-xs bg-[#176B68] text-white hover:bg-[#104E4D] transition-colors"
                >
                  Browse Course Catalog
                </Link>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-2 border-b border-[#E3ECEA]">
                  <span className="text-xs font-semibold text-[#586765]">Selected Programs</span>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-xs text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear All
                  </button>
                </div>

                {cart.map((item) => (
                  <div
                    key={item.courseId}
                    className="flex gap-3.5 p-3.5 rounded-xl border border-[#E3ECEA] bg-[#F8FAFA] hover:border-[#16B6B8]/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-mono uppercase font-bold text-[#176B68] block mb-0.5">
                        {item.category}
                      </span>
                      <Link
                        href={`/courses/${item.slug}`}
                        onClick={onClose}
                        className="text-sm font-bold text-[#111817] hover:text-[#176B68] line-clamp-2 transition-colors"
                      >
                        {item.title}
                      </Link>

                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-base font-bold text-[#111817]">
                          ₹{item.discountPrice.toLocaleString('en-IN')}
                        </span>
                        {item.price > item.discountPrice && (
                          <span className="text-xs text-[#8A9795] line-through">
                            ₹{item.price.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.courseId)}
                      className="text-[#8A9795] hover:text-red-600 p-1 self-start transition-colors"
                      aria-label={`Remove ${item.title}`}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-5 sm:p-6 bg-[#F8FAFA] border-t border-[#E3ECEA] space-y-3">
              <div className="space-y-1.5 text-xs text-[#586765]">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="line-through">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {totalDiscount > 0 && (
                  <div className="flex justify-between text-[#176B68] font-medium">
                    <span>Discount Savings:</span>
                    <span>-₹{totalDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-[#111817] pt-2 border-t border-[#E3ECEA]">
                  <span>Total Payable:</span>
                  <span className="text-[#176B68]">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm bg-[#16B6B8] text-[#0B201F] hover:bg-[#5BC4CC] transition-colors shadow-sm"
                >
                  <span>Proceed to Checkout</span>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2 text-xs font-semibold text-[#586765] hover:text-[#111817] transition-colors"
                >
                  Continue Browsing Courses
                </button>
              </div>

              <div className="text-[10px] text-center text-[#8A9795] pt-1">
                🔒 Guaranteed Safe Checkout &bull; 100% Secure Course Access
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
