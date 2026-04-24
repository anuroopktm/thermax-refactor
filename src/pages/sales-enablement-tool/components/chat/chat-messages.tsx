import { forwardRef } from "react";
import { ChatMessage, type Message } from "./chat-message";
import { ChatEmptyState } from "./chat-empty-state";

interface ChatMessagesProps {
  messages: Message[];
  bottomPadding: number;
}

export const ChatMessages = forwardRef<HTMLDivElement, ChatMessagesProps>(
  ({ messages, bottomPadding }, ref) => {
    return (
      <div
        ref={ref}
        className="flex-1 overflow-y-auto min-h-0 scrollbar-thin scrollbar-thumb-muted-foreground/20"
        style={{ paddingBottom: bottomPadding }}
      >
        {messages.length === 0 ? (
          <ChatEmptyState />
        ) : (
          <div className="max-w-[calc(100%-2rem)] py-4 mx-auto space-y-4 flex flex-col">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
          </div>
        )}
      </div>
    );
  },
);

ChatMessages.displayName = "ChatMessages";
