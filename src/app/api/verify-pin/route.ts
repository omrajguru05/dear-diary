import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        const { name, pin } = await request.json();

        if (!name || !pin) {
            return NextResponse.json({ error: "Name and PIN are required" }, { status: 400 });
        }

        // Initialize inside handler to avoid build-time env issues
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        // Verify against DB using secure RPC
        const { data: matchedRecords, error } = await supabase
            .rpc('verify_access_pin', { p_name: name, p_pin: pin });

        if (error || !matchedRecords || matchedRecords.length === 0) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const matchedKeyId = matchedRecords[0].id;

        // Set persistent session cookie
        const cookieStore = await cookies();
        cookieStore.set("diary_access_token", matchedKeyId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Verification error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
