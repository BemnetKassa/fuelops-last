// frontend/src/app/driver/layout.tsx
"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Fuel, History, Bell, User, LogOut } from 'lucide-react';
import Header from '@/components/driver/Header';
import { useEffect, useState } from 'react';

const DriverLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('fuelops-user') || '{}');
    if (user && user.name) {
      setUsername(user.name);
    }
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('fuelops-user');
    // Redirect to the login page
    router.push('/');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/driver/dashboard', icon: LayoutDashboard },
    { name: 'Reserve Fuel', path: '/driver/reserve', icon: Fuel },
    { name: 'History', path: '/driver/history', icon: History },
    { name: 'Notifications', path: '/driver/notifications', icon: Bell },
    { name: 'Profile', path: '/driver/profile', icon: User },
  ];

  const getPageTitle = () => {
    const currentLink = navLinks.find(link => link.path === pathname);
    return currentLink ? currentLink.name : 'Dashboard';
  };

  const getNavLinkClass = (path: string) => {
    const isActive = pathname === path;
    return `flex items-center px-4 py-3 text-lg font-medium rounded-lg transition-colors ${
      isActive
        ? 'bg-primary text-primary-foreground'
        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
    }`;
  };

  return (
    <div className="flex h-screen bg-muted/40">
      {/* Sidebar */}
      <aside className="w-72 flex-shrink-0 bg-background border-r">
        <div className="flex items-center justify-center h-20 border-b">
          <h1 className="text-2xl font-bold text-primary">FuelOps</h1>
        </div>
        <nav className="p-4 space-y-2">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.path} className={getNavLinkClass(link.path)}>
              <link.icon className="mr-4 h-5 w-5" />
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 absolute bottom-0 w-72">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-lg font-medium rounded-lg text-muted-foreground hover:bg-muted hover:text-red-500"
          >
            <LogOut className="mr-4 h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <div className="p-8">
          <Header title={getPageTitle()} username={username} />
          {children}
        </div>
      </main>
    </div>
  );
};

export default DriverLayout;
