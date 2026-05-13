import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ThinkingIndicator } from "./thinking-indicator";
import type { NormalizedMessage } from "@/services/query/thermax-gpt/chat.types";

interface ChatMessageProps {
  message: NormalizedMessage;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full animate-in fade-in slide-in-from-bottom-2 duration-300",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      <Badge
        variant={isUser ? "default" : "secondary"}
        className={cn(
          "max-w-[80%] rounded-xl px-3 py-2 h-auto text-sm whitespace-normal font-normal shadow-sm transition-all",
          isUser ? "rounded-tr-none" : "rounded-tl-none bg-secondary/50",
        )}
      >
        {message.isThinking ? (
          <ThinkingIndicator />
        ) : (
          <span className="leading-relaxed">{message.content}</span>
        )}
      </Badge>
    </div>
  );
}
