import type { FormularioPonto } from "./types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PointFormDialogProps {
  open: boolean;
  editing: boolean;
  form: FormularioPonto;
  error: string;
  saving: boolean;
  onOpenChange: (open: boolean) => void;
  onFieldChange: (field: keyof FormularioPonto, value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

export function PointFormDialog({
  open,
  editing,
  form,
  error,
  saving,
  onOpenChange,
  onFieldChange,
  onSubmit,
  onCancel,
}: PointFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100dvh-2rem)] max-w-2xl overflow-y-auto rounded-3xl border-border/80 bg-card p-0 sm:max-w-2xl">
        <DialogHeader className="border-b border-border/80 bg-linear-to-r from-primary/10 via-background to-secondary/50 px-5 py-5 pr-12 sm:px-6">
          <DialogTitle className="text-xl font-semibold text-foreground">
            {editing ? "Editar ponto" : "Cadastrar ponto"}
          </DialogTitle>
          <DialogDescription>
            {editing
              ? "Atualize as informações do ponto de coleta."
              : "Preencha os dados para cadastrar um novo ponto."}
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
                className="text-sm font-normal text-foreground"
              >
                Nome do ponto *
              </label>
              <input
                id="nome"
                required
                value={form.nome}
                onChange={(event) => onFieldChange("nome", event.target.value)}
                placeholder="Ex.: Mercado do bairro"
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="telefone"
                className="text-sm font-medium text-foreground"
              >
                Telefone
              </label>
              <input
                id="telefone"
                value={form.telefone}
                onChange={(event) =>
                  onFieldChange("telefone", event.target.value)
                }
                placeholder="Telefone de contato"
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="endereco"
                className="text-sm font-medium text-foreground"
              >
                Endereço *
              </label>
              <input
                id="endereco"
                required
                value={form.endereco}
                onChange={(event) =>
                  onFieldChange("endereco", event.target.value)
                }
                placeholder="Nome da rua ou avenida"
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="numero"
                className="text-sm font-medium text-foreground"
              >
                Número
              </label>
              <input
                id="numero"
                value={form.numero}
                onChange={(event) =>
                  onFieldChange("numero", event.target.value)
                }
                placeholder="Número do local"
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="bairro"
                className="text-sm font-medium text-foreground"
              >
                Bairro
              </label>
              <input
                id="bairro"
                value={form.bairro}
                onChange={(event) =>
                  onFieldChange("bairro", event.target.value)
                }
                placeholder="Bairro"
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="cidade"
                className="text-sm font-medium text-foreground"
              >
                Cidade *
              </label>
              <input
                id="cidade"
                required
                value={form.cidade}
                onChange={(event) =>
                  onFieldChange("cidade", event.target.value)
                }
                placeholder="Cidade"
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5 ">
              <label
                htmlFor="cep"
                className="text-sm font-medium text-foreground"
              >
                CEP
              </label>
              <input
                id="cep"
                value={form.cep}
                onChange={(event) => onFieldChange("cep", event.target.value)}
                placeholder="00000-000"
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary sm:max-w-xs"
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
                    : "Cadastrar ponto"}
              </button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
