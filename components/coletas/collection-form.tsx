import { Plus } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { Ponto } from "./types";

interface CollectionFormProps {
  points: Ponto[];
  pointId: string;
  loading: boolean;
  saving: boolean;
  message: string;
  onPointChange: (pointId: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function CollectionForm({
  points,
  pointId,
  loading,
  saving,
  message,
  onPointChange,
  onSubmit,
}: CollectionFormProps) {
  return (
    <Card className="rounded-[24px] border-border/80 bg-card/80">
      <CardContent className="p-5 sm:p-6">
        <h2 className="mb-4 text-xl font-semibold text-foreground">Cadastrar nova coleta</h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="ponto" className="text-sm font-medium text-foreground">
              Ponto de coleta
            </label>

            <select
              id="ponto"
              value={pointId}
              onChange={(event) => onPointChange(event.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary"
              required
            >
              <option value="">Selecione um ponto</option>
              {points.map((point) => (
                <option key={point.id} value={point.id}>
                  {point.nome} — {point.cidade}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={saving || loading || points.length === 0}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            <Plus className="h-4 w-4" />
            {saving ? "Salvando..." : "Cadastrar coleta"}
          </button>
        </form>

        {message && (
          <p role="status" className="mt-4 rounded-xl border border-border bg-muted/30 p-3 text-sm text-foreground">
            {message}
          </p>
        )}

        {!loading && points.length === 0 && (
          <p className="mt-4 text-sm text-muted-foreground">
            Nenhum ponto cadastrado. Cadastre um ponto antes de criar uma coleta.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
