import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";

import type { Chat } from "../types";
import { ChatSidebarLoading } from "./chat-sidebar-loading";
import { ChatSidebarItem } from "./chat-sidebar-item";

interface ChatSidebarContentProps {
  chats?: Chat[];
  isLoading?: boolean;
  activeChatId?: string | number;
  onChatSelect?: (chat: Chat) => void;
  renderChatActions?: (chat: Chat) => React.ReactNode;
}

export function ChatSidebarContent({
  chats,
  isLoading,
  activeChatId,
  onChatSelect,
  renderChatActions,
}: ChatSidebarContentProps) {
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Recent</SidebarGroupLabel>

        <SidebarMenu className="gap-1">
          {isLoading ? (
            <ChatSidebarLoading />
          ) : (
            chats?.map((chat) => (
              <ChatSidebarItem
                key={chat.id}
                chat={chat}
                activeChatId={activeChatId}
                onChatSelect={onChatSelect}
                renderChatActions={renderChatActions}
              />
            ))
          )}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
}
