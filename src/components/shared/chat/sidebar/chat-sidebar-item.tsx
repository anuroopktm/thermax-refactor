import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

import type { Chat } from "../types/chat.types";

interface ChatSidebarItemProps {
  chat: Chat;
  activeChatId?: string | number;
  onChatSelect?: (chat: Chat) => void;
  renderChatActions?: (chat: Chat) => React.ReactNode;
}

export function ChatSidebarItem({
  chat,
  activeChatId,
  onChatSelect,
  renderChatActions,
}: ChatSidebarItemProps) {
  return (
    <SidebarMenuItem className="relative">
      <SidebarMenuButton
        isActive={String(chat.id) === String(activeChatId)}
        onClick={() => onChatSelect?.(chat)}
        className="cursor-pointer"
      >
        <span className="truncate">{chat.title}</span>
      </SidebarMenuButton>

      {renderChatActions?.(chat)}
    </SidebarMenuItem>
  );
}
