import { USER_ROLE } from "./role.types";

/** Shape returned by the server's UserTransformer */
export interface UserDetails {
    fullName: string;
    email: string;
    initials: string;
    role: USER_ROLE;
}