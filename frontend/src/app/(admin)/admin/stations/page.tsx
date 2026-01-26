"use client";

import { useState } from 'react';
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
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data
const mockStations = [
  { id: 'STA-001', name: 'Central Fueling', location: 'City Center', petrol: 5000, diesel: 8000 },
  { id: 'STA-002', name: 'Highway Stop', location: 'Highway 101', petrol: 2500, diesel: 10000 },
  { id: 'STA-003', name: 'Downtown Diesel', location: 'Downtown', petrol: 7500, diesel: 3000 },
];

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AdminStationsPage = () => {
  const [stations, setStations] = useState(mockStations);
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem('admin-auth')) {
      router.push('/admin/login');
    }
  }, [router]);
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Station Management</CardTitle>
        <Button>Add New Station</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Petrol (L)</TableHead>
              <TableHead>Diesel (L)</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stations.map((station) => (
              <TableRow key={station.id}>
                <TableCell className="font-medium">{station.name}</TableCell>
                <TableCell>{station.location}</TableCell>
                <TableCell>{station.petrol.toLocaleString()}</TableCell>
                <TableCell>{station.diesel.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit Station</DropdownMenuItem>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Decommission</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminStationsPage;
