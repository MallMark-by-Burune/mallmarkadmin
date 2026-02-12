import { useState } from 'react';
import DashboardSidebar, { SectionKey } from '@/components/dashboard/DashboardSidebar';
import OrdersSection from '@/components/dashboard/OrdersSection';
import PendingVendors from '@/components/dashboard/PendingVendors';
import WithdrawalsSection from '@/components/dashboard/WithdrawalsSection';
import ProfitsStats from '@/components/dashboard/ProfitsStats';
import UpdateVendorParent from '@/components/dashboard/UpdateVendorParent';
import OrderCounts from '@/components/dashboard/OrderCounts';
import LifetimeStats from '@/components/dashboard/LifetimeStats';

const sectionComponents: Record<SectionKey, React.ReactNode> = {
  'active-orders': <OrdersSection type="active" />,
  'completed-orders': <OrdersSection type="completed" />,
  'canceled-orders': <OrdersSection type="canceled" />,
  'pending-orders': <OrdersSection type="pending" />,
  'daily-orders': <OrdersSection type="daily" />,
  'pending-vendors': <PendingVendors />,
  'withdrawals': <WithdrawalsSection />,
  'profits': <ProfitsStats />,
  'update-vendor-parent': <UpdateVendorParent />,
  'order-counts': <OrderCounts />,
  'lifetime-stats': <LifetimeStats />,
};

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState<SectionKey>('active-orders');

  return (
    <div className="flex min-h-screen w-full bg-background">
      <DashboardSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 min-h-screen lg:ml-0">
        <div className="p-6 lg:p-8 pt-16 lg:pt-8">
          {sectionComponents[activeSection]}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
