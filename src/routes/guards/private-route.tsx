import { Navigate, Outlet, useLocation } from "react-router-dom";
import { PATHS } from "../constants/routes";

/**
 * A wrapper for routes that require authentication.
 * If the user is not authenticated, it redirects to the login page.
 */
export function PrivateRoute() {
  const location = useLocation();

  const isAuthenticated = !!localStorage.getItem("access_token");

  if (!isAuthenticated) {
    return <Navigate to={PATHS.HOME} state={{ from: location }} replace />;
  }

  return <Outlet />;
}
