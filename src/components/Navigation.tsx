"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navigation() {
    const pathname = usePathname();

    return (
        <nav className="w-full max-w-[650px] mx-auto py-8 flex items-center justify-between px-4 sm:px-0 font-sans">
            <Link href="/" className="text-xl font-bold font-serif hover:text-cinnamon transition-colors text-espresso">
                Entries of Clock
            </Link>

            <div className="flex items-center gap-6 text-sm font-medium text-taupe">
                <a
                    href="https://omrajguru.co.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cinnamon transition-colors"
                >
                    Main
                </a>
                <a
                    href="https://omrajguru.co.in/recents-ships"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cinnamon transition-colors"
                >
                    Recents
                </a>
            </div>
        </nav>
    );
}
