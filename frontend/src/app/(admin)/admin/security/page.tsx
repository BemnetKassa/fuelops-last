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
const mockAuditLogs = [
  { id: 'LOG-001', user: 'admin@fuelops.com', action: 'Suspended user USR-005', timestamp: '2025-12-20 10:30 AM' },
  { id: 'LOG-002', user: 'admin@fuelops.com', action: 'Added new station STA-003', timestamp: '2025-12-19 04:15 PM' },
  { id: 'LOG-003', user: 'op1@station.com', action: 'Updated stock for Petrol', timestamp: '2025-12-20 09:00 AM' },
];

const AdminSecurityPage = () => {
  const [logs, setLogs] = useState(mockAuditLogs);
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem('admin-auth')) {
      router.push('/admin/login');
    }
  }, [router]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security & Audit Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.timestamp}</TableCell>
                <TableCell className="font-medium">{log.user}</TableCell>
                <TableCell>{log.action}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminSecurityPage;
