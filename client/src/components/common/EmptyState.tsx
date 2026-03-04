import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon: Icon, title, description, actionLabel, onAction }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <Icon className="h-12 w-12 text-muted-foreground/50 mb-4" />
    <h3 className="text-lg font-semibold mb-1">{title}</h3>
    <p className="text-muted-foreground text-sm max-w-sm mb-4">{description}</p>
    {actionLabel && onAction && (
      <Button onClick={onAction}>{actionLabel}</Button>
    )}
  </div>
);

export default EmptyState;
