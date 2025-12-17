// frontend/src/app/driver/layout.tsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Fuel, History, Bell, User, LogOut } from 'lucide-react';

const DriverLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Dashboard', path: '/driver/dashboard', icon: LayoutDashboard },
    { name: 'Reserve Fuel', path: '/driver/reserve', icon: Fuel },
    { name: 'History', path: '/driver/history', icon: History },
    { name: 'Notifications', path: '/driver/notifications', icon: Bell },
    { name: 'Profile', path: '/driver/profile', icon: User },
  ];

  const getNavLinkClass = (path: string) => {
    const isActive = pathname === path;
    return `flex items-center px-4 py-3 text-lg font-medium rounded-lg transition-colors ${
      isActive
        ? 'bg-primary text-primary-foreground'
        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
    }`;
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col bg-card border-r p-4">
        <div className="text-2xl font-bold mb-10 px-4">FuelOps</div>
        <nav className="flex-grow space-y-2">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.path} className={getNavLinkClass(link.path)}>
              <link.icon className="mr-3 h-6 w-6" />
              {link.name}
            </Link>
          ))}
        </nav>
        <div>
          <button className="flex items-center w-full px-4 py-3 text-lg font-medium rounded-lg text-red-500 hover:bg-red-500/10">
            <LogOut className="mr-3 h-6 w-6" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default DriverLayout;
