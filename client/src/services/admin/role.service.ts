import apiConstant from '@/constants/api.constant';
import { apiClient } from '@/lib/api-client';
import { AdminRole, AdminRoleListResponse, CreateRolePayload, UpdateRolePayload } from '@/types/role.types';


export interface RoleListParams {
    page?: number;
    limit?: number;
}

export const adminRoleService = {
    /** GET /admin/roles?page=&limit= */
    list: (params: RoleListParams = {}): Promise<AdminRoleListResponse> => {

        let apiUrl = apiConstant.ADMIN.ROLE.GET_LIST;
        const query = new URLSearchParams();
        if (params.page) query.set('page', String(params.page));
        if (params.limit) query.set('limit', String(params.limit));
        const qs = query.toString();
        if (qs) {
            apiUrl += `?${qs}`;
        }


        return apiClient.get<AdminRoleListResponse>(apiUrl);
    },

    /** GET /admin/roles/:id */
    get: (id: string): Promise<AdminRole> =>
        apiClient.get<AdminRole>(apiConstant.ADMIN.ROLE.GET_ROLE_BY_ID.replace('{id}', id)),

    /** POST /admin/roles */
    create: (payload: CreateRolePayload): Promise<AdminRole> =>
        apiClient.post<AdminRole>(apiConstant.ADMIN.ROLE.CREATE_ROLE, payload),

    /** PUT /admin/roles/:id */
    update: (id: string, payload: UpdateRolePayload): Promise<AdminRole> =>
        apiClient.put<AdminRole>(apiConstant.ADMIN.ROLE.UPDATE_ROLE.replace('{id}', id), payload),

    /** DELETE /admin/roles/:id */
    remove: (id: string): Promise<void> =>
        apiClient.delete<void>(apiConstant.ADMIN.ROLE.DELETE_ROLE.replace('{id}', id)),
};
