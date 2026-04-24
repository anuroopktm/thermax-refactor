import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./pages/sign-in/page.tsx";
import DashboardPage from "./pages/dashboard/page.tsx";
import SalesEnablementPage from "./pages/sales-enablement-tool/page.tsx";
import { DashboardLayout } from "./components/layout/dashboard-layout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/sales-enablement" element={<SalesEnablementPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
