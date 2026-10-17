import { MapPin, Pencil, Trash2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { Ponto } from "./types";

interface PointsListProps {
  points: Ponto[];
  loading: boolean;
  error: string;
  query: string;
  onEdit: (point: Ponto) => void;
  onDelete: (point: Ponto) => void;
}

export function PointsList({
  points,
  loading,
  error,
  query,
  onEdit,
  onDelete,
}: PointsListProps) {
  if (loading) {
    return (
      <div className="rounded-3xl border border-dashed border-border bg-muted/10 p-8 text-center text-sm text-muted-foreground">
        Carregando pontos de coleta...
      </div>
    );
  }

  if (!error && points.length === 0) {
    return (
      <Card className="rounded-3xl border-border/80 bg-card/80">
        <CardContent className="p-8 text-center">
          <MapPin className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
          <p className="font-medium text-foreground">
            {query
              ? "Nenhum ponto corresponde à busca."
              : "Nenhum ponto cadastrado."}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {query
              ? "Tente pesquisar por outro nome, bairro ou cidade."
              : "Clique em Novo ponto para cadastrar o primeiro local."}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {points.map((point) => (
        <Card
          key={point.id}
          className="rounded-3xl border-border/80 bg-card/80"
        >
          <CardContent className="flex flex-wrap items-start justify-between gap-4 p-4 sm:p-5">
            <div className="flex min-w-0 flex-1 gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <MapPin className="inline-block h-4 w-4 text-muted-foreground" />
                  <h2 className="font-semibold text-foreground">
                    {point.nome}
                  </h2>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {point.endereco}
                  {point.numero ? `, ${point.numero}` : ""}
                </p>
                <p className="text-sm text-muted-foreground">
                  {[point.bairro, point.cidade].filter(Boolean).join(", ")}
                  {point.cep ? ` · CEP ${point.cep}` : ""}
                </p>
                {point.telefone && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    Telefone: {point.telefone}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onEdit(point)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                <Pencil className="h-4 w-4" />
                Editar
              </button>
              {/* <button
                type="button"
                onClick={() => onDelete(point)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/5 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-500/10 dark:text-red-400"
              >
                <Trash2 className="h-4 w-4" />
                Excluir
              </button> */}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
