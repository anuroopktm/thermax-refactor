import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface ChildActivityModelHeaderProps {
  itemName: string;
}

import { StickyHeader } from "@/components/shared/layout/sticky-header";

export function ChildActivityModelHeader({
  itemName,
}: ChildActivityModelHeaderProps) {
  const navigate = useNavigate();

  return (
    <StickyHeader>
      <div className="flex-1 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="cursor-pointer"
        >
          <ArrowLeft className="size-5" />
        </Button>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Tag Name / {itemName}
        </h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 h-fit">
          <span className="text-sm font-bold text-muted-foreground">
            Annotation:
          </span>
          <Select defaultValue="all">
            <SelectTrigger className="w-30 h-9! cursor-pointer">
              <SelectValue placeholder="Select User" />
            </SelectTrigger>
            <SelectContent className="min-w-30">
              <SelectItem value="enable" className="cursor-pointer">
                Enable
              </SelectItem>
              <SelectItem value="disable" className="cursor-pointer">
                Disable
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 h-fit">
          <span className="text-sm font-bold text-muted-foreground">
            Status:
          </span>
          <Badge variant="outline" className="h-9 rounded-md gap-2">
            <Info className="size-4" />
            Rejected
          </Badge>
        </div>

        <Button size="lg" className="cursor-pointer">
          Reject
        </Button>
      </div>
    </StickyHeader>
  );
}
