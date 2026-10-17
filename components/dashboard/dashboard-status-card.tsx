import { PieChart } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DashboardStatusCardProps {
  totalColetas: number;
  coletasAbertas: number;
  coletasReservadas: number;
  coletasConcluidas: number;
  graficoCircular: string;
}

export function DashboardStatusCard({
  totalColetas,
  coletasAbertas,
  coletasReservadas,
  coletasConcluidas,
  graficoCircular,
}: DashboardStatusCardProps) {
  return (
    <Card className="rounded-[24px] border-border/80 bg-card/80">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <div>
            <CardTitle className="text-xl">Status da operação</CardTitle>
            <CardDescription>Resumo das coletas cadastradas</CardDescription>
          </div>
          <div className="rounded-xl bg-primary/10 p-2 text-primary">
            <PieChart className="h-4 w-4" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="flex items-center justify-center">
          <div
            className="relative flex h-40 w-40 items-center justify-center rounded-full border border-border/80"
            style={{ background: graficoCircular }}
          >
            <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-background/90 shadow-inner">
              <span className="text-2xl font-bold">{totalColetas}</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                total
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3 rounded-xl bg-muted/40 px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
              <span className="text-sm">Disponíveis</span>
            </div>
            <span className="font-semibold">{coletasAbertas}</span>
          </div>
          <div className="flex items-center justify-between gap-3 rounded-xl bg-muted/40 px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
              <span className="text-sm">Reservadas</span>
            </div>
            <span className="font-semibold">{coletasReservadas}</span>
          </div>
          <div className="flex items-center justify-between gap-3 rounded-xl bg-muted/40 px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <span className="text-sm">Concluídas</span>
            </div>
            <span className="font-semibold">{coletasConcluidas}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
