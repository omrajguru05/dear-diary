"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navigation() {
    const pathname = usePathname();

    return (
        <nav className="w-full max-w-[650px] mx-auto py-8 flex items-center justify-between px-4 sm:px-0">
            <Link href="/" className="text-2xl font-bold font-serif hover:text-cinnamon transition-colors">
                DearDiary.
            </Link>

            <div className="flex items-center gap-6 ui-text text-sm font-medium">
                <Link
                    href="/"
                    className={cn("hover:text-cinnamon transition-colors", pathname === "/" && "text-cinnamon")}
                >
                    Today
                </Link>
                <Link
                    href="/archive"
                    className={cn("hover:text-cinnamon transition-colors", pathname === "/archive" && "text-cinnamon")}
                >
                    Archive
                </Link>
                {/* Hidden Admin Link for now, or subtle */}
                {/* <Link href="/admin" className="text-taupe hover:text-espresso">Admin</Link> */}
            </div>
        </nav>
    );
}
