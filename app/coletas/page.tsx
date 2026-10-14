"use client";

import { useEffect, useState } from "react";

type Ponto = {
  id: string;
  nome: string;
  endereco: string;
  cidade: string;
};

type Coleta = {
  id: string;
  status: string;
  createdAt: string;
  pontoColeta: Ponto;
};

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
    carregarDados();
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
        erro instanceof Error ? erro.message : "Erro ao cadastrar a coleta."
      );
    } finally {
      setSalvando(false);
    }
  }

  return (
    <main className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Coletas</h1>
        <p className="mt-2 text-muted-foreground">
          Cadastre e acompanhe as coletas dos pontos da ONG.
        </p>
      </div>

      <section className="rounded-xl border p-5">
        <h2 className="mb-4 text-xl font-semibold">Cadastrar nova coleta</h2>

        <form onSubmit={cadastrarColeta} className="space-y-4">
          <div>
            <label htmlFor="ponto" className="mb-2 block font-medium">
              Ponto de coleta
            </label>

            <select
              id="ponto"
              value={pontoId}
              onChange={(event) => setPontoId(event.target.value)}
              className="w-full rounded-md border bg-background p-3"
              required
            >
              <option value="">Selecione um ponto</option>
              {pontos.map((ponto) => (
                <option key={ponto.id} value={ponto.id}>
                  {ponto.nome} — {ponto.cidade}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={salvando || carregando || pontos.length === 0}
            className="rounded-md bg-primary px-5 py-3 font-medium text-primary-foreground disabled:opacity-50"
          >
            {salvando ? "Salvando..." : "Cadastrar coleta"}
          </button>
        </form>

        {mensagem && (
          <p role="status" className="mt-4 rounded-md border p-3">
            {mensagem}
          </p>
        )}

        {!carregando && pontos.length === 0 && (
          <p className="mt-4 text-sm text-muted-foreground">
            Nenhum ponto cadastrado. Cadastre um ponto antes de criar uma coleta.
          </p>
        )}
      </section>

      <section className="rounded-xl border p-5">
        <h2 className="mb-4 text-xl font-semibold">Coletas cadastradas</h2>

        {carregando ? (
          <p>Carregando coletas...</p>
        ) : coletas.length === 0 ? (
          <p>Nenhuma coleta cadastrada.</p>
        ) : (
          <div className="space-y-3">
            {coletas.map((coleta) => (
              <article key={coleta.id} className="rounded-lg border p-4">
                <h3 className="font-semibold">
                  {coleta.pontoColeta?.nome ?? "Ponto não identificado"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {coleta.pontoColeta?.endereco ?? ""}
                  {coleta.pontoColeta?.cidade
                    ? ` — ${coleta.pontoColeta.cidade}`
                    : ""}
                </p>
                <p className="mt-2">
                  Status: <strong>{coleta.status}</strong>
                </p>
                <p className="text-sm text-muted-foreground">
                  Cadastro: {new Date(coleta.createdAt).toLocaleString("pt-BR")}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}