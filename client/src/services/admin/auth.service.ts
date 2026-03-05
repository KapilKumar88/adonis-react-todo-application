import apiConstant from '@/constants/api.constant';
import { apiClient } from '@/lib/api-client';
import { ApiLoginResponse } from '@/types/api.types';

export interface AdminLoginPayload {
  email: string;
  password: string;
}

export const adminAuthService = {
  /** POST /admin/login */
  login: async (payload: AdminLoginPayload): Promise<ApiLoginResponse> => {
    const response = await apiClient.post<ApiLoginResponse>(apiConstant.ADMIN.AUTH.LOGIN, payload);
    return response;
  },
};
