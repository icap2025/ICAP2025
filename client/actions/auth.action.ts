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

    // Check if user is actually an admin (has 'admin' role)
    const isAdmin = user.role === 'admin';

    const cookieOptions = {
      httpOnly: false, // Allow client-side access for AuthContext
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
      maxAge: 60 * 60 * 24 * (isAdmin ? 90 : 7), // 90 days for admin, 7 for user
    };

    if (isAdmin) {
      // Set admin cookies
      cookieStore.set(COOKIE_KEYS.ADMIN.TOKEN, result.token, cookieOptions);
      cookieStore.set(COOKIE_KEYS.ADMIN.EMAIL, user.email, cookieOptions);

      return {
        success: true,
        message: result.message || "Admin login successful!",
        data: {
          _id: user._id,
          fullName: user.fullName || user.Name || 'Admin',
          email: user.email,
          role: 'admin' as const,
          isActive: user.isActive !== undefined ? user.isActive : true,
        },
        token: result.token,
        isAdmin: true,
      };
    } else {
      // Set user cookies (existing code)
      cookieStore.set(COOKIE_KEYS.USER.TOKEN, result.token, cookieOptions);
      cookieStore.set(COOKIE_KEYS.USER.ID, user._id, cookieOptions);
      cookieStore.set(COOKIE_KEYS.USER.FULL_NAME, user.Name || "User", cookieOptions);
      cookieStore.set(COOKIE_KEYS.USER.EMAIL, user.email, cookieOptions);

      // Set additional user data (if available)
      if (user.phone) {
        cookieStore.set(COOKIE_KEYS.USER.PHONE, user.phone, cookieOptions);
      }
      if (user.affiliation) {
        cookieStore.set(COOKIE_KEYS.USER.AFFILIATION, user.affiliation, cookieOptions);
      }
      if (user.designation) {
        cookieStore.set(COOKIE_KEYS.USER.DESIGNATION, user.designation, cookieOptions);
      }
      if (user.abstractID) {
        cookieStore.set(COOKIE_KEYS.USER.ABSTRACT_ID, user.abstractID, cookieOptions);
      }
      if (user.abstractTitle) {
        cookieStore.set(COOKIE_KEYS.USER.ABSTRACT_TITLE, user.abstractTitle, cookieOptions);
      }
      if (user.participationCategory) {
        cookieStore.set(COOKIE_KEYS.USER.PARTICIPATION_CATEGORY, user.participationCategory, cookieOptions);
      }
      if (user.registrationCategory) {
        cookieStore.set(COOKIE_KEYS.USER.REGISTRATION_CATEGORY, user.registrationCategory, cookieOptions);
      }
      if (user.presenterName) {
        cookieStore.set(COOKIE_KEYS.USER.PRESENTER_NAME, user.presenterName, cookieOptions);
      }
      if (user.role) {
        cookieStore.set(COOKIE_KEYS.USER.ROLE, user.role, cookieOptions);
      }
      if (user.isActive !== undefined) {
        cookieStore.set(COOKIE_KEYS.USER.IS_ACTIVE, user.isActive.toString(), cookieOptions);
      }
      if (user.isEmailVerified !== undefined) {
        cookieStore.set(COOKIE_KEYS.USER.IS_EMAIL_VERIFIED, user.isEmailVerified.toString(), cookieOptions);
      }
      if (user.payment_status !== undefined) {
        cookieStore.set(COOKIE_KEYS.USER.PAYMENT_STATUS, user.payment_status.toString(), cookieOptions);
      }

      if (user.createdAt) {
        cookieStore.set(COOKIE_KEYS.USER.CREATED_AT, user.createdAt, cookieOptions);
      }
      if (user.payment_date) {
        cookieStore.set(COOKIE_KEYS.USER.PAYMENT_DATE, user.payment_date, cookieOptions);
      }
      if (user.amount) {
        cookieStore.set(COOKIE_KEYS.USER.Amount, user.amount, cookieOptions);
      }
      if (user.SuccessPaymentID) {
        cookieStore.set(COOKIE_KEYS.USER.Payment_ID, user.SuccessPaymentID, cookieOptions);
      }

      // Return full user data including profilePic - it will be stored in localStorage client-side
      return {
        success: true,
        message: result.message || "Login successful! Welcome back.",
        data: user, // Includes profilePic which will be handled by setUserDataCookies()
        token: result.token,
        isAdmin: false,
      };
    }
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