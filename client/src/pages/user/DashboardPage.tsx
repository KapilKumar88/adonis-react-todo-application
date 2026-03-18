import React, { useState } from 'react';
import { Plus, ListTodo, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PageHeader from '@/components/common/PageHeader';
import StatCard from '@/components/common/StatCard';
import { StatusBadge, PriorityBadge } from '@/components/common/StatusBadge';
import { dashboardKeys, dashboardService } from '@/services/user/dashboard.service';
import { formatRelativeTime } from '@/utils/helpers';
import UpsertTodoModal from '@/components/user/todo/UpsertTodoModal';
import { usePermission } from '@/hooks/usePermission';
import { PERMISSIONS } from '@/constants/permission.constant';

const DashboardPage: React.FC = () => {
  const { data } = useQuery({
    queryKey: dashboardKeys.all,
    queryFn: dashboardService.getDashboard,
  });
    const can = usePermission();
  const [modalOpen, setModalOpen] = useState(false);

  const stats = data?.stats;
  const recentTodos = data?.recentTodos ?? [];
   const canAdd = can(PERMISSIONS.TODO_MANAGEMENT.CREATE);

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Overview of your todos" actions={
        canAdd && <Button onClick={() => setModalOpen(true)}><Plus className="h-4 w-4 mr-1" /> Quick Add</Button>
      } />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Todos" value={stats?.total ?? 0} icon={ListTodo} color="primary" />
        <StatCard title="Completed" value={stats?.completed ?? 0} icon={CheckCircle2} color="success" />
        <StatCard title="In Progress" value={stats?.inProgress ?? 0} icon={Clock} color="info" />
        <StatCard title="Pending" value={stats?.pending ?? 0} icon={AlertCircle} color="warning" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Todos</CardTitle>
        </CardHeader>
        <CardContent>
          {recentTodos.length === 0 ? (
            <p className="text-muted-foreground text-sm">No todos yet. Create your first one!</p>
          ) : (
            <div className="space-y-3">
              {recentTodos.map(todo => (
                <div key={todo.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{todo.title}</p>
                    <p className="text-xs text-muted-foreground">{formatRelativeTime(todo?.updatedAt)}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <PriorityBadge priority={todo.priority} />
                    <StatusBadge status={todo.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <UpsertTodoModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
};

export default DashboardPage;
