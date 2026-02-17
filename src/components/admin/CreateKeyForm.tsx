"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CreateKeyForm() {
    const [name, setName] = useState("");
    const [pin, setPin] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("/api/admin/keys", {
                method: "POST",
                body: JSON.stringify({ name, pin }),
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                setName("");
                setPin("");
                router.refresh();
            } else {
                const err = await response.json();
                alert(err.error || "Failed to create key");
            }
        } catch (error) {
            console.error(error);
            alert("Error creating key");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-paper p-6 rounded-lg border border-sand space-y-4">
            <h2 className="text-lg font-serif font-bold text-espresso">Create Access Key</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-xs font-bold text-taupe uppercase">Name</label>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="User Name"
                        required
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-bold text-taupe uppercase">PIN Code</label>
                    <Input
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        placeholder="Enter PIN"
                        required
                    />
                </div>
            </div>
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                {loading ? "Creating..." : "Add Key"}
            </Button>
        </form>
    );
}
