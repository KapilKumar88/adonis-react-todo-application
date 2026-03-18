import { useUserProfile } from '@/context/UserProfileContext';

/** Returns a helper that checks whether the current user holds a given permission string. */
export function usePermission() {
  const { userInfo } = useUserProfile();
  const permissions = userInfo?.role?.permissions ?? [];

  return (permission: string): boolean => permissions.includes(permission);
}
