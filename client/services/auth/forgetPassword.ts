import PUBLIC_AXIOS_CLIENT from "@/lib/axios_clients/public_client";
import { AuthResponse, ForgetPasswordFormData } from "@/types/auth";

export const forgetPasswordApi = async (data: ForgetPasswordFormData): Promise<AuthResponse> => {
  try {
    const response = await PUBLIC_AXIOS_CLIENT.post("/admin/forgot-password", data);
    return {
      success: true,
      message: "Password reset link sent successfully.",
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "An unexpected error occurred.",
    };
  }
};