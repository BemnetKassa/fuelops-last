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
    <Card className="bg-card text-card-foreground h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Daily Fuel Quota</CardTitle>
        <Droplets className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">
          {remaining}<span className="text-xl text-muted-foreground">/{total}L</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {total - remaining} liters used today
        </p>
        <Progress value={percentage} className="mt-4 h-3" />
      </CardContent>
    </Card>
  );
};

export default DailyQuotaCard;
