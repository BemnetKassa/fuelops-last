"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Fuel, BarChart, Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: Home },
  { href: '/admin/users', label: 'User Management', icon: Users },
  { href: '/admin/stations', label: 'Station Management', icon: Fuel },
  { href: '/admin/reports', label: 'System Reports', icon: BarChart },
  { href: '/admin/security', label: 'Security & Audit', icon: Shield },
];

const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <Card className="h-screen w-64 flex-col justify-between p-4 border-r bg-background hidden md:flex">
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
    </Card>
  );
};

export default AdminSidebar;
