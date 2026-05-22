import { Navigate } from "react-router-dom";
import { PATHS } from "../constants/routes";
import * as Pages from "../lazy-imports";

export const edgeBotRoutes = [
  {
    path: PATHS.EDGE_BOT.ROOT,
    handle: {
      crumb: "Edge Bot",
    },
    children: [
      {
        path: ":chatId?",
        element: <Pages.EdgeBotPage />,
      },
      {
        path: "settings",
        element: <Pages.EdgeBotSettingsPage />,
        handle: {
          crumb: "Settings",
        },
        children: [
          {
            index: true,
            element: <Navigate to={PATHS.EDGE_BOT.SETTINGS.PRODUCTS} replace />,
          },
          {
            path: PATHS.EDGE_BOT.SETTINGS.PRODUCTS,
            element: <Pages.EdgeBotProductsView />,
            handle: {
              crumb: "Products",
            },
          },
          {
            path: PATHS.EDGE_BOT.SETTINGS.USAGE,
            element: <Pages.EdgeBotUsageView />,
            handle: {
              crumb: "Usage",
            },
          },
          {
            path: PATHS.EDGE_BOT.SETTINGS.MEMBERS,
            element: <Pages.EdgeBotMembersView />,
            handle: {
              crumb: "Members",
            },
          },
        ],
      },
    ],
  },
];
