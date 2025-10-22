"use client";
import React, { useMemo } from "react";
import { FaUser } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { TextInput } from "@/components/common/input_text_field/default";
import { Button } from "@/components/common/button/default";
import { createAuthSchemas } from "@/lib/auth_functions/AuthValidations";
import { ForgetPasswordFormData } from "@/types/auth";
import { forgetPasswordApi } from "@/services/auth/forgetPassword";

export const ForgetPasswordForm = () => {
  const validationT = (key: string) => key;

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
        toast.success(response.message);
        console.log("Forget password successful:", response);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Forget password error:", error);
    }
  };

  return (
    <div className="w-full max-w-sm my-10 flex flex-col justify-start bg-transparent p-4 overflow-auto">
      <div className="text-left mb-4">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white mb-2">
          Forgot Your Password?
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-md sm:text-base lg:text-lg">
          Please enter your email to receive a password reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col gap-4">
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
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-green-700"
          >
            {isSubmitting ? "Sending email..." : "Send Password Reset Link"}
          </Button>
        </div>
      </form>
    </div>
  );
};