import { cn } from "@/lib/utils";
import React, { useState, useId } from "react";
import { TbAlertTriangleFilled } from "react-icons/tb";

type CommonProps = {
    placeholder?: string;
    value: string;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    className?: string;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    id?: string;
    autoComplete?: string;
    frontIcon?: React.ReactNode;
    backIcon?: React.ReactNode;
    onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    maxLength?: number;
    minLength?: number;
    error?: string;
    success?: boolean;
    label?: string;
    labelClassName?: string;
    hideLabel?: boolean;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

type TextInputProps = CommonProps & {
    type?: string;
    as?: "input" | "textarea";
    rows?: number;
};

export const TextInput = ({
    type = "text",
    as = "input",
    placeholder = "Enter text",
    value,
    onChange,
    className = "",
    disabled = false,
    required = false,
    name,
    id,
    autoComplete,
    frontIcon,
    backIcon,
    onBlur,
    onFocus,
    maxLength,
    minLength,
    error,
    success,
    label,
    labelClassName = "",
    hideLabel = false,
    onKeyDown,
    rows = 4,
}: TextInputProps) => {
    const [focused, setFocused] = useState(false);
    const generatedId = useId();
    const inputId = id || generatedId;

    const handleFocus = (
        e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFocused(true);
        onFocus?.(e);
    };

    const handleBlur = (
        e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFocused(false);
        onBlur?.(e);
    };

    const getBorderColor = () => {
        if (error) return "border-red-500";
        if (success) return "border-green-500";
        if (focused) return "border-green-600";
        return "border-gray-300";
    };

    const sharedProps = {
        placeholder,
        value,
        onChange,
        disabled,
        required,
        name,
        id: inputId,
        autoComplete,
        maxLength,
        minLength,
        onFocus: handleFocus,
        onKeyDown,
        onBlur: handleBlur,
        "aria-label": hideLabel && label ? label : undefined,
        "aria-invalid": !!error,
        "aria-describedby": error ? `${inputId}-error` : undefined,
        className: cn(
            `w-full bg-white border ${getBorderColor()} rounded-md text-gray-900 leading-6 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-300 ease-in-out placeholder:text-gray-400`,
            as === "textarea"
                ? "py-2 px-3 text-sm md:text-base resize-none"
                : "h-10 md:h-11 3xl:h-12 py-1.5 md:py-2 lg:py-2.5 text-xs md:text-sm lg:text-base",
            `${frontIcon ? "pl-10" : "pl-2 lg:pl-2.5"} ${
                backIcon ? "pr-10" : "pr-2 lg:pr-2.5"
            } ${disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : ""}`
        ),
    };

    return (
        <div className={`w-full ${className}`}>
            {label && !hideLabel && (
                <label
                    htmlFor={inputId}
                    className={cn(
                        "block mb-0.5 lg:mb-1 text-xs sm:text-sm 7xl:text-base font-medium text-gray-700",
                        required && "after:content-['*'] after:ml-1 after:text-red-500",
                        labelClassName
                    )}
                >
                    {label}
                </label>
            )}

            <div className="relative">
                {frontIcon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-gray-500">
                        {frontIcon}
                    </div>
                )}

                {as === "textarea" ? (
                    <textarea rows={rows} {...sharedProps} />
                ) : (
                    <input type={type} {...sharedProps} />
                )}

                {backIcon && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-gray-500">
                        {backIcon}
                    </div>
                )}
            </div>

            {error && (
                <div
                    id={`${inputId}-error`}
                    className="text-red-500 text-xs md:text-sm mt-1 flex items-center gap-2"
                >
                    <TbAlertTriangleFilled className="w-3 h-3 md:w-4 md:h-4" /> {error}
                </div>
            )}
        </div>
    );
};
