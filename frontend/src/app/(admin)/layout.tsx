"use client";

import AdminSidebar from '@/components/admin/AdminSidebar';
import Navbar from '@/components/admin/AdminNavBar';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';


const adminLayout = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const pageTitle = (() => {
    if (pathname.includes('/admin/users')) return 'Users';
    if (pathname.includes('/admin/stations')) return 'Stations';
    if (pathname.includes('/admin/reports')) return 'Reports';
    if (pathname.includes('/admin/security')) return 'Security';
    return 'Dashboard';
  })();

  useEffect(() => {
    const userData = localStorage.getItem('admin-auth');
    if (!userData) {
      router.push('/adminLogin');
      return;
    }
    try {
      const parsed = JSON.parse(userData);
      setUsername(parsed?.name || parsed?.email || 'Admin');
    } catch {
      setUsername('Admin');
    }
  }, [router]);

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-muted/30 via-background to-muted/20">
      <AdminSidebar />
      <main className="flex-1 flex flex-col">
        <div className="px-4 py-6 md:px-8 md:py-8">
          <Navbar title={pageTitle} username={username} />
          <div className="mt-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default adminLayout;
