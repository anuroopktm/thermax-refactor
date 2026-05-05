import { Activity, Users, LineChart, Database } from "lucide-react";
import { PATHS } from "@/routes/constants/routes";

export const SIDEBAR_SECTIONS = [
  {
    id: "main",
    items: [
      {
        id: "activity",
        label: "Activity",
        icon: Activity,
        path: `${PATHS.TBWES_OCR.ROOT}/${PATHS.TBWES_OCR.ACTIVITY}`,
      },
      {
        id: "members",
        label: "Members",
        icon: Users,
        path: `${PATHS.TBWES_OCR.ROOT}/${PATHS.TBWES_OCR.MEMBERS}`,
      },
      {
        id: "usage",
        label: "Usage",
        icon: LineChart,
        path: `${PATHS.TBWES_OCR.ROOT}/${PATHS.TBWES_OCR.USAGE}`,
      },
      {
        id: "baan",
        label: "BAAN",
        icon: Database,
        path: `${PATHS.TBWES_OCR.ROOT}/${PATHS.TBWES_OCR.BAAN}`,
      },
    ],
  },
];
