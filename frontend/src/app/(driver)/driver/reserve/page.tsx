"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Station {
  id: string;
  name: string;
  location: string;
}

const ReserveFuelPage = () => {
  const [amount, setAmount] = useState('');
  const [stationId, setStationId] = useState<string | undefined>(undefined);
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
        const res = await fetch('http://localhost:3001/api/stations');
        if (!res.ok) {
          throw new Error('Failed to fetch stations');
        }
        const data = await res.json();
        setStations(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      }
    };

    fetchStations();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!user || !stationId || !amount) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/reservations/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          driverId: user.id,
          stationId: stationId,
          fuelAmount: parseFloat(amount),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(`Successfully reserved ${amount}L of fuel. Your reservation ID is ${data.reservation.id}.`);
        setAmount('');
        setStationId(undefined);
      } else {
        setError(data.message || 'Failed to create reservation.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create a New Fuel Reservation</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}
          {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">{success}</div>}
          
          <div className="space-y-2">
            <Label htmlFor="station">Fuel Station</Label>
            <Select onValueChange={setStationId} value={stationId}>
              <SelectTrigger id="station">
                <SelectValue placeholder="Select a station" />
              </SelectTrigger>
              <SelectContent>
                {stations.map((station) => (
                  <SelectItem key={station.id} value={station.id}>
                    {station.name} - <span className="text-muted-foreground">{station.location}</span>
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
        </CardContent>
      </Card>
  );
};

export default ReserveFuelPage;
