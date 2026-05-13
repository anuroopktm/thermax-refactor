import { useEffect, useRef, useState } from "react";
import { ChatInput } from "./chat-input";
import type { NormalizedMessage } from "./types/chat.types";
import { ChatMessages } from "./message/chat-message";

interface ChatInterfaceProps {
  messages: NormalizedMessage[];
  isLoading?: boolean;
  isTyping?: boolean;
  onSend: (content: string) => void;
}

export function ChatInterface({
  messages,
  isLoading,
  isTyping,
  onSend,
}: ChatInterfaceProps) {
  const [bottomPadding, setBottomPadding] = useState<number>(120);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  // Observe input height dynamically
  useEffect(() => {
    if (!inputContainerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const height = entries[0].contentRect.height;
      setBottomPadding(height + 20);
    });

    observer.observe(inputContainerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative flex flex-1 flex-col min-h-0 h-full bg-background overflow-hidden">
      {/* Scrollable Content */}
      <ChatMessages
        ref={scrollRef}
        messages={messages}
        bottomPadding={bottomPadding}
      />

      {/* Input */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none">
        <ChatInput
          ref={inputContainerRef}
          onSend={onSend}
          disabled={isTyping || isLoading}
        />
      </div>
    </div>
  );
}
