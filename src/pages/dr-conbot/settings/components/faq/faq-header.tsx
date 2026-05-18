import { Search, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

interface FaqHeaderProps {
  onAdd: () => void;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
}

export function FaqHeader({
  onAdd,
  searchTerm = "",
  onSearchChange,
}: FaqHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      <InputGroup className="w-64 h-9">
        <InputGroupInput
          type="search"
          placeholder="Search FAQs..."
          className="focus-visible:ring-0"
          value={searchTerm}
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
        <InputGroupAddon className="text-muted-foreground">
          <Search />
        </InputGroupAddon>
      </InputGroup>

      <Button className="h-9 cursor-pointer" onClick={onAdd}>
        <PlusCircle />
        Add FAQ
      </Button>
    </div>
  );
}
