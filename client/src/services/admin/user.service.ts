import apiConstant from '@/constants/api.constant';
import { apiClient } from '@/lib/api-client';
import type {
    AdminUser,
    AdminUserListResponse,
    CreateUserPayload,
    UpdateUserPayload,
} from '@/types/user.types';

export interface UserListParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

const resolveId = (template: string, id: string) => template.replace('{id}', id);

export const adminUserService = {
    /** GET /api/v1/admin/users?page=&limit= */
    list: (params: UserListParams = {}): Promise<AdminUserListResponse> => {
        const query = new URLSearchParams();
        if (params.page)      query.set('page',      String(params.page));
        if (params.limit)     query.set('limit',     String(params.limit));
        if (params.sortBy)    query.set('sortBy',    params.sortBy);
        if (params.sortOrder) query.set('sortOrder', params.sortOrder);
        const qs = query.toString();
        const suffix = qs ? '?'.concat(qs) : '';
        return apiClient.get<AdminUserListResponse>(
            apiConstant.ADMIN.USERS.GET_USERS_LIST.concat(suffix)
        );
    },

    /** GET /api/v1/admin/users/:id */
    get: (id: string): Promise<AdminUser> =>
        apiClient.get<AdminUser>(resolveId(apiConstant.ADMIN.USERS.GET_USER_BY_ID, id)),

    /** POST /api/v1/admin/users */
    create: (payload: CreateUserPayload): Promise<AdminUser> =>
        apiClient.post<AdminUser>(apiConstant.ADMIN.USERS.CREATE_USER, payload),

    /** PUT /api/v1/admin/users/:id */
    update: (id: string, payload: UpdateUserPayload): Promise<AdminUser> =>
        apiClient.put<AdminUser>(resolveId(apiConstant.ADMIN.USERS.UPDATE_USER, id), payload),

    /** DELETE /api/v1/admin/users/:id */
    remove: (id: string): Promise<void> =>
        apiClient.delete<void>(resolveId(apiConstant.ADMIN.USERS.DELETE_USER, id)),
};
