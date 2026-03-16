import apiConstant from '@/constants/api.constant';
import { apiClient } from '@/lib/api-client';
import { DashboardStats } from '@/types/dashboard.types';
import { Todo } from '@/types/todo.types';

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
