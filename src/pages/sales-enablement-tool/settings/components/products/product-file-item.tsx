import { MoreHorizontal, Paperclip, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type File } from "./product-card";

interface ProductFileItemProps {
  file: File;
}

export function ProductFileItem({ file }: ProductFileItemProps) {
  return (
    <div className="flex items-center justify-between rounded-md border p-2 hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-2 min-w-0">
        <div className="p-1.5 rounded-md bg-muted">
          {file.type === "xls" ? (
            <Link2 className="size-4" />
          ) : (
            <Paperclip className="size-4" />
          )}
        </div>

        <span className="text-sm truncate">{file.name}</span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <MoreHorizontal />
            </Button>
          }
        />
        <DropdownMenuContent align="end" className="min-w-28">
          <DropdownMenuItem className="cursor-pointer">
            Download
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive cursor-pointer">
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
