import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StickyHeader } from "../layout/sticky-header";

interface ActivityItemHeaderProps {
  itemName: string;
  onGlobalUnitChange: (unit: string | null) => void;
  onSave: () => void;
}

export function ActivityItemHeader({
  itemName,
  onGlobalUnitChange,
  onSave,
}: ActivityItemHeaderProps) {
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
        <h1 className="text-xl font-bold tracking-tight text-foreground truncate max-w-[300px]">
          {itemName}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <Select onValueChange={onGlobalUnitChange}>
          <SelectTrigger className="w-[140px] h-9">
            <SelectValue placeholder="Global Unit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Deg C">Deg C</SelectItem>
            <SelectItem value="Bar">Bar</SelectItem>
            <SelectItem value="Psi">Psi</SelectItem>
            <SelectItem value="Kg/cm2">Kg/cm2</SelectItem>
          </SelectContent>
        </Select>

        <Button
          onClick={onSave}
          className="h-9 gap-2 px-4 shadow-sm cursor-pointer"
        >
          <Save className="size-4" />
          Save Changes
        </Button>
      </div>
    </StickyHeader>
  );
}
