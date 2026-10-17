import { CalendarDays, MapPin, UserRound } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Coleta } from "./types";

function formatarData(data?: string | null) {
  if (!data) return "—";

  const dataObj = new Date(data);
  if (Number.isNaN(dataObj.getTime())) return "—";

  return dataObj.toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

function nomeStatus(status: string) {
  if (status === "DISPONIVEL") return "Disponível";
  if (status === "RESERVADA") return "Reservada";
  if (status === "CONCLUIDA") return "Concluída";
  return status;
}

function classeStatus(status: string) {
  if (status === "CONCLUIDA") {
    return "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300";
  }

  if (status === "RESERVADA") {
    return "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300";
  }

  return "border-sky-500/40 bg-sky-500/10 text-sky-700 dark:text-sky-300";
}

export function HistoryCard({ collection }: { collection: Coleta }) {
  return (
    <Card className="rounded-[24px] border-border/80 bg-card/80">
      <CardContent className="p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 space-y-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Ponto de coleta</p>
              <h2 className="mt-1 text-lg font-semibold text-foreground">
                {collection.pontoColeta?.nome || "Ponto não informado"}
              </h2>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <UserRound className="h-4 w-4" />
                {collection.voluntario?.nome || "Sem voluntário"}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {collection.pontoColeta?.endereco || "Endereço não informado"}
                {collection.pontoColeta?.cidade ? `, ${collection.pontoColeta.cidade}` : ""}
              </span>
            </div>
          </div>

          <Badge variant="outline" className={classeStatus(collection.status)}>
            {nomeStatus(collection.status)}
          </Badge>
        </div>

        <div className="mt-4 grid gap-3 border-t border-border/80 pt-4 text-sm sm:grid-cols-3">
          <div>
            <p className="flex items-center gap-1.5 text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              Solicitação
            </p>
            <p className="mt-1 text-foreground">
              {formatarData(collection.dataSolicitacao || collection.createdAt)}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Reserva</p>
            <p className="mt-1 text-foreground">{formatarData(collection.dataReserva)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Conclusão</p>
            <p className="mt-1 text-foreground">{formatarData(collection.dataConclusao)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
