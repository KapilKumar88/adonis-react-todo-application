import React, { useState } from 'react';
import { Plus, ListTodo, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PageHeader from '@/components/common/PageHeader';
import StatCard from '@/components/common/StatCard';
import { StatusBadge, PriorityBadge } from '@/components/common/StatusBadge';
import { useTodos } from '@/context/TodoContext';
import { formatRelativeTime } from '@/utils/helpers';
import TodoModal from '@/components/user/TodoModal';

const DashboardPage: React.FC = () => {
  const { userTodos } = useTodos();
  const [modalOpen, setModalOpen] = useState(false);

  const total = userTodos.length;
  const completed = userTodos.filter(t => t.status === 'completed').length;
  const inProgress = userTodos.filter(t => t.status === 'in-progress').length;
  const pending = userTodos.filter(t => t.status === 'pending').length;

  const recentTodos = [...userTodos].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 5);

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Overview of your todos" actions={
        <Button onClick={() => setModalOpen(true)}><Plus className="h-4 w-4 mr-1" /> Quick Add</Button>
      } />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Todos" value={total} icon={ListTodo} color="primary" trend={{ value: 12, positive: true }} />
        <StatCard title="Completed" value={completed} icon={CheckCircle2} color="success" trend={{ value: 8, positive: true }} />
        <StatCard title="In Progress" value={inProgress} icon={Clock} color="info" />
        <StatCard title="Pending" value={pending} icon={AlertCircle} color="warning" />
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
                    <p className="text-xs text-muted-foreground">{formatRelativeTime(todo.updatedAt)}</p>
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
      <TodoModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
};

export default DashboardPage;
