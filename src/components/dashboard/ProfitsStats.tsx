import { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/api';
import { SectionHeader, LoadingState, ErrorState } from '@/components/dashboard/StatsCard';
import StatsCard from '@/components/dashboard/StatsCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { DollarSign, TrendingUp, Calendar, BarChart3, Search } from 'lucide-react';

const ProfitsStats = () => {
  const [profits, setProfits] = useState({ daily: 0, weekly: 0, monthly: 0, lifetime: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [vendorId, setVendorId] = useState('');
  const [vendorProfits, setVendorProfits] = useState<any>(null);
  const [vendorLoading, setVendorLoading] = useState(false);

  const fetchProfits = async () => {
    setLoading(true);
    setError('');
    try {
      const [daily, weekly, monthly, lifetime] = await Promise.all([
        apiFetch('/admin/order/profits/daily'),
        apiFetch('/admin/order/profits/last-7-days'),
        apiFetch('/admin/order/profits/monthly'),
        apiFetch('/admin/order/profits/lifetime'),
      ]);
      setProfits({
        daily: daily.profit || 0,
        weekly: weekly.profit || 0,
        monthly: monthly.profit || 0,
        lifetime: lifetime.profit || 0,
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProfits(); }, []);

  const fetchVendorProfits = async () => {
    if (!vendorId.trim()) return;
    setVendorLoading(true);
    try {
      const data = await apiFetch(`/admin/order/profits/vendor/${vendorId.trim()}`);
      setVendorProfits(data);
    } catch (err: any) {
      setVendorProfits(null);
    } finally {
      setVendorLoading(false);
    }
  };

  if (error) return <ErrorState message={error} onRetry={fetchProfits} />;

  return (
    <div className="animate-fade-in">
      <SectionHeader title="Profits & Stats" onRefresh={fetchProfits} loading={loading} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard title="Daily Profit" value={`₦${profits.daily.toLocaleString()}`} icon={<DollarSign className="w-5 h-5" />} loading={loading} />
        <StatsCard title="Last 7 Days" value={`₦${profits.weekly.toLocaleString()}`} icon={<TrendingUp className="w-5 h-5" />} loading={loading} />
        <StatsCard title="Monthly" value={`₦${profits.monthly.toLocaleString()}`} icon={<Calendar className="w-5 h-5" />} loading={loading} />
        <StatsCard title="Lifetime" value={`₦${profits.lifetime.toLocaleString()}`} icon={<BarChart3 className="w-5 h-5" />} loading={loading} />
      </div>

      <div className="mallmark-card p-6">
        <h3 className="font-display font-semibold mb-4 text-foreground">Vendor Profits</h3>
        <div className="flex gap-3 mb-4">
          <div className="flex-1">
            <Label className="text-xs text-muted-foreground mb-1 block">Vendor ID</Label>
            <Input value={vendorId} onChange={e => setVendorId(e.target.value)} placeholder="Enter vendor ID..." />
          </div>
          <Button onClick={fetchVendorProfits} disabled={vendorLoading} className="self-end bg-primary text-primary-foreground hover:bg-mallmark-main-hover">
            <Search className="w-4 h-4 mr-2" /> Lookup
          </Button>
        </div>

        {vendorLoading && <LoadingState />}
        {vendorProfits && !vendorLoading && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard title="Today" value={`₦${(vendorProfits.today || 0).toLocaleString()}`} />
            <StatsCard title="Last 7 Days" value={`₦${(vendorProfits.last7Days || 0).toLocaleString()}`} />
            <StatsCard title="This Month" value={`₦${(vendorProfits.thisMonth || 0).toLocaleString()}`} />
            <StatsCard title="Last 30 Days" value={`₦${(vendorProfits.last30Days || 0).toLocaleString()}`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfitsStats;
