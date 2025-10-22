import PUBLIC_AXIOS_CLIENT from "@/lib/axios_clients/public_client";
import { AuthResponse, SignupFormData } from "@/types/auth";

export const signupApi = async (
  data: SignupFormData
): Promise<AuthResponse> => {
  try {
    const response = await PUBLIC_AXIOS_CLIENT.post("/company/register", data);
    return {
      success: true,
      message: "Signup successful",
      token: response.data.token,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Unexpected error",
    };
  }
};
