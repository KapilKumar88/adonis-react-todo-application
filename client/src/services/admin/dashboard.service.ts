import apiConstant from '@/constants/api.constant';
import { apiClient } from '@/lib/api-client';
import type { AdminDashboardResponse } from '@/types/dashboard.types';

export const adminDashboardService = {
  /** GET /api/v1/admin/dashboard */
  get: (): Promise<AdminDashboardResponse> =>
    apiClient.get<AdminDashboardResponse>(apiConstant.ADMIN.DASHBOARD),
};
