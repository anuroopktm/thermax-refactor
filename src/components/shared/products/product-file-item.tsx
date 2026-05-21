import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProductFileItemProps {
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

export function ProductFileItem({
  file,
  onRemove,
  onDownload,
  downloading = false,
}: ProductFileItemProps) {
  return (
    <Card size="sm" className="ring-0 border">
      <CardHeader>
        <CardTitle className="text-sm truncate font-medium">
          {file.name}
        </CardTitle>
        <CardDescription>{file.description}</CardDescription>
        <CardAction className="flex items-center gap-2">
          {file.status === "STARTED" && (
            <Badge
              variant="outline"
              className="text-[10px] py-0 border-amber-500 text-amber-500 bg-amber-500/10"
            >
              Processing
            </Badge>
          )}
          {file.status === "FAILED" && (
            <Badge
              variant="outline"
              className="text-[10px] py-0 border-destructive text-destructive bg-destructive/10"
            >
              Failed
            </Badge>
          )}

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
        </CardAction>
      </CardHeader>
    </Card>
  );
}
