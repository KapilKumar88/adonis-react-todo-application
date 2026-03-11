import apiConstant from '@/constants/api.constant';
import { apiClient } from '@/lib/api-client';
import type { Todo } from '@/types';

export interface DashboardStats {
    total: number;
    completed: number;
    inProgress: number;
    pending: number;
}

export interface DashboardResponse {
    stats: DashboardStats;
    recentTodos: Todo[];
}

export const dashboardKeys = {
    all: ['dashboard'] as const,
};

export const dashboardService = {
    /** GET /api/v1/dashboard */
    getDashboard: async (): Promise<DashboardResponse> => {
        return apiClient.get<DashboardResponse>(apiConstant.USER.DASHBOARD);
    },
};
