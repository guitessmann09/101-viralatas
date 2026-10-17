import { Mail, Pencil, Phone, Trash2, Users } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { Voluntario } from "./types";

interface VolunteersListProps {
  volunteers: Voluntario[];
  loading: boolean;
  error: string;
  query: string;
  onEdit: (volunteer: Voluntario) => void;
  onDelete: (volunteer: Voluntario) => void;
}

export function VolunteersList({
  volunteers,
  loading,
  error,
  query,
  onEdit,
  onDelete,
}: VolunteersListProps) {
  if (loading) {
    return (
      <div className="rounded-3xl border border-dashed border-border bg-muted/10 p-8 text-center text-sm text-muted-foreground">
        Carregando voluntários...
      </div>
    );
  }

  if (!error && volunteers.length === 0) {
    return (
      <Card className="rounded-3xl border-border/80 bg-card/80">
        <CardContent className="p-8 text-center">
          <Users className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
          <p className="font-medium text-foreground">
            {query
              ? "Nenhum voluntário corresponde à busca."
              : "Nenhum voluntário cadastrado."}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {query
              ? "Tente buscar por outro nome, telefone ou e-mail."
              : "Clique em Novo voluntário para cadastrar o primeiro."}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {volunteers.map((volunteer) => (
        <Card
          key={volunteer.id}
          className="rounded-3xl border-border/80 bg-card/80"
        >
          <CardContent className="flex flex-wrap items-start justify-between gap-4 p-4 sm:p-5">
            <div className="flex min-w-0 flex-1 gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <Users className="inline-block h-4 w-4 text-muted-foreground" />
                  <h2 className="font-semibold text-foreground">
                    {volunteer.nome}
                  </h2>
                </div>
                <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {volunteer.telefone}
                </p>
                {volunteer.email && (
                  <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {volunteer.email}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onEdit(volunteer)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                <Pencil className="h-4 w-4" />
                Editar
              </button>
              <button
                type="button"
                onClick={() => onDelete(volunteer)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/5 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-500/10 dark:text-red-400"
              >
                <Trash2 className="h-4 w-4" />
                Excluir
              </button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
