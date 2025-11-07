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
            Name: z
                .string()
                .min(2, validationT("Full name must be at least 2 characters"))
                .max(100, validationT("Full name must be no more than 100 characters")),
            affiliation: z
                .string()
                .min(2, validationT("Affiliation/Institution must be at least 2 characters"))
                .max(200, validationT("Affiliation must be no more than 200 characters")),
            designation: z
                .string()
                .min(2, validationT("Designation/Position must be at least 2 characters"))
                .max(100, validationT("Designation must be no more than 100 characters")),
            phone: z
                .string()
                .min(10, validationT("Phone number must be at least 10 characters"))
                .regex(/^\+?[0-9\s\-()]+$/, validationT("Please enter a valid phone number")),
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
            profilePic: z.string().optional(),
            abstractID: z
                .string()
                .min(2, validationT("Abstract ID must be at least 2 characters"))
                .max(50, validationT("Abstract ID must be no more than 50 characters")),
            abstractTitle: z
                .string()
                .min(5, validationT("Abstract title must be at least 5 characters"))
                .max(300, validationT("Abstract title must be no more than 300 characters")),
            participationCategory: z.enum(['Oral', 'Poster', 'Only Attendee', 'Online/Virtual'], {
                message: validationT("Please select a participation category")
            }),
            registrationCategory: z.enum(['International Student', 'International Professionals', 'Local Professionals', 'Local Student'], {
                message: validationT("Please select a registration category")
            }),
            presenterName: z
                .string()
                .min(2, validationT("Presenter name must be at least 2 characters"))
                .max(100, validationT("Presenter name must be no more than 100 characters")),
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