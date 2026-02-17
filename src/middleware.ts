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

    // 1. Check for Diary PIN Access
    const accessKeyId = request.cookies.get("diary_access_token")?.value;
    let isDiaryVerified = false;

    if (accessKeyId) {
        // Verify key still exists in DB using secure RPC for "insane" security/instant revocation
        const { data: isValid } = await supabase
            .rpc('check_access_id', { p_id: accessKeyId });

        if (isValid) {
            isDiaryVerified = true;
        }
    }

    const protectedDiaryPaths = ["/", "/almanac", "/e"];
    const isProtectedDiaryPath = protectedDiaryPaths.some(path =>
        request.nextUrl.pathname === path || request.nextUrl.pathname.startsWith(path + "/")
    );

    // If not verified and trying to access diary content, redirect to unlock
    if (!isDiaryVerified && isProtectedDiaryPath) {
        // Don't redirect if it's an admin route (handled below) or other exceptions
        if (!request.nextUrl.pathname.startsWith("/admin") &&
            !request.nextUrl.pathname.startsWith("/api") &&
            request.nextUrl.pathname !== "/unlock") {
            return NextResponse.redirect(new URL("/unlock", request.url));
        }
    }

    // If already verified and trying to access /unlock, redirect to home
    if (isDiaryVerified && request.nextUrl.pathname === "/unlock") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // 2. Protect /admin routes
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
