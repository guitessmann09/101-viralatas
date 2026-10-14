"use client";

import { useCallback, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  Plus,
  Pencil,
  Trash2,
  X,
  RefreshCw,
  Search,
} from "lucide-react";

interface Ponto {
  id: string;
  nome: string;
  telefone?: string | null;
  endereco: string;
  numero?: string | null;
  bairro?: string | null;
  cidade: string;
  cep?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}

interface FormularioPonto {
  nome: string;
  telefone: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidade: string;
  cep: string;
}

const formularioVazio: FormularioPonto = {
  nome: "",
  telefone: "",
  endereco: "",
  numero: "",
  bairro: "",
  cidade: "",
  cep: "",
};

export default function PontosPage() {
  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [formulario, setFormulario] =
    useState<FormularioPonto>(formularioVazio);
  const [pontoEditando, setPontoEditando] = useState<string | null>(null);
  const [busca, setBusca] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const carregarPontos = useCallback(async () => {
    try {
      setCarregando(true);
      setErro("");

      const resposta = await fetch("/api/pontos");

      if (!resposta.ok) {
        throw new Error("Não foi possível carregar os pontos.");
      }

      const dados: Ponto[] = await resposta.json();
      setPontos(dados);
    } catch (error) {
      console.error("Erro ao carregar pontos:", error);
      setErro("Não foi possível carregar os pontos de coleta.");
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarPontos();
  }, [carregarPontos]);

  function atualizarCampo(
    campo: keyof FormularioPonto,
    valor: string
  ) {
    setFormulario((atual) => ({
      ...atual,
      [campo]: valor,
    }));
  }

  function novoPonto() {
    setFormulario(formularioVazio);
    setPontoEditando(null);
    setErro("");
    setSucesso("");
    setMostrarFormulario(true);
  }

  function editarPonto(ponto: Ponto) {
    setFormulario({
      nome: ponto.nome || "",
      telefone: ponto.telefone || "",
      endereco: ponto.endereco || "",
      numero: ponto.numero || "",
      bairro: ponto.bairro || "",
      cidade: ponto.cidade || "",
      cep: ponto.cep || "",
    });

    setPontoEditando(ponto.id);
    setErro("");
    setSucesso("");
    setMostrarFormulario(true);
  }

  function cancelarEdicao() {
    setMostrarFormulario(false);
    setPontoEditando(null);
    setFormulario(formularioVazio);
    setErro("");
  }

  async function salvarPonto(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");
    setSucesso("");

    if (
      !formulario.nome.trim() ||
      !formulario.endereco.trim() ||
      !formulario.cidade.trim()
    ) {
      setErro("Preencha nome, endereço e cidade.");
      return;
    }

    try {
      setSalvando(true);

      const editando = pontoEditando !== null;
      const url = editando
        ? `/api/pontos/${pontoEditando}`
        : "/api/pontos";

      const resposta = await fetch(url, {
        method: editando ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formulario.nome.trim(),
          telefone: formulario.telefone.trim() || null,
          endereco: formulario.endereco.trim(),
          numero: formulario.numero.trim() || null,
          bairro: formulario.bairro.trim() || null,
          cidade: formulario.cidade.trim(),
          cep: formulario.cep.trim() || null,
        }),
      });

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(
          resultado.erro || "Não foi possível salvar o ponto."
        );
      }

      setSucesso(
        editando
          ? "Ponto atualizado com sucesso!"
          : "Ponto cadastrado com sucesso!"
      );

      setMostrarFormulario(false);
      setPontoEditando(null);
      setFormulario(formularioVazio);

      await carregarPontos();
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Erro ao salvar o ponto."
      );
    } finally {
      setSalvando(false);
    }
  }

  async function excluirPonto(ponto: Ponto) {
    const confirmado = window.confirm(
      `Deseja realmente excluir o ponto "${ponto.nome}"?`
    );

    if (!confirmado) return;

    setErro("");
    setSucesso("");

    try {
      const resposta = await fetch(`/api/pontos/${ponto.id}`, {
        method: "DELETE",
      });

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(
          resultado.erro || "Não foi possível excluir o ponto."
        );
      }

      setSucesso("Ponto excluído com sucesso.");
      await carregarPontos();
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Erro ao excluir o ponto."
      );
    }
  }

  const pontosFiltrados = pontos.filter((ponto) => {
    const texto = busca.toLocaleLowerCase("pt-BR");

    return [
      ponto.nome,
      ponto.endereco,
      ponto.bairro || "",
      ponto.cidade,
      ponto.cep || "",
    ].some((valor) =>
      valor.toLocaleLowerCase("pt-BR").includes(texto)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Pontos de Coleta</h1>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Cadastre e gerencie os locais de arrecadação da ONG.
          </p>
        </div>

        <button
          type="button"
          onClick={novoPonto}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Novo ponto
        </button>
      </div>

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
          className="rounded-md border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-400"
        >
          {sucesso}
        </div>
      )}

      {mostrarFormulario && (
        <Card className="rounded-lg">
          <CardContent className="p-5">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">
                {pontoEditando ? "Editar ponto" : "Cadastrar ponto"}
              </h2>

              <button
                type="button"
                onClick={cancelarEdicao}
                aria-label="Fechar formulário"
                className="rounded-md p-2 hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={salvarPonto} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="nome" className="text-sm font-medium">
                    Nome do ponto *
                  </label>
                  <input
                    id="nome"
                    required
                    value={formulario.nome}
                    onChange={(e) =>
                      atualizarCampo("nome", e.target.value)
                    }
                    placeholder="Ex.: Mercado do bairro"
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="telefone" className="text-sm font-medium">
                    Telefone
                  </label>
                  <input
                    id="telefone"
                    value={formulario.telefone}
                    onChange={(e) =>
                      atualizarCampo("telefone", e.target.value)
                    }
                    placeholder="Telefone de contato"
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="endereco" className="text-sm font-medium">
                    Endereço *
                  </label>
                  <input
                    id="endereco"
                    required
                    value={formulario.endereco}
                    onChange={(e) =>
                      atualizarCampo("endereco", e.target.value)
                    }
                    placeholder="Nome da rua ou avenida"
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="numero" className="text-sm font-medium">
                    Número
                  </label>
                  <input
                    id="numero"
                    value={formulario.numero}
                    onChange={(e) =>
                      atualizarCampo("numero", e.target.value)
                    }
                    placeholder="Número do local"
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="bairro" className="text-sm font-medium">
                    Bairro
                  </label>
                  <input
                    id="bairro"
                    value={formulario.bairro}
                    onChange={(e) =>
                      atualizarCampo("bairro", e.target.value)
                    }
                    placeholder="Bairro"
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="cidade" className="text-sm font-medium">
                    Cidade *
                  </label>
                  <input
                    id="cidade"
                    required
                    value={formulario.cidade}
                    onChange={(e) =>
                      atualizarCampo("cidade", e.target.value)
                    }
                    placeholder="Cidade"
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="cep" className="text-sm font-medium">
                    CEP
                  </label>
                  <input
                    id="cep"
                    value={formulario.cep}
                    onChange={(e) =>
                      atualizarCampo("cep", e.target.value)
                    }
                    placeholder="00000-000"
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm sm:max-w-xs"
                  />
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                * Campos obrigatórios.
              </p>

              <div className="flex flex-wrap gap-2">
                <button
                  type="submit"
                  disabled={salvando}
                  className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
                >
                  {salvando
                    ? "Salvando..."
                    : pontoEditando
                      ? "Salvar alterações"
                      : "Cadastrar ponto"}
                </button>

                <button
                  type="button"
                  onClick={cancelarEdicao}
                  className="rounded-md border px-4 py-2 text-sm hover:bg-muted"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card className="rounded-lg">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-muted-foreground">
                Pontos cadastrados
              </p>
              <p className="text-3xl font-bold">
                {carregando ? "..." : pontos.length}
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-md border px-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar ponto..."
                aria-label="Buscar ponto de coleta"
                className="w-44 bg-transparent py-2 text-sm outline-none"
              />
            </div>

            <button
              type="button"
              onClick={carregarPontos}
              disabled={carregando}
              aria-label="Atualizar lista"
              className="rounded-md border p-2 hover:bg-muted disabled:opacity-50"
            >
              <RefreshCw
                className={`h-4 w-4 ${
                  carregando ? "animate-spin" : ""
                }`}
              />
            </button>
          </div>
        </CardContent>
      </Card>

      {carregando && (
        <p className="py-6 text-center text-sm text-muted-foreground">
          Carregando pontos de coleta...
        </p>
      )}

      {!carregando && !erro && pontosFiltrados.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <MapPin className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
            <p className="font-medium">
              {busca
                ? "Nenhum ponto corresponde à busca."
                : "Nenhum ponto cadastrado."}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {busca
                ? "Tente pesquisar por outro nome, bairro ou cidade."
                : "Clique em Novo ponto para cadastrar o primeiro local."}
            </p>
          </CardContent>
        </Card>
      )}

      {!carregando && pontosFiltrados.length > 0 && (
        <div className="space-y-3">
          {pontosFiltrados.map((ponto) => (
            <Card key={ponto.id} className="rounded-lg">
              <CardContent className="flex flex-wrap items-start justify-between gap-4 p-4">
                <div className="flex min-w-0 flex-1 gap-3">
                  <div className="rounded-md bg-muted p-3">
                    <MapPin className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <h2 className="font-semibold">{ponto.nome}</h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {ponto.endereco}
                      {ponto.numero ? `, ${ponto.numero}` : ""}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {[ponto.bairro, ponto.cidade]
                        .filter(Boolean)
                        .join(", ")}
                      {ponto.cep ? ` · CEP ${ponto.cep}` : ""}
                    </p>

                    {ponto.telefone && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        Telefone: {ponto.telefone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => editarPonto(ponto)}
                    className="inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-sm hover:bg-muted"
                  >
                    <Pencil className="h-4 w-4" />
                    Editar
                  </button>

                  <button
                    type="button"
                    onClick={() => excluirPonto(ponto)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-red-500/30 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                    Excluir
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}