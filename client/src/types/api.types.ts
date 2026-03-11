import { UserDetails } from "./user.types";



// ─── API / Server types ───────────────────────────────────────────────────────

export interface ApiLoginResponse {
    data: {
        token: string;
        user: UserDetails;
    }
}


export interface ApiUserProfileResponse {
    data: UserDetails;
}