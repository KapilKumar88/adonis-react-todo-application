import { PAGINATION_META_DATA } from ".";
import { Role } from "./role.types";

/** Shape returned by the server's UserTransformer */
export interface UserDetails {
    fullName: string;
    email: string;
    initials: string;
    role: Role;
    bio: string | null;
    profileImage: string | null;
    createdAt: string;
    totalTodos?: number;
    completedTodos?: number;
}

// ─── Admin User Management ────────────────────────────────────────────────────

export interface AdminUser {
    id: string;
    fullName: string | null;
    email: string;
    profileImage: string | null;
    initials: string;
    createdAt: string;
    updatedAt: string | null;
    role: Role | null;
}

export interface AdminUserListResponse {
    metadata: PAGINATION_META_DATA;
    data: AdminUser[];
}

export interface CreateUserPayload {
    fullName: string;
    email: string;
    roleId: string;
}

export interface UpdateUserPayload {
    fullName?: string | null;
    email?: string;
    roleId?: string | null;
}