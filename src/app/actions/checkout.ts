'use server';

import crypto from 'node:crypto';
import { createOrder, recordPaymentAndFulfill, findUserByEmail, createUser } from '@/lib/db';
import { hashPassword } from '@/lib/auth/crypto';
import { getSession, createSession } from '@/lib/auth/session';

export interface CheckoutResult {
  success: boolean;
  orderId?: string;
  orderNumber?: string;
  status?: string;
  paymentBlocked?: boolean;
  message?: string;
  error?: string;
}

export async function processCheckoutAction(data: {
  items: Array<{ courseId: string; price?: number; discountPrice?: number }>;
  couponCode?: string;
  studentName: string;
  studentEmail: string;
  studentPhone?: string;
}): Promise<CheckoutResult> {
  try {
    if (!data.items || data.items.length === 0) {
      return { success: false, error: 'Your cart is empty.' };
    }

    if (!data.studentEmail || !data.studentName) {
      return { success: false, error: 'Full name and email are required for course enrollment.' };
    }

    const email = data.studentEmail.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    // 1. Check if user is currently logged in, or find/create account
    const session = await getSession();
    let studentId = session?.user.id;

    if (!studentId) {
      const existing = findUserByEmail(email);
      if (existing) {
        studentId = existing.id;
      } else {
        // Auto-provision student account with generated secure password
        const generatedPassword = `Ysm${Math.floor(100000 + Math.random() * 900000)}!`;
        const { hash, salt } = hashPassword(generatedPassword);
        const now = new Date().toISOString();

        const newUser = createUser({
          id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          email,
          passwordHash: hash,
          salt,
          name: data.studentName.trim(),
          phone: data.studentPhone?.trim(),
          role: 'student',
          isActive: true,
          createdAt: now,
          updatedAt: now,
        });

        studentId = newUser.id;
        await createSession(newUser);
      }
    }

    // 2. Create Order in Database (prices derived strictly server-side)
    const order = createOrder(studentId, data.items, data.couponCode);

    // 3. Payment Processing Gateway Check
    const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
    const razorpaySecret = process.env.RAZORPAY_KEY_SECRET;

    // Strict Rule: Never simulate a successful real payment.
    // When live/sandbox credentials are not configured, preserve order as pending.
    // Do NOT grant paid course access without verified payment confirmation.
    if (!razorpayKeyId || !razorpaySecret) {
      return {
        success: true,
        orderId: order.id,
        orderNumber: order.orderNumber,
        status: 'pending',
        paymentBlocked: true,
        message:
          'Order created successfully with pending payment status. Payment gateway credentials (RAZORPAY_KEY_ID) are not configured in environment; payment verification is BLOCKED and course access is withheld until payment is confirmed.',
      };
    }

    return {
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      status: 'pending',
      paymentBlocked: false,
    };
  } catch (err) {
    console.error('Checkout processing failed:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to complete transaction.',
    };
  }
}

/**
 * Verify cryptographic payment signature from Razorpay before fulfilling enrollment.
 */
export async function verifyPaymentAction(data: {
  orderId: string;
  razorpayPaymentId: string;
  razorpayOrderId: string;
  razorpaySignature: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const razorpaySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!razorpaySecret) {
      return { success: false, error: 'Payment gateway configuration is missing.' };
    }

    const body = `${data.razorpayOrderId}|${data.razorpayPaymentId}`;
    const expectedSig = crypto
      .createHmac('sha256', razorpaySecret)
      .update(body)
      .digest('hex');

    const isValid = crypto.timingSafeEqual(
      Buffer.from(data.razorpaySignature),
      Buffer.from(expectedSig)
    );

    if (!isValid) {
      return { success: false, error: 'Invalid payment signature verification failed.' };
    }

    recordPaymentAndFulfill(
      data.orderId,
      data.razorpayPaymentId,
      data.razorpayOrderId,
      data.razorpaySignature
    );

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Payment verification failed.',
    };
  }
}
