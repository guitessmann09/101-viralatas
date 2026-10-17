import { History } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { HistoryCard } from "./history-card";
import type { Coleta } from "./types";

interface HistoryListProps {
  collections: Coleta[];
  loading: boolean;
  error: string;
}

export function HistoryList({ collections, loading, error }: HistoryListProps) {
  if (loading) {
    return (
      <div className="rounded-[24px] border border-dashed border-border bg-muted/10 p-8 text-center text-sm text-muted-foreground">
        Carregando histórico...
      </div>
    );
  }

  if (error) return null;

  if (collections.length === 0) {
    return (
      <Card className="rounded-[24px] border-border/80 bg-card/80">
        <CardContent className="p-8 text-center">
          <History className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
          <p className="font-medium text-foreground">Nenhuma coleta encontrada</p>
          <p className="mt-1 text-sm text-muted-foreground">Tente selecionar outro filtro.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {collections.map((collection) => (
        <HistoryCard key={collection.id} collection={collection} />
      ))}
    </div>
  );
}
