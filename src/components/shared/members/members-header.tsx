import { Search, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

interface MembersHeaderProps {
  onAdd: () => void;
  count?: number;
  isLoading?: boolean;
}

export function MembersHeader({ onAdd, count, isLoading }: MembersHeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">Members</h1>
        <p className="text-sm text-muted-foreground">
          {isLoading ? "Loading members..." : `Showing ${count ?? 0} members`}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <InputGroup className="w-64 h-9">
          <InputGroupInput
            placeholder="Search members..."
            className="bg-transparent focus-visible:ring-0"
          />
          <InputGroupAddon className="text-muted-foreground">
            <Search className="size-4" />
          </InputGroupAddon>
        </InputGroup>

        <Button className="h-9 cursor-pointer" onClick={onAdd}>
          <PlusCircle />
          Add Member
        </Button>
      </div>
    </div>
  );
}
