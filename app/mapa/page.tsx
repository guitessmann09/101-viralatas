"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { PontoNoMapa } from "../../components/mapa-coletas";

const MapaColetas = dynamic(
  () => import("../../components/mapa-coletas"),
  {
    ssr: false,
    loading: () => <p>Carregando mapa...</p>,
  }
);

export default function PaginaMapa() {
  const [pontos, setPontos] = useState<PontoNoMapa[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarPontos() {
      try {
        const resposta = await fetch("/api/pontos", {
          cache: "no-store",
        });

        if (!resposta.ok) {
          throw new Error("Não foi possível consultar os pontos.");
        }

        const dados: PontoNoMapa[] = await resposta.json();

        if (!Array.isArray(dados)) {
          throw new Error("A API retornou dados inválidos.");
        }

        setPontos(dados);
      } catch (error) {
        console.error("Erro ao carregar pontos:", error);
        setErro("Erro ao carregar os pontos de coleta.");
      } finally {
        setCarregando(false);
      }
    }

    void carregarPontos();
  }, []);

  return (
    <main className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">
          Mapa de pontos de coleta
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Visualização dos locais cadastrados pela ONG.
        </p>
      </div>

      {carregando && <p>Carregando pontos...</p>}

      {erro && <p className="text-sm text-red-500">{erro}</p>}

      {!carregando && !erro && (
        <>
          <p className="text-sm text-muted-foreground">
            {pontos.length} pontos cadastrados.
          </p>

          <MapaColetas pontos={pontos} />
        </>
      )}
    </main>
  );
}