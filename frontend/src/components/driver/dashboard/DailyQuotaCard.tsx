// frontend/src/components/driver/dashboard/DailyQuotaCard.tsx
import { Droplets } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface DailyQuotaCardProps {
  remaining: number;
  total: number;
}

const DailyQuotaCard = ({ remaining, total }: DailyQuotaCardProps) => {
  const percentage = total > 0 ? (remaining / total) * 100 : 0;

  const getProgressColor = () => {
    if (percentage < 25) return 'bg-red-500';
    if (percentage < 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Daily Fuel Quota</CardTitle>
        <Droplets className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {remaining} / {total} <span className="text-sm text-muted-foreground">liters</span>
        </div>
        <p className="text-xs text-muted-foreground">
          {total - remaining} liters used today
        </p>
        <Progress value={percentage} className="mt-4 h-2" indicatorClassName={getProgressColor()} />
      </CardContent>
    </Card>
  );
};

export default DailyQuotaCard;
