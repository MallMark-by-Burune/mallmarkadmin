import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { SectionHeader, LoadingState, ErrorState, EmptyState, StatusBadge } from '@/components/dashboard/StatsCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { CheckCircle, XCircle, ChevronLeft, ChevronRight, Search } from 'lucide-react';

interface Vendor {
  id: string;
  _id?: string;
  storeName: string;
  contactEmail: string;
  contactPhone: string;
  certificate: string;
  storeAddress?: { street?: string; city?: string; state?: string };
  bankDetails?: { bankName?: string; accountNumber?: string; accountName?: string };
  registrationStatus: string;
}

const PendingVendors = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [actionLoading, setActionLoading] = useState('');

  const fetchVendors = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({ page: String(page), limit: '10' });
      if (search) params.set('q', search);
      const data = await apiFetch(`/admin/routes/vendors/pending?${params}`);
      setVendors(data.vendors || []);
      setTotalPages(data.meta?.pages || 1);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => { fetchVendors(); }, [fetchVendors]);

  const approve = async (vendor: Vendor) => {
    const message = prompt('Admin message (optional):');
    setActionLoading(vendor._id || vendor.id);
    try {
      await apiFetch(`/admin/routes/vendors/${vendor._id || vendor.id}/accept`, {
        method: 'POST',
        body: JSON.stringify({ adminMessage: message || undefined }),
      });
      toast.success(`${vendor.storeName} approved`);
      fetchVendors();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setActionLoading('');
    }
  };

  const reject = async (vendor: Vendor) => {
    const reason = prompt('Rejection reason (optional):');
    setActionLoading(vendor._id || vendor.id);
    try {
      await apiFetch(`/admin/routes/vendors/${vendor._id || vendor.id}/reject`, {
        method: 'POST',
        body: JSON.stringify({ reason: reason || undefined }),
      });
      toast.success(`${vendor.storeName} rejected`);
      fetchVendors();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setActionLoading('');
    }
  };

  return (
    <div className="animate-fade-in">
      <SectionHeader title="Pending Vendors" onRefresh={fetchVendors} loading={loading}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search vendors..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="pl-9 w-64"
          />
        </div>
      </SectionHeader>

      {loading ? <LoadingState /> : error ? <ErrorState message={error} onRetry={fetchVendors} /> : vendors.length === 0 ? <EmptyState message="No pending vendors" /> : (
        <>
          <div className="mallmark-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="text-left p-3 font-medium text-muted-foreground">Store Name</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Email</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Phone</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Address</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Bank</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Certificate</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.map(vendor => (
                    <tr key={vendor._id || vendor.id} className="mallmark-table-row">
                      <td className="p-3 font-medium">{vendor.storeName}</td>
                      <td className="p-3">{vendor.contactEmail}</td>
                      <td className="p-3">{vendor.contactPhone}</td>
                      <td className="p-3 text-xs">
                        {vendor.storeAddress ? `${vendor.storeAddress.street}, ${vendor.storeAddress.city}` : '—'}
                      </td>
                      <td className="p-3 text-xs">
                        {vendor.bankDetails ? `${vendor.bankDetails.bankName} - ${vendor.bankDetails.accountNumber}` : '—'}
                      </td>
                      <td className="p-3">
                        {vendor.certificate ? (
                          <a href={vendor.certificate} target="_blank" rel="noopener noreferrer" className="text-info underline text-xs">View</a>
                        ) : '—'}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => approve(vendor)}
                            disabled={actionLoading === (vendor._id || vendor.id)}
                            className="text-success hover:text-success"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => reject(vendor)}
                            disabled={actionLoading === (vendor._id || vendor.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-4">
              <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
              <Button variant="outline" size="sm" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PendingVendors;
