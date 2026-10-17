import { RefreshCw } from "lucide-react";

interface DashboardHeaderProps {
  carregando: boolean;
  erro: string;
  ultimaAtualizacao: Date | null;
  onRefresh: () => void;
}

export function DashboardHeader({
  carregando,
  erro,
  ultimaAtualizacao,
  onRefresh,
}: DashboardHeaderProps) {
  return (
    <section className="overflow-hidden rounded-[28px] border border-border/80 bg-card/80 backdrop-blur-sm">
      <div className="flex flex-col gap-4 border-b border-border/80  from-primary/10 via-background to-secondary/50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="space-y-2">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Visão geral das atividades da ONG 101 Vira-Latas.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          disabled={carregando}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            className={`h-4 w-4 ${carregando ? "animate-spin" : ""}`}
          />
          {carregando ? "Atualizando..." : "Atualizar dados"}
        </button>
      </div>

      <div className="p-5 sm:p-6">
        {ultimaAtualizacao && !erro && (
          <p className="mb-4 text-xs text-muted-foreground">
            Última atualização:{" "}
            {ultimaAtualizacao.toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        )}

        {erro && (
          <div
            role="alert"
            className="mb-4 flex flex-col gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="text-sm text-red-600 dark:text-red-400">{erro}</p>
            <button
              type="button"
              onClick={onRefresh}
              className="rounded-lg border border-red-500/40 bg-transparent px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-500/10 dark:text-red-400"
            >
              Tentar novamente
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
