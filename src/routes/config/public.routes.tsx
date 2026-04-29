import { PublicRoute } from "../guards/public-route";
import { PATHS } from "../constants/routes";
import * as Pages from "../lazy-imports";

export const publicRoutes = {
  element: <PublicRoute />,
  children: [
    {
      path: PATHS.HOME,
      element: <Pages.SignInPage />,
    },
  ],
};
