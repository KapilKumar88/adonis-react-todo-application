import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useUpdatePermission } from "@/hooks/usePermission";
import { AdminPermission } from "@/types/permission.types"
import { AdminSideRoleType } from "@/types/role.types";
import { firstLetterUpperCase } from "@/utils/helpers";

const hasPerm = (role: AdminSideRoleType, permission: AdminPermission) => {
  const perm = permission.roles.find(r => r.id === role.id);
  return !!perm;
}

export default function MatrixView({
  data,
  roles,
}: Readonly<{
  data: AdminPermission[];
  roles: AdminSideRoleType[];
}>) {
  const { mutate: updatePermission } = useUpdatePermission();

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="sticky left-0 bg-background z-10">Resource / Action</TableHead>
            {roles.map(role => (
              <TableHead key={role.id} className="text-center min-w-[100px]">{firstLetterUpperCase(role.name)}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map(permission =>
            <TableRow key={permission?.id} >
              <TableCell className="sticky left-0 bg-background z-10">
                <span className="capitalize font-medium">{permission?.source?.replace(/_/g, ' ')}</span>
                <span className="text-muted-foreground capitalize"> / {permission?.name?.split('.').pop()}</span>
              </TableCell>
              {roles?.map(role => (
                <TableCell key={role.id} className="text-center">
                  <Switch
                    checked={hasPerm(role, permission)}
                    onCheckedChange={(e) => updatePermission({
                      id: permission.id, payload: {
                        role: role,
                        attach: e,
                      }
                    })}
                  />
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}