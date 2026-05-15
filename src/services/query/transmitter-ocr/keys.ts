export const transmitterOcrKeys = {
  all: ["transmitter-ocr"] as const,
  members: {
    all: ["transmitter-ocr", "members"] as const,
    list: (params?: Record<string, unknown>) =>
      ["transmitter-ocr", "members", "list", params] as const,
    me: () => ["transmitter-ocr", "members", "me"] as const,
  },
  master: {
    all: ["transmitter-ocr", "master"] as const,
    activities: {
      all: ["transmitter-ocr", "master", "activities"] as const,
      list: () => ["transmitter-ocr", "master", "activities", "list"] as const,
      detail: (id?: string | number) =>
        ["transmitter-ocr", "master", "activities", "detail", id] as const,
    },
    usage: {
      all: ["transmitter-ocr", "master", "usage"] as const,
      cost: (params?: Record<string, unknown>) =>
        ["transmitter-ocr", "master", "usage", "cost", params] as const,
      activity: (params?: Record<string, unknown>) =>
        ["transmitter-ocr", "master", "usage", "activity", params] as const,
      tokens: (params?: Record<string, unknown>) =>
        ["transmitter-ocr", "master", "usage", "tokens", params] as const,
      stats: (params?: Record<string, unknown>) =>
        ["transmitter-ocr", "master", "usage", "stats", params] as const,
      top: (params?: Record<string, unknown>) =>
        ["transmitter-ocr", "master", "usage", "top", params] as const,
    },
  },
  child: {
    all: ["transmitter-ocr", "child"] as const,
    activities: {
      all: ["transmitter-ocr", "child", "activities"] as const,
      list: () => ["transmitter-ocr", "child", "activities", "list"] as const,
      detail: (id?: string | number) =>
        ["transmitter-ocr", "child", "activities", "detail", id] as const,
    },
    usage: {
      all: ["transmitter-ocr", "child", "usage"] as const,
      cost: (params?: Record<string, unknown>) =>
        ["transmitter-ocr", "child", "usage", "cost", params] as const,
      activity: (params?: Record<string, unknown>) =>
        ["transmitter-ocr", "child", "usage", "activity", params] as const,
      tokens: (params?: Record<string, unknown>) =>
        ["transmitter-ocr", "child", "usage", "tokens", params] as const,
      stats: (params?: Record<string, unknown>) =>
        ["transmitter-ocr", "child", "usage", "stats", params] as const,
      top: (params?: Record<string, unknown>) =>
        ["transmitter-ocr", "child", "usage", "top", params] as const,
    },
  },
  summary: {
    all: ["transmitter-ocr", "summary"] as const,
    list: (params?: Record<string, unknown>) =>
      ["transmitter-ocr", "summary", "list", params] as const,
  },
};
