import { PATHS } from "../constants/routes";
import * as Pages from "../lazy-imports";

export const dashboardRoutes = [
  {
    path: PATHS.DASHBOARD,
    element: <Pages.DashboardPage />,
    handle: {
      crumb: "AI Studio",
    },
  },
];
