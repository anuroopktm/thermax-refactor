import { Store, FileText, Users, LayoutDashboard } from "lucide-react";

export const SIDEBAR_SECTIONS = [
  {
    label: "Master",
    items: [
      {
        id: "master-activity",
        label: "Activity",
        icon: Store,
        path: "/transmitter-ocr/master-activity",
      },
      {
        id: "master-usage",
        label: "Usage",
        icon: FileText,
        path: "/transmitter-ocr/master-usage",
      },
    ],
  },
  {
    label: "Child",
    items: [
      {
        id: "child-activity",
        label: "Activity",
        icon: Store,
        path: "/transmitter-ocr/child-activity",
      },
      {
        id: "child-usage",
        label: "Usage",
        icon: FileText,
        path: "/transmitter-ocr/child-usage",
      },
    ],
  },
  {
    label: null,
    hasSeparator: true,
    items: [
      {
        id: "dashboard",
        label: "Activity Summary",
        icon: LayoutDashboard,
        path: "/transmitter-ocr/activity-summary",
      },
      {
        id: "members",
        label: "Members",
        icon: Users,
        path: "/transmitter-ocr/members",
      },
    ],
  },
];
