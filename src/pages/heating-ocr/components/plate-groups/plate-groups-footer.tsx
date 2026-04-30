import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PlateGroupsFooterProps {
  totalInvalidCount: number;
}

export function PlateGroupsFooter({
  totalInvalidCount,
}: PlateGroupsFooterProps) {
  const navigate = useNavigate();

  return (
    <div className="sticky bottom-0 z-10 flex items-center justify-end gap-3 border-t border-border bg-background p-4 md:px-6">
      <Button
        variant="outline"
        className="cursor-pointer"
        onClick={() => navigate(-1)}
      >
        Cancel
      </Button>
      <Button variant="destructive" className="cursor-pointer">
        Reject All Groups ({totalInvalidCount})
      </Button>
      <Button className="bg-amber-300 text-amber-700 hover:bg-amber-400 cursor-pointer">
        <AlertTriangle />
        Submit All Groups ({totalInvalidCount})
      </Button>
    </div>
  );
}
