"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AdminReportsPage = () => {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem('admin-auth')) {
      router.push('/admin/login');
    }
  }, [router]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>System-Wide Reports</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h3 className="font-semibold">National Fuel Distribution Report</h3>
            <p className="text-sm text-muted-foreground">Daily/weekly/monthly fuel dispensed across all stations.</p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h3 className="font-semibold">User Activity Report</h3>
            <p className="text-sm text-muted-foreground">Report on user registrations, logins, and activity.</p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h3 className="font-semibold">System Audit Log</h3>
            <p className="text-sm text-muted-foreground">A complete log of all administrative actions.</p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminReportsPage;
