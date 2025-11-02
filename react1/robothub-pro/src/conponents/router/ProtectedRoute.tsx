import { type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

export type AllowedRole = "user" | "admin";

type ProtectedRouteProps = {
  allowed: AllowedRole[];
  children: ReactNode;
};

export default function ProtectedRoute({ allowed, children }: ProtectedRouteProps) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowed.includes(user.role)) {
    const fallback = user.role === "admin" ? "/admin" : "/";
    return <Navigate to={fallback} replace />;
  }

  return <>{children}</>;
}
