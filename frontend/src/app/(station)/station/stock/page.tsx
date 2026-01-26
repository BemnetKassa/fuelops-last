"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

const StationStockPage = () => {
  const [petrolStock, setPetrolStock] = useState(7500); // Liters
  const [dieselStock, setDieselStock] = useState(4500); // Liters
  const [petrolToAdd, setPetrolToAdd] = useState('');
  const [dieselToAdd, setDieselToAdd] = useState('');
  const maxCapacity = 10000; // Liters for each tank
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem('station-auth')) {
      router.push('/station/stationLogin');
    }
  }, [router]);

  const handleAddPetrol = () => {
    const amount = parseInt(petrolToAdd, 10);
    if (!isNaN(amount) && amount > 0) {
      setPetrolStock(prev => Math.min(prev + amount, maxCapacity));
      setPetrolToAdd('');
    }
  };

  const handleAddDiesel = () => {
    const amount = parseInt(dieselToAdd, 10);
    if (!isNaN(amount) && amount > 0) {
      setDieselStock(prev => Math.min(prev + amount, maxCapacity));
      setDieselToAdd('');
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Petrol Stock Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <Label>Current Stock</Label>
              <span className="font-bold text-lg">{petrolStock.toLocaleString()} / {maxCapacity.toLocaleString()} L</span>
            </div>
            <Progress value={(petrolStock / maxCapacity) * 100} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="add-petrol">Add Stock (Liters)</Label>
            <div className="flex space-x-2">
              <Input 
                id="add-petrol" 
                type="number" 
                placeholder="e.g., 2000"
                value={petrolToAdd}
                onChange={(e) => setPetrolToAdd(e.target.value)}
              />
              <Button onClick={handleAddPetrol}>Add</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Diesel Stock Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <Label>Current Stock</Label>
              <span className="font-bold text-lg">{dieselStock.toLocaleString()} / {maxCapacity.toLocaleString()} L</span>
            </div>
            <Progress value={(dieselStock / maxCapacity) * 100} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="add-diesel">Add Stock (Liters)</Label>
            <div className="flex space-x-2">
              <Input 
                id="add-diesel" 
                type="number" 
                placeholder="e.g., 1500"
                value={dieselToAdd}
                onChange={(e) => setDieselToAdd(e.target.value)}
              />
              <Button onClick={handleAddDiesel}>Add</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StationStockPage;
