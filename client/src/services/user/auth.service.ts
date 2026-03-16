import apiConstant from '@/constants/api.constant';
import { apiClient } from '@/lib/api-client';
import { ApiLoginResponse } from '@/types/api.types';

export interface LoginPayload {
    email: string;
    password: string;
}

export interface SignupPayload {
    fullName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

export interface ForgotPasswordPayload {
    email: string;
}

export interface ResetPasswordPayload {
    token: string;
    password: string;
    passwordConfirmation: string;
}

export interface MessageResponse {
    message: string;
}

export const userAuthService = {
    /** POST /api/v1/auth/login */
    login: async (payload: LoginPayload): Promise<ApiLoginResponse> => {
        return apiClient.post<ApiLoginResponse>(apiConstant.USER.AUTH.LOGIN, payload);
    },

    /** POST /api/v1/auth/signup */
    signup: async (payload: SignupPayload): Promise<ApiLoginResponse> => {
        return apiClient.post<ApiLoginResponse>(apiConstant.USER.AUTH.SIGNUP, payload);
    },

    /** POST /api/v1/auth/logout */
    logout: async (): Promise<MessageResponse> => {
        return apiClient.post<MessageResponse>(apiConstant.USER.AUTH.LOGOUT);
    },

    /** POST /api/v1/auth/forgot-password */
    forgotPassword: async (payload: ForgotPasswordPayload): Promise<MessageResponse> => {
        return apiClient.post<MessageResponse>(apiConstant.USER.AUTH.FORGOT_CREDS, payload);
    },

    /** POST /api/v1/auth/reset-password */
    resetPassword: async (payload: ResetPasswordPayload): Promise<MessageResponse> => {
        return apiClient.post<MessageResponse>(apiConstant.USER.AUTH.RESET_CREDS, payload);
    },
};
