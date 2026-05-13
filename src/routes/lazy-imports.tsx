import { lazy } from "react";

// Lazy loaded pages (Default exports)
export const SignInPage = lazy(() => import("@/pages/sign-in/page"));
export const AiStudioPage = lazy(() => import("@/pages/ai-studio/page"));
export const SalesEnablementPage = lazy(
  () => import("@/pages/sales-enablement-tool/page"),
);
export const SalesEnablementSettingsPage = lazy(
  () => import("@/pages/sales-enablement-tool/settings/page"),
);
export const ThermaxGptPage = lazy(() => import("@/pages/thermax-gpt/page"));
export const ThermaxGptSettingsPage = lazy(
  () => import("@/pages/thermax-gpt/settings/page"),
);
export const TransmitterOcrPage = lazy(
  () => import("@/pages/transmitter-ocr/page"),
);

// Lazy loaded views/sections (Named exports)
export const UsageView = lazy(() =>
  import("@/pages/sales-enablement-tool/settings/views/usage-view").then(
    (m) => ({ default: m.UsageView }),
  ),
);
export const MembersView = lazy(() =>
  import("@/pages/sales-enablement-tool/settings/views/members-view").then(
    (m) => ({ default: m.MembersView }),
  ),
);
export const ProductsView = lazy(() =>
  import("@/pages/sales-enablement-tool/settings/views/products-view").then(
    (m) => ({ default: m.ProductsView }),
  ),
);
export const FeedbackView = lazy(() =>
  import("@/pages/sales-enablement-tool/settings/views/feedback-view").then(
    (m) => ({ default: m.FeedbackView }),
  ),
);

export const ThermaxGptUsageView = lazy(() =>
  import("@/pages/thermax-gpt/settings/views/usage-view").then((m) => ({
    default: m.UsageView,
  })),
);
export const ThermaxGptMembersView = lazy(() =>
  import("@/pages/thermax-gpt/settings/views/members-view").then((m) => ({
    default: m.MembersView,
  })),
);
export const ThermaxGptProductsView = lazy(() =>
  import("@/pages/thermax-gpt/settings/views/products-view").then((m) => ({
    default: m.ProductsView,
  })),
);
export const ThermaxGptFeedbackView = lazy(() =>
  import("@/pages/thermax-gpt/settings/views/feedback-view").then((m) => ({
    default: m.FeedbackView,
  })),
);

export const MasterActivityView = lazy(() =>
  import("@/pages/transmitter-ocr/views/master-activity-view").then((m) => ({
    default: m.MasterActivityView,
  })),
);
export const MasterActivityItemView = lazy(() =>
  import("@/pages/transmitter-ocr/views/master-activity-item-view").then(
    (m) => ({ default: m.MasterActivityItemView }),
  ),
);
export const MasterUsageView = lazy(() =>
  import("@/pages/transmitter-ocr/views/master-usage-view").then((m) => ({
    default: m.MasterUsageView,
  })),
);
export const ChildActivityView = lazy(() =>
  import("@/pages/transmitter-ocr/views/child-activity-view").then((m) => ({
    default: m.ChildActivityView,
  })),
);
export const ChildActivityDetailView = lazy(() =>
  import("@/pages/transmitter-ocr/views/child-activity-detail-view").then(
    (m) => ({ default: m.ChildActivityDetailView }),
  ),
);
export const ChildActivityItemView = lazy(() =>
  import("@/pages/transmitter-ocr/views/child-activity-item-view").then(
    (m) => ({ default: m.ChildActivityItemView }),
  ),
);
export const ChildUsageView = lazy(() =>
  import("@/pages/transmitter-ocr/views/child-usage-view").then((m) => ({
    default: m.ChildUsageView,
  })),
);
export const TransmitterMembersView = lazy(() =>
  import("@/pages/transmitter-ocr/views/members-view").then((m) => ({
    default: m.MembersView,
  })),
);
export const ActivitySummaryView = lazy(() =>
  import("@/pages/transmitter-ocr/views/activity-summary-view").then((m) => ({
    default: m.ActivitySummaryView,
  })),
);
export const ActivitySummaryMasterView = lazy(() =>
  import("@/pages/transmitter-ocr/views/activity-summary-master-view").then(
    (m) => ({ default: m.ActivitySummaryMasterView }),
  ),
);
export const ActivitySummaryChildView = lazy(() =>
  import("@/pages/transmitter-ocr/views/activity-summary-child-view").then(
    (m) => ({ default: m.ActivitySummaryChildView }),
  ),
);

// Heating OCR Lazy loaded pages
export const HeatingOcrPage = lazy(() => import("@/pages/heating-ocr/page"));
export const HeatingActivityView = lazy(() =>
  import("@/pages/heating-ocr/views/activity-view").then((m) => ({
    default: m.ActivityView,
  })),
);
export const HeatingActivityItemView = lazy(() =>
  import("@/pages/heating-ocr/views/activity-item-view").then((m) => ({
    default: m.ActivityItemView,
  })),
);
export const HeatingPlateGroupsView = lazy(() =>
  import("@/pages/heating-ocr/views/plate-groups-view").then((m) => ({
    default: m.PlateGroupsView,
  })),
);
export const HeatingMembersView = lazy(() =>
  import("@/pages/heating-ocr/views/members-view").then((m) => ({
    default: m.MembersView,
  })),
);
export const HeatingUsageView = lazy(() =>
  import("@/pages/heating-ocr/views/usage-view").then((m) => ({
    default: m.UsageView,
  })),
);

// TBWES OCR Lazy loaded pages
export const TbwesOcrPage = lazy(() => import("@/pages/tbwes-ocr/page"));
export const TbwesActivityView = lazy(() =>
  import("@/pages/tbwes-ocr/views/activity-view").then((m) => ({
    default: m.ActivityView,
  })),
);
export const TbwesActivityItemView = lazy(() =>
  import("@/pages/tbwes-ocr/views/activity-item-view").then((m) => ({
    default: m.ActivityItemView,
  })),
);
export const TbwesMembersView = lazy(() =>
  import("@/pages/tbwes-ocr/views/members-view").then((m) => ({
    default: m.MembersView,
  })),
);
export const TbwesUsageView = lazy(() =>
  import("@/pages/tbwes-ocr/views/usage-view").then((m) => ({
    default: m.UsageView,
  })),
);
export const TbwesBaanView = lazy(() =>
  import("@/pages/tbwes-ocr/views/baan-view").then((m) => ({
    default: m.BaanView,
  })),
);
