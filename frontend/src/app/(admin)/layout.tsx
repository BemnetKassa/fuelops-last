"use client";

import AdminSidebar from '@/components/admin/AdminSidebar';
import Navbar from '@/components/admin/AdminNavBar';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';


const adminLayout = ({ children }: { children: React.ReactNode }) => {

  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('fuelops-admin');
    if (!userData) {
      router.push('/auth/adminLogin');
      return;
    }
    const user = JSON.parse(userData);
    if (user && user.name) {
      setUsername(user.name);
    } else {
      router.push('/auth/adminLogin');
    }
  }, [router]);

  return (
    <div className="flex h-screen bg-muted/40">
      <AdminSidebar />
      <main className="flex-1 flex flex-col">
        <div className="p-8">
          <Navbar title="Dashboard" username={username} />
          {children}
        </div>
      </main>
    </div>
  );
};

export default adminLayout;
