import type { Metadata } from "next";

import "@/app/globals.css";

import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "101 Vira-Latas",
  description: "Dashboard administrativo da ONG 101 Vira-Latas",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="min-h-full bg-background text-foreground">
      <ThemeProvider defaultTheme="light" storageKey="viralatas-theme">
        <SidebarProvider>
          <AppSidebar />
          <main className="flex flex-1 flex-col bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.14),transparent_35%),var(--background)]">
            <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-border/80 bg-background/75 px-4 py-3 backdrop-blur-sm sm:px-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="my-auto h-4" />
                <span className="text-sm font-medium text-muted-foreground">
                  Painel administrativo
                </span>
              </div>
              <ThemeToggle />
            </header>
            <div className="flex-1 p-4 sm:p-6">{children}</div>
          </main>
        </SidebarProvider>
      </ThemeProvider>
    </div>
  );
}
