import { NextRequest, NextResponse } from 'next/server';
import crypto from 'node:crypto';
import { recordPaymentAndFulfill, refundOrder, getOrderById } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.warn('RAZORPAY_WEBHOOK_SECRET is not configured; rejecting webhook.');
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      );
    }

    const signature = req.headers.get('x-razorpay-signature');
    if (!signature) {
      return NextResponse.json(
        { error: 'Missing x-razorpay-signature header' },
        { status: 400 }
      );
    }

    const rawBody = await req.text();
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(rawBody)
      .digest('hex');

    const isValid = crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );

    if (!isValid) {
      console.error('Invalid Razorpay webhook signature');
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const event = JSON.parse(rawBody) as { event: string; payload: any };

    switch (event.event) {
      case 'payment.captured':
      case 'order.paid': {
        const paymentEntity = event.payload?.payment?.entity;
        const razorpayPaymentId = paymentEntity?.id;
        const razorpayOrderId = paymentEntity?.order_id;
        // Check notes or metadata for internal orderId
        const orderId = paymentEntity?.notes?.orderId || event.payload?.order?.entity?.notes?.orderId;

        if (orderId) {
          const order = getOrderById(orderId);
          if (order && order.status !== 'completed') {
            recordPaymentAndFulfill(
              orderId,
              razorpayPaymentId || `pay_${Date.now()}`,
              razorpayOrderId,
              signature
            );
          }
        }
        break;
      }

      case 'refund.processed': {
        const refundEntity = event.payload?.refund?.entity;
        const paymentEntity = event.payload?.payment?.entity;
        const orderId = paymentEntity?.notes?.orderId;
        if (orderId) {
          refundOrder(orderId, undefined, `Webhook refund event: ${refundEntity?.id}`);
        }
        break;
      }

      default:
        // Other events ignored
        break;
    }

    return NextResponse.json({ status: 'ok', received: true });
  } catch (err) {
    console.error('Razorpay webhook processing error:', err);
    return NextResponse.json(
      { error: 'Webhook processing exception' },
      { status: 500 }
    );
  }
}
