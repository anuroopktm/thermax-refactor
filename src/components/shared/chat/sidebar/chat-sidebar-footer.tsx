import { Settings, Trash2 } from "lucide-react";

import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface ChatSidebarFooterProps {
  isClearing?: boolean;
  onClearHistory?: () => void;
  onSettingsClick?: () => void;
}

export function ChatSidebarFooter({
  isClearing,
  onClearHistory,
  onSettingsClick,
}: ChatSidebarFooterProps) {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            className="h-10 w-full cursor-pointer justify-start"
            onClick={onClearHistory}
            disabled={isClearing}
          >
            <Trash2 />
            <span>Clear Conversations</span>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton
            className="h-10 w-full cursor-pointer justify-start"
            onClick={onSettingsClick}
          >
            <Settings />
            <span>Settings</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
