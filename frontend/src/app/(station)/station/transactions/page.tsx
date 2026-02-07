"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';

// Mock data
const mockTransactions = [
  { id: 'TRN-001', driverName: 'John Doe', amount: 50, timestamp: '10:45 AM' },
  { id: 'TRN-002', driverName: 'Jane Smith', amount: 30, timestamp: '11:05 AM' },
];

const StationTransactionsPage = () => {
  const [transactions, setTransactions] = useState(mockTransactions);
  const router = useRouter();
  useEffect(() => {
      if (!localStorage.getItem('station-auth')) {
        router.push('/stationLogin');
      }
  }, [router]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Amount (L)</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((trn) => (
              <TableRow key={trn.id}>
                <TableCell className="font-medium">{trn.id}</TableCell>
                <TableCell>{trn.driverName}</TableCell>
                <TableCell>{trn.amount}</TableCell>
                <TableCell>{trn.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default StationTransactionsPage;
