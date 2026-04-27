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
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Feedback
        </h1>
        <p className="text-sm text-muted-foreground mt-1">({count} Results)</p>
      </div>
      <InputGroup className="w-64 h-9 bg-muted/40 border rounded-lg">
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
