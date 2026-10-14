"use client";

import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export interface PontoNoMapa {
  id: string;
  nome: string;
  endereco: string;
  numero?: string | null;
  bairro?: string | null;
  cidade: string;
  latitude?: number | null;
  longitude?: number | null;
}

interface MapaColetasProps {
  pontos: PontoNoMapa[];
}

function AjustarVisualizacao({
  pontos,
}: {
  pontos: PontoNoMapa[];
}) {
  const mapa = useMap();

  useEffect(() => {
    if (pontos.length === 1) {
      mapa.setView(
        [pontos[0].latitude!, pontos[0].longitude!],
        16
      );
    } else if (pontos.length > 1) {
      mapa.fitBounds(
        pontos.map((ponto) => [
          ponto.latitude!,
          ponto.longitude!,
        ]),
        { padding: [30, 30] }
      );
    }
  }, [mapa, pontos]);

  return null;
}

const iconePin = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function MapaColetas({
  pontos,
}: MapaColetasProps) {
  const pontosComCoordenadas = pontos.filter(
    (ponto) =>
      typeof ponto.latitude === "number" &&
      typeof ponto.longitude === "number"
  );

  return (
    <div className="space-y-3">
      <div className="h-[420px] w-full overflow-hidden rounded-xl border">
        <MapContainer
          center={[-30.081, -51.023]}
          zoom={12}
          scrollWheelZoom
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <AjustarVisualizacao pontos={pontosComCoordenadas} />

          {pontosComCoordenadas.map((ponto) => (
            <Marker
              key={ponto.id}
              position={[
                ponto.latitude!,
                ponto.longitude!,
              ]}
              icon={iconePin}
            >
              <Popup>
                <strong>{ponto.nome}</strong>
                <br />
                {ponto.endereco}
                {ponto.numero ? `, ${ponto.numero}` : ""}
                {ponto.bairro ? ` - ${ponto.bairro}` : ""}
                <br />
                {ponto.cidade}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {pontosComCoordenadas.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Nenhum ponto possui coordenadas cadastradas.
          Precisamos localizar os endereços para exibir os pins.
        </p>
      )}
    </div>
  );
}