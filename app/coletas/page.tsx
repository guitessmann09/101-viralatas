"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

import { ManagementPageHeader } from "@/components/management-page-header";
import { CollectionForm } from "@/components/coletas/collection-form";
import { CollectionsList } from "@/components/coletas/collections-list";
import type { Coleta, Ponto } from "@/components/coletas/types";

export default function ColetasPage() {
  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [coletas, setColetas] = useState<Coleta[]>([]);
  const [pontoId, setPontoId] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  async function carregarDados() {
    setCarregando(true);

    try {
      const [resPontos, resColetas] = await Promise.all([
        fetch("/api/pontos"),
        fetch("/api/coletas"),
      ]);

      if (!resPontos.ok || !resColetas.ok) {
        throw new Error("Não foi possível carregar os dados.");
      }

      const dadosPontos = await resPontos.json();
      const dadosColetas = await resColetas.json();

      setPontos(dadosPontos);
      setColetas(dadosColetas);
    } catch {
      setMensagem("Erro ao carregar os dados. Tente atualizar a página.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void carregarDados();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  async function cadastrarColeta(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMensagem("");

    if (!pontoId) {
      setMensagem("Selecione um ponto de coleta.");
      return;
    }

    setSalvando(true);

    try {
      const resposta = await fetch("/api/coletas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pontoColetaId: pontoId }),
      });

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(resultado.erro || "Erro ao cadastrar a coleta.");
      }

      setMensagem("Coleta cadastrada com sucesso!");
      setPontoId("");
      await carregarDados();
    } catch (erro) {
      setMensagem(
        erro instanceof Error ? erro.message : "Erro ao cadastrar a coleta.",
      );
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="space-y-6">
      <ManagementPageHeader
        title="Coletas"
        description="Cadastre e acompanhe as coletas dos pontos da ONG."
        action={
          <button
            type="button"
            onClick={() => void carregarDados()}
            disabled={carregando}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              className={`h-4 w-4 ${carregando ? "animate-spin" : ""}`}
            />
            Atualizar
          </button>
        }
      />

      <CollectionForm
        points={pontos}
        pointId={pontoId}
        loading={carregando}
        saving={salvando}
        message={mensagem}
        onPointChange={setPontoId}
        onSubmit={cadastrarColeta}
      />
      <CollectionsList collections={coletas} loading={carregando} />
    </div>
  );
}
