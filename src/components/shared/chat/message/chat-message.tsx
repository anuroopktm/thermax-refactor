import { forwardRef } from "react";
import { ChatEmptyState } from "../chat-empty-state";
import type { NormalizedMessage } from "../types";
import { ChatMessageItem } from "./message-item";
import { cn } from "@/lib/utils";

interface ChatMessagesProps {
  messages: NormalizedMessage[];
  bottomPadding: number;
  emptyStateImage: string;
  emptyStateTitle: string;
  emptyStateDescription: string;
}

export const ChatMessages = forwardRef<HTMLDivElement, ChatMessagesProps>(
  (
    {
      messages,
      bottomPadding,
      emptyStateImage,
      emptyStateTitle,
      emptyStateDescription,
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "scrollbar-thin scrollbar-thumb-muted-foreground/20 min-h-0 flex-1 overflow-y-auto px-5",
          messages.length === 0 ? "flex flex-col" : "",
        )}
        style={{
          paddingBottom: bottomPadding,
        }}
      >
        {messages.length === 0 ? (
          <ChatEmptyState
            image={emptyStateImage}
            title={emptyStateTitle}
            description={emptyStateDescription}
          />
        ) : (
          <MessagesList messages={messages} />
        )}
      </div>
    );
  },
);

ChatMessages.displayName = "ChatMessages";

/* ---------------- Messages List ---------------- */

function MessagesList({ messages }: { messages: NormalizedMessage[] }) {
  return (
    <div className="mx-auto flex max-w-[calc(100%-2rem)] flex-col space-y-4 py-4">
      {messages.map((message) => (
        <ChatMessageItem key={message.id} message={message} />
      ))}
    </div>
  );
}
