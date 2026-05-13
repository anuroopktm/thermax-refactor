import type {
  ChatHistoryItem,
  NormalizedMessage,
} from "@/services/query/thermax-gpt/chat.types";

export function normalizeHistoryMessages(
  items: ChatHistoryItem[],
): NormalizedMessage[] {
  return items.flatMap((item) => [
    ...(item.human
      ? [
          {
            id: `${item.id}-human`,
            role: "user" as const,
            content: item.human,
            historyItemId: item.id,
          },
        ]
      : []),

    ...(item.ai
      ? [
          {
            id: `${item.id}-ai`,
            role: "assistant" as const,
            content: item.ai,
            historyItemId: item.id,
            source: item.source,
          },
        ]
      : []),
  ]);
}
