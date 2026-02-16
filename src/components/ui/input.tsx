"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
    return (
        <input
            ref={ref}
            className={cn(
                "ui-text flex h-10 w-full rounded-md border border-sand bg-transparent px-3 py-2 text-espresso ring-offset-paper file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-taupe/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cinnamon focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            {...props}
        />
    );
});

Input.displayName = "Input";
