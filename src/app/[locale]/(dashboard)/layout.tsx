import { AppSidebar } from "@/app/shared/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/app/shared/ui/sidebar";
import type { ReactNode } from "react"


export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 w-full">
      <SidebarTrigger />
      {children}
      </main>
    </SidebarProvider>
  )
}
