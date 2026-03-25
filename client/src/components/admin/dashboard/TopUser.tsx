import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getInitials } from '@/utils/helpers';

import { AdminDashboardTopUser } from "@/types/dashboard.types";

export default function TopUser({
    topActiveUsers,
}: Readonly<{
    topActiveUsers: AdminDashboardTopUser[];
}>) {
    return (
        <Card>
            <CardHeader><CardTitle className="text-lg">Top Active Users</CardTitle></CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead className="text-right">Todos</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {topActiveUsers.map(u => (
                            <TableRow key={u.id}>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-7 w-7">
                                            <AvatarFallback className="text-xs bg-muted">{getInitials(u.fullName)}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm">{u.fullName}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right font-medium">{u.todoCount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}