import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FeaturePageLayoutProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
}

export function FeaturePageLayout({
  title,
  description,
  actions,
  children,
  className,
  headerClassName,
}: FeaturePageLayoutProps) {
  return (
    <div className={cn("space-y-6 px-4 py-8 md:px-8", className)}>
      <div
        className={cn(
          "flex items-center justify-between gap-4",
          headerClassName,
        )}
      >
        <div className="min-w-0">
          <h1 className="text-3xl font-semibold tracking-tight truncate">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-3 shrink-0">{actions}</div>
        )}
      </div>
      {children}
    </div>
  );
}
