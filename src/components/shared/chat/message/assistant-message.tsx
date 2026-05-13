import { ThinkingIndicator } from "./thinking-indicator";

interface AssistantMessageProps {
  content: string;
  isThinking?: boolean;
}

export function AssistantMessage({
  content,
  isThinking,
}: AssistantMessageProps) {
  return (
    <div className="max-w-[85%] px-1 py-1">
      {isThinking ? (
        <ThinkingIndicator />
      ) : (
        <p className="wrap-break-word whitespace-pre-wrap text-sm leading-7 text-foreground">
          {content}
        </p>
      )}
    </div>
  );
}
