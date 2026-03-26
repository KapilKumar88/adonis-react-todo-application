import { useUserProfile } from '@/context/UserProfileContext';
import { adminPermissionService, permissionKeys } from '@/services/admin/permission.service';
import { AdminPermissionListResponse, UpdatePermissionPayload } from '@/types/permission.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

/** Returns a helper that checks whether the current user holds a given permission string. */
export function usePermission() {
  const { userInfo } = useUserProfile();
  const permissions = userInfo?.role?.permissions ?? [];

  return (permission: string): boolean => permissions.includes(permission);
}


export function useUpdatePermission() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdatePermissionPayload }) =>
      adminPermissionService.update(id, { roleId: payload.role.id, attach: payload.attach }),

    onMutate: async ({ id, payload }) => {
      // Cancel any outgoing refetches so they don't overwrite the optimistic update
      await queryClient.cancelQueries({ queryKey: permissionKeys.all });

      // Snapshot all matching list queries for rollback
      const previousQueries = queryClient.getQueriesData<AdminPermissionListResponse>({ queryKey: permissionKeys.all });

      // Optimistically apply the new status to every cached list page
      queryClient.setQueriesData<AdminPermissionListResponse>({ queryKey: permissionKeys.all }, (old) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.map((permission) => {
            if (permission.id === id) {
              return { ...permission, roles: payload.attach ? [...permission.roles, payload.role] : permission.roles.filter(r => r.id !== payload.role.id) };
            }
            return permission;
          }),
        };
      });

      return { previousQueries };
    },

    onError: (_err, _vars, context) => {
      // Roll back all list caches to their previous state
      context?.previousQueries.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },
  });
}

export function useGetPermissionsList() {
  return useQuery({
    queryKey: permissionKeys.all,
    queryFn: () => adminPermissionService.list(),
  });
}