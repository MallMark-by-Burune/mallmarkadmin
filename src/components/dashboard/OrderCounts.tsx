import { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/api';
import { SectionHeader, LoadingState, ErrorState } from '@/components/dashboard/StatsCard';
import StatsCard from '@/components/dashboard/StatsCard';
import { Hash, Calendar, TrendingUp, BarChart3 } from 'lucide-react';

const OrderCounts = () => {
  const [counts, setCounts] = useState({ today: 0, last7Days: 0, thisMonth: 0, last30Days: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCounts = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await apiFetch('/admin/order/orders/counts');
      setCounts(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCounts(); }, []);

  if (error) return <ErrorState message={error} onRetry={fetchCounts} />;

  return (
    <div className="animate-fade-in">
      <SectionHeader title="Order Counts" onRefresh={fetchCounts} loading={loading} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Today" value={counts.today} icon={<Hash className="w-5 h-5" />} loading={loading} />
        <StatsCard title="Last 7 Days" value={counts.last7Days} icon={<Calendar className="w-5 h-5" />} loading={loading} />
        <StatsCard title="This Month" value={counts.thisMonth} icon={<TrendingUp className="w-5 h-5" />} loading={loading} />
        <StatsCard title="Last 30 Days" value={counts.last30Days} icon={<BarChart3 className="w-5 h-5" />} loading={loading} />
      </div>
    </div>
  );
};

export default OrderCounts;
