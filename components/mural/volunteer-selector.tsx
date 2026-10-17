import { UserRound } from "lucide-react";

import type { Voluntario } from "./types";

interface VolunteerSelectorProps {
  volunteers: Voluntario[];
  selectedId: string;
  loading: boolean;
  onChange: (volunteerId: string) => void;
}

export function VolunteerSelector({
  volunteers,
  selectedId,
  loading,
  onChange,
}: VolunteerSelectorProps) {
  return (
    <section className="space-y-3 rounded-lg border p-4">
      <label htmlFor="voluntario" className="flex items-center gap-2 text-sm font-semibold">
        <UserRound className="h-4 w-4" />
        Selecione seu cadastro de voluntário
      </label>

      <select
        id="voluntario"
        value={selectedId}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-md border bg-background px-3 py-2 text-sm"
      >
        <option value="">Escolha seu nome</option>
        {volunteers.map((volunteer) => (
          <option key={volunteer.id} value={volunteer.id}>
            {volunteer.nome}
          </option>
        ))}
      </select>

      {volunteers.length === 0 && !loading && (
        <p className="text-sm text-muted-foreground">
          Nenhum voluntário cadastrado. Cadastre um antes de reservar.
        </p>
      )}
    </section>
  );
}
