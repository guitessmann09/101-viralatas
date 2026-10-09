import { Card, CardContent } from "./ui/card";

interface DashboardCardProps {
  title: string;
  value: string | number;
  complementaryText?: string;
}

export const DashboardCard = ({
  title,
  value,
  complementaryText,
}: DashboardCardProps) => {
  return (
    <Card className="rounded-[0.5rem]">
      <CardContent>
        <div className="flex items-center gap-6">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-muted-foreground uppercase">
              {title}
            </p>
            <p className="text-5xl font-bold font-heading">{value}</p>
            <p className="text-xs text-muted-foreground">{complementaryText}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
