import { forwardRef } from "react";
import { ChatEmptyState } from "../chat-empty-state";
import type { NormalizedMessage } from "../types/chat.types";
import { ChatMessageItem } from "./message-item";

interface ChatMessagesProps {
  messages: NormalizedMessage[];
  bottomPadding: number;
}

export const ChatMessages = forwardRef<HTMLDivElement, ChatMessagesProps>(
  ({ messages, bottomPadding }, ref) => {
    return (
      <div
        ref={ref}
        className="scrollbar-thin scrollbar-thumb-muted-foreground/20 min-h-0 flex-1 overflow-y-auto px-5"
        style={{ paddingBottom: bottomPadding }}
      >
        {messages.length === 0 ? (
          <ChatEmptyState />
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
