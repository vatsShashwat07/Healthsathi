import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: Request) {
    try {
        const { amount, planId } = await req.json();

        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            return NextResponse.json(
                { error: 'Razorpay keys not configured. Please add them to .env.local' },
                { status: 500 }
            );
        }

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        // Amount must be in the smallest currency unit (paise)
        const options = {
            amount: amount * 100,
            currency: 'INR',
            receipt: `receipt_${Date.now()}_${planId}`,
            payment_capture: 1 // Auto capture
        };

        const order = await razorpay.orders.create(options);

        return NextResponse.json({
            id: order.id,
            currency: order.currency,
            amount: order.amount,
        });
    } catch (error: unknown) {
        console.error("Razorpay Create Order Error:", error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to create order';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
