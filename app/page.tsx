import { DashboardCard } from "@/components/dashboard-card";
import {
  CheckCircleIcon,
  MapPinIcon,
  PackageIcon,
  UsersIcon,
} from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-4">
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
    </div>
  );
}
