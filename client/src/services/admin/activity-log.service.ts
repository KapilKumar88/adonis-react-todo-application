import apiConstant from '@/constants/api.constant';
import { apiClient } from '@/lib/api-client';
import type {
  ActivityLogListResponse,
  ActivityLogExportResponse,
  ActivityLogListParams,
} from '@/types/activity-log.types';

export const activityLogKeys = {
  all: ['admin-activity-logs'] as const,
  list: (params: ActivityLogListParams) => [...activityLogKeys.all, 'list', params] as const,
};

export const adminActivityLogService = {
  list: (params: ActivityLogListParams = {}): Promise<ActivityLogListResponse> => {
    const query = new URLSearchParams();
    if (params.page) query.set('page', String(params.page));
    if (params.limit) query.set('limit', String(params.limit));
    if (params.search) query.set('search', params.search);
    if (params.status && params.status !== 'all') query.set('status', params.status);
    if (params.resource && params.resource !== 'all') query.set('resource', params.resource);
    const qs = query.toString();
    const suffix = qs ? '?'.concat(qs) : '';
    return apiClient.get<ActivityLogListResponse>(
      apiConstant.ADMIN.ACTIVITY_LOGS.GET_LIST.concat(suffix),
    );
  },

  export: (params: ActivityLogListParams = {}): Promise<ActivityLogExportResponse> => {
    const query = new URLSearchParams();
    if (params.search) query.set('search', params.search);
    if (params.status && params.status !== 'all') query.set('status', params.status);
    if (params.resource && params.resource !== 'all') query.set('resource', params.resource);
    const qs = query.toString();
    const suffix = qs ? '?'.concat(qs) : '';
    return apiClient.get<ActivityLogExportResponse>(
      apiConstant.ADMIN.ACTIVITY_LOGS.EXPORT.concat(suffix),
    );
  },
};
