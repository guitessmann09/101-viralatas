export interface Ponto {
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

export interface FormularioPonto {
  nome: string;
  telefone: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidade: string;
  cep: string;
}
