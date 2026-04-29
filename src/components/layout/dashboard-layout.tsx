import { Outlet, useMatches } from "react-router-dom";
import { MainHeader } from "./main-header";

export function DashboardLayout() {
  const matches = useMatches();

  // Extract breadcrumbs from route handles
  const breadcrumbs = matches
    .filter((match: any) => match.handle && match.handle.crumb)
    .map((match: any) => {
      const crumb = match.handle.crumb;
      return {
        label: typeof crumb === "function" ? crumb(match.params) : crumb,
        href: match.pathname,
      };
    });

  return (
    <div className="dashboard-layout flex h-screen w-full flex-col overflow-hidden">
      <MainHeader breadcrumbs={breadcrumbs} />
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}
