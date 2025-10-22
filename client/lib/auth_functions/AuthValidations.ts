import { z } from "zod";

export const createAuthSchemas = (validationT: (key: string) => string) => {
    const loginSchema =
        z.object({
            email: z
                .string()
                .min(1, validationT("Email is required"))
                .email(validationT("Please enter a valid email")),
            password: z.string().min(1, validationT("Password is required")),
        });

    const signupSchema =
        z.object({
            fullName: z
                .string()
                .min(1, validationT("Full name is required"))
                .min(2, validationT("Full name must be at least 2 characters"))
                .max(50, validationT("Full name must be no more than 50 characters")),
            companyName: z
                .string()
                .min(1, validationT("Company name is required"))
                .max(100, validationT("Company name must be no more than 100 characters")),
            email: z
                .string()
                .min(1, validationT("Email is required"))
                .email(validationT("Please enter a valid email")),
            password: z
                .string()
                .min(1, validationT("Password is required"))
                .regex(/[a-z]/, validationT("Password must contain at least one lowercase letter"))
                .regex(/[A-Z]/, validationT("Password must contain at least one uppercase letter"))
                .regex(/[0-9]/, validationT("Password must contain at least one number"))
                .regex(
                    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
                    validationT("Password must contain at least one special character")
                )
                .min(8, validationT("Password must be at least 8 characters"))
                .max(32, validationT("Password must be no more than 32 characters")),
            confirmPassword: z.string().min(1, validationT("Please confirm your password")),
        })
            .refine((data) => data.password === data.confirmPassword, {
                message: validationT("Password does not match"),
                path: ["confirmPassword"],
            });

    const forgetPasswordSchema =
        z.object({
            email: z
                .string()
                .min(1, validationT("Email is required"))
                .email(validationT("Please enter a valid email")),
        });

    const resetPasswordSchema =
        z.object({
            newPassword: z
                .string()
                .min(1, validationT("New password is required"))
                .regex(/[a-z]/, validationT("Password must contain at least one lowercase letter"))
                .regex(/[A-Z]/, validationT("Password must contain at least one uppercase letter"))
                .regex(/[0-9]/, validationT("Password must contain at least one number"))
                .regex(
                    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
                    validationT("Password must contain at least one special character")
                )
                .min(8, validationT("Password must be at least 8 characters"))
                .max(32, validationT("Password must be no more than 32 characters")),
            confirmNewPassword: z.string().min(1, validationT("Please confirm your password")),
        })
            .refine((data) => data.newPassword === data.confirmNewPassword, {
                message: validationT("Password does not match"),
                path: ["confirmNewPassword"],
            });
    return {
        loginSchema,
        signupSchema,
        forgetPasswordSchema,
        resetPasswordSchema,
    };
};