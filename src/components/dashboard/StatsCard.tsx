import { ReactNode } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: string;
  loading?: boolean;
}

const StatsCard = ({ title, value, icon, trend, loading }: StatsCardProps) => (
  <div className="mallmark-stat-card">
    <div className="flex items-start justify-between mb-3">
      <span className="text-sm font-medium text-muted-foreground">{title}</span>
      {icon && <div className="text-primary/60">{icon}</div>}
    </div>
    {loading ? (
      <div className="h-8 w-24 bg-muted animate-pulse rounded" />
    ) : (
      <p className="text-2xl font-display font-bold text-foreground">{value}</p>
    )}
    {trend && <p className="text-xs text-muted-foreground mt-1">{trend}</p>}
  </div>
);

interface SectionHeaderProps {
  title: string;
  onRefresh?: () => void;
  loading?: boolean;
  children?: ReactNode;
}

export const SectionHeader = ({ title, onRefresh, loading, children }: SectionHeaderProps) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
    <h2 className="text-xl font-display font-bold text-foreground">{title}</h2>
    <div className="flex items-center gap-3">
      {children}
      {onRefresh && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={loading}
          className="gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      )}
    </div>
  </div>
);

export const LoadingState = () => (
  <div className="flex items-center justify-center py-20">
    <div className="text-center">
      <span className="loading-spinner w-8 h-8 text-primary mb-4 block mx-auto" />
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  </div>
);

export const ErrorState = ({ message, onRetry }: { message: string; onRetry?: () => void }) => (
  <div className="flex items-center justify-center py-20">
    <div className="text-center">
      <p className="text-sm text-destructive mb-3">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  </div>
);

export const EmptyState = ({ message }: { message: string }) => (
  <div className="flex items-center justify-center py-20">
    <p className="text-sm text-muted-foreground">{message}</p>
  </div>
);

export const StatusBadge = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    Submitted: 'bg-info/15 text-info',
    Pending: 'bg-warning/15 text-warning',
    Accepted: 'bg-primary/15 text-primary',
    Packaged: 'bg-primary/15 text-primary',
    RiderAssigned: 'bg-info/15 text-info',
    InTransit: 'bg-info/15 text-info',
    Delivered: 'bg-success/15 text-success',
    Cancelled: 'bg-destructive/15 text-destructive',
    Paid: 'bg-success/15 text-success',
    Rejected: 'bg-destructive/15 text-destructive',
    Approved: 'bg-success/15 text-success',
  };

  return (
    <span className={`mallmark-badge ${colors[status] || 'bg-muted text-muted-foreground'}`}>
      {status}
    </span>
  );
};

export default StatsCard;
