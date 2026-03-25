import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminDashboardTodoStats } from '@/types/dashboard.types';


export default function DonutChart({
    todoStats,
}: Readonly<{
    todoStats: AdminDashboardTodoStats;
}>) {
    const statusTotal = todoStats.completed + todoStats.inProgress + todoStats.pending || 1;
    const completedPct = (todoStats.completed / statusTotal) * 100;
    const inProgressPct = (todoStats.inProgress / statusTotal) * 100;

    return (
        <Card>
            <CardHeader><CardTitle className="text-lg">Todo Status Distribution</CardTitle></CardHeader>
            <CardContent className="flex items-center justify-center gap-8">
                <div className="relative w-32 h-32">
                    <div
                        className="w-full h-full rounded-full"
                        style={{
                            background: `conic-gradient(
                    hsl(var(--success)) 0% ${completedPct}%,
                    hsl(var(--info)) ${completedPct}% ${completedPct + inProgressPct}%,
                    hsl(var(--warning)) ${completedPct + inProgressPct}% 100%
                  )`,
                        }}
                    />
                    <div className="absolute inset-3 bg-card rounded-full flex items-center justify-center">
                        <span className="text-lg font-bold">{statusTotal}</span>
                    </div>
                </div>
                <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-success" /> Completed ({todoStats.completed})</div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-info" /> In Progress ({todoStats.inProgress})</div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-warning" /> Pending ({todoStats.pending})</div>
                </div>
            </CardContent>
        </Card>
    )
}