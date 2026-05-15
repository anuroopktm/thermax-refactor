export const salesEnablementKeys = {
  all: ["sales-enablement"] as const,
  members: {
    all: ["sales-enablement", "members"] as const,
    list: (params?: Record<string, unknown>) =>
      ["sales-enablement", "members", "list", params] as const,
  },
  usage: {
    all: ["sales-enablement", "usage"] as const,
    activity: {
      all: ["sales-enablement", "usage", "activity"] as const,
      list: (params?: Record<string, unknown>) =>
        ["sales-enablement", "usage", "activity", "list", params] as const,
      top: (params?: Record<string, unknown>) =>
        ["sales-enablement", "usage", "activity", "top", params] as const,
    },
    cost: {
      all: ["sales-enablement", "usage", "cost"] as const,
      list: (params?: Record<string, unknown>) =>
        ["sales-enablement", "usage", "cost", "list", params] as const,
    },
    tokens: () => ["sales-enablement", "usage", "tokens"] as const,
  },
};
