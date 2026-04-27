import { Plus, Trash2, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
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

import { useChatHistory } from "@/services/query/chat/chat.service";
import { Skeleton } from "@/components/ui/skeleton";

export function ChatSidebar() {
  const navigate = useNavigate();
  const { data: chatHistory, isLoading } = useChatHistory();

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
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <SidebarMenuItem key={i}>
                    <Skeleton className="h-9 w-full rounded-md" />
                  </SidebarMenuItem>
                ))
              : chatHistory?.map((chat) => (
                  <SidebarMenuItem key={chat.id}>
                    <SidebarMenuButton
                      isActive={chat.active}
                      className={cn(
                        "group h-9 w-full cursor-pointer transition truncate",
                        "hover:bg-muted",
                        chat.active && "bg-muted text-foreground",
                      )}
                    >
                      {chat.title}
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
            <SidebarMenuButton
              className="h-10 cursor-pointer"
              onClick={() => navigate("/sales-enablement/settings")}
            >
              <Settings />
              Settings
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
