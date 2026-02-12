import { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/api';
import { SectionHeader, LoadingState, ErrorState } from '@/components/dashboard/StatsCard';
import StatsCard from '@/components/dashboard/StatsCard';
import { Package, CheckCircle, DollarSign } from 'lucide-react';

const LifetimeStats = () => {
  const [stats, setStats] = useState({ totalOrders: 0, totalCompleted: 0, lifetimeProfit: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStats = async () => {
    setLoading(true);
    setError('');
    try {
      const [total, completed, profit] = await Promise.all([
        apiFetch('/admin/order/orders/total/count'),
        apiFetch('/admin/order/orders/completed/count'),
        apiFetch('/admin/order/profits/lifetime'),
      ]);
      setStats({
        totalOrders: total.count || 0,
        totalCompleted: completed.count || 0,
        lifetimeProfit: profit.profit || 0,
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStats(); }, []);

  if (error) return <ErrorState message={error} onRetry={fetchStats} />;

  return (
    <div className="animate-fade-in">
      <SectionHeader title="Lifetime Stats" onRefresh={fetchStats} loading={loading} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard title="Total Orders" value={stats.totalOrders.toLocaleString()} icon={<Package className="w-5 h-5" />} loading={loading} />
        <StatsCard title="Completed Orders" value={stats.totalCompleted.toLocaleString()} icon={<CheckCircle className="w-5 h-5" />} loading={loading} />
        <StatsCard title="Lifetime Profit" value={`₦${stats.lifetimeProfit.toLocaleString()}`} icon={<DollarSign className="w-5 h-5" />} loading={loading} />
      </div>
    </div>
  );
};

export default LifetimeStats;
