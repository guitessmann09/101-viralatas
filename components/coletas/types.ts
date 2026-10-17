export interface Ponto {
  id: string;
  nome: string;
  endereco: string;
  cidade: string;
}

export interface Coleta {
  id: string;
  status: string;
  createdAt: string;
  pontoColeta: Ponto;
}
