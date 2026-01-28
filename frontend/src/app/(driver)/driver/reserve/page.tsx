"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const StationMap = dynamic(() => import('@/components/driver/reserve/StationMap'), { 
  ssr: false,
  loading: () => <div className="h-96 bg-muted rounded-lg flex items-center justify-center">Loading map...</div>
});

interface Station {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

const ReserveFuelPage = () => {
  const [amount, setAmount] = useState('');
  const [stationId, setStationId] = useState<string>('');
  const [stations, setStations] = useState<Station[]>([]);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('fuelops-user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    const fetchStations = async () => {
      try {
        const token = localStorage.getItem('fuelops-token');
        const res = await fetch('http://localhost:3001/api/station', {
          headers: {
            'Authorization': token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) {
          throw new Error('Failed to fetch stations');
        }
        const data = await res.json();
        const normalized: Station[] = data.map((s: any) => ({
          id: String(s.id),
          name: s.name,
          latitude: s.latitude ?? s.lat ?? s.locationLat ?? 0,
          longitude: s.longitude ?? s.lng ?? s.locationLng ?? 0,
        }));
        setStations(normalized);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      }
    };

    fetchStations();
  }, []);

  const handleStationSelectFromMap = (selectedStationId: string) => {
    setStationId(selectedStationId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!user || !stationId || !amount) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const token = localStorage.getItem('fuelops-token');
      if (!token) {
        setError('You must be logged in to reserve fuel.');
        return;
      }

      const response = await fetch('http://localhost:3001/api/driver/reserve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          stationId,
          fuelAmount: parseFloat(amount),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(`Successfully reserved ${amount}L of fuel. Your reservation ID is ${data.id}.`);
        setAmount('');
        setStationId('');
      } else {
        setError(data.message || 'Failed to create reservation.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    }
  };

  const selectedStationName = stations.find(s => s.id === stationId)?.name || "Select a station";

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Create a New Fuel Reservation</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Station Map</h3>
            <StationMap stations={stations} onStationSelect={handleStationSelectFromMap} />
          </div>
          
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Reservation Details</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}
              {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">{success}</div>}
              
              <div className="space-y-2">
                <Label htmlFor="station">Fuel Station</Label>
                <Select onValueChange={(value) => setStationId(value)} value={stationId || undefined}>
                  <SelectTrigger id="station">
                    <SelectValue placeholder="Select a station from the list or map" />
                  </SelectTrigger>
                  <SelectContent>
                    {stations.map((station) => (
                      <SelectItem key={station.id} value={station.id}>
                        {station.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Fuel Amount (in Liters)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g., 50"
                  required
                  min="1"
                />
              </div>

              <Button type="submit" className="w-full btn-grow">
                Confirm Reservation
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReserveFuelPage;
