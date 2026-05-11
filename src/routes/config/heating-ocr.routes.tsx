import { Navigate } from "react-router-dom";
import { PATHS } from "../constants/routes";
import * as Pages from "../lazy-imports";
import {
  ActivityCrumb,
  PlateGroupCrumb,
} from "@/pages/heating-ocr/components/crumbs/heating-crumbs";

export const heatingOcrRoutes = [
  {
    path: PATHS.HEATING_OCR.ROOT,
    element: <Pages.HeatingOcrPage />,
    handle: {
      crumb: "Heating OCR",
    },
    children: [
      {
        index: true,
        element: <Navigate to={PATHS.HEATING_OCR.ACTIVITY} replace />,
      },
      {
        path: PATHS.HEATING_OCR.ACTIVITY,
        handle: {
          crumb: "Activity",
        },
        children: [
          {
            index: true,
            element: <Pages.HeatingActivityView />,
          },
          {
            path: PATHS.HEATING_OCR.ID,
            handle: {
              crumb: () => <ActivityCrumb />,
            },
            children: [
              {
                path: PATHS.HEATING_OCR.ITEM,
                element: <Pages.HeatingActivityItemView />,
              },
              {
                path: PATHS.HEATING_OCR.PLATE_GROUPS_SEGMENT,
                children: [
                  {
                    index: true,
                    element: <Pages.HeatingPlateGroupsView />,
                  },
                  {
                    path: `${PATHS.HEATING_OCR.GROUP_ID}/${PATHS.HEATING_OCR.ITEM}`,
                    element: <Pages.HeatingActivityItemView />,
                    handle: {
                      crumb: () => <PlateGroupCrumb />,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: PATHS.HEATING_OCR.MEMBERS,
        element: <Pages.HeatingMembersView />,
        handle: {
          crumb: "Members",
        },
      },
      {
        path: PATHS.HEATING_OCR.USAGE,
        element: <Pages.HeatingUsageView />,
        handle: {
          crumb: "Usage",
        },
      },
    ],
  },
];
