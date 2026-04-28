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
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function TransmitterSidebar() {
  const { pathname } = useLocation();

  return (
    <Sidebar className="top-16 h-[calc(100vh-4rem)] border-r border-border bg-background">
      <SidebarContent>
        {SIDEBAR_SECTIONS.map((section, index) => {
          const content = (
            <SidebarMenu key={index} className="gap-2">
              {section.hasSeparator && <SidebarSeparator />}

              {section.items.map((item) => (
                <SidebarMenuItem
                  key={item.id}
                  className={cn(!section.label && "px-2")}
                >
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

          if (!section.label) return content;

          return (
            <SidebarGroup key={index}>
              <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
              {content}
            </SidebarGroup>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}
