"use client";
import React, { useState, useMemo } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { TextInput } from "@/components/common/input_text_field/default";
import { Button } from "@/components/common/button/default";
import { createAuthSchemas } from "@/lib/auth_functions/AuthValidations";
import { ResetPasswordFormData } from "@/types/auth";
import { resetPasswordApi } from "@/services/auth/resetPassword";

export const ResetPasswordForm = () => {
  const validationT = (key: string) => key;
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

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
      const response = await resetPasswordApi({ ...data, token });

      if (response.success) {
        toast.success(response.message);
        console.log("Reset password successful:", response);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Reset password error:", error);
    }
  };

  return (
    <div className="w-full max-w-sm my-10 flex flex-col justify-start bg-transparent p-4 overflow-auto">
      <div className="text-left mb-4">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white mb-2">
          Reset Your Password
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-md sm:text-base lg:text-lg">
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
                    className="text-gray-500 hover:text-green-600 transition-colors"
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
                    className="text-gray-500 hover:text-green-600 transition-colors"
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
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-green-700"
          >
            {isSubmitting ? "Resetting password..." : "Reset Password"}
          </Button>
        </div>
      </form>
    </div>
  );
};
