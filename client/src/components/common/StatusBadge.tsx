import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const statusStyles: Record<string, string> = {
  active: 'bg-success/10 text-success border-success/20',
  inactive: 'bg-muted text-muted-foreground border-muted',
  banned: 'bg-destructive/10 text-destructive border-destructive/20',
  pending: 'bg-warning/10 text-warning border-warning/20',
  'in-progress': 'bg-info/10 text-info border-info/20',
  in_progress: 'bg-info/10 text-info border-info/20',
  completed: 'bg-success/10 text-success border-success/20',
  backlog: 'bg-muted text-muted-foreground border-muted',
  icebox: 'bg-muted text-muted-foreground border-muted',
  success: 'bg-success/10 text-success border-success/20',
  failed: 'bg-destructive/10 text-destructive border-destructive/20',
  warning: 'bg-warning/10 text-warning border-warning/20',
};

export const StatusBadge: React.FC<{ status: string }> = ({ status }) => (
  <Badge variant="outline" className={cn('capitalize text-xs', statusStyles[status] || '')}>
    {status?.replace(/[-_]/g, ' ')}
  </Badge>
);

const priorityStyles: Record<string, string> = {
  low: 'bg-muted text-muted-foreground border-muted',
  medium: 'bg-warning/10 text-warning border-warning/20',
  high: 'bg-destructive/10 text-destructive border-destructive/20',
};

export const PriorityBadge: React.FC<{ priority: string }> = ({ priority }) => (
  <Badge variant="outline" className={cn('capitalize text-xs', priorityStyles[priority] || '')}>
    <span className={cn('inline-block w-1.5 h-1.5 rounded-full mr-1.5',
      priority === 'high' ? 'bg-destructive' : priority === 'medium' ? 'bg-warning' : 'bg-muted-foreground'
    )} />
    {priority}
  </Badge>
);

export const RoleBadge: React.FC<{ role: string }> = ({ role }) => {
  const styles: Record<string, string> = {
    admin: 'bg-primary/10 text-primary border-primary/20',
    moderator: 'bg-secondary/10 text-secondary border-secondary/20',
    user: 'bg-muted text-muted-foreground border-muted',
  };
  return (
    <Badge variant="outline" className={cn('capitalize text-xs', styles[role] || '')}>
      {role}
    </Badge>
  );
};
