import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdminPermission } from "@/types/permission.types";
import { AdminRole } from "@/types/role.types";

export default function ListView({
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
            <TableHead>Permission</TableHead>
            <TableHead>Resource</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Assigned To</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map(perm => (
            <TableRow key={perm?.id}>
              <TableCell className="font-medium">{perm?.name}</TableCell>
              {/* <TableCell className="capitalize">{perm?.resource}</TableCell> */}
              {/* <TableCell className="capitalize">{perm?.action}</TableCell> */}
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {/* {roles.filter(r => r.permissions.some(p => p.id === perm.id)).map(r => (
                          <Badge key={r.id} variant="secondary" className="text-xs">{r.name}</Badge>
                        ))} */}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}