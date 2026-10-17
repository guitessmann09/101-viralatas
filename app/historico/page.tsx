"use client";

import { useCallback, useEffect, useState } from "react";
import { History, RefreshCw } from "lucide-react";

import { ManagementPageHeader } from "@/components/management-page-header";
import { HistoryFilters } from "@/components/historico/history-filters";
import { HistoryList } from "@/components/historico/history-list";
import type { Coleta } from "@/components/historico/types";
import { Card, CardContent } from "@/components/ui/card";

export default function HistoricoPage() {
  const [filtro, setFiltro] = useState("TODAS");
  const [coletas, setColetas] = useState<Coleta[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const carregarColetas = useCallback(async () => {
    try {
      setCarregando(true);
      setErro("");

      const url = filtro === "TODAS" ? "/api/coletas" : `/api/coletas?status=${filtro}`;
      const resposta = await fetch(url);

      if (!resposta.ok) {
        throw new Error("Não foi possível carregar o histórico.");
      }

      const dados: Coleta[] = await resposta.json();
      setColetas(dados);
    } catch (error) {
      console.error("Erro ao carregar histórico:", error);
      setErro("Não foi possível carregar as coletas. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }, [filtro]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void carregarColetas();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [carregarColetas]);

  return (
    <div className="space-y-6">
      <ManagementPageHeader
        icon={<History className="h-3.5 w-3.5" />}
        category="Histórico"
        title="Histórico de coletas"
        description="Consulte as coletas registradas pela ONG."
        action={
          <button
            type="button"
            onClick={() => void carregarColetas()}
            disabled={carregando}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw className={`h-4 w-4 ${carregando ? "animate-spin" : ""}`} />
            Atualizar
          </button>
        }
      />

      <HistoryFilters
        filter={filtro}
        total={coletas.length}
        loading={carregando}
        onChange={setFiltro}
      />

      {erro && (
        <Card className="rounded-[24px] border-border/80 bg-card/80">
          <CardContent className="p-5">
            <p className="text-sm text-red-600 dark:text-red-400">{erro}</p>
            <button
              type="button"
              onClick={() => void carregarColetas()}
              className="mt-3 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Tentar novamente
            </button>
          </CardContent>
        </Card>
      )}

      <HistoryList collections={coletas} loading={carregando} error={erro} />
    </div>
  );
}
