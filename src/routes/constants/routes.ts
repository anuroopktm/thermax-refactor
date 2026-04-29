/**
 * Centralized route paths for the application.
 */
export const PATHS = {
  HOME: "/",
  DASHBOARD: "/dashboard",

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

  // Transmitter OCR
  TRANSMITTER_OCR: {
    ROOT: "/transmitter-ocr",
    MASTER_ACTIVITY: "master-activity",
    MASTER_ACTIVITY_DETAIL: "master-activity/:id",
    MASTER_USAGE: "master-usage",
    CHILD_ACTIVITY: "child-activity",
    CHILD_ACTIVITY_DETAIL: "child-activity/:id",
    CHILD_ACTIVITY_ITEM: "child-activity/:id/:itemId",
    CHILD_USAGE: "child-usage",
    SUMMARY: "activity-summary",
    MEMBERS: "members",
  },
} as const;
