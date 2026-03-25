import { adminRoleService } from "@/services/admin/role.service";
import { roleKeys } from "@/services/admin/user.service";
import { useQuery } from "@tanstack/react-query";

export function useRoles() {
    return useQuery({
        queryKey: roleKeys.all,
        queryFn: () => adminRoleService.list(),
        staleTime: 5 * 60_000,
    });
}