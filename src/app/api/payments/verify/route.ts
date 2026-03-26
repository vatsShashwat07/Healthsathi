import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createAdminClient } from '@/utils/supabase/admin';

export async function POST(req: Request) {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            userId
        } = await req.json();

        if (!process.env.RAZORPAY_KEY_SECRET) {
            return NextResponse.json(
                { error: 'Razorpay secret key not configured.' },
                { status: 500 }
            );
        }

        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + '|' + razorpay_payment_id)
            .digest('hex');

        if (generatedSignature !== razorpay_signature) {
            return NextResponse.json({ error: 'Payment signature forgery detected' }, { status: 400 });
        }

        // Signature is valid. Update the user in Supabase.
        if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
            console.error('SUPABASE_SERVICE_ROLE_KEY is missing. Payment succeeded but DB was not updated.');
            // Allow frontend to succeed visually, but warn logs.
            return NextResponse.json({ success: true, warning: 'Service key missing' });
        }

        const supabaseAdmin = createAdminClient();

        // Upgrade profile to premium (or family plan later if we differentiate)
        const { error } = await supabaseAdmin
            .from('profiles')
            .update({ is_premium: true })
            .eq('id', userId);

        if (error) {
            console.error('Supabase Profile Update Error:', error);
            return NextResponse.json({ error: 'Payment verified, but failed to upgrade profile data' }, { status: 500 });
        }

        return NextResponse.json({ success: true });

    } catch (error: unknown) {
        console.error("Razorpay Verify Error:", error);
        const errorMessage = error instanceof Error ? error.message : 'Verification failed';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
