"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import { Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DeleteEntry({ id }: { id: string }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this entry? This cannot be undone.")) {
            return;
        }

        setLoading(true);

        try {
            const { error } = await supabase
                .from("entries")
                .delete()
                .eq("id", id);

            if (error) {
                alert("Error deleting entry: " + error.message);
            } else {
                router.refresh();
            }
        } catch (err: any) {
            alert("Unexpected error: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            disabled={loading}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
        >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            <span className="sr-only">Delete</span>
        </Button>
    );
}
