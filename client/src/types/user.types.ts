import { AdminRole, USER_ROLE } from "./role.types";

/** Shape returned by the server's UserTransformer */
export interface UserDetails {
    fullName: string;
    email: string;
    initials: string;
    role: USER_ROLE;
}

// ─── Admin User Management ────────────────────────────────────────────────────

export interface AdminUser {
    id: string;
    fullName: string | null;
    email: string;
    roleId: number | null;
    createdAt: string;
    updatedAt: string | null;
    role: AdminRole | null;
}

export interface AdminUserMeta {
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
    firstPage: number;
    firstPageUrl: string;
    lastPageUrl: string;
    nextPageUrl: string | null;
    previousPageUrl: string | null;
}

export interface AdminUserListResponse {
    meta: AdminUserMeta;
    data: AdminUser[];
}

export interface CreateUserPayload {
    fullName?: string | null;
    email: string;
    password: string;
    roleId?: number | null;
}

export interface UpdateUserPayload {
    fullName?: string | null;
    email?: string;
    roleId?: number | null;
}