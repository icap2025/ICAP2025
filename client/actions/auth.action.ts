"use server";

import { cookies } from "next/headers";
import { AuthResponse, LoginFormData } from "@/types/auth";
import axios from "axios";
import { BACKEND_URL } from "@/lib/const";
import { COOKIE_KEYS } from "@/lib/cookies";

export const loginAction = async (
  data: LoginFormData
): Promise<AuthResponse> => {
  try {
    // const response = await PUBLIC_AXIOS_CLIENT.post("/admin/login", data);
    console.log(data)
    const response = {
      data: {
        user: {
          app_token: "sample_token_123456",
          full_name: "John",
          email: "john.doe@example.com",
          profile_pic: "https://example.com/profile-pic.jpg",
        },
      },
    }; // Mocked response for demonstration

    const token = response.data?.user?.app_token;
    const cookieStore = await cookies();

    if (token) {
      cookieStore.set(COOKIE_KEYS.USER.TOKEN, token);
    } else {
      return {
        success: false,
        message: "Error: Token not provided",
      };
    }

    cookieStore.set(
      COOKIE_KEYS.USER.FULL_NAME,
      response.data?.user?.full_name || ""
    );
    cookieStore.set(COOKIE_KEYS.USER.EMAIL, response.data?.user?.email || "");
    cookieStore.set(COOKIE_KEYS.USER.PROFILE_PIC, response.data?.user?.profile_pic || "");

    console.log("token set in cookies:", {
      [COOKIE_KEYS.USER.TOKEN]: cookieStore.get(COOKIE_KEYS.USER.TOKEN)
        ?.value,
      [COOKIE_KEYS.USER.FULL_NAME]: cookieStore.get(
        COOKIE_KEYS.USER.FULL_NAME
      )?.value,
      [COOKIE_KEYS.USER.EMAIL]: cookieStore.get(COOKIE_KEYS.USER.EMAIL)
        ?.value,
      [COOKIE_KEYS.USER.PROFILE_PIC]: cookieStore.get(COOKIE_KEYS.USER.PROFILE_PIC)
        ?.value,
    });

    return {
      success: true,
      message: "Login successful",
      token,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Unexpected error occurred",
    };
  }
};

export const logoutAction = async (): Promise<AuthResponse> => {
  const cookieStore = await cookies();

  try {
    await axios.post(
      BACKEND_URL + "/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${
            (await cookies()).get(COOKIE_KEYS.USER.TOKEN)?.value
          }`,
        },
      }
    );

    cookieStore.delete(COOKIE_KEYS.USER.TOKEN);
    cookieStore.delete(COOKIE_KEYS.USER.FULL_NAME);
    cookieStore.delete(COOKIE_KEYS.USER.EMAIL);
    cookieStore.delete(COOKIE_KEYS.USER.PROFILE_PIC);

    return {
      success: true,
      message: "Logged out successfully",
    };
  } catch (error: any) {
    console.error("Logout error:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Unexpected error occurred",
    };
  }
};
