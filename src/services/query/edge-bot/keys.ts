export const edgeBotKeys = {
  all: ["edge-bot"] as const,
  chats: {
    all: ["edge-bot", "chats"] as const,
    detail: (id: string | number) =>
      ["edge-bot", "chats", "detail", id] as const,
    history: (id: string | number) =>
      ["edge-bot", "chats", "history", id] as const,
  },
  members: {
    all: ["edge-bot", "members"] as const,
    list: (params?: Record<string, unknown>) =>
      ["edge-bot", "members", "list", ...(params ? [params] : [])] as const,
  },
  usage: {
    all: ["edge-bot", "usage"] as const,
    activity: {
      all: ["edge-bot", "usage", "activity"] as const,
      list: (params?: Record<string, unknown>) =>
        [
          "edge-bot",
          "usage",
          "activity",
          "list",
          ...(params ? [params] : []),
        ] as const,
      top: (params?: Record<string, unknown>) =>
        [
          "edge-bot",
          "usage",
          "activity",
          "top",
          ...(params ? [params] : []),
        ] as const,
    },
    cost: {
      all: ["edge-bot", "usage", "cost"] as const,
      list: (params?: Record<string, unknown>) =>
        [
          "edge-bot",
          "usage",
          "cost",
          "list",
          ...(params ? [params] : []),
        ] as const,
    },
    tokens: () => ["edge-bot", "usage", "tokens"] as const,
  },
  products: {
    all: ["edge-bot", "products"] as const,
    list: (params?: Record<string, unknown>) =>
      ["edge-bot", "products", "list", ...(params ? [params] : [])] as const,
    documents: (productId: string | number) =>
      ["edge-bot", "products", productId, "documents"] as const,
  },
};
