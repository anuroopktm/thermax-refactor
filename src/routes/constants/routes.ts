/**
 * Centralized route paths for the application.
 */
export const PATHS = {
  HOME: "/",
  AI_STUDIO: "/ai-studio",

  // Sales Enablement Tool
  SALES_ENABLEMENT: {
    ROOT: "/sales-enablement",
    SETTINGS: {
      ROOT: "/sales-enablement/settings",
      PRODUCTS: "products",
      FEEDBACK: "feedback",
      USAGE: "usage",
      MEMBERS: "members",
    },
  },

  // Thermax GPT
  THERMAX_GPT: {
    ROOT: "/thermax-gpt",
    CHAT_ID: ":chatId",
    SETTINGS: {
      ROOT: "/thermax-gpt/settings",
      USAGE: "usage",
      MEMBERS: "members",
    },
  },

  // Dr-Conbot
  DR_CONBOT: {
    ROOT: "/dr-conbot",
    CHAT_ID: ":chatId",
    SETTINGS: {
      ROOT: "/dr-conbot/settings",
      PRODUCTS: "products",
      FEEDBACK: "feedback",
      USAGE: "usage",
      MEMBERS: "members",
    },
  },

  // Transmitter OCR
  TRANSMITTER_OCR: {
    ROOT: "/transmitter-ocr",
    ID: ":id",
    ITEM_ID: ":itemId",
    MASTER_ID: ":masterId",
    CHILD_ID: ":childId",
    MASTER_ACTIVITY: "master-activity",
    MASTER_ACTIVITY_DETAIL: "master-activity/:id",
    MASTER_USAGE: "master-usage",
    CHILD_ACTIVITY: "child-activity",
    CHILD_ACTIVITY_DETAIL: "child-activity/:id",
    CHILD_ACTIVITY_ITEM: "child-activity/:id/:itemId",
    CHILD_USAGE: "child-usage",
    SUMMARY: "activity-summary",
    SUMMARY_MASTER: "activity-summary",
    SUMMARY_CHILD: "activity-summary/:masterId",
    SUMMARY_DETAIL: "activity-summary/:masterId/:childId",
    MEMBERS: "members",
  },

  // Heating OCR
  HEATING_OCR: {
    ROOT: "/heating-ocr",
    ACTIVITY: "activity",
    ID: ":id",
    ITEM: "item",
    ACTIVITY_ITEM: "activity/:id/item",
    PLATE_GROUPS_SEGMENT: "plate-groups",
    PLATE_GROUPS: "activity/:id/plate-groups",
    GROUP_ID: ":groupId",
    PLATE_GROUP_ITEM: "activity/:id/plate-groups/:groupId/item",
    MEMBERS: "members",
    USAGE: "usage",
  },

  // TBWES OCR
  TBWES_OCR: {
    ROOT: "/tbwes-ocr",
    ACTIVITY: "activity",
    ID: ":id",
    ITEM: "item",
    ACTIVITY_ITEM: "activity/:id/item",
    MEMBERS: "members",
    USAGE: "usage",
    BAAN: "baan",
  },
} as const;
