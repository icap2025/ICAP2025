"use client";

import { Button } from "@/components/common/button/default";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setStatus("error");
        setMessage("Verification token is missing");
        toast.error("Verification token is missing");
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/api/auth/verify-email/${token}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        const result = await response.json();

        if (response.ok) {
          setStatus("success");
          setMessage(result.message || "Email verified successfully!");
          toast.success("Email verified successfully! You can now log in.");
        } else {
          setStatus("error");
          setMessage(result.message || "Email verification failed");
          toast.error(result.message || "Email verification failed");
        }
      } catch (error) {
        setStatus("error");
        setMessage("An unexpected error occurred during verification");
        toast.error("An unexpected error occurred during verification");
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white via-[#F6FFFC] to-[#E9FDF7] px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <div className="flex flex-col items-center text-center">
          {status === "loading" && (
            <>
              <Loader2 className="mb-4 h-16 w-16 animate-spin text-primary" />
              <h1 className="mb-2 text-2xl font-bold text-gray-900">
                Verifying Your Email
              </h1>
              <p className="text-gray-600">
                Please wait while we verify your email address...
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle className="mb-4 h-16 w-16 text-green-600" />
              <h1 className="mb-2 text-2xl font-bold text-gray-900">
                Email Verified!
              </h1>
              <p className="mb-6 text-gray-600">{message}</p>
              <Button
                onClick={() => router.push("/login")}
                variant="primary"
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Continue to Login
              </Button>
            </>
          )}

          {status === "error" && (
            <>
              <XCircle className="mb-4 h-16 w-16 text-red-600" />
              <h1 className="mb-2 text-2xl font-bold text-gray-900">
                Verification Failed
              </h1>
              <p className="mb-6 text-gray-600">{message}</p>
              <div className="flex w-full gap-3">
                <Button
                  onClick={() => router.push("/signup")}
                  variant="secondary"
                  size="lg"
                  className="flex-1"
                >
                  Sign Up Again
                </Button>
                <Button
                  onClick={() => router.push("/login")}
                  variant="primary"
                  size="lg"
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Go to Login
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
