"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";

import { ManagementPageHeader } from "@/components/management-page-header";
import { PointFormDialog } from "@/components/pontos/point-form-dialog";
import { PointsList } from "@/components/pontos/points-list";
import { PointsToolbar } from "@/components/pontos/points-toolbar";
import type { FormularioPonto, Ponto } from "@/components/pontos/types";

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
    const timer = window.setTimeout(() => {
      void carregarPontos();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [carregarPontos]);

  function atualizarCampo(campo: keyof FormularioPonto, valor: string) {
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
      const url = editando ? `/api/pontos/${pontoEditando}` : "/api/pontos";

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
        throw new Error(resultado.erro || "Não foi possível salvar o ponto.");
      }

      setSucesso(
        editando
          ? "Ponto atualizado com sucesso!"
          : "Ponto cadastrado com sucesso!",
      );
      setMostrarFormulario(false);
      setPontoEditando(null);
      setFormulario(formularioVazio);
      await carregarPontos();
    } catch (error) {
      setErro(
        error instanceof Error ? error.message : "Erro ao salvar o ponto.",
      );
    } finally {
      setSalvando(false);
    }
  }

  async function excluirPonto(ponto: Ponto) {
    const confirmado = window.confirm(
      `Deseja realmente excluir o ponto "${ponto.nome}"?`,
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
        throw new Error(resultado.erro || "Não foi possível excluir o ponto.");
      }

      setSucesso("Ponto excluído com sucesso.");
      await carregarPontos();
    } catch (error) {
      setErro(
        error instanceof Error ? error.message : "Erro ao excluir o ponto.",
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
    ].some((valor) => valor.toLocaleLowerCase("pt-BR").includes(texto));
  });

  return (
    <div className="space-y-6">
      <ManagementPageHeader
        title="Pontos de coleta"
        description="Cadastre e gerencie os pontos de coleta."
        action={
          <button
            type="button"
            onClick={novoPonto}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            <Plus className="h-4 w-4" />
            Novo ponto
          </button>
        }
      />

      {erro && (
        <div
          role="alert"
          className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-400"
        >
          {erro}
        </div>
      )}

      {sucesso && (
        <div
          role="status"
          className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-700 dark:text-emerald-300"
        >
          {sucesso}
        </div>
      )}

      <PointFormDialog
        open={mostrarFormulario}
        editing={pontoEditando !== null}
        form={formulario}
        error={erro}
        saving={salvando}
        onOpenChange={(aberto) => {
          if (aberto) setMostrarFormulario(true);
          else cancelarEdicao();
        }}
        onFieldChange={atualizarCampo}
        onSubmit={salvarPonto}
        onCancel={cancelarEdicao}
      />

      <PointsToolbar
        count={pontos.length}
        loading={carregando}
        query={busca}
        onQueryChange={setBusca}
        onRefresh={() => void carregarPontos()}
      />

      <PointsList
        points={pontosFiltrados}
        loading={carregando}
        error={erro}
        query={busca}
        onEdit={editarPonto}
        onDelete={(point) => void excluirPonto(point)}
      />
    </div>
  );
}
