import { Search, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ROLE_OPTIONS } from "./member-form";

const FILTER_OPTIONS = [{ value: "ALL", label: "All Roles" }, ...ROLE_OPTIONS];

interface MembersHeaderProps {
  onAdd: () => void;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  roleFilter?: string;
  onRoleFilterChange?: (value: string | null) => void;
}

export function MembersHeader({
  onAdd,
  searchTerm,
  onSearchChange,
  roleFilter = "ALL",
  onRoleFilterChange,
}: MembersHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      <InputGroup className="w-64 h-8">
        <InputGroupInput
          type="search"
          placeholder="Search members..."
          value={searchTerm}
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
        <InputGroupAddon className="text-muted-foreground">
          <Search />
        </InputGroupAddon>
      </InputGroup>

      <Select value={roleFilter} onValueChange={onRoleFilterChange}>
        <SelectTrigger className="w-36 h-9 cursor-pointer">
          <SelectValue placeholder="Role">
            {(value) =>
              FILTER_OPTIONS.find((opt) => opt.value === value)?.label ?? value
            }
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {FILTER_OPTIONS.map((opt) => (
            <SelectItem
              key={opt.value}
              value={opt.value}
              className="cursor-pointer"
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button className="cursor-pointer" onClick={onAdd}>
        <PlusCircle />
        Add Member
      </Button>
    </div>
  );
}
