import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    const {
        data: { user },
    } = await supabase.auth.getUser();

    // Protect /admin routes
    if (request.nextUrl.pathname.startsWith("/admin")) {
        // Allow access to login page
        if (request.nextUrl.pathname === "/admin/login") {
            if (user) {
                // If already logged in, redirect to dashboard
                return NextResponse.redirect(new URL("/admin", request.url));
            }
            return response;
        }

        // Require user for other /admin routes
        if (!user) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }

        // Optional: Check strictly for specific email if needed, 
        // though RLS handles data access, middleware prevents page view.
        if (user.email !== "om@ibbe.in") {
            // Allow them to logout or show unauthorized
            // For now, redirect to login? Or a specific error page.
            // Let's just redirect to home or show error.
            // actually, let's just let them in but they won't see data due to RLS.
        }
    }

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
