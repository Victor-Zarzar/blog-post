import type { ReactNode } from "react";
import { AppSidebar } from "@/app/shared/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/app/shared/ui/sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
