import { memo, type ReactElement } from "react";
import { Copy, DollarSign } from "lucide-react";
import { toast } from "sonner";

import { ThinkingIndicator } from "./thinking-indicator";
import { MarkdownContent } from "./markdown-content";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AssistantMessageProps {
  content: string;
  isThinking?: boolean;
  price?: number;
}

export const AssistantMessage = memo(function AssistantMessage({
  content,
  isThinking,
  price,
}: AssistantMessageProps) {
  if (isThinking) {
    return <AssistantThinking />;
  }

  return (
    <div className="max-w-full">
      <div className="overflow-hidden px-4 py-3">
        <MarkdownContent content={content} />
      </div>
      <AssistantActions content={content} price={price} />
    </div>
  );
});

/* ---------------- ASSISTANT ACTIONS & STATS ---------------- */

const AssistantActions = memo(function AssistantActions({
  content,
  price,
}: {
  content: string;
  price?: number;
}) {
  const handleCopy = async () => {
    toast.promise(navigator.clipboard.writeText(content), {
      loading: "Copying...",
      success: "Message copied to clipboard!",
      error: "Failed to copy message to clipboard!",
    });
  };

  return (
    <TooltipProvider>
      <div className="flex items-center gap-1.5 px-4">
        <ActionTooltip content="Copy markdown">
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer"
            onClick={handleCopy}
          >
            <Copy />
          </Button>
        </ActionTooltip>

        {!!price && <Separator orientation="vertical" />}

        {!!price && (
          <ActionTooltip content={`Cost: ${formatPrice(price)}`}>
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <DollarSign />
            </Button>
          </ActionTooltip>
        )}
      </div>
    </TooltipProvider>
  );
});

/* ---------------- TOOLTIP WRAPPER ---------------- */

interface ActionTooltipProps {
  content: string;
  children: ReactElement;
}

const ActionTooltip = memo(function ActionTooltip({
  content,
  children,
}: ActionTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger render={children} />
      <TooltipContent side="top">
        <span>{content}</span>
      </TooltipContent>
    </Tooltip>
  );
});

function formatPrice(val?: number) {
  if (!val) return "0.00";
  return `$${val.toFixed(2)}`;
}

/* ---------------- ASSISTANT THINKING STATE ---------------- */

const AssistantThinking = memo(function AssistantThinking() {
  return (
    <div className="max-w-[85%]">
      <ThinkingIndicator />
    </div>
  );
});
