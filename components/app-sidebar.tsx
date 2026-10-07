import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { House, MapIcon, Users } from "lucide-react";

import Image from "next/image";

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
              <SidebarMenuButton className="p-5 rounded-[0.5rem] cursor-pointer transition-all transition-discrete">
                <House className="h-4 w-4" />
                <span className="ml-2 text-sm font-medium">Dashboard</span>
              </SidebarMenuButton>
              <SidebarMenuButton className="p-5 rounded-[0.5rem] cursor-pointer transition-all transition-discrete">
                <MapIcon className="h-4 w-4" />
                <span className="ml-2 text-sm font-medium">
                  Pontos de coleta
                </span>
              </SidebarMenuButton>
              <SidebarMenuButton className="p-5 rounded-[0.5rem] cursor-pointer transition-all transition-discrete">
                <Users className="h-4 w-4" />
                <span className="ml-2 text-sm font-medium">
                  Voluntários
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
