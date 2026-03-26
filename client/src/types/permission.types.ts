import { PAGINATION_META_DATA } from ".";
import { AdminSideRoleType } from "./role.types";

// ─── Admin Permission Management ────────────────────────────────────────────────────

export interface AdminPermission {
    id: string;
    name: string;
    displayName: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
    source: string;
    roles: AdminSideRoleType[];
}

export interface AdminPermissionListResponse {
    meta: PAGINATION_META_DATA;
    data: AdminPermission[];
}

export interface UpdatePermissionPayload {
    role: AdminSideRoleType;
    attach: boolean;
}