export interface PontoColeta {
  id: string;
  nome: string;
  endereco: string;
  numero?: string | null;
  bairro?: string | null;
  cidade: string;
  telefone?: string | null;
}

export interface Voluntario {
  id: string;
  nome: string;
  telefone: string;
}

export interface Coleta {
  id: string;
  status: string;
  createdAt: string;
  pontoColeta: PontoColeta;
  voluntario: Voluntario | null;
}
