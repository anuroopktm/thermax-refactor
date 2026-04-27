import { useEffect, useRef, useState } from "react";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";
import { type Message } from "./chat-message";
import { streamMockResponse } from "../../lib/chat-service";

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [bottomPadding, setBottomPadding] = useState<number>(120);
  const [isTyping, setIsTyping] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);

  // 🔹 Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  // 🔹 Observe input height dynamically
  useEffect(() => {
    if (!inputContainerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const height = entries[0].contentRect.height;
      setBottomPadding(height + 20); // Add extra padding for better spacing
    });

    observer.observe(inputContainerRef.current);

    return () => observer.disconnect();
  }, []);

  const handleSend = async (content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    const assistantId = crypto.randomUUID();

    // Add placeholder assistant message with thinking state
    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: "assistant", content: "", isThinking: true },
    ]);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    await streamMockResponse(
      (chunk) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId ? { ...msg, content: chunk } : msg,
          ),
        );
      },
      () => {
        // On Start: Stop thinking
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId ? { ...msg, isThinking: false } : msg,
          ),
        );
      },
      () => {
        // On End
        setIsTyping(false);
      },
    );
  };

  return (
    <div className="relative flex flex-1 flex-col min-h-0 h-full bg-background overflow-hidden">
      {/* 🔹 Scrollable Content */}
      <ChatMessages
        ref={scrollRef}
        messages={messages}
        bottomPadding={bottomPadding}
      />

      {/* 🔹 Input */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none">
        <ChatInput
          ref={inputContainerRef}
          onSend={handleSend}
          disabled={isTyping}
        />
      </div>
    </div>
  );
}
