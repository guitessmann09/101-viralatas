"use client";

import { useCallback, useEffect, useState } from "react";

import { AvailableCollections } from "@/components/mural/available-collections";
import { MuralFeedback } from "@/components/mural/mural-feedback";
import { MuralHeader } from "@/components/mural/mural-header";
import { VolunteerSelector } from "@/components/mural/volunteer-selector";
import type { Coleta, Voluntario } from "@/components/mural/types";

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
      const dadosVoluntarios: Voluntario[] = await respostaVoluntarios.json();

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
    const timer = window.setTimeout(() => {
      void carregarDados();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [carregarDados]);

  async function reservarColeta(coletaId: string) {
    if (!voluntarioSelecionado) {
      setErro("Selecione um voluntário antes de assumir a coleta.");
      return;
    }

    const confirmado = window.confirm("Deseja assumir esta coleta?");
    if (!confirmado) return;

    setErro("");
    setSucesso("");
    setReservando(coletaId);

    try {
      const resposta = await fetch(`/api/coletas/${coletaId}/reservar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voluntarioId: voluntarioSelecionado }),
      });

      const resultado = await resposta.json();
      if (!resposta.ok) {
        throw new Error(resultado.erro || "Não foi possível reservar a coleta.");
      }

      setSucesso("Coleta assumida com sucesso! Obrigado por ajudar a ONG.");
      await carregarDados();
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Erro ao reservar a coleta.");
      await carregarDados();
    } finally {
      setReservando(null);
    }
  }

  return (
    <main className="mx-auto w-full max-w-5xl space-y-6">
      <MuralHeader />
      <MuralFeedback error={erro} success={sucesso} />
      <VolunteerSelector
        volunteers={voluntarios}
        selectedId={voluntarioSelecionado}
        loading={carregando}
        onChange={setVoluntarioSelecionado}
      />
      <AvailableCollections
        collections={coletas}
        loading={carregando}
        selectedVolunteerId={voluntarioSelecionado}
        reservingId={reservando}
        onRefresh={() => void carregarDados()}
        onReserve={(collectionId) => void reservarColeta(collectionId)}
      />
    </main>
  );
}
