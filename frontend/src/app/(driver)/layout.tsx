// frontend/src/app/driver/layout.tsx
"use client";

import Header from '@/components/driver/Header';
import DriverSidebar from '@/components/driver/DriverSidebar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const DriverLayout = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('fuelops-user');
    if (!userData) {
      router.push('/(driver)/login');
      return;
    }
    const user = JSON.parse(userData);
    if (user && user.name) {
      setUsername(user.name);
    } else {
      router.push('/(driver)/login');
    }
  }, [router]);

  return (
    <div className="flex h-screen bg-muted/40">
      <DriverSidebar />
      <main className="flex-1 flex flex-col">
        <div className="p-8">
          <Header title="Dashboard" username={username} />
          {children}
        </div>
      </main>
    </div>
  );
};

export default DriverLayout;
