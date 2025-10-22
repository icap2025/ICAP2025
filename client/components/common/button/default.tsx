import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?:
        | "primary"
        | "secondary"
        | "success"
        | "warning"
        | "error"
        | "ghost"
        | "neutral";
    size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = "primary", size = "md", className, ...props }, ref) => {
        const baseClasses =
            "rounded-md transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
        
        const variantClasses = {
            primary: `
                bg-green-600 
                hover:bg-green-700 
                active:bg-green-800
                text-white 
                shadow-sm
                focus:ring-green-500
            `,
            secondary: `
                bg-white 
                hover:bg-gray-50 
                active:bg-gray-100
                text-gray-900 
                border 
                border-gray-300
                shadow-sm
                focus:ring-green-500
            `,
            success: `
                bg-emerald-600 
                hover:bg-emerald-700 
                text-white 
                shadow-sm
                focus:ring-emerald-500
            `,
            warning: `
                bg-amber-500 
                hover:bg-amber-600 
                text-white 
                shadow-sm
                focus:ring-amber-500
            `,
            error: `
                bg-red-600 
                hover:bg-red-700 
                text-white 
                shadow-sm
                focus:ring-red-500
            `,
            ghost: `
                bg-transparent 
                hover:bg-green-50 
                active:bg-green-100
                text-green-700
                focus:ring-green-500
            `,
            neutral: `
                bg-white
                hover:bg-gray-50
                active:bg-gray-100
                text-gray-700
                border
                border-gray-300
                shadow-sm
                focus:ring-gray-400
            `,
        };

        const sizeClasses = {
            sm: "px-3 py-1.5 text-xs",
            md: "px-4 py-2 text-sm",
            lg: "px-6 py-3 text-base",
        };

        return (
            <button
                ref={ref}
                className={cn(
                    baseClasses,
                    variantClasses[variant],
                    sizeClasses[size],
                    className
                )}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";
