import { DashboardCard } from "@/components/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  CheckCircleIcon,
  MapPinIcon,
  PackageIcon,
  UsersIcon,
} from "lucide-react";

import { pontos, recents, voluntarios } from "@/_constants/coletas";

export default function Home() {
  return (
    <div className="space-y-5">
      <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Pontos Ativos"
          value={80}
          complementaryText="3 cheios"
          icon={<MapPinIcon height={20} width={20} />}
        />
        <DashboardCard
          title="Coletas Abertas"
          value={3}
          complementaryText="1 em andamento"
          icon={<PackageIcon height={20} width={20} />}
        />
        <DashboardCard
          title="Voluntários ativos"
          value={24}
          icon={<UsersIcon height={20} width={20} />}
        />
        <DashboardCard
          title="Concluídas"
          value={12}
          complementaryText="Histórico de coletas concluídas"
          icon={<CheckCircleIcon height={20} width={20} />}
        />
      </div>
      <div className="grid auto-rows-min gap-4 grid-cols-2">
        <Card className="rounded-[0.5rem] p-0 overflow-hidden inline-block">
          <div className="flex items-center justify-between px-5 py-4">
            <h2 className="text-lg font-bold font-heading uppercase">
              Atividade Recente
            </h2>
            <p className="text-xs text-muted-foreground">Últimas coletas</p>
          </div>
          <ul>
            {recents.map((coleta) => {
              const pontoColeta = pontos.find((x) => x.id === coleta.pontoId);
              const voluntario = voluntarios.find((x) => x.id === coleta.volId);
              return (
                <li
                  key={coleta.id}
                  className="px-5 py-3.5 flex items-center justify-between gap-4 border-t border-neutral-700/50"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-neutral-200 truncate">
                      {pontoColeta?.nome}
                    </p>
                    <p className="text-xs text-neutral-600 mt-0.5">
                      {coleta.data}
                      {voluntario
                        ? ` · ${voluntario.nome}`
                        : " · voluntário não atribuído"}
                    </p>
                    {coleta.obs && (
                      <p className="text-xs text-neutral-700 truncate mt-0.5 italic">
                        {coleta.obs}
                      </p>
                    )}
                  </div>
                  <Badge
                    variant="outline"
                    className="py-0.5 px-2 text-xs font-medium text-muted-foreground/60"
                  >
                    {coleta.status}
                  </Badge>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>
    </div>
  );
}
