"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Fuel, List, BarChart, Settings } from 'lucide-react';
import { Card } from '@/components/ui/card';

const navItems = [
  { href: '/station/dashboard', label: 'Dashboard', icon: Home },
  { href: '/station/reservations', label: 'Reservations', icon: List },
  { href: '/station/transactions', label: 'Transactions', icon: Fuel },
  { href: '/station/stock', label: 'Stock Management', icon: BarChart },
  { href: '/station/reports', label: 'Reports', icon: Settings },
];

const StationSidebar = () => {
  const pathname = usePathname();

  return (
    <Card className="h-screen w-64 flex-col justify-between p-4 border-r bg-background hidden md:flex">
      <div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary">FuelOps</h2>
          <p className="text-sm text-muted-foreground">Station Portal</p>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                pathname === item.href
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

export default StationSidebar;
