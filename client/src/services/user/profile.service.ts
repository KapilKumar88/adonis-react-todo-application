import apiConstant from '@/constants/api.constant';
import { apiClient } from '@/lib/api-client';
import { UserDetails } from '@/types/user.types';

export const userProfileKeys = {
    profile: ['userProfile'] as const,
}

export interface ApiUserProfileResponse {
    data: UserDetails;
    message: string;
}

export const userProfileService = {
    /** GET /api/v1/profile */
    getUserProfile: async (): Promise<ApiUserProfileResponse> => {
        return apiClient.get<ApiUserProfileResponse>(apiConstant.USER.PROFILE);
    },

    /** PUT /api/v1/profile (multipart/form-data) */
    updateProfile: async (formData: FormData): Promise<ApiUserProfileResponse> => {
        return apiClient.put<ApiUserProfileResponse>(apiConstant.USER.UPDATE_PROFILE, formData);
    },

    /** PUT /api/v1/profile/change-password */
    changePassword: async (payload: { currentPassword: string; newPassword: string; confirmPassword: string }): Promise<{ message: string }> => {
        return apiClient.put<{ message: string }>(apiConstant.USER.CHANGE_CREDS, payload);
    },
};
