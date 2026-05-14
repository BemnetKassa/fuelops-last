"use client";
import StationSidebar from '@/components/station/StationSidebar';
import Header from '@/components/station/StationNavBar';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const StationLayout = ({ children }: { children: React.ReactNode; }) => {
  const Router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('fuelops-station');
    if (!userData) {
      Router.push('/auth/stationLogin');
      return;
    }
  }, [Router]);

  return (
    <div className="flex h-screen bg-background">
      <StationSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 bg-muted/40">
          {children}
        </main>
      </div>
    </div>
  );
}

export default StationLayout;
