import {
  type CostItemResponse,
  type CostModel,
  type ActivityItemResponse,
  type ActivityModel,
  type Member as SalesMember,
  type TopUserResponse,
  type TopUserModel,
  type ChatResponse,
  type ChatHistoryResponse,
  type ChatFeedbackResponse,
  type ProductResponse,
} from "@/services/query/sales-enablement/types";
import { type Member } from "@/services/query/shared/types";
import {
  type Chat,
  type NormalizedMessage,
} from "@/components/shared/chat/types";

/**
 * Maps Cost usage data from API to UI model
 */
export const mapCostData = (data: CostItemResponse[]): CostModel[] => {
  return (
    data?.map((item) => ({
      label: String(item.label),
      value: item.value,
    })) || []
  );
};

/**
 * Maps Activity usage data from API to UI model
 */
export const mapActivityData = (
  data: ActivityItemResponse[],
): ActivityModel[] => {
  return (
    data?.map((item) => ({
      label: String(item.label),
      value: item.questions,
    })) || []
  );
};

/**
 * Maps raw API Member to UI model
 */
export function normalizeSalesMember(m: SalesMember): Member {
  return {
    id: m.id,
    name: m.name,
    email: m.email,
    role: m.role,
  };
}

export function normalizeSalesMembers(members: SalesMember[]): Member[] {
  return members?.map(normalizeSalesMember) || [];
}

/**
 * Maps Top User data from API to UI model
 */
export const mapTopUsersData = (data: TopUserResponse[]): TopUserModel[] => {
  return (
    data?.map((item) => ({
      name: item.name,
      email: item.email,
      initial: item.initial,
      value: item.value,
    })) || []
  );
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
      price: item.price,
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
 * Maps Chat Feedback from API to UI model
 */
export const mapFeedback = (f: ChatFeedbackResponse) => {
  const mapStatusToUi = (status: string) => {
    switch (status) {
      case "NOT_REVIEWED":
        return "Not Specified";
      case "IN_REVIEW":
        return "in-review";
      case "APPROVED":
        return "approved";
      case "REJECTED":
        return "rejected";
      default:
        return status;
    }
  };

  return {
    id: f.id,
    user: f.created_by_user?.name || "User",
    question: f.updated_question || f.question,
    answer: f.updated_answer || f.answer,
    status: mapStatusToUi(f.status),
    source: f.models?.map((m) => m.title).join(", ") || "",
    dislikeReason: f.dislike_reason || undefined,
    like: f.like !== null ? f.like : undefined,
  };
};

export const mapFeedbacksList = (data: ChatFeedbackResponse[]): unknown[] => {
  return data?.map(mapFeedback) || [];
};

/**
 * Maps Product Response from API to UI model
 */
export const mapProduct = (p: ProductResponse) => {
  return {
    id: String(p.id),
    name: p.title,
    description: p.description,
    models: p.models?.map((m) => m.title).join(", ") || "",
    fileCount: p.total_document || 0,
    files: [],
  };
};

export const mapProductsList = (data: ProductResponse[]): unknown[] => {
  return data?.map(mapProduct) || [];
};
