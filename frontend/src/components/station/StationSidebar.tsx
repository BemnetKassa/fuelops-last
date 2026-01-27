"use client";


import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Fuel, List, BarChart, Settings, Menu, PanelLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState } from 'react';

const navItems = [
  { href: '/station/dashboard', label: 'Dashboard', icon: Home },
  { href: '/station/reservations', label: 'Reservations', icon: List },
  { href: '/station/transactions', label: 'Transactions', icon: Fuel },
  { href: '/station/stock', label: 'Stock Management', icon: BarChart },
  { href: '/station/reports', label: 'Reports', icon: Settings },
];

const StationSidebar = () => {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false); // for mobile
  const [collapsed, setCollapsed] = useState(false); // for desktop

  const sidebarContent = (
    <div className={`h-full flex flex-col justify-between p-4 ${collapsed ? 'items-center' : ''}`}>
      <div>
        <div className={`mb-8 ${collapsed ? 'text-center' : ''}`}>
          <h2 className={`text-2xl font-bold text-primary ${collapsed ? 'text-base' : ''}`}>FuelOps</h2>
          {!collapsed && <p className="text-sm text-muted-foreground">Station Portal</p>}
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                pathname === item.href
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <item.icon className="h-5 w-5" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <button
          className="fixed top-4 left-4 z-50 rounded-md bg-white p-2 shadow md:hidden"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="left" className="p-0 w-64">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            {sidebarContent}
          </SheetContent>
        </Sheet>
      </>
    );
  }
  return (
    <div className="relative h-screen">
      <button
        className="absolute top-4 right-[-20px] z-40 rounded-md bg-white p-2 shadow hidden md:block border"
        onClick={() => setCollapsed((prev) => !prev)}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <PanelLeft className="h-5 w-5" />
      </button>
      <Card className={`h-screen ${collapsed ? 'w-16' : 'w-64'} flex-col justify-between p-4 border-r bg-background hidden md:flex transition-all duration-200`}>
        {sidebarContent}
      </Card>
    </div>
  );
};

export default StationSidebar;
