"use server";

import { COOKIE_KEYS } from "@/lib/cookies";
import { LoginFormData } from "@/types/auth";
import { cookies } from "next/headers";

export async function loginAction(data: LoginFormData) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Login failed. Please check your credentials.",
      };
    }

    // Set cookies
    const cookieStore = await cookies();
    const user = result.data.user;
    
    // Set httpOnly token for server-side authentication
    cookieStore.set(COOKIE_KEYS.USER.TOKEN, result.token, {
      httpOnly: false, // Allow client-side access
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // Set individual user data cookies (client-accessible for useAuth)
    cookieStore.set(COOKIE_KEYS.USER.ID, user._id, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });
    
    cookieStore.set(COOKIE_KEYS.USER.FULL_NAME, user.Name || "User", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });
    
    cookieStore.set(COOKIE_KEYS.USER.EMAIL, user.email, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });
    
    // DON'T store profilePic in cookies - it's too large (base64 image)
    // The profilePic will be stored in localStorage by setUserDataCookies() on the client side
    
    if (user.payment_status !== undefined) {
      cookieStore.set(COOKIE_KEYS.USER.PAYMENT_STATUS, user.payment_status.toString(), {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    // Return full user data including profilePic - it will be stored in localStorage client-side
    return {
      success: true,
      message: result.message || "Login successful! Welcome back.",
      data: user, // Includes profilePic which will be handled by setUserDataCookies()
      token: result.token,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An unexpected error occurred. Please try again.",
    };
  }
}

export async function adminLoginAction(data: LoginFormData) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/api/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Login failed",
      };
    }

    // Set cookies
    const cookieStore = await cookies();
    const admin = result.data.user;

    cookieStore.set(COOKIE_KEYS.ADMIN.TOKEN, result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 90, // 90 days
    });

    cookieStore.set(COOKIE_KEYS.ADMIN.EMAIL, admin.email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 90,
    });

    return {
      success: true,
      message: "Login successful",
      data: admin,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An unexpected error occurred",
    };
  }
}

// logout in authcontext
// not used =======================

// export async function logoutAction() {
//   const cookieStore = await cookies();

//   // Clear all user cookies
//   Object.values(COOKIE_KEYS.USER).forEach((key) => {
//     cookieStore.delete(key);
//   });

//   return {
//     success: true,
//     message: "Logged out successfully",
//   };
// }

export async function adminLogoutAction() {
  const cookieStore = await cookies();

  // Clear all admin cookies
  Object.values(COOKIE_KEYS.ADMIN).forEach((key) => {
    cookieStore.delete(key);
  });

  return {
    success: true,
    message: "Logged out successfully",
  };
}