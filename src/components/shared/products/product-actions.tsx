import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CardAction } from "@/components/ui/card";

interface ProductActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function ProductActions({ onEdit, onDelete }: ProductActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        nativeButton={false}
        render={
          <CardAction>
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <MoreHorizontal />
            </Button>
          </CardAction>
        }
      />
      <DropdownMenuContent align="end" className="min-w-28">
        <DropdownMenuItem className="cursor-pointer" onClick={onEdit}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive cursor-pointer"
          onClick={onDelete}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
