"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
    className,
    variant = "primary",
    size = "md",
    ...props
}, ref) => {
    return (
        <button
            ref={ref}
            className={cn(
                "ui-text inline-flex items-center justify-center rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-cinnamon focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
                {
                    "bg-espresso text-paper hover:bg-cinnamon": variant === "primary",
                    "bg-paper border border-sand text-espresso hover:bg-sand": variant === "secondary",
                    "bg-transparent text-espresso hover:bg-sand/20": variant === "ghost",
                    "h-9 px-4 text-sm": size === "sm",
                    "h-10 px-6 text-base": size === "md",
                    "h-12 px-8 text-lg": size === "lg",
                },
                className
            )}
            {...props}
        />
    );
});

Button.displayName = "Button";
