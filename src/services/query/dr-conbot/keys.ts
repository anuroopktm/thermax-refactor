export const drConbotKeys = {
  all: ["dr-conbot"] as const,
  chat: {
    all: ["dr-conbot", "chat"] as const,
    list: (params?: Record<string, unknown>) =>
      ["dr-conbot", "chat", "list", params] as const,
    messages: (id?: string) => ["dr-conbot", "chat", "messages", id] as const,
  },
  members: {
    all: ["dr-conbot", "members"] as const,
    me: () => ["dr-conbot", "members", "me"] as const,
    list: (params?: Record<string, unknown>) =>
      ["dr-conbot", "members", "list", params] as const,
  },
  usage: {
    all: ["dr-conbot", "usage"] as const,
    activity: {
      all: ["dr-conbot", "usage", "activity"] as const,
      list: (params?: Record<string, unknown>) =>
        ["dr-conbot", "usage", "activity", params] as const,
      top: (params?: Record<string, unknown>) =>
        ["dr-conbot", "usage", "activity", "top", params] as const,
    },
    cost: {
      all: ["dr-conbot", "usage", "cost"] as const,
      list: (params?: Record<string, unknown>) =>
        ["dr-conbot", "usage", "cost", params] as const,
      limit: () => ["dr-conbot", "usage", "cost", "limit"] as const,
    },
  },
};
