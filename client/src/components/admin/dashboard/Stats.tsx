import { Users, UserCheck, ListTodo, CheckCircle2 } from 'lucide-react';
import StatCard from '@/components/common/StatCard';
import { AdminDashboardTodoStats, AdminDashboardUserStats } from '@/types/dashboard.types';


export default function Stats({
    userStats,
    todoStats,
}: Readonly<{
    userStats: AdminDashboardUserStats;
    todoStats: AdminDashboardTodoStats;
}>) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard title="Total Users" value={userStats.totalUsers} icon={Users} color="info" />
            <StatCard title="Active Users" value={userStats.activeUsers} icon={UserCheck} color="success" />
            <StatCard title="Total Todos" value={todoStats.total} icon={ListTodo} color="primary" />
            <StatCard title="Completed" value={todoStats.completed} icon={CheckCircle2} color="success" />
        </div>
    )
}