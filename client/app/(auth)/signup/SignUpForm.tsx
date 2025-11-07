"use client";
import { Button } from "@/components/common/button/default";
import { ImageUpload } from "@/components/common/image-upload/ImageUpload";
import { TextInput } from "@/components/common/input_text_field/default";
import { SelectInput } from "@/components/common/select/SelectInput";
import { createAuthSchemas } from "@/lib/auth_functions/AuthValidations";
import { signupApi } from "@/services/auth/signup";
import { SignupFormData } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  FaBriefcase,
  FaBuilding,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaFileAlt,
  FaPhone,
  FaUser,
  FaUserTie,
} from "react-icons/fa";
import { toast } from "sonner";

export const SignupForm = () => {
  const validationT = useCallback((key: string) => key, []);
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
      Name: "",
      affiliation: "",
      designation: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      profilePic: undefined,
      abstractID: "",
      abstractTitle: "",
      participationCategory: undefined as
        | "Oral"
        | "Poster"
        | "Only Attendee"
        | "Online/Virtual"
        | undefined,
      registrationCategory: undefined as
        | "International Student"
        | "International Professionals"
        | "Local Professionals"
        | "Local Student"
        | undefined,
      presenterName: "",
    },
  });

  const participationOptions = [
    { value: "Oral", label: "Oral Presentation" },
    { value: "Poster", label: "Poster Presentation" },
    { value: "Only Attendee", label: "Only Attendee" },
    { value: "Online/Virtual", label: "Online/Virtual" },
  ];

  const registrationOptions = [
    { value: "International Student", label: "International Student" },
    {
      value: "International Professionals",
      label: "International Professionals",
    },
    { value: "Local Professionals", label: "Local Professionals" },
    { value: "Local Student", label: "Local Student" },
  ];

  const onSubmit = async (data: SignupFormData) => {
    // console.log("Form submitted with data:", data);
    try {
      const response = await signupApi(data);
      // console.log("API response:", response);

      if (response.success) {
        toast.success(
            "Account created successfully! Please check your email for verification link.",
        );
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error(
          response.message || "Registration failed. Please try again.",
        );
        // console.error("Signup failed:", response);
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="my-10 flex w-full max-w-4xl flex-col justify-start overflow-auto bg-transparent p-6 shadow-md">
      <div className="mb-6 text-center">
        <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl lg:text-4xl">
          Registration
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-300 sm:text-lg">
          Please complete all required fields to register for ICAP 2025
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-1 flex-col gap-6"
      >
        {/* Personal Information Section */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
            <FaUser className="text-green-600" />
            Personal Information
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Controller
              name="Name"
              control={control}
              render={({ field }) => (
                <TextInput
                  id="Name"
                  type="text"
                  placeholder="Full Name"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  onBlur={() => {
                    field.onBlur();
                    trigger("Name");
                  }}
                  label="Full Name"
                  required
                  error={touchedFields.Name ? errors.Name?.message : undefined}
                  className="w-full"
                  frontIcon={<FaUser size={14} className="text-gray-500" />}
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
                  placeholder="name@sust.edu"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  onBlur={() => {
                    field.onBlur();
                    trigger("email");
                  }}
                  label="Email Address"
                  required
                  error={
                    touchedFields.email ? errors.email?.message : undefined
                  }
                  className="w-full"
                  frontIcon={<FaEnvelope size={14} className="text-gray-500" />}
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
                  placeholder="Phone Number"
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
                  error={
                    touchedFields.phone ? errors.phone?.message : undefined
                  }
                  className="w-full"
                  frontIcon={<FaPhone size={14} className="text-gray-500" />}
                />
              )}
            />

            <Controller
              name="affiliation"
              control={control}
              render={({ field }) => (
                <TextInput
                  id="affiliation"
                  type="text"
                  placeholder="Shahjalal University of Science and Technology (SUST)"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  onBlur={() => {
                    field.onBlur();
                    trigger("affiliation");
                  }}
                  label="Affiliation / Institution"
                  required
                  error={
                    touchedFields.affiliation
                      ? errors.affiliation?.message
                      : undefined
                  }
                  className="w-full"
                  frontIcon={<FaBuilding size={14} className="text-gray-500" />}
                />
              )}
            />

            <Controller
              name="designation"
              control={control}
              render={({ field }) => (
                <TextInput
                  id="designation"
                  type="text"
                  placeholder="Undergraduate Student, Department of Software Engineering"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  onBlur={() => {
                    field.onBlur();
                    trigger("designation");
                  }}
                  label="Designation / Position"
                  required
                  error={
                    touchedFields.designation
                      ? errors.designation?.message
                      : undefined
                  }
                  className="w-full"
                  frontIcon={
                    <FaBriefcase size={14} className="text-gray-500" />
                  }
                />
              )}
            />

            <div className="md:col-span-2">
              <Controller
                name="profilePic"
                control={control}
                render={({ field }) => (
                  <ImageUpload
                    value={field.value}
                    onChange={field.onChange}
                    label="Profile Picture"
                    error={errors.profilePic?.message}
                  />
                )}
              />
            </div>
          </div>
        </div>

        {/* Abstract / Research Details Section */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
            <FaFileAlt className="text-green-600" />
            Abstract / Research Details
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Controller
              name="abstractID"
              control={control}
              render={({ field }) => (
                <TextInput
                  id="abstractID"
                  type="text"
                  placeholder="ABS-2025-001"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  onBlur={() => {
                    field.onBlur();
                    trigger("abstractID");
                  }}
                  label="Abstract ID / CMT Serial"
                  required
                  error={
                    touchedFields.abstractID
                      ? errors.abstractID?.message
                      : undefined
                  }
                  className="w-full"
                />
              )}
            />

            <Controller
              name="presenterName"
              control={control}
              render={({ field }) => (
                <TextInput
                  id="presenterName"
                  type="text"
                  placeholder="Full Name"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  onBlur={() => {
                    field.onBlur();
                    trigger("presenterName");
                  }}
                  label="Presenter Name"
                  required
                  error={
                    touchedFields.presenterName
                      ? errors.presenterName?.message
                      : undefined
                  }
                  className="w-full"
                  frontIcon={<FaUserTie size={14} className="text-gray-500" />}
                />
              )}
            />

            <div className="md:col-span-2">
              <Controller
                name="abstractTitle"
                control={control}
                render={({ field }) => (
                  <TextInput
                    id="abstractTitle"
                    type="text"
                    placeholder="Abstract Title"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    onBlur={() => {
                      field.onBlur();
                      trigger("abstractTitle");
                    }}
                    label="Abstract Title"
                    required
                    error={
                      touchedFields.abstractTitle
                        ? errors.abstractTitle?.message
                        : undefined
                    }
                    className="w-full"
                  />
                )}
              />
            </div>

            <Controller
              name="participationCategory"
              control={control}
              render={({ field }) => (
                <SelectInput
                  id="participationCategory"
                  label="Participation Category"
                  value={field.value ?? ""}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  onBlur={() => {
                    field.onBlur();
                    trigger("participationCategory");
                  }}
                  options={participationOptions}
                  required
                  error={
                    touchedFields.participationCategory
                      ? errors.participationCategory?.message
                      : undefined
                  }
                  placeholder="Select presentation type"
                />
              )}
            />

            <Controller
              name="registrationCategory"
              control={control}
              render={({ field }) => (
                <SelectInput
                  id="registrationCategory"
                  label="Registration Category"
                  value={field.value ?? ""}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  onBlur={() => {
                    field.onBlur();
                    trigger("registrationCategory");
                  }}
                  options={registrationOptions}
                  required
                  error={
                    touchedFields.registrationCategory
                      ? errors.registrationCategory?.message
                      : undefined
                  }
                  placeholder="Select registration type"
                />
              )}
            />
          </div>
        </div>

        {/* Security Section */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            Account Security
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
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
                    touchedFields.password
                      ? errors.password?.message
                      : undefined
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

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <TextInput
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
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
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
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
        </div>

        {/* Submit Button */}
        <div className="pt-4">
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
