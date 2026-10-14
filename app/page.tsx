"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { DashboardCard } from "@/components/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  CheckCircleIcon,
  MapPinIcon,
  PackageIcon,
  UsersIcon,
  RefreshCw,
  PlusCircle,
  ClipboardList,
  HandHeart,
  PieChart,
} from "lucide-react";

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
  const [ultimaAtualizacao, setUltimaAtualizacao] =
    useState<Date | null>(null);

  const carregarDados = useCallback(async () => {
    try {
      setCarregando(true);
      setErro("");

      const [resColetas, resPontos, resVoluntarios] =
        await Promise.all([
          fetch("/api/coletas", { cache: "no-store" }),
          fetch("/api/pontos", { cache: "no-store" }),
          fetch("/api/voluntarios", { cache: "no-store" }),
        ]);

      if (
        !resColetas.ok ||
        !resPontos.ok ||
        !resVoluntarios.ok
      ) {
        throw new Error("Falha ao consultar uma ou mais APIs.");
      }

      const [dadosColetas, dadosPontos, dadosVoluntarios] =
        await Promise.all([
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
          (p: PontoColeta) => !p.status || p.status === "ATIVO"
        ).length
      );

      setVoluntariosAtivos(
        dadosVoluntarios.filter(
          (v: Voluntario) => !v.status || v.status === "ATIVO"
        ).length
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
    void carregarDados();
  }, [carregarDados]);

  const coletasAbertas = coletas.filter(
    (c) => c.status === "DISPONIVEL"
  ).length;

  const coletasReservadas = coletas.filter(
    (c) => c.status === "RESERVADA"
  ).length;

  const coletasConcluidas = coletas.filter(
    (c) => c.status === "CONCLUIDA"
  ).length;

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
  const limiteReservadas =
    limiteDisponiveis + percentual(coletasReservadas);

  const graficoCircular =
    totalColetas === 0
      ? "conic-gradient(#52525b 0% 100%)"
      : `conic-gradient(
          #3b82f6 0% ${limiteDisponiveis}%,
          #f59e0b ${limiteDisponiveis}% ${limiteReservadas}%,
          #22c55e ${limiteReservadas}% 100%
        )`;

  function formatarData(data?: string | null) {
    if (!data) return "Data não informada";

    const convertida = new Date(data);

    if (Number.isNaN(convertida.getTime())) {
      return "Data não informada";
    }

    return convertida.toLocaleDateString("pt-BR");
  }

  function textoStatus(status: string) {
    switch (status) {
      case "DISPONIVEL":
        return "Disponível";
      case "RESERVADA":
        return "Reservada";
      case "CONCLUIDA":
        return "Concluída";
      default:
        return status;
    }
  }

  function varianteStatus(status: string) {
    if (status === "CONCLUIDA") return "default" as const;
    return "outline" as const;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Visão geral das atividades da ONG 101 Vira-Latas.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void carregarDados()}
          disabled={carregando}
          className="inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent disabled:opacity-60"
        >
          <RefreshCw
            className={`h-4 w-4 ${carregando ? "animate-spin" : ""}`}
          />
          {carregando ? "Atualizando..." : "Atualizar dados"}
        </button>
      </div>

      {ultimaAtualizacao && !erro && (
        <p className="text-xs text-muted-foreground">
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
          className="flex flex-col gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-sm text-red-500">{erro}</p>
          <button
            type="button"
            onClick={() => void carregarDados()}
            className="rounded-md border px-3 py-2 text-sm hover:bg-accent"
          >
            Tentar novamente
          </button>
        </div>
      )}

      <div className="grid auto-rows-min gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          title="Pontos Ativos"
          value={carregando ? "..." : pontosAtivos}
          icon={<MapPinIcon height={20} width={20} />}
        />

        <DashboardCard
          title="Coletas Disponíveis"
          value={carregando ? "..." : coletasAbertas}
          complementaryText={
            carregando ? "" : `${coletasReservadas} reservadas`
          }
          icon={<PackageIcon height={20} width={20} />}
        />

        <DashboardCard
          title="Voluntários Ativos"
          value={carregando ? "..." : voluntariosAtivos}
          icon={<UsersIcon height={20} width={20} />}
        />

        <DashboardCard
          title="Coletas Concluídas"
          value={carregando ? "..." : coletasConcluidas}
          complementaryText="Total de coletas concluídas"
          icon={<CheckCircleIcon height={20} width={20} />}
        />
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold">Ações rápidas</h2>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <Link
            href="/coletas"
            className="flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-accent"
          >
            <PlusCircle className="h-5 w-5 shrink-0" />
            <div>
              <p className="font-medium">Cadastrar coleta</p>
              <p className="text-xs text-muted-foreground">
                Registrar um novo pedido de recolhimento
              </p>
            </div>
          </Link>

          <Link
            href="/pontos"
            className="flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-accent"
          >
            <MapPinIcon className="h-5 w-5 shrink-0" />
            <div>
              <p className="font-medium">Gerenciar pontos</p>
              <p className="text-xs text-muted-foreground">
                Consultar e editar pontos de coleta
              </p>
            </div>
          </Link>

          <Link
            href="/mural"
            className="flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-accent"
          >
            <HandHeart className="h-5 w-5 shrink-0" />
            <div>
              <p className="font-medium">Mural do voluntário</p>
              <p className="text-xs text-muted-foreground">
                Consultar coletas disponíveis
              </p>
            </div>
          </Link>
        </div>
      </section>

      <section className="grid items-start gap-4 xl:grid-cols-2">
        <Card className="overflow-hidden rounded-lg p-0">
          <div className="flex items-center justify-between gap-3 px-5 py-4">
            <h2 className="text-lg font-bold">Atividade recente</h2>
            <span className="text-xs text-muted-foreground">
              Últimas 5 coletas
            </span>
          </div>

          {carregando && (
            <p className="border-t px-5 py-6 text-sm text-muted-foreground">
              Carregando coletas...
            </p>
          )}

          {!carregando && !erro && coletasRecentes.length === 0 && (
            <div className="border-t px-5 py-8 text-center">
              <ClipboardList className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
              <p className="text-sm font-medium">
                Nenhuma coleta cadastrada
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Cadastre uma coleta para começar.
              </p>
            </div>
          )}

          {!carregando && !erro && coletasRecentes.length > 0 && (
            <ul>
              {coletasRecentes.map((coleta) => {
                const data =
                  coleta.updatedAt ||
                  coleta.dataConclusao ||
                  coleta.dataReserva ||
                  coleta.dataSolicitacao ||
                  coleta.createdAt;

                return (
                  <li
                    key={coleta.id}
                    className="flex items-center justify-between gap-4 border-t border-neutral-700/50 px-5 py-4"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {coleta.pontoColeta?.nome || "Ponto não informado"}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatarData(data)}
                        {coleta.voluntario
                          ? ` · ${coleta.voluntario.nome}`
                          : " · Sem voluntário atribuído"}
                      </p>
                    </div>

                    <Badge
                      variant={varianteStatus(coleta.status)}
                      className="shrink-0 px-2 py-1 text-xs"
                    >
                      {textoStatus(coleta.status)}
                    </Badge>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        <Card className="rounded-lg p-5">
          <div className="mb-5 flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            <h2 className="text-lg font-bold">Status das coletas</h2>
          </div>

          {carregando ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Calculando status...
            </p>
          ) : (
            <>
              <div className="flex justify-center py-3">
                <div
                  className="relative flex h-44 w-44 items-center justify-center rounded-full"
                  style={{ background: graficoCircular }}
                  role="img"
                  aria-label={`Distribuição de ${totalColetas} coletas por status`}
                >
                  <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-background">
                    <span className="text-3xl font-bold">
                      {totalColetas}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      coletas
                    </span>
                  </div>
                </div>
              </div>

              {totalColetas === 0 && (
                <p className="mb-3 text-center text-xs text-muted-foreground">
                  Cadastre coletas para visualizar o gráfico.
                </p>
              )}

              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-sm bg-blue-500" />
                    Disponíveis
                  </div>
                  <span className="font-semibold">
                    {coletasAbertas} ({percentual(coletasAbertas).toFixed(0)}%)
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-sm bg-amber-500" />
                    Reservadas
                  </div>
                  <span className="font-semibold">
                    {coletasReservadas} ({percentual(coletasReservadas).toFixed(0)}%)
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-sm bg-green-500" />
                    Concluídas
                  </div>
                  <span className="font-semibold">
                    {coletasConcluidas} ({percentual(coletasConcluidas).toFixed(0)}%)
                  </span>
                </div>
              </div>
            </>
          )}
        </Card>
      </section>
    </div>
  );
}