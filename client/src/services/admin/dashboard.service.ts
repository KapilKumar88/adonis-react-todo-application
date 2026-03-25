import apiConstant from '@/constants/api.constant';
import { apiClient } from '@/lib/api-client';
import type { AdminDashboardResponse, AdminDashboardData } from '@/types/dashboard.types';

export const adminDashboardKeys = {
  all: ['admin-dashboard'] as const,
  stats: () => [...adminDashboardKeys.all, 'stats'] as const,
};

export const adminDashboardService = {
  /** GET /api/v1/admin/dashboard */
  get: (): Promise<AdminDashboardData> =>
    apiClient.get<AdminDashboardResponse>(apiConstant.ADMIN.DASHBOARD).then(response => response.data),
};
