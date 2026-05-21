import { Navigate } from "react-router-dom";
import { PATHS } from "../constants/routes";
import * as Pages from "../lazy-imports";

export const salesEnablementRoutes = [
  {
    path: PATHS.SALES_ENABLEMENT.ROOT,
    handle: {
      crumb: "Sales Enablement Tool",
    },
    children: [
      {
        path: ":chatId?",
        element: <Pages.SalesEnablementPage />,
      },
      {
        path: "settings",
        element: <Pages.SalesEnablementSettingsPage />,
        handle: {
          crumb: "Settings",
        },
        children: [
          {
            index: true,
            element: (
              <Navigate to={PATHS.SALES_ENABLEMENT.SETTINGS.PRODUCTS} replace />
            ),
          },
          {
            path: PATHS.SALES_ENABLEMENT.SETTINGS.PRODUCTS,
            element: <Pages.ProductsView />,
            handle: {
              crumb: "Products",
            },
          },
          {
            path: PATHS.SALES_ENABLEMENT.SETTINGS.FEEDBACK,
            element: <Pages.FeedbackView />,
            handle: {
              crumb: "Feedback",
            },
          },
          {
            path: PATHS.SALES_ENABLEMENT.SETTINGS.USAGE,
            element: <Pages.UsageView />,
            handle: {
              crumb: "Usage",
            },
          },
          {
            path: PATHS.SALES_ENABLEMENT.SETTINGS.MEMBERS,
            element: <Pages.MembersView />,
            handle: {
              crumb: "Members",
            },
          },
        ],
      },
    ],
  },
];
