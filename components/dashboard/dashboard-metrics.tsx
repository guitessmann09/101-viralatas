import {
  CheckCircleIcon,
  MapPinIcon,
  PackageIcon,
  UsersIcon,
} from "lucide-react";

import { DashboardCard } from "@/components/dashboard-card";

interface DashboardMetricsProps {
  carregando: boolean;
  pontosAtivos: number;
  coletasAbertas: number;
  coletasReservadas: number;
  voluntariosAtivos: number;
  coletasConcluidas: number;
}

export function DashboardMetrics({
  carregando,
  pontosAtivos,
  coletasAbertas,
  coletasReservadas,
  voluntariosAtivos,
  coletasConcluidas,
}: DashboardMetricsProps) {
  return (
    <div className="grid auto-rows-min gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <DashboardCard
        title="Pontos Ativos"
        value={carregando ? "..." : pontosAtivos}
        complementaryText="Localizações cadastradas"
        icon={<MapPinIcon height={20} width={20} />}
      />

      <DashboardCard
        title="Pontos Disponíveis"
        value={carregando ? "..." : coletasAbertas}
        complementaryText={carregando ? "" : `${coletasReservadas} reservadas`}
        icon={<PackageIcon height={20} width={20} />}
      />

      <DashboardCard
        title="Voluntários Ativos"
        value={carregando ? "..." : voluntariosAtivos}
        complementaryText=" "
        icon={<UsersIcon height={20} width={20} />}
      />

      <DashboardCard
        title="Coletas Concluídas"
        value={carregando ? "..." : coletasConcluidas}
        complementaryText="Total de coletas concluídas"
        icon={<CheckCircleIcon height={20} width={20} />}
      />
    </div>
  );
}
