import { CheckCircle, HandHeart, MapPin, RefreshCw } from "lucide-react";

import type { Coleta } from "./types";

interface AvailableCollectionsProps {
  collections: Coleta[];
  loading: boolean;
  selectedVolunteerId: string;
  reservingId: string | null;
  onRefresh: () => void;
  onReserve: (collectionId: string) => void;
}

export function AvailableCollections({
  collections,
  loading,
  selectedVolunteerId,
  reservingId,
  onRefresh,
  onReserve,
}: AvailableCollectionsProps) {
  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Coletas disponíveis</h2>
          <p className="text-sm text-muted-foreground">
            {loading ? "Carregando..." : `${collections.length} disponível(is)`}
          </p>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-muted disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Atualizar
        </button>
      </div>

      {loading && (
        <p className="py-8 text-center text-sm text-muted-foreground">Carregando coletas...</p>
      )}

      {!loading && collections.length === 0 && (
        <div className="rounded-lg border p-8 text-center">
          <CheckCircle className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
          <p className="font-semibold">Nenhuma coleta disponível</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Quando a ONG disponibilizar novos pontos, eles aparecerão aqui.
          </p>
        </div>
      )}

      {!loading && collections.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {collections.map((collection) => {
            const point = collection.pontoColeta;
            const address = [point.endereco, point.numero, point.bairro, point.cidade]
              .filter(Boolean)
              .join(", ");

            return (
              <article
                key={collection.id}
                className="flex flex-col justify-between gap-5 rounded-lg border p-5"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold">{point.nome}</h3>
                    <span className="shrink-0 rounded-full border border-sky-500/40 bg-sky-500/10 px-2.5 py-1 text-xs text-sky-400">
                      Disponível
                    </span>
                  </div>

                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{address || "Endereço não informado"}</span>
                  </div>

                  {point.telefone && (
                    <p className="text-sm text-muted-foreground">
                      Telefone do ponto: {point.telefone}
                    </p>
                  )}

                  <p className="text-xs text-muted-foreground">
                    Disponibilizada em{" "}
                    {new Date(collection.createdAt).toLocaleDateString("pt-BR")}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onReserve(collection.id)}
                  disabled={!selectedVolunteerId || reservingId !== null}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <HandHeart className="h-4 w-4" />
                  {reservingId === collection.id ? "Reservando..." : "Eu pego esta coleta"}
                </button>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}
