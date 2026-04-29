import { Navigate, Outlet, useLocation } from "react-router-dom";
import { PATHS } from "../constants/routes";

/**
 * A wrapper for routes that require authentication.
 * If the user is not authenticated, it redirects to the login page.
 */
export function PrivateRoute() {
  const location = useLocation();

  // TODO: Replace with real auth check logic
  const isAuthenticated = true; // Placeholder for now

  if (!isAuthenticated) {
    return <Navigate to={PATHS.HOME} state={{ from: location }} replace />;
  }

  return <Outlet />;
}
