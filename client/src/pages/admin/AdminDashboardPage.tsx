import React from 'react';
import { Loader2 } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import { useQuery } from '@tanstack/react-query';
import { adminDashboardKeys, adminDashboardService } from '@/services/admin/dashboard.service';
import Stats from '@/components/admin/dashboard/Stats';
import DonutChart from '@/components/admin/dashboard/charts/DonutChart';
import PriorityChart from '@/components/admin/dashboard/charts/PriorityChart';
import RecentActivity from '@/components/admin/dashboard/RecentActivity';
import TopUser from '@/components/admin/dashboard/TopUser';

const AdminDashboardPage: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: adminDashboardKeys.stats(),
    queryFn: () => adminDashboardService.get(),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-lg font-medium text-destructive">
            {error?.message || 'Failed to load dashboard data'}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Please try again later
          </p>
        </div>
      </div>
    );
  }

  const userStats = data.userStats;
  const todoStats = data.todoStats;
  const priorityBreakdown = data.priorityBreakdown;
  const recentActivity = data.recentActivity || [];
  const topActiveUsers = data.topActiveUsers || [];

  return (
    <div>
      <PageHeader title="Admin Dashboard" subtitle="System overview and analytics" />

      <Stats userStats={userStats} todoStats={todoStats} />

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Donut chart */}
        <DonutChart todoStats={todoStats} />

        {/* Priority bars */}
        <PriorityChart priorityBreakdown={priorityBreakdown} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent activity */}
        <RecentActivity recentActivity={recentActivity} />

        {/* Top users */}
        <TopUser topActiveUsers={topActiveUsers} />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
