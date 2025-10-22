import PUBLIC_AXIOS_CLIENT from "@/lib/axios_clients/public_client";
import { AuthResponse, ResetPasswordFormData } from "@/types/auth";

export const resetPasswordApi = async (
  data: ResetPasswordFormData & { token: string }
): Promise<AuthResponse> => {
  try {
    const response = await PUBLIC_AXIOS_CLIENT.post(
      "/admin/reset-password",
      data
    );
    return {
      success: true,
      message: "Password has been reset successfully.",
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "An unexpected error occurred.",
    };
  }
};
