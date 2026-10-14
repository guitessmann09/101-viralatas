"use client";

import { useCallback, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Plus,
  Pencil,
  Trash2,
  X,
  RefreshCw,
  Search,
  Phone,
  Mail,
} from "lucide-react";

interface Voluntario {
  id: string;
  nome: string;
  telefone: string;
  email?: string | null;
  createdAt?: string;
}

interface FormularioVoluntario {
  nome: string;
  telefone: string;
  email: string;
}

const formularioVazio: FormularioVoluntario = {
  nome: "",
  telefone: "",
  email: "",
};

export default function VoluntariosPage() {
  const [voluntarios, setVoluntarios] = useState<Voluntario[]>([]);
  const [formulario, setFormulario] =
    useState<FormularioVoluntario>(formularioVazio);
  const [voluntarioEditando, setVoluntarioEditando] =
    useState<string | null>(null);
  const [busca, setBusca] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const carregarVoluntarios = useCallback(async () => {
    try {
      setCarregando(true);
      setErro("");

      const resposta = await fetch("/api/voluntarios");

      if (!resposta.ok) {
        throw new Error("Não foi possível carregar os voluntários.");
      }

      const dados: Voluntario[] = await resposta.json();
      setVoluntarios(dados);
    } catch (error) {
      console.error("Erro ao carregar voluntários:", error);
      setErro("Não foi possível carregar os voluntários.");
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarVoluntarios();
  }, [carregarVoluntarios]);

  function atualizarCampo(
    campo: keyof FormularioVoluntario,
    valor: string
  ) {
    setFormulario((atual) => ({
      ...atual,
      [campo]: valor,
    }));
  }

  function novoVoluntario() {
    setFormulario(formularioVazio);
    setVoluntarioEditando(null);
    setErro("");
    setSucesso("");
    setMostrarFormulario(true);
  }

  function editarVoluntario(voluntario: Voluntario) {
    setFormulario({
      nome: voluntario.nome || "",
      telefone: voluntario.telefone || "",
      email: voluntario.email || "",
    });

    setVoluntarioEditando(voluntario.id);
    setErro("");
    setSucesso("");
    setMostrarFormulario(true);
  }

  function cancelarEdicao() {
    setMostrarFormulario(false);
    setVoluntarioEditando(null);
    setFormulario(formularioVazio);
    setErro("");
  }

  async function salvarVoluntario(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setErro("");
    setSucesso("");

    if (!formulario.nome.trim() || !formulario.telefone.trim()) {
      setErro("Nome e telefone são obrigatórios.");
      return;
    }

    try {
      setSalvando(true);

      const editando = voluntarioEditando !== null;
      const url = editando
        ? `/api/voluntarios/${voluntarioEditando}`
        : "/api/voluntarios";

      const resposta = await fetch(url, {
        method: editando ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formulario.nome.trim(),
          telefone: formulario.telefone.trim(),
          email: formulario.email.trim() || null,
        }),
      });

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(
          resultado.erro || "Não foi possível salvar o voluntário."
        );
      }

      setSucesso(
        editando
          ? "Voluntário atualizado com sucesso!"
          : "Voluntário cadastrado com sucesso!"
      );

      setMostrarFormulario(false);
      setVoluntarioEditando(null);
      setFormulario(formularioVazio);

      await carregarVoluntarios();
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Erro ao salvar o voluntário."
      );
    } finally {
      setSalvando(false);
    }
  }

  async function excluirVoluntario(voluntario: Voluntario) {
    const confirmado = window.confirm(
      `Deseja realmente excluir o voluntário "${voluntario.nome}"?`
    );

    if (!confirmado) return;

    setErro("");
    setSucesso("");

    try {
      const resposta = await fetch(
        `/api/voluntarios/${voluntario.id}`,
        { method: "DELETE" }
      );

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(
          resultado.erro || "Não foi possível excluir o voluntário."
        );
      }

      setSucesso("Voluntário excluído com sucesso.");
      await carregarVoluntarios();
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Erro ao excluir o voluntário."
      );
    }
  }

  const voluntariosFiltrados = voluntarios.filter((voluntario) => {
    const texto = busca.toLocaleLowerCase("pt-BR");

    return [
      voluntario.nome,
      voluntario.telefone,
      voluntario.email || "",
    ].some((valor) =>
      valor.toLocaleLowerCase("pt-BR").includes(texto)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Voluntários</h1>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Cadastre e gerencie os voluntários da ONG.
          </p>
        </div>

        <button
          type="button"
          onClick={novoVoluntario}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Novo voluntário
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
                {voluntarioEditando
                  ? "Editar voluntário"
                  : "Cadastrar voluntário"}
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

            <form onSubmit={salvarVoluntario} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="nome" className="text-sm font-medium">
                    Nome completo *
                  </label>
                  <input
                    id="nome"
                    required
                    value={formulario.nome}
                    onChange={(e) =>
                      atualizarCampo("nome", e.target.value)
                    }
                    placeholder="Nome do voluntário"
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="telefone" className="text-sm font-medium">
                    Telefone *
                  </label>
                  <input
                    id="telefone"
                    required
                    value={formulario.telefone}
                    onChange={(e) =>
                      atualizarCampo("telefone", e.target.value)
                    }
                    placeholder="(51) 99999-9999"
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formulario.email}
                    onChange={(e) =>
                      atualizarCampo("email", e.target.value)
                    }
                    placeholder="voluntario@exemplo.com"
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm sm:max-w-xl"
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
                    : voluntarioEditando
                      ? "Salvar alterações"
                      : "Cadastrar voluntário"}
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
                Voluntários cadastrados
              </p>
              <p className="text-3xl font-bold">
                {carregando ? "..." : voluntarios.length}
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-md border px-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar voluntário..."
                aria-label="Buscar voluntário"
                className="w-44 bg-transparent py-2 text-sm outline-none"
              />
            </div>

            <button
              type="button"
              onClick={carregarVoluntarios}
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
          Carregando voluntários...
        </p>
      )}

      {!carregando && !erro && voluntariosFiltrados.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Users className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
            <p className="font-medium">
              {busca
                ? "Nenhum voluntário corresponde à busca."
                : "Nenhum voluntário cadastrado."}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {busca
                ? "Tente buscar por outro nome, telefone ou e-mail."
                : "Clique em Novo voluntário para cadastrar o primeiro."}
            </p>
          </CardContent>
        </Card>
      )}

      {!carregando && voluntariosFiltrados.length > 0 && (
        <div className="space-y-3">
          {voluntariosFiltrados.map((voluntario) => (
            <Card key={voluntario.id} className="rounded-lg">
              <CardContent className="flex flex-wrap items-start justify-between gap-4 p-4">
                <div className="flex min-w-0 flex-1 gap-3">
                  <div className="rounded-md bg-muted p-3">
                    <Users className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <h2 className="font-semibold">{voluntario.nome}</h2>

                    <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      {voluntario.telefone}
                    </p>

                    {voluntario.email && (
                      <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        {voluntario.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => editarVoluntario(voluntario)}
                    className="inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-sm hover:bg-muted"
                  >
                    <Pencil className="h-4 w-4" />
                    Editar
                  </button>

                  <button
                    type="button"
                    onClick={() => excluirVoluntario(voluntario)}
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