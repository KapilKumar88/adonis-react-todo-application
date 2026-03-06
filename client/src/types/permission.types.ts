import { PAGINATION_META_DATA } from ".";

// ─── Admin Permission Management ────────────────────────────────────────────────────

export interface AdminPermission {
    id: string;
    name: string;
    displayName: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface AdminPermissionListResponse {
    meta: PAGINATION_META_DATA;
    data: AdminPermission[];
}

export interface CreatePermissionPayload {
    name: string;
    displayName: string;
    description?: string | null;
}

export interface UpdatePermissionPayload {
    name?: string | null;
    displayName?: string | null;
    description?: string | null;
}