import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

interface ChildActivityDetailHeaderProps {
  title: string;
  totalResults: number;
}

export function ChildActivityDetailHeader({
  title,
  totalResults,
}: ChildActivityDetailHeaderProps) {
  return (
    <div className="flex justify-between gap-6">
      <div className="flex-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Child Activity / {title}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          ({totalResults} Results)
        </p>
      </div>

      <div className="flex items-center gap-2 h-fit">
        <span className="text-sm font-bold text-muted-foreground">Status:</span>
        <Select defaultValue="all">
          <SelectTrigger className="w-30 h-9! cursor-pointer">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent className="min-w-30">
            <SelectItem value="all" className="cursor-pointer">
              All
            </SelectItem>
            <SelectItem value="in_progress" className="cursor-pointer">
              In Progress
            </SelectItem>
            <SelectItem value="completed" className="cursor-pointer">
              Completed
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <InputGroup className="w-64 h-9">
        <InputGroupInput
          placeholder="Search activity..."
          className="bg-transparent focus-visible:ring-0"
        />
        <InputGroupAddon className="text-muted-foreground">
          <Search />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
