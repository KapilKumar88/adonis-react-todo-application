import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner: React.FC<{ label?: string }> = ({ label }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
    {label && <p className="text-sm text-muted-foreground mt-2">{label}</p>}
  </div>
);

export default LoadingSpinner;
