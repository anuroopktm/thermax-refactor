import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FeaturePageLayoutProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
  onBack?: () => void;
}

export function FeaturePageLayout({
  title,
  description,
  actions,
  children,
  className,
  headerClassName,
  onBack,
}: FeaturePageLayoutProps) {
  return (
    <div className={cn("space-y-6 px-4 py-8 md:px-8", className)}>
      <div
        className={cn(
          "flex items-center justify-between gap-4",
          headerClassName,
        )}
      >
        <div className="flex items-center gap-4 min-w-0">
          {onBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="cursor-pointer"
            >
              <ArrowLeft className="size-5" />
            </Button>
          )}
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold tracking-tight truncate">
              {title}
            </h1>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">
                {description}
              </p>
            )}
          </div>
        </div>
        {actions && (
          <div className="flex items-center gap-3 shrink-0">{actions}</div>
        )}
      </div>
      {children}
    </div>
  );
}
