import { Plus, Trash2, Settings } from "lucide-react";
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
import { Skeleton } from "@/components/ui/skeleton";

export interface Chat {
  id: string | number;
  title: string;
}

interface ChatSidebarProps {
  chats?: Chat[];
  isLoading?: boolean;
  isCreating?: boolean;
  onNewChat?: () => void;
  onClearHistory?: () => void;
  onSettingsClick?: () => void;
  onChatSelect?: (chat: Chat) => void;
  activeChatId?: string | number;
}

export function ChatSidebar({
  chats,
  isLoading,
  isCreating,
  onNewChat,
  onClearHistory,
  onSettingsClick,
  onChatSelect,
  activeChatId,
}: ChatSidebarProps) {
  return (
    <Sidebar className="top-16 h-[calc(100vh-4rem)] border-r border-border bg-background">
      {/* Header */}
      <SidebarHeader className="p-3">
        <SidebarMenuButton
          className="h-10 cursor-pointer"
          onClick={onNewChat}
          disabled={isCreating}
        >
          <Plus />
          New Chat
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarSeparator />

      {/* Content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Recent</SidebarGroupLabel>
          <SidebarMenu className="gap-2">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <SidebarMenuItem key={i}>
                    <Skeleton className="h-9 w-full rounded-md" />
                  </SidebarMenuItem>
                ))
              : chats?.map((chat) => (
                  <SidebarMenuItem key={chat.id}>
                    <SidebarMenuButton
                      isActive={String(chat.id) === String(activeChatId)}
                      onClick={() => onChatSelect?.(chat)}
                      className={cn(
                        "group h-9 w-full cursor-pointer transition truncate",
                        "hover:bg-muted",
                        String(chat.id) === String(activeChatId) &&
                          "bg-muted text-foreground",
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
            <SidebarMenuButton
              className="h-10 cursor-pointer"
              onClick={onClearHistory}
            >
              <Trash2 />
              Clear Conversations
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              className="h-10 cursor-pointer"
              onClick={onSettingsClick}
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
