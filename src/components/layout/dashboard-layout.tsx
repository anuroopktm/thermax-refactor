import { Outlet, useLocation } from "react-router-dom";
import { MainHeader } from "./main-header";

export function DashboardLayout() {
  const location = useLocation();

  // Simple breadcrumb logic based on path
  const getBreadcrumbs = () => {
    if (location.pathname === "/sales-enablement") {
      return [
        { label: "AI Studio", href: "/dashboard" },
        { label: "Sales Enablement Tool" },
      ];
    }
    if (location.pathname.startsWith("/sales-enablement/settings")) {
      return [
        { label: "AI Studio", href: "/dashboard" },
        { label: "Sales Enablement Tool", href: "/sales-enablement" },
        { label: "Settings" },
      ];
    }
    if (location.pathname.startsWith("/transmitter-ocr")) {
      const breadcrumbs: { label: string; href?: string }[] = [
        { label: "AI Studio", href: "/dashboard" },
        { label: "Transmitter OCR", href: "/transmitter-ocr" },
      ];

      if (location.pathname.includes("/child-activity/")) {
        breadcrumbs.push({ label: "GAUGES Child 1 Test ..." });
      }

      return breadcrumbs;
    }
    return [];
  };

  return (
    <div className="dashboard-layout flex h-screen w-full flex-col overflow-hidden">
      <MainHeader breadcrumbs={getBreadcrumbs()} />
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}
