"use client";
import { Button } from "@/components/common/button/default";
import { TextInput } from "@/components/common/input_text_field/default";
import { createAuthSchemas } from "@/lib/auth_functions/AuthValidations";
import { signupApi } from "@/services/auth/signup";
import { SignupFormData } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "sonner";

export const SignupForm = () => {
  const validationT = (key: string) => key;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const { signupSchema } = useMemo(() => {
    return createAuthSchemas((key: string) => validationT(key));
  }, [validationT]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, touchedFields },
    trigger,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      university: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const response = await signupApi(data);

      if (response.success) {
        toast.success(
          response.message ||
            "Account created successfully! Please check your email for verification link.",
        );
        console.log("Signup successful:", response);
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error(
          response.message || "Registration failed. Please try again.",
        );
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="my-10 flex w-full max-w-sm flex-col justify-start overflow-auto bg-transparent p-4">
      <div className="mb-4 text-left">
        <h1 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl lg:text-3xl">
          Create Your Account
        </h1>
        <p className="text-md text-gray-600 dark:text-gray-300 sm:text-base lg:text-lg">
          Please fill in the details below to create your account.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-1 flex-col gap-4"
      >
        <Controller
          name="fullName"
          control={control}
          render={({ field }) => (
            <TextInput
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={field.value}
              onChange={(e) => {
                field.onChange(e);
              }}
              onBlur={() => {
                field.onBlur();
                trigger("fullName");
              }}
              label="Full Name"
              required
              error={
                touchedFields.fullName ? errors.fullName?.message : undefined
              }
              className="w-full"
            />
          )}
        />

        <Controller
          name="university"
          control={control}
          render={({ field }) => (
            <TextInput
              id="university"
              type="text"
              placeholder="Enter your university name"
              value={field.value || ""}
              onChange={(e) => {
                field.onChange(e);
              }}
              onBlur={() => {
                field.onBlur();
                trigger("university");
              }}
              label="University Name"
              error={
                touchedFields.university
                  ? errors.university?.message
                  : undefined
              }
              className="w-full"
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextInput
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={field.value}
              onChange={(e) => {
                field.onChange(e);
              }}
              onBlur={() => {
                field.onBlur();
                trigger("phone");
              }}
              label="Phone Number"
              required
              error={touchedFields.phone ? errors.phone?.message : undefined}
              className="w-full"
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextInput
              id="email"
              type="email"
              placeholder="Enter your email"
              value={field.value}
              onChange={(e) => {
                field.onChange(e);
              }}
              onBlur={() => {
                field.onBlur();
                trigger("email");
              }}
              label="Email"
              required
              error={touchedFields.email ? errors.email?.message : undefined}
              className="w-full"
            />
          )}
        />

        <div className="relative">
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextInput
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={field.value}
                onChange={(e) => {
                  field.onChange(e);
                }}
                onBlur={() => {
                  field.onBlur();
                  trigger("password");
                  trigger("confirmPassword");
                }}
                label="Password"
                required
                error={
                  touchedFields.password ? errors.password?.message : undefined
                }
                className="w-full"
                backIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-500 transition-colors hover:text-green-600"
                  >
                    {showPassword ? (
                      <FaEye size={18} />
                    ) : (
                      <FaEyeSlash size={18} />
                    )}
                  </button>
                }
              />
            )}
          />
        </div>

        <div className="relative">
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextInput
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="********"
                value={field.value}
                onChange={(e) => {
                  field.onChange(e);
                }}
                onBlur={() => {
                  field.onBlur();
                  trigger("confirmPassword");
                }}
                label="Confirm Password"
                required
                error={
                  touchedFields.confirmPassword
                    ? errors.confirmPassword?.message
                    : undefined
                }
                className="w-full"
                backIcon={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-500 transition-colors hover:text-green-600"
                  >
                    {showConfirmPassword ? (
                      <FaEye size={18} />
                    ) : (
                      <FaEyeSlash size={18} />
                    )}
                  </button>
                }
              />
            )}
          />
        </div>

        <div className="mt-auto pt-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting || !isValid}
            className="w-full border border-green-700 bg-green-600 font-semibold text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </Button>
        </div>

        <div className="pt-2 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-green-600 transition-colors hover:text-green-700 hover:underline"
            >
              Log in here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
