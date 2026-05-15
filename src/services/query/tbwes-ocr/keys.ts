export const tbwesOcrKeys = {
  all: ["tbwes-ocr"] as const,
  members: {
    all: ["tbwes-ocr", "members"] as const,
    list: (params?: Record<string, unknown>) =>
      ["tbwes-ocr", "members", "list", params] as const,
    me: () => ["tbwes-ocr", "members", "me"] as const,
  },
  activities: {
    all: ["tbwes-ocr", "activities"] as const,
    list: (params?: Record<string, unknown>) =>
      ["tbwes-ocr", "activities", "list", params] as const,
    detail: (id?: string | number) =>
      ["tbwes-ocr", "activities", "detail", id] as const,
  },
  baan: {
    all: ["tbwes-ocr", "baan"] as const,
    list: (params?: Record<string, unknown>) =>
      ["tbwes-ocr", "baan", "list", params] as const,
  },
  usage: {
    all: ["tbwes-ocr", "usage"] as const,
    cost: {
      all: ["tbwes-ocr", "usage", "cost"] as const,
      list: (params?: Record<string, unknown>) =>
        ["tbwes-ocr", "usage", "cost", params] as const,
      limit: () => ["tbwes-ocr", "usage", "cost", "limit"] as const,
    },
    activity: {
      all: ["tbwes-ocr", "usage", "activity"] as const,
      list: (params?: Record<string, unknown>) =>
        ["tbwes-ocr", "usage", "activity", params] as const,
      top: (params?: Record<string, unknown>) =>
        ["tbwes-ocr", "usage", "activity", "top", params] as const,
      stats: (params?: Record<string, unknown>) =>
        ["tbwes-ocr", "usage", "activity", "stats", params] as const,
    },
  },
};
