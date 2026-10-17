import { HeartHandshake } from "lucide-react";

export function LoginBrandPanel() {
  return (
    <section className="relative flex flex-col justify-between overflow-hidden border-b border-border/80 bg-linear-to-br from-primary/20 via-background to-secondary/60 p-8 lg:border-b-0 lg:border-r">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.2),transparent_30%)]" />

      <div className="relative space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-3 py-1.5 text-xs font-medium text-foreground/80">
          <HeartHandshake className="h-3.5 w-3.5 text-primary" />
          ONG 101 Vira-Latas
        </div>

        <div className="space-y-4">
          <h1 className="max-w-md font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Faça o bem com mais organização.
          </h1>
          <p className="max-w-md text-base text-muted-foreground">
            Conecte pontos de coleta, voluntários e ações de resgate em uma
            única operação acolhedora e eficiente.
          </p>
        </div>
      </div>

      <div className="relative mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border/80 bg-background/60 p-4">
          <p className="text-2xl font-bold text-foreground">48</p>
          <p className="mt-1 text-xs text-muted-foreground">pontos ativos</p>
        </div>
        <div className="rounded-2xl border border-border/80 bg-background/60 p-4">
          <p className="text-2xl font-bold text-foreground">126</p>
          <p className="mt-1 text-xs text-muted-foreground">voluntários</p>
        </div>
        <div className="rounded-2xl border border-border/80 bg-background/60 p-4">
          <p className="text-2xl font-bold text-foreground">89%</p>
          <p className="mt-1 text-xs text-muted-foreground">
            coletas concluídas
          </p>
        </div>
      </div>
    </section>
  );
}
