import { Navigate } from "react-router-dom";
import { PATHS } from "../constants/routes";
import * as Pages from "../lazy-imports";

export const drConbotRoutes = [
  {
    path: PATHS.DR_CONBOT.ROOT,
    handle: {
      crumb: "Dr-Conbot",
    },
    children: [
      {
        path: ":chatId?",
        element: <Pages.DrConbotPage />,
      },
      {
        path: "settings",
        element: <Pages.DrConbotSettingsPage />,
        handle: {
          crumb: "Settings",
        },
        children: [
          {
            index: true,
            element: (
              <Navigate to={PATHS.DR_CONBOT.SETTINGS.CATEGORIES} replace />
            ),
          },
          {
            path: PATHS.DR_CONBOT.SETTINGS.CATEGORIES,
            element: <Pages.DrConbotCategoriesView />,
            handle: {
              crumb: "Categories",
            },
          },
          {
            path: PATHS.DR_CONBOT.SETTINGS.FAQ,
            element: <Pages.DrConbotFaqView />,
            handle: {
              crumb: "FAQ",
            },
          },
          {
            path: PATHS.DR_CONBOT.SETTINGS.USAGE,
            element: <Pages.DrConbotUsageView />,
            handle: {
              crumb: "Usage",
            },
          },
          {
            path: PATHS.DR_CONBOT.SETTINGS.MEMBERS,
            element: <Pages.DrConbotMembersView />,
            handle: {
              crumb: "Members",
            },
          },
        ],
      },
    ],
  },
];
