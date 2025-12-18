"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface FuelRecord {
  id: string;
  liters: number;
  amount: number;
  createdAt: string;
  station: {
    name: string;
  };
}

interface Reservation {
  id: string;
  fuelAmount: number;
  status: string;
  expiresAt: string;
  createdAt: string;
  station: {
    name: string;
  };
}

const HistoryPage = () => {
  const [records, setRecords] = useState<FuelRecord[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('fuelops-user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      // The user object from login includes the driver profile which has the ID
      fetchHistory(parsedUser.id); 
    } else {
      setLoading(false);
      setError("You must be logged in to view history.");
    }
  }, []);

  const fetchHistory = async (driverId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3001/api/driver/history/${driverId}`);
      if (res.ok) {
        const data = await res.json();
        setRecords(data.fuelRecords);
        setReservations(data.reservations);
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Failed to fetch history.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <Badge className="bg-green-500">{status}</Badge>;
      case 'PENDING':
        return <Badge className="bg-yellow-500">{status}</Badge>;
      case 'CANCELLED':
      case 'EXPIRED':
        return <Badge variant="destructive">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  }

  if (loading) {
    return <div>Loading history...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Transaction History</h1>
      <Tabs defaultValue="fuel-records" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="fuel-records">Fuel Records</TabsTrigger>
          <TabsTrigger value="reservations">Reservations</TabsTrigger>
        </TabsList>
        <TabsContent value="fuel-records">
          <Card>
            <CardHeader>
              <CardTitle>Recent Fuel Purchases</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[60vh]">
                <div className="space-y-4">
                  {records.length > 0 ? (
                    records.map((record) => (
                      <div key={record.id} className="p-4 border rounded-md flex justify-between items-center">
                        <div>
                          <p className="font-semibold">{record.station.name}</p>
                          <p className="text-sm text-muted-foreground">{formatDate(record.createdAt)}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">{record.liters} L</p>
                          <p className="text-muted-foreground">${record.amount.toFixed(2)}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No fuel records found.</p>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reservations">
          <Card>
            <CardHeader>
              <CardTitle>Fuel Reservations</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[60vh]">
                <div className="space-y-4">
                  {reservations.length > 0 ? (
                    reservations.map((res) => (
                      <div key={res.id} className="p-4 border rounded-md">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold">{res.station.name}</p>
                            <p className="text-sm text-muted-foreground">Reserved on: {formatDate(res.createdAt)}</p>
                            <p className="text-sm text-muted-foreground">Expires on: {formatDate(res.expiresAt)}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">{res.fuelAmount} L</p>
                            {getStatusBadge(res.status)}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No reservations found.</p>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HistoryPage;
