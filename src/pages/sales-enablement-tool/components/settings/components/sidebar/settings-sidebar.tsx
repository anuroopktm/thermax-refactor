import { Users, BarChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { id: "owners", label: "Owners", icon: Users, path: "owners" },
  { id: "usage", label: "Usage", icon: BarChart, path: "usage" },
];

export function SettingsSidebar() {
  return (
    <Sidebar className="top-16 h-[calc(100vh-4rem)] border-r border-border bg-background">
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarMenu className="gap-2">
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  render={
                    <NavLink
                      to={`/sales-enablement/settings/${item.path}`}
                      className={({ isActive }) =>
                        cn(
                          "group h-9 w-full cursor-pointer transition truncate flex items-center gap-2",
                          "hover:bg-muted",
                          isActive && "bg-muted text-foreground",
                        )
                      }
                    >
                      <item.icon />
                      {item.label}
                    </NavLink>
                  }
                />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
