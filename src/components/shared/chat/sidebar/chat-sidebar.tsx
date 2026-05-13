import { useState } from "react";
import { Sidebar, SidebarSeparator } from "@/components/ui/sidebar";
import { ChatHistoryClearDialog } from "@/components/shared/chat/actions/chat-history-delete-dialog";
import type { Chat } from "../types/chat.types";

import { ChatSidebarHeader } from "./chat-sidebar-header";
import { ChatSidebarContent } from "./chat-sidebar-content";
import { ChatSidebarFooter } from "./chat-sidebar-footer";

interface ChatSidebarProps {
  chats?: Chat[];
  isLoading?: boolean;
  isCreating?: boolean;
  isClearing?: boolean;
  onNewChat?: () => void;
  onClearHistory?: () => void | Promise<void>;
  onSettingsClick?: () => void;
  onChatSelect?: (chat: Chat) => void;
  activeChatId?: string | number;
  renderChatActions?: (chat: Chat) => React.ReactNode;
}

export function ChatSidebar({
  chats,
  isLoading,
  isCreating,
  isClearing,
  onNewChat,
  onClearHistory,
  onSettingsClick,
  onChatSelect,
  activeChatId,
  renderChatActions,
}: ChatSidebarProps) {
  const [showClearHistory, setShowClearHistory] = useState(false);

  const handleClearHistory = async () => {
    await onClearHistory?.();
    setShowClearHistory(false);
  };

  return (
    <Sidebar className="top-16 h-[calc(100vh-4rem)] border-r border-border bg-background">
      <ChatSidebarHeader isCreating={isCreating} onNewChat={onNewChat} />

      <SidebarSeparator />

      <ChatSidebarContent
        chats={chats}
        isLoading={isLoading}
        activeChatId={activeChatId}
        onChatSelect={onChatSelect}
        renderChatActions={renderChatActions}
      />

      <SidebarSeparator />

      <ChatSidebarFooter
        isClearing={isClearing}
        onClearHistory={() => setShowClearHistory(true)}
        onSettingsClick={onSettingsClick}
      />

      <ChatHistoryClearDialog
        open={showClearHistory}
        onOpenChange={setShowClearHistory}
        onConfirm={handleClearHistory}
        isLoading={isClearing}
      />
    </Sidebar>
  );
}
