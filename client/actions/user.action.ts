import AUTHENTICATED_AXIOS_CLIENT from '@/lib/axios_clients/public_client';

interface UpdateProfileData {
  Name?: string;
  affiliation?: string;
  designation?: string;
  phone?: string;
  abstractTitle?: string;
  participationCategory?: string;
  presenterName?: string;
}

export const updateProfile = async (data: UpdateProfileData) => {
  try {
    const response = await AUTHENTICATED_AXIOS_CLIENT.patch(
      '/api/user/profile',
      data
    );

    if (response.data?.status === 'success') {
      return {
        success: true,
        user: response.data.data.user,
      };
    }

    throw new Error('Failed to update profile');
  } catch (error: any) {
    console.error('Update profile error:', error);
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      'Failed to update profile'
    );
  }
};

export const updateProfilePicture = async (base64Image: string) => {
  try {
    const response = await AUTHENTICATED_AXIOS_CLIENT.patch(
      '/api/user/profile-picture',
      { image: base64Image }
    );

    if (response.data?.status === 'success') {
      return {
        success: true,
        user: response.data.data.user,
      };
    }

    throw new Error('Failed to update profile picture');
  } catch (error: any) {
    console.error('Update profile picture error:', error);
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      'Failed to update profile picture'
    );
  }
};
