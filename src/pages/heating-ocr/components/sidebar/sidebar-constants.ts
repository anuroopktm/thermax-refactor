import { Activity, Users, LineChart } from "lucide-react";
import { PATHS } from "@/routes/constants/routes";

export const SIDEBAR_SECTIONS = [
  {
    id: "main",
    items: [
      {
        id: "activity",
        label: "Activity",
        icon: Activity,
        path: `${PATHS.HEATING_OCR.ROOT}/${PATHS.HEATING_OCR.ACTIVITY}`,
      },
      {
        id: "members",
        label: "Members",
        icon: Users,
        path: `${PATHS.HEATING_OCR.ROOT}/${PATHS.HEATING_OCR.MEMBERS}`,
      },
      {
        id: "usage",
        label: "Usage",
        icon: LineChart,
        path: `${PATHS.HEATING_OCR.ROOT}/${PATHS.HEATING_OCR.USAGE}`,
      },
    ],
  },
];
