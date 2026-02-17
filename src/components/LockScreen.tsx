"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Lock } from "lucide-react";

export function LockScreen() {
    const [name, setName] = useState("");
    const [pin, setPin] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleUnlock = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/verify-pin", {
                method: "POST",
                body: JSON.stringify({ name, pin }),
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                router.refresh(); // Refresh to let middleware re-check
                // Next.js will re-run middleware and show the protected content
                window.location.href = "/";
            } else {
                const data = await response.json();
                setError(data.error || "Broke the seal. Try again.");
            }
        } catch (err) {
            setError("Something went wrong. The clock is ticking.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background">
            {/* Background Decor */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cinnamon/10 blur-[100px] rounded-full" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-espresso/10 blur-[100px] rounded-full" />
            </div>

            <div className="w-full max-w-md relative animate-in fade-in zoom-in duration-500">
                <div className="backdrop-blur-xl bg-sand/10 border border-sand/20 rounded-3xl p-8 shadow-2xl space-y-8">
                    <div className="text-center space-y-4">
                        <div className="inline-flex p-4 rounded-full bg-sand/20 text-cinnamon mb-2">
                            <Lock className="w-8 h-8" />
                        </div>
                        <h1 className="text-3xl font-serif font-bold text-espresso">Entries of Clock</h1>
                        <p className="ui-text text-taupe">This journal is locked. Please reveal your identity.</p>
                    </div>

                    <form onSubmit={handleUnlock} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-taupe uppercase tracking-widest pl-1">Name</label>
                                <Input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Who are you?"
                                    className="bg-paper/50 border-sand/30 focus:border-cinnamon/50 h-12"
                                    autoComplete="name"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-taupe uppercase tracking-widest pl-1">PIN Code</label>
                                <Input
                                    type="password"
                                    value={pin}
                                    onChange={(e) => setPin(e.target.value)}
                                    placeholder="••••"
                                    className="bg-paper/50 border-sand/30 focus:border-cinnamon/50 h-12 text-center text-2xl tracking-[0.5em]"
                                    maxLength={10}
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <p className="text-cinnamon text-sm text-center animate-shake italic">{error}</p>
                        )}

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 bg-espresso text-paper hover:bg-cinnamon transition-all duration-300 font-bold text-lg rounded-xl shadow-lg hover:shadow-cinnamon/20"
                        >
                            {loading ? "Unlocking..." : "Unlock Journal"}
                        </Button>
                    </form>

                    <p className="text-center text-[10px] text-taupe/40 uppercase tracking-[0.2em]">
                        Secured by Almanac
                    </p>
                </div>
            </div>
        </div>
    );
}
