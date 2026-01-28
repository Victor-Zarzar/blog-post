import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import { Link } from "@/i18n/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/shared/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    link: "/",
    icon: Home,
  },
  {
    title: "Inbox",
    link: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    link: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    link: "#",
    icon: Search,
  },
  {
    title: "Settings",
    link: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.link}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
