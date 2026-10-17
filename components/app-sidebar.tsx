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
  ChevronRight,
  ClipboardList,
  History,
  House,
  LogIn,
  MapIcon,
  Users,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-border/80 bg-sidebar text-sidebar-foreground">
      <SidebarHeader className="border-b border-sidebar-border/80 px-3 py-4">
        <SidebarMenu>
          <SidebarMenuItem className="flex flex-col items-center justify-center gap-2  p-4">
            <Image
              src="/logo101VL.png"
              alt="Logo101Viralatas"
              width={120}
              height={120}
            />

            <span className="text-center text-xs font-medium uppercase tracking-[0.2em] text-sidebar-foreground/70">
              Gestão de coletas
            </span>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarMenu className="space-y-2">
            <SidebarMenuItem>
              <Link
                href="/"
                className="flex items-center gap-3 rounded-xl p-3 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <House className="h-4 w-4" />
                Dashboard
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link
                href="/pontos"
                className="flex items-center gap-3 rounded-xl p-3 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <MapIcon className="h-4 w-4" />
                Pontos de coleta
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link
                href="/voluntarios"
                className="flex items-center gap-3 rounded-xl p-3 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <Users className="h-4 w-4" />
                Voluntários
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link
                href="/coletas"
                className="flex items-center gap-3 rounded-xl p-3 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <ClipboardList className="h-4 w-4" />
                Coletas
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link
                href="/historico"
                className="flex items-center gap-3 rounded-xl p-3 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <History className="h-4 w-4" />
                Histórico de coletas
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/80 p-3">
        <Link
          href="/login"
          className="flex items-center justify-between gap-2 rounded-xl bg-sidebar-accent px-3 py-2 text-sm font-medium text-sidebar-accent-foreground transition-colors hover:brightness-110"
        >
          <span className="flex items-center gap-2">
            <LogIn className="h-4 w-4" />
            Entrar
          </span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
