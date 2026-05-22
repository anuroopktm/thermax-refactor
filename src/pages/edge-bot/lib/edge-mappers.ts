import {
  type CostUsageResponse,
  type CostModel,
  type ActivityUsageResponse,
  type ActivityModel,
  type Member as EdgeMember,
  type TopUserModel,
  type ActivityUsageTopUserResponse,
  type ChatResponse,
  type ChatHistoryResponse,
  type ProductResponse,
  type ProductModel,
  type TokenUsageResponse,
  type TokenUsageModel,
  type ProductDocumentResponse,
  type ProductDocumentModel,
} from "@/services/query/edge-bot/types";
import { type Member } from "@/services/query/shared/types";
import {
  type Chat,
  type NormalizedMessage,
} from "@/components/shared/chat/types";

/**
 * Maps Cost usage data from API to UI model
 */
export const mapCostData = (data: CostUsageResponse): CostModel[] => {
  const days = data?.day || [];
  const costs = data?.cost || [];
  return days.map((dayNum: number, idx: number) => ({
    label: String(dayNum),
    value: costs[idx] || 0,
  }));
};

/**
 * Maps Activity usage data from API to UI model
 */
export const mapActivityData = (
  data: ActivityUsageResponse,
): ActivityModel[] => {
  const days = data?.day || [];
  const questions = data?.question || [];
  return days.map((dayNum: number, idx: number) => ({
    label: String(dayNum),
    value: questions[idx] || 0,
  }));
};

/**
 * Maps raw API Member to UI model
 */
export function normalizeEdgeMember(m: EdgeMember): Member {
  return {
    id: m.id,
    name: m.name,
    email: m.email,
    role: m.role,
  };
}

export function normalizeEdgeMembers(members: EdgeMember[]): Member[] {
  return members?.map(normalizeEdgeMember) || [];
}

/**
 * Maps Top User data from API to UI model.
 * Note: Edge Bot API returns `question` instead of `value` for top users.
 */
export const mapTopUsersData = (
  data: ActivityUsageTopUserResponse,
): TopUserModel[] => {
  const users = data?.result || [];
  return users.map((u) => ({
    name: u.name,
    email: u.email,
    initial: u.name.substring(0, 2).toUpperCase(),
    value: u.question || 0, // Using question from API mapping to UI value
  }));
};

/**
 * Maps Chat Sessions from API to UI model
 */
export const mapChats = (data: ChatResponse[]): Chat[] => {
  return (
    data?.map((c) => ({
      id: c.id,
      title: c.title,
    })) || []
  );
};

/**
 * Maps Chat History items (question/answer pairs) to UI message list
 */
export const mapChatHistory = (
  data: ChatHistoryResponse[],
): NormalizedMessage[] => {
  const messages: NormalizedMessage[] = [];
  const sortedData = data ? [...data].sort((a, b) => a.id - b.id) : [];

  sortedData.forEach((item) => {
    // 1. Add user message
    messages.push({
      id: `u-${item.id}`,
      role: "user",
      content: item.human,
      historyItemId: item.id,
    });

    // 2. Add assistant message
    messages.push({
      id: `a-${item.id}`,
      role: "assistant",
      content: item.ai,
      historyItemId: item.id,
      price: item.price ?? undefined,
      source:
        item.source && item.source.sources
          ? {
              generated_media: item.source.sources.map((s) => ({
                media_type: "document",
                link: s.link || "",
                chart_data: {},
              })),
            }
          : undefined,
    });
  });
  return messages;
};

/**
 * Maps Product Response from API to UI model
 */
export const mapProductsList = (data: ProductResponse[]): ProductModel[] => {
  return (
    data?.map((p) => ({
      id: String(p.id),
      name: p.title,
      description: p.description,
      models: p.models?.map((m) => m.title).join(", ") || "",
      fileCount: p.total_document || 0,
      files: [],
    })) || []
  );
};

/**
 * Maps Token Usage response from API to UI model
 */
export const mapTokenUsage = (data: TokenUsageResponse): TokenUsageModel => {
  return {
    used: data.used,
    remaining: data.remaining,
    totalSpent: data.totalSpent,
    limit: data.limit,
  };
};

/**
 * Maps Product Document response from API to UI model
 */
export const mapProductDocuments = (
  data: ProductDocumentResponse[],
): ProductDocumentModel[] => {
  return (
    data?.map((doc) => ({
      id: String(doc.id),
      name: doc.filename,
      type: doc.filename.split(".").pop() || "pdf",
      status: doc.status,
      kind: doc.kind,
      description: doc.description,
    })) || []
  );
};
