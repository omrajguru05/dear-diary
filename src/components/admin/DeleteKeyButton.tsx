"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteAccessKey } from "@/lib/keys-admin"; // Note: This might need to be a server action or handled via API if not using server actions

// Since I'm creating a client component, I'll use a server action if setup, 
// but for now I'll use a simple delete function and refresh.
// I'll create a dedicated server action file later if needed.

export function DeleteKeyButton({ id }: { id: string }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this access key? This will immediately revoke access.")) return;

        setLoading(true);
        try {
            // In a real app, wrap in a server action. 
            // For now, I'll assume keys-admin has functions that can be used or I'll use an API route.
            const response = await fetch(`/api/admin/keys?id=${id}`, { method: "DELETE" });
            if (response.ok) {
                router.refresh();
            } else {
                alert("Failed to delete key");
            }
        } catch (error) {
            console.error(error);
            alert("Error deleting key");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="p-2 text-taupe hover:text-red-500 transition-colors disabled:opacity-50"
        >
            <Trash2 className="w-4 h-4" />
        </button>
    );
}
