import type { NormalizedMessage } from "@/components/shared/chat/types";
import type { ChatHistoryModel } from "@/services/query/thermax-gpt/types";

export function normalizeHistoryMessages(
  items: ChatHistoryModel[],
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
