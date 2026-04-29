import { Navigate, Outlet } from "react-router-dom";
import { PATHS } from "../constants/routes";

/**
 * A wrapper for routes that should only be accessible to non-authenticated users (e.g., Sign In).
 * If the user is already authenticated, it redirects to the dashboard.
 */
export function PublicRoute() {
  // TODO: Replace with real auth check logic
  const isAuthenticated = false; // Placeholder for now

  if (isAuthenticated) {
    return <Navigate to={PATHS.DASHBOARD} replace />;
  }

  return <Outlet />;
}
