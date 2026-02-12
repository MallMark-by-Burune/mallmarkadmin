import { useState } from 'react';
import { apiFetch } from '@/lib/api';
import { SectionHeader } from '@/components/dashboard/StatsCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const UpdateVendorParent = () => {
  const [vendorId, setVendorId] = useState('');
  const [parentId, setParentId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!vendorId.trim() || !parentId.trim()) {
      toast.error('Both fields are required');
      return;
    }
    setLoading(true);
    try {
      await apiFetch('/admin/routes/vendor/parent', {
        method: 'PATCH',
        body: JSON.stringify({ vendorId: vendorId.trim(), parentId: parentId.trim() }),
      });
      toast.success('Vendor parent updated successfully');
      setVendorId('');
      setParentId('');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <SectionHeader title="Update Vendor Parent" />
      <div className="mallmark-card p-6 max-w-md">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Vendor ID</Label>
            <Input value={vendorId} onChange={e => setVendorId(e.target.value)} placeholder="Enter vendor ID" />
          </div>
          <div className="space-y-2">
            <Label>Parent Vendor ID</Label>
            <Input value={parentId} onChange={e => setParentId(e.target.value)} placeholder="Enter parent vendor ID" />
          </div>
          <Button onClick={handleSubmit} disabled={loading} className="w-full bg-primary text-primary-foreground hover:bg-mallmark-main-hover">
            {loading ? 'Updating...' : 'Update Parent'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateVendorParent;
