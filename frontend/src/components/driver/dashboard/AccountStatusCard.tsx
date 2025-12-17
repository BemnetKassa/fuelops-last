// frontend/src/components/driver/dashboard/AccountStatusCard.tsx
import { ShieldCheck, ShieldAlert, Car, Fuel } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AccountStatusCardProps {
  status: 'active' | 'suspended';
  plateNumber: string;
  fuelType: 'Petrol' | 'Diesel';
}

const AccountStatusCard = ({ status, plateNumber, fuelType }: AccountStatusCardProps) => {
  const isSuspended = status === 'suspended';

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Account Status</CardTitle>
        {isSuspended ? (
          <ShieldAlert className="h-4 w-4 text-destructive" />
        ) : (
          <ShieldCheck className="h-4 w-4 text-green-500" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          <Badge variant={isSuspended ? 'destructive' : 'default'} className="capitalize">
            {status}
          </Badge>
        </div>
        <div className="mt-4 space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Car className="mr-2 h-4 w-4" />
            <span>{plateNumber}</span>
          </div>
          <div className="flex items-center">
            <Fuel className="mr-2 h-4 w-4" />
            <span>{fuelType}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountStatusCard;
