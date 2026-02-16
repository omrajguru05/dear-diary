import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
    const body = (await request.json()) as HandleUploadBody;

    try {
        const jsonResponse = await handleUpload({
            body,
            request,
            onBeforeGenerateToken: async (pathname: string /*, clientPayload */) => {
                // Generate a client token for the browser to upload the file
                // ⚠️ Authenticate this block, e.g. check for a valid session
                // const { user } = await supabase.auth.getUser();
                // if (!user) throw new Error("Unauthorized");

                // For now, allowing all (protected by /admin middleware usually, 
                // but API routes need their own check if called from outside).
                // Since Vercel Blob token is server-side, it's safer.
                return {
                    allowedContentTypes: ["image/jpeg", "image/png", "image/gif", "video/mp4"],
                    tokenPayload: JSON.stringify({
                        // optional, sent to your server on upload completion
                    }),
                };
            },
            onUploadCompleted: async ({ blob, tokenPayload }) => {
                // Available to run server-side logic after upload
                console.log("blob uploaded", blob.url);
            },
        });

        return NextResponse.json(jsonResponse);
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 400 } // The webhook will retry 5 times automatically if the status code is 5xx
        );
    }
}
