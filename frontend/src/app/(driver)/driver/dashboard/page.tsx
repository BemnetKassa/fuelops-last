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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-40 rounded-lg" />
          <Skeleton className="h-40 rounded-lg" />
          <Skeleton className="h-40 rounded-lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 bg-red-500/10 p-4 rounded-lg">
        <strong>Error:</strong> {error}
      </div>
    );
  }

  if (!data) {
    return <p>No dashboard data available.</p>;
  }

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
