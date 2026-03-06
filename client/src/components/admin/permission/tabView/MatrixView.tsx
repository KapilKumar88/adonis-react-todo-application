import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AdminPermission } from "@/types/permission.types"
import { AdminRole } from "@/types/role.types";
import { firstLetterUpperCase } from "@/utils/helpers";

export default function MatrixView({
  data,
  roles,
}: Readonly<{
  data: AdminPermission[];
  roles: AdminRole[];
}>) {
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
            // actions.filter(action => allPermissions.some(p => p.resource === resource && p.action === action)).map(action => (
            <TableRow key={permission?.id} >
              <TableCell className="sticky left-0 bg-background z-10">
                <span className="capitalize font-medium">{permission?.name}</span>
                <span className="text-muted-foreground"> / {permission?.displayName}</span>
              </TableCell>
              {roles?.map(role => (
                <TableCell key={role.id} className="text-center">
                  <Switch
                  // checked={hasPerm(role, resource, action)}
                  // onCheckedChange={() => togglePerm(role.id, resource, action)}
                  />
                </TableCell>
              ))}
            </TableRow>
            // ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}