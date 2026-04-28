import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CardAction } from "@/components/ui/card";

export function ProductActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <CardAction>
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <MoreHorizontal />
            </Button>
          </CardAction>
        }
      />
      <DropdownMenuContent align="end" className="min-w-28">
        <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
        <DropdownMenuItem className="text-destructive cursor-pointer">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
