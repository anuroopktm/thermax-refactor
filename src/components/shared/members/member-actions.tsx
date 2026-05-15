import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Member } from "@/services/query/shared/types/members.types";

interface MemberActionsProps {
  member: Member;
  onEdit: (member: Member) => void;
  onDelete: (member: Member) => void;
}

export function MemberActions({
  member,
  onEdit,
  onDelete,
}: MemberActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon" className="cursor-pointer">
            <MoreHorizontal />
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="min-w-32">
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => onEdit(member)}
        >
          <Pencil />
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer"
          onClick={() => onDelete(member)}
        >
          <Trash2 />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
