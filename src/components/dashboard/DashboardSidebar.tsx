import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, getUser } from '@/lib/api';
import {
  ShoppingCart, CheckCircle, XCircle, Clock, Users, Wallet,
  TrendingUp, GitBranch, CalendarDays, Hash, BarChart3, LogOut,
  Menu, X, ShoppingBag, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export type SectionKey =
  | 'active-orders' | 'completed-orders' | 'canceled-orders' | 'pending-orders'
  | 'pending-vendors' | 'withdrawals' | 'profits' | 'update-vendor-parent'
  | 'daily-orders' | 'order-counts' | 'lifetime-stats';

interface NavItem {
  key: SectionKey;
  label: string;
  icon: React.ElementType;
  group: string;
}

const navItems: NavItem[] = [
  { key: 'active-orders', label: 'Active Orders', icon: ShoppingCart, group: 'Orders' },
  { key: 'completed-orders', label: 'Completed Orders', icon: CheckCircle, group: 'Orders' },
  { key: 'canceled-orders', label: 'Canceled Orders', icon: XCircle, group: 'Orders' },
  { key: 'pending-orders', label: 'Pending Orders', icon: Clock, group: 'Orders' },
  { key: 'daily-orders', label: 'Daily Orders', icon: CalendarDays, group: 'Orders' },
  { key: 'pending-vendors', label: 'Pending Vendors', icon: Users, group: 'Management' },
  { key: 'withdrawals', label: 'Withdrawals', icon: Wallet, group: 'Management' },
  { key: 'update-vendor-parent', label: 'Update Vendor Parent', icon: GitBranch, group: 'Management' },
  { key: 'profits', label: 'Profits & Stats', icon: TrendingUp, group: 'Analytics' },
  { key: 'order-counts', label: 'Order Counts', icon: Hash, group: 'Analytics' },
  { key: 'lifetime-stats', label: 'Lifetime Stats', icon: BarChart3, group: 'Analytics' },
];

interface DashboardSidebarProps {
  activeSection: SectionKey;
  onSectionChange: (section: SectionKey) => void;
}

const DashboardSidebar = ({ activeSection, onSectionChange }: DashboardSidebarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = getUser();

  const groups = navItems.reduce((acc, item) => {
    if (!acc[item.group]) acc[item.group] = [];
    acc[item.group].push(item);
    return acc;
  }, {} as Record<string, NavItem[]>);

  const handleNav = (key: SectionKey) => {
    onSectionChange(key);
    setMobileOpen(false);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-5 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-sidebar-accent flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-sidebar-foreground" />
          </div>
          <div>
            <h1 className="font-display font-bold text-sidebar-foreground text-lg leading-tight">MallMark</h1>
            <p className="text-xs text-sidebar-foreground/50">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-6">
        {Object.entries(groups).map(([group, items]) => (
          <div key={group}>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/40 px-3 mb-2">{group}</p>
            <div className="space-y-0.5">
              {items.map(item => {
                const isActive = activeSection === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => handleNav(item.key)}
                    className={`mallmark-sidebar-item w-full text-left ${
                      isActive
                        ? 'bg-sidebar-accent text-sidebar-foreground font-medium'
                        : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                    }`}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    <span className="flex-1">{item.label}</span>
                    {isActive && <ChevronRight className="w-3 h-3 opacity-50" />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        {user && (
          <div className="mb-3 px-3">
            <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name || 'Admin'}</p>
            <p className="text-xs text-sidebar-foreground/50 truncate">{user.email}</p>
          </div>
        )}
        <button
          onClick={logout}
          className="mallmark-sidebar-item w-full text-left text-sidebar-foreground/70 hover:bg-destructive/20 hover:text-destructive"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 lg:hidden bg-primary text-primary-foreground hover:bg-mallmark-main-hover"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-foreground/40 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-40 h-screen w-64 bg-sidebar transition-transform duration-200
        lg:relative lg:translate-x-0
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {sidebarContent}
      </aside>
    </>
  );
};

export default DashboardSidebar;
