"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";

import { ManagementPageHeader } from "@/components/management-page-header";
import { VolunteerFormDialog } from "@/components/voluntarios/volunteer-form-dialog";
import { VolunteersList } from "@/components/voluntarios/volunteers-list";
import { VolunteersToolbar } from "@/components/voluntarios/volunteers-toolbar";
import type { FormularioVoluntario, Voluntario } from "@/components/voluntarios/types";

const formularioVazio: FormularioVoluntario = {
  nome: "",
  telefone: "",
  email: "",
};

export default function VoluntariosPage() {
  const [voluntarios, setVoluntarios] = useState<Voluntario[]>([]);
  const [formulario, setFormulario] = useState<FormularioVoluntario>(formularioVazio);
  const [voluntarioEditando, setVoluntarioEditando] = useState<string | null>(null);
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
    const timer = window.setTimeout(() => {
      void carregarVoluntarios();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [carregarVoluntarios]);

  function atualizarCampo(campo: keyof FormularioVoluntario, valor: string) {
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

  async function salvarVoluntario(event: React.FormEvent<HTMLFormElement>) {
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
      const url = editando ? `/api/voluntarios/${voluntarioEditando}` : "/api/voluntarios";

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
        throw new Error(resultado.erro || "Não foi possível salvar o voluntário.");
      }

      setSucesso(editando ? "Voluntário atualizado com sucesso!" : "Voluntário cadastrado com sucesso!");
      setMostrarFormulario(false);
      setVoluntarioEditando(null);
      setFormulario(formularioVazio);
      await carregarVoluntarios();
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Erro ao salvar o voluntário.");
    } finally {
      setSalvando(false);
    }
  }

  async function excluirVoluntario(voluntario: Voluntario) {
    const confirmado = window.confirm(`Deseja realmente excluir o voluntário "${voluntario.nome}"?`);

    if (!confirmado) return;

    setErro("");
    setSucesso("");

    try {
      const resposta = await fetch(`/api/voluntarios/${voluntario.id}`, { method: "DELETE" });

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(resultado.erro || "Não foi possível excluir o voluntário.");
      }

      setSucesso("Voluntário excluído com sucesso.");
      await carregarVoluntarios();
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Erro ao excluir o voluntário.");
    }
  }

  const voluntariosFiltrados = voluntarios.filter((voluntario) => {
    const texto = busca.toLocaleLowerCase("pt-BR");

    return [voluntario.nome, voluntario.telefone, voluntario.email || ""].some((valor) =>
      valor.toLocaleLowerCase("pt-BR").includes(texto),
    );
  });

  return (
    <div className="space-y-6">
      <ManagementPageHeader
        title="Voluntários"
        description="Cadastre e gerencie os voluntários da ONG."
        action={
          <button
            type="button"
            onClick={novoVoluntario}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            <Plus className="h-4 w-4" />
            Novo voluntário
          </button>
        }
      />

      {erro && (
        <div role="alert" className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-400">
          {erro}
        </div>
      )}

      {sucesso && (
        <div role="status" className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-700 dark:text-emerald-300">
          {sucesso}
        </div>
      )}

      <VolunteerFormDialog
        open={mostrarFormulario}
        editing={voluntarioEditando !== null}
        form={formulario}
        error={erro}
        saving={salvando}
        onOpenChange={(aberto) => {
          if (aberto) setMostrarFormulario(true);
          else cancelarEdicao();
        }}
        onFieldChange={atualizarCampo}
        onSubmit={salvarVoluntario}
        onCancel={cancelarEdicao}
      />

      <VolunteersToolbar
        count={voluntarios.length}
        loading={carregando}
        query={busca}
        onQueryChange={setBusca}
        onRefresh={() => void carregarVoluntarios()}
      />

      <VolunteersList
        volunteers={voluntariosFiltrados}
        loading={carregando}
        error={erro}
        query={busca}
        onEdit={editarVoluntario}
        onDelete={(volunteer) => void excluirVoluntario(volunteer)}
      />
    </div>
  );
}
