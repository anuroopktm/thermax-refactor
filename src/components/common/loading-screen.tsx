import AIStudioLogo from "@/assets/brand/ai-studio.svg";
import { Loader2 } from "lucide-react";

export function LoadingScreen() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        {/* Optional branding */}
        <img
          src={AIStudioLogo}
          alt="AI Studio"
          className="h-20 w-auto opacity-80"
        />

        {/* Loader */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="size-6 animate-spin" />
          <span className="text-lg">Loading</span>
        </div>
      </div>
    </div>
  );
}
