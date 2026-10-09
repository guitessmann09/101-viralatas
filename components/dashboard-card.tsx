import { Card, CardContent } from "./ui/card";

interface DashboardCardProps {
  title: string;
  value: string | number;
  complementaryText?: string;
  icon?: React.ReactNode;
}

export const DashboardCard = ({
  title,
  value,
  complementaryText,
  icon,
}: DashboardCardProps) => {
  return (
    <Card className="rounded-[0.5rem]">
      <CardContent>
        <div className="gap-6 w-full">
          <div className="space-y-1.5">
            <div className="flex items-center text-muted-foreground justify-between w-full">
              <p className="text-xs font-semibold uppercase">{title}</p>
              {icon}
            </div>
            <p className="text-5xl font-bold font-heading">{value}</p>
            <p className="text-xs text-muted-foreground">{complementaryText}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
