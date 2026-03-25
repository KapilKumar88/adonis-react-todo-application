import { PAGINATION_META_DATA } from ".";
import { AdminPermission } from "./permission.types";

export enum SYSTEM_ROLES {
    SUPER_ADMIN = 'super_admin',
    USER = 'user',
}

export enum ROLE_TYPES {
    SYSTEM = 'system',
    CUSTOM = 'custom',
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

export interface AdminSideRoleType {
    id: string;
    name: string;
    displayName: string;
    description: string | null;
    permissions: AdminPermission[];
    createdAt: string;
    updatedAt: string;
    usersCount: number;
    type: ROLE_TYPES;
}



export interface AdminRoleListResponse {
    metaData: PAGINATION_META_DATA;
    data: AdminSideRoleType[];
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