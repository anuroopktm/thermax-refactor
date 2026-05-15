import type { NormalizedMessage } from "@/components/shared/chat/types/chat.types";
import type { ChatHistoryItem } from "@/services/query/dr-conbot/types";

export function normalizeHistoryMessages(
  items: ChatHistoryItem[],
): NormalizedMessage[] {
  return [...items]
    .sort((a, b) => a.id - b.id)
    .flatMap((item) => [
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
