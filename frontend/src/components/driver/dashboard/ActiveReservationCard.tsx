// frontend/src/components/driver/dashboard/ActiveReservationCard.tsx
"use client";

import { useState, useEffect } from 'react';
import { Timer, Fuel, Building } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Reservation {
  stationName: string;
  liters: number;
  expiresAt: string; // ISO string
}

interface ActiveReservationCardProps {
  reservation: Reservation | null;
}

const ActiveReservationCard = ({ reservation }: ActiveReservationCardProps) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (!reservation) return;

    const interval = setInterval(() => {
      const now = new Date();
      const expiry = new Date(reservation.expiresAt);
      const difference = expiry.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft('Expired');
        clearInterval(interval);
        return;
      }

      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [reservation]);

  if (!reservation) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Reservation</CardTitle>
          <Timer className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">No Active Reservation</div>
          <p className="text-xs text-muted-foreground">
            Reserve fuel from a nearby station.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-blue-800 dark:text-blue-300">Active Reservation</CardTitle>
        <Timer className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-blue-900 dark:text-blue-200">
          Expires in {timeLeft}
        </div>
        <div className="mt-4 space-y-2 text-sm text-blue-700 dark:text-blue-300">
          <div className="flex items-center">
            <Building className="mr-2 h-4 w-4" />
            <span>{reservation.stationName}</span>
          </div>
          <div className="flex items-center">
            <Fuel className="mr-2 h-4 w-4" />
            <span>{reservation.liters} liters reserved</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveReservationCard;
