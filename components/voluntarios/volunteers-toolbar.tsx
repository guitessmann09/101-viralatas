import { RefreshCw, Search } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface VolunteersToolbarProps {
  count: number;
  loading: boolean;
  query: string;
  onQueryChange: (query: string) => void;
  onRefresh: () => void;
}

export function VolunteersToolbar({
  count,
  loading,
  query,
  onQueryChange,
  onRefresh,
}: VolunteersToolbarProps) {
  return (
    <Card className="rounded-3xl border-border/80 bg-card/80">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-muted-foreground">Voluntários cadastrados</p>
            <p className="text-3xl font-bold text-foreground">{loading ? "..." : count}</p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Buscar voluntário..."
              aria-label="Buscar voluntário"
              className="w-44 bg-transparent py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
          </div>

          <button
            type="button"
            onClick={onRefresh}
            disabled={loading}
            aria-label="Atualizar lista"
            className="rounded-xl border border-border bg-background p-2.5 text-foreground transition-colors hover:bg-muted disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
