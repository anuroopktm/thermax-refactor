import { Navigate } from "react-router-dom";
import { PATHS } from "../constants/routes";
import * as Pages from "../lazy-imports";

export const thermaxGptRoutes = [
  {
    path: PATHS.THERMAX_GPT.ROOT,
    handle: {
      crumb: "Thermax-GPT",
    },
    children: [
      {
        index: true,
        element: <Pages.ThermaxGptPage />,
      },
      {
        path: PATHS.THERMAX_GPT.CHAT_ID,
        element: <Pages.ThermaxGptPage />,
      },
      {
        path: "settings",
        element: <Pages.ThermaxGptSettingsPage />,
        handle: {
          crumb: "Settings",
        },
        children: [
          {
            index: true,
            element: (
              <Navigate to={PATHS.THERMAX_GPT.SETTINGS.PRODUCTS} replace />
            ),
          },
          {
            path: PATHS.THERMAX_GPT.SETTINGS.PRODUCTS,
            element: <Pages.ThermaxGptProductsView />,
            handle: {
              crumb: "Products",
            },
          },
          {
            path: PATHS.THERMAX_GPT.SETTINGS.FEEDBACK,
            element: <Pages.ThermaxGptFeedbackView />,
            handle: {
              crumb: "Feedback",
            },
          },
          {
            path: PATHS.THERMAX_GPT.SETTINGS.USAGE,
            element: <Pages.ThermaxGptUsageView />,
            handle: {
              crumb: "Usage",
            },
          },
          {
            path: PATHS.THERMAX_GPT.SETTINGS.MEMBERS,
            element: <Pages.ThermaxGptMembersView />,
            handle: {
              crumb: "Members",
            },
          },
        ],
      },
    ],
  },
];
