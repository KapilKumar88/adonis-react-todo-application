import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdminPermission } from "@/types/permission.types";

export default function ListView({
  data,
}: Readonly<{
  data: AdminPermission[];
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
              <TableCell className="capitalize">{perm?.source?.replace(/_/g, ' ')}</TableCell>
              <TableCell className="capitalize">{perm?.name?.split('.').pop()}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {
                    perm?.roles?.length === 0 && (
                      <span className="text-sm text-muted-foreground">No roles assigned</span>
                    )
                  }
                  {
                    perm?.roles?.length > 0 && (
                      perm?.roles.map(r => (
                        <Badge
                          key={r.id}
                          variant="secondary"
                          className="text-xs">
                          {r.displayName}
                        </Badge>
                      ))
                    )
                  }
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}