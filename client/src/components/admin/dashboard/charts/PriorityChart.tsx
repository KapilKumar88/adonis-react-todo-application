import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminDashboardPriorityBreakdown } from '@/types/dashboard.types';


export default function PriorityChart({
    priorityBreakdown
}: Readonly<{
    priorityBreakdown: AdminDashboardPriorityBreakdown;
}>) {
    const maxPriority = Math.max(priorityBreakdown.high, priorityBreakdown.medium, priorityBreakdown.low, 1);
    return (
        <Card>
            <CardHeader><CardTitle className="text-lg">Priority Breakdown</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                {[
                    { label: 'High', count: priorityBreakdown.high, color: 'bg-destructive' },
                    { label: 'Medium', count: priorityBreakdown.medium, color: 'bg-warning' },
                    { label: 'Low', count: priorityBreakdown.low, color: 'bg-muted-foreground' },
                ].map(p => (
                    <div key={p.label} className="space-y-1">
                        <div className="flex justify-between text-sm">
                            <span>{p.label}</span>
                            <span className="text-muted-foreground">{p.count}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${p.color}`} style={{ width: `${(p.count / maxPriority) * 100}%` }} />
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}