import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MasterActivityItemHeaderProps {
  itemName: string;
  onGlobalUnitChange: (unit: string) => void;
  onSave: () => void;
}

export function MasterActivityItemHeader({
  itemName,
  onGlobalUnitChange,
  onSave,
}: MasterActivityItemHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between gap-6 px-4 py-4 md:px-8 border-b bg-background sticky top-0 z-20">
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
          {itemName}
        </h1>
      </div>

      <div className="flex items-center gap-2 h-fit">
        <span className="text-sm font-bold text-muted-foreground">
          Global Unit:
        </span>
        <Select onValueChange={onGlobalUnitChange}>
          <SelectTrigger className="w-40 h-9! cursor-pointer">
            <SelectValue placeholder="Select Unit" />
          </SelectTrigger>
          <SelectContent className="min-w-40">
            <SelectItem value="Kg/cm2" className="cursor-pointer">
              Kg/cm2
            </SelectItem>
            <SelectItem value="Bar" className="cursor-pointer">
              Bar
            </SelectItem>
            <SelectItem value="PSI" className="cursor-pointer">
              PSI
            </SelectItem>
            <SelectItem value="Kg/cm2(g)" className="cursor-pointer">
              Kg/cm2(g)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button size="lg" className="cursor-pointer" onClick={onSave}>
        Save Changes
      </Button>
    </div>
  );
}
