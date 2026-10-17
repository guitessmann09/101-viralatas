import type { FormularioVoluntario } from "./types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface VolunteerFormDialogProps {
  open: boolean;
  editing: boolean;
  form: FormularioVoluntario;
  error: string;
  saving: boolean;
  onOpenChange: (open: boolean) => void;
  onFieldChange: (field: keyof FormularioVoluntario, value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

export function VolunteerFormDialog({
  open,
  editing,
  form,
  error,
  saving,
  onOpenChange,
  onFieldChange,
  onSubmit,
  onCancel,
}: VolunteerFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100dvh-2rem)] max-w-2xl overflow-y-auto rounded-3xl border-border/80 bg-card p-0 sm:max-w-2xl">
        <DialogHeader className="border-b border-border/80 bg-linear-to-r from-primary/10 via-background to-secondary/50 px-5 py-5 pr-12 sm:px-6">
          <DialogTitle className="text-xl font-semibold text-foreground">
            {editing ? "Editar voluntário" : "Cadastrar voluntário"}
          </DialogTitle>
          <DialogDescription>
            {editing
              ? "Atualize os dados de contato do voluntário."
              : "Preencha os dados para cadastrar um novo voluntário."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4 p-5 sm:p-6">
          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400"
            >
              {error}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="nome"
                className="text-sm font-medium text-foreground"
              >
                Nome completo *
              </label>
              <input
                id="nome"
                required
                value={form.nome}
                onChange={(event) => onFieldChange("nome", event.target.value)}
                placeholder="Nome do voluntário"
                className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="telefone"
                className="text-sm font-medium text-foreground"
              >
                Telefone *
              </label>
              <input
                id="telefone"
                required
                value={form.telefone}
                onChange={(event) =>
                  onFieldChange("telefone", event.target.value)
                }
                placeholder="(51) 99999-9999"
                className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(event) => onFieldChange("email", event.target.value)}
                placeholder="voluntario@exemplo.com"
                className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary sm:max-w-xl"
              />
            </div>
          </div>

          <DialogFooter className="border-none bg-card flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              * Campos obrigatórios.
            </p>
            <div className="ml-auto flex gap-2">
              <button
                type="button"
                onClick={onCancel}
                className="rounded-xl border border-border bg-background px-2.5 py-2.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-primary px-2.5 py-2.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {saving
                  ? "Salvando..."
                  : editing
                    ? "Salvar alterações"
                    : "Cadastrar voluntário"}
              </button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
