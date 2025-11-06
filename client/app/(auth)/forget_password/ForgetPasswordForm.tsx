"use client";
import { Button } from "@/components/common/button/default";
import { TextInput } from "@/components/common/input_text_field/default";
import { createAuthSchemas } from "@/lib/auth_functions/AuthValidations";
import { forgetPasswordApi } from "@/services/auth/forgetPassword";
import { ForgetPasswordFormData } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMemo, useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { toast } from "sonner";

export const ForgetPasswordForm = () => {
  const validationT = useCallback((key: string) => key, []);
  const router = useRouter();

  const { forgetPasswordSchema } = useMemo(() => {
    return createAuthSchemas((key: string) => validationT(key));
  }, [validationT]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, touchedFields },
    trigger,
  } = useForm<ForgetPasswordFormData>({
    resolver: zodResolver(forgetPasswordSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgetPasswordFormData) => {
    try {
      const response = await forgetPasswordApi(data);

      if (response.success) {
        toast.success(
          response.message ||
            "Password reset link sent! Please check your email.",
        );
        console.log("Forget password successful:", response);
        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error(
          response.message || "Failed to send reset link. Please try again.",
        );
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Forget password error:", error);
    }
  };

  return (
    <div className="my-10 flex w-full max-w-sm flex-col justify-start overflow-auto bg-transparent p-4">
      <div className="mb-4 text-left">
        <h1 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl lg:text-3xl">
          Forgot Your Password?
        </h1>
        <p className="text-md text-gray-600 dark:text-gray-300 sm:text-base lg:text-lg">
          Please enter your email to receive a password reset link.
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

        <div className="mt-auto pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting || !isValid}
            className="w-full border border-green-700 bg-green-600 font-semibold text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Sending email..." : "Send Password Reset Link"}
          </Button>
        </div>
      </form>
    </div>
  );
};
