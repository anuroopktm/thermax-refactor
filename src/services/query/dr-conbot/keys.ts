export const drConbotKeys = {
  all: ["dr-conbot"] as const,
  chat: {
    all: ["dr-conbot", "chat"] as const,
    list: (params?: Record<string, unknown>) =>
      ["dr-conbot", "chat", "list", ...(params ? [params] : [])] as const,
    messages: (id?: string) =>
      ["dr-conbot", "chat", "messages", ...(id ? [id] : [])] as const,
  },
  members: {
    all: ["dr-conbot", "members"] as const,
    me: () => ["dr-conbot", "members", "me"] as const,
    list: (params?: Record<string, unknown>) =>
      ["dr-conbot", "members", "list", ...(params ? [params] : [])] as const,
  },
  usage: {
    all: ["dr-conbot", "usage"] as const,
    activity: {
      all: ["dr-conbot", "usage", "activity"] as const,
      list: (params?: Record<string, unknown>) =>
        [
          "dr-conbot",
          "usage",
          "activity",
          ...(params ? [params] : []),
        ] as const,
      top: (params?: Record<string, unknown>) =>
        [
          "dr-conbot",
          "usage",
          "activity",
          "top",
          ...(params ? [params] : []),
        ] as const,
    },
    cost: {
      all: ["dr-conbot", "usage", "cost"] as const,
      list: (params?: Record<string, unknown>) =>
        ["dr-conbot", "usage", "cost", ...(params ? [params] : [])] as const,
      limit: () => ["dr-conbot", "usage", "cost", "limit"] as const,
    },
  },
  products: {
    all: ["dr-conbot", "products"] as const,
    list: (params?: Record<string, unknown>) =>
      ["dr-conbot", "products", "list", ...(params ? [params] : [])] as const,
    detail: (id: number) => ["dr-conbot", "products", "detail", id] as const,
    documents: (productId: number) =>
      ["dr-conbot", "products", "documents", productId] as const,
  },
  faqs: {
    all: ["dr-conbot", "faqs"] as const,
    list: (params?: Record<string, unknown>) =>
      ["dr-conbot", "faqs", "list", ...(params ? [params] : [])] as const,
  },
};
