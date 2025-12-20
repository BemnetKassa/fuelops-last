"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const StationReportsPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Reports</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h3 className="font-semibold">Daily Transaction Summary</h3>
            <p className="text-sm text-muted-foreground">A summary of all transactions for the current day.</p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h3 className="font-semibold">Weekly Stock Report</h3>
            <p className="text-sm text-muted-foreground">Report on fuel stock levels and refills over the last 7 days.</p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h3 className="font-semibold">Monthly Performance Report</h3>
            <p className="text-sm text-muted-foreground">An overview of station performance for the last month.</p>
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

export default StationReportsPage;
