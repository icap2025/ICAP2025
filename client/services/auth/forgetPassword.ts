import PUBLIC_AXIOS_CLIENT from "@/lib/axios_clients/public_client";
import { AuthResponse, ForgetPasswordFormData } from "@/types/auth";

export const forgetPasswordApi = async (
    data: ForgetPasswordFormData,
    userType: "admin" | "user" = "user"
): Promise<AuthResponse> => {
    try {
        const endpoint = userType === "admin"
            ? "/api/admin/forgot-password"
            : "/api/user/forgot-password";

        const response = await PUBLIC_AXIOS_CLIENT.post(
            `${endpoint}?userType=${userType}`,
            data
        );

        return {
            success: true,
            message: response.data.message || "Password reset link sent successfully.",
            data: response.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "An unexpected error occurred.",
        };
    }
};