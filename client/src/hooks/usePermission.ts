import { useUserProfile } from '@/context/UserProfileContext';
import { adminPermissionService } from '@/services/admin/permission.service';
import { useQuery } from '@tanstack/react-query';

/** Returns a helper that checks whether the current user holds a given permission string. */
export function usePermission() {
  const { userInfo } = useUserProfile();
  const permissions = userInfo?.role?.permissions ?? [];

  return (permission: string): boolean => permissions.includes(permission);
}


export function useGetPermissionsList() {
  return useQuery({
    queryKey: ['permissions'],
    queryFn: () => adminPermissionService.list(),
  });
}