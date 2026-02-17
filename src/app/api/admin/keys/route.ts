import { NextResponse } from "next/server";
import { createAccessKey, deleteAccessKey, getAccessKeys } from "@/lib/keys-admin";

export async function GET() {
    const keys = await getAccessKeys();
    return NextResponse.json(keys);
}

export async function POST(request: Request) {
    try {
        const { name, pin } = await request.json();
        if (!name || !pin) {
            return NextResponse.json({ error: "Name and PIN are required" }, { status: 400 });
        }
        const key = await createAccessKey(name, pin);
        return NextResponse.json(key);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
        return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    try {
        await deleteAccessKey(id);
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
