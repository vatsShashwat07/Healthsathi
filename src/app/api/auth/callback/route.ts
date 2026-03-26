import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');
    const next = requestUrl.searchParams.get('next') ?? '/dashboard';

    if (code) {
        const supabase = createClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            // Forward back to Next.js route
            return NextResponse.redirect(new URL(next, request.url));
        } else {
            console.error("OAuth Callback Error:", error.message);
        }
    }

    // Return the user to the login page manually if OAuth setup is broken or denied
    return NextResponse.redirect(new URL('/login?error=Google-Auth-Failed', request.url));
}
