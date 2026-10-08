import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2Icon, ClockIcon, MapPin, PackageIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-4 m-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-[0.5rem]">
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="flex p-4 items-center justify-center bg-yellow-100 border border-yellow-200 rounded-[0.5rem]">
                <MapPin width={60} height={60} className="text-yellow-400" />
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-2xl font-bold">82</span>
                <span>Pontos de coleta</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-[0.5rem]">
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="flex p-4 items-center justify-center bg-blue-100 border border-blue-200 rounded-[0.5rem]">
                <PackageIcon width={60} height={60} className="text-blue-400" />
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-2xl font-bold">24</span>
                <span>Coletas disponíveis</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-[0.5rem]">
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="flex p-4 items-center justify-center rounded-[0.5rem] bg-orange-100 border-orange-200">
                <ClockIcon width={60} height={60} className="text-orange-400" />
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-2xl font-bold">8</span>
                <span>Em Andamento</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-[0.5rem]">
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="flex p-4 items-center justify-center bg-green-100 border border-green-200 rounded-[0.5rem]">
                <CheckCircle2Icon
                  width={60}
                  height={60}
                  className="text-green-400"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-2xl font-bold">86</span>
                <span>Concluídas</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
