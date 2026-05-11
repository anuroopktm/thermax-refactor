import { Navigate } from "react-router-dom";
import { PATHS } from "../constants/routes";
import * as Pages from "../lazy-imports";
import { TbwesActivityCrumb } from "@/pages/tbwes-ocr/components/crumbs/tbwes-crumbs";

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
        handle: {
          crumb: "Activity",
        },
        children: [
          {
            index: true,
            element: <Pages.TbwesActivityView />,
          },
          {
            path: `${PATHS.TBWES_OCR.ID}/${PATHS.TBWES_OCR.ITEM}`,
            element: <Pages.TbwesActivityItemView />,
            handle: {
              crumb: () => <TbwesActivityCrumb />,
            },
          },
        ],
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
