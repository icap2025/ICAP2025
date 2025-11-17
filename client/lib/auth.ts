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
  registrationCategory?: 'International Student' | 'International Professionals' | 'Local Professionals' | 'Local Student';
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
  payment_date?: string;
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
    const Name = Cookies.get(COOKIE_KEYS.USER.FULL_NAME);
    const email = Cookies.get(COOKIE_KEYS.USER.EMAIL);

    if (!userId || !email) {
      return null;
    }

    // Get profilePic from localStorage instead of cookies (too large for cookies)
    const profilePic = typeof window !== 'undefined' ? localStorage.getItem('user_profile_pic') : null;

    // Get all other user data from cookies
    const phone = Cookies.get(COOKIE_KEYS.USER.PHONE);
    const affiliation = Cookies.get(COOKIE_KEYS.USER.AFFILIATION);
    const designation = Cookies.get(COOKIE_KEYS.USER.DESIGNATION);
    const abstractID = Cookies.get(COOKIE_KEYS.USER.ABSTRACT_ID);
    const abstractTitle = Cookies.get(COOKIE_KEYS.USER.ABSTRACT_TITLE);
    const participationCategory = Cookies.get(COOKIE_KEYS.USER.PARTICIPATION_CATEGORY);
    const registrationCategory = Cookies.get(COOKIE_KEYS.USER.REGISTRATION_CATEGORY);
    const presenterName = Cookies.get(COOKIE_KEYS.USER.PRESENTER_NAME);
    const role = Cookies.get(COOKIE_KEYS.USER.ROLE);
    const isActive = Cookies.get(COOKIE_KEYS.USER.IS_ACTIVE);
    const isEmailVerified = Cookies.get(COOKIE_KEYS.USER.IS_EMAIL_VERIFIED);
    const paymentStatus = Cookies.get(COOKIE_KEYS.USER.PAYMENT_STATUS);
    const paymentDate = Cookies.get(COOKIE_KEYS.USER.PAYMENT_DATE);
    const createdAt = Cookies.get(COOKIE_KEYS.USER.CREATED_AT);

    return {
      _id: userId,
      Name: Name || "User",
      email: email,
      profilePic: profilePic || undefined,
      phone: phone || undefined,
      affiliation: affiliation || undefined,
      designation: designation || undefined,
      abstractID: abstractID || undefined,
      abstractTitle: abstractTitle || undefined,
      participationCategory: participationCategory as 'Oral' | 'Poster' | 'Only Attendee' | 'Online/Virtual' | undefined,
      registrationCategory: registrationCategory as 'International Student' | 'International Professionals' | 'Local Professionals' | 'Local Student' | undefined,
      presenterName: presenterName || undefined,
      role: role || undefined,
      isActive: isActive === "true",
      isEmailVerified: isEmailVerified === "true",
      payment_status: paymentStatus === "true",
      payment_date: paymentDate || undefined,
      createdAt: createdAt || undefined,
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
  // Clear all user cookies
  Cookies.remove(COOKIE_KEYS.USER.TOKEN);
  Cookies.remove(COOKIE_KEYS.USER.ID);
  Cookies.remove(COOKIE_KEYS.USER.FULL_NAME);
  Cookies.remove(COOKIE_KEYS.USER.EMAIL);
  Cookies.remove(COOKIE_KEYS.USER.PHONE);
  Cookies.remove(COOKIE_KEYS.USER.AFFILIATION);
  Cookies.remove(COOKIE_KEYS.USER.DESIGNATION);
  Cookies.remove(COOKIE_KEYS.USER.ABSTRACT_ID);
  Cookies.remove(COOKIE_KEYS.USER.ABSTRACT_TITLE);
  Cookies.remove(COOKIE_KEYS.USER.PARTICIPATION_CATEGORY);
  Cookies.remove(COOKIE_KEYS.USER.REGISTRATION_CATEGORY);
  Cookies.remove(COOKIE_KEYS.USER.PRESENTER_NAME);
  Cookies.remove(COOKIE_KEYS.USER.ROLE);
  Cookies.remove(COOKIE_KEYS.USER.IS_ACTIVE);
  Cookies.remove(COOKIE_KEYS.USER.IS_EMAIL_VERIFIED);
  Cookies.remove(COOKIE_KEYS.USER.PAYMENT_STATUS);
  Cookies.remove(COOKIE_KEYS.USER.PAYMENT_DATE);
  Cookies.remove(COOKIE_KEYS.USER.CREATED_AT);
  Cookies.remove(COOKIE_KEYS.USER.Payment_ID);
  Cookies.remove(COOKIE_KEYS.USER.Amount);

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

  // Set essential user data
  Cookies.set(COOKIE_KEYS.USER.TOKEN, token, cookieOptions);
  Cookies.set(COOKIE_KEYS.USER.ID, userData._id, cookieOptions);
  Cookies.set(COOKIE_KEYS.USER.FULL_NAME, userData.Name, cookieOptions);
  Cookies.set(COOKIE_KEYS.USER.EMAIL, userData.email, cookieOptions);

  // Store profilePic in localStorage instead of cookies (base64 is too large)
  if (userData.profilePic && typeof window !== 'undefined') {
    localStorage.setItem('user_profile_pic', userData.profilePic);
  }

  // Store additional user data
  if (userData.phone) {
    Cookies.set(COOKIE_KEYS.USER.PHONE, userData.phone, cookieOptions);
  }
  if (userData.affiliation) {
    Cookies.set(COOKIE_KEYS.USER.AFFILIATION, userData.affiliation, cookieOptions);
  }
  if (userData.designation) {
    Cookies.set(COOKIE_KEYS.USER.DESIGNATION, userData.designation, cookieOptions);
  }
  if (userData.abstractID) {
    Cookies.set(COOKIE_KEYS.USER.ABSTRACT_ID, userData.abstractID, cookieOptions);
  }
  if (userData.abstractTitle) {
    Cookies.set(COOKIE_KEYS.USER.ABSTRACT_TITLE, userData.abstractTitle, cookieOptions);
  }
  if (userData.participationCategory) {
    Cookies.set(COOKIE_KEYS.USER.PARTICIPATION_CATEGORY, userData.participationCategory, cookieOptions);
  }
  if (userData.registrationCategory) {
    Cookies.set(COOKIE_KEYS.USER.REGISTRATION_CATEGORY, userData.registrationCategory, cookieOptions);
  }
  if (userData.presenterName) {
    Cookies.set(COOKIE_KEYS.USER.PRESENTER_NAME, userData.presenterName, cookieOptions);
  }
  if (userData.role) {
    Cookies.set(COOKIE_KEYS.USER.ROLE, userData.role, cookieOptions);
  }
  if (userData.isActive !== undefined) {
    Cookies.set(COOKIE_KEYS.USER.IS_ACTIVE, userData.isActive.toString(), cookieOptions);
  }
  if (userData.isEmailVerified !== undefined) {
    Cookies.set(COOKIE_KEYS.USER.IS_EMAIL_VERIFIED, userData.isEmailVerified.toString(), cookieOptions);
  }
  if (userData.payment_status !== undefined) {
    Cookies.set(COOKIE_KEYS.USER.PAYMENT_STATUS, userData.payment_status.toString(), cookieOptions);
  }
  if (userData.payment_date) {
    Cookies.set(COOKIE_KEYS.USER.PAYMENT_DATE, userData.payment_date, cookieOptions);
  }
  if (userData.createdAt) {
    Cookies.set(COOKIE_KEYS.USER.CREATED_AT, userData.createdAt, cookieOptions);
  }
}

/**
 * Update specific user data fields in cookies and localStorage
 */
export function updateUserDataCookies(updates: Partial<UserData>): void {
  const cookieOptions = {
    expires: 7, // 7 days
    sameSite: 'strict' as const,
    secure: process.env.NODE_ENV === "production",
  };

  // Update profilePic in localStorage if provided
  if (updates.profilePic !== undefined) {
    if (typeof window !== 'undefined') {
      if (updates.profilePic) {
        localStorage.setItem('user_profile_pic', updates.profilePic);
      } else {
        localStorage.removeItem('user_profile_pic');
      }
    }
  }

  // Update cookies for other fields
  if (updates.Name !== undefined) {
    Cookies.set(COOKIE_KEYS.USER.FULL_NAME, updates.Name, cookieOptions);
  }
  if (updates.phone !== undefined) {
    if (updates.phone) {
      Cookies.set(COOKIE_KEYS.USER.PHONE, updates.phone, cookieOptions);
    } else {
      Cookies.remove(COOKIE_KEYS.USER.PHONE);
    }
  }
  if (updates.affiliation !== undefined) {
    if (updates.affiliation) {
      Cookies.set(COOKIE_KEYS.USER.AFFILIATION, updates.affiliation, cookieOptions);
    } else {
      Cookies.remove(COOKIE_KEYS.USER.AFFILIATION);
    }
  }
  if (updates.designation !== undefined) {
    if (updates.designation) {
      Cookies.set(COOKIE_KEYS.USER.DESIGNATION, updates.designation, cookieOptions);
    } else {
      Cookies.remove(COOKIE_KEYS.USER.DESIGNATION);
    }
  }
  if (updates.abstractTitle !== undefined) {
    if (updates.abstractTitle) {
      Cookies.set(COOKIE_KEYS.USER.ABSTRACT_TITLE, updates.abstractTitle, cookieOptions);
    } else {
      Cookies.remove(COOKIE_KEYS.USER.ABSTRACT_TITLE);
    }
  }
  if (updates.participationCategory !== undefined) {
    if (updates.participationCategory) {
      Cookies.set(COOKIE_KEYS.USER.PARTICIPATION_CATEGORY, updates.participationCategory, cookieOptions);
    } else {
      Cookies.remove(COOKIE_KEYS.USER.PARTICIPATION_CATEGORY);
    }
  }
  if (updates.presenterName !== undefined) {
    if (updates.presenterName) {
      Cookies.set(COOKIE_KEYS.USER.PRESENTER_NAME, updates.presenterName, cookieOptions);
    } else {
      Cookies.remove(COOKIE_KEYS.USER.PRESENTER_NAME);
    }
  }
  if (updates.registrationCategory !== undefined) {
    if (updates.registrationCategory) {
      Cookies.set(COOKIE_KEYS.USER.REGISTRATION_CATEGORY, updates.registrationCategory, cookieOptions);
    } else {
      Cookies.remove(COOKIE_KEYS.USER.REGISTRATION_CATEGORY);
    }
  }
  if (updates.payment_status !== undefined) {
    Cookies.set(COOKIE_KEYS.USER.PAYMENT_STATUS, updates.payment_status.toString(), cookieOptions);
  }
  if (updates.payment_date !== undefined) {
    if (updates.payment_date) {
      Cookies.set(COOKIE_KEYS.USER.PAYMENT_DATE, updates.payment_date, cookieOptions);
    } else {
      Cookies.remove(COOKIE_KEYS.USER.PAYMENT_DATE);
    }
  }
}

// ============= ADMIN AUTH FUNCTIONS =============

export interface AdminData {
  _id: string;
  fullName: string;
  email: string;
  role: 'admin';
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Check if admin is authenticated by verifying token exists
 */
export function isAdminAuthenticated(): boolean {
  const token = Cookies.get(COOKIE_KEYS.ADMIN.TOKEN);
  return !!token;
}

/**
 * Get admin data from cookies
 */
export function getAdminData(): AdminData | null {
  try {
    const token = Cookies.get(COOKIE_KEYS.ADMIN.TOKEN);
    if (!token) return null;

    const email = Cookies.get(COOKIE_KEYS.ADMIN.EMAIL);

    if (!email) {
      return null;
    }

    return {
      _id: '',
      fullName: 'Admin',
      email: email,
      role: 'admin',
      isActive: true,
    };
  } catch (error) {
    console.error("Error getting admin data:", error);
    return null;
  }
}

/**
 * Get admin token
 */
export function getAdminToken(): string | null {
  return Cookies.get(COOKIE_KEYS.ADMIN.TOKEN) || null;
}

/**
 * Clear all admin cookies
 */
export function clearAdminCookies(): void {
  Cookies.remove(COOKIE_KEYS.ADMIN.TOKEN);
  Cookies.remove(COOKIE_KEYS.ADMIN.EMAIL);
}

/**
 * Set admin data in cookies (client-side)
 */
export function setAdminDataCookies(adminData: AdminData, token: string): void {
  const cookieOptions = {
    expires: 90, // 90 days
    sameSite: 'strict' as const,
    secure: process.env.NODE_ENV === "production",
  };

  Cookies.set(COOKIE_KEYS.ADMIN.TOKEN, token, cookieOptions);
  Cookies.set(COOKIE_KEYS.ADMIN.EMAIL, adminData.email, cookieOptions);
}
