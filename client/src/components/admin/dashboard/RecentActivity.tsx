import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { StatusBadge } from '@/components/common/StatusBadge';
import { formatRelativeTime, getInitials } from '@/utils/helpers';
import { AdminDashboardActivityLog } from '@/types/dashboard.types';

export default function RecentActivity({
    recentActivity
}: Readonly<{
    recentActivity: AdminDashboardActivityLog[];
}>) {
    return (
        <Card>
            <CardHeader><CardTitle className="text-lg">Recent Activity</CardTitle></CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {recentActivity.map(log => (
                        <div key={log.id} className="flex items-start gap-3 py-2 border-b last:border-0">
                            <Avatar className="h-8 w-8 mt-0.5">
                                <AvatarFallback className="text-xs bg-muted">{getInitials(log.userName)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm"><span className="font-medium">{log.userName}</span> {log.action.toLowerCase()}</p>
                                <p className="text-xs text-muted-foreground">{formatRelativeTime(log.createdAt)}</p>
                            </div>
                            <StatusBadge status={log.status} />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}