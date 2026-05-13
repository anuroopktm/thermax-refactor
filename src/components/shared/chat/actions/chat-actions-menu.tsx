import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SidebarMenuAction } from "@/components/ui/sidebar";

interface ChatActionsMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function ChatActionsMenu({ onEdit, onDelete }: ChatActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <SidebarMenuAction showOnHover className="cursor-pointer">
            <MoreHorizontal />
            <span className="sr-only">More</span>
          </SidebarMenuAction>
        }
      />

      <DropdownMenuContent
        side="bottom"
        align="end"
        className="w-28 rounded-lg"
      >
        <DropdownMenuItem className="cursor-pointer" onClick={onEdit}>
          <Pencil />
          <span>Edit</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer"
          onClick={onDelete}
        >
          <Trash2 />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
