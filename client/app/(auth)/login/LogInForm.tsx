"use client";
import { loginAction } from "@/actions/auth.action";
import { Button } from "@/components/common/button/default";
import { TextInput } from "@/components/common/input_text_field/default";
import { useAuth } from "@/contexts/AuthContext";
import { setAdminDataCookies, setUserDataCookies } from "@/lib/auth";
import { createAuthSchemas } from "@/lib/auth_functions/AuthValidations";
import { LoginFormData } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { toast } from "sonner";

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
        // Check if user is admin
        const isAdmin = (response as any).isAdmin === true;

        if (isAdmin) {
          // Set admin cookies
          setAdminDataCookies(response.data as any, response.token);
          toast.success(response.message || "Admin login successful!");

          // Navigate to admin dashboard
          setTimeout(() => {
            router.push("/admin/users");
            router.refresh();
          }, 100);
        } else {
          // Set user cookies
          setUserDataCookies(response.data, response.token);
          toast.success(response.message);

          // Navigate to user dashboard
          setTimeout(() => {
            refreshAuth();
            router.push("/dashboard");
            router.refresh();
          }, 100);
        }
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="my-10 flex w-full max-w-sm flex-col justify-start overflow-auto bg-transparent p-4">
      <div className="mb-4 text-left">
        <h1 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl lg:text-3xl">
          Log In to Your Account
        </h1>
        <p className="text-md text-gray-600 dark:text-gray-300 sm:text-base lg:text-lg">
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
                    className="text-gray-500 transition-colors hover:text-green-600"
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
              className="text-sm font-medium text-green-600 transition-colors hover:text-green-700 hover:underline"
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
            className="w-full border border-green-700 bg-green-600 font-semibold text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </Button>
        </div>

        <div className="pt-2 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-green-600 transition-colors hover:text-green-700 hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
