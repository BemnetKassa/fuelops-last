"use client";

import { useEffect, useState } from 'react';
import DailyQuotaCard from '@/components/driver/dashboard/DailyQuotaCard';
import AccountStatusCard from '@/components/driver/dashboard/AccountStatusCard';
import ActiveReservationCard from '@/components/driver/dashboard/ActiveReservationCard';
import { Skeleton } from '@/components/ui/skeleton';

// Define the types for the dashboard data
interface DailyQuota {
  remaining: number;
  total: number;
}

interface AccountStatus {
  status: 'active' | 'suspended';
  plateNumber: string;
  fuelType: 'Petrol' | 'Diesel';
}

interface Reservation {
  stationName: string;
  liters: number;
  expiresAt: string;
}

interface DashboardData {
  dailyQuota: DailyQuota;
  accountStatus: AccountStatus;
  activeReservation: Reservation | null;
}

const DashboardPage = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real app, the driver ID would come from a proper auth context/session
        // For now, we'll simulate it by getting it from localStorage
        const user = JSON.parse(localStorage.getItem('fuelops-user') || '{}');
        if (!user || !user.id) {
          throw new Error('No user found. Please log in.');
        }

        const res = await fetch(`http://localhost:3001/api/driver/dashboard/${user.id}`);
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Failed to fetch dashboard data');
        }
        const result = await res.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Driver Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-36" />
          <Skeleton className="h-36" />
          <Skeleton className="h-36" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Driver Dashboard</h1>
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Driver Dashboard</h1>
        <p>No dashboard data available.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Driver Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DailyQuotaCard remaining={data.dailyQuota.remaining} total={data.dailyQuota.total} />
        <AccountStatusCard
          status={data.accountStatus.status}
          plateNumber={data.accountStatus.plateNumber}
          fuelType={data.accountStatus.fuelType}
        />
        <ActiveReservationCard reservation={data.activeReservation} />
      </div>
    </div>
  );
};

export default DashboardPage;
