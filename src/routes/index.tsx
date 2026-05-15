import { createBrowserRouter, Outlet } from "react-router-dom";
import { AiStudioLayout } from "@/components/layout/ai-studio-layout";
import { ErrorPage } from "@/components/common/error-page";
import { LoadingScreen } from "@/components/common/loading-screen";
import { Suspense } from "react";
import { PATHS } from "./constants/routes";

// Guards
import { PrivateRoute } from "./guards/private-route";

// Route Configs
import { publicRoutes } from "./config/public.routes";
import { aiStudioRoutes } from "./config/ai-studio.routes";
import { salesEnablementRoutes } from "./config/sales-enablement.routes";
import { transmitterOcrRoutes } from "./config/transmitter-ocr.routes";
import { heatingOcrRoutes } from "./config/heating-ocr.routes";
import { tbwesOcrRoutes } from "./config/tbwes-ocr.routes";
import { thermaxGptRoutes } from "./config/thermax-gpt.routes";
import { drConbotRoutes } from "./config/dr-conbot.routes";

export const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      // Public Routes
      publicRoutes,

      // Private Routes
      {
        element: <PrivateRoute />,
        children: [
          {
            element: <AiStudioLayout />,
            children: [
              ...aiStudioRoutes,
              {
                handle: {
                  crumb: "AI Studio",
                  href: PATHS.AI_STUDIO,
                },
                children: [
                  ...salesEnablementRoutes,
                  ...transmitterOcrRoutes,
                  ...heatingOcrRoutes,
                  ...tbwesOcrRoutes,
                  ...thermaxGptRoutes,
                  ...drConbotRoutes,
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);
