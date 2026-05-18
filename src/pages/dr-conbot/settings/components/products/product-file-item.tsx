import { useState } from "react";
import { MoreHorizontal, Paperclip, Link2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type ProductFileModel } from "@/services/query/dr-conbot/types";
import { conbotApi } from "@/services/interceptor";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface ProductFileItemProps {
  productId: string;
  file: ProductFileModel;
  onRemove: () => void;
}

export function ProductFileItem({
  productId,
  file,
  onRemove,
}: ProductFileItemProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const { data } = await conbotApi.get(
        `/doctor_conbot/product/${productId}/document/${file.id}/link`,
      );
      if (data?.link) {
        window.open(data.link, "_blank");
      } else {
        toast.error("Download link not available");
      }
    } catch (err) {
      toast.error("Failed to generate download link");
    } finally {
      setDownloading(false);
    }
  };

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
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={handleDownload}
            disabled={downloading}
          >
            Download
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive cursor-pointer"
            onClick={onRemove}
          >
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
