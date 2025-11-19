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
  Name: string;
  affiliation: string;
  designation: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  profilePic?: string; // base64 encoded image
  abstractID?: string;
  abstractTitle?: string;
  participationCategory?: 'Oral' | 'Poster' | 'Only Attendee' |'Online/Virtual';
  registrationCategory: 'International Student' | 'International Professionals' | 'Local Professionals' | 'Local Student';
  presenterName?: string;
  CoAuthorNames?: string;
}
export interface SignupFormErrors {
  Name?: string;
  affiliation?: string;
  designation?: string;
  phone?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  profilePic?: string;
  abstractID?: string;
  abstractTitle?: string;
  participationCategory?: string;
  registrationCategory?: string;
  presenterName?: string;
  CoAuthorNames?: string;
}
export interface SignupFormTouched {
  Name: boolean;
  affiliation: boolean;
  designation: boolean;
  phone: boolean;
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
  profilePic: boolean;
  abstractID: boolean;
  abstractTitle: boolean;
  participationCategory: boolean;
  registrationCategory: boolean;
  presenterName: boolean;
  CoAuthorNames: boolean;
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
