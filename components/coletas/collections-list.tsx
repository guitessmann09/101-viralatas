import { Card, CardContent } from "@/components/ui/card";
import type { Coleta } from "./types";

interface CollectionsListProps {
  collections: Coleta[];
  loading: boolean;
}

export function CollectionsList({ collections, loading }: CollectionsListProps) {
  return (
    <Card className="rounded-[24px] border-border/80 bg-card/80">
      <CardContent className="p-5 sm:p-6">
        <h2 className="mb-4 text-xl font-semibold text-foreground">Coletas cadastradas</h2>

        {loading ? (
          <p className="text-sm text-muted-foreground">Carregando coletas...</p>
        ) : collections.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-muted/10 p-8 text-center text-sm text-muted-foreground">
            Nenhuma coleta cadastrada.
          </div>
        ) : (
          <div className="space-y-3">
            {collections.map((collection) => (
              <article key={collection.id} className="rounded-2xl border border-border/80 bg-background/60 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {collection.pontoColeta?.nome ?? "Ponto não identificado"}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {collection.pontoColeta?.endereco ?? ""}
                      {collection.pontoColeta?.cidade ? ` — ${collection.pontoColeta.cidade}` : ""}
                    </p>
                  </div>

                  <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                    {collection.status}
                  </span>
                </div>

                <p className="mt-3 text-sm text-muted-foreground">
                  Cadastro: {new Date(collection.createdAt).toLocaleString("pt-BR")}
                </p>
              </article>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
