import { MoreHorizontal, Paperclip, Link2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface CategoryFileItemProps {
  file: {
    id: string;
    name: string;
    type?: string;
    status?: string;
    kind?: string;
    description?: string;
  };
  onRemove?: () => void;
  onDownload?: () => void;
  downloading?: boolean;
}

export function CategoryFileItem({
  file,
  onRemove,
  onDownload,
  downloading = false,
}: CategoryFileItemProps) {
  return (
    <div className="flex items-center justify-between rounded-md border p-2 hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-2 min-w-0">
        <div className="p-1.5 rounded-md bg-muted">
          {downloading ? (
            <Loader2 className="size-4 animate-spin text-primary" />
          ) : file.type === "xls" || file.type === "xlsx" ? (
            <Link2 className="size-4" />
          ) : (
            <Paperclip className="size-4" />
          )}
        </div>

        <span className="text-sm truncate font-medium">{file.name}</span>
        {file.status === "STARTED" && (
          <Badge variant="warning">Processing</Badge>
        )}
        {file.status === "FAILED" && (
          <Badge variant="destructive">Failed</Badge>
        )}
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
          {onDownload && (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={onDownload}
              disabled={downloading}
            >
              Download
            </DropdownMenuItem>
          )}
          {onRemove && (
            <DropdownMenuItem
              className="text-destructive cursor-pointer"
              onClick={onRemove}
            >
              Remove
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
