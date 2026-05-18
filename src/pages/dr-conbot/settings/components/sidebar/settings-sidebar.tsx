import { Users, Gauge, Store, Link2 } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const MENU_ITEMS = [
  {
    id: "categories",
    label: "Categories",
    icon: Store,
    path: "/dr-conbot/settings/categories",
  },
  {
    id: "faq",
    label: "FAQ",
    icon: Link2,
    path: "/dr-conbot/settings/faq",
  },
  {
    id: "members",
    label: "Members",
    icon: Users,
    path: "/dr-conbot/settings/members",
  },
  {
    id: "usage",
    label: "Usage",
    icon: Gauge,
    path: "/dr-conbot/settings/usage",
  },
];

export function SettingsSidebar() {
  const { pathname } = useLocation();

  return (
    <Sidebar className="top-16 h-[calc(100vh-4rem)] border-r border-border bg-background">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarMenu className="gap-2">
            {MENU_ITEMS.map((menuItem) => (
              <SidebarMenuItem key={menuItem.id}>
                <SidebarMenuButton
                  isActive={pathname === menuItem.path}
                  render={<NavLink to={menuItem.path} />}
                >
                  <menuItem.icon />
                  <span>{menuItem.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
