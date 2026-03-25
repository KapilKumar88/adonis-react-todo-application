/**
 * Utility to force logout user on 401 Unauthorized error.
 * Removes token, user profile, and redirects to login page.
 */
export function forceLogout() {
  localStorage.removeItem('api_auth_token');
  localStorage.removeItem('user_profile');
  // Use globalThis.location to force reload and redirect
  globalThis.location.href = '/login';
}
