"use client";

import { createClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push("/admin");
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-paper px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-sm space-y-8 p-8 bg-paper/50 rounded-xl border border-sand/20 shadow-lg backdrop-blur-sm">
                <div className="text-center">
                    <h1 className="text-3xl font-serif font-bold text-espresso tracking-tight">Access Journal</h1>
                    <p className="ui-text text-sm text-taupe mt-3">Please sign in to continue.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="ui-text text-xs font-medium uppercase tracking-wider text-taupe block ml-1">Email</label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                            className="bg-paper border-sand/30 focus:border-cinnamon focus:ring-cinnamon/20"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="ui-text text-xs font-medium uppercase tracking-wider text-taupe block ml-1">Password</label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            className="bg-paper border-sand/30 focus:border-cinnamon focus:ring-cinnamon/20"
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-900/10 text-red-600 text-sm rounded border border-red-900/20 text-center font-medium">
                            {error}
                        </div>
                    )}

                    <Button type="submit" className="w-full bg-espresso text-paper hover:bg-cinnamon transition-all duration-300 font-sans tracking-wide" disabled={loading}>
                        {loading ? "Authenticating..." : "Enter Journal"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
