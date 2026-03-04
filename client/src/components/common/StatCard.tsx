import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: { value: number; positive: boolean };
  color?: 'primary' | 'success' | 'warning' | 'info' | 'accent' | 'destructive';
}

const colorMap = {
  primary: 'text-primary border-l-primary',
  success: 'text-success border-l-success',
  warning: 'text-warning border-l-warning',
  info: 'text-info border-l-info',
  accent: 'text-accent border-l-accent',
  destructive: 'text-destructive border-l-destructive',
};

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend, color = 'primary' }) => {
  return (
    <Card className={cn('border-l-4', colorMap[color])}>
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {trend && (
            <p className={cn('text-xs mt-1', trend.positive ? 'text-success' : 'text-destructive')}>
              {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        <Icon className={cn('h-8 w-8 opacity-70', colorMap[color].split(' ')[0])} />
      </CardContent>
    </Card>
  );
};

export default StatCard;
