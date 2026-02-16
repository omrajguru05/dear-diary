"use client";

import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full max-w-[650px] mx-auto py-12 px-4 sm:px-0 mt-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 ui-text text-sm text-taupe">
                <div className="flex gap-6">
                    <a
                        href="https://www.omrajguru.co.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-cinnamon transition-colors"
                    >
                        Om Rajguru
                    </a>
                    <a
                        href="https://www.omrajguru.co.in/recent"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-cinnamon transition-colors"
                    >
                        Recents
                    </a>
                    <a
                        href="https://www.omrajguru.co.in/recents-ships"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-cinnamon transition-colors"
                    >
                        Recent Ships
                    </a>
                </div>
                <div className="text-xs opacity-60">
                    © {new Date().getFullYear()} DearDiary
                </div>
            </div>
        </footer>
    );
}
