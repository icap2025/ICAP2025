import PUBLIC_AXIOS_CLIENT from "@/lib/axios_clients/public_client";
import { AuthResponse, ResetPasswordFormData } from "@/types/auth";

export const resetPasswordApi = async (
    data: ResetPasswordFormData & { token: string },
    userType: "admin" | "user" = "user"
): Promise<AuthResponse> => {
    try {
        const endpoint = userType === "admin"
            ? "/api/admin/reset-password"
            : "/api/user/reset-password";

        const response = await PUBLIC_AXIOS_CLIENT.post(
            `${endpoint}?userType=${userType}`,
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