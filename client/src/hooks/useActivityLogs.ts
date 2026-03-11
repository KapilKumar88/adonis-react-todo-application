import { useQuery } from '@tanstack/react-query';
import { adminActivityLogService } from '@/services/admin/activity-log.service';
import type { ActivityLogListParams } from '@/types/activity-log.types';

export const activityLogKeys = {
  all: ['admin-activity-logs'] as const,
  list: (params: ActivityLogListParams) => [...activityLogKeys.all, 'list', params] as const,
};

export function useActivityLogs(params: ActivityLogListParams = {}) {
  return useQuery({
    queryKey: activityLogKeys.list(params),
    queryFn: () => adminActivityLogService.list(params),
  });
}
