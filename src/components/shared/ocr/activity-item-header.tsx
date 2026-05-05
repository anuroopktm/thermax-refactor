import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { StickyHeader } from "../layout/sticky-header";

interface ActivityItemHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  onBack?: () => void;
}

export function ActivityItemHeader({
  title,
  description,
  actions,
  onBack,
}: ActivityItemHeaderProps) {
  const navigate = useNavigate();

  return (
    <StickyHeader>
      <div className="flex-1 flex items-center gap-4">
        {onBack && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="cursor-pointer"
          >
            <ArrowLeft className="size-5" />
          </Button>
        )}
        <div className="min-w-0">
          <h1 className="text-xl font-bold tracking-tight text-foreground truncate max-w-[300px]">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      </div>

      {actions && (
        <div className="flex items-center gap-3 shrink-0">{actions}</div>
      )}
    </StickyHeader>
  );
}
