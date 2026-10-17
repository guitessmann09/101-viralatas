export interface PontoColeta {
  id: string;
  nome: string;
  endereco?: string;
  cidade?: string;
}

export interface Voluntario {
  id: string;
  nome: string;
}

export interface Coleta {
  id: string;
  status: string;
  createdAt: string;
  dataSolicitacao?: string;
  dataReserva?: string | null;
  dataConclusao?: string | null;
  pontoColeta: PontoColeta;
  voluntario: Voluntario | null;
}

export const filtrosHistorico = [
  { label: "Todas", value: "TODAS" },
  { label: "Disponíveis", value: "DISPONIVEL" },
  { label: "Reservadas", value: "RESERVADA" },
  { label: "Concluídas", value: "CONCLUIDA" },
];
