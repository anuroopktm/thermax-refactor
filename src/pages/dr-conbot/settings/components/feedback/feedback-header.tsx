import { Search, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

interface FeedbackHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  count?: number;
  onUploadClick: () => void;
}

export function FeedbackHeader({
  searchQuery,
  onSearchChange,
  count = 0,
  onUploadClick,
}: FeedbackHeaderProps) {
  return (
    <div className="flex justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Feedback / FAQ Documents
        </h1>
        <p className="text-sm text-muted-foreground mt-1">({count} Results)</p>
      </div>
      <div className="flex items-center gap-3">
        <InputGroup className="w-64 h-9">
          <InputGroupInput
            placeholder="Search feedback/FAQ..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-transparent focus-visible:ring-0"
          />
          <InputGroupAddon className="text-muted-foreground">
            <Search />
          </InputGroupAddon>
        </InputGroup>
        <Button className="h-9 cursor-pointer" onClick={onUploadClick}>
          <PlusCircle />
          Upload FAQ File
        </Button>
      </div>
    </div>
  );
}
