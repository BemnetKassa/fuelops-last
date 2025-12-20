import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Fuel, List, Clock } from "lucide-react";

const StationDashboardPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Station Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Reservations
            </CardTitle>
            <List className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Awaiting confirmation
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Fuel Dispensed Today
            </CardTitle>
            <Fuel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,430 L</div>
            <p className="text-xs text-muted-foreground">
              Across 150 transactions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Wait Time
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8m 30s</div>
            <p className="text-xs text-muted-foreground">
              For the last hour
            </p>
          </CardContent>
        </Card>
      </div>
      {/* More components for recent activity, stock levels etc. can be added here */}
    </div>
  );
};

export default StationDashboardPage;
