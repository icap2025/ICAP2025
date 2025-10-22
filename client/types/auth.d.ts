export interface LoginFormData {
  email: string;
  password: string;
}
export interface LoginFormErrors {
  email?: string;
  password?: string;
}
export interface LoginFormTouched {
  email: boolean;
  password: boolean;
}

export interface SignupFormData {
  fullName: string;
  university: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface SignupFormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}
export interface SignupFormTouched {
  fullName: boolean;
  university: boolean;
  phone: boolean;
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
}

export interface ForgetPasswordFormData {
  email: string;
}
export interface ForgetPasswordFormErrors {
  email?: string;
}
export interface ForgetPasswordFormTouched {
  email: boolean;
}

export interface ResetPasswordFormData {
  newPassword: string;
  confirmNewPassword: string;
}
export interface ResetPasswordFormErrors {
  newPassword?: string;
  confirmNewPassword?: string;
}
export interface ResetPasswordFormTouched {
  newPassword: boolean;
  confirmNewPassword: boolean;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: unknown;
  token?: string;
}
