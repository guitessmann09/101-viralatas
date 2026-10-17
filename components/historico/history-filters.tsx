import { Card, CardContent } from "@/components/ui/card";
import { filtrosHistorico } from "./types";

interface HistoryFiltersProps {
  filter: string;
  total: number;
  loading: boolean;
  onChange: (filter: string) => void;
}

export function HistoryFilters({ filter, total, loading, onChange }: HistoryFiltersProps) {
  return (
    <Card className="rounded-[24px] border-border/80 bg-card/80">
      <CardContent className="p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Registros encontrados</p>
            <p className="text-3xl font-bold text-foreground">{loading ? "..." : total}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {filtrosHistorico.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => onChange(item.value)}
                className={`rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
                  filter === item.value
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
