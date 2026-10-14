"use client";

import { useCallback, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  History,
  RefreshCw,
  MapPin,
  UserRound,
  CalendarDays,
} from "lucide-react";

interface PontoColeta {
  id: string;
  nome: string;
  endereco?: string;
  cidade?: string;
}

interface Voluntario {
  id: string;
  nome: string;
}

interface Coleta {
  id: string;
  status: string;
  createdAt: string;
  dataSolicitacao?: string;
  dataReserva?: string | null;
  dataConclusao?: string | null;
  pontoColeta: PontoColeta;
  voluntario: Voluntario | null;
}

const filtros = [
  { label: "Todas", value: "TODAS" },
  { label: "Disponíveis", value: "DISPONIVEL" },
  { label: "Reservadas", value: "RESERVADA" },
  { label: "Concluídas", value: "CONCLUIDA" },
];

function formatarData(data?: string | null) {
  if (!data) return "—";

  const dataObj = new Date(data);

  if (Number.isNaN(dataObj.getTime())) return "—";

  return dataObj.toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

function nomeStatus(status: string) {
  if (status === "DISPONIVEL") return "Disponível";
  if (status === "RESERVADA") return "Reservada";
  if (status === "CONCLUIDA") return "Concluída";
  return status;
}

function classeStatus(status: string) {
  if (status === "CONCLUIDA") {
    return "border-emerald-500/40 bg-emerald-500/10 text-emerald-400";
  }

  if (status === "RESERVADA") {
    return "border-amber-500/40 bg-amber-500/10 text-amber-400";
  }

  return "border-sky-500/40 bg-sky-500/10 text-sky-400";
}

export default function HistoricoPage() {
  const [filtro, setFiltro] = useState("TODAS");
  const [coletas, setColetas] = useState<Coleta[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const carregarColetas = useCallback(async () => {
    try {
      setCarregando(true);
      setErro("");

      const url =
        filtro === "TODAS"
          ? "/api/coletas"
          : `/api/coletas?status=${filtro}`;

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
    carregarColetas();
  }, [carregarColetas]);

  const total = coletas.length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <History className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Histórico de Coletas</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Consulte as coletas registradas pela ONG.
          </p>
        </div>

        <button
          type="button"
          onClick={carregarColetas}
          disabled={carregando}
          className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm hover:bg-muted disabled:opacity-50"
        >
          <RefreshCw
            className={`h-4 w-4 ${carregando ? "animate-spin" : ""}`}
          />
          Atualizar
        </button>
      </div>

      <Card className="rounded-lg">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Registros encontrados
              </p>
              <p className="text-3xl font-bold">
                {carregando ? "..." : total}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {filtros.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setFiltro(item.value)}
                  className={`rounded-md border px-3 py-2 text-sm transition-colors ${
                    filtro === item.value
                      ? "border-primary bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {erro && (
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-red-400">{erro}</p>
            <button
              type="button"
              onClick={carregarColetas}
              className="mt-3 text-sm underline"
            >
              Tentar novamente
            </button>
          </CardContent>
        </Card>
      )}

      {carregando && (
        <p className="py-8 text-center text-sm text-muted-foreground">
          Carregando histórico...
        </p>
      )}

      {!carregando && !erro && coletas.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <History className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
            <p className="font-medium">Nenhuma coleta encontrada</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Tente selecionar outro filtro.
            </p>
          </CardContent>
        </Card>
      )}

      {!carregando && !erro && coletas.length > 0 && (
        <div className="space-y-3">
          {coletas.map((coleta) => (
            <Card key={coleta.id} className="rounded-lg">
              <CardContent className="p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 space-y-3">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        Ponto de coleta
                      </p>
                      <h2 className="mt-1 font-semibold">
                        {coleta.pontoColeta?.nome || "Ponto não informado"}
                      </h2>
                    </div>

                    <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <UserRound className="h-4 w-4" />
                        {coleta.voluntario?.nome || "Sem voluntário"}
                      </span>

                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        {coleta.pontoColeta?.endereco || "Endereço não informado"}
                        {coleta.pontoColeta?.cidade
                          ? `, ${coleta.pontoColeta.cidade}`
                          : ""}
                      </span>
                    </div>
                  </div>

                  <Badge
                    variant="outline"
                    className={classeStatus(coleta.status)}
                  >
                    {nomeStatus(coleta.status)}
                  </Badge>
                </div>

                <div className="mt-4 grid gap-3 border-t pt-4 text-sm sm:grid-cols-3">
                  <div>
                    <p className="flex items-center gap-1.5 text-muted-foreground">
                      <CalendarDays className="h-4 w-4" />
                      Solicitação
                    </p>
                    <p className="mt-1">
                      {formatarData(
                        coleta.dataSolicitacao || coleta.createdAt
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Reserva</p>
                    <p className="mt-1">{formatarData(coleta.dataReserva)}</p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Conclusão</p>
                    <p className="mt-1">
                      {formatarData(coleta.dataConclusao)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}