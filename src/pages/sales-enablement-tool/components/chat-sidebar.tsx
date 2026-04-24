import { Plus, MessageSquare, Trash2, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarSeparator,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

const chatHistory = [
  { id: "1", title: "Product comparison 2024", active: true },
  { id: "2", title: "Market analysis report", active: false },
  { id: "3", title: "Technical specs for Project X", active: false },
];

export function ChatSidebar() {
  return (
    <Sidebar className="top-16 h-[calc(100vh-4rem)] border-r border-border bg-background">
      {/* Header */}
      <SidebarHeader className="p-3">
        <SidebarMenuButton className="h-10 cursor-pointer">
          <Plus />
          New Chat
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarSeparator />

      {/* Content */}
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel>Recent</SidebarGroupLabel>
          <SidebarMenu className="gap-2">
            {chatHistory.map((chat) => (
              <SidebarMenuItem key={chat.id}>
                <SidebarMenuButton
                  isActive={chat.active}
                  className={cn(
                    "group h-9 cursor-pointer transition",
                    "hover:bg-muted",
                    chat.active && "bg-muted text-foreground",
                  )}
                >
                  <MessageSquare
                    className={cn(
                      "text-muted-foreground group-hover/menu-button:text-primary transition",
                      chat.active && "text-primary",
                    )}
                  />
                  <span className="truncate">{chat.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarSeparator />
      <SidebarFooter className="p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-10 cursor-pointer">
              <Trash2 />
              Clear Conversations
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton className="h-10 cursor-pointer">
              <Settings />
              Settings
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
