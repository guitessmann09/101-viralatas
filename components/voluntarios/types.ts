export interface Voluntario {
  id: string;
  nome: string;
  telefone: string;
  email?: string | null;
  createdAt?: string;
}

export interface FormularioVoluntario {
  nome: string;
  telefone: string;
  email: string;
}
