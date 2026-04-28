import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

interface FeedbackHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  count?: number;
}

export function FeedbackHeader({
  searchQuery,
  onSearchChange,
  count = 0,
}: FeedbackHeaderProps) {
  return (
    <div className="flex justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Feedback
        </h1>
        <p className="text-sm text-muted-foreground mt-1">({count} Results)</p>
      </div>
      <InputGroup className="w-64 h-9">
        <InputGroupInput
          placeholder="Search feedback..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-transparent focus-visible:ring-0"
        />
        <InputGroupAddon className="text-muted-foreground">
          <Search className="size-4" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
