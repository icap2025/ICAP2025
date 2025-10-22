import PUBLIC_AXIOS_CLIENT from "@/lib/axios_clients/public_client";
import { AuthResponse, LoginFormData } from "@/types/auth";

export const loginApi = async (data: LoginFormData): Promise<AuthResponse> => {
  try {
    const response = await PUBLIC_AXIOS_CLIENT.post("/api/auth/login", data);
    return {
      success: true,
      message: "Login successful",
      token: response.data.token,
      data: response.data.data.user,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Unexpected error",
    };
  }
};