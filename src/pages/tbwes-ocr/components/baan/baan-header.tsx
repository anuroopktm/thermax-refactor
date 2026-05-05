import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

interface BaanHeaderProps {
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
}

export function BaanHeader({ searchTerm, onSearchChange }: BaanHeaderProps) {
  return (
    <InputGroup className="max-w-sm h-8">
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupInput
        type="search"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => onSearchChange?.(e.target.value)}
      />
    </InputGroup>
  );
}
