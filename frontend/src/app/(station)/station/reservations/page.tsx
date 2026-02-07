"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Mock data - replace with API call
const mockReservations = [
  { id: 'RES-001', driverName: 'John Doe', vehiclePlate: 'AB 123 CD', fuelAmount: 50, status: 'PENDING', requestedAt: '10:30 AM' },
  { id: 'RES-002', driverName: 'Jane Smith', vehiclePlate: 'XY 789 ZW', fuelAmount: 30, status: 'PENDING', requestedAt: '10:35 AM' },
  { id: 'RES-003', driverName: 'Sam Wilson', vehiclePlate: 'FG 456 HI', fuelAmount: 45, status: 'COMPLETED', requestedAt: '09:15 AM' },
];

const StationReservationsPage = () => {
  const [reservations, setReservations] = useState(mockReservations);
  const router = useRouter();
  useEffect(() => {
      if (!localStorage.getItem('station-auth')) {
        router.push('/stationLogin');
      }
  }, [router]);

  const handleConfirm = (reservationId: string) => {
    setReservations(reservations.map(r => 
      r.id === reservationId ? { ...r, status: 'COMPLETED' } : r
    ));
  };

  const handleCancel = (reservationId: string) => {
    setReservations(reservations.map(r => 
      r.id === reservationId ? { ...r, status: 'CANCELLED' } : r
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Fuel Reservations</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Amount (L)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Requested At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.map((res) => (
              <TableRow key={res.id}>
                <TableCell className="font-medium">{res.id}</TableCell>
                <TableCell>{res.driverName}</TableCell>
                <TableCell>{res.vehiclePlate}</TableCell>
                <TableCell>{res.fuelAmount}</TableCell>
                <TableCell>
                  <Badge variant={res.status === 'PENDING' ? 'default' : res.status === 'COMPLETED' ? 'secondary' : 'destructive'}>
                    {res.status}
                  </Badge>
                </TableCell>
                <TableCell>{res.requestedAt}</TableCell>
                <TableCell className="text-right space-x-2">
                  {res.status === 'PENDING' && (
                    <>
                      <Button size="sm" onClick={() => handleConfirm(res.id)}>Confirm</Button>
                      <Button size="sm" variant="outline" onClick={() => handleCancel(res.id)}>Cancel</Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default StationReservationsPage;
