import React from 'react';
import { Users, UserCheck, ListTodo, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import PageHeader from '@/components/common/PageHeader';
import StatCard from '@/components/common/StatCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { useAuth } from '@/context/AuthContext';
import { useTodos } from '@/context/TodoContext';
import { activityLogs } from '@/utils/mockData';
import { formatRelativeTime, getInitials } from '@/utils/helpers';

const AdminDashboardPage: React.FC = () => {
  const { allUsers } = useAuth();
  const { todos } = useTodos();

  const activeUsers = allUsers.filter(u => u.status === 'active').length;
  const completedTodos = todos.filter(t => t.status === 'completed').length;
  const pendingTodos = todos.filter(t => t.status === 'pending').length;
  const inProgressTodos = todos.filter(t => t.status === 'in-progress').length;

  const recentLogs = activityLogs.slice(0, 10);

  // Top users by todo count
  const userTodoCounts = allUsers.map(u => ({
    ...u,
    todoCount: todos.filter(t => t.userId === u.id).length,
  })).sort((a, b) => b.todoCount - a.todoCount).slice(0, 5);

  // Chart data
  const statusTotal = completedTodos + pendingTodos + inProgressTodos || 1;
  const completedPct = (completedTodos / statusTotal) * 100;
  const inProgressPct = (inProgressTodos / statusTotal) * 100;
  const pendingPct = (pendingTodos / statusTotal) * 100;

  const highPriority = todos.filter(t => t.priority === 'high').length;
  const medPriority = todos.filter(t => t.priority === 'medium').length;
  const lowPriority = todos.filter(t => t.priority === 'low').length;
  const maxPriority = Math.max(highPriority, medPriority, lowPriority, 1);

  return (
    <div>
      <PageHeader title="Admin Dashboard" subtitle="System overview and analytics" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Users" value={allUsers.length} icon={Users} color="info" trend={{ value: 15, positive: true }} />
        <StatCard title="Active Users" value={activeUsers} icon={UserCheck} color="success" trend={{ value: 5, positive: true }} />
        <StatCard title="Total Todos" value={todos.length} icon={ListTodo} color="primary" trend={{ value: 22, positive: true }} />
        <StatCard title="Completed" value={completedTodos} icon={CheckCircle2} color="success" trend={{ value: 10, positive: true }} />
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
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-success" /> Completed ({completedTodos})</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-info" /> In Progress ({inProgressTodos})</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-warning" /> Pending ({pendingTodos})</div>
            </div>
          </CardContent>
        </Card>

        {/* Priority bars */}
        <Card>
          <CardHeader><CardTitle className="text-lg">Priority Breakdown</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: 'High', count: highPriority, color: 'bg-destructive' },
              { label: 'Medium', count: medPriority, color: 'bg-warning' },
              { label: 'Low', count: lowPriority, color: 'bg-muted-foreground' },
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
              {recentLogs.map(log => (
                <div key={log.id} className="flex items-start gap-3 py-2 border-b last:border-0">
                  <Avatar className="h-8 w-8 mt-0.5">
                    <AvatarFallback className="text-xs bg-muted">{getInitials(log.userName)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm"><span className="font-medium">{log.userName}</span> {log.action.toLowerCase()}</p>
                    <p className="text-xs text-muted-foreground">{formatRelativeTime(log.timestamp)}</p>
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
                {userTodoCounts.map(u => (
                  <TableRow key={u.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7">
                          <AvatarFallback className="text-xs bg-muted">{getInitials(u.name)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{u.name}</span>
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
