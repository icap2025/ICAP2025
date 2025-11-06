"use client";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { TextInput } from "@/components/common/input_text_field/default";
import { Button } from "@/components/common/button/default";
import { createAuthSchemas } from "@/lib/auth_functions/AuthValidations";
import { LoginFormData } from "@/types/auth";
import { useRouter } from "next/navigation";
import { loginAction } from "@/actions/auth.action";
import { useAuth } from "@/contexts/AuthContext";
import { setUserDataCookies } from "@/lib/auth";

export const LogInForm = () => {
  const validationT = useCallback((key: string) => key, []);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { isLoggedIn, refreshAuth } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [isLoggedIn, router]);

  const { loginSchema } = useMemo(() => {
    return createAuthSchemas((key: string) => validationT(key));
  }, [validationT]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, touchedFields },
    trigger,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginAction(data);

      if (response.success && response.data && response.token) {
        // Ensure client-side cookies are also set
        setUserDataCookies(response.data, response.token);
        
        toast.success(response.message);
        
        // Small delay to ensure cookies are set before navigation
        setTimeout(() => {
          // Refresh auth context to update state
          refreshAuth();
          // Navigate to dashboard
          router.push("/dashboard");
          router.refresh();
        }, 100);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="w-full max-w-sm my-10 flex flex-col justify-start bg-transparent p-4 overflow-auto">
      <div className="text-left mb-4">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white mb-2">
          Log In to Your Account
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-md sm:text-base lg:text-lg">
          Please log in to your account to continue.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-1 flex-col gap-4"
      >
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
              frontIcon={<FaUser size={14} className="text-gray-500" />}
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
                    className="text-gray-500 hover:text-green-600 transition-colors"
                  >
                    {showPassword ? (
                      <FaEye size={18} />
                    ) : (
                      <FaEyeSlash size={18} />
                    )}
                  </button>
                }
                frontIcon={<FaLock size={14} className="text-gray-500" />}
              />
            )}
          />
          <div className="mt-2 text-right">
            <Link
              href="/forget_password"
              className="text-green-600 hover:text-green-700 text-sm font-medium transition-colors hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        <div className="mt-auto pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting || !isValid}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-green-700"
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </Button>
        </div>

        <div className="pt-2 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-green-600 hover:text-green-700 font-medium transition-colors hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
