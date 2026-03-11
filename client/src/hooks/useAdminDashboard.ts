import { useQuery } from '@tanstack/react-query';
import { adminDashboardService } from '@/services/admin/dashboard.service';

export const adminDashboardKeys = {
  all: ['admin-dashboard'] as const,
  stats: () => [...adminDashboardKeys.all, 'stats'] as const,
};

export function useAdminDashboard() {
  return useQuery({
    queryKey: adminDashboardKeys.stats(),
    queryFn: () => adminDashboardService.get(),
  });
}
