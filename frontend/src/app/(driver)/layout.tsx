// frontend/src/app/driver/layout.tsx
"use client";

import Header from '@/components/driver/Header';
import DriverSidebar from '@/components/driver/DriverSidebar';
import { useEffect, useState } from 'react';

const DriverLayout = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('fuelops-user') || '{}');
    if (user && user.name) {
      setUsername(user.name);
    }
  }, []);

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
