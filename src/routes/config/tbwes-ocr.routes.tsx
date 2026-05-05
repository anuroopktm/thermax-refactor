import { Navigate } from "react-router-dom";
import { PATHS } from "../constants/routes";
import * as Pages from "../lazy-imports";

export const tbwesOcrRoutes = [
  {
    path: PATHS.TBWES_OCR.ROOT,
    element: <Pages.TbwesOcrPage />,
    handle: {
      crumb: "TBWES OCR",
    },
    children: [
      {
        index: true,
        element: <Navigate to={PATHS.TBWES_OCR.ACTIVITY} replace />,
      },
      {
        path: PATHS.TBWES_OCR.ACTIVITY,
        element: <Pages.TbwesActivityView />,
        handle: {
          crumb: "Activity",
        },
      },
      {
        path: PATHS.TBWES_OCR.ACTIVITY_ITEM,
        element: <Pages.TbwesActivityItemView />,
        handle: {
          crumb: "Activity Details",
        },
      },
      {
        path: PATHS.TBWES_OCR.MEMBERS,
        element: <Pages.TbwesMembersView />,
        handle: {
          crumb: "Members",
        },
      },
      {
        path: PATHS.TBWES_OCR.USAGE,
        element: <Pages.TbwesUsageView />,
        handle: {
          crumb: "Usage",
        },
      },
      {
        path: PATHS.TBWES_OCR.BAAN,
        element: <Pages.TbwesBaanView />,
        handle: {
          crumb: "BAAN",
        },
      },
    ],
  },
];
