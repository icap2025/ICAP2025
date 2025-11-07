import PUBLIC_AXIOS_CLIENT from "@/lib/axios_clients/public_client";
import { AuthResponse, ResetPasswordFormData } from "@/types/auth";

export const resetPasswordApi = async (
    data: ResetPasswordFormData & { token: string },
    userType: "admin" | "user" = "user"
): Promise<AuthResponse> => {
    try {
        const endpoint = `/api/auth/reset_password/${data.token}`;

        const response = await PUBLIC_AXIOS_CLIENT.post(
            `${endpoint}?userType=${userType}`,
            { newPassword: data.newPassword }
        );

        return {
            success: true,
            message: response.data.message || "Password has been reset successfully! You can now log in.",
            data: response.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "Failed to reset password. The link may have expired.",
        };
    }
};