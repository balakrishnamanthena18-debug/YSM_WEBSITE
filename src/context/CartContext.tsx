'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course } from '@/lib/db/schema';

export interface CartItem {
  id: string;
  courseId: string;
  slug: string;
  title: string;
  category: string;
  price: number;
  discountPrice: number;
  thumbnailUrl: string;
}

interface CartContextType {
  cart: CartItem[];
  wishlist: string[]; // courseIds
  addToCart: (course: Course) => void;
  removeFromCart: (courseId: string) => void;
  clearCart: () => void;
  isInCart: (courseId: string) => boolean;
  toggleWishlist: (courseId: string) => void;
  isInWishlist: (courseId: string) => boolean;
  cartCount: number;
  cartSubtotal: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'ysm_lms_cart_v1';
const WISHLIST_STORAGE_KEY = 'ysm_lms_wishlist_v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Save to localStorage when state changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to storage:', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist to storage:', e);
    }
  }, [wishlist]);

  const addToCart = (course: Course) => {
    setCart((prev) => {
      if (prev.some((item) => item.courseId === course.id)) {
        return prev;
      }
      return [
        ...prev,
        {
          id: `cart_${course.id}`,
          courseId: course.id,
          slug: course.slug,
          title: course.title,
          category: course.categoryName,
          price: course.price,
          discountPrice: course.discountPrice,
          thumbnailUrl: course.thumbnailUrl,
        },
      ];
    });
  };

  const removeFromCart = (courseId: string) => {
    setCart((prev) => prev.filter((item) => item.courseId !== courseId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (courseId: string) => {
    return cart.some((item) => item.courseId === courseId);
  };

  const toggleWishlist = (courseId: string) => {
    setWishlist((prev) =>
      prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]
    );
  };

  const isInWishlist = (courseId: string) => {
    return wishlist.includes(courseId);
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.discountPrice, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        toggleWishlist,
        isInWishlist,
        cartCount: cart.length,
        cartSubtotal,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
