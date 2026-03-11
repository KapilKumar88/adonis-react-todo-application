import apiConstant from '@/constants/api.constant';
import { apiClient } from '@/lib/api-client';
import { ApiUserProfileResponse } from '@/types/api.types';
import { UserDetails } from '@/types/user.types';


export const userProfileKeys = {
    profile: ['userProfile'] as const,
}

export const userProfileService = {
    /** GET /api/v1/profile */
    getUserProfile: async (): Promise<ApiUserProfileResponse> => {
        return apiClient.get<ApiUserProfileResponse>(apiConstant.USER.PROFILE);
    },

    /** PUT /api/v1/profile (multipart/form-data) */
    updateProfile: async (formData: FormData): Promise<UserDetails> => {
        return apiClient.put<UserDetails>(apiConstant.USER.UPDATE_PROFILE, formData);
    },
};
