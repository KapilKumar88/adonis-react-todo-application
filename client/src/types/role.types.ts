import { PAGINATION_META_DATA } from ".";

export enum SYSTEM_ROLES {
    SUPER_ADMIN = 'super_admin',
    USER = 'user',
}


export interface Role {
    id: string;
    name: string;
    displayName: string;
    description: string | null;
    permissions: string[];
    createdAt: string;
    updatedAt: string;
}

export interface AdminRoleListResponse {
    meta: PAGINATION_META_DATA;
    data: Role[];
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