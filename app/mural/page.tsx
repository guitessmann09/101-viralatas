"use client";

import { useCallback, useEffect, useState } from "react";
import {
  MapPin,
  RefreshCw,
  HandHeart,
  UserRound,
  CheckCircle,
} from "lucide-react";

interface PontoColeta {
  id: string;
  nome: string;
  endereco: string;
  numero?: string | null;
  bairro?: string | null;
  cidade: string;
  telefone?: string | null;
}

interface Voluntario {
  id: string;
  nome: string;
  telefone: string;
}

interface Coleta {
  id: string;
  status: string;
  createdAt: string;
  pontoColeta: PontoColeta;
  voluntario: Voluntario | null;
}

export default function MuralPage() {
  const [coletas, setColetas] = useState<Coleta[]>([]);
  const [voluntarios, setVoluntarios] = useState<Voluntario[]>([]);
  const [voluntarioSelecionado, setVoluntarioSelecionado] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [reservando, setReservando] = useState<string | null>(null);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const carregarDados = useCallback(async () => {
    try {
      setCarregando(true);
      setErro("");

      const [respostaColetas, respostaVoluntarios] = await Promise.all([
        fetch("/api/coletas?status=DISPONIVEL", { cache: "no-store" }),
        fetch("/api/voluntarios", { cache: "no-store" }),
      ]);

      if (!respostaColetas.ok || !respostaVoluntarios.ok) {
        throw new Error("Não foi possível carregar o mural.");
      }

      const dadosColetas: Coleta[] = await respostaColetas.json();
      const dadosVoluntarios: Voluntario[] =
        await respostaVoluntarios.json();

      setColetas(dadosColetas);
      setVoluntarios(dadosVoluntarios);
    } catch (error) {
      console.error("Erro ao carregar mural:", error);
      setErro("Não foi possível carregar os dados. Tente atualizar.");
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  async function reservarColeta(coletaId: string) {
    if (!voluntarioSelecionado) {
      setErro("Selecione um voluntário antes de assumir a coleta.");
      return;
    }

    const confirmado = window.confirm(
      "Deseja assumir esta coleta?"
    );

    if (!confirmado) return;

    setErro("");
    setSucesso("");
    setReservando(coletaId);

    try {
      const resposta = await fetch(
        `/api/coletas/${coletaId}/reservar`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            voluntarioId: voluntarioSelecionado,
          }),
        }
      );

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(
          resultado.erro || "Não foi possível reservar a coleta."
        );
      }

      setSucesso(
        "Coleta assumida com sucesso! Obrigado por ajudar a ONG."
      );

      await carregarDados();
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Erro ao reservar a coleta."
      );

      // Atualiza a lista caso outro voluntário tenha reservado primeiro.
      await carregarDados();
    } finally {
      setReservando(null);
    }
  }

  return (
    <main className="mx-auto w-full max-w-5xl space-y-6">
      <header className="space-y-2">
        <div className="flex items-center gap-2">
          <HandHeart className="h-7 w-7" />
          <h1 className="text-2xl font-bold">Mural do Voluntário</h1>
        </div>

        <p className="text-sm text-muted-foreground">
          Confira os pontos que precisam de recolhimento e escolha uma coleta
          para ajudar.
        </p>
      </header>

      {erro && (
        <div
          role="alert"
          className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400"
        >
          {erro}
        </div>
      )}

      {sucesso && (
        <div
          role="status"
          className="flex items-start gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-400"
        >
          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {sucesso}
        </div>
      )}

      <section className="rounded-lg border p-4 space-y-3">
        <label
          htmlFor="voluntario"
          className="flex items-center gap-2 text-sm font-semibold"
        >
          <UserRound className="h-4 w-4" />
          Selecione seu cadastro de voluntário
        </label>

        <select
          id="voluntario"
          value={voluntarioSelecionado}
          onChange={(event) =>
            setVoluntarioSelecionado(event.target.value)
          }
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
        >
          <option value="">Escolha seu nome</option>

          {voluntarios.map((voluntario) => (
            <option key={voluntario.id} value={voluntario.id}>
              {voluntario.nome}
            </option>
          ))}
        </select>

        {voluntarios.length === 0 && !carregando && (
          <p className="text-sm text-muted-foreground">
            Nenhum voluntário cadastrado. Cadastre um antes de reservar.
          </p>
        )}
      </section>

      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Coletas disponíveis</h2>
          <p className="text-sm text-muted-foreground">
            {carregando ? "Carregando..." : `${coletas.length} disponível(is)`}
          </p>
        </div>

        <button
          type="button"
          onClick={carregarDados}
          disabled={carregando}
          className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-muted disabled:opacity-50"
        >
          <RefreshCw
            className={`h-4 w-4 ${carregando ? "animate-spin" : ""}`}
          />
          Atualizar
        </button>
      </div>

      {carregando && (
        <p className="py-8 text-center text-sm text-muted-foreground">
          Carregando coletas...
        </p>
      )}

      {!carregando && !erro && coletas.length === 0 && (
        <div className="rounded-lg border p-8 text-center">
          <CheckCircle className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
          <p className="font-semibold">Nenhuma coleta disponível</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Quando a ONG disponibilizar novos pontos, eles aparecerão aqui.
          </p>
        </div>
      )}

      {!carregando && coletas.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {coletas.map((coleta) => {
            const ponto = coleta.pontoColeta;

            const endereco = [
              ponto.endereco,
              ponto.numero,
              ponto.bairro,
              ponto.cidade,
            ]
              .filter(Boolean)
              .join(", ");

            return (
              <article
                key={coleta.id}
                className="flex flex-col justify-between gap-5 rounded-lg border p-5"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold">
                      {ponto.nome}
                    </h3>

                    <span className="shrink-0 rounded-full border border-sky-500/40 bg-sky-500/10 px-2.5 py-1 text-xs text-sky-400">
                      Disponível
                    </span>
                  </div>

                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{endereco || "Endereço não informado"}</span>
                  </div>

                  {ponto.telefone && (
                    <p className="text-sm text-muted-foreground">
                      Telefone do ponto: {ponto.telefone}
                    </p>
                  )}

                  <p className="text-xs text-muted-foreground">
                    Disponibilizada em{" "}
                    {new Date(coleta.createdAt).toLocaleDateString("pt-BR")}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => reservarColeta(coleta.id)}
                  disabled={
                    !voluntarioSelecionado ||
                    reservando !== null
                  }
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <HandHeart className="h-4 w-4" />
                  {reservando === coleta.id
                    ? "Reservando..."
                    : "Eu pego esta coleta"}
                </button>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}