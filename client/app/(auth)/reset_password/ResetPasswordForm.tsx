"use client";
import { Button } from "@/components/common/button/default";
import { TextInput } from "@/components/common/input_text_field/default";
import { createAuthSchemas } from "@/lib/auth_functions/AuthValidations";
import { resetPasswordApi } from "@/services/auth/resetPassword";
import { ResetPasswordFormData } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "sonner";

export const ResetPasswordForm = () => {
  const validationT = (key: string) => key;
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const router = useRouter();

  const { resetPasswordSchema } = useMemo(() => {
    return createAuthSchemas((key: string) => validationT(key));
  }, [validationT]);

  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, touchedFields },
    trigger,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      if (!token) {
        toast.error(
          "Reset token is missing. Please use the link from your email.",
        );
        return;
      }

      const response = await resetPasswordApi({ ...data, token });

      if (response.success) {
        toast.success(
          response.message ||
            "Password reset successfully! You can now log in.",
        );
        console.log("Reset password successful:", response);
        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error(
          response.message || "Failed to reset password. Please try again.",
        );
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Reset password error:", error);
    }
  };

  return (
    <div className="my-10 flex w-full max-w-sm flex-col justify-start overflow-auto bg-transparent p-4">
      <div className="mb-4 text-left">
        <h1 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl lg:text-3xl">
          Reset Your Password
        </h1>
        <p className="text-md text-gray-600 dark:text-gray-300 sm:text-base lg:text-lg">
          Please enter your new password below.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-1 flex-col gap-4"
      >
        <div className="relative">
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <TextInput
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={field.value}
                onChange={(e) => {
                  field.onChange(e);
                }}
                onBlur={() => {
                  field.onBlur();
                  trigger("newPassword");
                  trigger("confirmNewPassword");
                }}
                label="New Password"
                required
                error={
                  touchedFields.newPassword
                    ? errors.newPassword?.message
                    : undefined
                }
                className="w-full"
                backIcon={
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="text-gray-500 transition-colors hover:text-green-600"
                  >
                    {showNewPassword ? (
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
            name="confirmNewPassword"
            control={control}
            render={({ field }) => (
              <TextInput
                id="confirm-new-password"
                type={showConfirmNewPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={field.value}
                onChange={(e) => {
                  field.onChange(e);
                }}
                onBlur={() => {
                  field.onBlur();
                  trigger("confirmNewPassword");
                }}
                label="Confirm New Password"
                required
                error={
                  touchedFields.confirmNewPassword
                    ? errors.confirmNewPassword?.message
                    : undefined
                }
                className="w-full"
                backIcon={
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmNewPassword(!showConfirmNewPassword)
                    }
                    className="text-gray-500 transition-colors hover:text-green-600"
                  >
                    {showConfirmNewPassword ? (
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
            {isSubmitting ? "Resetting password..." : "Reset Password"}
          </Button>
        </div>
      </form>
    </div>
  );
};
