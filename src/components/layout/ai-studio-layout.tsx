import {
  Outlet,
  useMatches,
  type Params,
  type UIMatch,
} from "react-router-dom";
import { MainHeader } from "./main-header";

interface RouteHandle {
  crumb?: string | ((params: Params) => React.ReactNode);
  href?: string;
}

export function AiStudioLayout() {
  const matches = useMatches() as UIMatch<unknown, RouteHandle>[];

  // Extract breadcrumbs from route handles
  const breadcrumbs = matches
    .filter((match) => match.handle && match.handle.crumb)
    .map((match) => {
      const { crumb, href } = match.handle;
      return {
        label: typeof crumb === "function" ? crumb(match.params) : crumb,
        href: href || match.pathname,
      };
    });

  return (
    <div className="ai-studio-layout flex h-screen w-full flex-col overflow-hidden">
      <MainHeader breadcrumbs={breadcrumbs} />
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}
