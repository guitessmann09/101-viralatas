import { DashboardCard } from "@/components/dashboard-card";

export default function Home() {
  return (
    <div className="space-y-4 m-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Pontos Ativos"
          value={80}
          complementaryText="3 cheios"
        />
        <DashboardCard
          title="Coletas Abertas"
          value={3}
          complementaryText="1 em andamento"
        />
        <DashboardCard title="Voluntários ativos" value={24} />
        <DashboardCard
          title="Concluídas"
          value={12}
          complementaryText="Histórico de coletas concluídas"
        />
      </div>
    </div>
  );
}
