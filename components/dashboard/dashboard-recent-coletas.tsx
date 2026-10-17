import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PontoColeta {
  id: string;
  nome: string;
  status?: string;
}

interface Voluntario {
  id: string;
  nome: string;
  status?: string;
}

interface Coleta {
  id: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
  dataSolicitacao?: string;
  dataReserva?: string | null;
  dataConclusao?: string | null;
  pontoColeta: PontoColeta;
  voluntario: Voluntario | null;
}

interface DashboardRecentColetasProps {
  coletas: Coleta[];
}

function formatarData(data?: string | null) {
  if (!data) return "Data não informada";

  const convertida = new Date(data);

  if (Number.isNaN(convertida.getTime())) {
    return "Data não informada";
  }

  return convertida.toLocaleDateString("pt-BR");
}

function textoStatus(status: string) {
  switch (status) {
    case "DISPONIVEL":
      return "Disponível";
    case "RESERVADA":
      return "Reservada";
    case "CONCLUIDA":
      return "Concluída";
    default:
      return status;
  }
}

export function DashboardRecentColetas({ coletas }: DashboardRecentColetasProps) {
  return (
    <Card className="rounded-[24px] border-border/80 bg-card/80">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle className="text-xl">Coletas recentes</CardTitle>
            <CardDescription>Últimos registros atualizados</CardDescription>
          </div>
          <Badge variant="secondary" className="rounded-full">
            {coletas.length} itens
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {coletas.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-8 text-center text-sm text-muted-foreground">
            Nenhuma coleta registrada até o momento.
          </div>
        ) : (
          coletas.map((coleta) => (
            <div
              key={coleta.id}
              className="flex flex-col gap-3 rounded-2xl border border-border/80 bg-background/60 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="space-y-1">
                <p className="font-semibold text-foreground">
                  {coleta.pontoColeta?.nome || "Ponto não informado"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatarData(coleta.updatedAt || coleta.createdAt)}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant={
                    coleta.status === "CONCLUIDA"
                      ? "default"
                      : coleta.status === "RESERVADA"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {textoStatus(coleta.status)}
                </Badge>
                {coleta.voluntario && (
                  <span className="text-sm text-muted-foreground">
                    {coleta.voluntario.nome}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
