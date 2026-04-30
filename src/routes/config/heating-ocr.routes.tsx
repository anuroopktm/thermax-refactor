import { Navigate } from "react-router-dom";
import { PATHS } from "../constants/routes";
import * as Pages from "../lazy-imports";

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
        element: <Pages.HeatingActivityView />,
        handle: {
          crumb: "Activity",
        },
      },
      {
        path: PATHS.HEATING_OCR.ACTIVITY_ITEM,
        element: <Pages.HeatingActivityItemView />,
        handle: {
          crumb: "Activity Details",
        },
      },
      {
        path: PATHS.HEATING_OCR.PLATE_GROUPS,
        element: <Pages.HeatingPlateGroupsView />,
        handle: {
          crumb: "Plate Groups",
        },
      },
      {
        path: PATHS.HEATING_OCR.PLATE_GROUP_ITEM,
        element: <Pages.HeatingActivityItemView />,
        handle: {
          crumb: "Plate Details",
        },
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
