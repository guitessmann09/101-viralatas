import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  House,
  MapIcon,
  Users,
  History,
  ClipboardList,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex flex-col items-center justify-center gap-2 p-4">
            <Image
              src="/logo101VL.png"
              alt="Logo101Viralatas"
              width={120}
              height={120}
            />

            <span className="truncate text-center text-xs">
              Gestão de coletas
            </span>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem className="flex flex-col gap-2">
              <Link
                href="/"
                className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-sidebar-accent"
              >
                <House className="h-4 w-4" />
                <span className="text-sm font-medium">
                  Dashboard
                </span>
              </Link>

              <Link
                href="/pontos"
                className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-sidebar-accent"
              >
                <MapIcon className="h-4 w-4" />
                <span className="text-sm font-medium">
                  Pontos de coleta
                </span>
              </Link>

              <Link
                href="/voluntarios"
                className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-sidebar-accent"
              >
                <Users className="h-4 w-4" />
                <span className="text-sm font-medium">
                  Voluntários
                </span>
              </Link>

              <Link
                href="/coletas"
                className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-sidebar-accent"
              >
                <ClipboardList className="h-4 w-4" />
                <span className="text-sm font-medium">
                  Coletas
                </span>
              </Link>

              <Link
                href="/historico"
                className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-sidebar-accent"
              >
                <History className="h-4 w-4" />
                <span className="text-sm font-medium">
                  Histórico de coletas
                </span>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}