export const heatingOcrKeys = {
  all: ["heating-ocr"] as const,
  members: {
    all: ["heating-ocr", "members"] as const,
    list: (params?: Record<string, unknown>) =>
      ["heating-ocr", "members", "list", ...(params ? [params] : [])] as const,
    me: () => ["heating-ocr", "members", "me"] as const,
  },
  activities: {
    all: ["heating-ocr", "activities"] as const,
    list: (params?: Record<string, unknown>) =>
      [
        "heating-ocr",
        "activities",
        "list",
        ...(params ? [params] : []),
      ] as const,
    detail: (id?: string | number) =>
      ["heating-ocr", "activities", "detail", ...(id ? [id] : [])] as const,
  },
  codes: {
    all: ["heating-ocr", "codes"] as const,
    list: (params?: Record<string, unknown>) =>
      ["heating-ocr", "codes", "list", ...(params ? [params] : [])] as const,
  },
  usage: {
    all: ["heating-ocr", "usage"] as const,
    cost: {
      all: ["heating-ocr", "usage", "cost"] as const,
      list: (params?: Record<string, unknown>) =>
        ["heating-ocr", "usage", "cost", ...(params ? [params] : [])] as const,
      limit: () => ["heating-ocr", "usage", "cost", "limit"] as const,
    },
    activity: {
      all: ["heating-ocr", "usage", "activity"] as const,
      list: (params?: Record<string, unknown>) =>
        [
          "heating-ocr",
          "usage",
          "activity",
          ...(params ? [params] : []),
        ] as const,
      top: (params?: Record<string, unknown>) =>
        [
          "heating-ocr",
          "usage",
          "activity",
          "top",
          ...(params ? [params] : []),
        ] as const,
      stats: (params?: Record<string, unknown>) =>
        [
          "heating-ocr",
          "usage",
          "activity",
          "stats",
          ...(params ? [params] : []),
        ] as const,
    },
  },
};
