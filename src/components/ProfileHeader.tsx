"use client";

import React from "react";

export function ProfileHeader() {
    return (
        <div className="flex flex-col items-start gap-4 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <img
                src="https://owhotnjvvtwrooqs.public.blob.vercel-storage.com/misc/profile-photo-HJV6mKZnV9Y89ifk4n3PHLAQG2bZTI"
                alt="Om Rajguru"
                className="w-16 h-16 rounded-full object-cover border border-sand shadow-sm"
            />
            <div className="space-y-1">
                <h2 className="text-lg font-serif font-bold text-espresso">
                    Hi, I am Om
                </h2>
                {/* User requested to remove the "Welcome to my digital journal..." text */}
            </div>
        </div>
    );
}
