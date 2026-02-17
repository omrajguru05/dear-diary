"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navigation() {
    const pathname = usePathname();

    return (
        <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#1E1A17]/80 border-b border-[#3E3834]/30 transition-all duration-300">
            <div className="w-full max-w-[650px] mx-auto py-6 flex items-center justify-between px-4 sm:px-0 font-sans">
                <Link href="/" className="text-xl font-bold font-serif hover:text-cinnamon transition-colors text-espresso">
                    Entries of Clock
                </Link>

                <div className="flex items-center gap-6 text-sm font-medium text-taupe">
                    <Link
                        href="/almanac"
                        className="hover:text-cinnamon transition-colors"
                    >
                        Almanac
                    </Link>
                </div>
            </div>
        </nav>
    );
}
