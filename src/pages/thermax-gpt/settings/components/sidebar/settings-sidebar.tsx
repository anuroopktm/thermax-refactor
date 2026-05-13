import { Users, Gauge, Package, MessageSquare } from "lucide-react";
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
    id: "products",
    label: "Products",
    icon: Package,
    path: "/thermax-gpt/settings/products",
  },
  {
    id: "feedback",
    label: "Feedback",
    icon: MessageSquare,
    path: "/thermax-gpt/settings/feedback",
  },
  {
    id: "members",
    label: "Members",
    icon: Users,
    path: "/thermax-gpt/settings/members",
  },
  {
    id: "usage",
    label: "Usage",
    icon: Gauge,
    path: "/thermax-gpt/settings/usage",
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
