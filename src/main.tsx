import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "@/pages/sign-in/page.tsx";
import DashboardPage from "@/pages/dashboard/page.tsx";
import SalesEnablementPage from "@/pages/sales-enablement-tool/page.tsx";
import SalesEnablementSettingsPage from "@/pages/sales-enablement-tool/settings/page.tsx";
import { UsageView } from "@/pages/sales-enablement-tool/settings/sections/usage-view.tsx";
import { MembersView } from "@/pages/sales-enablement-tool/settings/sections/members-view.tsx";
import { ProductsView } from "@/pages/sales-enablement-tool/settings/sections/products-view.tsx";
import { FeedbackView } from "@/pages/sales-enablement-tool/settings/sections/feedback-view.tsx";
import { DashboardLayout } from "@/components/layout/dashboard-layout.tsx";
import TransmitterOcrPage from "@/pages/transmitter-ocr/page.tsx";
import { MasterActivityView } from "@/pages/transmitter-ocr/sections/master-activity-view.tsx";
import { MasterUsageView } from "@/pages/transmitter-ocr/sections/master-usage-view.tsx";
import { ChildUsageView } from "@/pages/transmitter-ocr/sections/child-usage-view.tsx";
import { Navigate } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/sales-enablement" element={<SalesEnablementPage />} />
            <Route
              path="/sales-enablement/settings"
              element={<SalesEnablementSettingsPage />}
            >
              <Route index element={<Navigate to="products" replace />} />
              <Route path="products" element={<ProductsView />} />
              <Route path="feedback" element={<FeedbackView />} />
              <Route path="usage" element={<UsageView />} />
              <Route path="members" element={<MembersView />} />
            </Route>
            <Route path="/transmitter-ocr" element={<TransmitterOcrPage />}>
              <Route
                index
                element={<Navigate to="master-activity" replace />}
              />
              <Route path="master-activity" element={<MasterActivityView />} />
              {/* Placeholders for other routes */}
              <Route path="master-usage" element={<MasterUsageView />} />
              <Route
                path="child-activity"
                element={<div className="p-4">Child Activity</div>}
              />
              <Route path="child-usage" element={<ChildUsageView />} />
              <Route
                path="activity-summary"
                element={<div className="p-4">Activity Summary</div>}
              />
              <Route
                path="members"
                element={<div className="p-4">Members</div>}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
