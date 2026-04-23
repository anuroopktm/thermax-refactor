import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
}

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex flex-col leading-[0.9]">
        <span className="text-2xl font-black tracking-tighter text-[#1a1a1a]">
          THERMAX
        </span>
        <span className="text-xl font-bold tracking-tight text-[#E31E24]">
          AI STUDIO
        </span>
      </div>
      <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-[#E31E24]/5">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-6 w-6 text-[#E31E24]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 3L21 12L13 21V3Z"
            fill="currentColor"
            className="drop-shadow-sm"
          />
          <path d="M5 3L13 12L5 21V3Z" fill="currentColor" fillOpacity="0.3" />
        </svg>
      </div>
    </div>
  );
}
