import React from 'react';
import { Users, UserCheck, ListTodo, CheckCircle2, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import PageHeader from '@/components/common/PageHeader';
import StatCard from '@/components/common/StatCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { useAdminDashboard } from '@/hooks/useAdminDashboard';
import { formatRelativeTime, getInitials } from '@/utils/helpers';

const AdminDashboardPage: React.FC = () => {
  const { data, isLoading } = useAdminDashboard();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const userStats = data?.userStats ?? { totalUsers: 0, activeUsers: 0 };
  const todoStats = data?.todoStats ?? { total: 0, completed: 0, inProgress: 0, pending: 0 };
  const priorityBreakdown = data?.priorityBreakdown ?? { high: 0, medium: 0, low: 0 };
  const recentActivity = data?.recentActivity ?? [];
  const topActiveUsers = data?.topActiveUsers ?? [];

  const statusTotal = todoStats.completed + todoStats.inProgress + todoStats.pending || 1;
  const completedPct = (todoStats.completed / statusTotal) * 100;
  const inProgressPct = (todoStats.inProgress / statusTotal) * 100;

  const maxPriority = Math.max(priorityBreakdown.high, priorityBreakdown.medium, priorityBreakdown.low, 1);

  return (
    <div>
      <PageHeader title="Admin Dashboard" subtitle="System overview and analytics" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Users" value={userStats.totalUsers} icon={Users} color="info" />
        <StatCard title="Active Users" value={userStats.activeUsers} icon={UserCheck} color="success" />
        <StatCard title="Total Todos" value={todoStats.total} icon={ListTodo} color="primary" />
        <StatCard title="Completed" value={todoStats.completed} icon={CheckCircle2} color="success" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Donut chart */}
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

        {/* Priority bars */}
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
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent activity */}
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

        {/* Top users */}
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
      </div>
    </div>
  );
};

export default AdminDashboardPage;
