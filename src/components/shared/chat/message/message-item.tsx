import { cn } from "@/lib/utils";
import type { NormalizedMessage } from "../types/chat.types";
import { AssistantMessage } from "./assistant-message";
import { UserMessage } from "./user-message";

interface ChatMessageItemProps {
  message: NormalizedMessage;
}

export function ChatMessageItem({ message }: ChatMessageItemProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full animate-in fade-in slide-in-from-bottom-2 duration-300",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      {isUser ? (
        <UserMessage content={message.content} />
      ) : (
        <AssistantMessage
          content={message.content}
          isThinking={message.isThinking}
        />
      )}
    </div>
  );
}
