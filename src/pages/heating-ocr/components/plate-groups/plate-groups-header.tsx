import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { StickyHeader } from "@/components/shared/layout/sticky-header";

interface PlateGroupsHeaderProps {
  totalInvalidCount: number;
}

export function PlateGroupsHeader({
  totalInvalidCount,
}: PlateGroupsHeaderProps) {
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
          Plate Groups
        </h1>
      </div>

      <Badge variant="warning" className="h-9 gap-2 font-medium rounded-md">
        <AlertTriangle className="size-4" />
        Groups Summary: {totalInvalidCount} Invalid
      </Badge>
    </StickyHeader>
  );
}
