import { NavLink, useLocation } from "react-router-dom";
import { SIDEBAR_SECTIONS } from "./sidebar-constants";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function TbwesSidebar() {
  const { pathname } = useLocation();

  return (
    <Sidebar className="top-16 h-[calc(100vh-4rem)] border-r border-border bg-background">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          {SIDEBAR_SECTIONS.map((section, index) => {
            const content = (
              <SidebarMenu key={index} className="gap-2">
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={pathname.startsWith(item.path)}
                      render={<NavLink to={item.path} />}
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            );

            return content;
          })}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
