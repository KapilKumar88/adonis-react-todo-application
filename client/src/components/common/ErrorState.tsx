import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export default function ErrorState({
  message = 'Something went wrong. Please try again.',
  onRetry,
  className,
}: Readonly<ErrorStateProps>) {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      globalThis.location.reload();
    }
  };

  return (
    <div className={cn('flex flex-col flex-1 items-center justify-center text-center', className)}>
      <AlertCircle className="h-12 w-12 text-destructive/70 mb-4" />
      <h3 className="text-lg font-semibold mb-1">Something went wrong</h3>
      <p className="text-muted-foreground text-sm max-w-sm mb-4">{message}</p>
      <Button variant="outline" onClick={handleRetry}>
        <RefreshCw className="h-4 w-4 mr-2" />
        Try again
      </Button>
    </div>
  );
}
