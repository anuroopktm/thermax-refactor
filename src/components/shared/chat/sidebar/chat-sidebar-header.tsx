import { Plus } from "lucide-react";
import { SidebarHeader, SidebarMenuButton } from "@/components/ui/sidebar";

interface ChatSidebarHeaderProps {
  isCreating?: boolean;
  onNewChat?: () => void;
}

export function ChatSidebarHeader({
  isCreating,
  onNewChat,
}: ChatSidebarHeaderProps) {
  return (
    <SidebarHeader>
      <SidebarMenuButton
        className="h-10 w-full cursor-pointer justify-start"
        onClick={onNewChat}
        disabled={isCreating}
      >
        <Plus />
        <span>New Chat</span>
      </SidebarMenuButton>
    </SidebarHeader>
  );
}
