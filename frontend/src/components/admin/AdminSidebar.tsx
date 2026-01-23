"use client";


import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Fuel, BarChart, Shield, Menu } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState } from 'react';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: Home },
  { href: '/admin/users', label: 'User Management', icon: Users },
  { href: '/admin/stations', label: 'Station Management', icon: Fuel },
  { href: '/admin/reports', label: 'System Reports', icon: BarChart },
  { href: '/admin/security', label: 'Security & Audit', icon: Shield },
];

const AdminSidebar = () => {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between p-4">
      <div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary">FuelOps</h2>
          <p className="text-sm text-muted-foreground">Admin Control</p>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                pathname.startsWith(item.href)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
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
    <Card className="h-screen w-64 flex-col justify-between p-4 border-r bg-background hidden md:flex">
      {sidebarContent}
    </Card>
  );
};

export default AdminSidebar;
