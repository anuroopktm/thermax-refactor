import { Navigate, Outlet } from "react-router-dom";
import { PATHS } from "../constants/routes";

/**
 * A wrapper for routes that should only be accessible to non-authenticated users (e.g., Sign In).
 * If the user is already authenticated, it redirects to the dashboard.
 */
export function PublicRoute() {
  const isAuthenticated = !!localStorage.getItem("access_token");

  if (isAuthenticated) {
    return <Navigate to={PATHS.AI_STUDIO} replace />;
  }

  return <Outlet />;
}
