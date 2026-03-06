import { PAGINATION_META_DATA } from ".";

export enum USER_ROLE {
    SUPER_ADMIN = 'super_admin',
    USER = 'user',
}


// ─── Admin Role Management ────────────────────────────────────────────────────

export interface AdminRole {
    id: string;
    name: string;
    displayName: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface AdminRoleListResponse {
    meta: PAGINATION_META_DATA;
    data: AdminRole[];
}

export interface CreateRolePayload {
    name: string;
    displayName: string;
    description?: string | null;
}

export interface UpdateRolePayload {
    name?: string | null;
    displayName?: string | null;
    description?: string | null;
}