import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  HandHeart,
  MapPinIcon,
  PlusCircle,
  UsersIcon,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function DashboardQuickActions() {
  return (
    <Card className="rounded-[24px] border-border/80 bg-card/80">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle className="text-xl">Ações rápidas</CardTitle>
            <CardDescription>Atalhos para a operação diária</CardDescription>
          </div>
          <HandHeart className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>

      <CardContent className="grid gap-3 sm:grid-cols-2">
        <Link
          href="/coletas"
          className="group flex items-center gap-3 rounded-2xl border border-border/80 bg-background/60 p-4 transition-colors hover:border-primary/30 hover:bg-primary/5"
        >
          <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
            <PlusCircle className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-foreground">Cadastrar coleta</p>
            <p className="text-xs text-muted-foreground">Registrar novo recolhimento</p>
          </div>
          <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </Link>

        <Link
          href="/pontos"
          className="group flex items-center gap-3 rounded-2xl border border-border/80 bg-background/60 p-4 transition-colors hover:border-primary/30 hover:bg-primary/5"
        >
          <div className="rounded-xl bg-sky-500/10 p-2.5 text-sky-500">
            <MapPinIcon className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-foreground">Gerenciar pontos</p>
            <p className="text-xs text-muted-foreground">Atualizar locais de coleta</p>
          </div>
          <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </Link>

        <Link
          href="/voluntarios"
          className="group flex items-center gap-3 rounded-2xl border border-border/80 bg-background/60 p-4 transition-colors hover:border-primary/30 hover:bg-primary/5"
        >
          <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-500">
            <UsersIcon className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-foreground">Voluntários</p>
            <p className="text-xs text-muted-foreground">Acompanhar equipe ativa</p>
          </div>
          <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </Link>

        <Link
          href="/historico"
          className="group flex items-center gap-3 rounded-2xl border border-border/80 bg-background/60 p-4 transition-colors hover:border-primary/30 hover:bg-primary/5"
        >
          <div className="rounded-xl bg-violet-500/10 p-2.5 text-violet-500">
            <ClipboardList className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-foreground">Histórico</p>
            <p className="text-xs text-muted-foreground">Revisar ações anteriores</p>
          </div>
          <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </Link>
      </CardContent>
    </Card>
  );
}
