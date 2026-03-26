import apiConstant from '@/constants/api.constant';
import { apiClient } from '@/lib/api-client';
import { AdminPermission, AdminPermissionListResponse } from '@/types/permission.types';


export const permissionKeys = {
    all: ['admin', 'permissions'] as const,
};

export interface PermissionListParams {
    page?: number;
    limit?: number;
}

export const adminPermissionService = {
    /** GET /admin/permissions?page=&limit= */
    list: (params: PermissionListParams = {}): Promise<AdminPermissionListResponse> => {
        let apiUrl = apiConstant.ADMIN.PERMISSION.GET_LIST;
        const query = new URLSearchParams();
        if (params.page) query.set('page', String(params.page));
        if (params.limit) query.set('limit', String(params.limit));
        const qs = query.toString();

        if (qs) {
            apiUrl += `?${qs}`;
        }
        return apiClient.get<AdminPermissionListResponse>(apiUrl);
    },

    /** GET /admin/permissions/:id */
    get: (id: string): Promise<AdminPermission> =>
        apiClient.get<AdminPermission>(apiConstant.ADMIN.PERMISSION.GET_PERMISSION_BY_ID.replace('{id}', id)),

    /** PUT /admin/permissions/:id */
    update: (id: string, payload: { roleId: string; attach: boolean }): Promise<AdminPermission> =>
        apiClient.put<AdminPermission>(apiConstant.ADMIN.PERMISSION.UPDATE_PERMISSION.replace('{id}', id), payload),

    /** DELETE /admin/permissions/:id */
    remove: (id: string): Promise<void> =>
        apiClient.delete<void>(apiConstant.ADMIN.PERMISSION.DELETE_PERMISSION.replace('{id}', id)),
};
