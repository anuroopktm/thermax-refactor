import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

interface FeedbackHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function FeedbackHeader({
  searchTerm,
  onSearchChange,
}: FeedbackHeaderProps) {
  return (
    <InputGroup className="w-64 h-9">
      <InputGroupInput
        placeholder="Search feedback..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="focus-visible:ring-0"
      />
      <InputGroupAddon className="text-muted-foreground">
        <Search />
      </InputGroupAddon>
    </InputGroup>
  );
}
