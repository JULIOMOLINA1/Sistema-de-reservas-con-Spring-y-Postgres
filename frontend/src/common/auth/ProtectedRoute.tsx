import { Navigate, Outlet } from "react-router";
import { isAuthenticated } from "@/services/auth/authService";

export const ProtectedRoute = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};
