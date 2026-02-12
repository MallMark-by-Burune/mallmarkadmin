import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { SectionHeader, LoadingState, ErrorState, EmptyState, StatusBadge } from '@/components/dashboard/StatsCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Eye, Truck, RefreshCw } from 'lucide-react';

interface Order {
  id: string;
  _id?: string;
  orderNumber: string;
  user?: { name?: string; email?: string };
  vendor?: { storeName?: string };
  orderStatus: string;
  totalAmount: number;
  subTotal?: number;
  deliveryFee?: number;
  serviceFee?: number;
  items?: Array<{ productName: string; quantity: number; unitPrice: number; lineTotal: number }>;
  deliveryAddress?: { street?: string; city?: string; state?: string; phone?: string };
  createdAt?: string;
  number?: number;
  cancellationReason?: string;
}

const ORDER_STATUSES = ['Submitted', 'Pending', 'Accepted', 'Packaged', 'RiderAssigned', 'InTransit', 'Delivered', 'Cancelled'];

interface OrdersSectionProps {
  type: 'active' | 'completed' | 'canceled' | 'pending' | 'daily';
}

const OrdersSection = ({ type }: OrdersSectionProps) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusModal, setStatusModal] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState('');
  const [cancelReason, setCancelReason] = useState('');
  const [deliveryModal, setDeliveryModal] = useState<Order | null>(null);
  const [newDeliveryFee, setNewDeliveryFee] = useState('');
  const [updating, setUpdating] = useState(false);

  const endpoints: Record<string, string> = {
    active: '/admin/order/orders/active',
    completed: '/admin/order/orders/completed',
    canceled: '/admin/order/orders/canceled',
    pending: '/admin/routes/orders/pending',
    daily: '/admin/order/orders/daily',
  };

  const titles: Record<string, string> = {
    active: 'Active Orders',
    completed: 'Completed Orders',
    canceled: 'Canceled Orders',
    pending: 'Pending Orders',
    daily: "Today's Orders",
  };

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await apiFetch(endpoints[type]);
      setOrders(data.orders || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const updateStatus = async () => {
    if (!statusModal || !newStatus) return;
    setUpdating(true);
    try {
      const body: any = { orderStatus: newStatus };
      if (newStatus === 'Cancelled' && cancelReason) body.cancellationReason = cancelReason;
      await apiFetch(`/admin/order/orders/${statusModal._id || statusModal.id}/status`, {
        method: 'PATCH',
        body: JSON.stringify(body),
      });
      toast.success('Order status updated');
      setStatusModal(null);
      setNewStatus('');
      setCancelReason('');
      fetchOrders();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setUpdating(false);
    }
  };

  const updateDeliveryFee = async () => {
    if (!deliveryModal || !newDeliveryFee) return;
    setUpdating(true);
    try {
      await apiFetch(`/admin/order/orders/${deliveryModal._id || deliveryModal.id}/delivery-fee`, {
        method: 'PATCH',
        body: JSON.stringify({ newDeliveryFee: parseFloat(newDeliveryFee) }),
      });
      toast.success('Delivery fee updated');
      setDeliveryModal(null);
      setNewDeliveryFee('');
      fetchOrders();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setUpdating(false);
    }
  };

  const showActions = type === 'active' || type === 'pending';

  return (
    <div className="animate-fade-in">
      <SectionHeader title={titles[type]} onRefresh={fetchOrders} loading={loading} />

      {loading ? <LoadingState /> : error ? <ErrorState message={error} onRetry={fetchOrders} /> : orders.length === 0 ? <EmptyState message="No orders found" /> : (
        <div className="mallmark-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left p-3 font-medium text-muted-foreground">#</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Order #</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Customer</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Vendor</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Total</th>
                  {type === 'canceled' && <th className="text-left p-3 font-medium text-muted-foreground">Reason</th>}
                  <th className="text-left p-3 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr key={order._id || order.id} className="mallmark-table-row">
                    <td className="p-3 text-muted-foreground">{order.number || idx + 1}</td>
                    <td className="p-3 font-medium">{order.orderNumber}</td>
                    <td className="p-3">
                      <div>{order.user?.name || '—'}</div>
                      <div className="text-xs text-muted-foreground">{order.user?.email}</div>
                    </td>
                    <td className="p-3">{order.vendor?.storeName || '—'}</td>
                    <td className="p-3"><StatusBadge status={order.orderStatus} /></td>
                    <td className="p-3 font-medium">₦{order.totalAmount?.toLocaleString()}</td>
                    {type === 'canceled' && <td className="p-3 text-xs max-w-[200px] truncate">{order.cancellationReason || '—'}</td>}
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(order)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        {showActions && (
                          <>
                            <Button variant="ghost" size="sm" onClick={() => { setStatusModal(order); setNewStatus(order.orderStatus); }}>
                              <RefreshCw className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => { setDeliveryModal(order); setNewDeliveryFee(String(order.deliveryFee || '')); }}>
                              <Truck className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display">Order {selectedOrder?.orderNumber}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div><span className="text-muted-foreground">Status:</span> <StatusBadge status={selectedOrder.orderStatus} /></div>
                <div><span className="text-muted-foreground">Total:</span> <strong>₦{selectedOrder.totalAmount?.toLocaleString()}</strong></div>
                <div><span className="text-muted-foreground">Subtotal:</span> ₦{selectedOrder.subTotal?.toLocaleString()}</div>
                <div><span className="text-muted-foreground">Delivery:</span> ₦{selectedOrder.deliveryFee?.toLocaleString()}</div>
                <div><span className="text-muted-foreground">Service Fee:</span> ₦{selectedOrder.serviceFee?.toLocaleString()}</div>
              </div>

              {selectedOrder.deliveryAddress && (
                <div>
                  <h4 className="font-medium mb-1">Delivery Address</h4>
                  <p className="text-muted-foreground">
                    {selectedOrder.deliveryAddress.street}, {selectedOrder.deliveryAddress.city}, {selectedOrder.deliveryAddress.state}
                  </p>
                </div>
              )}

              {selectedOrder.items && selectedOrder.items.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Items</h4>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, i) => (
                      <div key={i} className="flex justify-between p-2 bg-muted/30 rounded">
                        <span>{item.productName} × {item.quantity}</span>
                        <span className="font-medium">₦{item.lineTotal?.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Status Update Modal */}
      <Dialog open={!!statusModal} onOpenChange={() => setStatusModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">Update Status — {statusModal?.orderNumber}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>New Status</Label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {ORDER_STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            {newStatus === 'Cancelled' && (
              <div className="space-y-2">
                <Label>Cancellation Reason</Label>
                <Input value={cancelReason} onChange={e => setCancelReason(e.target.value)} placeholder="Reason..." />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setStatusModal(null)}>Cancel</Button>
            <Button onClick={updateStatus} disabled={updating} className="bg-primary text-primary-foreground hover:bg-mallmark-main-hover">
              {updating ? 'Updating...' : 'Update'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delivery Fee Modal */}
      <Dialog open={!!deliveryModal} onOpenChange={() => setDeliveryModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">Update Delivery Fee — {deliveryModal?.orderNumber}</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Label>New Delivery Fee (₦)</Label>
            <Input type="number" value={newDeliveryFee} onChange={e => setNewDeliveryFee(e.target.value)} placeholder="0" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeliveryModal(null)}>Cancel</Button>
            <Button onClick={updateDeliveryFee} disabled={updating} className="bg-primary text-primary-foreground hover:bg-mallmark-main-hover">
              {updating ? 'Updating...' : 'Update'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersSection;
