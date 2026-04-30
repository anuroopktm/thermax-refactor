import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface StickyHeaderProps {
  children: ReactNode;
  className?: string;
  sticky?: boolean;
  glassmorphism?: boolean;
  border?: boolean;
}

export function StickyHeader({
  children,
  className,
  sticky = true,
  glassmorphism = true,
  border = true,
}: StickyHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 py-4 md:px-8",
        sticky && "sticky top-0 z-10",
        glassmorphism && "bg-background/50 backdrop-blur-sm",
        border && "border-b",
        className,
      )}
    >
      {children}
    </div>
  );
}
