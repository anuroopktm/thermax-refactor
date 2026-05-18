import { Search, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

interface ProductsHeaderProps {
  onAdd: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  resultsCount?: number;
  totalCount?: number;
}

export function ProductsHeader({
  onAdd,
  searchQuery,
  onSearchChange,
  resultsCount = 0,
  totalCount = 0,
}: ProductsHeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">Products</h1>
        <p className="text-sm text-muted-foreground">
          ({resultsCount} Results of {totalCount})
        </p>
      </div>

      <div className="flex items-center gap-3">
        <InputGroup className="w-64 h-9">
          <InputGroupInput
            placeholder="Search products..."
            className="bg-transparent focus-visible:ring-0"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <InputGroupAddon className="text-muted-foreground">
            <Search />
          </InputGroupAddon>
        </InputGroup>

        <Button className="h-9 cursor-pointer" onClick={onAdd}>
          <PlusCircle />
          Add Product
        </Button>
      </div>
    </div>
  );
}
