import Cookies from "js-cookie";
import { COOKIE_KEYS } from "./cookies";

export interface UserData {
  _id: string;
  Name: string; // Matches User.js schema
  email: string;
  profilePic?: string;
  phone?: string;
  affiliation?: string; // Matches User.js (institution/organization)
  designation?: string; // Matches User.js (position/designation)
  abstractID?: string;
  abstractTitle?: string;
  participationCategory?: 'Oral' | 'Poster' | 'Only Attendee' | 'Online/Virtual';
  presenterName?: string;
  transactionDetails?: {
    transactionID?: string;
    dateTime?: string;
    senderBank?: string;
    foreignRemittance?: string;
  };
  role?: string;
  isActive?: boolean;
  payment_status?: boolean;
  isEmailVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Check if user is authenticated by verifying token exists
 */
export function isAuthenticated(): boolean {
  const token = Cookies.get(COOKIE_KEYS.USER.TOKEN);
  return !!token;
}

/**
 * Get user data from cookies and localStorage
 */
export function getUserData(): UserData | null {
  try {
    const token = Cookies.get(COOKIE_KEYS.USER.TOKEN);
    if (!token) return null;

    const userId = Cookies.get(COOKIE_KEYS.USER.ID);
    const Name = Cookies.get(COOKIE_KEYS.USER.FULL_NAME); // Maps to Name field from User.js
    const email = Cookies.get(COOKIE_KEYS.USER.EMAIL);
    // Get profilePic from localStorage instead of cookies (too large for cookies)
    const profilePic = typeof window !== 'undefined' ? localStorage.getItem('user_profile_pic') : null;
    const paymentStatus = Cookies.get(COOKIE_KEYS.USER.PAYMENT_STATUS);
    if (!userId || !email) {
      return null;
    }

    return {
      _id: userId,
      Name: Name || "User",
      email: email,
      profilePic: profilePic || undefined,
      payment_status: paymentStatus === "true",
    };
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
}

/**
 * Get user token
 */
export function getUserToken(): string | null {
  return Cookies.get(COOKIE_KEYS.USER.TOKEN) || null;
}

/**
 * Clear all auth cookies and localStorage
 */
export function clearAuthCookies(): void {
  Cookies.remove(COOKIE_KEYS.USER.TOKEN);
  Cookies.remove(COOKIE_KEYS.USER.ID);
  Cookies.remove(COOKIE_KEYS.USER.FULL_NAME);
  Cookies.remove(COOKIE_KEYS.USER.EMAIL);
  Cookies.remove(COOKIE_KEYS.USER.PAYMENT_STATUS);
  
  // Clear profilePic from localStorage
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user_profile_pic');
  }
}

/**
 * Set user data in cookies and localStorage (client-side)
 */
export function setUserDataCookies(userData: UserData, token: string): void {
  const cookieOptions = {
    expires: 7, // 7 days
    sameSite: 'strict' as const,
    secure: process.env.NODE_ENV === "production",
  };

  Cookies.set(COOKIE_KEYS.USER.TOKEN, token, cookieOptions);
  Cookies.set(COOKIE_KEYS.USER.ID, userData._id, cookieOptions);
  Cookies.set(COOKIE_KEYS.USER.FULL_NAME, userData.Name, cookieOptions); // Maps to Name field from User.js
  Cookies.set(COOKIE_KEYS.USER.EMAIL, userData.email, cookieOptions);
  
  // Store profilePic in localStorage instead of cookies (base64 is too large)
  if (userData.profilePic && typeof window !== 'undefined') {
    localStorage.setItem('user_profile_pic', userData.profilePic);
  }
  
  if (userData.payment_status !== undefined) {
    Cookies.set(COOKIE_KEYS.USER.PAYMENT_STATUS, userData.payment_status.toString(), cookieOptions);
  }
}
