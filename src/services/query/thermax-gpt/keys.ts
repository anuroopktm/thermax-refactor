export const thermaxGptKeys = {
  all: ["thermax-gpt"] as const,
  chat: {
    all: ["thermax-gpt", "chat"] as const,
    list: (params?: Record<string, unknown>) =>
      ["thermax-gpt", "chat", "list", params] as const,
    messages: (id?: string) => ["thermax-gpt", "chat", "messages", id] as const,
  },
  members: {
    all: ["thermax-gpt", "members"] as const,
    me: () => ["thermax-gpt", "members", "me"] as const,
    list: (params?: Record<string, unknown>) =>
      ["thermax-gpt", "members", "list", params] as const,
  },
  usage: {
    all: ["thermax-gpt", "usage"] as const,
    activity: {
      all: ["thermax-gpt", "usage", "activity"] as const,
      list: (params?: Record<string, unknown>) =>
        ["thermax-gpt", "usage", "activity", params] as const,
      top: (params?: Record<string, unknown>) =>
        ["thermax-gpt", "usage", "activity", "top", params] as const,
    },
    cost: {
      all: ["thermax-gpt", "usage", "cost"] as const,
      list: (params?: Record<string, unknown>) =>
        ["thermax-gpt", "usage", "cost", params] as const,
      limit: () => ["thermax-gpt", "usage", "cost", "limit"] as const,
    },
  },
};
