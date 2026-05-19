export const salesEnablementKeys = {
  all: ["sales-enablement"] as const,
  chats: {
    all: ["sales-enablement", "chats"] as const,
    detail: (id: string | number) =>
      ["sales-enablement", "chats", "detail", id] as const,
    history: (id: string | number) =>
      ["sales-enablement", "chats", "history", id] as const,
  },
  members: {
    all: ["sales-enablement", "members"] as const,
    list: (params?: Record<string, unknown>) =>
      [
        "sales-enablement",
        "members",
        "list",
        ...(params ? [params] : []),
      ] as const,
  },
  usage: {
    all: ["sales-enablement", "usage"] as const,
    activity: {
      all: ["sales-enablement", "usage", "activity"] as const,
      list: (params?: Record<string, unknown>) =>
        [
          "sales-enablement",
          "usage",
          "activity",
          "list",
          ...(params ? [params] : []),
        ] as const,
      top: (params?: Record<string, unknown>) =>
        [
          "sales-enablement",
          "usage",
          "activity",
          "top",
          ...(params ? [params] : []),
        ] as const,
    },
    cost: {
      all: ["sales-enablement", "usage", "cost"] as const,
      list: (params?: Record<string, unknown>) =>
        [
          "sales-enablement",
          "usage",
          "cost",
          "list",
          ...(params ? [params] : []),
        ] as const,
    },
    tokens: () => ["sales-enablement", "usage", "tokens"] as const,
  },
  feedback: {
    all: ["sales-enablement", "feedback"] as const,
    list: (params?: Record<string, unknown>) =>
      [
        "sales-enablement",
        "feedback",
        "list",
        ...(params ? [params] : []),
      ] as const,
  },
  products: {
    all: ["sales-enablement", "products"] as const,
    list: (params?: Record<string, unknown>) =>
      [
        "sales-enablement",
        "products",
        "list",
        ...(params ? [params] : []),
      ] as const,
    documents: (productId: string | number) =>
      ["sales-enablement", "products", productId, "documents"] as const,
  },
};
