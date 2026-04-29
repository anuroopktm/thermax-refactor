import { createBrowserRouter, Outlet } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ErrorPage } from "@/components/common/error-page";
import { LoadingScreen } from "@/components/common/loading-screen";
import { Suspense } from "react";

// Guards
import { PrivateRoute } from "./guards/private-route";

// Route Configs
import { publicRoutes } from "./config/public.routes";
import { dashboardRoutes } from "./config/dashboard.routes";
import { salesEnablementRoutes } from "./config/sales-enablement.routes";
import { transmitterOcrRoutes } from "./config/transmitter-ocr.routes";

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
            element: <DashboardLayout />,
            children: [
              ...dashboardRoutes,
              ...salesEnablementRoutes,
              ...transmitterOcrRoutes,
            ],
          },
        ],
      },
    ],
  },
]);
