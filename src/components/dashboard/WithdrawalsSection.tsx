import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { SectionHeader, LoadingState, ErrorState, EmptyState, StatusBadge } from '@/components/dashboard/StatsCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { CheckCircle, XCircle } from 'lucide-react';

interface Withdrawal {
  id: string;
  _id?: string;
  amount: number;
  status: string;
  requestedAt: string;
  processedAt?: string;
  transactionReference?: string;
  vendor?: { storeName?: string; contactEmail?: string };
}

const WithdrawalTab = ({ status, endpoint }: { status: string; endpoint: string }) => {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await apiFetch(endpoint);
      setWithdrawals(data.withdrawals || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const approve = async (w: Withdrawal) => {
    const ref = prompt('Transaction reference:');
    if (!ref) return;
    setActionLoading(w._id || w.id);
    try {
      await apiFetch(`/admin/withdrawal/${w._id || w.id}/approve`, {
        method: 'PATCH',
        body: JSON.stringify({ transactionReference: ref }),
      });
      toast.success('Withdrawal approved');
      fetchData();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setActionLoading('');
    }
  };

  const reject = async (w: Withdrawal) => {
    if (!confirm('Reject this withdrawal?')) return;
    setActionLoading(w._id || w.id);
    try {
      await apiFetch(`/admin/withdrawal/${w._id || w.id}/reject`, { method: 'PATCH' });
      toast.success('Withdrawal rejected');
      fetchData();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setActionLoading('');
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={fetchData} />;
  if (!withdrawals.length) return <EmptyState message={`No ${status.toLowerCase()} withdrawals`} />;

  return (
    <div className="mallmark-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="text-left p-3 font-medium text-muted-foreground">Amount</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Vendor</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Requested</th>
              {status === 'Pending' && <th className="text-left p-3 font-medium text-muted-foreground">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {withdrawals.map(w => (
              <tr key={w._id || w.id} className="mallmark-table-row">
                <td className="p-3 font-medium">₦{w.amount?.toLocaleString()}</td>
                <td className="p-3">
                  <div>{w.vendor?.storeName || '—'}</div>
                  <div className="text-xs text-muted-foreground">{w.vendor?.contactEmail}</div>
                </td>
                <td className="p-3"><StatusBadge status={w.status} /></td>
                <td className="p-3 text-xs">{new Date(w.requestedAt).toLocaleDateString()}</td>
                {status === 'Pending' && (
                  <td className="p-3">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => approve(w)} disabled={actionLoading === (w._id || w.id)} className="text-success">
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => reject(w)} disabled={actionLoading === (w._id || w.id)} className="text-destructive">
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const WithdrawalsSection = () => (
  <div className="animate-fade-in">
    <SectionHeader title="Withdrawals" />
    <Tabs defaultValue="pending">
      <TabsList className="mb-4">
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
        <TabsTrigger value="rejected">Rejected</TabsTrigger>
      </TabsList>
      <TabsContent value="pending"><WithdrawalTab status="Pending" endpoint="/admin/order/withdrawals/pending" /></TabsContent>
      <TabsContent value="completed"><WithdrawalTab status="Completed" endpoint="/admin/order/withdrawals/completed" /></TabsContent>
      <TabsContent value="rejected"><WithdrawalTab status="Rejected" endpoint="/admin/order/withdrawals/rejected" /></TabsContent>
    </Tabs>
  </div>
);

export default WithdrawalsSection;
