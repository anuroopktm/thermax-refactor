import { Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function ActivitySummaryHeader() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between gap-6">
      <div className="flex-1 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="cursor-pointer"
        >
          <ArrowLeft className="size-5" />
        </Button>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Activity Summary
        </h1>
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

      <Button className="h-9 cursor-pointer">
        <Download />
        Export
      </Button>
    </div>
  );
}
