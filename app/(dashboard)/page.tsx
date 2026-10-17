"use client";

import { useCallback, useEffect, useState } from "react";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardMetrics } from "@/components/dashboard/dashboard-metrics";
import { DashboardQuickActions } from "@/components/dashboard/dashboard-quick-actions";
import { DashboardRecentColetas } from "@/components/dashboard/dashboard-recent-coletas";
import { DashboardStatusCard } from "@/components/dashboard/dashboard-status-card";

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

export default function Home() {
  const [coletas, setColetas] = useState<Coleta[]>([]);
  const [pontosAtivos, setPontosAtivos] = useState(0);
  const [voluntariosAtivos, setVoluntariosAtivos] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState<Date | null>(null);

  const carregarDados = useCallback(async () => {
    try {
      setCarregando(true);
      setErro("");

      const [resColetas, resPontos, resVoluntarios] = await Promise.all([
        fetch("/api/coletas", { cache: "no-store" }),
        fetch("/api/pontos", { cache: "no-store" }),
        fetch("/api/voluntarios", { cache: "no-store" }),
      ]);

      if (!resColetas.ok || !resPontos.ok || !resVoluntarios.ok) {
        throw new Error("Falha ao consultar uma ou mais APIs.");
      }

      const [dadosColetas, dadosPontos, dadosVoluntarios] = await Promise.all([
        resColetas.json(),
        resPontos.json(),
        resVoluntarios.json(),
      ]);

      if (
        !Array.isArray(dadosColetas) ||
        !Array.isArray(dadosPontos) ||
        !Array.isArray(dadosVoluntarios)
      ) {
        throw new Error("Uma API retornou dados em formato inesperado.");
      }

      setColetas(dadosColetas);
      setPontosAtivos(
        dadosPontos.filter(
          (p: PontoColeta) => !p.status || p.status === "ATIVO",
        ).length,
      );
      setVoluntariosAtivos(
        dadosVoluntarios.filter(
          (v: Voluntario) => !v.status || v.status === "ATIVO",
        ).length,
      );
      setUltimaAtualizacao(new Date());
    } catch (error) {
      console.error("Erro ao carregar Dashboard:", error);
      setErro("Não foi possível carregar os dados. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void carregarDados();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [carregarDados]);

  const coletasAbertas = coletas.filter((c) => c.status === "DISPONIVEL").length;
  const coletasReservadas = coletas.filter((c) => c.status === "RESERVADA").length;
  const coletasConcluidas = coletas.filter((c) => c.status === "CONCLUIDA").length;

  const coletasRecentes = [...coletas]
    .sort((a, b) => {
      const dataA = new Date(a.updatedAt || a.createdAt).getTime();
      const dataB = new Date(b.updatedAt || b.createdAt).getTime();
      return dataB - dataA;
    })
    .slice(0, 5);

  const totalColetas = coletas.length;
  const percentual = (valor: number) =>
    totalColetas > 0 ? (valor / totalColetas) * 100 : 0;

  const limiteDisponiveis = percentual(coletasAbertas);
  const limiteReservadas = limiteDisponiveis + percentual(coletasReservadas);

  const graficoCircular =
    totalColetas === 0
      ? "conic-gradient(#d4d4d8 0% 100%)"
      : `conic-gradient(
          #3b82f6 0% ${limiteDisponiveis}%,
          #f59e0b ${limiteDisponiveis}% ${limiteReservadas}%,
          #22c55e ${limiteReservadas}% 100%
        )`;

  return (
    <div className="space-y-6">
      <DashboardHeader
        carregando={carregando}
        erro={erro}
        ultimaAtualizacao={ultimaAtualizacao}
        onRefresh={() => void carregarDados()}
      />

      <DashboardMetrics
        carregando={carregando}
        pontosAtivos={pontosAtivos}
        coletasAbertas={coletasAbertas}
        coletasReservadas={coletasReservadas}
        voluntariosAtivos={voluntariosAtivos}
        coletasConcluidas={coletasConcluidas}
      />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <DashboardQuickActions />
        <DashboardStatusCard
          totalColetas={totalColetas}
          coletasAbertas={coletasAbertas}
          coletasReservadas={coletasReservadas}
          coletasConcluidas={coletasConcluidas}
          graficoCircular={graficoCircular}
        />
      </div>

      <DashboardRecentColetas coletas={coletasRecentes} />
    </div>
  );
}
