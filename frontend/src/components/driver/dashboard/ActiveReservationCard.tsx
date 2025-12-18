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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
      <Card className="bg-card text-card-foreground h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Reservation</CardTitle>
          <Timer className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">No Reservation</div>
          <p className="text-xs text-muted-foreground mt-1">
            Reserve fuel from a nearby station.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-primary/10 border-primary/20 text-primary-foreground h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-primary">Active Reservation</CardTitle>
        <Timer className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-primary">
          {isClient ? timeLeft : ''}
        </div>
        <p className="text-xs text-primary/80 mt-1">
          Expires in
        </p>
        <div className="mt-4 space-y-2 text-sm text-primary/90">
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span>{reservation.stationName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Fuel className="h-4 w-4" />
            <span>{reservation.liters} liters reserved</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveReservationCard;
